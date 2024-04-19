<?php

namespace App\Models;

use App\Http\Controllers\SportController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OfficerMainHistory extends Model
{
    use HasFactory;
    protected $table = 'pko_officer_main';
    public $timestamps = true;

    public function getProcessCheck($req)
    {
        try {
            $getProcess = DB::table("pko_main_history")
                ->where("pko_main_history.missionID", "=",  $req->_missionID)
                ->where("pko_main_history.eeljID", "=",  $req->_eeljID)
                ->where("pko_main_history.pkoUserID", "=", Auth::user()->id)
                ->leftJoin("pko_documents", function ($query) {
                    $query->on("pko_documents.pkoMainHistoryID", "=", "pko_main_history.id");
                })
                ->leftJoin("pko_doc_description", function ($query) {
                    $query->on("pko_doc_description.pkoDocumentID", "=", "pko_documents.id");
                })
                ->leftJoin("pko_heltes_decline_description", function ($query) {
                    $query->on("pko_heltes_decline_description.pkoMainHistoryID", "=", "pko_main_history.id");
                })
                ->leftJoin("pko_health", function ($query) {
                    $query->on("pko_health.pkoMainHistoryID", "=", "pko_main_history.id");
                })
                ->select("pko_main_history.*", "pko_documents.id as pkoDocID", "pko_doc_description.docDescription", "pko_doc_description.id as pkoDocDescID", "pko_heltes_decline_description.id as pkoHeltesDescID", "pko_heltes_decline_description.heltesDescription", "pko_health.healthPdf")
                ->get();
            return $getProcess;
        } catch (\Throwable $th) {
            return $th;
            return response(
                array(
                    "status" => "error",
                    "msg" => "Тохиргоо татаж чадсангүй."
                ),
                500
            );
        }
    }




    public function getShalgaltUguuguiIDs($req) // changed
    {
        $getTomilogdooguiID = DB::table("pko_officer_main")
            ->where("pko_officer_main.missionID", "=", $req->_missionID)
            ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
            ->join("pko_sport_changed", function ($query)use($req) {
                $query->on("pko_officer_main.id", "=", "pko_sport_changed.pkoMainHistoryID")
                    ->where("pko_sport_changed.missionID", "=", $req->_missionID)
                    ->where("pko_sport_changed.eeljID", "=", $req->_eeljID);
            })
            ->select("pko_sport_changed.pkoMainHistoryID")
            ->get();
        $array = array();
        foreach ($getTomilogdooguiID as $value) {
            array_push($array, $value->pkoMainHistoryID);
        }
        return $array;
    }

    public function getMainHistorys($req) // changed
    {
        try {
            if (Auth::user()->user_type == "superAdmin") {
                $getMainHistory = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where(function ($query) use ($req) {
                        if ($req->_documentsMainApprove != "") {
                            $query->where("pko_officer_main.documentsMainApprove", "=", $req->_documentsMainApprove);
                        }

                        if ($req->_healthApprove != "") {
                            $query->where("pko_officer_main.healthApprove", "=", $req->_healthApprove);
                        }
                        if ($req->_ALCPT != "") {
                            if($req->_ALCPT =="1"){
                                $query->where("pko_officer_main.alcpt_score", ">", 0);
                            }else{
                                $query->where("pko_officer_main.alcpt_score", "=", 0);
                            }

                        }
                        if ($req->_English4SkillsID != "") {
                            if($req->_English4SkillsID =="1"){
                                $query->where("pko_officer_main.languageScore", ">", 0);
                            }else{
                                $query->where("pko_officer_main.languageScore", "=", 0);
                            }

                        }
                        if ($req->_DriveID != "") {
                            $query->where("pko_officer_main.driverApprove", "=", $req->_DriveID);
                        }
                        if ($req->_MilitarySkillsID != "") {
                            if($req->_MilitarySkillsID =="1"){
                                $query->where("pko_officer_main.skillScore", ">", 0);
                            }else{
                                $query->where("pko_officer_main.skillScore", "=", 0);
                            }
                        }



                    })
                    ->join("pko_users", function ($query) {
                        $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if ($req->_unitID != "") {
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                        if ($req->_gender != "") {
                            $query->where("all_users.gender", "=", $req->_gender);
                        }
                    })

                    ->when($req->_sportScore === "notGiven", function ($query) use ($req) {
                        $query->whereNotIn("pko_officer_main.id", $this->getShalgaltUguuguiIDs($req));
                    })

                    ->join("pko_missions", function ($query) {
                        $query->on("pko_officer_main.missionID", "=", "pko_missions.id");
                    })
                    ->join("pko_mission_eelj", function ($query) {
                        $query->on("pko_officer_main.eeljID", "=", "pko_mission_eelj.id");
                    })
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_ranks", function ($query) {
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->when($req->_sportScore === "gived", function ($query)use($req) {
                        $query->join("pko_sport_changed", function ($query)use($req) {
                            $query->on("pko_officer_main.id", "=", "pko_sport_changed.pkoMainHistoryID")
                            ->where("pko_sport_changed.missionID", "=", $req->_missionID)
                            ->where("pko_sport_changed.eeljID", "=", $req->_eeljID);
                        });
                    })
                    ->select("pko_officer_main.*", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.age", "tb_gender.genderName", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                    ->orderBy("pko_officer_main.alcpt_score", "DESC")
                    // ->orderBy(function ($query) {
                    //     $query->select("sportType4")
                    //         ->from("pko_sport_changed")
                    //         ->whereColumn("pko_officer_main.id", "=", "pko_sport_changed.pkoMainHistoryID")
                    //         ->limit(1);
                    // }, "DESC")
                    ->get();

                return $getMainHistory;
            }


        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Үндсэн мэдээлэл татаж чадсангүй."
                ),
                500
            );
        }
    }







    public function getTsahSum($req)
    {
        try {
            if (Auth::user()->user_type === "superAdmin") {
                $getMainHistory = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where(function ($query) use ($req) {
                        if ($req->_documentsMainApprove != "") {
                            $query->where("pko_officer_main.documentsMainApprove", "=", $req->_documentsMainApprove);
                        }

                        if ($req->_healthApprove != "") {
                            $query->where("pko_officer_main.healthApprove", "=", $req->_healthApprove);
                        }
                        if ($req->_ALCPT != "") {
                            if($req->_ALCPT =="1"){
                                $query->where("pko_officer_main.alcpt_score", ">", 0);
                            }else{
                                $query->where("pko_officer_main.alcpt_score", "=", 0);
                            }

                        }
                        if ($req->_English4SkillsID != "") {
                            if($req->_English4SkillsID =="1"){
                                $query->where("pko_officer_main.languageScore", ">", 0);
                            }else{
                                $query->where("pko_officer_main.languageScore", "=", 0);
                            }

                        }
                        if ($req->_DriveID != "") {
                            $query->where("pko_officer_main.driverApprove", "=", $req->_DriveID);
                        }
                        if ($req->_MilitarySkillsID != "") {
                            if($req->_MilitarySkillsID =="1"){
                                $query->where("pko_officer_main.skillScore", ">", 0);
                            }else{
                                $query->where("pko_officer_main.skillScore", "=", 0);
                            }
                        }



                    })
                    ->join("pko_users", function ($query) {
                        $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id");
                        if ($req->_comandlalID != "") {
                            $query->where("all_users.comandlalID", "=", $req->_comandlalID);
                            if ($req->_unitID != "") {
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                        if ($req->_gender != "") {
                            $query->where("all_users.gender", "=", $req->_gender);
                        }
                    })

                    ->when($req->_sportScore === "notGiven", function ($query) use ($req) {
                        $query->whereNotIn("pko_officer_main.id", $this->getShalgaltUguuguiIDs($req));
                    })

                    ->join("pko_missions", function ($query) {
                        $query->on("pko_officer_main.missionID", "=", "pko_missions.id");
                    })
                    ->join("pko_mission_eelj", function ($query) {
                        $query->on("pko_officer_main.eeljID", "=", "pko_mission_eelj.id");
                    })
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_ranks", function ($query) {
                        $query->on("all_users.rankID", "=", "tb_ranks.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->when($req->_sportScore === "gived", function ($query)use($req) {
                        $query->join("pko_sport_changed", function ($query)use($req) {
                            $query->on("pko_officer_main.id", "=", "pko_sport_changed.pkoMainHistoryID")
                            ->where("pko_sport_changed.missionID", "=", $req->_missionID)
                            ->where("pko_sport_changed.eeljID", "=", $req->_eeljID);
                        });
                    })
                    ->select("pko_officer_main.*", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.age", "tb_gender.genderName", "tb_ranks.shortRank", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
                    ->orderBy("pko_officer_main.sportScore", "DESC")
                    ->orderBy(function ($query) {
                        $query->select("sportType4")
                            ->from("pko_sport_changed")
                            ->whereColumn("pko_officer_main.id", "=", "pko_sport_changed.pkoMainHistoryID")
                            ->limit(1);
                    }, "DESC")
                    ->get();

                $getAllTotal = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                    })

                    ->get();
                    // pko_officer_main
                $getMaleTotal = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                    })
                    ->join(
                        "all_users",
                        function ($query) {
                            $query->on("pko_users.allUsersID", "=", "all_users.id")->where("all_users.gender", "=", 11);
                        }
                    )
                    ->select("pko_officer_main.id")
                    ->get();

                $getFemaleTotal = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_officer_main.pkoUserID", "=", "pko_users.id");
                    })
                    ->join(
                        "all_users",
                        function ($query) {
                            $query->on("pko_users.allUsersID", "=", "all_users.id")->where("all_users.gender", "=", 22);
                        }
                    )
                    ->select("pko_officer_main.id")
                    ->get();

                $getFlightTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->where("pko_main_history.isFlight", "=", 1)
                    ->get();

                $getDocTotal = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_main.documentsMainApprove", "=", 1)
                    ->get();

                $getALCPTTotal = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_main.alcpt_score", ">", 0)
                    ->get();

                $getHealthTotal = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->where("pko_officer_main.healthApprove", "=", 1)
                    ->get();

                $getSportTotal = DB::table("pko_officer_main")
                    ->where("pko_officer_main.missionID", "=", $req->_missionID)
                    ->where("pko_officer_main.eeljID", "=", $req->_eeljID)
                    ->join("pko_sport_changed", function ($query) use ($req) {
                        $query->on("pko_officer_main.id", "=", "pko_sport_changed.pkoMainHistoryID")
                        ->where("pko_sport_changed.missionID", "=", $req->_missionID)
                        ->where("pko_sport_changed.eeljID", "=", $req->_eeljID);
                    })
                    ->get();


                $row = array(
                    "sum" => count($getMainHistory),
                    "allTotal" => count($getAllTotal),
                    "maleTotal" => count($getMaleTotal),
                    "femaleTotal" => count($getFemaleTotal),
                    "flightTotal" => count($getFlightTotal),
                    "docTotal" => count($getDocTotal),
                    "ALCPTTotal" => count($getALCPTTotal),
                    "healthTotal" => count($getHealthTotal),
                    "sportTotal" => count($getSportTotal),
                );
                return $row;
            }

            if (Auth::user()->user_type === "comandlalAdmin") {
                $myComandlalRow = new all_users();
                $getMainHistory = DB::table('pko_main_history')
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->where(function ($query) use ($req) {
                        if ($req->_documentsMainApprove != "") {
                            $query->where("pko_main_history.documentsMainApprove", "=", $req->_documentsMainApprove);
                        }
                        if ($req->_eruulMendHeltesApprove != "") {
                            $query->where("pko_main_history.eruulMendHeltesApprove", "=", $req->_eruulMendHeltesApprove);
                        }
                        if ($req->_healthApprove != "") {
                            $query->where("pko_main_history.healthApprove", "=", $req->_healthApprove);
                        }
                        if ($req->_sportScore != "") {
                            $query->where("pko_main_history.sportScore", "=", 0);
                        }
                    })
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myComandlalRow, $req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                        if ($req->_gender != "") {
                            $query->where("all_users.gender", "=", $req->_gender);
                        }
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getAllTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myComandlalRow, $req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getMaleTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join(
                        "all_users",
                        function ($query) use ($myComandlalRow, $req) {
                            $query->on("pko_users.allUsersID", "=", "all_users.id")
                                ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id)
                                ->where("all_users.gender", "=", 11);
                            if ($req->_unitID != "") {
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                    )
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->select("pko_main_history.id")
                    ->get();

                $getFemaleTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join(
                        "all_users",
                        function ($query) use ($myComandlalRow, $req) {
                            $query->on("pko_users.allUsersID", "=", "all_users.id")
                                ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id)
                                ->where("all_users.gender", "=", 22);
                            if ($req->_unitID != "") {
                                $query->where("all_users.unitID", "=", $req->_unitID);
                            }
                        }
                    )
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->select("pko_main_history.id")
                    ->get();

                $getFlightTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->where("pko_main_history.isFlight", "=", 1)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myComandlalRow, $req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getDocTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.documentsMainApprove", "=", 1)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myComandlalRow, $req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getHeltesTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myComandlalRow, $req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getHealthTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.healthApprove", "=", 1)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myComandlalRow, $req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getSportTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.sportScore", ">", 0)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myComandlalRow, $req) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.comandlalID", "=", $myComandlalRow->getUserComandlal()->id);
                        if ($req->_unitID != "") {
                            $query->where("all_users.unitID", "=", $req->_unitID);
                        }
                    })
                    ->select("pko_main_history.id")
                    ->get();


                $row = array(
                    "sum" => count($getMainHistory),
                    "allTotal" => count($getAllTotal),
                    "maleTotal" => count($getMaleTotal),
                    "femaleTotal" => count($getFemaleTotal),
                    "flightTotal" => count($getFlightTotal),
                    "docTotal" => count($getDocTotal),
                    "heltesTotal" => count($getHeltesTotal),
                    "healthTotal" => count($getHealthTotal),
                    "sportTotal" => count($getSportTotal),
                );
                return $row;
            }


            if (Auth::user()->user_type === "unitAdmin") {
                $myUnitRow = new all_users();
                $getMainHistory = DB::table('pko_main_history')
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->where(function ($query) use ($req) {
                        if ($req->_documentsMainApprove != "") {
                            $query->where("pko_main_history.documentsMainApprove", "=", $req->_documentsMainApprove);
                        }
                        if ($req->_eruulMendHeltesApprove != "") {
                            $query->where("pko_main_history.eruulMendHeltesApprove", "=", $req->_eruulMendHeltesApprove);
                        }
                        if ($req->_healthApprove != "") {
                            $query->where("pko_main_history.healthApprove", "=", $req->_healthApprove);
                        }
                        if ($req->_sportScore != "") {
                            $query->where("pko_main_history.sportScore", "=", 0);
                        }
                    })
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myUnitRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getAllTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myUnitRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getMaleTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join(
                        "all_users",
                        function ($query) use ($myUnitRow) {
                            $query->on("pko_users.allUsersID", "=", "all_users.id")
                                ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id)
                                ->where("all_users.gender", "=", 11);
                        }
                    )
                    ->select("pko_main_history.id")
                    ->get();

                $getFemaleTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join(
                        "all_users",
                        function ($query) use ($myUnitRow) {
                            $query->on("pko_users.allUsersID", "=", "all_users.id")
                                ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id)
                                ->where("all_users.gender", "=", 22);
                        }
                    )
                    ->select("pko_main_history.id")
                    ->get();

                $getFlightTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->where("pko_main_history.isFlight", "=", 1)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myUnitRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getDocTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.documentsMainApprove", "=", 1)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myUnitRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getHeltesTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.eruulMendHeltesApprove", "=", 1)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myUnitRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getHealthTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.healthApprove", "=", 1)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myUnitRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    })
                    ->select("pko_main_history.id")
                    ->get();

                $getSportTotal = DB::table("pko_main_history")
                    ->where("pko_main_history.missionID", "=", $req->_missionID)
                    ->where("pko_main_history.eeljID", "=", $req->_eeljID)
                    ->where("pko_main_history.sportScore", ">", 0)
                    ->where("pko_main_history.isCrime", "=", 0)
                    ->where("pko_main_history.isCanceled", "=", 0)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
                    })
                    ->join("all_users", function ($query) use ($myUnitRow) {
                        $query->on("pko_users.allUsersID", "=", "all_users.id")
                            ->where("all_users.unitID", "=", $myUnitRow->getUserUnit()->id);
                    })
                    ->select("pko_main_history.id")
                    ->get();


                $row = array(
                    "sum" => count($getMainHistory),
                    "allTotal" => count($getAllTotal),
                    "maleTotal" => count($getMaleTotal),
                    "femaleTotal" => count($getFemaleTotal),
                    "flightTotal" => count($getFlightTotal),
                    "docTotal" => count($getDocTotal),
                    "heltesTotal" => count($getHeltesTotal),
                    "healthTotal" => count($getHealthTotal),
                    "sportTotal" => count($getSportTotal),
                );
                return $row;
            }
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
