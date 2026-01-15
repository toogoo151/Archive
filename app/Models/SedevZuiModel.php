<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SedevZuiModel extends Model
{
    use HasFactory;
    protected $table = 'arhivsedevzaagch';
    public $timestamps = false;
    public function getSedevZui()
    {
        try {
            $sedev = DB::table("arhivsedevzaagch")
                // ->join("db_humrug", "db_humrug.humrug_dugaar", "=", "arhivsedevzaagch.humrug_id")
                // ->join("db_arhivdans", "db_arhivdans.dans_dugaar", "=", "arhivsedevzaagch.dans_id")
                // ->select("arhivsedevzaagch.*", "db_humrug.jName", "retention_period.RetName")
                ->get();
            return $sedev;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Амжилтгүй."
                ),
                500
            );
        }
    }
}
