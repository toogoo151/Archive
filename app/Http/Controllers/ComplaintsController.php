<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Complaints;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ComplaintsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function myUserID($req){
        try {
            $countID = DB::table("pko_main_history")
            ->where("pko_main_history.missionID", "=", $req->missionID)
            ->where("pko_main_history.eeljID", "=", $req->eeljID)
            ->where( "pko_main_history.pkoUserID", "=", Auth::user()->id)
            ->count();
            if($countID > 0 ){
                $myID = DB::table("pko_main_history")
                        ->where("pko_main_history.missionID", "=", $req->missionID)
                        ->where("pko_main_history.eeljID", "=", $req->eeljID)
                        ->where( "pko_main_history.pkoUserID", "=", Auth::user()->id)
                        ->first();
                        return $myID->id;
            } else {
                return 0;
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

    public function myComplaints(){
        try {
            $countID = DB::table("pko_main_history")
            ->where( "pko_main_history.pkoUserID", "=", Auth::user()->id)
            ->count();
            if($countID > 0 ){
                $myID = DB::table("pko_main_history")
                        ->where( "pko_main_history.pkoUserID", "=", Auth::user()->id)
                        ->first();
                        return $myID->id;
            } else {
                return 0;
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

    public function complaints(Request $req){
        try {
            if($this->myUserID($req) > 0){
                $insert = new Complaints();
                $insert->missionID = $req->missionID;
                $insert->eeljID = $req->eeljID;
                $insert->pkoMainHistoryID = $this->myUserID($req);
                $insert->complaints = $req->complaints;
                $insert->save();
                return response(
                    array(
                        "status" => "success",
                        "msg" => "Амжилттай хадгаллаа",
                    ),200
                );
            } else {
                return response(
                    array(
                        "status" => "error",
                        "msg" => "Уучлаарай та санал, гомдол илгээх боломжгүй байна.",
                    ),500
                );
            }

        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа",
                ), 500);
        }
    }

    public function getComplaints(Request $req){
        try {
            $getComplaints = DB::table("pko_complaints")
            ->where("pko_complaints.pkoMainHistoryID", "=", $this->myComplaints())
            ->join("pko_main_history", function($query){
                $query->on("pko_complaints.pkoMainHistoryID", "=", "pko_main_history.id");
            })
            ->join("pko_users", function($query){
                $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->select("pko_complaints.*", "all_users.firstName", DB::raw('DATE_FORMAT(pko_complaints.created_at, "%Y-%m-%d") as date'))
            ->orderBy("created_at", "DESC")
            ->get();
            return $getComplaints;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа",
                ), 500);
        }
    }

    public function getListComplaints(Request $req){
        try {
            $getComplaints = DB::table("pko_complaints")
            ->where("pko_complaints.missionID", "=", $req->_missionID)
            ->where("pko_complaints.eeljID", "=", $req->_eeljID)
            ->join("pko_main_history", function($query){
                $query->on("pko_complaints.pkoMainHistoryID", "=", "pko_main_history.id");
            })
            ->join("pko_users", function($query){
                $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_unit", function($query){
                $query->on("all_users.unitID", "=", "tb_unit.id");
            })
            ->join("tb_ranks", function($query){
                $query->on("all_users.rankID", "=", "tb_ranks.id");
            })
            ->select("pko_complaints.*", "all_users.lastName", "all_users.firstName", "tb_unit.unitShortName", "tb_ranks.shortRank", DB::raw('DATE_FORMAT(pko_complaints.created_at, "%Y-%m-%d") as date'))
            ->orderBy("created_at", "DESC")
            ->get();
            return $getComplaints;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа",
                ), 500);
        }
    }
}
