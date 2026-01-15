<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class jagsaaltZuilDugaar extends Model
{
    use HasFactory;
    protected $table = 'jagsaaltzuildugaar';
    public $timestamps = false;

    public function getJagsaalt()
    {
        try {
            $jagsaalt = DB::table("jagsaaltzuildugaar")
                ->join("jagsaalt_turul", "jagsaalt_turul.id", "=", "jagsaaltzuildugaar.jagsaalt_turul")
                ->join("retention_period", "retention_period.id", "=", "jagsaaltzuildugaar.hugatsaa_turul")
                ->select("jagsaaltzuildugaar.*", "jagsaalt_turul.jName", "retention_period.RetName")
                ->get();
            return $jagsaalt;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Анги татаж чадсангүй."
                ),
                500
            );
        }
    }
}
