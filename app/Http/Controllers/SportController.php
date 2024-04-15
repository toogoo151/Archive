<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MainHistory;
use App\Models\Sport;
use App\Models\SportChanged;
use App\Models\SportType;
use App\Models\SportSec;
use App\Models\all_users;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SportController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getSportChild(Request $req){
        try {
            $average = $this->scoreAverage($req);
            $getSport = DB::table("pko_sport_score")
                ->where("pko_sport_score.missionID", "=", $req->_missionID)
                ->where("pko_sport_score.eeljID", "=", $req->_eeljID)
                ->where("pko_sport_score.pkoMainHistoryID", "=", $req->_rowID)
                ->join("pko_sport_type","pko_sport_type.id", "=", "pko_sport_score.sportTypeID")
                ->select("pko_sport_score.*", "pko_sport_type.sportTypeName")
                ->get();


                $row = array(
                    "getSport" => $getSport,
                    "average" => $average,
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

    public function getEditSport(Request $req){
        try {
if($req->_childRowID != []){
    $getEdit = DB::table("pko_sport_score")
                ->where("pko_sport_score.missionID", "=", $req->_missionID)
                ->where("pko_sport_score.eeljID", "=", $req->_eeljID)
                ->where("pko_sport_score.id", "=", $req->_childRowID)
                ->first()->sportEdit;
                $row = array(
                    "sportEdit" => $getEdit,
                );
                return $row;
}

        } catch (\Throwable $th) {
            return response(
                        array(
                            "status" => "error",
                            "msg" => "Алдаа гарлаа."
                        ), 500
                    );
        }
    }


    public function scoreAverage($req){
        try {
            $countSportTypes = new SportType();
            $sportTypesLenght = $countSportTypes->countSport($req);

            $getSum = DB::table("pko_sport_score")
            ->where("missionID", "=", $req->missionID)
            ->where("eeljID", "=", $req->eeljID)
            ->where("pkoMainHistoryID", "=", $req->pkoMainHistoryID)
            ->sum("sportScore");

            $getAverage = ($getSum / $sportTypesLenght);
            return $getAverage;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function checkSportType($req){
        $check = Sport::where("missionID", "=", $req->missionID)
        ->where("eeljID", "=", $req->eeljID)
        ->where("pkoMainHistoryID", "=", $req->pkoMainHistoryID)
        ->where("sportTypeID", "=", $req->sportTypeID)
        ->get();
        if(count($check) == 0)
            return true;
        else
            return false;
    }

    public function newSportChild(Request $req){
        try {
            if(!$this->checkSportType($req)){
                return response(
                    array(
                        "msg" => "Нормативын төрөлд оноо оруулсан байна."
                    ),500
                );
            }


            $insertScore = new Sport();
            $insertScore->missionID = $req->missionID;
            $insertScore->eeljID = $req->eeljID;
            $insertScore->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertScore->genderID = $req->genderID;
            $insertScore->sportTypeID = $req->sportTypeID;
            $insertScore->sportScore = $req->sportScore;
            $insertScore->save();

            $average = $this->scoreAverage($req);

            $insertMainSport = MainHistory::find($req->pkoMainHistoryID);
            $insertMainSport->sportScore = $average;
            $insertMainSport->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
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




    public function editSportChild(Request $req){
        try {
            $edit = Sport::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
            $edit->genderID = $req->genderID;
            $edit->sportTypeID = $req->sportTypeID;
            $edit->sportScore = $req->sportScore;
            $edit->sportEdit = 4;
            $edit->save();

            $average = $this->scoreAverage($req);

            $editMainSport = MainHistory::find($req->pkoMainHistoryID);
            $editMainSport->sportScore = $average;
            $editMainSport->save();
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

    public function deleteSportChild(Request $req){
        try {
            $delete = Sport::find($req->id);
            $delete->delete();

            $average = $this->scoreAverage($req);
            $total = DB::table("pko_sport_score")
            ->where("pko_sport_score.pkoMainHistoryID", "=", $req->pkoMainHistoryID)
            ->get();
            if(count($total) > 0){
                $deleteMainSport = MainHistory::find($req->pkoMainHistoryID);
                $deleteMainSport->sportScore = $average;
                $deleteMainSport->save();
            }
            if(count($total) == 0){
                $deleteMainSport = MainHistory::find($req->pkoMainHistoryID);
                $deleteMainSport->sportScore = 0;
                $deleteMainSport->save();
            }

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

    //Энэ жилдээ ганцхан удаа ашиглах спортын оноо оруулах хэсэг
    public function getSportChanged(Request $req){
        try {
            $getSport = DB::table("pko_sport_changed")
                ->where("pko_sport_changed.missionID", "=", $req->_missionID)
                ->where("pko_sport_changed.eeljID", "=", $req->_eeljID)
                ->where("pko_sport_changed.pkoMainHistoryID", "=", $req->_rowID)
                ->select("pko_sport_changed.*")
                ->get();

                return $getSport;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function newSportChanged(Request $req){
        // try {


    $editorRD = DB::table("all_users")
    ->where("all_users.id", "=", Auth::user()->allUsersID)
    ->first();

    $objectRD = DB::table("pko_main_history")
    ->where("pko_main_history.id", "=", $req->pkoMainHistoryID)
    ->first();

    if ($objectRD) {
        $objectRD2 = DB::table("pko_users")
            ->where("pko_users.id", "=", $objectRD->pkoUserID)
            ->first();

        if ($objectRD2) {
            $objectRD3 = DB::table("all_users")
                ->where("all_users.id", "=", $objectRD2->allUsersID)
                ->first();
        $objectRD4 = DB::table("all_users")
                ->where("all_users.id", "=", $objectRD2->allUsersID)
                ->first();

            SportSec::create([
                'missionID' => $req->missionID,
                'eeljID' => $req->eeljID,
                'pkoMainHistoryID' => $req->pkoMainHistoryID,
                'genderID' => $req->genderID,
                'sportType1' => $req->sportType1,
                'sportType2' => $req->sportType2,
                'sportType3' => $req->sportType3,
                'sportType4' => $req->sportType4,
                'averageScore' => ($req->sportType1 + $req->sportType2+ $req->sportType3 + $req->sportType4) / 4,
                'successful' => "Нэмсэн",
                'admin_id' => Auth::user()->id,
                'admin_email' => Auth::user()->email,
                'admin_name' => all_users::find(Auth::user()->allUsersID)->getUserName(),
                'adminRD' => $editorRD->rd,
                'objectName' => $objectRD4->firstName,
                'objectmail' => $objectRD2->email,
                'objectRD' => $objectRD3->rd,
                'user_ip' => $req->ip(),

            ]);
        }
    }

            $insertScore = new SportChanged();
            $insertScore->missionID = $req->missionID;
            $insertScore->eeljID = $req->eeljID;
            $insertScore->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertScore->genderID = $req->genderID;
            $insertScore->sportType1 = $req->sportType1;
            $insertScore->sportType2 = $req->sportType2;
            $insertScore->sportType3 = $req->sportType3;
            $insertScore->sportType4 = $req->sportType4;
            $insertScore->averageScore = ($req->sportType1 + $req->sportType2+ $req->sportType3 + $req->sportType4) / 4;
            $insertScore->save();

            $insertMainSport = MainHistory::find($req->pkoMainHistoryID);
            $insertMainSport->sportScore = $insertScore->averageScore;
            $insertMainSport->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ), 200
            );
        // } catch (\Throwable $th) {
        //     return response(
        //         array(
        //             "status" => "error",
        //             "msg" => "Алдаа гарлаа."
        //         ), 500
        //     );
        // }
    }

    public function editSportChanged(Request $req){
        try {
             $editorRD = DB::table("all_users")
            ->where("all_users.id", "=", Auth::user()->allUsersID)
            ->first();

            $objectRD = DB::table("pko_main_history")
                ->where("pko_main_history.id", "=", $req->pkoMainHistoryID)
                ->first();

            if ($objectRD) {
                $objectRD2 = DB::table("pko_users")
                    ->where("pko_users.id", "=", $objectRD->pkoUserID)
                    ->first();

                if ($objectRD2) {
                    $objectRD3 = DB::table("all_users")
                        ->where("all_users.id", "=", $objectRD2->allUsersID)
                        ->first();
                $objectRD4 = DB::table("all_users")
                        ->where("all_users.id", "=", $objectRD2->allUsersID)
                        ->first();

                    SportSec::create([
                        'missionID' => $req->missionID,
                        'eeljID' => $req->eeljID,
                        'pkoMainHistoryID' => $req->pkoMainHistoryID,
                        'genderID' => $req->genderID,
                        'sportType1' => $req->sportType1,
                        'sportType2' => $req->sportType2,
                        'sportType3' => $req->sportType3,
                        'sportType4' => $req->sportType4,
                        'averageScore' => ($req->sportType1 + $req->sportType2+ $req->sportType3 + $req->sportType4) / 4,
                        'sportEdit' => 4,
                        'successful' => "Зассан",
                        'admin_id' => Auth::user()->id,
                        'admin_email' => Auth::user()->email,
                        'admin_name' => all_users::find(Auth::user()->allUsersID)->getUserName(),
                        'adminRD' => $editorRD->rd,
                        'objectName' => $objectRD4->firstName,
                        'objectmail' => $objectRD2->email,
                        'objectRD' => $objectRD3->rd,
                        'user_ip' => $req->ip(),

                    ]);
                }
            }

            $edit = SportChanged::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
            $edit->genderID = $req->genderID;
            $edit->sportType1 = $req->sportType1;
            $edit->sportType2 = $req->sportType2;
            $edit->sportType3 = $req->sportType3;
            $edit->sportType4 = $req->sportType4;
            $edit->averageScore = ($req->sportType1 + $req->sportType2+ $req->sportType3 + $req->sportType4) / 4;
            $edit->sportEdit = 4;
            $edit->save();


            $editMainSport = MainHistory::find($req->pkoMainHistoryID);
            $editMainSport->sportScore =  $edit->averageScore;
            $editMainSport->save();
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

    public function getChangedEditSport(Request $req){
        try {
            if($req->_childRowID != []){
                $getEdit = DB::table("pko_sport_changed")
                ->where("pko_sport_changed.missionID", "=", $req->_missionID)
                ->where("pko_sport_changed.eeljID", "=", $req->_eeljID)
                ->where("pko_sport_changed.id", "=", $req->_childRowID)
                ->first()->sportEdit;
                $row = array(
                    "sportEdit" => $getEdit,
                );
                return $row;
}

        } catch (\Throwable $th) {
            return response(
                        array(
                            "status" => "error",
                            "msg" => "Алдаа гарлаа."
                        ), 500
                    );
        }
    }

    public function getShalgaltUguuguiIDs($req){
        $getTomilogdooguiID = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->join("pko_sport_changed", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_changed.pkoMainHistoryID");
                        $query->where("pko_sport_changed.missionID", "=",$req->_missionID)
                        ->where("pko_sport_changed.eeljID", "=",$req->_eeljID);
                })
                ->select("pko_sport_changed.pkoMainHistoryID")
                ->get();
                $array = array();
                foreach ($getTomilogdooguiID as $value) {
                    array_push($array, $value->pkoMainHistoryID);
                }
            return $array;
    }

    public function getSportMen(Request $req){
        try {
            if($req->_sportState == "all"){
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.healthApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.gender", "=", 11)
                    ->where("all_users.comandlalID", "<", 8)
                    ->where("all_users.rankParentID", "=", 1);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })

                ->leftJoin("pko_sport_score", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                    ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                })

                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "all_users.gender", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_score.sportScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore",function($query){
                //     $query->on("DESC");
                // })
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            } else if ($req->_sportState == "gived") {
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.healthApprove", "=", 1)
                // ->where("pko_main_history.sportScore", ">", 0)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.gender", "=", 11)
                    ->where("all_users.comandlalID", "<", 8)
                    ->where("all_users.rankParentID", "=", 1);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->join("pko_sport_changed", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_changed.pkoMainHistoryID");
                        $query->where("pko_sport_changed.missionID", "=",$req->_missionID)
                        ->where("pko_sport_changed.eeljID", "=",$req->_eeljID);

                })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_changed.averageScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            }
            else if ($req->_sportState == "notGiven") {
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.healthApprove", "=", 1)
                // ->where("pko_main_history.sportScore", "=", 0.00)
                ->whereNotIn("pko_main_history.id", $this->getShalgaltUguuguiIDs($req))
                ->where("pko_main_history.isCrime", "=", 0)
            ->where("pko_main_history.isCanceled", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.gender", "=", 11)
                    ->where("all_users.comandlalID", "<", 8)
                    ->where("all_users.rankParentID", "=", 1);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->leftJoin("pko_sport_score", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                    ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_score.sportScore as childScore",  "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }


    public function getSportWomen(Request $req){
        try {
            if($req->_sportState == "all"){
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.healthApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.gender", "=", 22)
                    ->where("all_users.comandlalID", "<", 8)
                    ->where("all_users.rankParentID", "=", 1);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })

                ->leftJoin("pko_sport_score", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                    ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                })

                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "all_users.gender", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_score.sportScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore",function($query){
                //     $query->on("DESC");
                // })
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            } else if ($req->_sportState == "gived") {
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.healthApprove", "=", 1)
                // ->where("pko_main_history.sportScore", ">", 0)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.gender", "=", 22)
                    ->where("all_users.comandlalID", "<", 8)
                    ->where("all_users.rankParentID", "=", 1);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->join("pko_sport_changed", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_changed.pkoMainHistoryID");
                        $query->where("pko_sport_changed.missionID", "=",$req->_missionID)
                        ->where("pko_sport_changed.eeljID", "=",$req->_eeljID);
                })
                // ->leftJoin("pko_sport_score", function($query)use($req){
                //     $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                //     ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                // })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_changed.averageScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            }
            else if ($req->_sportState == "notGiven") {
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.healthApprove", "=", 1)
                // ->where("pko_main_history.sportScore", "=", 0.00)
                ->whereNotIn("pko_main_history.id", $this->getShalgaltUguuguiIDs($req))
                ->where("pko_main_history.isCrime", "=", 0)
            ->where("pko_main_history.isCanceled", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.gender", "=", 22)
                    ->where("all_users.comandlalID", "<", 8)
                    ->where("all_users.rankParentID", "=", 1);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->leftJoin("pko_sport_score", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                    ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_score.sportScore as childScore",  "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }
    public function getSportGereet(Request $req){
        try {
            if($req->_sportState == "all"){
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.healthApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.rankParentID", "=", 2)
                    ->where("all_users.rankTypeID", "=", 7);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })

                ->leftJoin("pko_sport_score", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                    ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                })

                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "all_users.gender", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_score.sportScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore",function($query){
                //     $query->on("DESC");
                // })
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            } else if ($req->_sportState == "gived") {
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.healthApprove", "=", 1)
                // ->where("pko_main_history.sportScore", ">", 0)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.rankParentID", "=", 2)
                    ->where("all_users.rankTypeID", "=", 7);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->join("pko_sport_changed", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_changed.pkoMainHistoryID");
                        $query->where("pko_sport_changed.missionID", "=",$req->_missionID)
                        ->where("pko_sport_changed.eeljID", "=",$req->_eeljID);
                })
                // ->leftJoin("pko_sport_score", function($query)use($req){
                //     $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                //     ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                // })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_changed.averageScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            }
            else if ($req->_sportState == "notGiven") {
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.healthApprove", "=", 1)
                // ->where("pko_main_history.sportScore", "=", 0.00)
                ->whereNotIn("pko_main_history.id", $this->getShalgaltUguuguiIDs($req))
                ->where("pko_main_history.isCrime", "=", 0)
            ->where("pko_main_history.isCanceled", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.rankParentID", "=", 2)
                    ->where("all_users.rankTypeID", "=", 7);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->leftJoin("pko_sport_score", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                    ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_score.sportScore as childScore",  "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getSportOther(Request $req){
        try {
            if($req->_sportState == "all"){
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.healthApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.comandlalID", ">", 7);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })

                ->leftJoin("pko_sport_score", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                    ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                })

                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "all_users.gender", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_score.sportScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore",function($query){
                //     $query->on("DESC");
                // })
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            } else if ($req->_sportState == "gived") {
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.healthApprove", "=", 1)
                // ->where("pko_main_history.sportScore", ">", 0)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.comandlalID", ">", 7);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->join("pko_sport_changed", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_changed.pkoMainHistoryID");
                        $query->where("pko_sport_changed.missionID", "=",$req->_missionID)
                        ->where("pko_sport_changed.eeljID", "=",$req->_eeljID);
                })
                // ->leftJoin("pko_sport_score", function($query)use($req){
                //     $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                //     ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                // })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_changed.averageScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            }
            else if ($req->_sportState == "notGiven") {
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.healthApprove", "=", 1)
                // ->where("pko_main_history.sportScore", "=", 0.00)
                ->whereNotIn("pko_main_history.id", $this->getShalgaltUguuguiIDs($req))
                ->where("pko_main_history.isCrime", "=", 0)
            ->where("pko_main_history.isCanceled", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.comandlalID", ">", 7);
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->leftJoin("pko_sport_score", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                    ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));

                })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
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
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->join("pko_health", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                        $query->where("pko_health.missionID", "=",$req->_missionID)
                        ->where("pko_health.eeljID", "=",$req->_eeljID);
                    if($req->_healthDate != ""){
                        $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    }
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_score.sportScore as childScore",  "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                // ->orderBy("pko_main_history.sportScore", "DESC")
                // ->orderBy("pko_sport_score.sportScore", "DESC")
                ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                ->get();
                return $getMainHistory;
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }


    //Энэ жилдээ ганцхан удаа ашиглах спортын оноо оруулах хэсэг
}
