<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BT_album;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
      public function image(){
        $postImages = DB::table('tb_album')
        ->where("image", "!=", "")
        ->paginate(15);

        return view('part.image', compact('postImages'));
    }

    public function announcement(Request $request){
        $posts = DB::table("tb_recommendation")
        ->join('pko_users', 'tb_recommendation.userID', '=', 'pko_users.id')
        ->join('all_users', 'pko_users.allUsersID', '=', 'all_users.id')
        ->select('tb_recommendation.*',"pko_users.email", "all_users.firstName")
        ->whereIn('tb_recommendation.show', [1, 3])
        ->orderBy("created_at", "DESC")
        ->paginate(100);
        // ->get();
        //  $posts = BT_recommendation::paginate(15);
         if($request->ajax()){
            $view = view('data',compact('post'))->render();
            return response()->json(['html'=>$view]);
         }

        return view('part.announcement',compact('posts'));
    }

    public function about(){
          $lastPosts = DB::table("tb_about")
          ->select("tb_about.*")
          ->orderBy("date", "DESC")
          ->paginate(9);
         return view('part.about',compact('lastPosts'));

    }



    public function getalbum(){

    $albumClass = DB::table("tb_album")
    ->where("tb_album.userID", "=", Auth::user()->id)
    ->get();
    return $albumClass;
}


public function deletealbum(Request $req){
try {
    $delete = BT_album::find($req->id);
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



public function newalbum(Request $req){
try {
    $insertalbum = new BT_album();
    $insertalbum->userID = Auth::user()->id;
    $insertalbum->image = $req->image;
    $insertalbum->save();
    return response(
        array(
            "status" => "success",
            "msg" => "Амжилттай хадгаллаа."
        ), 200);
} catch (\Throwable $th) {

    // return $th;
    return response(
        array(
            "status" => "error",
            "msg" => "Алдаа гарлаа"
        ), 500);
}
}



}
