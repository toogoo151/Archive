<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AirplaneArrived extends Model
{
    use HasFactory;
    protected $table = 'pko_airplane_arrived';
    public $timestamps = false;


    public function getAirplaneArrived(){
        try {
            $getAirplaneShift = DB::table("pko_airplane_arrived")->get();
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
