<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SportType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SportTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newSportType(Request $req){
        try {
            $sportType = new SportType();
            $sportType->missionID = $req->missionID;
            $sportType->eeljID = $req->eeljID;
            $sportType->genderID = $req->genderID;
            $sportType->sportTypeName = $req->sportTypeName;
            $sportType->save();
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

    public function editSportType(Request $req){
        try {
            $edit = SportType::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->genderID = $req->genderID;
            $edit->sportTypeName = $req->sportTypeName;
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

    public function deleteSportType(Request $req) {
        try {
            $delete = SportType::find($req->id);
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

    public function getHealthDate(Request $req){
        try {
            $getDate = DB::table("pko_health")
            ->select(DB::raw('DATE(pko_health.created_at) as healthDate'))
            ->groupBy("healthDate")
            ->get();
            return $getDate;
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
