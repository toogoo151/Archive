<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Health;
use App\Models\all_users;
use App\Models\MainHistory;
use App\Models\OfficerMainHistory;
use App\Models\Security;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class HealthOfficerController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getUsersFromOfficerMainHistory(Request $req){
        try {

                if($req->_healthState != ""){
                    $getMainHistory = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_main.healthApprove", "=", $req->_healthState)

                    ->join("pko_users", function($query){
                        $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function($query)use($req){
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if($req->_comandlalID != ""){
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                        }
                    })
                    ->join("pko_missions", function($query){
                        $query->on("pko_officer_main.missionID", "=", "pko_missions.id");
                    })
                    ->join("pko_mission_eelj", function($query){
                        $query->on("pko_officer_main.eeljID", "=", "pko_mission_eelj.id");
                    })
                    ->join("tb_comandlal", function($query){
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function($query){
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_ranks", function($query){
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->select("pko_officer_main.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                    ->get();
                    return $getMainHistory;
                } else {
                    $getMainHistory = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->join("pko_users", function($query){
                        $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function($query)use($req){
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if($req->_comandlalID != ""){
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                        }
                    })
                    ->join("pko_missions", function($query){
                        $query->on("pko_officer_main.missionID", "=", "pko_missions.id");
                    })
                    ->join("pko_mission_eelj", function($query){
                        $query->on("pko_officer_main.eeljID", "=", "pko_mission_eelj.id");
                    })
                    ->join("tb_comandlal", function($query){
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function($query){
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_ranks", function($query){
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->select("pko_officer_main.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                    ->get();
                    return $getMainHistory;
                }

        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    public function getHealthChild(Request $req){
        try {
            $getHealth = DB::table("pko_health")
                ->where("pko_health.missionID", "=", $req->_missionID)
                ->where("pko_health.eeljID", "=", $req->_eeljID)
                ->where("pko_health.pkoMainHistoryID", "=", $req->_rowID)
            ->get();
            if($req->_rowID != ""){
                $getEdit = DB::table("pko_health")
                ->where("pko_health.missionID", "=", $req->_missionID)
                ->where("pko_health.eeljID", "=", $req->_eeljID)
                ->where("pko_health.pkoMainHistoryID", "=", $req->_rowID)
                ->first();
            }
            if($getEdit === null){
                $getEditID = 0;
            } else {
                $getEditID = $getEdit->healthEdit;
            }


            $row = array(
                "all" => $getHealth,
                "healthEdit" => $getEditID,
            );
            return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }



    public function newHealthChild(Request $req){
        try {
            // PDFtei holbootoi heseg
            if($req->healthPdf != ""){
                $userID = DB::table("pko_officer_main")
                ->where("pko_officer_main.id", "=", $req->pkoMainHistoryID)
                ->first()->pkoUserID;


                // $userID = Auth::user()->id;
                $userFolder = 'public/healths/'.$req->missionID.'/'.$req->eeljID.'/'.$userID;

                $pdf_64 = $req->healthPdf;
                $setPDFPathID = $req->pdfName."_".$userID;

                $extension = explode('/', explode(':', substr($pdf_64, 0, strpos($pdf_64, ';')))[1])[1];
                $replace = substr($pdf_64, 0, strpos($pdf_64, ',')+1);
                $pdf = str_replace($replace, '', $pdf_64);
                $pdf = str_replace(' ', '+', $pdf);

                $path = $userFolder."/".$setPDFPathID.".".$extension;

                Storage::disk('local')->put($path, base64_decode($pdf));

                $getPDFUrl = '/healths'.'/'.$req->missionID.'/'.$req->eeljID.'/'.$userID.'/'.$setPDFPathID.".".$extension;
            }
            //PDFtei holbootoi heseg end duusna
        $editorRD = DB::table("all_users")
            ->where("all_users.id", "=", Auth::user()->allUsersID)
            ->first();

        $objectRD = DB::table("pko_officer_main")
            ->where("pko_officer_main.id", "=", $req->pkoMainHistoryID)
            ->first();

        if ($objectRD) {
            $objectRD2 = DB::table("pko_users")
                ->where("pko_users.id", "=", $objectRD->pkoUserID)
                ->first();

            if ($objectRD2) {
                $objectRD3 = DB::table("all_users")
                    ->where("all_users.id", "=", $objectRD2->allUsersID)
                    ->first();

                Security::create([
                    'mission' => $req->missionID,
                    'eelj' => $req->eeljID,
                    'MainHistory' => $req->pkoMainHistoryID,
                    'PDF' => $getPDFUrl,
                    'Approve' => $req->healthApprove,
                    'Description' => $req->healthDescription,
                    'edit' => $req->healthEdit,
                    'successful' => "Нэмсэн",
                    'admin_id' => Auth::user()->id,
                    'admin_email' => Auth::user()->email,
                    'admin_name' => all_users::find(Auth::user()->allUsersID)->getUserName(),
                    'adminRD' => $editorRD->rd,
                    'objectName' => $objectRD3->firstName,
                    'objectmail' => $objectRD2->email,
                    'objectRD' => $objectRD3->rd,
                    'user_ip' => $req->ip(),
                ]);
            }
        }

            $insertDoc = new Health();
            $insertDoc->missionID = $req->missionID;
            $insertDoc->eeljID = $req->eeljID;
            $insertDoc->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertDoc->healthPdf = $getPDFUrl;
            $insertDoc->healthApprove = $req->healthApprove;
            $insertDoc->healthDescription = $req->healthDescription;
            $insertDoc->healthEdit = 0;
            $insertDoc->save();

            $insertMainHealth = OfficerMainHistory::find($req->pkoMainHistoryID);
            $insertMainHealth->healthApprove = $req->healthApprove;
            $insertMainHealth->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ), 200
            );
        } catch (\Throwable $th) {
            //  return (Auth::user()->id);
            return $th;
            return response(
                array(
                   $th
                ), 500
            );
        }
    }


    public function editHealthChild(Request $req){
        try {
            // PDFtei holbootoi heseg
            $checkPdf = Health::find($req->id);
            $getPDFUrl = $checkPdf->healthPdf;
            if($req->healthPdf != "" && $checkPdf->healthPdf != $req->healthPdf){
                //pdf delete start

                $deletePdf = Health::find($req->id);
                if($deletePdf->healthPdf != "0"){
                    Storage::delete('public' . $deletePdf->healthPdf);
                }
                //pdf delete end
                $userID = DB::table("pko_officer_main")
                ->where("pko_officer_main.id", "=", $req->pkoMainHistoryID)
                ->first()->pkoUserID;
                $userFolder = 'public/healths/'.$req->missionID.'/'.$req->eeljID.'/'.$userID;

                $pdf_64 = $req->healthPdf;
                $setPDFPathID = $req->pdfName."_".$userID;

                $extension = explode('/', explode(':', substr($pdf_64, 0, strpos($pdf_64, ';')))[1])[1];
                $replace = substr($pdf_64, 0, strpos($pdf_64, ',')+1);
                $pdf = str_replace($replace, '', $pdf_64);
                $pdf = str_replace(' ', '+', $pdf);

                $path = $userFolder."/".$setPDFPathID.".".$extension;

                Storage::disk('local')->put($path, base64_decode($pdf));

                $getPDFUrl = '/healths'.'/'.$req->missionID.'/'.$req->eeljID.'/'.$userID.'/'.$setPDFPathID.".".$extension;
            }
            //PDFtei holbootoi heseg end duusna




             $editorRD = DB::table("all_users")
                ->where("all_users.id", "=", Auth::user()->allUsersID)
                ->first();

            $objectRD = DB::table("pko_officer_main")
                ->where("pko_officer_main.id", "=", $req->pkoMainHistoryID)
                ->first();

        if ($objectRD) {
            $objectRD2 = DB::table("pko_users")
                ->where("pko_users.id", "=", $objectRD->pkoUserID)
                ->first();

        if ($objectRD2) {
            $objectRD3 = DB::table("all_users")
                ->where("all_users.id", "=", $objectRD2->allUsersID)
                ->first();

            Security::create([
                'mission' => $req->missionID,
                'eelj' => $req->eeljID,
                'MainHistory' => $req->pkoMainHistoryID,
                'PDF' => $getPDFUrl,
                'Approve' => $req->healthApprove,
                'Description' => $req->healthDescription,
                'edit' => 4,
                'successful' => "Зассан",
                'admin_id' => Auth::user()->id,
                'admin_email' => Auth::user()->email,
                'admin_name' => all_users::find(Auth::user()->allUsersID)->getUserName(),
                'adminRD' => $editorRD->rd,
                'objectName' => $objectRD3->firstName,
                'objectmail' => $objectRD2->email,
                'objectRD' => $objectRD3->rd,
                'user_ip' => $req->ip(),
            ]);
        }
}

    //          Security::create([
    //         'mission' => $req->missionID,
    //         'eelj' => $req->eeljID,
    //         'MainHistory' => $req->pkoMainHistoryID,
    //         'PDF' => $getPDFUrl,
    //         'Approve' => $req->healthApprove,
    //         'Description' => $req->healthDescription,
    //         'edit' => 4,
    //         'successful' => "Зассан",
    //         'admin_id' => Auth::user()->id,
    //         'admin_email' => Auth::user()->email,
    //         'admin_name' => all_users::find(Auth::user()->allUsersID)->getUserName(),

    // ]);


            $edit = Health::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
            $edit->healthPdf = $getPDFUrl;
            $edit->healthApprove = $req->healthApprove;
            $edit->healthDescription = $req->healthDescription;
            $edit->healthEdit = 4;
            $edit->save();

            $editMainHealth = OfficerMainHistory::find($req->pkoMainHistoryID);
            $editMainHealth->healthApprove = $req->healthApprove;
            $editMainHealth->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function deleteHealthChild(Request $req){
        try {
            $delete = Health::find($req->id);
            if($delete->healthPdf != "0"){
                Storage::delete('public' . $delete->healthPdf);
            }
            $delete->delete();

            $deleteMainHealth = MainHistory::find($req->pkoMainHistoryID);
            $deleteMainHealth->healthApprove = 0;
            $deleteMainHealth->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getHealthTotal(Request $req) {
        try {


            $getHealthTotal = DB::table('pko_officer_main')
                ->where("pko_officer_main.missionID", "=",$req->_missionID)
                ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                ->join("pko_users", function($query){
                    $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_officer_main.id")
                ->get();

                $getNotDone = DB::table('pko_officer_main')
                ->where("pko_officer_main.missionID", "=", $req->_missionID)
                ->where("pko_officer_main.eeljID", "=", $req->_eeljID)

                ->where("pko_officer_main.healthApprove", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_officer_main.id")
                ->get();

                $getApprove = DB::table('pko_officer_main')
                ->where("pko_officer_main.missionID", "=", $req->_missionID)
                ->where("pko_officer_main.eeljID", "=", $req->_eeljID)

                ->where("pko_officer_main.healthApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_officer_main.id")
                ->get();

                $getDecline = DB::table('pko_officer_main')
                ->where("pko_officer_main.missionID", "=", $req->_missionID)
                ->where("pko_officer_main.eeljID", "=", $req->_eeljID)

                ->where("pko_officer_main.healthApprove", "=", 2)
                ->join("pko_users", function($query){
                    $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_officer_main.id")
                ->get();

                $row = array(
                        "total" => count($getHealthTotal),
                        "notDone" => count($getNotDone),
                        "approve" => count($getApprove),
                        "decline" => count($getDecline),
                    );
                    return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }
}
