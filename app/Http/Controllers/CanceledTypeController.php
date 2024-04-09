<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Canceled;
use Illuminate\Http\Request;
use App\Models\CanceledType;
use App\Models\MainHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CanceledTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newCanceledType(Request $req) {
        try {
            $insertMission = new CanceledType();
            $insertMission->canceledTypeName = $req->canceledTypeName;
            $insertMission->save();
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
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function editCanceledType(Request $req){
        try {
            $edit = CanceledType::find($req->id);
            $edit->canceledTypeName = $req->canceledTypeName;
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

    public function deleteCanceledType(Request $req){
        try {
            $delete = CanceledType::find($req->id);
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
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function getCanceledChild(Request $req){
        try {
            $getCanceledChild = DB::table("pko_canceled")
            ->where("pko_canceled.missionID", "=", $req->_missionID)
                ->where("pko_canceled.eeljID", "=", $req->_eeljID)
            ->where("pko_canceled.pkoMainHistoryID", "=", $req->_rowID)
            ->join("pko_canceled_type", "pko_canceled_type.id", "=", "pko_canceled.pkoCanceledTypeID")
            ->select("pko_canceled.*", "pko_canceled_type.canceledTypeName")
            ->get();
            return $getCanceledChild;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function newCanceledChild(Request $req){
        try {
            $insertCanceled = new Canceled();
            $insertCanceled->missionID = $req->missionID;
            $insertCanceled->eeljID = $req->eeljID;
            $insertCanceled->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertCanceled->pkoCanceledTypeID = $req->pkoCanceledTypeID;
            $insertCanceled->canceledPdf = $req->canceledPdf;
            $insertCanceled->canceledDescription = $req->canceledDescription;
            $insertCanceled->save();

            $insertMainSport = MainHistory::find($req->pkoMainHistoryID);
            $insertMainSport->isCanceled = 2;
            $insertMainSport->save();
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
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function editCanceledChild(Request $req){
        try {
            $edit = Canceled::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
            $edit->pkoCanceledTypeID = $req->pkoCanceledTypeID;
            $edit->canceledPdf = $req->canceledPdf;
            $edit->canceledDescription = $req->canceledDescription;
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
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function deleteCanceledChild(Request $req){
        try {
            $delete = Canceled::find($req->id);
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
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function getTatgalzsan(Request $req){
        try {
            $getTatgalzsan = DB::table("pko_canceled")
            ->where("pko_canceled.missionID", "=", $req->_missionID)
            ->where("pko_canceled.eeljID", "=", $req->_eeljID)
            ->join("pko_main_history", function($query){
                $query->on("pko_canceled.pkoMainHistoryID", "=", "pko_main_history.id")
                ->where("pko_main_history.isCrime", "=", 0)
                ->where("pko_main_history.isCanceled", "=", 2);
            })
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
            })
            ->join("pko_missions", function($query){
                $query->on("pko_canceled.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_canceled.eeljID", "=", "pko_mission_eelj.id");
            })
            ->join("pko_canceled_type", function($query){
                $query->on("pko_canceled.pkoCanceledTypeID", "=", "pko_canceled_type.id");
            })
            ->join("tb_ranks", function($query){
                $query->on("all_users.rankID", "=", "tb_ranks.id");
            })
            ->join("tb_comandlal", function($query){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
            })
            ->join("tb_unit", function($query){
                $query->on("all_users.unitID", "=", "tb_unit.id");
            })
            ->select("pko_canceled.*", "all_users.lastName", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_canceled_type.canceledTypeName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
        return $getTatgalzsan;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }

    public function deleteTatgalzsan(Request $req){
        try {
            $deleteTatgalzsan = DB::table("pko_canceled")
            ->where("pko_canceled.id", "=", $req->id)
            ->where("pko_canceled.missionID", "=", $req->missionID)
            ->where("pko_canceled.eeljID", "=", $req->eeljID)
            ->first();

            $deleteCanceled = MainHistory::find($deleteTatgalzsan->pkoMainHistoryID);
            $deleteCanceled->isCanceled = 0;
            $deleteCanceled->save();

            $delete = Canceled::find($req->id);
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
                    "msg" => "Алдаа",
                ), 500);
        }
    }

}
