<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BT_UnitSub extends Model
{
    use HasFactory;
    protected $table = 'tb_unit_sub';
    public $timestamps = false;

    public function getUnitSubs()
    {
        try {
            $unitSubs = DB::table("tb_unit_sub")
                ->join("tb_comandlal", "tb_comandlal.id", "=", "tb_unit_sub.comandlalID")
                ->join("tb_unit", "tb_unit.id", "=", "tb_unit_sub.unitID")
                ->select("tb_unit_sub.*", "tb_comandlal.comandlalShortName", "tb_comandlal.id as comandlalIDshuu", "tb_unit.unitShortName", "tb_unit.id as unitIDshuu")->get();
            return $unitSubs;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
    }
}
