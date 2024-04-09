<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Health extends Model
{
    use HasFactory;
    protected $table = 'pko_health';
    public $timestamps = true;

    public function getHealthTotal($req) {
        try {
            $getHealthTotal = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=",$req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_main_history.id")
                ->get();

                $getNotDone = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                ->where("pko_main_history.healthApprove", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_main_history.id")
                ->get();

                $getApprove = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                ->where("pko_main_history.healthApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_main_history.id")
                ->get();

                $getDecline = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                ->where("pko_main_history.healthApprove", "=", 2)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_main_history.id")
                ->get();

                $row = array(
                        "total" => count($getHealthTotal),
                        "notDone" => count($getNotDone),
                        "approve" => count($getApprove),
                        "decline" => count($getDecline),
                    );
                    return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }




    public function getHuudasTotal($req) {
        try {
            $getHealthTotal = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=",$req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_main_history.id")
                ->get();

                $getAvaagui = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                ->where("pko_main_history.healthHuudas", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_main_history.id")
                ->get();

                $getAvsan = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                ->where("pko_main_history.healthHuudas", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    }

                })
                ->select("pko_main_history.id")
                ->get();



                $row = array(
                        "total" => count($getHealthTotal),
                        "avaagui" => count($getAvaagui),
                        "avsan" => count($getAvsan),
                    );
                    return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }

}
