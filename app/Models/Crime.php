<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Crime extends Model
{
    use HasFactory;
    protected $table = "pko_is_crime";
    public $timestamps = false;

    public function getSpyMain($req){
        $getSpyMain = DB::table("pko_main_history")
        ->where("pko_main_history.missionID", "=", $req->_missionID)
        ->where("pko_main_history.eeljID", "=", $req->_eeljID)
        ->where("pko_main_history.sportScore", ">", 0)
        ->where("pko_main_history.isCanceled", "=", 0)
        ->where("pko_main_history.isCrime", "=", 0)
        // ->where(function($query)use($req){
        //     if($req->_spyState != ""){
        //     $query->where("pko_main_history.isCrime", "=", $req->_spyState);
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
        ->select("pko_main_history.*", "all_users.firstName","all_users.lastName","all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
        ->get();

    return $getSpyMain;
    }

    public function isHolbogdson($req){
        try {
            $getHolbogdson = DB::table("pko_is_crime")
                ->where("pko_is_crime.missionID", "=", $req->_missionID)
                ->where("pko_is_crime.eeljID", "=", $req->_eeljID)
                ->join("pko_main_history", function($query){
                    $query->on("pko_is_crime.pkoMainHistoryID", "=", "pko_main_history.id")
                    ->where("pko_main_history.isCrime", "=", 2)
                    ->where("pko_main_history.isCanceled", "=", 0);
                })
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
                    $query->on("pko_is_crime.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_is_crime.eeljID", "=", "pko_mission_eelj.id");
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
                ->select("pko_is_crime.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->get();
            return $getHolbogdson;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }

    public function deleteSpyHolbogdson($req){
        try {
            $deleteMainIsCrime = DB::table("pko_is_crime")
            ->where("pko_is_crime.id", "=", $req->id)
            ->where("pko_is_crime.missionID", "=", $req->missionID)
            ->where("pko_is_crime.eeljID", "=", $req->eeljID)
            ->first();

            $deleteCrime = MainHistory::find($deleteMainIsCrime->pkoMainHistoryID);
            $deleteCrime->isCrime = 0;
            $deleteCrime->save();

            $delete = Crime::find($req->id);
            $delete->delete();

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
                    "msg" => "Алдаа",
                ), 500);
        }
    }


    // public function isCrimeConfirm($req){
    //     try {
    //         $insertIsCrime = MainHistory::find($req->id);
    //         $insertIsCrime->isCrime = 1;
    //         $insertIsCrime->save();
    //         return response(
    //             array(
    //                 "status" => "success",
    //                 "msg" => "Зөвшөөрлөө"
    //             ), 200);
    //     } catch (\Throwable $th) {
    //         return response(
    //             array(
    //                 "status" => "error",
    //                 "msg" => "Алдаа",
    //             ), 500);
    //     }
    // }

    public function isCrimeDecline($req){
        try {
            $insertIsCrime = MainHistory::find($req->id);
            $insertIsCrime->isCrime = 2;
            $insertIsCrime->save();

            $insertCrimeDes = new Crime();
            $insertCrimeDes->pkoMainHistoryID = $req->id;
            $insertCrimeDes->missionID = $req->missionID;
            $insertCrimeDes->eeljID = $req->eeljID;
            $insertCrimeDes->isCrimeDescription = $req->isCrimeDescription;
            $insertCrimeDes->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай"
                ), 200);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }


    // public function getSpyMainDes($req){
    //     try {
    //         $getDescriptions = array();
    //         $getSpyDes = DB::table("pko_is_crime")
    //         ->where("pko_is_crime.pkoMainHistoryID", "=", $req->_rowID)
    //         ->get();

    //         foreach ($getSpyDes as $key =>  $getSpyDesOne) {
    //            $row = array(
    //                 "id" => $key+1,
    //                 "isCrimeDescription" => $getSpyDesOne->isCrimeDescription
    //            );
    //            array_push($getDescriptions, $row);
    //         }

    //         return $getDescriptions;
    //     } catch (\Throwable $th) {
    //         return response(
    //             array(
    //                 "status" => "error",
    //                 "msg" => "Алдаа гарлаа."
    //             ), 500
    //         );
    //     }
    // }
}
