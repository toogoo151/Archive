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
            if ($req->_typeID == "1") {
                $getDriver = OfficerDriver::query()
                    ->where("pko_officer_driver.missionID", "=", $req->_missionID)
                    ->where("pko_officer_driver.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_driver.Finally", ">", 1)
                    ->join("pko_missions", "pko_officer_driver.missionID", "=", "pko_missions.id")
                    ->join("pko_mission_eelj", "pko_officer_driver.eeljID", "=", "pko_mission_eelj.id")
                    ->join("pko_users", "pko_officer_driver.pkoUserID", "=", "pko_users.id")
                    // ->join("all_users", "pko_users.allUsersID", "=", "all_users.id")
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if ($req->_unitID != "") {
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                    })
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->select(
                    "pko_officer_driver.*",
                        "pko_missions.missionName",
                        "pko_mission_eelj.eeljName",
                        "all_users.firstName",
                        "all_users.lastName",
                        "tb_comandlal.comandlalShortName",
                        "tb_unit.unitShortName"
                    )->get();
            }

            if ($req->_typeID == "0") {
                $getDriver = OfficerDriver::query()
                    ->where("pko_officer_driver.missionID", "=", $req->_missionID)
                    ->where("pko_officer_driver.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_driver.Finally", "=", 0)
                    ->join("pko_missions", "pko_officer_driver.missionID", "=", "pko_missions.id")
                    ->join("pko_mission_eelj", "pko_officer_driver.eeljID", "=", "pko_mission_eelj.id")
                    ->join("pko_users", "pko_officer_driver.pkoUserID", "=", "pko_users.id")
                    // ->join("all_users", "pko_users.allUsersID", "=", "all_users.id")
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if ($req->_unitID != "") {
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                    })
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->select(
                        "pko_officer_driver.*",
                        "pko_missions.missionName",
                        "pko_mission_eelj.eeljName",
                        "all_users.firstName",
                        "all_users.lastName",
                        "tb_comandlal.comandlalShortName",
                        "tb_unit.unitShortName"
                    )->get();
            }
            if ($req->_typeID == "") {
                $getDriver = OfficerDriver::query()
                    ->where("pko_officer_driver.missionID", "=", $req->_missionID)
                    ->where("pko_officer_driver.eeljID", "=", $req->_eeljID)
                    // ->where("pko_officer_driver.Finally", "=", 0)
                    ->join("pko_missions", "pko_officer_driver.missionID", "=", "pko_missions.id")
                    ->join("pko_mission_eelj", "pko_officer_driver.eeljID", "=", "pko_mission_eelj.id")
                    ->join("pko_users", "pko_officer_driver.pkoUserID", "=", "pko_users.id")
                    // ->join("all_users", "pko_users.allUsersID", "=", "all_users.id")
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if ($req->_unitID != "") {
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                    })
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->select(
                        "pko_officer_driver.*",
                        "pko_missions.missionName",
                        "pko_mission_eelj.eeljName",
                        "all_users.firstName",
                        "all_users.lastName",
                        "tb_comandlal.comandlalShortName",
                        "tb_unit.unitShortName"
                    )->get();
            }

            $trueScoreCount = $this->getTrueScore123($req);
            $falseScoreCount = $this->getFalseScore123($req);


            return response()->json([
                'status' => 'success',
                'count' => count($getDriver),
                'score_true_count' =>  $trueScoreCount,
                'score_false_count' => $falseScoreCount,
                'data' => $getDriver,
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

    public function getTrueScore123($req)
    {
        try {
            $getTrueScore = OfficerDriver::query()
                ->where("pko_officer_driver.missionID", "=", $req->_missionID)
                ->where("pko_officer_driver.eeljID", "=", $req->_eeljID)
                ->where("Finally", ">", 0)
                ->count();
            return $getTrueScore;
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
    public function getFalseScore123($req)
    {
        try {
            $getFalseScore = OfficerDriver::query()
                ->where("pko_officer_driver.missionID", "=", $req->_missionID)
                ->where("pko_officer_driver.eeljID", "=", $req->_eeljID)
                ->where("Finally", "=", 0)
                ->count();
            return $getFalseScore;
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
