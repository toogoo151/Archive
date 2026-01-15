<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ArhivTovchlolModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Redirect, Response, File;
use Illuminate\Support\Str;


class ArhivTovchlolController extends Controller
{
    public function NewTovchlol(Request $req)
    {
        try {
            $insertTovchlol = new ArhivTovchlolModel();
            $insertTovchlol->humrug_id = $req->humrug_id;
            $insertTovchlol->dans_id = $req->dans_id;
            $insertTovchlol->tobchlol = $req->tobchlol;
            $insertTovchlol->tailal = $req->tailal;
            // $insertTovchlol->barimt_ner = $req->barimt_ner;
            // $insertTovchlol->hugatsaa_turul = $req->hugatsaa_turul;
            // $insertTovchlol->hugatsaa = $req->hugatsaa;
            // $insertTovchlol->tailbar = $req->tailbar;
            // $insertTovchlol->tobchlol = $req->tobchlol;
            $insertTovchlol->save();
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
    public function DeleteTovchlol(Request $req)
    {
        try {
            $delete = ArhivTovchlolModel::find($req->id);
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

    public function EditTovchlol(Request $req)
    {
        try {
            $edit = ArhivTovchlolModel::find($req->id);
            $edit->humrug_id = $req->humrug_id;
            $edit->dans_id = $req->dans_id;
            $edit->tobchlol = $req->tobchlol;
            $edit->tailal = $req->tailal;
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
