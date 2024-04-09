<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DocumentItem extends Model
{
    use HasFactory;
    protected $table = 'pko_document_items';
    public $timestamps = false;

    public function getDocItems($req){
        try {
            $getDocItems = DB::table("pko_document_items")
            ->where("pko_document_items.missionID", "=", $req->_missionID)
            ->where("pko_document_items.eeljID", "=", $req->_eeljID)
            ->join("pko_missions", "pko_missions.id", "=", "pko_document_items.missionID")
            ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_document_items.eeljID")
            ->select("pko_document_items.*", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
            return $getDocItems;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Бичиг баримт татаж чадсангүй."
                ), 500
            );
        }
    }

    public function getbyIDItemShaardlaga($req){
        try {
            $getDocItems = DB::table("pko_document_items")
            ->where("pko_document_items.missionID", "=", 1)
            ->where("pko_document_items.eeljID", "=", 3)
            ->join("pko_missions", "pko_missions.id", "=", "pko_document_items.missionID")
            ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_document_items.eeljID")
            ->select("pko_document_items.*", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
            return $getDocItems;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Бичиг баримт татаж чадсангүй."
                ), 500
            );
        }
    }



    public function countDocItems($req){
        try {
            $getCountDocItems = DB::table("pko_document_items")
            ->where("missionID", "=", $req->_missionID)
            ->where("eeljID", "=", $req->_eeljID)
            ->get();
            return count($getCountDocItems);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Бичиг баримтын тоо татаж чадсангүй."
                ), 500
            );
        }
    }
}
