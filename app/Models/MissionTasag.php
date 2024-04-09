<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MissionTasag extends Model
{
    use HasFactory;
    protected $table = 'pko_tasag';
    public $timestamps = false;

    public function getTasag($req){
        try {
            $getTasag = DB::table("pko_tasag")
            ->where("pko_tasag.missionID", "=", $req->_missionID)
            ->where("pko_tasag.eeljID", "=", $req->_eeljID)
            ->join("pko_rot", "pko_rot.id", "=", "pko_tasag.rotID")
            ->join("pko_salaa", "pko_salaa.id", "=", "pko_tasag.salaaID")
            ->join("pko_missions", function($query){
                $query->on("pko_tasag.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_tasag.eeljID", "=", "pko_mission_eelj.id");
            })
            ->select("pko_tasag.*", "pko_rot.rotName", "pko_salaa.salaaName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
            return $getTasag;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Тасаг татаж чадсангүй"
                ),
                500
            );
        }
    }

    public function getTasagBySalaaID($req){
        try {
            $getTasag = DB::table("pko_tasag")
            ->where("pko_tasag.salaaID", "=", $req->_salaaID)
            ->get();
            return $getTasag;
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
