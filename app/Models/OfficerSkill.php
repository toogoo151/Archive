<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;



class OfficerSkill extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_skill';
    public $timestamps = false;

    // public function getSkill($req)
    // {
    //     try {
    //         $getSkill = DB::table("pko_officer_skill")
    //         ->where("pko_officer_skill.missionID", "=", $req->_missionID)
    //             ->where("pko_officer_skill.eeljID", "=", $req->_eeljID)
    //             ->join("pko_missions", function ($query) {
    //                 $query->on("pko_officer_skill.missionID", "=", "pko_missions.id");
    //             })
    //             ->join("pko_mission_eelj", function ($query) {
    //                 $query->on("pko_officer_skill.eeljID", "=", "pko_mission_eelj.id");
    //             })
    //             ->join("pko_users", function ($query) {
    //                 $query->on("pko_officer_skill.pkoUserID", "=", "pko_users.id");
    //             })
    //             ->join("all_users", function ($query) use ($req) {
    //                 $query->on("pko_users.allUsersID", "=", "all_users.id");
    //                 if ($req->_comandlalID != "") {
    //                     $query->where("all_users.comandlalID", "=", $req->_comandlalID);
    //                     if ($req->_unitID != "") {
    //                         $query->where("all_users.unitID", "=", $req->_unitID);
    //                     }
    //                 }
    //                 if ($req->_gender != "") {
    //                     $query->where("all_users.gender", "=", $req->_gender);
    //                 }
    //             })
    //             ->leftJoin("all_users", function ($query) {
    //                 $query->on("all_users.id", "=", "pko_users.allUsersID");
    //             })

    //             ->select("pko_officer_skill.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "all_users.firstName", "all_users.lastName","tb_comandlal.comandlalShortName", "tb_unit.unitShortName",)
    //             ->get();
    //         return $getSkill;
    //     } catch (\Throwable $th) {
    //         return response(
    //             array(
    //                 "status" => "error",
    //                 "msg" => "Рот татаж чадсангүй."
    //             ),
    //             500
    //         );
    //     }
    // }
    public function getSkill($req)
    {
        try {
            $getSkill = OfficerSkill::query()
            ->where("pko_officer_skill.missionID", "=", $req->_missionID)
            ->where("pko_officer_skill.eeljID", "=", $req->_eeljID)
                ->join("pko_missions", "pko_officer_skill.missionID", "=", "pko_missions.id")
                ->join("pko_mission_eelj", "pko_officer_skill.eeljID", "=", "pko_mission_eelj.id")
                ->join("pko_users", "pko_officer_skill.pkoUserID", "=", "pko_users.id")
                ->join("all_users", "pko_users.allUsersID", "=", "all_users.id");

            if ($req->_comandlalID != "") {
                $getSkill->where("all_users.comandlalID", "=", $req->_comandlalID);
            }
            if ($req->_unitID != "") {
                $getSkill->where("all_users.unitID", "=", $req->_unitID);
            }


            $getSkill->leftJoin("tb_comandlal", "tb_comandlal.id", "=", "all_users.comandlalID")
            ->leftJoin("tb_unit", "tb_unit.id", "=", "all_users.unitID")
            ->select(
                "pko_officer_skill.*",
                "pko_missions.missionName",
                "pko_mission_eelj.eeljName",
                "all_users.firstName",
                "all_users.lastName",
                "tb_comandlal.comandlalShortName",
                "tb_unit.unitShortName"
            );

            // Execute the query and get the results
            $skills = $getSkill->get();

            return $skills;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Рот татаж чадсангүй."
                ),
                500
            );
        }
    }
}
