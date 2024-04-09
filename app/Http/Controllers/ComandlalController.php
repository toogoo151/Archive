<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BT_Comandlal;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ComandlalController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newComandlal(Request $req){
        try {
            $insertComandlal = new BT_Comandlal();
            $insertComandlal->comandlalName = $req->name;
            $insertComandlal->comandlalShortName = $req->shortName;
            $insertComandlal->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ), 200);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500);
        }
    }

    public function editComandlal(Request $req){
        try {
            $edit = BT_Comandlal::find($req->id);
            $edit->comandlalShortName = $req->shortName;
            $edit->comandlalName = $req->fullName;
            $edit->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ), 200);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500);
        }
    }

    public function deleteComandlal(Request $req){
        try {
            $delete = BT_Comandlal::find($req->id);
            $delete->delete();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ), 200);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500);
        }
    }

}
