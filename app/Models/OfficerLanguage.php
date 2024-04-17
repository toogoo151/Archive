<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficerLanguage extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_language';
    public $timestamps = false;

    public function getLanguage($req)
    {
        try {
            if($req->_typeID == "1"){
                $getLanguage = OfficerLanguage::query()
                ->where("pko_officer_language.missionID", "=", $req->_missionID)
                ->where("pko_officer_language.eeljID", "=", $req->_eeljID)
                ->where("pko_officer_language.totalScore", ">", 1)
                ->join("pko_missions", "pko_officer_language.missionID", "=", "pko_missions.id")
                ->join("pko_mission_eelj", "pko_officer_language.eeljID", "=", "pko_mission_eelj.id")
                ->join("pko_users", "pko_officer_language.pkoUserID", "=", "pko_users.id")
                // ->join("all_users", "pko_users.allUsersID", "=", "all_users.id")
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }
                    }
                })
                ->join("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->join("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
            ->select(
                "pko_officer_language.*",
                "pko_missions.missionName",
                "pko_mission_eelj.eeljName",
                "all_users.firstName",
                "all_users.lastName",
                "tb_comandlal.comandlalShortName",
                "tb_unit.unitShortName"
            )->get();
            }
            if($req->_typeID == "0"){
                $getLanguage = OfficerLanguage::query()
                ->where("pko_officer_language.missionID", "=", $req->_missionID)
                ->where("pko_officer_language.eeljID", "=", $req->_eeljID)
                ->where("pko_officer_language.totalScore", "=", 0)
                ->join("pko_missions", "pko_officer_language.missionID", "=", "pko_missions.id")
                ->join("pko_mission_eelj", "pko_officer_language.eeljID", "=", "pko_mission_eelj.id")
                ->join("pko_users", "pko_officer_language.pkoUserID", "=", "pko_users.id")
                // ->join("all_users", "pko_users.allUsersID", "=", "all_users.id")
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }
                    }
                })
                ->join("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->join("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
            ->select(
                "pko_officer_language.*",
                "pko_missions.missionName",
                "pko_mission_eelj.eeljName",
                "all_users.firstName",
                "all_users.lastName",
                "tb_comandlal.comandlalShortName",
                "tb_unit.unitShortName"
            )->get();
            }
            if($req->_typeID == ""){
                $getLanguage = OfficerLanguage::query()
                ->where("pko_officer_language.missionID", "=", $req->_missionID)
                ->where("pko_officer_language.eeljID", "=", $req->_eeljID)
                // ->where("pko_officer_language.totalScore", "=", 0)
                ->join("pko_missions", "pko_officer_language.missionID", "=", "pko_missions.id")
                ->join("pko_mission_eelj", "pko_officer_language.eeljID", "=", "pko_mission_eelj.id")
                ->join("pko_users", "pko_officer_language.pkoUserID", "=", "pko_users.id")
                // ->join("all_users", "pko_users.allUsersID", "=", "all_users.id")
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }
                    }
                })
                ->join("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->join("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
            ->select(
                "pko_officer_language.*",
                "pko_missions.missionName",
                "pko_mission_eelj.eeljName",
                "all_users.firstName",
                "all_users.lastName",
                "tb_comandlal.comandlalShortName",
                "tb_unit.unitShortName"
            )->get();
            }



            // $GetScore = OfficerSkill::query()
            // ->where("pko_officer_skill.missionID", "=", $req->_missionID)
            // ->where("pko_officer_skill.eeljID", "=", $req->_eeljID)
            //     ->join("pko_missions", "pko_officer_skill.missionID", "=", "pko_missions.id")
            //     ->join("pko_mission_eelj", "pko_officer_skill.eeljID", "=", "pko_mission_eelj.id")
            //     ->join("pko_users", "pko_officer_skill.pkoUserID", "=", "pko_users.id")
            //     ->join("all_users", "pko_users.allUsersID", "=", "all_users.id");

            // $count = count($GetScore);
            // $true = $GetScore->where("pko_officer_skill.TotalScore", ">=", 0)->count();
            // $false = $count - $true;
            // $language = $getLanguage->get();

            // $originalCount = $getLanguage->count();

            // $originalTrueCount = $getLanguage->where("pko_officer_language.totalScore", ">=", 0)->count();
            // $originalFalseCount = $originalCount - $originalTrueCount;

            return response()->json([
                'status' => 'success',
                'count' => count($getLanguage),
                'score_true_count' => 10,
                'score_false_count' => 10,
                'data' => $getLanguage,
            ]);


            // return $skills;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "татаж чадсангүй."
                ),
                500
            );
        }
    }

    public function getAllRow(){
        try {

        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
