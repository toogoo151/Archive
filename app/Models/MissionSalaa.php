<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MissionSalaa extends Model
{
    use HasFactory;
    protected $table = 'pko_salaa';
    public $timestamps = false;

    public function getSalaa($req){
        try {
            $getSalaa = DB::table("pko_salaa")
            ->where("pko_salaa.missionID", "=", $req->_missionID)
            ->where("pko_salaa.eeljID", "=", $req->_eeljID)
            ->join("pko_rot", "pko_rot.id", "=", "pko_salaa.rotID")
            ->join("pko_missions", function($query){
                $query->on("pko_salaa.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_salaa.eeljID", "=", "pko_mission_eelj.id");
            })
            ->select("pko_salaa.*", "pko_rot.rotName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
            return $getSalaa;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Салаа татаж чадсангүй"
                ),
                500
            );
        }
    }

    public function getSalaaByRotID($req){
        try {
            $getSalaaID = DB::table("pko_salaa")
            ->where("pko_salaa.rotID", "=", $req->_rotID)
            ->get();
            return $getSalaaID;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }
}
