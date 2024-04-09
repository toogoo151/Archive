<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UnitCovot extends Model
{
    use HasFactory;
    protected $table = 'pko_covot_unit';
    public $timestamps = false;

    public function getUnitCovots($req) {
        try {
            $myComandlalRow = new all_users();
            $myComandlalID = $myComandlalRow->getUserComandlal();
            $unitCovot = DB::table("pko_covot_unit")
            ->where("pko_covot_unit.missionID", "=", $req->_missionID)
            ->where("pko_covot_unit.eeljID", "=", $req->_eeljID)
            // ->where(function($query){

            // })
            ->where("pko_covot_unit.comandlalID", "=", $myComandlalID->id)
            // ->join("tb_comandlal", "tb_comandlal.id", "=", "pko_covot_unit.comandlalID")
            ->join("tb_unit", "tb_unit.id", "=", "pko_covot_unit.unitID")
            ->select("pko_covot_unit.*",   "tb_unit.unitShortName")
            ->get();
            return $unitCovot;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Ангийн квот татаж чадсангүй."
                ), 500
            );
        }
    }

    public function getUnitCovotSum($req){
        try {

            if(Auth::user()->user_type === "unitAdmin"){
                 $myComandlalRow = new all_users;

                  $getCovotSum = DB::table('pko_covot_unit')
                ->where("pko_covot_unit.missionID", "=",$req->_missionID)
                ->where("pko_covot_unit.eeljID", "=", $req->_eeljID)
                ->where("pko_covot_unit.unitID", "=", $myComandlalRow->getUserUnit()->id)
                ->select(DB::raw("sum(covotUnitSum) as unitsCovotSum"))
                ->first();

                $getCovotGived = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use ($myComandlalRow){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.unitID", "=", $myComandlalRow->getUserUnit()->id);
                })
                ->select("pko_main_history.*", "pko_users.email", "all_users.phone", DB::raw($myComandlalRow->getUserUnit()->id) , "all_users.unitID")
                ->get();

                $row = array(
                        "sum" => $getCovotSum->unitsCovotSum,
                        "gived" => count($getCovotGived),
                        "remained" => $getCovotSum->unitsCovotSum - count($getCovotGived),
                    );
                    return $row;
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Ангийн квот татаж чадсангүй."
                ), 500
            );
        }
    }

}
