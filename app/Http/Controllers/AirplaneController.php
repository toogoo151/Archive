<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Airplane;
use App\Models\MissionHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AirplaneController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getEeljHiigdsen(Request $req){
        try {
            if($req->_airplaneState != ""){
                $getHiigdsen = DB::table("pko_airplane_shift")
                    ->where("pko_airplane_shift.missionID", "=", $req->_missionID)
                    ->where("pko_airplane_shift.eeljID", "=", $req->_eeljID)
                    ->where("pko_airplane_shift.airplaneDeparturedID", "=", $req->_airplaneState)
                    ->join("pko_missions", function($query){
                        $query->on("pko_airplane_shift.missionID", "=", "pko_missions.id");
                    })
                    ->join("pko_mission_eelj", function($query){
                        $query->on("pko_airplane_shift.eeljID", "=", "pko_mission_eelj.id");
                    })
                    ->join("pko_batalion_oron_too", function($query)use($req){
                        $query->on("pko_airplane_shift.pkoMainHistoryID", "=", "pko_batalion_oron_too.pkoMainHistoryID");
                        if($req->_rotID != ""){
                            $query->where("pko_batalion_oron_too.rotID", "=", $req->_rotID);
                            if($req->_salaaID != ""){
                                $query->where("pko_batalion_oron_too.salaaID", "=", $req->_salaaID);
                                if($req->_tasagID != ""){
                                    $query->where("pko_batalion_oron_too.tasagID", "=", $req->_tasagID);
                                }
                            }
                        }
                    })
                    ->join("pko_main_history", function($query){
                        $query->on("pko_airplane_shift.pkoMainHistoryID", "=", "pko_main_history.id")
                        ->where("pko_main_history.isCrime", "=", 0)
                        ->where("pko_main_history.isCanceled", "=", 0);
                    })
                    ->join("pko_users", function($query){
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function($query){
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                    })
                    ->join("tb_ranks", function($query){
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->leftJoin("pko_rot", function($query){
                        $query->on("pko_batalion_oron_too.rotID", "=", "pko_rot.id");
                    })
                    ->leftJoin("pko_salaa", function($query){
                        $query->on("pko_batalion_oron_too.salaaID", "=", "pko_salaa.id");
                    })
                    ->leftJoin("pko_tasag", function($query){
                        $query->on("pko_batalion_oron_too.tasagID", "=", "pko_tasag.id");
                    })
                    ->leftJoin("pko_position", function($query){
                        $query->on("pko_batalion_oron_too.positionID", "=", "pko_position.id");
                    })
                    ->join("pko_airplane_shift_item", function($query){
                        $query->on("pko_airplane_shift.airplaneDeparturedID", "=", "pko_airplane_shift_item.id");
                    })
                    ->leftJoin("pko_airplane_arrived", function($query){
                        $query->on("pko_airplane_shift.airplaneArrivedID", "=", "pko_airplane_arrived.id");
                    })
                    ->select("pko_airplane_shift.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "pko_rot.rotName", "pko_salaa.salaaName", "pko_tasag.tasagName", "pko_position.positionName", "pko_airplane_shift_item.airplaneShiftItemName", "pko_airplane_arrived.arrivedName", "all_users.foreignPass", "all_users.foreignFinishDate", "pko_mission_eelj.eeljName", "pko_missions.missionName")
                    ->orderBy("pko_airplane_shift.airplaneDeparturedID", "ASC")
                    ->orderBy("pko_batalion_oron_too.rotID", "ASC")
                    ->orderBy("pko_batalion_oron_too.salaaID", "ASC")
                    ->orderBy("pko_batalion_oron_too.tasagID", "ASC")
                    ->orderBy("pko_batalion_oron_too.positionID", "ASC")
                    ->get();
                return $getHiigdsen;
            } else {
                $getHiigdsen = DB::table("pko_airplane_shift")
                ->where("pko_airplane_shift.missionID", "=", $req->_missionID)
                ->where("pko_airplane_shift.eeljID", "=", $req->_eeljID)
                ->join("pko_missions", function($query){
                    $query->on("pko_airplane_shift.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_airplane_shift.eeljID", "=", "pko_mission_eelj.id");
                })
                ->join("pko_batalion_oron_too", function($query)use($req){
                    $query->on("pko_airplane_shift.pkoMainHistoryID", "=", "pko_batalion_oron_too.pkoMainHistoryID");
                    if($req->_rotID != ""){
                        $query->where("pko_batalion_oron_too.rotID", "=", $req->_rotID);
                        if($req->_salaaID != ""){
                            $query->where("pko_batalion_oron_too.salaaID", "=", $req->_salaaID);
                            if($req->_tasagID != ""){
                                $query->where("pko_batalion_oron_too.tasagID", "=", $req->_tasagID);
                            }
                        }
                    }
                })
                ->join("pko_main_history", function($query){
                    $query->on("pko_airplane_shift.pkoMainHistoryID", "=", "pko_main_history.id")
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0);
                })
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("pko_rot", function($query){
                    $query->on("pko_batalion_oron_too.rotID", "=", "pko_rot.id");
                })
                ->leftJoin("pko_salaa", function($query){
                    $query->on("pko_batalion_oron_too.salaaID", "=", "pko_salaa.id");
                })
                ->leftJoin("pko_tasag", function($query){
                    $query->on("pko_batalion_oron_too.tasagID", "=", "pko_tasag.id");
                })
                ->leftJoin("pko_position", function($query){
                    $query->on("pko_batalion_oron_too.positionID", "=", "pko_position.id");
                })
                ->join("pko_airplane_shift_item", function($query){
                    $query->on("pko_airplane_shift.airplaneDeparturedID", "=", "pko_airplane_shift_item.id");
                })
                ->leftJoin("pko_airplane_arrived", function($query){
                    $query->on("pko_airplane_shift.airplaneArrivedID", "=", "pko_airplane_arrived.id");
                })
                ->select("pko_airplane_shift.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "pko_rot.rotName", "pko_salaa.salaaName", "pko_tasag.tasagName", "pko_position.positionName", "pko_airplane_shift_item.airplaneShiftItemName", "pko_airplane_arrived.arrivedName", "all_users.foreignPass", "all_users.foreignFinishDate", "pko_mission_eelj.eeljName", "pko_missions.missionName")
                ->orderBy("pko_airplane_shift.airplaneDeparturedID", "ASC")
                ->orderBy("pko_batalion_oron_too.rotID", "ASC")
                ->orderBy("pko_batalion_oron_too.salaaID", "ASC")
                ->orderBy("pko_batalion_oron_too.tasagID", "ASC")
                ->orderBy("pko_batalion_oron_too.positionID", "ASC")
                ->get();
            return $getHiigdsen;
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function checkID($pkoMainHistoryID){
        $check = Airplane::where("pkoMainHistoryID", "=", $pkoMainHistoryID)->get();
        if(count($check) == 0)
            return true;
        else
            return false;
    }


    public function newAirplaneEelj(Request $req){
        try {
            if(!$this->checkID($req->pkoMainHistoryID)){
                return response(
                    array(
                        "msg" => "ЦАХ-д нислэгийн ээлж хуваарилагдсан байна."
                    ), 500
                );
            }
            if($req->missionFinishDate != ""){
                $insertAirplaneEelj = new Airplane();
                $insertAirplaneEelj->missionID = $req->missionID;
                $insertAirplaneEelj->eeljID = $req->eeljID;
                $insertAirplaneEelj->pkoMainHistoryID = $req->pkoMainHistoryID;
                $insertAirplaneEelj->airplaneDeparturedID = $req->airplaneDeparturedID;
                $insertAirplaneEelj->airplaneArrivedID = $req->airplaneArrivedID;
                $insertAirplaneEelj->missionStartDate = $req->missionStartDate;
                $insertAirplaneEelj->missionFinishDate = $req->missionFinishDate;
                $insertAirplaneEelj->save();

                $getUserID = DB::table("pko_airplane_shift")
                    ->where("pko_airplane_shift.missionID", "=", $req->missionID)
                    ->where("pko_airplane_shift.eeljID", "=", $req->eeljID)
                    ->where("pko_airplane_shift.pkoMainHistoryID", "=", $req->pkoMainHistoryID)
                    ->join("pko_batalion_oron_too", function($query){
                        $query->on("pko_airplane_shift.pkoMainHistoryID", "=", "pko_batalion_oron_too.pkoMainHistoryID");
                    })
                    ->join("pko_position", function($query){
                        $query->on("pko_batalion_oron_too.positionID", "=", "pko_position.id");
                    })
                    ->join("pko_main_history", function($query){
                        $query->on( "pko_airplane_shift.pkoMainHistoryID", "=", "pko_main_history.id")
                        ->join("pko_users", function($query){
                            $query->on("pko_main_history.pkoUserID", "=", "pko_users.id")
                            ->join("all_users", function($query){
                                $query->on("pko_users.allUsersID", "=", "all_users.id");
                            });
                        });
                    })
                    ->select("pko_airplane_shift.*", "all_users.id as allUserIDshuu", "pko_position.id as positionID")
                    ->first();

                $insertMissionHistory = new MissionHistory();
                $insertMissionHistory->allUserID = $getUserID->allUserIDshuu;
                $insertMissionHistory->missionID = $req->missionID;
                $insertMissionHistory->eeljID = $req->eeljID;
                $insertMissionHistory->startDate = $req->missionStartDate;
                $insertMissionHistory->finishDate = $req->missionFinishDate;
                $insertMissionHistory->missionPosition = $getUserID->positionID;
                $insertMissionHistory->save();
                    return response(
                    array(
                        "status" => "success",
                        "msg" => "Амжилттай хадгаллаа."
                    ),200
                );
            } else {
                $insertAirplaneEelj = new Airplane();
                $insertAirplaneEelj->missionID = $req->missionID;
                $insertAirplaneEelj->eeljID = $req->eeljID;
                $insertAirplaneEelj->pkoMainHistoryID = $req->pkoMainHistoryID;
                $insertAirplaneEelj->airplaneDeparturedID = $req->airplaneDeparturedID;
                $insertAirplaneEelj->airplaneArrivedID = $req->airplaneArrivedID;
                $insertAirplaneEelj->missionStartDate = $req->missionStartDate;
                $insertAirplaneEelj->save();
                    return response(
                    array(
                        "status" => "success",
                        "msg" => "Амжилттай хадгаллаа."
                    ),200
                );
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),500
            );
        }
    }

    public function editAirplaneEelj(Request $req){
        try {
            if($req->missionFinishDate != ""){
                $edit =  Airplane::find($req->id);
                $edit->missionID = $req->missionID;
                $edit->eeljID = $req->eeljID;
                $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
                $edit->airplaneDeparturedID = $req->airplaneDeparturedID;
                $edit->airplaneArrivedID = $req->airplaneArrivedID;
                $edit->missionStartDate = $req->missionStartDate;
                $edit->missionFinishDate = $req->missionFinishDate;
                $edit->save();

                $getUserID = DB::table("pko_airplane_shift")
                    ->where("pko_airplane_shift.missionID", "=", $req->missionID)
                    ->where("pko_airplane_shift.eeljID", "=", $req->eeljID)
                    ->where("pko_airplane_shift.pkoMainHistoryID", "=", $req->pkoMainHistoryID)
                    ->join("pko_batalion_oron_too", function($query){
                        $query->on("pko_airplane_shift.pkoMainHistoryID", "=", "pko_batalion_oron_too.pkoMainHistoryID");
                    })
                    ->join("pko_position", function($query){
                        $query->on("pko_batalion_oron_too.positionID", "=", "pko_position.id");
                    })
                    ->join("pko_main_history", function($query){
                        $query->on( "pko_airplane_shift.pkoMainHistoryID", "=", "pko_main_history.id")
                        ->join("pko_users", function($query){
                            $query->on("pko_main_history.pkoUserID", "=", "pko_users.id")
                            ->join("all_users", function($query){
                                $query->on("pko_users.allUsersID", "=", "all_users.id");
                            });
                        });
                    })
                    ->select("pko_airplane_shift.*", "all_users.id as allUserIDshuu", "pko_position.id as positionID")
                    ->first();


                $getMissionHistoryID = DB::table("pko_mission_history")
                    ->where("pko_mission_history.allUserID", "=", $getUserID->allUserIDshuu)
                    ->first();

                if($getMissionHistoryID != ""){
                    $editMissionHistory = MissionHistory::find($getMissionHistoryID->id);
                    $editMissionHistory->allUserID = $getUserID->allUserIDshuu;
                    $editMissionHistory->missionID = $req->missionID;
                    $editMissionHistory->eeljID = $req->eeljID;
                    $editMissionHistory->startDate = $req->missionStartDate;
                    $editMissionHistory->finishDate = $req->missionFinishDate;
                    $editMissionHistory->missionPosition = $getUserID->positionID;
                    $editMissionHistory->save();
                } else{
                    $editMissionHistory = new MissionHistory();
                    $editMissionHistory->allUserID = $getUserID->allUserIDshuu;
                    $editMissionHistory->missionID = $req->missionID;
                    $editMissionHistory->eeljID = $req->eeljID;
                    $editMissionHistory->startDate = $req->missionStartDate;
                    $editMissionHistory->finishDate = $req->missionFinishDate;
                    $editMissionHistory->missionPosition = $getUserID->positionID;
                    $editMissionHistory->save();
                }


                return response(
                    array(
                        "status" => "success",
                        "msg" => "Амжилттай заслаа."
                    ),200
                );
            } else {
                $edit =  Airplane::find($req->id);
                $edit->missionID = $req->missionID;
                $edit->eeljID = $req->eeljID;
                $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
                $edit->airplaneDeparturedID = $req->airplaneDeparturedID;
                $edit->airplaneArrivedID = $req->airplaneArrivedID;
                $edit->missionStartDate = $req->missionStartDate;
                $edit->save();
                return response(
                    array(
                        "status" => "success",
                        "msg" => "Амжилттай заслаа."
                    ),200
                );
            }

        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),500
            );
        }
    }
}
