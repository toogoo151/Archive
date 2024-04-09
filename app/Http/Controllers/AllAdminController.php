<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\BT_Unit;
use App\Models\all_users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AllAdminController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getAllAdmins(){
        try {
            if(Auth::user()->user_type === "superAdmin"){
                $admins = DB::table("pko_users")
                ->join("all_users", function($query){
                    $myComandlal = new all_users;
                    $myComandlalRow = $myComandlal->getUserComandlal();
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if(Auth::user()->user_type == "comandlalAdmin"){
                        $query->where("all_users.comandlalID", "=", $myComandlalRow->id);
                    }
                })
                ->leftJoin("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->leftJoin("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->leftJoin("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->select( "pko_users.id", "pko_users.email","pko_users.phone", "pko_users.user_type", "all_users.comandlalID", "all_users.unitID", "all_users.firstName","all_users.lastName", "all_users.rd","all_users.position", "all_users.age", "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")
                ->get();
                return  $admins;
            }
            if(Auth::user()->user_type === "batalionAdmin"){
                $admins = DB::table("pko_users")
                ->where("pko_users.user_type", "=", "unitUser")
                ->join("pko_wish", function($query){
                    $query->on("pko_users.id", "=", "pko_wish.pkoUserID");
                })
                ->join("all_users", function($query){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->leftJoin("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->leftJoin("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->leftJoin("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->select( "pko_users.id", "pko_users.email","pko_users.phone", "pko_users.user_type", "all_users.comandlalID", "all_users.unitID", "all_users.firstName","all_users.lastName", "all_users.rd","all_users.position", "all_users.age", "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")
                ->get();
                return  $admins;
            }

        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }


    public function angiruuShiljuuleh(Request $req){
        try {
             $user =  User::find($req->id);
            $user->user_type = $req->userTypeOld;
            $user->save();

            $all_user = all_users::find($user->allUsersID);
            $all_user->comandlalID = $req->comandlal;
            $all_user->unitID = $req->unit;
            $all_user->dundiinTulv = 0;
            $all_user->save();
            return response(
                array("msg" => "Амжилттай шилжүүллээ"), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getDundiinTuluv(){
        try {
            $admins = DB::table("pko_users")
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id")
                ->where("all_users.dundiinTulv", "=", 1);
            })
            ->leftJoin("tb_ranks", function($query){
                $query->on("all_users.rankID", "=", "tb_ranks.id");
            })
            ->leftJoin("tb_gender", function($query){
                $query->on("all_users.gender", "=", "tb_gender.id");
            })
            ->select("pko_users.id", "pko_users.email","pko_users.phone",  "all_users.rankParentID", "all_users.rankTypeID", "all_users.rankID", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.gender", "all_users.position",  "tb_gender.genderName",  "tb_ranks.shortRank", "all_users.dundiinTulv")->get();
            return $admins;
        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }

    public function userErhZasah(Request $req){
        try {
             $user =  User::find($req->id);
            $user->user_type = $req->userTypeOld;
            $user->save();

            $all_user = all_users::find($user->allUsersID);
            $all_user->comandlalID = $req->comandlal;
            $all_user->unitID = $req->unit;
            $all_user->save();
            return response(
                array("msg" => "Амжилттай заслаа"), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getComandlalUser(){
        try {
            $admins = DB::table("pko_users")
            ->where( function($query){

                    $myUnit = new all_users;
                    $myUnitFirstRow = $myUnit->getUserUnit();

                    $query->where("pko_users.user_type", "=", "unitUser")
                    ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                    ->where("all_users.unitID", "=", $myUnitFirstRow->id);

            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->leftJoin("tb_comandlal", function($query){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
            })
            ->leftJoin("tb_unit", function($query){
                $query->on("all_users.unitID", "=", "tb_unit.id");
            })
            ->leftJoin("tb_ranks", function($query){
                $query->on("all_users.rankID", "=", "tb_ranks.id");
            })
            ->leftJoin("tb_gender", function($query){
                $query->on("all_users.gender", "=", "tb_gender.id");
            })
            ->select("pko_users.id", "pko_users.email","pko_users.phone", "all_users.comandlalID", "all_users.unitID", "all_users.rankParentID", "all_users.rankTypeID", "all_users.rankID", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.gender", "all_users.position", "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")->get();
            return $admins;
        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }
}
