<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reqyear;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ReqdateController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

public function usercheck($userID,$yearID){
    $wishyear = DB::table('pko_date')
        ->where('pkoUserID', '=', $userID)
        ->where('yearID', '=', $yearID)
        ->get();
    if(count($wishyear) == 0){
      return "okey";
    }
    else{
      return "no";
    }
  }

    public function plus(Request $req){
        if($this->usercheck(
            Auth::user()->id,
            $req->yearID,
            ) == "no"){
                return response(
                    array(
                        "status" => "already",
                        "msg" => "Та хүсэлт илгээсэн байна."
                    ), 200);          }
        try {
            $insertlist = new Reqyear();
            $insertlist->pkoUserID = Auth::user()->id;
            $insertlist->yearID = $req->yearID;
            $insertlist->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хүсэлт илгээлээ."
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
