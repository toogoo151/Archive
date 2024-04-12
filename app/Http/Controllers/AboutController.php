<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\About;
// use Response;
// use Cookie;
use Illuminate\Support\Facades\Cookie;
class AboutController extends Controller
{


     public function showPost($postID, Request $req){

          if (Cookie::has('pc' . $postID)){
        }
        else{
            Cookie::queue(Cookie::make('pc' . $postID, 'value', time() + (10 * 365 * 24 * 60 * 60)));
            $this->increaseReadCountPost($postID);
        }
         $post = DB::table("tb_about")
            ->where("id", '=', $postID)
            ->first();
            return view("part.onepost", compact("post"));
     }
     public function increaseReadCountPost($postID){
        $postRow = DB::table("tb_about")
            ->where("id", '=', $postID)
            ->first();
        $readCount = $postRow->readCount;
        $readCount++;
        $post = About::find($postID);
        $post->readCount = $readCount;
        $post->save();
    }
    public function getAbout(){
         try {
            $getAbout = DB::table("tb_about")
           ->where("id", "=", 1)
           ->get();
           return $getAbout;
        } catch (\Throwable $th) {
             //throw $th;
        }
    }

    public function getAbout2(){
         try {
              $getAbout = DB::table("tb_about")
           ->where("id", "=", 1)
           ->first()->id;
           return $getAbout;
        } catch (\Throwable $th) {
             //throw $th;
        }
    }

    public function edit(Request $req){
        try {

            $edit = About::find($this->getAbout2());
            $edit->title = $req->title;
            $edit->body = $req->body;
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
}
