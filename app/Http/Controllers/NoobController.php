<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\DateNews;
use Cookie;

class NoobController extends Controller
{
    public function show(){
          $DateNews = DB::table("pko_date_news")
          ->where("pko_date_news.menuID" ,"=" , "НҮБ-ын мэдээ")
          ->select("pko_date_news.*")
          ->orderBy("created_at", "DESC")
          ->paginate(9);
         return view('noobnews.index',compact('DateNews'));
    }

         public function showPost($postID, Request $req){

          if (Cookie::has('pc' . $postID)){
        }
        else{
            Cookie::queue(Cookie::make('pc' . $postID, 'value', time() + (10 * 365 * 24 * 60 * 60)));
            $this->increaseReadCountPost($postID);
        }
         $post = DB::table("pko_date_news")
          ->where("pko_date_news.menuID" ,"=" , "НҮБ-ын мэдээ")
            ->where("id", '=', $postID)
            ->first();
            return view("noobnews.onepost", compact("post"));
     }

      public function increaseReadCountPost($postID){
        $postRow = DB::table("pko_date_news")
          ->where("pko_date_news.menuID" ,"=" , "НҮБ-ын мэдээ")
            ->where("id", '=', $postID)
            ->first();
        $readCount = $postRow->readCount;
        $readCount++;
        $post = DateNews::find($postID);
        $post->readCount = $readCount;
        $post->save();
    }
}
