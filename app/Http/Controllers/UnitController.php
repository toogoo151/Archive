<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BT_Unit;
use Illuminate\Support\Facades\DB;

class UnitController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getUnits(Request $req) {
        try {
            $getUnits = DB::table("tb_unit")
            ->where("tb_unit.comandlalID", "=", $req->_comandlalID)
            ->get();
            return $getUnits;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
    }}

    public function newUnit(Request $req){
        try {
            $insertUnit = new BT_Unit();
            $insertUnit->comandlalID = $req->comandlalID;
            $insertUnit->unitShortName = $req->unitShortName;
            $insertUnit->unitFullName = $req->unitFullName;
            $insertUnit->unitNumber = $req->unitNumber;
            $insertUnit->save();
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

    public function editUnit(Request $req){
         try {
            $edit = BT_Unit::find($req->id);
            $edit->comandlalID = $req->comandlalID;
            $edit->unitShortName = $req->unitShortName;
            $edit->unitFullName = $req->unitFullName;
            $edit->unitNumber = $req->unitNumber;
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

    public function deleteUnit(Request $req){
        try {
            $delete = BT_Unit::find($req->id);
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
