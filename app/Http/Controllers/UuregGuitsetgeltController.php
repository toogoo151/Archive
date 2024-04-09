<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UuregGuitsetgelt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UuregGuitsetgeltController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getMains(Request $req){
        try {
            $getMains = DB::table("pko_uureg_guitsetgelt")
            ->where("pko_uureg_guitsetgelt.missionID", "=", $req->_missionID)
            ->where("pko_uureg_guitsetgelt.eeljID", "=", $req->_eeljID)
            ->where(function($query)use($req){
                if($req->_applauseID != ""){
                    $query->where("pko_uureg_guitsetgelt.applauseID", "=", $req->_applauseID);
                }
                if($req->_applauseDate != ""){
                    $query->whereMonth("pko_uureg_guitsetgelt.applauseDate", "=", $req->_applauseDate);
                }
            })
            ->join("pko_batalion_oron_too", function($query)use($req){
                $query->on("pko_uureg_guitsetgelt.pkoMainHistoryID", "=", "pko_batalion_oron_too.pkoMainHistoryID");
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
                $query->on("pko_uureg_guitsetgelt.pkoMainHistoryID", "=", "pko_main_history.id");
            })
            ->join("pko_users", function($query){
                $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("pko_missions", function($query){
                $query->on("pko_uureg_guitsetgelt.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_uureg_guitsetgelt.eeljID", "=", "pko_mission_eelj.id");
            })
            ->join("tb_ranks", function($query){
                $query->on("all_users.rankID", "=", "tb_ranks.id");
            })
            ->join("pko_rot", function($query){
                $query->on("pko_batalion_oron_too.rotID", "=", "pko_rot.id");
            })
            ->leftJoin("pko_salaa", function($query){
                $query->on("pko_batalion_oron_too.salaaID", "=", "pko_salaa.id");
            })
            ->leftJoin("pko_tasag", function($query){
                $query->on("pko_batalion_oron_too.tasagID", "=", "pko_tasag.id");
            })
            ->join("pko_position", function($query){
                $query->on("pko_batalion_oron_too.positionID", "=", "pko_position.id");
            })
            ->join("pko_uureg_applause", "pko_uureg_applause.id", "=", "pko_uureg_guitsetgelt.applauseID")
            ->join("pko_uureg_applause_sub", "pko_uureg_applause_sub.id", "=", "pko_uureg_guitsetgelt.applauseSubID")
            ->select("pko_uureg_guitsetgelt.*", "tb_ranks.shortRank", "all_users.rd", "all_users.firstName", "all_users.lastName", "pko_rot.rotName", "pko_salaa.salaaName", "pko_tasag.tasagName", "pko_position.positionName", "pko_uureg_applause.isApplauseName", "pko_uureg_applause_sub.applauseHelber", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->orderBy("pko_batalion_oron_too.rotID", "ASC")
            ->orderBy("pko_batalion_oron_too.salaaID", "ASC")
            ->orderBy("pko_batalion_oron_too.tasagID", "ASC")
            ->orderBy("pko_uureg_guitsetgelt.applauseDate", "DESC")
            ->get();
            return $getMains;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function newUuregGuitsetgelt(Request $req){
        try {
            $insertUureg = new UuregGuitsetgelt();
            $insertUureg->missionID = $req->missionID;
            $insertUureg->eeljID = $req->eeljID;
            $insertUureg->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertUureg->applauseID = $req->applauseID;
            $insertUureg->applauseSubID = $req->applauseSubID;
            $insertUureg->applauseDescription = $req->applauseDescription;
            $insertUureg->applauseDate = $req->applauseDate;
            $insertUureg->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function editUuregGuitsetgelt(Request $req){
        try {
            $edit =  UuregGuitsetgelt::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
            $edit->applauseID = $req->applauseID;
            $edit->applauseSubID = $req->applauseSubID;
            $edit->applauseDescription = $req->applauseDescription;
            $edit->applauseDate = $req->applauseDate;
            $edit->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function deleteUuregGuitsetgelt(Request $req){
        try {
            $delete =  UuregGuitsetgelt::find($req->id);
            $delete->delete();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getOgnooApplause(Request $req){
        try {
            $getOgnoo = DB::table("pko_uureg_guitsetgelt")
            ->where("pko_uureg_guitsetgelt.missionID", "=", $req->_missionID)
            ->where("pko_uureg_guitsetgelt.eeljID", "=", $req->_eeljID)
            ->select(DB::raw("DATE_FORMAT(applauseDate, '%m') new_date"))
            ->groupBy("new_date")
            ->get();
            return $getOgnoo;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }
}
