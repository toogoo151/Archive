<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CanceledType extends Model
{
    use HasFactory;
    protected $table = 'pko_canceled_type';
    public $timestamps = false;

    public function getCanceledTypes(){
        try {
            $sportType = DB::table("pko_canceled_type")
            ->get();
            return $sportType;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Татгалзсан шалтгаан татаж чадсангүй."
                ), 500
            );
        }
    }
}
