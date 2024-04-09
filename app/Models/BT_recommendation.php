<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BT_recommendation extends Model
{
    use HasFactory;
    protected $table = 'tb_recommendation';
    public $timestamps = true;

      public function getUsers(){
        try {
            $users = DB::table("pko_users")
            ->join('all_users', 'pko_users.allUsersID', '=', 'all_users.id')
            ->get();
            return $users;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Хүнээ татаж чадсангүй."
                ), 500);
        }
    }
}




