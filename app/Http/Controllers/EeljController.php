<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Eelj;
use Illuminate\Http\Request;

class EeljController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newEelj(Request $req){
        try {
            $insertEelj = new Eelj();
            $insertEelj->missionID = $req->missionID;
            $insertEelj->eeljName = $req->eeljName;
            $insertEelj->eeljStartDate = $req->eeljStartDate;
            $insertEelj->eeljFinishDate = $req->eeljFinishDate;
            $insertEelj->save();
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

    public function editEelj(Request $req){
        try {
            $edit = Eelj::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljName = $req->eeljName;
            $edit->eeljStartDate = $req->eeljStartDate;
            $edit->eeljFinishDate = $req->eeljFinishDate;
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

    public function deleteEelj(Request $req){
        try {
            $delete = Eelj::find($req->id);
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
}
