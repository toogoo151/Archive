<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\MainHistory;


class ProcessController extends Controller
{
    public function get($req){
         try {
    $getMain = DB::table("pko_main_history")
        ->where("missionID", "=", "3")
        ->where("eeljID", "=", "16")
           ->where("pko_main_history.pkoUserID", "=", Auth::user()->id)
           ->get();
           return $getMain;
        } catch (\Throwable $th) {
             //throw $th;
        }
    }
     public function tomilgoo(){
         try {
    $getTomilgoo = DB::table("pko_control")
    ->select("pko_control.isTomilogdson")
           ->get();
           return $getTomilgoo;
        } catch (\Throwable $th) {
             //throw $th;
        }
    }






}
