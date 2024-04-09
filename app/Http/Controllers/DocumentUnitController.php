<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\all_users;
use App\Models\Document;
use App\Models\DocumentItem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;

class DocumentUnitController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    //Undsen tabliin medeelel bolon labeluudiin bodolt hiigdsen
    public function getDocUnit(Request $req){
        try {
            $countDocItems = new DocumentItem();
           $docItemsLength = $countDocItems->countDocItems($req);

                $myUnitRow = new all_users();
                $getMainHistory = "";
                if($req->_allState == "all"){
                    $getMainHistory = $this->myAllRows($req, $myUnitRow);
                }
                if($req->_allState == "complete"){
                    $getMainHistory = $this->myCompleteRows($req, $myUnitRow);
                }
                if($req->_allState == "incomplete"){
                    $getMainHistory = $this->myInCompleteRows($req, $myUnitRow);
                }
                if($req->_allState == "notdone"){
                    $getMainHistory = $this->myNotDoneRows($req, $myUnitRow);
                }
                if($req->_allState == "approved"){
                    $getMainHistory = $this->myApprovedRows($req, $myUnitRow);
                }
                if($req->_allState == "declined"){
                    $getMainHistory = $this->myDeclinedRows($req, $myUnitRow);
                }


                $countDocItemsBuren = 0;
                $countDocItemsDutuu = 0;
                $countDocItemsHiigdeegui = 0;
                $countDocItemsComandlalApproved = 0;
                $countDocItemsComandlalDecline = 0;
                foreach ($this->myAllRows($req, $myUnitRow) as $mainHistoryRow) {
                    $getCompletes = DB::table("pko_documents")
                    ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                    ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                    ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                    ->get();

                    $getDocApproved = DB::table("pko_documents")
                    ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                    ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                    ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                    ->where("pko_documents.approveComandlal", "=", 1) // approved
                    ->get();

                    $getDocDeclined = DB::table("pko_documents")
                    ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                    ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                    ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                    ->where("pko_documents.approveComandlal", "=", 2) // decline
                    ->get();

                    if(count($getCompletes) == $docItemsLength){
                        $countDocItemsBuren ++;
                    }
                    if(count($getCompletes) < $docItemsLength && count($getCompletes) > 0 ){
                        $countDocItemsDutuu ++;
                    }
                    if(count($getCompletes) == 0 ){
                        $countDocItemsHiigdeegui ++;
                    }

                    if(count($getDocApproved) == $docItemsLength ){
                        $countDocItemsComandlalApproved ++;
                    }
                    if(count($getDocDeclined) > 0 ){
                        $countDocItemsComandlalDecline ++;
                    }

                }



            $row = array(
                "getMainHistory" => $getMainHistory,
                "complete" => $countDocItemsBuren,
                "inComplete" => $countDocItemsDutuu,
                "notDone" => $countDocItemsHiigdeegui,
                "totalDoc"=> $countDocItemsBuren+$countDocItemsDutuu+$countDocItemsHiigdeegui,
                "approve" => $countDocItemsComandlalApproved,
                "decline" => $countDocItemsComandlalDecline,
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
    //Undsen tabliin medeelel bolon labeluudiin bodolt hiigdsen heseg end duusna

    //Undsen tabliin click rowoos hamaarch garch ireh child table -> bichig barimtiin burdel oruulah undsen table
    public function getDocUnitChild(Request $req){
        try {
            $getDocUnitChild = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $req->_missionID)
            ->where("pko_documents.eeljID", "=", $req->_eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $req->_rowID)
            ->join("pko_document_items", "pko_document_items.id", "=", "pko_documents.documentItemID")
            ->select("pko_documents.*", "pko_document_items.documentName", "pko_document_items.documentShaardlaga")
            ->get();
            return $getDocUnitChild;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function checkDoc($req){
        $check = Document::where("missionID", "=", $req->missionID)
        ->where("eeljID", "=", $req->eeljID)
        ->where("pkoMainHistoryID", "=", $req->pkoMainHistoryID)
        ->where("documentItemID", "=", $req->documentItemID)
        ->get();
        if(count($check) == 0)
            return true;
        else
            return false;
    }

    public function newDocUnitChild(Request $req){
        try {
            if(!$this->checkDoc($req)){
                return response(
                    array(
                        "msg" => "Бичиг баримтын төрөлд оруулга оруулсан байна."
                    ),500
                );
            }

            // PDFtei holbootoi heseg
            if($req->documentPdf != ""){
                $userID = Auth::user()->id;
                $userFolder = 'public/documents/'.$req->missionID.'/'.$req->eeljID.'/'.$userID;

                $pdf_64 = $req->documentPdf;
                $setPDFPathID = $req->pdfName."_".$userID;

                $extension = explode('/', explode(':', substr($pdf_64, 0, strpos($pdf_64, ';')))[1])[1];
                $replace = substr($pdf_64, 0, strpos($pdf_64, ',')+1);
                $pdf = str_replace($replace, '', $pdf_64);
                $pdf = str_replace(' ', '+', $pdf);

                $path = $userFolder."/".$setPDFPathID.".".$extension;

                Storage::disk('local')->put($path, base64_decode($pdf));

                $getPDFUrl = '/documents'.'/'.$req->missionID.'/'.$req->eeljID.'/'.$userID.'/'.$setPDFPathID.".".$extension;
            }
            //PDFtei holbootoi heseg end duusna

            $insertDoc = new Document();
            $insertDoc->missionID = $req->missionID;
            $insertDoc->eeljID = $req->eeljID;
            $insertDoc->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertDoc->documentItemID = $req->documentItemID;
            $insertDoc->documentPdf = $getPDFUrl;
            $insertDoc->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }


    public function editDocUnitChild(Request $req){
        try {


             // PDFtei holbootoi heseg
             if($req->documentPdf != "" && strlen($req->documentPdf) >50){
                //pdf delete
                $deletePdf = Document::find($req->id);
                if($deletePdf->documentPdf != "0"){
                    Storage::delete('public' . $deletePdf->documentPdf);
                }
                //pdf delete
                $userID = Auth::user()->id;
                $userFolder = 'public/documents/'.$req->missionID.'/'.$req->eeljID.'/'.$userID;

                $pdf_64 = $req->documentPdf;
                $setPDFPathID = $req->pdfName."_".$userID;

                $extension = explode('/', explode(':', substr($pdf_64, 0, strpos($pdf_64, ';')))[1])[1];
                $replace = substr($pdf_64, 0, strpos($pdf_64, ',')+1);
                $pdf = str_replace($replace, '', $pdf_64);
                $pdf = str_replace(' ', '+', $pdf);

                $path = $userFolder."/".$setPDFPathID.".".$extension;

                Storage::disk('local')->put($path, base64_decode($pdf));

                $getPDFUrl = '/documents'.'/'.$req->missionID.'/'.$req->eeljID.'/'.$userID.'/'.$setPDFPathID.".".$extension;
            }
            //PDFtei holbootoi heseg end duusna

            $edit = Document::find($req->id);
            $edit->missionID = $req->missionID;
            $edit->eeljID = $req->eeljID;
            $edit->pkoMainHistoryID = $req->pkoMainHistoryID;
            $edit->documentItemID = $req->documentItemID;
            $edit->documentPdf = $getPDFUrl;
            $edit->approveComandlal = 0;
            $edit->approveGsmaf = 0;
            $edit->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function deleteDocUnitChild(Request $req){
        try {
            $delete = Document::find($req->id);
            if($delete->documentPdf != "0"){
                Storage::delete('public' . $delete->documentPdf);
            }
            $delete->delete();


            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа."
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

     //Undsen tabliin click rowoos hamaarch garch ireh child table -> bichig barimtiin burdel oruulah undsen table end duusna insert, edit, delete

    //Bichig barimtiin burdel oruulah tabliin click rowoos hamaarch garch ireh table -> Ene ni tatgalzsan bichig barimtiin tailbariig haruulna
    public function getDocUnitDes(Request $req){
        try {
            $getDescriptions = array();
            $getDocUnitDes = DB::table("pko_doc_description")
            ->where("pko_doc_description.pkoDocumentID", "=", $req->_rowID)
            ->get();

            foreach ($getDocUnitDes as $key =>  $getDocUnitDesOne) {
               $row = array(
                    "id" => $key+1,
                    "docDescription" => $getDocUnitDesOne->docDescription,
                    "adminName" => $getDocUnitDesOne->adminName,
                    "comandlalName" =>$getDocUnitDesOne->comandlalName
               );
               array_push($getDescriptions, $row);
            }

            return $getDescriptions;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }
     //Bichig barimtiin burdel oruulah tabliin click rowoos hamaarch garch ireh table -> Ene ni tatgalzsan bichig barimtiin tailbariig haruulah heseg end duusna

    //ТӨЛӨВ gesen selectees hamaarch undsen table uurchlugduj haragdah heseg endees
    public function myAllRows($req, $myUnitRow){
        try {
            $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use ($myUnitRow){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->select("pko_main_history.*", "all_users.lastName",  "all_users.firstName","all_users.rd", "all_users.image", "tb_ranks.shortRank", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->get();

              return $getMainHistory;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function myCompleteRows($req, $myUnitRow){
        try {
            $countDocItems = new DocumentItem();
           $docItemsLength = $countDocItems->countDocItems($req);
           $getMainHistory = "";
           $getMainHistory = $this->myAllRows($req, $myUnitRow);

           $getMainHistoryRowIDs = array();
           foreach ($getMainHistory as $mainHistoryRow) {
            $getCompletes = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->get();

            if (count($getCompletes) == $docItemsLength){
                array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
            }


        }
        return $this->getWhereIn($getMainHistoryRowIDs, $myUnitRow);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function myInCompleteRows($req, $myUnitRow){
        try {
            $countDocItems = new DocumentItem();
           $docItemsLength = $countDocItems->countDocItems($req);
           $getMainHistory = "";
           $getMainHistory = $this->myAllRows($req, $myUnitRow);

           $getMainHistoryRowIDs = array();
           foreach ($getMainHistory as $mainHistoryRow) {
            $getCompletes = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->get();

            if (count($getCompletes) < $docItemsLength && count($getCompletes) > 0){
                array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
            }

        }
        return $this->getWhereIn($getMainHistoryRowIDs, $myUnitRow);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function myNotDoneRows($req, $myUnitRow){
        try {
           $getMainHistory = "";
           $getMainHistory = $this->myAllRows($req, $myUnitRow);

           $getMainHistoryRowIDs = array();
           foreach ($getMainHistory as $mainHistoryRow) {
            $getCompletes = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->get();

            if (count($getCompletes) == 0){
                array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
            }

        }
        return $this->getWhereIn($getMainHistoryRowIDs, $myUnitRow);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function myApprovedRows($req, $myUnitRow){
        try {
            $countDocItems = new DocumentItem();
           $docItemsLength = $countDocItems->countDocItems($req);
           $getMainHistory = "";
           $getMainHistory = $this->myAllRows($req, $myUnitRow);

           $getMainHistoryRowIDs = array();
           foreach ($getMainHistory as $mainHistoryRow) {
            $getDocApproved = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->where("pko_documents.approveComandlal", "=", 1)
            ->get();

            if (count($getDocApproved) == $docItemsLength){
                array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
            }

        }
        return $this->getWhereIn($getMainHistoryRowIDs, $myUnitRow);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function myDeclinedRows($req, $myUnitRow){
        try {
            $countDocItems = new DocumentItem();
           $docItemsLength = $countDocItems->countDocItems($req);
           $getMainHistory = "";
           $getMainHistory = $this->myAllRows($req, $myUnitRow);

           $getMainHistoryRowIDs = array();
           foreach ($getMainHistory as $mainHistoryRow) {
            $getDocDeclined = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->where("pko_documents.approveComandlal", "=", 2)
            ->get();

            if (count($getDocDeclined) > 0 ){
                array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
            }

        }
        return $this->getWhereIn($getMainHistoryRowIDs, $myUnitRow);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }


    public function getWhereIn($pushIDs, $myUnitRow){
        try {
            $getMainHistory = DB::table("pko_main_history")
                ->whereIn("pko_main_history.id", $pushIDs)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use ($myUnitRow){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                })
                ->join("pko_missions", function($query){
                    $query->on("pko_documents.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_documents.eeljID", "=", "pko_mission_eelj.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName", "all_users.rd", "all_users.image", "tb_ranks.shortRank", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->get();

            return $getMainHistory;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    //ТӨЛӨВ gesen selectees hamaarch undsen table uurchlugduj haragdah heseg end duusna



}
