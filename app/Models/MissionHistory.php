<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MissionHistory extends Model
{
    use HasFactory;
    protected $table = 'pko_mission_history';
    public $timestamps = false;

    public function getMissionHistorys($req){
        try {
            if(Auth::user()->user_type == "superAdmin"){
                $getHistory = DB::table("pko_mission_history")
                ->where("pko_mission_history.missionID", "=", $req->_missionID)
                ->where("pko_mission_history.eeljID", "=", $req->_eeljID)
                // ->join("pko_users", function($query){
                //     $query->on("pko_mission_history.allUserID", "=", "pko_users.id" );
                // })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_mission_history.allUserID", "=", "all_users.id");
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
                    $query->on("pko_mission_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_mission_history.eeljID", "=", "pko_mission_eelj.id");
                })
                ->leftJoin("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->leftJoin("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("pko_position", function($query){
                    $query->on("pko_mission_history.missionPosition", "=", "pko_position.id");
                })
                ->select("pko_mission_history.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.lastName", "all_users.firstName", "tb_ranks.shortRank", "pko_position.positionName")
                ->orderBy("pko_mission_history.missionID", "DESC")
                ->orderBy("pko_mission_history.eeljID", "DESC")
                ->orderBy("pko_mission_history.missionPosition", "DESC")
                ->get();
                return $getHistory;
            }
            if(Auth::user()->user_type == "comandlalAdmin"){
                $myComandlalRow = new all_users();

                $getHistory = DB::table("pko_mission_history")
                ->where("pko_mission_history.missionID", "=", $req->_missionID)
                ->where("pko_mission_history.eeljID", "=", $req->_eeljID)
                // ->join("pko_users", function($query){
                //     $query->on("pko_mission_history.allUserID", "=", "pko_users.id" );
                // })
                ->join("all_users", function($query)use($myComandlalRow, $req){
                    $query->on("pko_mission_history.allUserID", "=", "all_users.id")
                    ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->join("pko_missions", function($query){
                    $query->on("pko_mission_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_mission_history.eeljID", "=", "pko_mission_eelj.id");
                })
                ->leftJoin("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->leftJoin("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("pko_position", function($query){
                    $query->on("pko_mission_history.missionPosition", "=", "pko_position.id");
                })
                ->select("pko_mission_history.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.lastName", "all_users.firstName", "tb_ranks.shortRank", "pko_position.positionName")
                ->orderBy("pko_mission_history.missionID", "DESC")
                ->orderBy("pko_mission_history.eeljID", "DESC")
                ->orderBy("pko_mission_history.missionPosition", "DESC")
                ->get();
                return $getHistory;
            }
            if(Auth::user()->user_type == "unitAdmin"){
                $myUnitRow = new all_users();

                $getHistory = DB::table("pko_mission_history")
                ->where("pko_mission_history.missionID", "=", $req->_missionID)
                ->where("pko_mission_history.eeljID", "=", $req->_eeljID)
                // ->join("pko_users", function($query){
                //     $query->on("pko_mission_history.allUserID", "=", "pko_users.id" );
                // })
                ->join("all_users", function($query)use($myUnitRow, $req){
                    $query->on("pko_mission_history.allUserID", "=", "all_users.id")
                    ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    if($req->_genderID != ""){
                        $query->where("all_users.gender", "=", $req->_genderID);
                    }
                })
                ->join("pko_missions", function($query){
                    $query->on("pko_mission_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_mission_history.eeljID", "=", "pko_mission_eelj.id");
                })
                ->leftJoin("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->leftJoin("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("pko_position", function($query){
                    $query->on("pko_mission_history.missionPosition", "=", "pko_position.id");
                })
                ->select("pko_mission_history.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.lastName", "all_users.firstName", "tb_ranks.shortRank", "pko_position.positionName")
                ->orderBy("pko_mission_history.missionID", "DESC")
                ->orderBy("pko_mission_history.eeljID", "DESC")
                ->orderBy("pko_mission_history.missionPosition", "DESC")
                ->get();
                return $getHistory;
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
}
