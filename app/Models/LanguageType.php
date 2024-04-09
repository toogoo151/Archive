<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LanguageType extends Model
{
    use HasFactory;
    protected $table = 'pko_language_type';
    public $timestamps = false;

    public function getLanguageType(){
        try {
            $getLanguageTypes = DB::table("pko_language_type")->get();
            return $getLanguageTypes;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Хэлний төрөл татаж чадсангүй."
                ), 500);
        }
    }
}
