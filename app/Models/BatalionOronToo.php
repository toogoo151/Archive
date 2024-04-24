<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class BatalionOronToo extends Model
{
    use HasFactory;
    protected $table = "pko_batalion_oron_too";
    public $timestamps = false;

    public function getTomilogdson($req)
    {
        try {
            $getTomilogdson = DB::table("pko_batalion_oron_too")
                ->where("pko_batalion_oron_too.missionID", "=", $req->_missionID)
                ->where("pko_batalion_oron_too.eeljID", "=", $req->_eeljID)
                ->where("pko_batalion_oron_too.isNoots", "=", 0)
                ->where(function ($query) use ($req) {
                    if ($req->_rotID != "") {
                        $query->where("pko_batalion_oron_too.rotID", "=", $req->_rotID);
                        if ($req->_salaaID != "") {
                            $query->where("pko_batalion_oron_too.salaaID", "=", $req->_salaaID);
                            if ($req->_tasagID != "") {
                                $query->where("pko_batalion_oron_too.tasagID", "=", $req->_tasagID);
                            }
                        }
                    }
                })
                ->join("pko_main_history", function ($query) {
                    $query->on("pko_batalion_oron_too.pkoMainHistoryID", "=", "pko_main_history.id")
                        ->where("pko_main_history.isCrime", "=", 0)
                        ->where("pko_main_history.isCanceled", "=", 0);
                })
                ->join("pko_users", function ($query) {
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function ($query) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->join("pko_missions", function ($query) {
                    $query->on("pko_batalion_oron_too.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function ($query) {
                    $query->on("pko_batalion_oron_too.eeljID", "=", "pko_mission_eelj.id");
                })
                ->join("tb_ranks", function ($query) {
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("pko_rot", function ($query) {
                    $query->on("pko_batalion_oron_too.rotID", "=", "pko_rot.id");
                })
                ->leftJoin("pko_salaa", function ($query) {
                    $query->on("pko_batalion_oron_too.salaaID", "=", "pko_salaa.id");
                })
                ->leftJoin("pko_tasag", function ($query) {
                    $query->on("pko_batalion_oron_too.tasagID", "=", "pko_tasag.id");
                })
                ->leftJoin("pko_position", function ($query) {
                    $query->on("pko_batalion_oron_too.positionID", "=", "pko_position.id");
                })
                ->select("pko_batalion_oron_too.*", "all_users.lastName", "all_users.firstName", "all_users.rd", "tb_ranks.shortRank", "pko_rot.rotName", "pko_salaa.salaaName", "pko_tasag.tasagName", "pko_position.positionName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->orderBy("pko_batalion_oron_too.rotID", "ASC")
                ->orderBy("pko_batalion_oron_too.salaaID", "ASC")
                ->orderBy("pko_batalion_oron_too.tasagID", "ASC")
                ->orderBy("pko_batalion_oron_too.positionID", "ASC")
                ->get();
            return $getTomilogdson;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function getTomilogdooguiIDs($req)
    {
        $getTomilogdooguiID = DB::table("pko_main_history")
            ->where("pko_main_history.missionID", "=", $req->_missionID)
            ->where("pko_main_history.eeljID", "=", $req->_eeljID)
            ->where("pko_main_history.sportScore", ">", 0)
            ->join("pko_batalion_oron_too", function ($query) {
                $query->on("pko_main_history.id", "=", "pko_batalion_oron_too.pkoMainHistoryID");
            })
            ->select("pko_batalion_oron_too.pkoMainHistoryID")
            ->get();
        $array = array();
        foreach ($getTomilogdooguiID as $value) {
            array_push($array, $value->pkoMainHistoryID);
        }
        return $array;
    }

    public function getTomilogdoogui($req)
    {
        try {
            $getTomilogdoogui = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.sportScore", ">", 0)
                ->whereNotIn("pko_main_history.id", $this->getTomilogdooguiIDs($req))
                ->join("pko_users", function ($query) {
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })

                ->join("all_users", function ($query) use ($req) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if ($req->_comandlalID != "") {
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                })
                ->leftJoin("pko_sport_score", function ($query) use ($req) {
                    $query->on("pko_main_history.id", "=", "pko_sport_score.pkoMainHistoryID")
                        ->on('pko_sport_score.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_score` where `pkoMainHistoryID`=pko_main_history.id)'));
                })
                ->join("pko_missions", function ($query) {
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function ($query) {
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
                })
                ->join("tb_comandlal", function ($query) {
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->join("tb_unit", function ($query) {
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->join("tb_ranks", function ($query) {
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName", "all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName", "pko_sport_score.sportScore as childScore")
                ->orderBy("pko_main_history.sportScore", "DESC")
                ->orderBy("pko_sport_score.sportScore", "DESC")
                ->get();
            return $getTomilogdoogui;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }


    public function getNoots($req)
    {
        try {
            $getNoots = DB::table("pko_batalion_oron_too")
                ->where("pko_batalion_oron_too.missionID", "=", $req->_missionID)
                ->where("pko_batalion_oron_too.eeljID", "=", $req->_eeljID)
                ->where("pko_batalion_oron_too.isNoots", "=", 1)

                ->join("pko_main_history", function ($query) {
                    $query->on("pko_batalion_oron_too.pkoMainHistoryID", "=", "pko_main_history.id")
                        ->where("pko_main_history.isCrime", "=", 0)
                        ->where("pko_main_history.isCanceled", "=", 0);
                })
                ->join("pko_users", function ($query) {
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function ($query) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->join("pko_missions", function ($query) {
                    $query->on("pko_batalion_oron_too.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function ($query) {
                    $query->on("pko_batalion_oron_too.eeljID", "=", "pko_mission_eelj.id");
                })
                ->join("tb_ranks", function ($query) {
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("pko_sport_changed", function ($query) use ($req) {
                    $query->on("pko_batalion_oron_too.pkoMainHistoryID", "=", "pko_sport_changed.pkoMainHistoryID")
                        ->on('pko_sport_changed.id', "=", DB::raw('(SELECT max(id) FROM `pko_sport_changed` where `pkoMainHistoryID`=pko_batalion_oron_too.pkoMainHistoryID)'));
                })
                ->select("pko_batalion_oron_too.*", "all_users.lastName", "all_users.firstName", "all_users.rd", "tb_ranks.shortRank",  "pko_missions.missionName", "pko_mission_eelj.eeljName", "pko_sport_changed.averageScore as childScore")
                ->orderBy("pko_main_history.sportScore", "DESC")
                ->orderBy("pko_sport_changed.averageScore", "DESC")
                ->get();
            return $getNoots;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }
}
