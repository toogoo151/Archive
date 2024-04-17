<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OfficerSkill;
use Illuminate\Support\Facades\DB;
use App\Models\OfficerMainHistory;

class SkillOfficerController extends Controller
{
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

    public function count(Request $req){
        $counts = DB::table("pko_officer_skill")
            ->count();
        return $counts;

    }

}
