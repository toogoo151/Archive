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

class SportOfficerController extends Controller
{
    public function getUsersFromOfficerMainHistory(Request $req){
        try {

                if($req->_sportState == "all"){
                    $getMainHistory = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_main.documentsMainApprove", "=", 1)
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
                        if($req->_genderID != ""){
                            $query->where("all_users.gender", "=", $req->_genderID);
                        }
                    })

                    ->leftJoin("pko_sport_changed", function($query)use($req){
                        $query->on("pko_officer_main.id", "=", "pko_sport_changed.pkoMainHistoryID");
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
                    ->join("tb_gender", function($query){
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->join("pko_health", function($query)use($req){
                        $query->on("pko_officer_main.id", "=", "pko_health.pkoMainHistoryID");
                        if($req->_healthDate != ""){
                            $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                        }
                    })
                    ->select("pko_officer_main.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "all_users.gender", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_changed.averageScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                    ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                    ->get();
                    return $getMainHistory;
                } else if ($req->_sportState == "gived") {
                    $getMainHistory = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_main.documentsMainApprove", "=", 1)
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
                        if($req->_genderID != ""){
                            $query->where("all_users.gender", "=", $req->_genderID);
                        }
                    })
                    ->join("pko_sport_changed", function($query)use($req){
                        $query->on("pko_officer_main.id", "=", "pko_sport_changed.pkoMainHistoryID");
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
                    ->join("tb_gender", function($query){
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->join("pko_health", function($query)use($req){
                        $query->on("pko_officer_main.id", "=", "pko_health.pkoMainHistoryID");
                        if($req->_healthDate != ""){
                            $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                        }
                    })
                    ->select("pko_officer_main.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "all_users.gender", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_sport_changed.averageScore as childScore", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                    // ->orderBy("pko_main_history.sportScore", "DESC")
                    // ->orderBy("pko_sport_score.sportScore", "DESC")
                    ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                    ->get();
                    return $getMainHistory;
                }

                else if ($req->_sportState == "notGiven") {
                    $getMainHistory = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_main.documentsMainApprove", "=", 1)
                    ->whereNotIn("pko_officer_main.id", $this->getShalgaltUguuguiIDs($req))
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
                        if($req->_genderID != ""){
                            $query->where("all_users.gender", "=", $req->_genderID);
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
                    ->join("tb_gender", function($query){
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->join("pko_health", function($query)use($req){
                        $query->on("pko_officer_main.id", "=", "pko_health.pkoMainHistoryID");
                        if($req->_healthDate != ""){
                            $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                        }
                    })
                    ->select("pko_officer_main.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "all_users.gender", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName",   "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName", DB::raw("DATE(pko_health.created_at) as healthDate"))
                    // ->orderBy("pko_main_history.sportScore", "DESC")
                    // ->orderBy("pko_sport_score.sportScore", "DESC")
                    ->orderByRaw("DATE(pko_health.created_at) DESC, all_users.age ASC")
                    ->get();
                    return $getMainHistory;
                }

        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
