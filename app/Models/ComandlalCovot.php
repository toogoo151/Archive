<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\all_users;

class ComandlalCovot extends Model
{
    use HasFactory;
    protected $table = 'pko_covot_comandlal';
    public $timestamps = false;

    public function getComandlalCovots($req){
        try {
            $getCovots = DB::table('pko_covot_comandlal')
            ->where("pko_covot_comandlal.missionID", "=", $req->_missionID)
            ->where("pko_covot_comandlal.eeljID", "=", $req->_eeljID)
            ->join("pko_missions", "pko_missions.id", "=", "pko_covot_comandlal.missionID")
            ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_covot_comandlal.eeljID")
            ->join("tb_comandlal", "tb_comandlal.id", "=", "pko_covot_comandlal.comandlalID")
            ->select("pko_covot_comandlal.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "tb_comandlal.comandlalShortName")
            ->get();
            return $getCovots;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Командлалын квот татаж чадсангүй."
                ), 500
            );
        }
    }

    public function getMyComandlalCovotSum($req){
        try {
                 $myComandlalRow = new all_users;
                // return $myComandlalRow->getUserComandlal()->id;
                $getCovotSum = DB::table('pko_covot_comandlal')
                ->where("pko_covot_comandlal.missionID", "=", $req->_missionID)
                ->where("pko_covot_comandlal.eeljID", "=", $req->_eeljID)
                ->where("pko_covot_comandlal.comandlalID", "=", $myComandlalRow->getUserComandlal()->id)
                ->select(DB::raw("sum(covotComandlalSum) as sum"))
                ->first();

                $getCovotGived = DB::table('pko_covot_unit')
                ->where("pko_covot_unit.missionID", "=", $req->_missionID)
                ->where("pko_covot_unit.eeljID", "=", $req->_eeljID)
                ->where("pko_covot_unit.comandlalID", "=", $myComandlalRow->getUserComandlal()->id)
                ->select(DB::raw("sum(covotUnitSum) as unitsCovotSum"))
                ->first();

                $row = array(
                        "sum" => $getCovotSum->sum,
                        "gived" => $getCovotGived->unitsCovotSum,
                        "remained" => $getCovotSum->sum - $getCovotGived->unitsCovotSum,
                    );
                    return $row;


        } catch (\Throwable $th) {
            //throw $th;
        }
    }

}
