<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MissionRot extends Model
{
    use HasFactory;
    protected $table = 'pko_rot';
    public $timestamps = false;

    public function getRot($req){
        try {
            $getRot = DB::table("pko_rot")
            ->where("pko_rot.missionID", "=", $req->_missionID)
            ->where("pko_rot.eeljID", "=", $req->_eeljID)
            ->join("pko_missions", function($query){
                $query->on("pko_rot.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_rot.eeljID", "=", "pko_mission_eelj.id");
            })
            ->select("pko_rot.*", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
            return $getRot;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Рот татаж чадсангүй."
                ), 500);
        }
    }
}
