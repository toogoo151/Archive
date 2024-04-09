<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainHistoryController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getUserDetails(Request $req){
        try {
            $getUserDetail = DB::table("pko_main_history")
                ->where("pko_main_history.id", "=", $req->_id)
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->join("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->join("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->select("pko_main_history.pkoUserID", "all_users.rd", "all_users.image", "all_users.firstName", "all_users.lastName", "all_users.age", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "tb_gender.genderName")
                ->first();

            $getMissionHistory = DB::table("pko_main_history")
                ->where("pko_main_history.id", "=", $req->_id)
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->join("pko_mission_history", function($query){
                    $query->on("all_users.id", "=", "pko_mission_history.allUserID");
                })
                ->join("pko_missions", function($query){
                    $query->on("pko_mission_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_mission_history.eeljID", "=", "pko_mission_eelj.id");
                })
                ->join("pko_position", function($query){
                    $query->on("pko_mission_history.missionPosition", "=", "pko_position.id");
                })
                ->select("pko_mission_history.*", "pko_position.positionName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->get();

                $row = array(
                    "getUserDetails" => $getUserDetail,
                    "getMissionHistory" => $getMissionHistory,
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

    public function getUuregGuitsetgelt(Request $req){
        try {
            $getUureg = DB::table("pko_mission_history")
                ->where("pko_mission_history.missionID", "=", $req->_missionID)
                ->where("pko_mission_history.eeljID", "=", $req->_eeljID)
                ->where("pko_mission_history.id", "=", $req->_id)
                ->join("all_users", function($query){
                    $query->on("pko_mission_history.allUserID", "=", "all_users.id");
                })
                ->join("pko_users", function($query){
                    $query->on("all_users.id", "=", "pko_users.allUsersID");
                })
                ->join("pko_main_history", function($query){
                    $query->on("pko_users.id", "=", "pko_main_history.pkoUserID");
                })
                ->join("pko_uureg_guitsetgelt", function($query){
                    $query->on("pko_main_history.id", "=", "pko_uureg_guitsetgelt.pkoMainHistoryID");
                })
                ->join("pko_uureg_applause", function($query){
                    $query->on("pko_uureg_guitsetgelt.applauseID", "=", "pko_uureg_applause.id");
                })
                ->join("pko_uureg_applause_sub", function($query){
                    $query->on("pko_uureg_guitsetgelt.applauseSubID", "=", "pko_uureg_applause_sub.id");
                })
                ->select("pko_mission_history.*", "pko_uureg_guitsetgelt.applauseDescription", "pko_uureg_guitsetgelt.applauseDate", "pko_uureg_applause.isApplauseName", "pko_uureg_applause_sub.applauseHelber")
                ->get();
                return $getUureg;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }



}
