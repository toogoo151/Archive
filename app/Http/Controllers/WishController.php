<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Wish;
use App\Models\all_users;
use App\Models\ForeignPass;
use App\Models\MainHistory;
use App\Models\YearWish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WishController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getWish(Request $req){
        try {

            if(Auth::user()->user_type === "superAdmin"){
                $getWishes = DB::table("pko_wish")
                ->where("pko_wish.missionID", "=", $req->_missionID)
                ->where("pko_wish.eeljID", "=", $req->_eeljID)
                ->where("pko_wish.insideApprove", "=", $req->_approve)
                ->join("pko_users", "pko_users.id", "=", "pko_wish.pkoUserID")
                ->join("all_users", function($query) use ($req){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if($req->_comandlalID != ""){
                        $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                    }

                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=",  $req->_unitID);
                    }
                })
                ->join("pko_missions", "pko_missions.id", "=", "pko_wish.missionID")
                ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_wish.eeljID")
                ->select("pko_wish.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "all_users.firstName", "all_users.lastName")
                ->get();
                return $getWishes;
            }
            if(Auth::user()->user_type === "comandlalAdmin"){
                $getWishes = DB::table("pko_wish")
                ->where("pko_wish.missionID", "=", $req->_missionID)
                ->where("pko_wish.eeljID", "=", $req->_eeljID)
                ->where("pko_wish.insideApprove", "=", $req->_approve)
                ->join("pko_users", "pko_users.id", "=", "pko_wish.pkoUserID")
                ->join("all_users", function($query)use ($req){
                    $myComandlalRow = new all_users;
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                    if($req->_unitID != ""){
                        $query->where("all_users.unitID", "=",  $req->_unitID);
                    }
                })
                ->join("pko_missions", "pko_missions.id", "=", "pko_wish.missionID")
                ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_wish.eeljID")
                ->select("pko_wish.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "all_users.firstName", "all_users.lastName")
                ->get();
                return $getWishes;
            }

            if(Auth::user()->user_type === "unitAdmin"){
                 $getWishes = DB::table("pko_wish")
                 ->where("pko_wish.missionID", "=", $req->_missionID)
                 ->where("pko_wish.eeljID", "=", $req->_eeljID)
                ->where("pko_wish.insideApprove", "=", $req->_approve)
                ->join("pko_users", "pko_users.id", "=", "pko_wish.pkoUserID")
                ->join("all_users", function($query){
                    $myUnitRow = new all_users;
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                })
                ->join("pko_missions", "pko_missions.id", "=", "pko_wish.missionID")
                ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_wish.eeljID")
                ->select("pko_wish.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "all_users.firstName", "all_users.lastName", "all_users.foreignFinishDate")
                ->get();

                $getApprove = DB::table("pko_wish")
                    ->where("pko_wish.missionID", "=", $req->_missionID)
                    ->where("pko_wish.eeljID", "=", $req->_eeljID)
                    ->where("pko_wish.insideApprove", "=", 1)
                    ->join("pko_users", "pko_users.id", "=", "pko_wish.pkoUserID")
                    ->join("all_users", function($query){
                    $myUnitRow = new all_users;
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    })
                    ->select("pko_wish.id")
                    ->get();

                $row = array(
                    "getWishes"=>$getWishes,
                    "getWishApproveCount" => count($getApprove),
                );
                return $row;

            }






        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Хүсэлтүүдийг татаж чадсангүй."
                ), 500
            );
        }
    }

    public function editWish(Request $req){
        try {
            $edit = Wish::find($req->id);
            $edit->insideApprove = $req->insideApprove;
            $edit->declineDescription = $req->declineDescription;
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

    public function getMyForeignPass($req){
        try {
            $myForeignPassFinishDate = new ForeignPass;
            $myForeignLenght = $myForeignPassFinishDate->getFinishDate($req);
            return $myForeignLenght->foreignFinishDate;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function unitUsersPushToHistory(Request $req){
        try {

             $getWishes = DB::table("pko_wish")
                 ->where("pko_wish.missionID", "=", $req->_missionID)
                 ->where("pko_wish.eeljID", "=", $req->_eeljID)
                ->where("pko_wish.insideApprove", "=", $req->_approve)
                ->join("pko_users", "pko_users.id", "=", "pko_wish.pkoUserID")
                ->join("all_users", function($query)use($req){
                    $myUnitRow = new all_users;

                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);

                    $query->where("all_users.foreignFinishDate", ">=", $this->getMyForeignPass($req));
                })
                ->join("pko_missions", "pko_missions.id", "=", "pko_wish.missionID")
                ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_wish.eeljID")
                ->select("pko_wish.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "all_users.firstName")
                ->get();

                $getWishesErsBaga = DB::table("pko_wish")
                 ->where("pko_wish.missionID", "=", $req->_missionID)
                 ->where("pko_wish.eeljID", "=", $req->_eeljID)
                ->where("pko_wish.insideApprove", "=", $req->_approve)
                ->join("pko_users", "pko_users.id", "=", "pko_wish.pkoUserID")
                ->join("all_users", function($query)use($req){
                    $myUnitRow = new all_users;
                    $query->on("pko_users.allUsersID", "=", "all_users.id")
                    ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    $query->where("all_users.foreignFinishDate", "<=", $this->getMyForeignPass($req));
                })
                ->join("pko_missions", "pko_missions.id", "=", "pko_wish.missionID")
                ->join("pko_mission_eelj", "pko_mission_eelj.id", "=", "pko_wish.eeljID")
                ->select("pko_wish.*", "pko_missions.missionName", "pko_mission_eelj.eeljName", "all_users.firstName")
                ->count();

                foreach ($getWishes as $getWish) {


                    $store = new MainHistory;
                    $store->pkoUserID = $getWish->pkoUserID;
                    $store->missionID = $getWish->missionID;
                    $store->eeljID = $getWish->eeljID;
                    $store->save();

                    $updateWish = Wish::find($getWish->id);
                    $updateWish->insideApprove = 3;
                    $updateWish->save();
                }


                if($getWishesErsBaga > 0){
                    return response(
                        array(
                            "status" => "success",
                            "msg" =>  "$getWishesErsBaga ЦАХ-ийн гадаад паспортын хугацаа шаардлага хангахгүй байна."
                        ), 200
                    );
                }else{
                    return response(
                        array(
                            "status" => "success",
                            "msg" => "Амжилттай баталгаажлаа."
                        ), 200
                    );
                }


        } catch (\Throwable $th) {
            return response(
                    array(
                        "status" => "error",
                        "msg" => "Баталгаажуулах боломжгүй байна."
                    ), 500
                );
        }
    }

    public function grapicWishes(Request $req){
        try {

            $covots = DB::table("pko_covot_comandlal")
            ->where("pko_covot_comandlal.missionID", "=", $req->_missionID)
            ->where("pko_covot_comandlal.eeljID", "=", $req->_eeljID)
            ->join("tb_comandlal", "tb_comandlal.id", "=", "pko_covot_comandlal.comandlalID")
            ->select( "tb_comandlal.comandlalShortName as name","pko_covot_comandlal.covotComandlalSum as data")
            ->get();

            $covotsArray = array();
            $covotSum = 0;
            foreach ($covots as $covot) {
                $covotSum = $covotSum + $covot->data;
                $row = array(
                "name" => [$covot->name],
                "data" => [$covot->data],
               );
               array_push($covotsArray, $row);
            }

            $wishes = DB::table("pko_wish")
            ->where("pko_wish.missionID", "=", $req->_missionID)
            ->where("pko_wish.eeljID", "=", $req->_eeljID)
            // ->where("pko_wish.insideApprove", "=", )
            ->join("pko_users", function($query){
                $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_comandlal", function($query){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
            })
            // ->select('tb_comandlal.comandlalShortName', DB::raw('COUNT(pko_wish.id) as followers'))
            ->groupBy("tb_comandlal.comandlalShortName", "tb_comandlal.id")
            ->select("tb_comandlal.comandlalShortName", "tb_comandlal.id")
            ->orderBy("tb_comandlal.id", "DESC")
            ->get();
            // return $wishes;

            $wishArray = array();
            $wishPosibleArray = array();
            $wishUnPosibleArray = array();
            $wishNotResolvedArray = array();
            foreach ($wishes as $wish) {
               $row = array(
                "name" => [$wish->comandlalShortName],
                "data" => [$this->whishesCount($wish,$req)],
               );
               $posibleRow = array(
                "name" => [$wish->comandlalShortName],
                "data" => [$this->whishesPosibleCount($wish,$req)],
               );
               $unPosibleRow = array(
                "name" => [$wish->comandlalShortName],
                "data" => [$this->whishesUnPosibleCount($wish,$req)],
               );
               $notResolvedRow = array(
                "name" => [$wish->comandlalShortName],
                "data" => [$this->whishesNotResolvedCount($wish,$req)],
               );
               array_push($wishArray, $row);
               array_push($wishPosibleArray, $posibleRow);
               array_push($wishUnPosibleArray, $unPosibleRow);
               array_push($wishNotResolvedArray, $notResolvedRow);
            }
            // return $wishArray;
            $row = array();
            $row1 = array(
                "name"=>"Командлалд олгогдсон квот",
                "data"=> $covotsArray,
            );
            $row2 = array(
                "name"=>"Хүсэлт өгсөн ЦАХ",
                "data"=> $wishArray,
            );
            $row3 = array(
                "name"=>"ЭДА оролцох боломжтой ЦАХ",
                "data"=> $wishPosibleArray,
            );
            $row4 = array(
                "name"=>"Хүсэлт нь шийдвэрлэгдээгүй ЦАХ",
                "data"=> $wishNotResolvedArray,
            );
            $row5 = array(
                "name"=>"ЭДА оролцох боломжгүй ЦАХ",
                "data"=> $wishUnPosibleArray,
            );
            $row6 = array(
                "name"=>"Нийт ЦАХ-ийн тоон үзүүлэлт || Квот",
                "data"=> array(

                    array(
                    "name" => ["Хүсэлт өгсөн ЦАХ"],
                    "data" => [$this->whishesCount("",$req)],
                    ),
                    array(
                    "name" => ["Шийдвэрлээгүй"],
                    "data" => [$this->whishesNotResolvedCount("",$req)],
                    ),
                    array(
                    "name" => ["Боломжтой"],
                    "data" => [$this->whishesPosibleCount("",$req)],
                    ),
                    array(
                    "name" => ["Боломжгүй"],
                    "data" => [$this->whishesUnPosibleCount("",$req)],
                    ),
                    array(
                    "name" => ["Квот"],
                    "data" => [$covotSum],
                    ),
                )
            );

            array_push($row, $row1, $row2, $row3, $row4, $row5, $row6 );
            return $row;
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function whishesCount($wishComandlals,$req){
        $wishes = DB::table("pko_wish")
            ->where("pko_wish.missionID", "=", $req->_missionID)
            ->where("pko_wish.eeljID", "=", $req->_eeljID)
            ->join("pko_users", function($query){
                $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_comandlal", function($query)use($wishComandlals){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                if($wishComandlals != ""){
                    $query->where("all_users.comandlalID", "=", $wishComandlals->id);
                }

            })
            ->select("tb_comandlal.comandlalShortName", "tb_comandlal.id")
            ->get();
            return count($wishes);
    }
    public function whishesPosibleCount($wishComandlals,$req){

        $wishes = DB::table("pko_wish")
        // $wishes = Wish::whereIn("insideApprove", "=", [1,3,4])
            ->Where(function($query)use($req){
                $query->where([["missionID", "=", $req->_missionID],["eeljID", "=", $req->_eeljID]])
                ->whereIn("insideApprove", [1,3,4]);// боломжтой
            })
            ->join("pko_users", function($query){
                $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_comandlal", function($query)use($wishComandlals){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                if($wishComandlals != ""){
                    $query->where("all_users.comandlalID", "=", $wishComandlals->id);
                }

            })
            ->select("tb_comandlal.comandlalShortName", "tb_comandlal.id")
            ->get();

            return count($wishes);
    }
    public function whishesUnPosibleCount($wishComandlals,$req){
        $wishes = DB::table("pko_wish")
            ->where("pko_wish.missionID", "=", $req->_missionID)
            ->where("pko_wish.eeljID", "=", $req->_eeljID)
            ->where("pko_wish.insideApprove", "=", 2) // боломжгүй
            ->join("pko_users", function($query){
                $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_comandlal", function($query)use($wishComandlals){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                if($wishComandlals != ""){
                    $query->where("all_users.comandlalID", "=", $wishComandlals->id);
                }

            })
            ->select("tb_comandlal.comandlalShortName", "tb_comandlal.id")
            ->get();

            return count($wishes);
    }
    public function whishesNotResolvedCount($wishComandlals,$req){
        $wishes = DB::table("pko_wish")
            ->where("pko_wish.missionID", "=", $req->_missionID)
            ->where("pko_wish.eeljID", "=", $req->_eeljID)
            ->where("pko_wish.insideApprove", "=", 0) // шийдвэрлээгүй
            ->join("pko_users", function($query){
                $query->on("pko_wish.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_comandlal", function($query)use($wishComandlals){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                if($wishComandlals != ""){
                    $query->where("all_users.comandlalID", "=", $wishComandlals->id);
                }

            })
            ->select("tb_comandlal.comandlalShortName", "tb_comandlal.id")
            ->get();

            return count($wishes);
    }

    public function newYear(Request $req){
        try {
            $insertYear = new YearWish();
            $insertYear->year = $req->year;
            $insertYear->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай нэмлээ"
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function editYear(Request $req){
        try {
            $edit = YearWish::find($req->id);
            $edit->year = $req->year;
            $edit->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа"
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function deleteYear(Request $req){
        try {
            $delete = YearWish::find($req->id);
            $delete->delete();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай устгалаа"
                ), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function getYearWish(Request $req){
        try {
            $countWishYear = DB::table("pko_date")
            ->join("pko_year", function($query){
                $query->on("pko_date.yearID", "=", "pko_year.id");
            })
            ->select( "pko_year.year as years")
            ->groupBy("years")
            ->orderBy("years", "DESC")
            ->get();


            $countWishCom = DB::table("pko_date")
            ->join("pko_users", function($query){
                $query->on("pko_date.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_comandlal", function($query){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
            })
            ->select("tb_comandlal.comandlalShortName", "tb_comandlal.id")
            ->groupBy("tb_comandlal.comandlalShortName", "tb_comandlal.id")
            ->orderBy("tb_comandlal.id", "ASC")
            ->get();

            $countWishUnit = DB::table("pko_date")
            ->join("pko_users", function($query){
                $query->on("pko_date.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_unit", function($query){
                $query->on("all_users.unitID", "=", "tb_unit.id");
            })
            ->select("tb_unit.unitShortName", "tb_unit.id")
            ->groupBy("tb_unit.unitShortName", "tb_unit.id")
            ->orderBy("tb_unit.id", "ASC")
            ->get();

            $yearWishArray = array();
            foreach ($countWishCom as $wishCom){
                $row = array(
                    "name" => [$wishCom->comandlalShortName],
                    "data" => [$this->countWish($wishCom,$req)],
                );
                array_push($yearWishArray, $row);
            }
            if($req->_comandlalID != ""){
                foreach ($countWishUnit as $wishUnit){
                    $row = array(
                        "name" => [$wishUnit->unitShortName],
                        "data" => [$this->countWishUnit($wishUnit,$req)],
                    );
                    array_push($yearWishArray, $row);
                }
            }

            $row = array();
            $row1 = array(
                "name"=>"Он",
                "data"=> $countWishYear,
            );
            $row2 = array(
                "name"=>"Хүсэлт өгсөн ЦАХ",
                "data"=> $yearWishArray,
            );
            array_push($row, $row1, $row2);
            return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }

    public function countWish($wishCom,$req){
        $wishes = DB::table("pko_date")
        ->join("pko_users", function($query){
            $query->on("pko_date.pkoUserID", "=", "pko_users.id");
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
        ->join("tb_comandlal", function($query)use($wishCom){
            $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
            if($wishCom != ""){
                $query->where("all_users.comandlalID", "=", $wishCom->id);
            }

        })
        ->select("tb_comandlal.comandlalShortName", "tb_comandlal.id")
        ->get();
        return count($wishes);
    }

    public function countWishUnit($wishUnit,$req){
        $wishes = DB::table("pko_date")
        ->join("pko_users", function($query){
            $query->on("pko_date.pkoUserID", "=", "pko_users.id");
        })
        ->join("all_users", function($query)use($req){
            $query->on("pko_users.allUsersID", "=", "all_users.id")
                ->where("all_users.comandlalID", "=", $req->_comandlalID);
                if($req->_unitID != ""){
                    $query->where("all_users.unitID", "=", $req->_unitID);
                }
        })
        ->join("tb_unit", function($query)use($wishUnit){
            $query->on("all_users.unitID", "=", "tb_unit.id");
            if($wishUnit != ""){
                $query->where("all_users.unitID", "=", $wishUnit->id);
            }

        })
        ->select("tb_unit.unitShortName", "tb_unit.id")
        ->get();
        return count($wishes);
    }

    public function testshuuu(Request $req){
        try {
            $countWishUnit = DB::table("pko_date")
            ->join("pko_users", function($query){
                $query->on("pko_date.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->join("tb_unit", function($query){
                $query->on("all_users.unitID", "=", "tb_unit.id");
            })
            ->select("tb_unit.unitShortName", "tb_unit.id")
            ->groupBy("tb_unit.unitShortName", "tb_unit.id")
            ->orderBy("tb_unit.id", "ASC")
            ->get();

            $yearWishArray = array();
            foreach ($countWishUnit as $wishUnit){
                $row = array(
                    "name" => [$wishUnit->unitShortName],
                    "data" => [5],
                );
                array_push($yearWishArray, $row);
            }
            $row = array();

            $row2 = array(
                "name"=>"Хүсэлт өгсөн ЦАХ",
                "data"=> $yearWishArray,
            );
            array_push($row, $row2);
            return $row;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ), 500
            );
        }
    }


}
