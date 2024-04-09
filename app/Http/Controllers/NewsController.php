<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\DateNews;
use Redirect,Response,File;


class NewsController extends Controller
{
    public function get(){
        $News = DB::table("pko_date_news")
        ->where("pko_date_news.adminID", "=", Auth::user()->id)
         ->orderBy("created_at", "DESC")
        ->get();
        return $News;
}


public function delete(Request $req){
    try {
        $delete = DateNews::find($req->id);
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

public function new(Request $req){
    try {
        $insertlist = new DateNews();
        $insertlist->adminID = Auth::user()->id;
        $insertlist->title = $req->title;
        $insertlist->body = $req->body;
        $insertlist->featuredImage = $req->featuredImage;
        $insertlist->menuID = $req->menuID;
        $insertlist->save();
        return response(
            array(
                "status" => "success",
                "msg" => "Амжилттай хадгаллаа."
            ), 200);
    } catch (\Throwable $th) {
return $th;
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
}
}
