<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BT_recommendation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Redirect,Response,File;
use Illuminate\Support\Str;


class ZarlanController extends Controller
{
public function getannouncement(){

        $recommendationClass = DB::table("tb_recommendation")
        ->where("tb_recommendation.userID", "=", Auth::user()->id)
        ->get();
        return $recommendationClass;
}

public function notify(){
        $notify = DB::table("tb_recommendation")
        // ->where("tb_recommendation.userID", "=", Auth::user()->id)
        ->get();
        return $notify;
}

public function deleteannouncement(Request $req){
    try {
        $delete = BT_recommendation::find($req->id);
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

public function newannouncement(Request $req){
    try {

        $insertlist = new BT_recommendation();
        $insertlist->userID = Auth::user()->id;
        $insertlist->RecommendationName = $req->RecommendationName;
         $insertlist->status = 0;
        $insertlist->show = $req->show;
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

public function getHistory(Request $req){
        try {
        $list = DB::table("tb_recommendation")
        ->join('pko_users', 'tb_recommendation.userID', '=', 'pko_users.id')
        ->join('all_users', 'pko_users.allUsersID', '=', 'all_users.id')
        ->select('tb_recommendation.*',"pko_users.email", "all_users.firstName")
        ->whereIn('tb_recommendation.show', [2, 3])
        ->orderBy("created_at", "DESC")
            ->get();
            return $list;
        } catch (\Throwable $th) {
            // throw $th;
        }
    }



//  function saveImage(Request $request){
//        $fielnames = $request->input('name');
//        $desc = $request->input('desc');

//       $submitData= DB::table('image_gallary')->insert([
//             'name' =>  $fielnames ,
//             'status' => 0,
//             'description'=> $desc
//           ]);

//       if($submitData){
//         return Response::json(['status'=>true]);
//       }
//       else{
//         return Response::json(['status'=>false]);
//      }

//     }
    function dataList(){

      $res =  DB::table('tb_recommendation')
        ->join('pko_users', 'tb_recommendation.userID', '=', 'pko_users.id')
        ->join('all_users', 'pko_users.allUsersID', '=', 'all_users.id')
        ->select('tb_recommendation.*',"pko_users.email", "all_users.firstName")
        ->whereIn('tb_recommendation.show', [2, 3])
        ->whereRaw("NOT FIND_IN_SET(" . Auth::user()->id .", tb_recommendation.status)")
      ->get();
      return Response::json($res);

    }
    function getLatestRow(Request $request){

      $res =  DB::table('tb_recommendation')
        ->join('pko_users', 'tb_recommendation.userID', '=', 'pko_users.id')
    ->join('all_users', 'pko_users.allUsersID', '=', 'all_users.id')
    ->select('tb_recommendation.*', 'pko_users.email', 'all_users.firstName')
        ->whereIn('tb_recommendation.show', [2, 3])
         ->whereRaw("NOT FIND_IN_SET(" . Auth::user()->id .", tb_recommendation.status)")
    ->count();
      return Response::json($res);
    }

    function updateNotification(Request $request){

        $updateNotification = DB::table('tb_recommendation')
        ->whereIn('tb_recommendation.show', [2, 3])
         ->whereRaw("NOT FIND_IN_SET(" . Auth::user()->id .", tb_recommendation.status)")
         ->update(['tb_recommendation.status' => DB::raw('CONCAT(tb_recommendation.status, ",", ' . Auth::user()->id . ')')
          ]);
         return $updateNotification;


    //  $updateNotification = DB::table('tb_recommendation')
    //     ->join('pko_users', 'tb_recommendation.userID', '=', 'pko_users.id')

    // //   ->where('tb_recommendation.status', '!=', DB::raw('pko_users.id'))
    // ->whereIn('tb_recommendation.status', '!=', [DB::raw('pko_users.id')])
    //   ->update([
    //         // 'status' => Auth::user()->id,
    //     'tb_recommendation.status' => DB::raw('CONCAT(tb_recommendation.status, ",", ' . Auth::user()->id . ')')
    //       ]);

    //       return $updateNotification;

      if($updateNotification){
        // return Response::json(['status'=>true]);
      }
      else{
        // return Response::json(['status'=>false]);
      }

    }


}
