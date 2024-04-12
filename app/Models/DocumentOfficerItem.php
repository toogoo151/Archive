<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DocumentOfficerItem extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_documents_items';
    public $timestamps = false;

    public function getOffDocItems($req)
    {
        try {
            $getDocItems = DB::table("pko_officer_documents_items")
                ->where("pko_officer_documents_items.missionID", "=", $req->_missionID)
                ->where("pko_officer_documents_items.eeljID", "=", $req->_eeljID)
                ->join("pko_missions", "pko_missions.id", "=", "pko_officer_documents_items.missionID")
                ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_officer_documents_items.eeljID")
                ->select("pko_officer_documents_items.*", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->get();
            return $getDocItems;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Бичиг баримт татаж чадсангүй."
                ),
                500
            );
        }
    }

    public function getOffbyIDItemShaardlaga($req)
    {
        try {
            $getDocItems = DB::table("pko_officer_documents_items")
                ->where("pko_officer_documents_items.missionID", "=", 1)
                ->where("pko_officer_documents_items.eeljID", "=", 3)
                ->join("pko_missions", "pko_missions.id", "=", "pko_officer_documents_items.missionID")
                ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_officer_documents_items.eeljID")
                ->select("pko_officer_documents_items.*", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->get();
            return $getDocItems;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Бичиг баримт татаж чадсангүй."
                ),
                500
            );
        }
    }



    public function countOffDocItems($req)
    {
        try {
            $getCountDocItems = DB::table("pko_officer_documents_items")
                ->where("missionID", "=", $req->_missionID)
                ->where("eeljID", "=", $req->_eeljID)
                ->get();
            return count($getCountDocItems);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Бичиг баримтын тоо татаж чадсангүй."
                ),
                500
            );
        }
    }
}
