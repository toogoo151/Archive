<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SportType extends Model
{
    use HasFactory;
    protected $table = 'pko_sport_type';
    public $timestamps = false;

    public function getSportTypes($req){
        try {
            $sportType = DB::table("pko_sport_type")
            ->where("pko_sport_type.missionID", "=", $req->_missionID)
            ->where("pko_sport_type.eeljID", "=", $req->_eeljID)
            ->join("pko_missions", "pko_missions.id", "=", "pko_sport_type.missionID")
            ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_sport_type.eeljID")
            ->join("tb_gender", "tb_gender.id", "=", "pko_sport_type.genderID")
            ->select("pko_sport_type.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "tb_gender.genderName")
            ->get();
            return $sportType;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Нормативын төрөл татаж чадсангүй."
                ), 500
            );
        }
    }

    public function getGenderSportTypes($req){
        try {
            $sportType = DB::table("pko_sport_type")
            ->where("pko_sport_type.missionID", "=", $req->_missionID)
            ->where("pko_sport_type.eeljID", "=", $req->_eeljID)
            ->where("pko_sport_type.genderID", "=", $req->_genderID)
            ->join("tb_gender", "tb_gender.id", "=", "pko_sport_type.genderID")
            ->select("pko_sport_type.*", "tb_gender.genderName")
            ->get();
            return $sportType;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Нормативын төрөл татаж чадсангүй."
                ), 500
            );
        }
    }



    public function countSport($req){
        try {
            $getCount = DB::table("pko_sport_type")
            ->where("missionID", "=", $req->missionID)
            ->where("eeljID", "=", $req->eeljID)
            ->where("genderID", "=", 11)
            ->get();
            return count($getCount);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Спортын төрлийн тоо татаж чадсангүй."
                ), 500
            );
        }
    }
}
