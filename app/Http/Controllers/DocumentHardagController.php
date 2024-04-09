<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\all_users;
use App\Models\Document;
use App\Models\DocumentDescription;
use App\Models\DocumentItem;
use App\Models\MainHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocumentHardagController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function confirm (Request $req){
        try {
            $insertlist = Document::find($req->id);
            $insertlist->approveComandlal = 1;
            $insertlist->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Зөвшөөрлөө"
                ), 200);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }

    }

    public function getDocumentComandlal($req, $myComandlalRow){
        try {

                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use ($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }
                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }

                })
                ->join("pko_missions", function($query){
                    $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                })
                ->join("pko_mission_eelj", function($query){
                    $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
                })
                ->join("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->join("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->join("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->select("pko_main_history.*","all_users.lastName", "all_users.firstName", "all_users.rd", "all_users.age", "tb_gender.genderName", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                ->get();
            return $getMainHistory;



        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }

    public function getDocumentHardagSuper(Request $req) {
        try {
            $countDocItems = new DocumentItem();
            $docItemsLength = $countDocItems->countDocItems($req);


            $myComandlalRow = new all_users();
            $getMainHistory = "";
            if($req->_allState == "complete"){
                $getMainHistory = $this->myCompleteRows($req, $myComandlalRow);
            }
            if($req->_allState == "notDone"){
                $getMainHistory = $this->myNotDoneRows($req, $myComandlalRow);
            }
            if($req->_allState == "approved"){
                $getMainHistory = $this->myApprovedRows($req, $myComandlalRow);
            }
            if($req->_allState == "declined"){
                $getMainHistory = $this->myDeclinedRows($req, $myComandlalRow);
            }

                $countDocItemsBuren = 0;
                $countDocItemsHiigdeegui = 0;
                $countDocItemsComandlalApproved = 0;
                $countDocItemsComandlalDecline = 0;

                foreach ($this->getDocumentComandlal($req, $myComandlalRow) as $mainHistoryRow) {
                    $getCompletes = DB::table("pko_documents")
                    ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                    ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                    ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                    // ->join("pko_main_history", function($query){
                    //     $query->on("pko_documents.pkoMainHistoryID", "=", "pko_main_history.id")
                    //     ->where("pko_main_history.isCrime", "=", 0)
                    //     ->where("pko_main_history.isCanceled", "=", 0);
                    // })
                    ->where("pko_documents.approveComandlal", "=", 1)
                    ->get();

                    $getNotDone = DB::table("pko_documents")
                    ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                    ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                    ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                    ->where("pko_documents.approveComandlal", "=", 1) // notDone
                    ->where("pko_documents.approveGsmaf", "=", 0) // notDone
                    ->get();

                    $getDocApproved = DB::table("pko_documents")
                    ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                    ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                    ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                    ->where("pko_documents.approveComandlal", "=", 1) // approved
                    ->where("pko_documents.approveGsmaf", "=", 1) // approved
                    ->get();

                    $getDocDeclined = DB::table("pko_documents")
                    ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                    ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                    ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                    ->where("pko_documents.approveComandlal", "=", 1) // decline
                    ->where("pko_documents.approveGsmaf", "=", 2) // decline
                    ->get();
                    if(count($getCompletes) == $docItemsLength){
                        $countDocItemsBuren ++;
                    }
                    if(count($getCompletes) == $docItemsLength){
                        if(count($getNotDone) == $docItemsLength || count($getNotDone) > 0){
                            $countDocItemsHiigdeegui ++;
                        }
                    }
                    if(count($getCompletes) == $docItemsLength){
                        if(count($getDocApproved) == $docItemsLength ){
                            $countDocItemsComandlalApproved ++;
                        }
                    }
                    if(count($getCompletes) == $docItemsLength){
                        if(count($getDocDeclined) == $docItemsLength || count($getDocDeclined) > 0 ){
                            $countDocItemsComandlalDecline ++;
                        }
                    }



            }


            $row = array(
                "getMainHistory" => $getMainHistory,
                "complete" => $countDocItemsBuren,
                "notDone" => $countDocItemsHiigdeegui,
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


    public function myCompleteRows($req, $myComandlalRow){

        try {
            $countDocItems = new DocumentItem();
            $docItemsLength = $countDocItems->countDocItems($req);
            $getMainHistory = "";
            $getMainHistory = $this->getDocumentComandlal($req, $myComandlalRow);

            $getMainHistoryRowIDs = array();


                foreach ($getMainHistory as $mainHistoryRow) {
                    $getCompletes = DB::table("pko_documents")
                    ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                    ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                    ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                    ->where("pko_documents.approveComandlal", "=", 1)
                    ->get();

                    if (count($getCompletes) == $docItemsLength){
                        array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
                    }
                }
                    return $this->getWhereIn($getMainHistoryRowIDs, $myComandlalRow, $req);

        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }
    public function myNotDoneRows($req, $myComandlalRow){

        try {

            $countDocItems = new DocumentItem();
            $docItemsLength = $countDocItems->countDocItems($req);
            $getMainHistory = "";
            $getMainHistory = $this->getDocumentComandlal($req, $myComandlalRow);

            $getMainHistoryRowIDs = array();

            foreach ($getMainHistory as $mainHistoryRow) {
                $getCompletes = DB::table("pko_documents")
                ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                ->where("pko_documents.approveComandlal", "=", 1)
                ->get();

                $getNotDone = DB::table("pko_documents")
                ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
                ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
                ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
                ->where("pko_documents.approveComandlal", "=", 1)
                ->where("pko_documents.approveGsmaf", "=", 0)
                ->get();
                if(count($getCompletes) == $docItemsLength){
                    if(count($getNotDone) == $docItemsLength || count($getNotDone) > 0){
                        array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
                    }
                }
            }


        return $this->getWhereIn($getMainHistoryRowIDs, $myComandlalRow, $req);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }



    public function myApprovedRows($req, $myComandlalRow){
        try {
            $countDocItems = new DocumentItem();
           $docItemsLength = $countDocItems->countDocItems($req);
           $getMainHistory = "";
           $getMainHistory = $this->getDocumentComandlal($req, $myComandlalRow);

           $getMainHistoryRowIDs = array();

           foreach ($getMainHistory as $mainHistoryRow) {
            $getCompletes = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->where("pko_documents.approveComandlal", "=", 1)
            ->get();

            $getDocApproved = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->where("pko_documents.approveComandlal", "=", 1)
            ->where("pko_documents.approveGsmaf", "=", 1)
            ->get();

            if(count($getCompletes) == $docItemsLength){
                if (count($getDocApproved) == $docItemsLength){
                    array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
                }
            }


        }

        return $this->getWhereIn($getMainHistoryRowIDs, $myComandlalRow, $req);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function myDeclinedRows($req, $myComandlalRow){
        try {
            $countDocItems = new DocumentItem();
           $docItemsLength = $countDocItems->countDocItems($req);
           $getMainHistory = "";
           $getMainHistory = $this->getDocumentComandlal($req, $myComandlalRow);

           $getMainHistoryRowIDs = array();

           foreach ($getMainHistory as $mainHistoryRow) {
            $getCompletes = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->where("pko_documents.approveComandlal", "=", 1)
            ->get();

            $getDocDeclined = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $mainHistoryRow->missionID)
            ->where("pko_documents.eeljID", "=", $mainHistoryRow->eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $mainHistoryRow->id)
            ->where("pko_documents.approveComandlal", "=", 1)
            ->where("pko_documents.approveGsmaf", "=", 2)
            ->get();

            if(count($getCompletes) == $docItemsLength){
                if (count($getDocDeclined) == $docItemsLength || count($getDocDeclined) > 0 ){
                    array_push($getMainHistoryRowIDs, $mainHistoryRow->id);
                }
            }


        }

        return $this->getWhereIn($getMainHistoryRowIDs, $myComandlalRow, $req);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getWhereIn($pushIDs, $myComandlalRow, $req){
        try {

                $getMainHistory = DB::table("pko_main_history")
                    ->whereIn("pko_main_history.id", $pushIDs)
                    ->join("pko_users", function($query){
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function($query) use ($req){
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if($req->_comandlalID != ""){
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        }
                        if($req->_unitID != ""){
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->join("pko_missions", function($query){
                        $query->on("pko_main_history.missionID", "=", "pko_missions.id");
                    })
                    ->join("pko_mission_eelj", function($query){
                        $query->on("pko_main_history.eeljID", "=", "pko_mission_eelj.id");
                    })
                    ->join("tb_comandlal", function($query){
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function($query){
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_ranks", function($query){
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->join("tb_gender", function($query){
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_main_history.*", "all_users.lastName", "all_users.firstName","all_users.rd", "all_users.age", "tb_gender.genderName", "tb_ranks.shortRank", "tb_unit.unitShortName", "tb_comandlal.comandlalShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
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




    public function getDocumentHardagChild(Request $req){
        try {
            $getDocComChild = DB::table("pko_documents")
            ->where("pko_documents.missionID", "=", $req->_missionID)
            ->where("pko_documents.eeljID", "=", $req->_eeljID)
            ->where("pko_documents.pkoMainHistoryID", "=", $req->_rowID)
            ->join("pko_missions", function($query){
                $query->on("pko_documents.missionID", "=", "pko_missions.id");
            })
            ->join("pko_mission_eelj", function($query){
                $query->on("pko_documents.eeljID", "=", "pko_mission_eelj.id");
            })
            ->join("pko_document_items", "pko_document_items.id", "=", "pko_documents.documentItemID")
            ->select("pko_documents.*", "pko_document_items.documentName", "pko_document_items.documentShaardlaga", "pko_missions.missionName", "pko_mission_eelj.eeljName")
            ->get();
            return $getDocComChild;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }


}
