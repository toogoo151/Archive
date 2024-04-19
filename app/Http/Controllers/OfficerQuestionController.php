<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\all_users;
use App\Models\MainHistory;
use App\Models\UserQuestion;
use App\Models\OfficerQuestion;



use App\Models\UserQuestionHistory;
use App\Models\UserRequirements;
use App\Models\Wish;
use App\Models\PkoMainUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

use function PHPUnit\Framework\returnSelf;

class OfficerQuestionController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getOfficerQuestionCheck()
    {
        try {
            $check = DB::table("pko_officer_question")
                ->where("pko_officer_question.pkoUserID", "=", Auth::user()->id)
                ->get();
            return count($check);
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

    public function testssss()
    {
        try {
            $newQuestion = new UserQuestion();
            $newQuestion->appointedDate = "2014-02-01";
            $newQuestion->rolePlayed = 0;
            $newQuestion->missionType = 0;
            $newQuestion->missionCameDate = "2020-03-15";
            $newQuestion->studying = 1;
            $newQuestion->punishment = 0;
            $newQuestion->punishmentDate = "2019-03-15";


            // $newQuestion->save();

            $dateNow = Carbon::now();
            $dateAppointed = Carbon::parse($newQuestion->appointedDate);

            $formatAppointedYear = $dateAppointed->format('Y');
            $formatAppointedMonth = $dateAppointed->format('m');

            $subtractedAppointedDate = $dateNow->subYears($formatAppointedYear)->subMonths($formatAppointedMonth);

            $resultAppointedYear = $subtractedAppointedDate->format('y');
            $resultAppointedMonth = $subtractedAppointedDate->format('m');
            $appointed = $resultAppointedYear * 12 + $resultAppointedMonth;


            if ($newQuestion->rolePlayed == 0) {
                $dateNow1 = Carbon::now();
                $dateCame = Carbon::parse($newQuestion->missionCameDate);

                $formatCameYear = $dateCame->format('Y');
                $formatCameMonth = $dateCame->format('m');

                $subtractedCameDate = $dateNow1->subYears($formatCameYear)->subMonths($formatCameMonth);

                $resultCameYear = $subtractedCameDate->format('y');
                $resultCameMonth = $subtractedCameDate->format('m');
                $cameDate = $resultCameYear * 12 + $resultCameMonth;
            }

            if ($newQuestion->punishment == 0) {
                $dateNow2 = Carbon::now();
                $datePunishment = Carbon::parse($newQuestion->punishmentDate);

                $formatPunishmentYear = $datePunishment->format('Y');
                $formatPunishmentMonth = $datePunishment->format('m');

                $subtractedPunishmentDate = $dateNow2->subYears($formatPunishmentYear)->subMonths($formatPunishmentMonth);

                $resultPunishmentYear = $subtractedPunishmentDate->format('y');
                $resultPunishmentMonth = $subtractedPunishmentDate->format('m');
                $punishmentDate = $resultPunishmentYear * 12 + $resultPunishmentMonth;
            }



            $appointedCheck = DB::table("pko_user_requirements")
                ->where("pko_user_requirements.appointedDate", "<", $appointed)
                ->where(function ($query) use ($newQuestion, $cameDate) {
                    if ($newQuestion->rolePlayed == 0) {
                        if ($newQuestion->missionType == 0) {
                            $query->where("pko_user_requirements.missionTypeHalf", "<", $cameDate);
                        }
                        if ($newQuestion->missionType == 1) {
                            $query->where("pko_user_requirements.missionTypeFull", "<", $cameDate);
                        }
                    }
                })
                ->where(function ($query) use ($newQuestion) {
                    if ($newQuestion->studying == 1) {
                        $query->where("pko_user_requirements.studying", "=", 1);
                    } else {
                        $query->where("pko_user_requirements.studying", "=", 0);
                    }
                })
                ->where(function ($query) use ($newQuestion, $punishmentDate) {
                    if ($newQuestion->punishment == 0) {
                        $query->where("pko_user_requirements.punishmentDate", "<", $punishmentDate);
                    }
                })
                ->select("pko_user_requirements.id")
                ->get();


            return count($appointedCheck);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    // public function checkQuestion($newQuestion)
    // {
    //     try {
    //         $dateNow = Carbon::now();
    //         $startedDate = Carbon::parse($newQuestion->startedDate);

    //         $formatAppointedYear = $startedDate->format('Y');
    //         $formatAppointedMonth = $startedDate->format('m');

    //         $subtractedstartedDate = $dateNow->subYears($formatAppointedYear)->subMonths($formatAppointedMonth);

    //         $resultAppointedYear = $subtractedstartedDate->format('y');
    //         $resultAppointedMonth = $subtractedstartedDate->format('m');
    //         $appointed = $resultAppointedYear * 12 + $resultAppointedMonth;

    //         if ($newQuestion->rolePlayed == 0) {
    //             $dateNow1 = Carbon::now();
    //             $dateCame = Carbon::parse($newQuestion->missionCameDate);

    //             $formatCameYear = $dateCame->format('Y');
    //             $formatCameMonth = $dateCame->format('m');

    //             $subtractedCameDate = $dateNow1->subYears($formatCameYear)->subMonths($formatCameMonth);

    //             $resultCameYear = $subtractedCameDate->format('y');
    //             $resultCameMonth = $subtractedCameDate->format('m');
    //             $cameDate = $resultCameYear * 12 + $resultCameMonth;
    //         }
    //         if ($newQuestion->rolePlayed == 0) {
    //                 $appointedCheck = DB::table("pko_officer_requirements")
    //                     ->where("pko_officer_requirements.startedDate", "<=", $appointed)
    //                     ->where(function ($query) use ($newQuestion, $cameDate) {
    //                         if ($newQuestion->rolePlayed == 0) {
    //                             if ($newQuestion->missionType == 0) {
    //                                 $query->where("pko_officer_requirements.missionTypeHalf", "<=", $cameDate);
    //                             }
    //                             if ($newQuestion->missionType == 1) {
    //                                 $query->where("pko_officer_requirements.missionTypeFull", "<=", $cameDate);
    //                             }
    //                         }
    //                     })
    //                     ->where(function ($query) use ($newQuestion) {
    //                         if ($newQuestion->coursed == 1) {
    //                             $query->where("pko_officer_requirements.coursed", "=", 1);
    //                         } else {
    //                             $query->where("pko_officer_requirements.coursed", "=", 0);
    //                         }
    //                     })
    //                     // ->where(function ($query) use ($newQuestion) {
    //                     //     if ($newQuestion->rankID == 6 || 7 ) {
    //                     // $query->where(function ($query) {
    //                     //     $query->where("pko_officer_requirements.rankID", "<=", 6)
    //                     //     ->orWhere("pko_officer_requirements.rankID", "<=", 7);
    //                     // });
    //                     //     }
    //                     // })
    //                     ->select("pko_officer_requirements.id")
    //                     ->get();
    //         }
    //         else
    //         {
    //             $appointedCheck = DB::table("pko_officer_requirements")
    //                 ->where("pko_officer_requirements.startedDate", "<=", $appointed)
    //                 ->where(function ($query) use ($newQuestion, $cameDate) {
    //                     if ($newQuestion->rolePlayed == 0) {
    //                         if ($newQuestion->missionType == 0) {
    //                             $query->where("pko_officer_requirements.missionTypeHalf", "<=", $cameDate);
    //                         }
    //                         if ($newQuestion->missionType == 1) {
    //                             $query->where("pko_officer_requirements.missionTypeFull", "<=", $cameDate);
    //                         }
    //                     }
    //                 })
    //                 ->where(function ($query) use ($newQuestion) {
    //                     if ($newQuestion->coursed == 1) {
    //                         $query->where("pko_officer_requirements.coursed", "=", 1);
    //                     } else {
    //                         $query->where("pko_officer_requirements.coursed", "=", 0);
    //                     }
    //                 })
    //                 // ->where(function ($query) use ($newQuestion) {
    //                 //     if ($newQuestion->rankID == 6 || 7 ) {
    //                 // $query->where(function ($query) {
    //                 //     $query->where("pko_officer_requirements.rankID", "<=", 6)
    //                 //     ->orWhere("pko_officer_requirements.rankID", "<=", 7);
    //                 // });
    //                 //     }
    //                 // })
    //                 ->select("pko_officer_requirements.id")
    //                 ->get();
    //         }
    //         return $appointedCheck;
    //     } catch (\Throwable $th) {
    //         return response(
    //             array(
    //                 "status" => "error",
    //                 "msg" => "Алдаа гарлаа."
    //             ),
    //             500
    //         );
    //     }
    // }
    public function checkQuestion($newQuestion)
    {
        try {
            $dateNow = Carbon::now();
            $startedDate = Carbon::parse($newQuestion->startedDate);

            $formatAppointedYear = $startedDate->format('Y');
            $formatAppointedMonth = $startedDate->format('m');

            $subtractedstartedDate = $dateNow->subYears($formatAppointedYear)->subMonths($formatAppointedMonth);

            $resultAppointedYear = $subtractedstartedDate->format('y');
            $resultAppointedMonth = $subtractedstartedDate->format('m');
            $appointed = $resultAppointedYear * 12 + $resultAppointedMonth;

            $appointedCheck = DB::table("pko_officer_requirements")
            ->where("pko_officer_requirements.startedDate", "<=", $appointed)
                ->where(function ($query) use ($newQuestion) {
                    $query->where("pko_officer_requirements.rolePlayed", "=", ($newQuestion->rolePlayed == 1) ? 1 : 0);
                })



            ->where(function ($query) use ($newQuestion) {
                if ($newQuestion->rolePlayed == 0) {
                    $dateNow1 = Carbon::now();
                    $dateCame = Carbon::parse($newQuestion->missionCameDate);

                    $formatCameYear = $dateCame->format('Y');
                    $formatCameMonth = $dateCame->format('m');

                    $subtractedCameDate = $dateNow1->subYears($formatCameYear)->subMonths($formatCameMonth);

                    $resultCameYear = $subtractedCameDate->format('y');
                    $resultCameMonth = $subtractedCameDate->format('m');
                    $cameDate = $resultCameYear * 12 + $resultCameMonth;

                    $query->where(function ($query) use ($newQuestion, $cameDate) {
                        if ($newQuestion->missionType == 0) {
                            $query->where("pko_officer_requirements.missionTypeHalf", "<=", $cameDate);
                        } elseif ($newQuestion->missionType == 1) {
                            $query->where("pko_officer_requirements.missionTypeFull", "<=", $cameDate);
                        }
                    });


                }

                $query->where(function ($query) use ($newQuestion) {
                    if ($newQuestion->coursed == 1) {
                        $query->where("pko_officer_requirements.coursed", "=", 1);
                    } else {
                        $query->where("pko_officer_requirements.coursed", "=", 0);
                    }
                });
                // $query->where(function ($query) use ($newQuestion) {
                //     if ($newQuestion->rankID === 6 || 7) {
                //         $query->where(function ($query) {
                //             $query->where("pko_officer_requirements.rankID", "=", 6)
                //             ->orWhere("pko_officer_requirements.rankID", "=", 7);
                //         });
                //     }
                // });
            })

                ->where(function ($query) use ($newQuestion) {
                    $query->where("pko_officer_requirements.rankID", "!=", ($newQuestion->rankID == 6 || $newQuestion->rankID == 7) ? 1 : 0);
                })

                // ->where("pko_officer_requirements.startedDate", "<=", $appointed)

                // ->where("pko_officer_requirements.rankID", "=>", $newQuestion->rankID)

            // ->where("pko_officer_requirements.rankID", "!=" , $newQuestion->rankID)

                ->select("pko_officer_requirements.id")
                ->get();

            return $appointedCheck;
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


    public function checkPkoOfficer($newQuestion)
    {
        try {
            $check = DB::table("pko_officer_question")
                ->where("pko_officer_question.pkoUserID", "=", $newQuestion->pkoUserID)
                ->get();
            return $check;
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


    public function checkUserID()
    {
        $check = OfficerQuestion::where("pkoUserID", "=", Auth::user()->id)->get();
        if (count($check) == 0)
            return true;
        else
            return false;
    }

    public function firstCheckOffQuestion()
    {
        try {
            $newQuestion = OfficerQuestion::where("pkoUserID", "=", Auth::user()->id)->count();
            if ($newQuestion > 0) {
                $newQuestionInto = OfficerQuestion::where("pkoUserID", "=", Auth::user()->id)
                    ->first();
                return response(
                    array(
                        "userCheck" => count($this->checkQuestion($newQuestionInto)),
                    ),
                    200
                );
            } else {
                return response(
                    array(
                        "userCheck" => $newQuestion,
                    ),
                    200
                );
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



    public function getRequirements()
    {
        try {
            $getRequirements = DB::table("pko_user_requirements")
                ->get();
            $appointedDate = DB::table("pko_user_requirements")
                ->first()->appointedDate;
            $missionTypeHalf = DB::table("pko_user_requirements")
                ->first()->missionTypeHalf;
            $missionTypeFull = DB::table("pko_user_requirements")
                ->first()->missionTypeFull;
            $punishmentDate = DB::table("pko_user_requirements")
                ->first()->punishmentDate;
            if (count($getRequirements) == 0) {
                $row = array(
                    "requirements" => count($getRequirements),
                );
            } else {
                $row = array(
                    "requirements" => count($getRequirements),
                    "appointedDate" => $appointedDate,
                    "half" => $missionTypeHalf,
                    "full" => $missionTypeFull,
                    "punishmentDate" => $punishmentDate,
                );
            }

            return $row;
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

    public function newRequirements(Request $req)
    {
        try {
            $newRequirements = new UserRequirements();
            $newRequirements->appointedDate = $req->appointedDate;
            $newRequirements->missionTypeHalf = $req->missionTypeHalf;
            $newRequirements->missionTypeFull = $req->missionTypeFull;
            $newRequirements->punishmentDate = $req->punishmentDate;
            $newRequirements->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай нэмлээ."
                ),
                200
            );
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

    public function getQuestionEdit(Request $req)
    {
        try {
            if ($req->_questionState == "") {
                $getQuestion = DB::table("pko_user_question")
                    ->where("pko_user_question.appointedDate", "<=", "2022-06-23")
                    ->where(function ($query) {
                        $query->where("pko_user_question.missionCameDate", "<=", "2021-06-23")
                            ->orWhereNull("pko_user_question.missionCameDate");
                    })
                    ->where(function ($query) {
                        $query->where("pko_user_question.punishmentDate", "<=", "2022-06-23")
                            ->orWhereNull("pko_user_question.punishmentDate");
                    })
                    ->where("pko_user_question.studying", "=", 1)
                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
            }
            if ($req->_questionState == "hiigdeegui") {
                $getQuestion = DB::table("pko_user_question")
                    ->where("pko_user_question.appointedDate", "<=", "2022-06-23")
                    ->where(function ($query) {
                        $query->where("pko_user_question.missionCameDate", "<=", "2021-06-23")
                            ->orWhereNull("pko_user_question.missionCameDate");
                    })
                    ->where(function ($query) {
                        $query->where("pko_user_question.punishmentDate", "<=", "2022-06-23")
                            ->orWhereNull("pko_user_question.punishmentDate");
                    })
                    ->where("pko_user_question.studying", "=", 1)
                    ->whereNull("pko_user_question.comandlalName")
                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
            }
            if ($req->_questionState == "hiigdsen") {
                $getQuestion = DB::table("pko_user_question")
                    ->where("pko_user_question.appointedDate", "<=", "2022-06-23")
                    ->where(function ($query) {
                        $query->where("pko_user_question.missionCameDate", "<=", "2021-06-23")
                            ->orWhereNull("pko_user_question.missionCameDate");
                    })
                    ->where(function ($query) {
                        $query->where("pko_user_question.punishmentDate", "<=", "2022-06-23")
                            ->orWhereNull("pko_user_question.punishmentDate");
                    })
                    ->where("pko_user_question.studying", "=", 1)
                    ->whereNotNull("pko_user_question.comandlalName")
                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
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


    public function getQuestionHangaagui(Request $req)
    {
        try {
            if ($req->_questionState == "") {
                $getQuestion = DB::table("pko_user_question")
                    ->where("pko_user_question.appointedDate", ">", "2022-06-23")
                    ->orWhere("pko_user_question.missionCameDate", ">", "2021-06-23")
                    ->orWhere("pko_user_question.punishmentDate", ">", "2022-06-23")
                    ->orWhere("pko_user_question.studying", "=", 0)

                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
            }
            if ($req->_questionState == "hiigdeegui") {
                $getQuestion = DB::table("pko_user_question")
                    ->where(function ($query) {
                        $query->where("pko_user_question.appointedDate", ">", "2022-06-23")
                            ->orWhere("pko_user_question.missionCameDate", ">", "2021-06-23")
                            ->orWhere("pko_user_question.punishmentDate", ">", "2022-06-23")
                            ->orWhere("pko_user_question.studying", "=", 0);
                    })
                    ->whereNull("pko_user_question.comandlalName")
                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
            }
            if ($req->_questionState == "hiigdsen") {
                $getQuestion = DB::table("pko_user_question")
                    ->where(function ($query) {
                        $query->where("pko_user_question.appointedDate", ">", "2022-06-23")
                            ->orWhere("pko_user_question.missionCameDate", ">", "2021-06-23")
                            ->orWhere("pko_user_question.punishmentDate", ">", "2022-06-23")
                            ->orWhere("pko_user_question.studying", "=", 0);
                    })
                    ->whereNotNull("pko_user_question.comandlalName")
                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
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



    public function editQuestion(Request $req)
    {
        try {
            $findID = $this->questionHistory($req);
            if ($findID != "") {
                $nowDate = Carbon::now()->format('Y-m-d H:i:s');
                $myComandlal = new all_users();
                $myComFirstRow = $myComandlal->getUserComandlal();
                $myName = $myComandlal->getUser();
                $myNameContent = $myName->getContent();
                $myNameArray = json_decode($myNameContent, true);
                $myRd = Auth::user()->allUsersID;
                $editorRD = DB::table("all_users")
                    ->where("all_users.id", "=", $myRd)
                    ->first();

                $editHistory = UserQuestionHistory::find($findID);
                $editHistory->appointedDateNew = $req->appointedDate;
                $editHistory->rolePlayedNew = $req->rolePlayed;
                $editHistory->missionTypeNew = 12;
                $editHistory->missionNameNew = $req->missionName;
                $editHistory->missionCameDateNew = $req->missionCameDate;
                $editHistory->studyingNew = $req->studying;
                $editHistory->punishmentNew = $req->punishment;
                $editHistory->punishmentDateNew = $req->punishmentDate;
                $editHistory->updated_at = $nowDate;
                $editHistory->editorComandlalName = $myComFirstRow->comandlalShortName;
                $editHistory->editorFirstName = $myNameArray['name'];
                $editHistory->editorRd = $editorRD->rd;
                $editHistory->editorPhone = $editorRD->phone;
                $editHistory->editorDes = $req->questionDes;
                $editHistory->save();

                $editQuestion = UserQuestion::find($req->id);
                $editQuestion->pkoUserID = $req->pkoUserID;
                $editQuestion->appointedDate = $req->appointedDate;
                $editQuestion->rolePlayed = $req->rolePlayed;
                $editQuestion->missionType = 12;
                $editQuestion->missionName = $req->missionName;
                $editQuestion->missionCameDate = $req->missionCameDate;
                $editQuestion->studying = $req->studying;
                $editQuestion->punishment = $req->punishment;
                $editQuestion->punishmentDate = $req->punishmentDate;
                $editQuestion->updated_at = $nowDate;
                $editQuestion->comandlalName = $myComFirstRow->comandlalShortName;
                $editQuestion->firstName = $myNameArray['name'];
                $editQuestion->questionDes = $req->questionDes;
                $editQuestion->save();

                //Асуумж засах үед шаардлага хангасан эсэхийг шалгаад хангасан тохиолдолд хүсэлтийг автоматаар нэмэх хэсэг
                $pushWish = count($this->checkQuestion($editQuestion));
                if ($pushWish == 1) {
                    if ($this->usercheck(
                        $editQuestion->pkoUserID,
                        1,
                        13
                    ) == "no") {
                        return response(
                            array(
                                "status" => "already",
                                "msg" => "Амжилттай заслаа, хүсэлт илгээсэн байна."
                            ),
                            200
                        );
                    }
                    $insertlist = new Wish();
                    $insertlist->pkoUserID = $editQuestion->pkoUserID;
                    $insertlist->missionID = 1;
                    $insertlist->eeljID = 13;
                    $insertlist->save();

                    $store = new MainHistory();
                    $store->pkoUserID = $insertlist->pkoUserID;
                    $store->missionID = $insertlist->missionID;
                    $store->eeljID = $insertlist->eeljID;
                    $store->save();
                } else {
                    return response(
                        array(
                            "status" => "error",
                            "msg" => "Амжилттай заслаа, гэхдээ шаардлага хангахгүй байна."
                        ),
                        200
                    );
                }
                //Асуумж засах үед шаардлага хангасан эсэхийг шалгаад хангасан тохиолдолд хүсэлтийг автоматаар нэмэх хэсэг

                return response(
                    array(
                        "status" => "success",
                        "msg" => "Амжилттай заслаа."
                    ),
                    200
                );
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

    public function usercheck($userID, $missionID, $eeljID)
    {
        $wish = DB::table('pko_wish')
            ->where('pkoUserID', '=', $userID)
            ->where('missionID', '=', $missionID)
            ->where('eeljID', '=', $eeljID)
            ->get();
        if (count($wish) == 0) {
            return "okey";
        } else {
            return "no";
        }
    }

    public function getQuestionAll(Request $req)
    {
        try {
            if ($req->_questionState == "") {
                $getQuestion = DB::table("pko_user_question")

                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
            }
            if ($req->_questionState == "hiigdeegui") {
                $getQuestion = DB::table("pko_user_question")

                    ->whereNull("pko_user_question.comandlalName")
                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
            }
            if ($req->_questionState == "hiigdsen") {
                $getQuestion = DB::table("pko_user_question")

                    ->whereNotNull("pko_user_question.comandlalName")
                    ->join("pko_users", function ($query) {
                        $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
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
                    ->join("tb_comandlal", function ($query) {
                        $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
                    })
                    ->join("tb_unit", function ($query) {
                        $query->on("all_users.unitID", "=", "tb_unit.id");
                    })
                    ->join("tb_gender", function ($query) {
                        $query->on("all_users.gender", "=", "tb_gender.id");
                    })
                    ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                    ->get();
                return $getQuestion;
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

    public function getQuestionTotal()
    {
        try {
            $getUser = DB::table("pko_users")
                ->where("pko_users.user_type", "=", "unitUser")
                ->get();

            $getAll = DB::table("pko_user_question")
                ->join("pko_users", function ($query) {
                    $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function ($query) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->get();

            $getHangasan = DB::table("pko_user_question")
                ->join("pko_users", function ($query) {
                    $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function ($query) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->where("pko_user_question.appointedDate", "<=", "2022-06-23")
                ->where(function ($query) {
                    $query->where("pko_user_question.missionCameDate", "<=", "2021-06-23")
                        ->orWhereNull("pko_user_question.missionCameDate");
                })
                ->where(function ($query) {
                    $query->where("pko_user_question.punishmentDate", "<=", "2022-06-23")
                        ->orWhereNull("pko_user_question.punishmentDate");
                })
                ->where("pko_user_question.studying", "=", 1)
                ->get();

            $getHangaagui = DB::table("pko_user_question")
                ->join("pko_users", function ($query) {
                    $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function ($query) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->where("pko_user_question.appointedDate", ">", "2022-06-23")
                ->orWhere("pko_user_question.missionCameDate", ">", "2021-06-23")
                ->orWhere("pko_user_question.punishmentDate", ">", "2022-06-23")
                ->orWhere("pko_user_question.studying", "=", 0)
                ->get();

            $row = array(
                "allUser" => count($getUser),
                "bugluugui" => count($getUser) - count($getAll),
                "allTotal" => count($getAll),
                "hangasan" => count($getHangasan),
                "hangaagui" => count($getHangaagui),
            );
            return $row;
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

    public function questionHistory($req)
    {
        try {
            $findOldValue = DB::table("pko_user_question")
                ->where("pko_user_question.id", "=", $req->id)
                ->first();
            $oldNew = new UserQuestionHistory();
            $oldNew->pkoUserQuestionID = $findOldValue->id;
            $oldNew->appointedDateOld = $findOldValue->appointedDate;
            $oldNew->rolePlayedOld = $findOldValue->rolePlayed;
            $oldNew->missionTypeOld = $findOldValue->missionType;
            $oldNew->missionNameOld = $findOldValue->missionName;
            $oldNew->missionCameDateOld = $findOldValue->missionCameDate;
            $oldNew->studyingOld = $findOldValue->studying;
            $oldNew->punishmentOld = $findOldValue->punishment;
            $oldNew->punishmentDateOld = $findOldValue->punishmentDate;
            $oldNew->save();
            return $oldNew->id;
            // return response(
            //     array(
            //         "status" => "success",
            //     ),200
            // );
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

    public function getOfficerWish()
    {
        try {
            $wish = DB::table("pko_officer_question")
            ->where("pko_officer_question.pkoUserID", "=", Auth::user()->id)
                ->get();
            return count($wish);
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

    public function newPkoMainUnit(Request $req)
    {
        try {
            $count = $this->checkUnitUser($req->MainHistoryID);
            if ($count > 0) {
                $array = array(
                    'status' => 'loginError',
                    'msg' => 'Бүртгэл оруулсан байна!!!'
                );
                return $array;
            }
            $insert = new PkoMainUnit();
            $insert->MainHistoryID = $req->MainHistoryID;
            $insert->missionID = $req->missionID;
            $insert->eeljID = $req->eeljID;
            $insert->lastName = $req->lastName;
            $insert->firstName = $req->firstName;
            $insert->chiefApprove = $req->chiefApprove;
            $insert->chiefDesc = $req->chiefDesc;
            $insert->SportScore = $req->SportScore;
            $insert->height = $req->height;
            $insert->weight = $req->weight;
            $insert->waist = $req->waist;
            $insert->thigh = $req->thigh;
            $insert->userID = Auth::user()->id;
            $insert->save();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай хадгаллаа."
                ),
                200
            );
        } catch (\Throwable $th) {

            // return $th;
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
    }


    public function checkUnitUser($md)
    {
        $users = DB::table('pko_main_unitadmin')
        ->where("MainHistoryID", "=", $md)
            ->get();
        return count($users);

}

    public function newofficerQuestion(Request $req)
    {
        try {

            if (!$this->checkUserID(Auth::user()->id)) {
                return response(
                    array(
                        "msg" => "Та асуумж бөглөсөн байна.",
                    ),
                    500
                );
            }
            $newQuestion = new OfficerQuestion();
            $newQuestion->pkoUserID = Auth::user()->id;
            $newQuestion->startedDate = $req->startedDate; // эхэлсэн date
            $newQuestion->rankTypeID = $req->rankTypeID; // rank type
            $newQuestion->rankID = $req->rankID; // rank name
            $newQuestion->rolePlayed = $req->rolePlayed; // ажиллагаанд явсан эсэх тийм / үгүй
            $newQuestion->missionType = 1; // р6 са 12 сар
            $newQuestion->missionName = $req->missionName; // ажиллагааны нэрс
            $newQuestion->missionCameDate = $req->missionCameDate; // ирсэн хугацаа
            $newQuestion->coursed = $req->coursed; // дамжаа эсэх
            $newQuestion->courseName = $req->courseName; // дамжаа эсэх
            $newQuestion->save();

            return response(
                array(
                    "userCheck" => count($this->checkQuestion($newQuestion)),
                    "pkoUserID" => count($this->checkPkoOfficer($newQuestion)),
                    "status" => "success",
                    "msg" => "Таны бөглөсөн асуумжийг хүлээн авлаа. ЭДА-нд оролцуулах сонгон шалгаруулалтын журмын дагуу ЭДА-ны сонгон шалгаруулалтад оролцох эрхтэй эсэхийг ОК товч дарж үзнэ үү!",
                ),
                200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => $th
                ),
                500
            );
        }
    }

public function RankType(Request $req)
{
        try {
            $rankType = DB::table("tb_rank_type")
                ->whereIn('rankTypeName', ['Ахлагч', 'Офицер'])

                ->get();
            return $rankType;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа"
                ),
                500
            );
        }
}


}
