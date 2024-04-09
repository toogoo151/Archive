<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OfficerWish extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_wish';
    public $timestamps = false;


    public function getWishTotalInfo($req)
    {
        try {
            if (Auth::user()->user_type == "superAdmin") {
                $getWishDetails = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where(function ($query) use ($req) {
                        if ($req->_wishState != "") {
                            $query->where("pko_wish.insideApprove", "=", $req->_wishState);
                        }
                    })
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        }
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->join("pko_missions", function ($query) {
                        $query->on("pko_wish.missionID", "=", "pko_missions.id");
                    })
                    ->join("pko_mission_eelj", function ($query) {
                        $query->on("pko_wish.eeljID", "=", "pko_mission_eelj.id");
                    })
                    ->leftJoin("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->leftJoin("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_ranks", function ($query) {
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->select("pko_wish.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.lastName", "all_users.firstName", "all_users.position", "tb_ranks.shortRank")
                    // ->select("pko_wish.id")
                    ->get();

                $getTotal = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        }
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $getNotResolved = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        }
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $getPossible = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 1)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        }
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $getInpossible = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 2)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        }
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();
                if ($req->_comandlalID != "") {
                    $getTotalCovot = DB::table("pko_covot_comandlal")
                        ->where("pko_covot_comandlal.missionID", "=", $req->_missionID)
                        ->where("pko_covot_comandlal.eeljID", "=", $req->_eeljID)
                        ->where("pko_covot_comandlal.comandlalID", "=", $req->_comandlalID)
                        ->select(DB::raw("sum(covotComandlalSum) as totalCovot"))
                        ->first();
                } else {
                    $getTotalCovot = DB::table("pko_covot_comandlal")
                        ->where("pko_covot_comandlal.missionID", "=", $req->_missionID)
                        ->where("pko_covot_comandlal.eeljID", "=", $req->_eeljID)
                        ->select(DB::raw("sum(covotComandlalSum) as totalCovot"))
                        ->first();
                }

                if ($req->_unitID != "") {
                    $getTotalCovotUnit = DB::table("pko_covot_unit")
                        ->where("pko_covot_unit.missionID", "=", $req->_missionID)
                        ->where("pko_covot_unit.eeljID", "=", $req->_eeljID)
                        ->where("pko_covot_unit.comandlalID", "=", $req->_comandlalID)
                        ->where("pko_covot_unit.unitID", "=", $req->_unitID)
                        ->select(DB::raw("sum(covotUnitSum) as totalCovot"))
                        ->first();
                } else {
                    $getTotalCovotUnit = DB::table("pko_covot_unit")
                        ->where("pko_covot_unit.missionID", "=", $req->_missionID)
                        ->where("pko_covot_unit.eeljID", "=", $req->_eeljID)
                        ->select(DB::raw("sum(covotUnitSum) as totalCovot"))
                        ->first();
                }



                $getConfirmed = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 3)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        }
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $getReserved = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 4)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                        }
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $row = array(
                    "totalRequest" => count($getTotal),
                    "notResolved" => count($getNotResolved),
                    "possible" => count($getPossible) + count($getConfirmed) + count($getReserved),
                    "inpossible" => count($getInpossible),
                    "totalCovot" => $getTotalCovot->totalCovot,
                    "totalCovotUnit" => $getTotalCovotUnit->totalCovot,
                    "confirmed" => count($getConfirmed),
                    "reserved" => count($getReserved),
                    "balance" => $getTotalCovot->totalCovot - count($getConfirmed),
                    "balanceUnit" => $getTotalCovotUnit->totalCovot - count($getConfirmed),
                    "getWishDetails" => $getWishDetails,
                );
                return $row;
            }

            //Командлалын админ
            if (Auth::user()->user_type == "comandlalAdmin") {

                $myComandlalRow = new all_users;
                $getWishDetails = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where(function ($query) use ($req) {
                        if ($req->_wishState != "") {
                            $query->where("pko_wish.insideApprove", "=", $req->_wishState);
                        }
                    })
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req, $myComandlalRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->join("pko_missions", function ($query) {
                        $query->on("pko_wish.missionID", "=", "pko_missions.id");
                    })
                    ->join("pko_mission_eelj", function ($query) {
                        $query->on("pko_wish.eeljID", "=", "pko_mission_eelj.id");
                    })
                    ->leftJoin("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->leftJoin("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_ranks", function ($query) {
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->select("pko_wish.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.lastName", "all_users.firstName", "all_users.position", "tb_ranks.shortRank")
                    // ->select("pko_wish.id")
                    ->get();

                $getTotal = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req, $myComandlalRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $getNotResolved = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req, $myComandlalRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $getPossible = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 1)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req, $myComandlalRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $getInpossible = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 2)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req, $myComandlalRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();


                $getTotalCovot = DB::table("pko_covot_comandlal")
                    ->where("pko_covot_comandlal.missionID", "=", $req->_missionID)
                    ->where("pko_covot_comandlal.eeljID", "=", $req->_eeljID)
                    ->where("pko_covot_comandlal.comandlalID", "=", $myComandlalRow->getUserComandlal()->id)
                    ->select(DB::raw("sum(covotComandlalSum) as totalCovot"))
                    ->first();


                if ($req->_unitID != "") {
                    $getTotalCovotUnit = DB::table("pko_covot_unit")
                        ->where("pko_covot_unit.missionID", "=", $req->_missionID)
                        ->where("pko_covot_unit.eeljID", "=", $req->_eeljID)
                        ->where("pko_covot_unit.comandlalID", "=", $myComandlalRow->getUserComandlal()->id)
                        ->where("pko_covot_unit.unitID", "=", $req->_unitID)
                        ->select(DB::raw("sum(covotUnitSum) as totalCovot"))
                        ->first();
                } else {
                    $getTotalCovotUnit = DB::table("pko_covot_unit")
                        ->where("pko_covot_unit.missionID", "=", $req->_missionID)
                        ->where("pko_covot_unit.eeljID", "=", $req->_eeljID)
                        ->where("pko_covot_unit.comandlalID", "=", $myComandlalRow->getUserComandlal()->id)
                        ->select(DB::raw("sum(covotUnitSum) as totalCovot"))
                        ->first();
                }

                $getConfirmed = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 3)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req, $myComandlalRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $getReserved = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 4)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req, $myComandlalRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_wish.id")
                    ->get();

                $row = array(
                    "totalRequest" => count($getTotal),
                    "notResolved" => count($getNotResolved),
                    "possible" => count($getPossible) + count($getConfirmed) + count($getReserved),
                    "inpossible" => count($getInpossible),
                    "totalCovot" => $getTotalCovot->totalCovot,
                    "totalCovotUnit" => $getTotalCovotUnit->totalCovot,
                    "confirmed" => count($getConfirmed),
                    "reserved" => count($getReserved),
                    "balance" => $getTotalCovot->totalCovot - count($getConfirmed),
                    "balanceUnit" => $getTotalCovotUnit->totalCovot - count($getConfirmed),
                    "getWishDetails" => $getWishDetails,
                );
                return $row;
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }
}






