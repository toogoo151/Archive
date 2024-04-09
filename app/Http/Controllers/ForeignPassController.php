<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ForeignPass;
use Illuminate\Http\Request;

class ForeignPassController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newForeignPass(Request $req){
        try {
            $insert = new ForeignPass();
            $insert->missionID = $req->missionID;
            $insert->eeljID = $req->eeljID;
            $insert->foreignFinishDate = $req->foreignFinishDate;
            $insert->save();
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

    public function editForeignPass(Request $req){
        try {
            $edit =  ForeignPass::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->foreignFinishDate = $req->foreignFinishDate;
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

    public function deleteForeignPass(Request $req){
        try {
            $delete = ForeignPass::find($req->id);
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
