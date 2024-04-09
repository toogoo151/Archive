<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MissionPosition extends Model
{
    use HasFactory;
    protected $table = 'pko_position';
    public $timestamps = false;

    public function getPosition($req){
        try {
            $getPosition = DB::table("pko_position")
            ->where("pko_position.missionID", "=", $req->_missionID)
            ->where("pko_position.eeljID", "=", $req->_eeljID)
            ->join("pko_missions", function($query){
                $query->on("pko_position.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_position.eeljID", "=", "pko_mission_eelj.id");
            })
            ->join("pko_rot", "pko_rot.id", "=", "pko_position.rotID")
            ->leftJoin("pko_salaa", "pko_salaa.id", "=", "pko_position.salaaID")
            ->leftJoin("pko_tasag", "pko_tasag.id", "=", "pko_position.tasagID")
            ->select("pko_position.*", "pko_rot.rotName", "pko_salaa.salaaName", "pko_tasag.tasagName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
            return $getPosition;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Албан тушаал татаж чадсангүй"
                ),
                500
            );
        }
    }

    public function getPositionByTasagID($req){
        try {

                $getPosition = DB::table("pko_position")
                ->where("pko_position.missionID", "=", $req->_missionID)
                ->where("pko_position.eeljID", "=", $req->_eeljID)
                ->where(function($query)use($req){
                    if($req->_rotID != ""){
                        $query->where("pko_position.rotID", "=", $req->_rotID);
                        if($req->_salaaID != ""){
                            $query->where("pko_position.salaaID", "=", $req->_salaaID);
                            if($req->_tasagID != ""){
                                $query->where("pko_position.tasagID", "=", $req->_tasagID);
                            }
                        }
                    }
                })
                ->get();
                return $getPosition;


        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Албан тушаал татаж чадсангүй"
                ),
                500
            );
        }
    }
}
