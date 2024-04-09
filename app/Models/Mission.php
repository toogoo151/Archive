<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Mission extends Model
{
    use HasFactory;
    protected $table = 'pko_missions';
    public $timestamps = false;

    public function getMissions(){
        try {
            $missions = DB::table("pko_missions")->where("pko_missions.missionFinishDate", "=", null)->get();
            return $missions;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Ажиллагаа татаж чадсангүй."
                ), 500);
        }
    }

    public function getMissions2()
    {
        try {
            $missions = DB::table("pko_missions")
            ->where("pko_missions.missionFinishDate", "=", null)
            ->whereIn('missionName', ['UN MILITARY OFFICER', 'UN STAFF OFFICER'])
            ->get();
            return $missions;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Ажиллагаа татаж чадсангүй."
                ),
                500
            );
        }
    }
}
