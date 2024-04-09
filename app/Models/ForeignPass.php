<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ForeignPass extends Model
{
    use HasFactory;
    protected $table = 'pko_foreign_password';
    public $timestamps = false;

    public function getForeignPass($req){
        try {
            $getForeignPass = DB::table("pko_foreign_password")
            ->where("pko_foreign_password.missionID", "=", $req->_missionID)
            ->where("pko_foreign_password.eeljID", "=", $req->_eeljID)
            ->join("pko_missions", function($query){
                $query->on("pko_foreign_password.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_foreign_password.eeljID", "=", "pko_mission_eelj.id");
            })
            ->select("pko_foreign_password.*", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
            return $getForeignPass;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getFinishDate($req){
        try {
            $getForeignPass = DB::table("pko_foreign_password")
            ->where("pko_foreign_password.missionID", "=", $req->_missionID)
            ->where("pko_foreign_password.eeljID", "=",  $req->_eeljID)
            ->first();
            return $getForeignPass;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }
}
