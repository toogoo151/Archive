<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LanguageScore;
use App\Models\LanguageType;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function newLanguageScore(Request $req) {
        try {
            $insertLanguageScore = new LanguageScore();
            $insertLanguageScore->missionID = $req->missionID;
            $insertLanguageScore->eeljID = $req->eeljID;
            $insertLanguageScore->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertLanguageScore->languageTypeID = $req->languageTypeID;
            $insertLanguageScore->languageScore = $req->languageScore;
            $insertLanguageScore->save();
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

    public function editLanguageScore(Request $req) {
        try {
            $edit = LanguageScore::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
            $edit->languageTypeID = $req->languageTypeID;
            $edit->languageScore = $req->languageScore;
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

    public function deleteLanguageScore(Request $req) {
        try {
            $delete = LanguageScore::find($req->id);
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

    public function newLanguageType(Request $req) {
        try {
            $insertLanguage = new LanguageType();
            $insertLanguage->languageName = $req->languageName;
            $insertLanguage->save();
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

    public function editLanguageType(Request $req) {
        try {
            $edit =  LanguageType::find($req->id);
            $edit->languageName = $req->languageName;
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

    public function deleteLanguageType(Request $req) {
        try {
            $delete =  LanguageType::find($req->id);
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
