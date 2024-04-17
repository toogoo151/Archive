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
            $getLanguage = OfficerLanguage::query()
                ->where("pko_officer_language.missionID", "=", $req->_missionID)
                ->where("pko_officer_language.eeljID", "=", $req->_eeljID)
                ->join("pko_missions", "pko_officer_language.missionID", "=", "pko_missions.id")
                ->join("pko_mission_eelj", "pko_officer_language.eeljID", "=", "pko_mission_eelj.id")
                ->join("pko_users", "pko_officer_language.pkoUserID", "=", "pko_users.id")
                ->join("all_users", "pko_users.allUsersID", "=", "all_users.id");
            $originalCount = $getLanguage->count();
            $originalTrueCount = $getLanguage->where("pko_officer_language.totalScore", ">=", 0)->count();
            $originalFalseCount = $originalCount - $originalTrueCount;

            if ($req->typeID != "") {
                $getLanguage->where("pko_officer_language.totalScore", "=", $req->typeID);
            }

            if ($req->_comandlalID != "") {
                $getLanguage->where("all_users.comandlalID", "=", $req->_comandlalID);
            }
            if ($req->_unitID != "") {
                $getLanguage->where("all_users.unitID", "=", $req->_unitID);
            }


            $getLanguage->leftJoin("tb_comandlal", "tb_comandlal.id", "=", "all_users.comandlalID")
            ->leftJoin("tb_unit", "tb_unit.id", "=", "all_users.unitID")
            ->select(
                "pko_officer_language.*",
                "pko_missions.missionName",
                "pko_mission_eelj.eeljName",
                "all_users.firstName",
                "all_users.lastName",
                "tb_comandlal.comandlalShortName",
                "tb_unit.unitShortName"
            );


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
            $language = $getLanguage->get();

            return response()->json([
                'status' => 'success',
                'count' => $originalCount,
                'score_true_count' => $originalTrueCount,
                'score_false_count' => $originalFalseCount,
                'data' => $language,
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
}
