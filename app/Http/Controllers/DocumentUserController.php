<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\DocumentItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DocumentUserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function myUserID($req){
        try {
            $myID = DB::table("pko_main_history")
            ->where("pko_main_history.missionID", "=", $req->_missionID)
            ->where("pko_main_history.eeljID", "=", $req->_eeljID)
            ->where( "pko_main_history.pkoUserID", "=", Auth::user()->id)
            ->first();
            return $myID->id;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getDocUser(Request $req){
        try {
            $getDocUser = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $req->_missionID)
            ->where("pko_documents.eeljID", "=", $req->_eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $this->myUserID($req))
            ->join("pko_document_items", "pko_document_items.id", "=", "pko_documents.documentItemID")
            ->select("pko_documents.*", "pko_document_items.documentName", "pko_document_items.documentShaardlaga")
            ->get();

            $countDocItems = new DocumentItem();
            $docItemsLength = $countDocItems->countDocItems($req);

            $getMyDocTotal = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $req->_missionID)
            ->where("pko_documents.eeljID", "=", $req->_eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $this->myUserID($req))
            ->count();

            if($getMyDocTotal === $docItemsLength){
                $getTotal = 1;
            } else {
                $getTotal = 0;
            }

            $row = array(
                "getDocUser" => $getDocUser,
                "pkoMainHistoryID" => $this->myUserID($req),
                "getMyDocTotal" => $getTotal,
            );
            return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }



}
