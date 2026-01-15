<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AshigNomModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Redirect, Response, File;
use Illuminate\Support\Str;


class AshigNomController extends Controller
{
    public function NewNom(Request $req)
    {
        try {
            $insertAshigNom = new AshigNomModel();
            $insertAshigNom->humrug_id = $req->humrug_id;
            $insertAshigNom->dans_id = $req->dans_id;
            $insertAshigNom->nom_dugaar = $req->nom_dugaar;
            $insertAshigNom->nom_ners = $req->nom_ners;
            // $insertAshigNom->barimt_ner = $req->barimt_ner;
            // $insertAshigNom->hugatsaa_turul = $req->hugatsaa_turul;
            // $insertAshigNom->hugatsaa = $req->hugatsaa;
            // $insertAshigNom->tailbar = $req->tailbar;
            // $insertAshigNom->tobchlol = $req->tobchlol;
            $insertAshigNom->save();
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
    public function DeleteNom(Request $req)
    {
        try {
            $delete = AshigNomModel::find($req->id);
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

    public function EditNom(Request $req)
    {
        try {
            $edit = AshigNomModel::find($req->id);
            $edit->humrug_id = $req->humrug_id;
            $edit->dans_id = $req->dans_id;
            $edit->nom_dugaar = $req->nom_dugaar;
            $edit->nom_ners = $req->nom_ners;
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
