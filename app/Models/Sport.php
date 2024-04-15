<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Sport extends Model
{
    use HasFactory;
    protected $table = 'pko_sport_score';
    public $timestamps = false;


    public function getShalgaltUguuguiIDs($req){
        $getTomilogdooguiID = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->join("pko_sport_changed", function($query)use($req){
                    $query->on("pko_main_history.id", "=", "pko_sport_changed.pkoMainHistoryID");
                    $query->where("pko_sport_changed.missionID", "=",$req->_missionID)
                        ->where("pko_sport_changed.eeljID", "=",$req->_eeljID);
                })
                ->select("pko_sport_changed.pkoMainHistoryID")
                ->get();
                $array = array();
                foreach ($getTomilogdooguiID as $value) {
                    array_push($array, $value->pkoMainHistoryID);
                }
            return $array;
    }


    public function getSportTotal($req){
        try {
                $getSportTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->where("pko_main_history.healthApprove", "=", 1)
                    ->join("pko_users", function($query){
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function($query)use($req){
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if($req->_comandlalID != ""){
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if($req->_unitID != ""){
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                        if($req->_genderID != ""){
                            $query->where("all_users.gender", "=", $req->_genderID);
                        }
                    })
                    // ->join("pko_health", function($query)use($req){
                    //     $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                    //     if($req->_healthDate != ""){
                    //         $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    //     }
                    // })
                    ->select("pko_main_history.id")
                    ->get();

                $getGived = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->where("pko_main_history.healthApprove", "=", 1)
                    // ->where("pko_main_history.sportScore", ">", 0)
                    ->join("pko_users", function($query){
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function($query)use($req){
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if($req->_comandlalID != ""){
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if($req->_unitID != ""){
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                        if($req->_genderID != ""){
                            $query->where("all_users.gender", "=", $req->_genderID);
                        }
                    })
                    ->join("pko_sport_changed", function($query)use($req){
                        $query->on("pko_main_history.id", "=", "pko_sport_changed.pkoMainHistoryID");
                        $query->where("pko_sport_changed.missionID", "=",$req->_missionID)
                        ->where("pko_sport_changed.eeljID", "=",$req->_eeljID);
                    })
                    // ->join("pko_health", function($query)use($req){
                    //     $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                    //     if($req->_healthDate != ""){
                    //         $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    //     }
                    // })
                    ->select("pko_main_history.id")
                    ->get();

                $getNotGiven = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->where("pko_main_history.healthApprove", "=", 1)
                    // ->where("pko_main_history.sportScore", "=", 0.00)
                    ->whereNotIn("pko_main_history.id", $this->getShalgaltUguuguiIDs($req))
                    ->join("pko_users", function($query){
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function($query)use($req){
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if($req->_comandlalID != ""){
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if($req->_unitID != ""){
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                        if($req->_genderID != ""){
                            $query->where("all_users.gender", "=", $req->_genderID);
                        }
                    })
                    // ->join("pko_health", function($query)use($req){
                    //     $query->on("pko_main_history.id", "=", "pko_health.pkoMainHistoryID");
                    //     if($req->_healthDate != ""){
                    //         $query->whereDate("pko_health.created_at", "=", $req->_healthDate);
                    //     }
                    // })
                    ->select("pko_main_history.id")
                    ->get();
            $row = array(
                "total" => count($getSportTotal),
                "gived" => count($getGived),
                "notGiven" => count($getNotGiven),
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
