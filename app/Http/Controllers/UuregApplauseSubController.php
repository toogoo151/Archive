<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UuregApplauseSub;

class UuregApplauseSubController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newUuregApplauseSub(Request $req){
        try {
            $insertApplauseSub = new UuregApplauseSub();
            $insertApplauseSub->applauseID = $req->applauseID;
            $insertApplauseSub->applauseHelber = $req->applauseHelber;
            $insertApplauseSub->save();
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

    public function editUuregApplauseSub(Request $req){
        try {
            $edit = UuregApplauseSub::find($req->id);
            $edit->applauseID = $req->applauseID;
            $edit->applauseHelber = $req->applauseHelber;
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

    public function deleteUuregApplauseSub(Request $req){
        try {
            $delete = UuregApplauseSub::find($req->id);
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
