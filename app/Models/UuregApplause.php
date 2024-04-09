<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UuregApplause extends Model
{
    use HasFactory;
    protected $table = 'pko_uureg_applause';
    public $timestamps = false;

    public function getUuregApplauses(){
        try {
            $uuregApplauses = DB::table("pko_uureg_applause")->get();
            return $uuregApplauses;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Төрөл татаж чадсангүй."
                ), 500);
        }
    }

}
