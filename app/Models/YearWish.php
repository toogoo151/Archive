<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class YearWish extends Model
{
    use HasFactory;
    protected $table = 'pko_year';
    public $timestamps = false;

    public function getYear(){
        try {
            $getYear = DB::table('pko_year')->get();
            return $getYear;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }
}
