<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficerDriver extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_driver';
    public $timestamps = false;

    public function getDriver($req)
    {
        try {
            $getDriver = OfficerDriver::query()
                ->where("pko_officer_driver.missionID", "=", $req->_missionID)
                ->where("pko_officer_driver.eeljID", "=", $req->_eeljID)
                ->join("pko_missions", "pko_officer_driver.missionID", "=", "pko_missions.id")
                ->join("pko_mission_eelj", "pko_officer_driver.eeljID", "=", "pko_mission_eelj.id")
                ->join("pko_users", "pko_officer_driver.pkoUserID", "=", "pko_users.id")
                ->join("all_users", "pko_users.allUsersID", "=", "all_users.id");
            $originalCount = $getDriver->count();
            $originalTrueCount = $getDriver->where("pko_officer_driver.TotalScore", ">=", 0)->count();
            $originalFalseCount = $originalCount - $originalTrueCount;

            if ($req->typeID != "") {
                $getDriver->where("pko_officer_driver.TotalScore", "=", $req->typeID);
            }

            if ($req->_comandlalID != "") {
                $getDriver->where("all_users.comandlalID", "=", $req->_comandlalID);
            }
            if ($req->_unitID != "") {
                $getDriver->where("all_users.unitID", "=", $req->_unitID);
            }


            $getDriver->leftJoin("tb_comandlal", "tb_comandlal.id", "=", "all_users.comandlalID")
            ->leftJoin("tb_unit", "tb_unit.id", "=", "all_users.unitID")
            ->select(
                "pko_officer_driver.*",
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
            $skills = $getDriver->get();

            return response()->json([
                'status' => 'success',
                'count' => $originalCount,
                'score_true_count' => $originalTrueCount,
                'score_false_count' => $originalFalseCount,
                'data' => $skills,
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
