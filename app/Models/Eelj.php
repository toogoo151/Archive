<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class Eelj extends Model
{
    use HasFactory;
    protected $table = 'pko_mission_eelj';
    public $timestamps = false;

    public function getEeljs(){
        try {
            $eelj = DB::table("pko_mission_eelj")
            ->join("pko_missions", "pko_missions.id", "=", "pko_mission_eelj.missionID")
            ->select("pko_mission_eelj.*", "pko_missions.missionName")
            ->orderBy("pko_missions.id", "DESC")
            ->orderBy("pko_mission_eelj.id", "ASC")
            ->get();
            return $eelj;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Ээлж татаж чадсангүй."
                ), 500
            );
        }
    }

    public function getEeljByMissionID($req){
        try {
            $eeljByMission = DB::table("pko_mission_eelj")
            ->where("pko_mission_eelj.eeljFinishDate", "=", null)
            ->where("pko_mission_eelj.missionID", "=", $req->_missionID)
            ->select("pko_mission_eelj.*",DB::raw("DATE_FORMAT(eeljStartDate, '%Y') eeljStartDate"))
            ->get();
            return $eeljByMission;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Ээлж татаж чадсангүй."
                ), 500
            );
        }
    }

    public function getEeljOfficerMissionID($req)
    {
        try {
            $eeljByMission = DB::table("pko_mission_eelj")
            ->where("pko_mission_eelj.eeljFinishDate", "=", null)
                ->whereIn('missionID', [2, 3])
                ->where("pko_mission_eelj.missionID", "=", $req->_missionID)
                ->select("pko_mission_eelj.*", DB::raw("DATE_FORMAT(eeljStartDate, '%Y') eeljStartDate"))
                ->get();
            return $eeljByMission;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Ээлж татаж чадсангүй."
                ),
                500
            );
        }
    }
}
