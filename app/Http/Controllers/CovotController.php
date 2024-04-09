<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ComandlalCovot;
use App\Models\UnitCovot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CovotController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    //Comandlald covot olgoh insert edit delete start

    public function checkComandlal($comandlalID){
        $comandlalCheck = ComandlalCovot::where("comandlalID", "=", $comandlalID)->get();
        if(count($comandlalCheck) == 0)
            return true;
        else
            return false;
    }

    public function newComandlalCovot(Request $req){
    try {
        if(!$this->checkComandlal($req->comandlalID)){
            return response(
                array(
                    "msg" => "Командлалд квот олгогдсон байна."
                ), 500
            );
        }
        $insertComCovot = new ComandlalCovot();
        $insertComCovot->missionID = $req->missionID;
        $insertComCovot->eeljID = $req->eeljID;
        $insertComCovot->comandlalID = $req->comandlalID;
        $insertComCovot->covotOppitser = $req->covotOppitser;
        $insertComCovot->covotAhlagch = $req->covotAhlagch;
        $insertComCovot->covotGereet = $req->covotGereet;
        $insertComCovot->covotComandlalSum = $req->covotComandlalSum;
        $insertComCovot->covotDescription = $req->covotDescription;
        $insertComCovot->save();
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

   public function editComandlalCovot(Request $req){
    try {
        $edit = ComandlalCovot::find($req->id);
        $edit->missionID = $req->missionID;
        $edit->eeljID = $req->eeljID;
        $edit->comandlalID = $req->comandlalID;
        $edit->covotOppitser = $req->covotOppitser;
        $edit->covotAhlagch = $req->covotAhlagch;
        $edit->covotGereet = $req->covotGereet;
        $edit->covotComandlalSum = $req->covotComandlalSum;
        $edit->covotDescription = $req->covotDescription;
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

   public function deleteComandlalCovot(Request $req){
    try {
        $delete = ComandlalCovot::find($req->id);
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
   //Comandlald covot olgoh insert edit delete end

   //Angid covot olgoh insert edit delete start
   public function newUnitCovot(Request $req){
    try {
         if(!$this->checkUnitCovot($req->missionID, $req->eeljID, $req->unitID)){
                return response(
                    array(
                        "msg" => "Ангид квот олгогдсон байна."
                    ), 500
                );
            }
        $insertUnitCovot = new UnitCovot();
        $insertUnitCovot->missionID = $req->missionID;
        $insertUnitCovot->eeljID = $req->eeljID;
        $insertUnitCovot->comandlalID = $req->comandlalID;
        $insertUnitCovot->unitID = $req->unitID;
        $insertUnitCovot->covotOppitser = $req->covotOppitser;
        $insertUnitCovot->covotAhlagch = $req->covotAhlagch;
        $insertUnitCovot->covotGereet = $req->covotGereet;
        $insertUnitCovot->covotUnitSum = $req->covotUnitSum;
        $insertUnitCovot->covotDescription = $req->covotDescription;
        $insertUnitCovot->save();
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

   public function editUnitCovot(Request $req){
    try {
        $edit = UnitCovot::find($req->id);
        $edit->missionID = $req->missionID;
        $edit->eeljID = $req->eeljID;
        $edit->comandlalID = $req->comandlalID;
        $edit->unitID = $req->unitID;
        $edit->covotOppitser = $req->covotOppitser;
        $edit->covotAhlagch = $req->covotAhlagch;
        $edit->covotGereet = $req->covotGereet;
        $edit->covotUnitSum = $req->covotUnitSum;
        $edit->covotDescription = $req->covotDescription;
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

   public function deleteUnitCovot(Request $req){
    try {
        $delete = UnitCovot::find($req->id);
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
   //Angid covot olgoh insert edit delete end

   //Neg angid dawhardaj covot olgohoos sergiilne start
   public function checkUnitCovot($missionID, $eeljID, $unitID){
        $user = DB::table("pko_covot_unit")
        ->where("unitID", "=", $unitID)
        ->where("missionID", "=", $missionID)
        ->where("eeljID", "=", $eeljID)->get();
        if(count($user) == 0)
            return true;
        else
            return false;
    }
   //Neg angid dawhardaj covot olgohoos sergiilne end
}
