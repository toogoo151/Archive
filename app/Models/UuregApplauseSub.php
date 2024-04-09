<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UuregApplauseSub extends Model
{
    use HasFactory;
    protected $table = 'pko_uureg_applause_sub';
    public $timestamps = false;

    public function getUuregApplauseSubs(){
        try {
            $applauseSubs = DB::table("pko_uureg_applause_sub")
            ->join("pko_uureg_applause", "pko_uureg_applause.id", "=", "pko_uureg_applause_sub.applauseID")
            ->select("pko_uureg_applause_sub.*", "pko_uureg_applause.isApplauseName")
            ->get();
            return $applauseSubs;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Хэлбэр татаж чадсангүй."
                ), 500
            );
        }
    }

    public function getSubByApplauseID($req){
        try {
            $subByApplause = DB::table("pko_uureg_applause_sub")
            ->where("pko_uureg_applause_sub.applauseID", "=", $req->_applauseID)
            ->get();
            return $subByApplause;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Хэлбэр татаж чадсангүй."
                ), 500
            );
        }
    }
}
