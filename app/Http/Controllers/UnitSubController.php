<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BT_UnitSub;
use Illuminate\Support\Facades\DB;

class UnitSubController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getUnitByComandlalID(Request $req)
    {
        try {
            $getUnits = DB::table("tb_unit")->where("comandlalID", "=", $req->id)->get();
            return $getUnits;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
    }

    public function newUnitSub(Request $req)
    {
        try {
            $insertUnitSub = new BT_UnitSub();
            $insertUnitSub->comandlalID = $req->comandlalID;
            $insertUnitSub->unitID = $req->unitID;
            $insertUnitSub->unitSubShortName = $req->unitSubShortName;
            $insertUnitSub->unitSubFullName = $req->unitSubFullName;
            $insertUnitSub->unitSubNumber = $req->unitSubNumber;
            $insertUnitSub->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
    }

    public function editUnitSub(Request $req)
    {
        try {
            $edit = BT_UnitSub::find($req->id);
            $edit->comandlalID = $req->comandlalID;
            $edit->unitID = $req->unitID;
            $edit->unitSubShortName = $req->unitSubShortName;
            $edit->unitSubFullName = $req->unitSubFullName;
            $edit->unitSubNumber = $req->unitSubNumber;
            $edit->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
    }

    public function deleteUnitSub(Request $req)
    {
        try {
            $delete = BT_UnitSub::find($req->id);
            $delete->delete();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
    }
}
