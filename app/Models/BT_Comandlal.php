<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BT_Comandlal extends Model
{
    use HasFactory;
    protected $table = 'tb_comandlal';
    public $timestamps = false;

    public function getComandlals(){
        try {
            $comandlals = DB::table("tb_comandlal")->get();
            return $comandlals;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Командлал татаж чадсангүй."
                ), 500);
        }
    }
    public function getComandlalOther(){
        try {
            $comandlals = DB::table("tb_comandlal")
            ->where("tb_comandlal.id", ">", 7)
            ->get();
            return $comandlals;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Командлал татаж чадсангүй."
                ), 500);
        }
    }
}
