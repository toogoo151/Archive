<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MainHistory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HealthDepartment extends Model
{
    use HasFactory;
    protected $table = "pko_heltes_decline_description";
    public $timestamps = false;


    public function healthCorfirm($req){
        try {
            $insertHealthDepartment = MainHistory::find($req->id);
            $insertHealthDepartment->eruulMendHeltesApprove = 1;
            $insertHealthDepartment->save();
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

    public function checkID($req){
        $check = HealthDepartment::where("missionID", "=", $req->missionID)
        ->where("eeljID", "=", $req->eeljID)
        ->where("pkoMainHistoryID", "=", $req->pkoMainHistoryID)
        ->get();
        if(count($check) == 0)
            return true;
        else
            return false;
    }

    public function healthDecline($req){
        try {
            if(!$this->checkID($req)){
                return response(
                    array(
                        "msg" => "Аль хэдийн татгалзсан байна."
                    ), 500
                );
            }

            $insertHealthDepartment = MainHistory::find($req->pkoMainHistoryID);
            $insertHealthDepartment->eruulMendHeltesApprove = 2;
            $insertHealthDepartment->save();

            $insertHealthDes = new HealthDepartment();
            $insertHealthDes->missionID = $req->missionID;
            $insertHealthDes->eeljID = $req->eeljID;
            $insertHealthDes->pkoMainHistoryID = $req->pkoMainHistoryID;
            $insertHealthDes->heltesPdf = $req->heltesPdf;
            $insertHealthDes->heltesDescription = $req->heltesDescription;
            $insertHealthDes->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Татгалзлаа"
                ), 200);
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }

    public function getDepartmentTotal($req){
        try {

                $getDepartmentTotal = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=",$req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                // ->where("pko_main_history.isCrime", "=", 0)
                // ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.documentsMainApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }
                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }
                })
                ->select("pko_main_history.id")
                ->get();

                $getNotDone = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                // ->where("pko_main_history.isCrime", "=", 0)
                // ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.documentsMainApprove", "=", 1)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 0)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }
                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }
                })
                ->select("pko_main_history.id")
                ->get();

                $getApprove = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                // ->where("pko_main_history.isCrime", "=", 0)
                // ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.documentsMainApprove", "=", 1)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }
                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }
                })
                ->select("pko_main_history.id")
                ->get();

                $getDecline = DB::table('pko_main_history')
                ->where("pko_main_history.missionID", "=", $req->_missionID)
                ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                // ->where("pko_main_history.isCrime", "=", 0)
                // ->where("pko_main_history.isCanceled", "=", 0)
                ->where("pko_main_history.documentsMainApprove", "=", 1)
                ->where("pko_main_history.eruulMendHeltesApprove", "=", 2)
                ->join("pko_users", function($query){
                    $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function($query) use($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }
                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=", $req->_unitID);
                    }
                })
                ->select("pko_main_history.id")
                ->get();

                $row = array(
                        "total" => count($getDepartmentTotal),
                        "notDone" => count($getNotDone),
                        "approve" => count($getApprove),
                        "decline" => count($getDecline),
                    );
                    return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа",
                ), 500);
        }
    }
}
