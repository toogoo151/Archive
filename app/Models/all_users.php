<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class all_users extends Model
{
     use HasFactory;
    protected $table = 'all_users';
    public $timestamps = true;

    public function getUserName(){
        $getUserName = DB::table("all_users")->where("id", "=",Auth::user()->allUsersID)->first();
        return $getUserName->firstName;
    }

    //   public function getRD(){
    //     $getUserName = DB::table("all_users")
    //     ->where("id", "=",Auth::user()->allUsersID)->first();
    //     return $getUserName->rd;
    // }

    public function getUserRank(){
        $getUserName = DB::table("all_users")
        ->where("all_users.id", "=", Auth::user()->allUsersID)
        ->join("tb_ranks", "tb_ranks.id","=", "all_users.rankID")
        ->select("tb_ranks.shortRank")
        ->first();
        return $getUserName;
    }

     public function getUserId(){
        $getUserId = DB::table("pko_users")
        ->where("pko_users.id", "=", Auth::user()->id)
        ->select("pko_users.id")
        ->first();
        return $getUserId;
    }

    public function getUser(){
        $getUserName = DB::table("all_users")
        ->where("all_users.id", "=", Auth::user()->allUsersID)
        ->join("tb_ranks", "all_users.rankID", "tb_ranks.id")
        ->join("tb_unit", "all_users.unitID", "tb_unit.id")
        ->select("all_users.firstName as name", "tb_ranks.shortRank", "all_users.image", "tb_unit.unitShortName")
        ->first();

        return response(
                    array(
                        "userImage"=>$getUserName->image,
                        "userID"=>Auth::user()->id,
                        "rank" => $getUserName->shortRank,
                        "name" => $getUserName->name,
                        "userUnitName" => $getUserName->unitShortName,
                        "permission" =>Auth::user()->permission,
                        "user_type" =>Auth::user()->user_type,
                    ), 201
                );
    }

    public function getUserComandlal(){
        $getUserName = DB::table("all_users")
        ->where("all_users.id", "=", Auth::user()->allUsersID)
        ->join("tb_comandlal", function($query){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
            })
        ->select("tb_comandlal.*")
        ->first();
        return $getUserName;
    }

    public function getUserUnit(){
        $getUserName = DB::table("all_users")
        ->where("all_users.id", "=", Auth::user()->allUsersID)
        ->join("tb_unit", function($query){
                $query->on("all_users.unitID", "=", "tb_unit.id");
            })
        ->select("tb_unit.*")
        ->first();
        return $getUserName;
    }

    public function getUserImage(){
        $getUserName = DB::table("all_users")
        ->where("all_users.id", "=", Auth::user()->allUsersID)
        ->select("all_users.image")
        ->first()->image;
        return $getUserName;
    }

    public function getComandlalID(){
        $getComandlalID = DB::table("all_users")
        ->where("all_users.id", "=", Auth::user()->allUsersID)
        ->select("all_users.comandlalID")
        ->first();
        return $getComandlalID->comandlalID;
    }
    public function getUnitlID(){
        $getComandlalID = DB::table("all_users")
        ->where("all_users.id", "=", Auth::user()->allUsersID)
        ->select("all_users.unitID")
        ->first();
        return $getComandlalID->unitID;
    }

}
