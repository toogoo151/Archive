<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LanguageScore extends Model
{
    use HasFactory;
    protected $table = 'pko_language_score';
    public $timestamps = false;

    public function getLanguageScored($req){
        try {
            $getLanguage = DB::table('pko_language_score')
            ->where("pko_language_score.missionID", "=", $req->_missionID)
            ->where("pko_language_score.eeljID", "=", $req->_eeljID)
            ->where(function($query)use($req){
                if($req->_typeID != ""){
                    $query->where("pko_language_score.languageTypeID", "=", $req->_typeID);
                }
            })
            ->join("pko_main_history", function($query){
                $query->on("pko_language_score.pkoMainHistoryID", "=", "pko_main_history.id")
                ->where("pko_main_history.isCrime", "=", 0)
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
                $query->on("pko_language_score.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_language_score.eeljID", "=", "pko_mission_eelj.id");
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
            ->join("pko_language_type", function($query){
                $query->on("pko_language_score.languageTypeID", "=", "pko_language_type.id");
            })
            ->select("pko_language_score.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "tb_ranks.shortRank", "pko_language_type.languageName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->orderBy("pko_language_score.languageScore", "DESC")
            ->get();
            return $getLanguage;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500);
        }
    }

    public function getNoScoreIDs($req){
        $getNoScoreID = DB::table("pko_main_history")
        ->where("pko_main_history.missionID", "=", $req->_missionID)
            ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.sportScore", ">", 0)
                ->join("pko_language_score", function($query){
                    $query->on("pko_main_history.id", "=", "pko_language_score.pkoMainHistoryID");
                })
                ->select("pko_language_score.pkoMainHistoryID")
                ->get();
                $array = array();
                foreach ($getNoScoreID as $value) {
                    array_push($array, $value->pkoMainHistoryID);
                }
            return $array;
    }

    public function getLanguageNoScore($req){
        try {
            $getNoScore = DB::table("pko_main_history")
            ->where("pko_main_history.missionID", "=", $req->_missionID)
            ->where("pko_main_history.eeljID", "=", $req->_eeljID)
            ->where("pko_main_history.sportScore", ">", 0)
            ->whereNotIn("pko_main_history.id", $this->getNoScoreIDs($req))
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
            return $getNoScore;
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
