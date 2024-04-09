<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Airplane extends Model
{
    use HasFactory;
    protected $table = 'pko_airplane_shift';
    public $timestamps = false;


    public function getEeljHiigdeeguiIDs($req){
        $getTomilogdooguiID = DB::table("pko_batalion_oron_too")
                ->where("pko_batalion_oron_too.missionID", "=", $req->_missionID)
                ->where("pko_batalion_oron_too.eeljID", "=", $req->_eeljID)
                ->join("pko_airplane_shift", function($query){
                    $query->on("pko_batalion_oron_too.pkoMainHistoryID", "=", "pko_airplane_shift.pkoMainHistoryID");
                })
                ->select("pko_airplane_shift.pkoMainHistoryID")
                ->get();
                $array = array();
                foreach ($getTomilogdooguiID as $value) {
                    array_push($array, $value->pkoMainHistoryID);
                }
            return $array;
    }

    public function getAirplaneEeljHiigdeegui($req){
        try {
                $getTomilogdson = DB::table("pko_batalion_oron_too")
                ->where("pko_batalion_oron_too.missionID", "=", $req->_missionID)
                ->where("pko_batalion_oron_too.eeljID", "=", $req->_eeljID)
                ->join("pko_missions", function($query){
                    $query->on("pko_batalion_oron_too.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_batalion_oron_too.eeljID", "=", "pko_mission_eelj.id");
                })
                ->whereNotIn("pko_batalion_oron_too.pkoMainHistoryID", $this->getEeljHiigdeeguiIDs($req))
                ->where(function($query)use($req){
                    if($req->_rotID != ""){
                        $query->where("pko_batalion_oron_too.rotID", "=", $req->_rotID);
                        if($req->_salaaID != ""){
                            $query->where("pko_batalion_oron_too.salaaID", "=", $req->_salaaID);
                            if($req->_tasagID != ""){
                                $query->where("pko_batalion_oron_too.tasagID", "=", $req->_tasagID);
                            }
                        }
                    }
                })
                // ->join("pko_airplane_shift", function($query)use($req){
                //     $query->on("pko_batalion_oron_too.pkoMainHistoryID", "=", "pko_airplane_shift.pkoMainHistoryID")
                //             ->where("pko_airplane_shift.airplaneDeparturedID", "=", $req->_airplaneState);
                // })
                ->join("pko_main_history", function($query){
                    $query->on("pko_batalion_oron_too.pkoMainHistoryID", "=", "pko_main_history.id")
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0);
                })
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("pko_rot", function($query){
                    $query->on("pko_batalion_oron_too.rotID", "=", "pko_rot.id");
                })
                ->leftJoin("pko_salaa", function($query){
                    $query->on("pko_batalion_oron_too.salaaID", "=", "pko_salaa.id");
                })
                ->leftJoin("pko_tasag", function($query){
                    $query->on("pko_batalion_oron_too.tasagID", "=", "pko_tasag.id");
                })
                ->leftJoin("pko_position", function($query){
                    $query->on("pko_batalion_oron_too.positionID", "=", "pko_position.id");
                })
                ->select("pko_batalion_oron_too.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "pko_rot.rotName", "pko_salaa.salaaName", "pko_tasag.tasagName", "pko_position.positionName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
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
                ), 500
            );
        }
    }

    public function getAirplaneTotal($req){
        try {
            $getEelj1 = DB::table("pko_airplane_shift")
            ->where("pko_airplane_shift.missionID", "=", $req->_missionID)
            ->where("pko_airplane_shift.eeljID", "=", $req->_eeljID)
            ->join("pko_batalion_oron_too", function($query)use($req){
                $query->on("pko_airplane_shift.pkoMainHistoryID", "=", "pko_batalion_oron_too.pkoMainHistoryID");
                if($req->_rotID != ""){
                    $query->where("pko_batalion_oron_too.rotID", "=", $req->_rotID);
                    if($req->_salaaID != ""){
                        $query->where("pko_batalion_oron_too.salaaID", "=", $req->_salaaID);
                        if($req->_tasagID != ""){
                            $query->where("pko_batalion_oron_too.tasagID", "=", $req->_tasagID);
                        }
                    }
                }
            })
            ->join("pko_airplane_shift_item", "pko_airplane_shift_item.id", "=", "pko_airplane_shift.airplaneDeparturedID")
            ->select("pko_airplane_shift_item.airplaneShiftItemName as eeljName", "pko_airplane_shift.airplaneDeparturedID as eelj")
            ->get();
            return $getEelj1;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function test($req){
        try {
            $getEeljs = DB::table("pko_airplane_shift")
            ->where("pko_airplane_shift.missionID", "=", 1)
            ->where("pko_airplane_shift.eeljID", "=", 13)
            ->join("pko_batalion_oron_too", function($query)use($req){
                $query->on("pko_airplane_shift.pkoMainHistoryID", "=", "pko_batalion_oron_too.pkoMainHistoryID");

            })
            ->join("pko_airplane_shift_item", "pko_airplane_shift_item.id", "=", "pko_airplane_shift.airplaneDeparturedID")
            ->select("pko_airplane_shift.airplaneDeparturedID as eelj", "pko_airplane_shift_item.airplaneShiftItemName as eeljName")
            ->get();

            $eeljsArray = array();
            $eeljCount = 0;
            foreach ($getEeljs as $getEelj){
                $eeljCount = $eeljCount + $getEelj->eelj;
                $row = array(
                    "eelj" => [$getEelj->eelj],
                    "eeljName" => [$getEelj->eeljName],
                );
                array_push($eeljsArray, $row);
            }



            return $eeljsArray;
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
