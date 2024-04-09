<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Canceled extends Model
{
    use HasFactory;
    protected $table = "pko_canceled";
    public $timestamps = false;

    public function getCanceledMain($req){
        try {
                    $getCanceledMain = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCanceled", "=", 0)
                // ->where(function($query)use($req){
                //     if($req->_canceledState != ""){
                //     $query->where("pko_main_history.isCanceled", "=", $req->_canceledState);
                //     }
                // })
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
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
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->get();
            return $getCanceledMain;

        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getCanceledTotal($req){
        try {
            $getCanceledTotal = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=",$req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCanceled", "=", 2)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
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
                ->select("pko_main_history.id")
                ->get();
                return count($getCanceledTotal);
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
