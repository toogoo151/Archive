<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class AllRanksController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getRankParent(){
        try {
            $rankParent = DB::table("tb_rank_parent")->get();
            return $rankParent;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Бүрэлдэхүүн татаж чадсангүй."
                ), 500);
        }
    }


    public function getTypeByParentID(Request $req)
    {
        try {
            $rankType = DB::table("tb_rank_type")
                ->where("tb_rank_type.rankParentID", "=", $req->_rankParentID)
                ->get();
            return $rankType;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
    }

    public function getRankByTypeID(Request $req)
    {
        try {
            $ranks = DB::table("tb_ranks")
                ->where("tb_ranks.rankTypeID", "=", $req->_rankTypeID)
                ->get();
            return $ranks;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
    }

}
