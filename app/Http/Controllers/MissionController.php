<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Mission;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MissionController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newMission(Request $req) {
        try {
            $insertMission = new Mission();
            $insertMission->missionName = $req->missionName;
            $insertMission->missionStartDate = $req->missionStartDate;
            $insertMission->missionFinishDate = $req->missionFinishDate;
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

    public function editMission(Request $req){
        try {
            $edit = Mission::find($req->id);
            $edit->missionName = $req->missionName;
            $edit->missionStartDate = $req->missionStartDate;
            $edit->missionFinishDate = $req->missionFinishDate;
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

    public function deleteMission(Request $req){
        try {
            $delete = Mission::find($req->id);
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

}
