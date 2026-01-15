<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SedevZuiModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Redirect, Response, File;
use Illuminate\Support\Str;


class SedevZuiController extends Controller
{
    public function NewSedevZui(Request $req)
    {
        try {
            $insertSedevZui = new SedevZuiModel();
            $insertSedevZui->humrug_id = $req->humrug_id;
            $insertSedevZui->dans_id = $req->dans_id;
            $insertSedevZui->zaagch_tobchlol = $req->zaagch_tobchlol;
            $insertSedevZui->zaagch_tailal = $req->zaagch_tailal;
            // $insertSedevZui->barimt_ner = $req->barimt_ner;
            // $insertSedevZui->hugatsaa_turul = $req->hugatsaa_turul;
            // $insertSedevZui->hugatsaa = $req->hugatsaa;
            // $insertSedevZui->tailbar = $req->tailbar;
            // $insertSedevZui->tobchlol = $req->tobchlol;
            $insertSedevZui->save();
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
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }
    public function DeleteSedevZui(Request $req)
    {
        try {
            $delete = SedevZuiModel::find($req->id);
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
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function EditSedevZui(Request $req)
    {
        try {
            $edit = SedevZuiModel::find($req->id);
            $edit->humrug_id = $req->humrug_id;
            $edit->dans_id = $req->dans_id;
            $edit->zaagch_tobchlol = $req->zaagch_tobchlol;
            $edit->zaagch_tailal = $req->zaagch_tailal;
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
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }
}
