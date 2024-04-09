<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AirplaneArrived;
use App\Models\AirplaneShiftItem;
use Illuminate\Http\Request;

class AirplaneShiftItemController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newAirplaneShiftItem(Request $req){
        try {
            $insertAirplaneShiftItem = new AirplaneShiftItem();
            $insertAirplaneShiftItem->airplaneShiftItemName = $req->airplaneShiftItemName;
            $insertAirplaneShiftItem->save();

            $insertAirplaneArrived = new AirplaneArrived();
            $insertAirplaneArrived->arrivedName = $req->airplaneShiftItemName;
            $insertAirplaneArrived->save();
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

    public function editAirplaneShiftItem(Request $req) {
        try {
            $edit = AirplaneShiftItem::find($req->id);
            $edit->airplaneShiftItemName = $req->airplaneShiftItemName;
            $edit->save();

            $editArrived = AirplaneArrived::find($req->id);
            $editArrived->arrivedName = $req->airplaneShiftItemName;
            $editArrived->save();
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

    public function deleteAirplaneShiftItem(Request $req){
        try {
            $delete = AirplaneShiftItem::find($req->id);
            $delete->delete();

            $deleteArrived = AirplaneArrived::find($req->id);
            $deleteArrived->delete();
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
