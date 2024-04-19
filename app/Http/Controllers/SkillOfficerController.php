<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OfficerSkill;
use App\Models\OfficerLanguage;
use App\Models\OfficerDriver;

use Illuminate\Support\Facades\DB;
use App\Models\OfficerMainHistory;

class SkillOfficerController extends Controller
{
    public function editLanguage(Request $req)
    {
        try {
            $edit = OfficerLanguage::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->readCol = $req->readCol;
            $edit->writeCol = $req->writeCol;
            $edit->listenCol = $req->listenCol;
            $edit->speakCol = $req->speakCol;
            $edit->totalScore = ($req->readCol + $req->writeCol + $req->listenCol + $req->speakCol  ) / 4;
            $edit->alcpt = $req->alcpt;
            $edit->save();

            $editlanguage = OfficerMainHistory::find($edit->MainTableID);
            $editlanguage->languageScore = $edit->totalScore;
            $editlanguage->alcpt_score = $edit->alcpt;
            $editlanguage->save();

            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай нэмлээ."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response([
                "status" => "error",
                "msg" => "Алдаа гарлаа.",
                "error" => $th->getMessage() // Include the error message in the response
            ], 500);
        }
    }
    public function editSkill(Request $req)
    {
        try {
            $edit = OfficerSkill::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->SignalScore = $req->SignalScore;
            $edit->LocationScore = $req->LocationScore;
            $edit->TotalScore = ($req->SignalScore + $req->LocationScore) / 2;
            $edit->save();

            $editskill = OfficerMainHistory::find($edit->MainTableID);
            $editskill->skillScore = $edit->TotalScore;
            $editskill->save();

            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай нэмлээ."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response([
                "status" => "error",
                "msg" => "Алдаа гарлаа.",
                "error" => $th->getMessage() // Include the error message in the response
            ], 500);
        }
    }

    public function editDriver(Request $req)
    {
        try {
            $edit = OfficerDriver::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->score = $req->score;
            $edit->scoreApprove = $req->scoreApprove;
            $edit->practice = $req->practice;
            if ($req->scoreApprove == 1 && $req->practice == 1) {
                $edit->finally = 1;
            } else {
                $edit->finally = 2;
            }

            $edit->save();

            $editdriver = OfficerMainHistory::find($edit->MainTableID);
            if ($req->scoreApprove == 1 && $req->practice == 1) {
                $editdriver->driverApprove = 1;
            } else {
                $editdriver->driverApprove = 2;
            }
            $editdriver->save();

            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай нэмлээ."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response([
                "status" => "error",
                "msg" => "Алдаа гарлаа.",
                "error" => $th->getMessage() // Include the error message in the response
            ], 500);
        }
    }

    public function count(Request $req){
        $counts = DB::table("pko_officer_skill")
            ->count();
        return $counts;

    }

}
