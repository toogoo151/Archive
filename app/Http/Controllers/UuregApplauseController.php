<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UuregApplause;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UuregApplauseController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newUuregApplause(Request $req) {
        try {
            $insertUuregApplause = new UuregApplause();
            $insertUuregApplause->isApplauseName = $req->isApplauseName;
            $insertUuregApplause->save();
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

    public function editUuregApplause(Request $req){
        try {
            $edit = UuregApplause::find($req->id);
            $edit->isApplauseName = $req->isApplauseName;
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

    public function deleteUuregApplause(Request $req){
        try {
            $delete = UuregApplause::find($req->id);
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
