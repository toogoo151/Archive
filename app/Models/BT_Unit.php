<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BT_Unit extends Model
{
    use HasFactory;
    protected $table = 'tb_unit';
    public $timestamps = false;

    public function getUnit(){
        try {
            $units = DB::table("tb_unit")
            ->join("tb_comandlal", "tb_comandlal.id", "=", "tb_unit.comandlalID")
            ->select("tb_unit.*", "tb_comandlal.comandlalShortName", "tb_comandlal.id as comandlalIDshuu")
            ->get();
            return $units;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500);
        }
    }

    // public function getUnits(){
    //     try {
    //         $units = DB::table("tb_unit")->get();
    //         return $units;
    //     } catch (\Throwable $th) {
    //         return response(
    //             "aldaa garlaa", 500
    //         );
    //     }
    // }
}
