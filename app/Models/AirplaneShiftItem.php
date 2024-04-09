<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AirplaneShiftItem extends Model
{
    use HasFactory;
    protected $table = 'pko_airplane_shift_item';
    public $timestamps = false;

    public function getAirplaneShiftItems(){
        try {
            $getAirplaneShift = DB::table("pko_airplane_shift_item")->get();
            return $getAirplaneShift;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Нислэгийн ээлж татаж чадсангүй."
                ), 500
            );
        }
    }
}
