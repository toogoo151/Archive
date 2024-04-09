<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MissionHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MissionHistoryController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function checkRD($req){
        $findRD = DB::table("all_users")
        ->where("all_users.rd", "=", $req->userRD)
        ->first();

        $rd = MissionHistory::where("missionID", "=", $req->missionID)
        ->where("eeljID", "=", $req->eeljID)
        ->where("allUserID", "=", $findRD->id)
        ->get();
        if(count($rd) == 0)
            return true;
        else
            return false;
    }

    public function newMissionHistory(Request $req){
        try {
            if(!$this->checkRD($req)){
                return response(
                    array(
                        "msg" => "Тухайн ЦАХ-ийн ажиллагааны түүх аль хэдийн орсон байна.",
                    ), 500
                );
            }

            $findRD = DB::table("all_users")
            ->where("all_users.rd", "=", $req->userRD)
            ->first();

            $insertHistory = new MissionHistory();
            $insertHistory->allUserID = $findRD->id;
            $insertHistory->missionID = $req->missionID;
            $insertHistory->eeljID = $req->eeljID;
            $insertHistory->startDate = $req->startDate;
            $insertHistory->finishDate = $req->finishDate;
            $insertHistory->missionPosition = $req->missionPosition;
            $insertHistory->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ), 201
            );

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

    public function editMissionHistory(Request $req){
        try {
            $findRD = DB::table("all_users")
            ->where("all_users.rd", "=", $req->userRD)
            ->first();

            $editHistory = MissionHistory::find($req->id);
            $editHistory->allUserID = $findRD->id;
            $editHistory->missionID = $req->missionID;
            $editHistory->eeljID = $req->eeljID;
            $editHistory->startDate = $req->startDate;
            $editHistory->finishDate = $req->finishDate;
            $editHistory->missionPosition = $req->missionPosition;
            $editHistory->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ), 201
            );

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

    public function deleteMissionHistory(Request $req){
        try {
            $delete = MissionHistory::find($req->id);
            $delete->delete();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ), 201
            );
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
