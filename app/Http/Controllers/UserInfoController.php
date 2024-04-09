<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\BT_Unit;

class UserInfoController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

        public function getUsersInUnits(Request $req){
        try {
            $units = DB::table("users")
            ->where("users.user_type", "!=", "unitUser" )
            ->join("all_users", function($query){
                $query->on("users.allUsersID", "=", "all_users.id");
            })
            ->leftJoin("tb_unit", function($query){
                $query->on("all_users.unitID", "=", "tb_unit.id");
            })
            ->leftJoin("tb_ranks", function($query){
                $query->on("all_users.rankID", "=", "tb_ranks.id");
            })
            ->select("users.id","all_users.firstName", "all_users.position", "users.email", "all_users.phone", "all_users.image", "tb_unit.unitShortName as unitShortName", "tb_unit.unitFullName as unitFullName", "tb_ranks.rank")->get();
            return $units;
        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }
    public function getRank(Request $req){
        $getRankName = DB::table("tb_ranks")
        ->where("tb_ranks.id", "=", $req->rankID)
        ->get();
        return $getRankName;
    }
}
