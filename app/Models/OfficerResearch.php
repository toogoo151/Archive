<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficerResearch extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_research';
    public $timestamps = false;

    public function getResearchs($req){
        try {

            $getResearch = OfficerResearch::query()
                ->where("pko_officer_research.missionID", "=", $req->_missionID)
                ->where("pko_officer_research.eeljID", "=", $req->_eeljID)
                ->join("pko_missions", "pko_officer_research.missionID", "=", "pko_missions.id")
                ->join("pko_mission_eelj", "pko_officer_research.eeljID", "=", "pko_mission_eelj.id")
                ->join("tb_unit", "pko_officer_research.angiID", "=", "tb_unit.id")
                ->join("tb_ranks", "pko_officer_research.rankID", "=", "tb_ranks.id")
                ->join("pko_users", "pko_officer_research.pkoUserID", "=", "pko_users.id")
                ->join("tb_gender", "pko_officer_research.gender", "=", "tb_gender.id")
                ->join("all_users", function ($query) use ($req) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");

                    if ($req->_comandlalID != "") {
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }
                })
                ->join("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->select(
                    "pko_officer_research.*",
                        "pko_missions.missionName",
                        "pko_mission_eelj.eeljName",
                        "tb_unit.unitShortName",
                        "tb_ranks.shortRank",
                        "pko_users.allUsersID",
                        "all_users.comandlalID",
                        "tb_comandlal.comandlalShortName",
                        "tb_gender.genderName"
                    )
                ->get();
            return $getResearch;
            $getResearch = OfficerResearch::query()
                    ->where("pko_officer_research.missionID", "=", $req->_missionID)
                    ->where("pko_officer_research.eeljID", "=", $req->_eeljID)
                    ->join("pko_missions", "pko_officer_research.missionID", "=", "pko_missions.id")
                    ->join("pko_mission_eelj", "pko_officer_research.eeljID", "=", "pko_mission_eelj.id")
                    ->join("pko_users", "pko_officer_research.pkoUserID", "=", "pko_users.id")
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
                    ->join("tb_ranks", function($query){
                        $query->on("pko_officer_research.rankID", "=", "tb_ranks.id");
                    })
                    ->select(
                    "pko_officer_research.*",
                        "pko_missions.missionName",
                        "pko_mission_eelj.eeljName",
                        "all_users.firstName",
                        "all_users.lastName",
                        "tb_comandlal.comandlalShortName",
                        "tb_unit.unitShortName","tb_ranks.rankName"
                    )->get();
                    return $getResearch;
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}
