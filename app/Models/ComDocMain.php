<?php

namespace App\Models;

use GuzzleHttp\Psr7\Request;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ComDocMain extends Model
{
    use HasFactory;
    protected $table = 'pko_main_history';
    public $timestamps = true;

    public function getComHistorys($req){
        try {
            if(Auth::user()->user_type == "gsmafAdmin"){
                $getMainHistory = $this->CountDoc($req);
                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->where(function($query)use($req){
                    if($req->_documentsMainApprove != ""){
                        $query->where("pko_main_history.documentsMainApprove", "=", $req->_documentsMainApprove);
                    }
                     if($req->_eruulMendHeltesApprove != ""){
                     $query->where("pko_main_history.eruulMendHeltesApprove", "=", $req->_eruulMendHeltesApprove);
                    }

                    if($req->_healthApprove != ""){
                     $query->where("pko_main_history.healthApprove", "=", $req->_healthApprove);
                    }

                       if($req->_sportScore != ""){
                     $query->where("pko_main_history.sportScore", "=", $req->_sportScore);
                    }
                })


                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query)use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                     }
                    }


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
                ->select("pko_main_history.*", "all_users.firstName","all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName")
                ->get();
            return $getMainHistory;
            }
            if(Auth::user()->user_type == "comandlalAdmin"){
                $myComandlalRow = new all_users();

                $getMainHistory = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use ($myComandlalRow, $req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }

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
                ->select("pko_main_history.*", "all_users.firstName", "all_users.rd", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName")
                ->get();
            return $getMainHistory;
            }
            if(Auth::user()->user_type == "unitAdmin"){
                $myUnitRow = new all_users();

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
                 ->join("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->join("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->join("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->select("pko_main_history.*", "all_users.firstName", "all_users.rd", "tb_ranks.rank",  "tb_comandlal.comandlalShortName", "tb_unit.unitShortName")
                ->get();
            return $getMainHistory;
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Үндсэн мэдээлэл татаж чадсангүй."
                ), 500
            );
    }}


    public function getTsahSum($req){
        try {

            if(Auth::user()->user_type === "superAdmin"){

                $getMainHistory = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=",$req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->select("pko_main_history.id")
                ->groupBy('pko_main_history.id')
                ->get();
                $row = array(
                    "sum" => count($getMainHistory),
                );
                // $row = count($getMainHistory);


                    return $row;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    public function getChildDocuments($req){
        try{
             if(Auth::user()->user_type == "comandlalAdmin"){
                $getMainHistory = $this->CountDoc($req);
                $getMainDocuments = DB::table("pko_documents")
                ->where("pko_documents.missionID", "=", $req->_missionID)
                ->where("pko_documents.eeljID", "=", $req->_eeljID)
                ->where("pko_documents.pkoMainHistoryID", "=", $req->_pkoMainHistoryID)

                // ->join("pko_users", function($query){
                //     $query->on("pko_documents.pkoUserID", "=", "pko_users.id");
                // })
                // ->join("all_users", function($query) use ($myComandlalRow, $req){
                //     $query->on("pko_users.allUsersID", "=", "all_users.id")
                //     ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                //     if($req->_unitID != ""){
                //         $query->where("all_users.unitID", "=", $req->_unitID);
                //     }

                // })
                ->join("pko_main_history", function($query){
                    $query->on("pko_documents.pkoMainHistoryID", "=", "pko_main_history.id");
                })
                    ->join("pko_document_items", function($query){
                    $query->on("pko_documents.documentItemID", "=", "pko_document_items.id");
                })
                ->select("pko_documents.*", "pko_document_items.documentName")
                // ->select("pko_documents.*", "pko_document_items.documentName", "pko_main_history.*")
                ->get();
            return $getMainDocuments;
            }
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Үндсэн мэдээлэл татаж чадсангүй."
                ), 500
            );
    }

        }

    public function CountDoc ($req){
        try {
            if(Auth::user()->user_type === "comandlalAdmin" && "gsmafAdmin"){
                $getCount = DB::table('pko_document_items')
                ->where("pko_main_history.missionID", "=",$req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                ->select("pko_document_items.id")
                ->groupBy('pko_document_items.id')
                ->get();
                $row = array(
                    "sum" => count($getCount),
                );
                // $row = count($getMainHistory);


                    return $row;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }





    }

//     public function CheckChild(Request $req){
//         try
//         {
//             if(Auth::user()->user_type === "comandlalAdmin" ){
//                 $getChildCheck = DB::table('pko_document_items')
//                 ->where("pko_document_items.missionID", "=",$req->_missionID)
//                 ->where("pko_document_items.eeljID", "=", $req->_eeljID)
//                 ->select("pko_document_items.id")
//                 ->groupBy('pko_document_items.id')
//                 ->get();
//                 $row = array(
//                     "sum" => count($getChildCheck),
//                 );s
//                 $row = count($getChildCheck);
//         }
//     }
// }








