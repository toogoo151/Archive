<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\BT_Unit;
use App\Models\all_users;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AllAdminController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getAllAdminsByTenServerSide(Request $req){
        try {

        $perPage = $req->get('per_page', 10); // Number of records per page
        $users = User::paginate($perPage);

        return response()->json($users);

        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }
    public function getAllAdmins(Request $req){
        try {
            $currentYear = now()->year;
        $ageCalculationSql = DB::raw("
            CASE
                WHEN SUBSTRING(all_users.rd, 3, 2) <= 99 AND SUBSTRING(all_users.rd, 3, 2) >= 20 THEN $currentYear - (1900 + CAST(SUBSTRING(all_users.rd, 3, 2) AS UNSIGNED))
                WHEN SUBSTRING(all_users.rd, 3, 2) < 20 THEN $currentYear - (2000 + CAST(SUBSTRING(all_users.rd, 3, 2) AS UNSIGNED))
            END as age
        ");
            if(Auth::user()->user_type === "superAdmin"){
                if($req->_seeAllUsers ==="2"){
                    $admins = DB::table("pko_users")
                ->where("pko_users.user_type", "=", "unitUser")
                // ->where("pko_users.email_verified_at", "=", null)
                ->join("pko_main_history", function($query)use($req){
                    $query->on("pko_users.id", "=", "pko_main_history.pkoUserID")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID);

                })
                ->join("all_users", function($query){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->leftJoin("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->leftJoin("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->leftJoin("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->select( "pko_users.id", "pko_users.email","pko_users.phone", "pko_users.user_type", "all_users.comandlalID", "all_users.unitID", "all_users.firstName","all_users.lastName", "all_users.rd","all_users.position", $ageCalculationSql, "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")
                ->orderBy("all_users.comandlalID", "ASC")
                ->orderBy("all_users.unitID", "ASC")
                ->orderBy("tb_ranks.id", "ASC")
                ->get();
                }
                if($req->_seeAllUsers ==="1"){
                    $admins = DB::table("pko_users")
                ->where("pko_users.user_type", "=", "unitUser")
                ->join("all_users", function($query){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->leftJoin("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->leftJoin("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->leftJoin("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->select( "pko_users.id", "pko_users.email","pko_users.phone", "pko_users.user_type", "all_users.comandlalID", "all_users.unitID", "all_users.firstName","all_users.lastName", "all_users.rd","all_users.position", $ageCalculationSql, "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")
                ->get();
                }


                return response(
                    array(
                        "countAllSystemUsers" => $this->countUsers(1,$req),
                        "countAllAdmins" => $this->countUsers(2,$req),
                        "countAllUnitUsers" => $this->countUsers(3,$req),
                        "countRequestedInThisMission" => $this->countUsers(4,$req),
                        "requestedInThisMissionData" => $admins,
                ), 200
                );
            }
            if(Auth::user()->user_type != "superAdmin"){
                if($req->_seeAllUsers ==="2"){
                    $comandlalsUsers = DB::table("pko_users")
                    ->where("pko_users.user_type", "=", "unitUser")
                    ->join("pko_main_history", function($query)use($req){
                        $query->on("pko_users.id", "=", "pko_main_history.pkoUserID")
                            ->where("pko_main_history.missionID", "=", $req->_missionID)
                            ->where("pko_main_history.eeljID", "=", $req->_eeljID);
                    })
                    ->join("all_users", function($query)use($req){
                        $getComandlalID = new all_users();

                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if(Auth::user()->user_type === "comandlalAdmin"){
                            if($req->_changeUsersType === "1" ){ // өөрийн командлалын хэрэглэгч нарыг харна
                                $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID())
                                ->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                            }
                            if($req->_changeUsersType === "2"){ // Харяа ангиудын хэрэглэгч нарыг харна
                                $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID())
                                ->where("all_users.unitID", "!=", $getComandlalID->getUnitlID());

                            }
                        }
                        if(Auth::user()->user_type === "unitAdmin"){
                            $query->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                        }

                    })
                    ->leftJoin("tb_comandlal", function($query){
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->leftJoin("tb_unit", function($query){
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->leftJoin("tb_ranks", function($query){
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->leftJoin("tb_gender", function($query){
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select( "pko_users.id", "pko_users.email","pko_users.phone", "pko_users.user_type", "all_users.comandlalID", "all_users.unitID", "all_users.firstName","all_users.lastName", "all_users.rd","all_users.position", $ageCalculationSql, "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank", "all_users.image","all_users.rankParentID","all_users.rankTypeID","all_users.rankID", "all_users.foreignPass", "all_users.foreignFinishDate")
                    ->get();
                    // ->select("pko_users.id", "pko_users.email", "pko_users.user_type", "all_users.image", "all_users.foreignPass", "all_users.foreignFinishDate", "pko_users.phone", "all_users.comandlalID", "all_users.unitID", "all_users.rankParentID", "all_users.rankTypeID", "all_users.rankID", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.age", "all_users.gender", "all_users.position", "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")->get();
                }
                if($req->_seeAllUsers ==="1"){
                    $comandlalsUsers = DB::table("pko_users")
                    ->where("pko_users.user_type", "=", "unitUser")
                    ->join("all_users", function($query)use($req){
                        $getComandlalID = new all_users();

                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if(Auth::user()->user_type === "comandlalAdmin"){
                            if($req->_changeUsersType === "1" ){ // өөрийн командлалын хэрэглэгч нарыг харна
                                $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID())
                                ->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                            }
                            if($req->_changeUsersType === "2"){ // Харяа ангиудын хэрэглэгч нарыг харна
                                $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID())
                                ->where("all_users.unitID", "!=", $getComandlalID->getUnitlID());

                            }
                        }
                        if(Auth::user()->user_type === "unitAdmin"){
                            $query->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                        }

                    })
                    ->leftJoin("tb_comandlal", function($query){
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->leftJoin("tb_unit", function($query){
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->leftJoin("tb_ranks", function($query){
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->leftJoin("tb_gender", function($query){
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select( "pko_users.id", "pko_users.email","pko_users.phone", "pko_users.user_type", "all_users.comandlalID", "all_users.unitID", "all_users.firstName","all_users.lastName", "all_users.rd","all_users.position", $ageCalculationSql, "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank", "all_users.image","all_users.rankParentID","all_users.rankTypeID","all_users.rankID","all_users.gender","all_users.foreignPass", "all_users.foreignFinishDate")
                    ->get();
                }



                return response(
                    array(
                        "countAllSystemUsers" => $this->countUsers(1,$req),
                        "countAllAdmins" => $this->countUsers(2,$req),
                        "countAllUnitUsers" => $this->countUsers(3,$req),
                        "countRequestedInThisMission" => $this->countUsers(4,$req),
                        "requestedInThisMissionData" => $comandlalsUsers,
                ), 200
                );
            }
            if(Auth::user()->user_type === "batalionAdmin"){
                $admins = DB::table("pko_users")
                ->where("pko_users.user_type", "=", "unitUser")
                ->join("pko_wish", function($query){
                    $query->on("pko_users.id", "=", "pko_wish.pkoUserID");
                })
                ->join("all_users", function($query){
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->leftJoin("tb_comandlal", function($query){
                    $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                })
                ->leftJoin("tb_unit", function($query){
                    $query->on("all_users.unitID", "=", "tb_unit.id");
                })
                ->leftJoin("tb_ranks", function($query){
                    $query->on("all_users.rankID", "=", "tb_ranks.id");
                })
                ->leftJoin("tb_gender", function($query){
                    $query->on("all_users.gender", "=", "tb_gender.id");
                })
                ->select( "pko_users.id", "pko_users.email","pko_users.phone", "pko_users.user_type", "all_users.comandlalID", "all_users.unitID", "all_users.firstName","all_users.lastName", "all_users.rd","all_users.position", $ageCalculationSql, "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")
                ->get();
                return  $admins;
            }

        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }

    public function countUsers($countKind, $req){
        if($countKind ==1){
            $allSysytemUsers = DB::table("pko_users")
                ->select( "pko_users.id")
                ->join("all_users", function($query){
                    $getComandlalID = new all_users();
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if(Auth::user()->user_type != "superAdmin"){
                        if(Auth::user()->user_type === "comandlalAdmin"){
                            $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID());
                        }
                        if(Auth::user()->user_type === "unitAdmin"){
                            $query->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                        }
                    }


                })
                ->count();
            return  $allSysytemUsers;
        }
        if($countKind ==2){
            $allAdmins = DB::table("pko_users")
                ->where("pko_users.email_verified_at", "!=", null) // идвэхтэй админууд
                ->where("pko_users.user_type", "!=", "unitUser")
                ->join("all_users", function($query){
                    $getComandlalID = new all_users();
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if(Auth::user()->user_type != "superAdmin"){
                        if(Auth::user()->user_type === "comandlalAdmin"){
                            $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID());
                        }
                        if(Auth::user()->user_type === "unitAdmin"){
                            $query->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                        }
                    }


                })
                ->select( "pko_users.id")
                ->count();
            return  $allAdmins;
        }
        if($countKind ==3){
            $allUnitUsers = DB::table("pko_users")
                ->where("pko_users.user_type", "=", "unitUser")
                ->join("all_users", function($query)use($req){
                    $getComandlalID = new all_users();
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if(Auth::user()->user_type != "superAdmin"){
                        if(Auth::user()->user_type === "comandlalAdmin"){
                            if($req->_changeUsersType === "2"){
                                $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID())
                                ->where("all_users.unitID", "!=", $getComandlalID->getUnitlID());
                            }
                            if($req->_changeUsersType === "1"){
                                $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID())
                                ->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                            }
                        }
                        if(Auth::user()->user_type === "unitAdmin"){
                            $query->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                        }
                    }


                })
                ->select( "pko_users.id")
                ->count();
            return  $allUnitUsers;
        }
        if($countKind ==4){
            $requestedInThisMision = DB::table("pko_users")
                ->where("pko_users.user_type", "=", "unitUser")
                ->join("pko_main_history", function($query)use($req){
                    $query->on("pko_users.id", "=", "pko_main_history.pkoUserID")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID);
                })
                ->join("all_users", function($query)use($req){
                    $getComandlalID = new all_users();
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                    if(Auth::user()->user_type != "superAdmin"){
                        if(Auth::user()->user_type === "comandlalAdmin"){
                            if($req->_changeUsersType === "2"){
                                $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID())
                                ->where("all_users.unitID", "!=", $getComandlalID->getUnitlID());
                            }
                            if($req->_changeUsersType === "1"){
                                $query->where("all_users.comandlalID", "=", $getComandlalID->getComandlalID())
                                ->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                            }
                        }
                        if(Auth::user()->user_type === "unitAdmin"){
                            $query->where("all_users.unitID", "=", $getComandlalID->getUnitlID());
                        }
                    }


                })

                ->select( "pko_users.id")
                ->count();
            return  $requestedInThisMision;
        }

    }


    public function angiruuShiljuuleh(Request $req){
        try {
             $user =  User::find($req->id);
            // $user->user_type = $req->userTypeOld;
            // $user->save();

            $all_user = all_users::find($user->allUsersID);
            $all_user->comandlalID = $req->comandlal;
            $all_user->unitID = $req->unit;
            $all_user->dundiinTulv = 0;
            $all_user->save();
            return response(
                array("msg" => "Амжилттай шилжүүллээ"), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getDundiinTuluv(){
        try {
            $admins = DB::table("pko_users")
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id")
                ->where("all_users.dundiinTulv", "=", 1);
            })
            ->leftJoin("tb_ranks", function($query){
                $query->on("all_users.rankID", "=", "tb_ranks.id");
            })
            ->leftJoin("tb_gender", function($query){
                $query->on("all_users.gender", "=", "tb_gender.id");
            })
            ->select("pko_users.id", "pko_users.email","pko_users.phone",  "all_users.rankParentID", "all_users.rankTypeID", "all_users.rankID", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.gender", "all_users.position",  "tb_gender.genderName",  "tb_ranks.shortRank", "all_users.dundiinTulv")->get();
            return $admins;
        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }

    public function userErhZasah(Request $req){
        try {
             $user =  User::find($req->id);
            $user->user_type = $req->userTypeOld;
            $user->save();

            $all_user = all_users::find($user->allUsersID);
            $all_user->comandlalID = $req->comandlal;
            $all_user->unitID = $req->unit;
            $all_user->save();
            return response(
                array("msg" => "Амжилттай заслаа"), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getComandlalUser(){
        try {
            $admins = DB::table("pko_users")
            ->where( function($query){

                    $myUnit = new all_users;
                    $myUnitFirstRow = $myUnit->getUserUnit();

                    $query->where("pko_users.user_type", "=", "unitUser")
                    ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                    ->where("all_users.unitID", "=", $myUnitFirstRow->id);

            })
            ->join("all_users", function($query){
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->leftJoin("tb_comandlal", function($query){
                $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
            })
            ->leftJoin("tb_unit", function($query){
                $query->on("all_users.unitID", "=", "tb_unit.id");
            })
            ->leftJoin("tb_ranks", function($query){
                $query->on("all_users.rankID", "=", "tb_ranks.id");
            })
            ->leftJoin("tb_gender", function($query){
                $query->on("all_users.gender", "=", "tb_gender.id");
            })
            ->select("pko_users.id", "pko_users.email","pko_users.phone", "all_users.comandlalID", "all_users.unitID", "all_users.rankParentID", "all_users.rankTypeID", "all_users.rankID", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.gender", "all_users.position", "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")->get();
            return $admins;
        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }
}
