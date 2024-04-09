<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\MissionRot;
use App\Models\MissionSalaa;
use App\Models\MissionTasag;
use App\Models\MissionPosition;

class MissionStructure extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    //Rot start
    public function newRot(Request $req){
        try {
            $insertRot = new MissionRot();
            $insertRot->missionID = $req->missionID;
            $insertRot->eeljID = $req->eeljID;
            $insertRot->rotName = $req->rotName;
            $insertRot->rotShortName = $req->rotShortName;
            $insertRot->save();
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

    public function editRot(Request $req){
        try {
            $edit = MissionRot::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->rotName = $req->rotName;
            $edit->rotShortName = $req->rotShortName;
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

    public function deleteRot(Request $req){
        try {
            $delete = MissionRot::find($req->id);
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
//Rot end
    //Salaa start
    public function newSalaa(Request $req){
        try {
            $insertSalaa = new MissionSalaa();
            $insertSalaa->missionID = $req->missionID;
            $insertSalaa->eeljID = $req->eeljID;
            $insertSalaa->rotID = $req->rotID;
            $insertSalaa->salaaName = $req->salaaName;
            $insertSalaa->salaaShortName = $req->salaaShortName;
            $insertSalaa->save();
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

    public function editSalaa(Request $req){
        try {
            $edit = MissionSalaa::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->rotID = $req->rotID;
            $edit->salaaName = $req->salaaName;
            $edit->salaaShortName = $req->salaaShortName;
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

    public function deleteSalaa(Request $req){
        try {
            $delete = MissionSalaa::find($req->id);
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
//Salaa end
     //Tasag start
    public function newTasag(Request $req){
        try {
            $insertTasag = new MissionTasag();
            $insertTasag->missionID = $req->missionID;
            $insertTasag->eeljID = $req->eeljID;
            $insertTasag->rotID = $req->rotID;
            $insertTasag->salaaID = $req->salaaID;
            $insertTasag->tasagName = $req->tasagName;
            $insertTasag->tasagShortName = $req->tasagShortName;
            $insertTasag->save();
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

    public function editTasag(Request $req){
        try {
            $edit = MissionTasag::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->rotID = $req->rotID;
            $edit->salaaID = $req->salaaID;
            $edit->tasagName = $req->tasagName;
            $edit->tasagShortName = $req->tasagShortName;
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

    public function deleteTasag(Request $req){
        try {
            $delete = MissionTasag::find($req->id);
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
    //Tasag end
      //Position start
    public function newPosition(Request $req){
        try {
            $insertPosition = new MissionPosition();
            $insertPosition->missionID = $req->missionID;
            $insertPosition->eeljID = $req->eeljID;
            $insertPosition->rotID = $req->rotID;
            $insertPosition->salaaID = $req->salaaID;
            $insertPosition->tasagID = $req->tasagID;
            $insertPosition->positionName = $req->positionName;
            $insertPosition->positionShortName = $req->positionShortName;
            $insertPosition->save();
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

    public function editPosition(Request $req){
        try {
            $edit = MissionPosition::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->rotID = $req->rotID;
            $edit->salaaID = $req->salaaID;
            $edit->tasagID = $req->tasagID;
            $edit->positionName = $req->positionName;
            $edit->positionShortName = $req->positionShortName;
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

    public function deletePosition(Request $req){
        try {
            $delete = MissionPosition::find($req->id);
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

    //Position end

}
