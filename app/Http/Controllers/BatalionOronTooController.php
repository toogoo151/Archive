<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BatalionOronToo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BatalionOronTooController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getOronTooChild(Request $req)
    {
        try {
            $getOronTooChild = DB::table("pko_batalion_oron_too")
                ->where("pko_batalion_oron_too.missionID", "=", $req->_missionID)
                ->where("pko_batalion_oron_too.eeljID", "=", $req->_eeljID)
                ->where("pko_batalion_oron_too.pkoMainHistoryID", "=", $req->_rowID)
                ->join("pko_main_history", function ($query) {
                    $query->on("pko_batalion_oron_too.pkoMainHistoryID", "=", "pko_main_history.id");
                })
                ->join("pko_users", function ($query) {
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function ($query) use ($req) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->join("pko_rot", "pko_rot.id", "=", "pko_batalion_oron_too.rotID")
                ->join("pko_salaa", "pko_salaa.id", "=", "pko_batalion_oron_too.salaaID")
                ->join("pko_tasag", "pko_tasag.id", "=", "pko_batalion_oron_too.tasagID")
                ->join("pko_position", "pko_position.id", "=", "pko_batalion_oron_too.positionID")
                ->select("pko_batalion_oron_too.*", "pko_rot.rotName", "pko_salaa.salaaName", "pko_tasag.tasagName", "pko_position.positionName", "all_users.firstName")
                ->get();
            return $getOronTooChild;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function newOronToo(Request $req)
    {
        try {
            $insertOronToo = new BatalionOronToo();
            $insertOronToo->missionID = $req->missionID;
            $insertOronToo->eeljID = $req->eeljID;
            $insertOronToo->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertOronToo->rotID = $req->rotID;
            $insertOronToo->salaaID = $req->salaaID;
            $insertOronToo->tasagID = $req->tasagID;
            $insertOronToo->positionID = $req->positionID;
            $insertOronToo->isNoots = $req->getIsNoots;
            $insertOronToo->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function editOronToo(Request $req)
    {
        try {
            $edit =  BatalionOronToo::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
            $edit->rotID = $req->rotID;
            $edit->salaaID = $req->salaaID;
            $edit->tasagID = $req->tasagID;
            $edit->positionID = $req->positionID;
            $edit->isNoots = $req->getIsNoots;
            $edit->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function deleteOronToo(Request $req)
    {
        try {
            $delete =  BatalionOronToo::find($req->id);
            $delete->delete();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function deleteTomilogdson(Request $req)
    {
        try {
            $delete = BatalionOronToo::find($req->id);
            // $delete->rotID = null;
            // $delete->salaaID = null;
            // $delete->tasagID = null;
            // $delete->positionID = null;
            // $delete->save();
            $delete->delete();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }
}
