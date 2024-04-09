<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Wish;
use App\Models\OfficerWish;
use App\Models\MainHistory;
use App\Models\OfficerMainHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class RequserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

  public function usercheck($userID,$missionID,$eeljID){
    $wish = DB::table('pko_wish')
        ->where('pkoUserID', '=', $userID)
        ->where('missionID', '=', $missionID)
        ->where('eeljID', '=', $eeljID)
        ->get();
    if(count($wish) == 0){
      return "okey";
    }
    else{
      return "no";
    }
  }

    public function officercheck($userID, $missionID, $eeljID)
    {
        $wish = DB::table('pko_officer_wish')
        ->where('pkoUserID', '=', $userID)
            ->where('missionID', '=', $missionID)
            ->where('eeljID', '=', $eeljID)
            ->get();
        if (count($wish) == 0) {
            return "okey";
        } else {
            return "no";
        }
    }
    public function missionCheck($userID, $missionID)
    {
        $mission = DB::table('pko_officer_question')
            ->where('pkoUserID', '=', $userID)
            ->where('courseName', '=', ($missionID == 3) ? 0 : $missionID)
            ->get();
        if (count($mission) == 0) {
            return "okey";
        } else {
            return "no";
        }
    }




    public function plus(Request $req){
        if($this->usercheck(
            Auth::user()->id,
            $req->missionID,
            $req->eeljID
            ) == "no"){
                return response(
                    array(
                        "status" => "already",
                        "msg" => "Та хүсэлт илгээсэн байна."
                    ), 200);          }
        try {
            $insertlist = new Wish();
            $insertlist->pkoUserID = Auth::user()->id;
            $insertlist->missionID = $req->missionID;
            $insertlist->eeljID = $req->eeljID;
            $insertlist->save();

            $store = new MainHistory;
            $store->pkoUserID = $insertlist->pkoUserID;
            $store->missionID = $insertlist->missionID;
            $store->eeljID = $insertlist->eeljID;
            $store->save();

            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хүсэлт илгээлээ."
                ), 200);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500);
        }

    }


    public function plus2(Request $req)
    {
        if ($this->officercheck(
            Auth::user()->id,
            $req->missionID,
            $req->eeljID
        ) == "no") {
            return response(
                array(
                    "status" => "already",
                    "msg" => "Та хүсэлт илгээсэн байна."
                ),
                200
            );
        }
        if ($this->missionCheck(
            Auth::user()->id,
            $req->missionID,
            $req->eeljID
        ) == "no") {
            return response(
                array(
                    "status" => "already",
                    "msg" => "Та энэ ажиллагааны дамжаанд сураагүй учраас явах боломжгүй байна."
                ),
                200
            );
        }
        try {
            $insertlist = new OfficerWish();
            $insertlist->pkoUserID = Auth::user()->id;
            $insertlist->missionID = $req->missionID;
            $insertlist->eeljID = $req->eeljID;
            $insertlist->save();

            $store = new OfficerMainHistory;
            $store->pkoUserID = $insertlist->pkoUserID;
            $store->missionID = $insertlist->missionID;
            $store->eeljID = $insertlist->eeljID;
            $store->save();

            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хүсэлт илгээлээ."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа: " . $th->getMessage()
                ),
                500
            );
        }
    }

}
