<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Dansburtgel extends Model
{
    use HasFactory;
    protected $table = 'db_arhivdans';
    public $timestamps = true;

    public function getDans()
    {
        try {
            $dans = DB::table("db_arhivdans")
                ->join("db_humrug", "db_humrug.humrug_dugaar", "=", "db_arhivdans.humrugID")
                ->join("retention_period", "retention_period.id", "=", "db_arhivdans.hadgalah_hugatsaa")
                ->join("secret_type", "secret_type.id", "=", "db_arhivdans.dans_baidal")
                ->select("db_arhivdans.*", "db_humrug.humrug_ner", "secret_type.Sname", "retention_period.RetName")
                ->get();
            return $dans;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "татаж чадсангүй."
                ),
                500
            );
        }
    }

    public function getHumrugs()
    {
        try {
            $dans = DB::table("db_humrug")
                ->get();
            return $dans;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "татаж чадсангүй."
                ),
                500
            );
        }
    }

    public function getRetention()
    {
        try {
            $dans = DB::table("retention_period")
                ->get();
            return $dans;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "татаж чадсангүй."
                ),
                500
            );
        }
    }

    public function getSecType()
    {
        try {
            $dans = DB::table("secret_type")
                ->get();
            return $dans;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "татаж чадсангүй."
                ),
                500
            );
        }
    }
}
