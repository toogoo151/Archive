<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BaingaIlt extends Model
{
    use HasFactory;
    protected $table = 'db_arhivbaingahad';
    public $timestamps = true;

    public function getBaingaIlt()
    {
        try {
            $baingaIlt = DB::table("db_arhivbaingahad")
                ->join("db_humrug", "db_humrug.humrug_dugaar", "=", "db_arhivbaingahad.humrug_id")
                ->leftjoin("db_arhivdans", "db_arhivdans.dans_dugaar", "=", "db_arhivbaingahad.dans_id")
                ->select("db_arhivbaingahad.*", "db_humrug.humrug_ner", "db_arhivdans.dans_ner")
                ->get();
            return $baingaIlt;
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


    public function getDansburtgelByHumrug($humrugID)
    {
        try {
            $dans = DB::table("db_arhivdans")
                ->join("db_humrug", "db_humrug.humrug_dugaar", "=", "db_arhivdans.humrugID")
                ->join("retention_period", "retention_period.id", "=", "db_arhivdans.hadgalah_hugatsaa")
                ->join("secret_type", "secret_type.id", "=", "db_arhivdans.dans_baidal")
                ->where("db_arhivdans.humrugID", $humrugID)
                ->select(
                    "db_arhivdans.*",
                    "db_humrug.humrug_ner",
                    "secret_type.Sname",
                    "retention_period.RetName"
                )
                ->get();

            return $dans;
        } catch (\Throwable $th) {
            return response([
                "status" => "error",
                "msg" => "Данс татаж чадсангүй"
            ], 500);
        }
    }
}
