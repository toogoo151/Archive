<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OfficerSkill;
use App\Models\OfficerLanguage;
use App\Models\PkoOfficerLanguagesec;
use App\Models\OfficerSecSkill;
use App\Models\OfficerDriverSkill;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\OfficerDriver;
use App\Models\all_users;


use Illuminate\Support\Facades\DB;
use App\Models\OfficerMainHistory;

class SkillOfficerController extends Controller
{
    public function editLanguage(Request $req)
    {
        try {
            if ($req->has('documentPdf') && strlen($req->documentPdf) > 50) {
                // PDF delete
                $deletePdf = OfficerLanguage::find($req->id);
                if ($deletePdf->documentPdf != "0") {
                    Storage::delete('public' . $deletePdf->documentPdf);
                }
                // PDF delete

                $userID = $deletePdf->pkoUserID;
                $userFolder = 'public/documents/officerLanguage/' . $req->missionID . '/' . $req->eeljID . '/' . $userID;

                $pdf_64 = $req->documentPdf;
                // $setPDFPathID = $req->pdfName . "_" . $userID;

                $extension = explode('/', explode(':', substr($pdf_64, 0, strpos($pdf_64, ';')))[1])[1];
                $replace = substr($pdf_64, 0, strpos($pdf_64, ',') + 1);
                $pdf = str_replace($replace, '', $pdf_64);
                $pdf = str_replace(' ', '+', $pdf);

                $path = $userFolder . "/" . $userID . "." . $extension;

                Storage::disk('local')->put($path, base64_decode($pdf));

                $getPDFUrl = '/documents/officerLanguage' . '/' . $req->missionID . '/' . $req->eeljID . '/' . $userID . '/' . $userID . "." . $extension;
            }



            $edit = OfficerLanguage::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->readCol = $req->readCol;
            $edit->writeCol = $req->writeCol;
            $edit->listenCol = $req->listenCol;
            $edit->speakCol = $req->speakCol;
            $edit->totalScore = ($req->readCol + $req->writeCol + $req->listenCol + $req->speakCol) / 4;
            $edit->alcpt = $req->alcpt;
            $edit->documentPdf = isset($getPDFUrl) ? $getPDFUrl : $edit->documentPdf;
            $edit->save();

            $lognew = new PkoOfficerLanguagesec();
            $lognew->missionID = $edit->missionID;
            $lognew->eeljID = $edit->eeljID;
            $lognew->MainTableID = $edit->MainTableID;
            $lognew->readCol = $edit->readCol;
            $lognew->writeCol = $edit->writeCol;
            $lognew->listenCol = $edit->listenCol;
            $lognew->speakCol = $edit->speakCol;
            $lognew->totalScore = $edit->totalScore;
            $lognew->alcpt = $req->alcpt;
            $lognew->successful = "Нэмсэн";
            $lognew->admin_id = Auth::user()->id;
            $lognew->admin_email = Auth::user()->email;
            $lognew->admin_name = all_users::find(Auth::user()->allUsersID)->getUserName();
            $editorRD = DB::table("all_users")->where("id", Auth::user()->allUsersID)->first();
            $lognew->adminRD = $editorRD->rd;
            $objectRD = DB::table("pko_officer_main")->where("id", $edit->MainTableID)->first();
            $objectRD = DB::table("pko_officer_main")->where("id", $edit->MainTableID)->first();
            if ($objectRD) {
                $objectRD2 = DB::table("pko_users")->where("id", $objectRD->pkoUserID)->first();
                // dd($objectRD2);
                if ($objectRD2) {
                    $objectRD3 = DB::table("all_users")->where("id", $objectRD2->allUsersID)->first();
                    if ($objectRD3) {
                        $lognew->objectName = $objectRD3->firstName;
                        $lognew->objectmail = $objectRD2->email;
                        $lognew->objectRD = $objectRD3->rd;
                    } else {
                        $lognew->objectName = 'DefaultName';
                        $lognew->objectmail = null;
                        $lognew->objectRD = null;
                    }
                }
            }
            $lognew->user_ip = $req->ip();
            $lognew->save();


            $editlanguage = OfficerMainHistory::find($edit->MainTableID);
            $editlanguage->languageScore = $edit->totalScore;
            $editlanguage->alcpt_score = $edit->alcpt;
            $editlanguage->save();

            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай нэмлээ."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response([
                "status" => "error",
                "msg" => "Алдаа гарлаа.",
                "error" => $th->getMessage()
            ], 500);
        }
    }
    public function editSkill(Request $req)
    {
        try {
            if ($req->has('documentPdf') && strlen($req->documentPdf) > 50) {
                // PDF delete
                $deletePdf = OfficerSkill::find($req->id);
                if ($deletePdf->documentPdf != "0") {
                    Storage::delete('public' . $deletePdf->documentPdf);
                }
                // PDF delete

                $userID = $deletePdf->pkoUserID;
                $userFolder = 'public/documents/skill/' . $req->missionID . '/' . $req->eeljID . '/' . $userID;

                $pdf_64 = $req->documentPdf;
                // $setPDFPathID = "_" . $userID;

                $extension = explode('/', explode(':', substr($pdf_64, 0, strpos($pdf_64, ';')))[1])[1];
                $replace = substr($pdf_64, 0, strpos($pdf_64, ',') + 1);
                $pdf = str_replace($replace, '', $pdf_64);
                $pdf = str_replace(' ', '+', $pdf);

                $path = $userFolder . "/" . $userID  . "." . $extension;

                Storage::disk('local')->put($path, base64_decode($pdf));

                $getPDFUrl = '/documents/skill' . '/' . $req->missionID . '/' . $req->eeljID . '/' . $userID . '/' . $userID . "." . $extension;
            }
            $edit = OfficerSkill::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->SignalScore = $req->SignalScore;
            $edit->LocationScore = $req->LocationScore;
            $edit->documentPdf = isset($getPDFUrl) ? $getPDFUrl : $edit->documentPdf;
            $edit->TotalScore = ($req->SignalScore + $req->LocationScore) / 2;
            $edit->save();

            $lognew = new OfficerSecSkill();
            $lognew->missionID = $edit->missionID;
            $lognew->eeljID = $edit->eeljID;
            $lognew->MainTableID = $edit->MainTableID;
            $lognew->SignalScore = $edit->SignalScore;
            $lognew->LocationScore = $edit->LocationScore;
            $lognew->TotalScore = $edit->TotalScore;
            $lognew->successful = "Нэмсэн";
            $lognew->admin_id = Auth::user()->id;
            $lognew->admin_email = Auth::user()->email;
            $lognew->admin_name = all_users::find(Auth::user()->allUsersID)->getUserName();
            $editorRD = DB::table("all_users")->where("id", Auth::user()->allUsersID)->first();
            $lognew->adminRD = $editorRD->rd;
            $objectRD = DB::table("pko_officer_main")->where("id", $edit->MainTableID)->first();
            $objectRD = DB::table("pko_officer_main")->where("id", $edit->MainTableID)->first();
            if ($objectRD) {
                $objectRD2 = DB::table("pko_users")->where("id", $objectRD->pkoUserID)->first();
                // dd($objectRD2);
                if ($objectRD2) {
                    $objectRD3 = DB::table("all_users")->where("id", $objectRD2->allUsersID)->first();
                    if ($objectRD3) {
                        $lognew->objectName = $objectRD3->firstName;
                        $lognew->objectmail = $objectRD2->email;
                        $lognew->objectRD = $objectRD3->rd;
                    } else {
                        $lognew->objectName = 'DefaultName';
                        $lognew->objectmail = null;
                        $lognew->objectRD = null;
                    }
                }
            }
            $lognew->user_ip = $req->ip();
            $lognew->save();

            $editskill = OfficerMainHistory::find($edit->MainTableID);
            $editskill->skillScore = $edit->TotalScore;
            $editskill->save();

            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай нэмлээ."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response([
                "status" => "error",
                "msg" => "Алдаа гарлаа.",
                "error" => $th->getMessage()
            ], 500);
        }
    }

    public function editDriver(Request $req)
    {
        try {
            $edit = OfficerDriver::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->score = $req->score;
            $edit->scoreApprove = $req->scoreApprove;
            $edit->practice = $req->practice;
            if ($req->scoreApprove == 1 && $req->practice == 1) {
                $edit->finally = 1;
            } else {
                $edit->finally = 2;
            }

            $edit->save();

            $lognew = new OfficerDriverSkill();
            $lognew->missionID = $edit->missionID;
            $lognew->eeljID = $edit->eeljID;
            $lognew->MainTableID = $edit->MainTableID;
            $lognew->score = $edit->score;
            $lognew->scoreApprove = $edit->scoreApprove;
            $lognew->practice = $edit->practice;
            if ($req->scoreApprove == 1 && $req->practice == 1) {
                $lognew->finally = 1;
            } else {
                $lognew->finally = 2;
            }

            $lognew->successful = "Нэмсэн";
            $lognew->admin_id = Auth::user()->id;
            $lognew->admin_email = Auth::user()->email;
            $lognew->admin_name = all_users::find(Auth::user()->allUsersID)->getUserName();
            $editorRD = DB::table("all_users")->where("id", Auth::user()->allUsersID)->first();
            $lognew->adminRD = $editorRD->rd;
            $objectRD = DB::table("pko_officer_main")->where("id", $edit->MainTableID)->first();
            $objectRD = DB::table("pko_officer_main")->where("id", $edit->MainTableID)->first();
            if ($objectRD) {
                $objectRD2 = DB::table("pko_users")->where("id", $objectRD->pkoUserID)->first();
                // dd($objectRD2);
                if ($objectRD2) {
                    $objectRD3 = DB::table("all_users")->where("id", $objectRD2->allUsersID)->first();
                    if ($objectRD3) {
                        $lognew->objectName = $objectRD3->firstName;
                        $lognew->objectmail = $objectRD2->email;
                        $lognew->objectRD = $objectRD3->rd;
                    } else {
                        $lognew->objectName = 'DefaultName';
                        $lognew->objectmail = null;
                        $lognew->objectRD = null;
                    }
                }
            }
            $lognew->user_ip = $req->ip();
            $lognew->save();

            $editdriver = OfficerMainHistory::find($edit->MainTableID);
            if ($req->scoreApprove == 1 && $req->practice == 1) {
                $editdriver->driverApprove = 1;
            } else {
                $editdriver->driverApprove = 2;
            }
            $editdriver->save();

            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай нэмлээ."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response([
                "status" => "error",
                "msg" => "Алдаа гарлаа.",
                "error" => $th->getMessage() // Include the error message in the response
            ], 500);
        }
    }

    public function count(Request $req){
        $counts = DB::table("pko_officer_skill")
            ->count();
        return $counts;

    }

}
