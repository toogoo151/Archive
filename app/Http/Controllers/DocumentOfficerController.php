<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\DocumentOfficer;
use App\Models\DocumentOfficerItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DocumentOfficerController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function myUserID($req)
    {
        try {
            $myID = DB::table("pko_officer_main")
                ->where("pko_officer_main.missionID", "=", $req->_missionID)
                ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                ->where("pko_officer_main.pkoUserID", "=", Auth::user()->id)
                ->first();
            return $myID->id;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function getDocOfficer(Request $req)
    {
        try {
            $getDocUser = DB::table("pko_officer_documents")
                ->where("pko_officer_documents.missionID", "=", $req->_missionID)
                ->where("pko_officer_documents.eeljID", "=", $req->_eeljID)
                ->where("pko_officer_documents.pkoMainID", "=", $this->myUserID($req))
                ->join("pko_officer_documents_items", "pko_officer_documents_items.id", "=", "pko_officer_documents.documentOffItemID")
                ->select("pko_officer_documents.*", "pko_officer_documents_items.documentName", "pko_officer_documents_items.documentShaardlaga")
                ->get();

            $countDocItems = new DocumentOfficerItem();
            $docItemsLength = $countDocItems->countOffDocItems($req);

            $getMyDocTotal = DB::table("pko_officer_documents")
                ->where("pko_officer_documents.missionID", "=", $req->_missionID)
                ->where("pko_officer_documents.eeljID", "=", $req->_eeljID)
                ->where("pko_officer_documents.pkoMainID", "=", $this->myUserID($req))
                ->count();

            if ($getMyDocTotal === $docItemsLength) {
                $getTotal = 1;
            } else {
                $getTotal = 0;
            }

            $row = array(
                "getDocUser" => $getDocUser,
                "pkoMainID" => $this->myUserID($req),
                "getMyDocTotal" => $getTotal,
            );
            return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }
}
