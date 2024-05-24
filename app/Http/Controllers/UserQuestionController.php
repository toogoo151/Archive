<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\all_users;
use App\Models\MainHistory;
use App\Models\UserQuestion;
use App\Models\UserQuestionHistory;
use App\Models\UserRequirements;
use App\Models\OfficerRequirements;

use App\Models\Wish;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

use function PHPUnit\Framework\returnSelf;

class UserQuestionController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function getQuestionCheck(Request $req)
    {
        try {
            $isWishOpen = DB::table("pko_control")
            ->where("pko_control.missionID", "=", $req->_missionID)
            ->where("pko_control.eeljID", "=", $req->_eeljID)
            ->first();

            if($isWishOpen->isRequest==0){
                return response(
                    array(
                        "count" => -1,
                    ),
                    200
                );
            }

            $check = DB::table("pko_user_question")
                ->where("pko_user_question.missionID", "=", $req->_missionID)
                ->where("pko_user_question.eeljID", "=", $req->_eeljID)
                ->where("pko_user_question.pkoUserID", "=", Auth::user()->id)
                ->get();

            $missionName = DB::table("pko_mission_eelj")
                ->where("pko_mission_eelj.missionID", "=", $req->_missionID)
                ->where("pko_mission_eelj.id", "=", $req->_eeljID)
                ->select("pko_mission_eelj.id", "pko_mission_eelj.eeljName")
                ->first();

            $oldRowInQuestion = UserQuestion::where("pkoUserID", "=", Auth::user()->id)
                ->where("missionID", "=", $req->_missionID)
                ->where("eeljID", "=", $req->_eeljID)
                ->first();


            if(count($check) > 0){
                return $this->checkUserQuestionWhenBeforeMission($oldRowInQuestion, $missionName, false);

            }else{
                return response(
                    array(
                        "count" => 0,
                        "missionName" => $missionName,
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

    public function getUserWish(Request $req)
    {
        try {
            $wish = DB::table("pko_wish")
                ->where("pko_wish.pkoUserID", "=", Auth::user()->id)
                ->where("missionID", "=", $req->_missionID)
                ->where("eeljID", "=", $req->_eeljID)
                ->get();
                $getCreated_at = DB::table("pko_wish")
                ->where("pko_wish.pkoUserID", "=", Auth::user()->id)
                ->where("missionID", "=", $req->_missionID)
                ->where("eeljID", "=", $req->_eeljID)
                ->first()->created_at;
            return response(array("count"=>count($wish),
        "getCreated_at"=>$getCreated_at,));
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
            $newQuestion->appointedDate = "2021-06-04";
            $newQuestion->rolePlayed = 0;
            $newQuestion->missionType = 0;
            $newQuestion->missionCameDate = "2019-03-15";
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

    public function checkQuestion($newQuestion) //Асуумж шаардлга хангаж байгаа эсэхийг шалгаж байна.
    {
        try {
            $dateNow = Carbon::now();
            $dateAppointed = Carbon::parse($newQuestion->appointedDate);

            $formatAppointedYear = $dateAppointed->format('Y');
            $formatAppointedMonth = $dateAppointed->format('m');

            $subtractedAppointedDate = $dateNow->subYears($formatAppointedYear)->subMonths($formatAppointedMonth);

            $resultAppointedYear = $subtractedAppointedDate->format('y');
            $resultAppointedMonth = $subtractedAppointedDate->format('m');
            $appointed = $resultAppointedYear * 12 + $resultAppointedMonth; // томилогдсоноос хоош хугацаа тоолсон жишээ нь: 6

            if ($newQuestion->rolePlayed == 0) { // тийм
                $dateNow1 = Carbon::now();
                $dateCame = Carbon::parse($newQuestion->missionCameDate); // буцаж ирсэн огноо

                $formatCameYear = $dateCame->format('Y');
                $formatCameMonth = $dateCame->format('m');

                $subtractedCameDate = $dateNow1->subYears($formatCameYear)->subMonths($formatCameMonth);

                $resultCameYear = $subtractedCameDate->format('y');
                $resultCameMonth = $subtractedCameDate->format('m');
                $cameDate = $resultCameYear * 12 + $resultCameMonth; // ажиллагаанаас ирсэн сар тоолсон
            }

            if ($newQuestion->punishment == 0) { // тийм
                $dateNow2 = Carbon::now();
                $datePunishment = Carbon::parse($newQuestion->punishmentDate);

                $formatPunishmentYear = $datePunishment->format('Y');
                $formatPunishmentMonth = $datePunishment->format('m');

                $subtractedPunishmentDate = $dateNow2->subYears($formatPunishmentYear)->subMonths($formatPunishmentMonth);

                $resultPunishmentYear = $subtractedPunishmentDate->format('y');
                $resultPunishmentMonth = $subtractedPunishmentDate->format('m');
                $punishmentDate = $resultPunishmentYear * 12 + $resultPunishmentMonth; // сараар гарч байгаа
            }



            if ($newQuestion->rolePlayed == 0) {
                if ($newQuestion->punishment == 0) {
                    $appointedCheck = DB::table("pko_user_requirements")
                        ->where("pko_user_requirements.appointedDate", "<=", $appointed)
                        ->where(function ($query) use ($newQuestion, $cameDate) {
                            if ($newQuestion->rolePlayed == 0) {
                                if ($newQuestion->missionType == 0) {
                                    $query->where("pko_user_requirements.missionTypeHalf", "<=", $cameDate);
                                }
                                if ($newQuestion->missionType == 1) {
                                    $query->where("pko_user_requirements.missionTypeFull", "<=", $cameDate);
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
                                $query->where("pko_user_requirements.punishmentDate", "<=", $punishmentDate);
                            }
                        })
                        ->select("pko_user_requirements.id")
                        ->get();
                } else {
                    $appointedCheck = DB::table("pko_user_requirements")
                        ->where("pko_user_requirements.appointedDate", "<=", $appointed)
                        ->where(function ($query) use ($newQuestion, $cameDate) {
                            if ($newQuestion->rolePlayed == 0) {
                                if ($newQuestion->missionType == 0) {
                                    $query->where("pko_user_requirements.missionTypeHalf", "<=", $cameDate);
                                }
                                if ($newQuestion->missionType == 1) {
                                    $query->where("pko_user_requirements.missionTypeFull", "<=", $cameDate);
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
                        ->select("pko_user_requirements.id")
                        ->get();
                }
            } else {
                if ($newQuestion->punishment == 0) {
                    $appointedCheck = DB::table("pko_user_requirements")
                        ->where("pko_user_requirements.appointedDate", "<=", $appointed)
                        ->where(function ($query) use ($newQuestion) {
                            if ($newQuestion->studying == 1) {
                                $query->where("pko_user_requirements.studying", "=", 1);
                            } else {
                                $query->where("pko_user_requirements.studying", "=", 0);
                            }
                        })
                        ->where(function ($query) use ($newQuestion, $punishmentDate) {
                            if ($newQuestion->punishment == 0) {
                                $query->where("pko_user_requirements.punishmentDate", "<=", $punishmentDate);
                            }
                        })
                        ->select("pko_user_requirements.id")
                        ->get();
                } else {
                    $appointedCheck = DB::table("pko_user_requirements")
                        ->where("pko_user_requirements.appointedDate", "<=", $appointed)
                        ->where(function ($query) use ($newQuestion) {
                            if ($newQuestion->studying == 1) {
                                $query->where("pko_user_requirements.studying", "=", 1);
                            } else {
                                $query->where("pko_user_requirements.studying", "=", 0);
                            }
                        })
                        ->select("pko_user_requirements.id")
                        ->get();
                }
            }

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

    public function checkPkoUser($newQuestion)
    {
        try {
            $check = DB::table("pko_user_question")
                ->where("missionID", "=", $$newQuestion->missionID)
                ->where("eeljID", "=", $$newQuestion->eeljID)
                ->where("pko_user_question.pkoUserID", "=", $newQuestion->pkoUserID)
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

    public function newQuestion(Request $req)
    {
        try {

            if (!$this->checkUserID($req)) {

                return response(
                    array(
                        "msg" => "Та асуумж бөглөсөн байна.",
                    ),
                    500
                );
            }


            $newQuestion = new UserQuestion();
            $newQuestion->pkoUserID = Auth::user()->id;
            $newQuestion->missionID =$req->_missionID;
            $newQuestion->eeljID =$req->_eeljID;
            $newQuestion->movement =$req->movement;
            $newQuestion->appointedDate = $req->appointedDate; // томилогдсон date
            $newQuestion->rolePlayed = $req->rolePlayed; // ажиллагаанд явсан эсэх тийм / үгүй
            $newQuestion->missionType = 1; // 6 сар 12 сар
            $newQuestion->missionName = $req->missionName; // ажиллагааны нэрс
            $newQuestion->missionCameDate = $req->missionCameDate; // ирсэн хугацаа
            $newQuestion->studying = $req->studying; // суралцаж байгаа эсэх
            $newQuestion->punishment = $req->punishment; // шийдтгэлтэй эсэх
            $newQuestion->punishmentDate = $req->punishmentDate; // шийтгэгдсэн хугацаа
            $newQuestion->save();

            $missionName = DB::table("pko_mission_eelj")
                ->where("pko_mission_eelj.missionID", "=", $req->_missionID)
                ->where("pko_mission_eelj.id", "=", $req->_eeljID)
                ->select("pko_mission_eelj.id", "pko_mission_eelj.eeljName")
                ->first();
return $this->checkUserQuestionWhenBeforeMission($newQuestion, $missionName, true);
            return response(
                array(
                    "userCheck" => count($this->checkQuestion($newQuestion)),
                    "pkoUserID" => count($this->checkPkoUser($newQuestion)),
                    "status" => "success",
                    "msg" => "Таны бөглөсөн асуумжийг хүлээн авлаа. ЭДА-нд оролцуулах сонгон шалгаруулалтын журмын дагуу ЭДА-ны сонгон шалгаруулалтад оролцох эрхтэй эсэхийг ОК товч дарж үзнэ үү!",
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

    public function checkUserID($inReq)
    {
        $check = UserQuestion::where("pkoUserID", "=", Auth::user()->id)
            ->where("missionID", "=", $inReq->_missionID)
            ->where("eeljID", "=", $inReq->_eeljID)
            ->get();
        if (count($check) == 0)
            return true;
        else
            return false;
    }

    public function firstCheckQuestion()
    {
        try {
            $newQuestion = UserQuestion::where("pkoUserID", "=", Auth::user()->id)
                ->count();
            if ($newQuestion > 0) {
                $newQuestionInto = UserQuestion::where("pkoUserID", "=", Auth::user()->id)
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

    public function getOfficerRequirements()
    {
        try {
            $getRequirements = DB::table("pko_officer_requirements")
            ->get();
            $startedDate = DB::table("pko_officer_requirements")
            ->first()->startedDate;
            $missionTypeHalf = DB::table("pko_officer_requirements")
            ->first()->missionTypeHalf;
            $missionTypeFull = DB::table("pko_officer_requirements")
            ->first()->missionTypeFull;

            if (count($getRequirements) == 0) {
                $row = array(
                    "requirements" => count($getRequirements),
                );
            } else {
                $row = array(
                    "requirements" => count($getRequirements),
                    "startedDate" => $startedDate,
                    "half" => $missionTypeHalf,
                    "full" => $missionTypeFull,


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



    public function newofficerRequirements(Request $req)
    {
        try {
            // $newRequirements = OfficerRequirements::find($req);
            $newRequirements = OfficerRequirements::findOrFail(1);


            // $newRequirements->id = 1;
            $newRequirements->startedDate = $req->startedDate;
            $newRequirements->missionTypeHalf = $req->missionTypeHalf;
            $newRequirements->missionTypeFull = $req->missionTypeFull;
             $newRequirements->update();
            return response(
                array(
                    "status" => "success",
                    "msg" => "Амжилттай заслаа."
                ),
                200
            );
        } catch (\Throwable $th) {
            return response([
                "status" => "error",
                "msg" => "Алдаа гарлаа.",
                "error" => $th->getMessage() // Include the error message in the response
            ], 500);
        }
    }
    // private function getRandomRankID()
    // {
    //     $rankIDs = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12];
    //     return $rankIDs;
    // }


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

    public function getQuestionEdit(Request $req) // шаардлага хангасаныг татаж байна
    {
        try {
            $search = $req->input('search', '');
        $perPage = $req->get('per_page', 10);
            $getRequerment = DB::table("pko_user_requirements")->first(); // Ажиллагааны шаардлагийг татаж авч байна.
            $getQuestion = DB::table("pko_user_question")
                ->where("pko_user_question.missionID", "=", $req->_missionID)
                ->where("pko_user_question.eeljID", "=", $req->_eeljID)
                ->where("pko_user_question.studying", "=", 1) // сурахгүй байгаа тэнцэнэ
                ->where(function($query) use ($search){
                    $query->where('pko_users.email', 'like', "%{$search}%")
                    ->orWhere('all_users.firstName', 'like', "%{$search}%")
                    ->orWhere('all_users.lastName', 'like', "%{$search}%")
                    ->orWhere('all_users.phone', 'like', "%{$search}%")
                    ->orWhere('all_users.rd', 'like', "%{$search}%");
                })
                ->where(function($query)use ($req){
                    if($req->_questionState == "hiigdeegui"){
                        $query->whereNull('pko_user_question.updated_at');
                    }
                    if($req->_questionState == "hiigdsen"){
                        $query->whereNotNull('pko_user_question.updated_at');
                    }
                })
                ->where(function($query) use ($getRequerment) {  // Use 'use' to include external variable
                    $query->where(function($subQuery) use ($getRequerment) {  // Include here as well
                        $subQuery->where('pko_user_question.movement', '=', 0) // шилжилт хөдөлгөөн хийсэн бол томилогдсон хцгацааг
                                 ->whereRaw('DATE_ADD(pko_user_question.appointedDate, INTERVAL ? MONTH) <= pko_user_question.created_at', [$getRequerment->appointedDate]);
                        })
                    ->orWhere('pko_user_question.movement', '=', 1);
                })
                ->where(function($query) use ($getRequerment) {  // Use 'use' to include external variable
                    $query->where(function($subQuery) use ($getRequerment) {  // Include here as well
                        $subQuery->where('pko_user_question.rolePlayed', '=', 0)
                                 ->whereRaw('DATE_ADD(pko_user_question.missionCameDate, INTERVAL ? MONTH) <= pko_user_question.created_at', [$getRequerment->missionTypeFull]);
                        })
                    ->orWhere('pko_user_question.rolePlayed', '=', 1);
                })
                ->where(function($query) use ($getRequerment) {  // Use 'use' to include external variable
                    $query->where(function($subQuery) use ($getRequerment) {  // Include here as well
                        $subQuery->where('pko_user_question.punishment', '=', 0)
                                 ->whereRaw('DATE_ADD(pko_user_question.punishmentDate, INTERVAL ? MONTH) <= pko_user_question.created_at', [$getRequerment->punishmentDate]);
                        })
                    ->orWhere('pko_user_question.punishment', '=', 1);
                })
                ->join('pko_users', 'pko_user_question.pkoUserID', '=', 'pko_users.id')
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
                ->join('tb_comandlal', 'all_users.comandlalID', '=', 'tb_comandlal.id')
                ->join('tb_unit', 'all_users.unitID', '=', 'tb_unit.id')
                ->join('tb_gender', 'all_users.gender', '=', 'tb_gender.id')
                ->select("pko_user_question.*", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "all_users.rd", "all_users.age", "all_users.position", "tb_gender.genderName", "all_users.lastName", "all_users.firstName as myName")
                ->paginate($perPage);
                // ->get();

                return $getQuestion;

        } catch (\Throwable $th) {
            // return $th;
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function getQuestionHangaagui(Request $req) // шаардлага хангаагүйг татаж байна.
    {
        try {
            $search = $req->input('search', '');
            $perPage = $req->get('per_page', 10);
            $getRequerment = DB::table("pko_user_requirements")->first(); // Ажиллагааны шаардлагийг татаж авч байна.
            $getQuestion = DB::table("pko_user_question")
                ->where("pko_user_question.missionID", "=", $req->_missionID)
                ->where("pko_user_question.eeljID", "=", $req->_eeljID)
                ->where(function($query) use ($search){
                    $query->where('pko_users.email', 'like', "%{$search}%")
                    ->orWhere('all_users.firstName', 'like', "%{$search}%")
                    ->orWhere('all_users.lastName', 'like', "%{$search}%")
                    ->orWhere('all_users.phone', 'like', "%{$search}%")
                    ->orWhere('all_users.rd', 'like', "%{$search}%");
                })
                ->where(function ($query) use ($getRequerment) {
                    // Group OR conditions for checking columns equal to 0
                    $query->where("pko_user_question.studying", "=", 0)
                        ->orWhere(function ($subQuery) use ($getRequerment) {
                            $subQuery->where("pko_user_question.movement", "=", 0)
                            ->whereRaw('DATE_ADD(pko_user_question.appointedDate, INTERVAL ? MONTH) > pko_user_question.created_at', [$getRequerment->appointedDate]);
                        })
                        ->orWhere(function ($subQuery) use ($getRequerment) {
                            $subQuery->where("pko_user_question.rolePlayed", "=", 0)
                            ->whereRaw('DATE_ADD(pko_user_question.missionCameDate, INTERVAL ? MONTH) > pko_user_question.created_at', [$getRequerment->missionTypeFull]);
                        })
                        ->orWhere(function ($subQuery) use ($getRequerment) {
                            $subQuery->where("pko_user_question.punishment", "=", 0)
                            ->whereRaw('DATE_ADD(pko_user_question.punishmentDate, INTERVAL ? MONTH) > pko_user_question.created_at', [$getRequerment->punishmentDate]);
                        });

                })
                ->where(function ($query) use ($req) {
                    // Handle date addition and checks based on external requirements
                    if ($req->_questionState == "hiigdeegui") {
                        $query->whereNull('pko_user_question.updated_at');
                    } elseif ($req->_questionState == "hiigdsen") {
                        $query->whereNotNull('pko_user_question.updated_at');
                    }
                })
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
                ->paginate($perPage);
                // ->get();

                return $getQuestion;
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
            // $findID = $this->questionHistory($req)
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
                $editQuestion->movement = $req->movement;
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
                // $editQuestion->save();

                //Асуумж засах үед шаардлага хангасан эсэхийг шалгаад хангасан тохиолдолд хүсэлтийг автоматаар нэмэх хэсэг
                if($editQuestion->save()){
                    if ( $this->checkUserQuestionEditedByGsmafAdmin($editQuestion)) { // шаардлага хангаж байвал true буцаана
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
                        $insertlist->pkoUserID =  $req->pkoUserID;
                        $insertlist->missionID = $req->_missionID;
                        $insertlist->eeljID = $req->_eeljID;
                        $insertlist->save();

                        $store = new MainHistory();
                        $store->pkoUserID = $req->pkoUserID;
                        $store->missionID = $req->_missionID;
                        $store->eeljID = $req->_eeljID;
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
    public function getQuestionAll(Request $req) // Асуумж бөглөсөн нийт
    {
        try {
            // $getQuestion1 = DB::table("pko_user_question")
            $search = $req->input('search', '');
            $perPage = $req->get('per_page', 10);

            $getQuestion = DB::table("pko_user_question")
            ->where("pko_user_question.missionID", "=", $req->_missionID)
            ->where("pko_user_question.eeljID", "=", $req->_eeljID)
            ->where(function($query)use ( $search){
                $query->where('pko_users.email', 'like', "%{$search}%")
                ->orWhere('all_users.firstName', 'like', "%{$search}%")
                ->orWhere('all_users.lastName', 'like', "%{$search}%")
                ->orWhere('all_users.phone', 'like', "%{$search}%")
                ->orWhere('all_users.rd', 'like', "%{$search}%");
            })
            ->where(function($query)use ($req){
                if($req->_questionState == "hiigdeegui"){
                    $query->whereNull('pko_user_question.updated_at');
                }
                if($req->_questionState == "hiigdsen"){
                    $query->whereNotNull('pko_user_question.updated_at');
                }
            })
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
                ->paginate($perPage);
                // ->get();
                return $getQuestion;



        } catch (\Throwable $th) {
            return $th;
            return response(

                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }


    public function getQuestionTotal(Request $req)
    {
        try {
            $getMissionEeljYear = DB::table("pko_mission_eelj")
                ->where("id", $req->_eeljID)->first();

            $missionEeljDate = Carbon::parse($getMissionEeljYear->eeljStartDate);
            $formatmissionEeljDate = $missionEeljDate->format('Y');

            $getUser = DB::table("pko_users")
                ->whereRaw("YEAR(created_at) = ?", [$formatmissionEeljDate])

                ->where("pko_users.user_type", "=", "unitUser")
                ->count();

            $getUserVerified = DB::table("pko_users")
                ->whereRaw("YEAR(created_at) = ?", [$formatmissionEeljDate])
                ->whereNotNull("email_verified_at")
                ->where("pko_users.user_type", "=", "unitUser")
                ->count();

            $getAll = DB::table("pko_user_question")
                ->where("pko_user_question.missionID", $req->_missionID)
                ->where("pko_user_question.eeljID", $req->_eeljID)
                ->join("pko_users", function ($query) {
                    $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function ($query) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->count();

                $getRequerment = DB::table("pko_user_requirements")->first(); // Ажиллагааны шаардлагийг татаж авч байна.
            $getHangasan = DB::table("pko_user_question")
                ->where("pko_user_question.missionID", "=", $req->_missionID)
                ->where("pko_user_question.eeljID", "=", $req->_eeljID)
                ->where("pko_user_question.studying", "=", 1) // сурахгүй байгаа тэнцэнэ
                ->where(function($query) use ($getRequerment) {  // Use 'use' to include external variable
                    $query->where(function($subQuery) use ($getRequerment) {  // Include here as well
                        $subQuery->where('pko_user_question.movement', '=', 0) // шилжилт хөдөлгөөн хийсэн бол томилогдсон хцгацааг
                                 ->whereRaw('DATE_ADD(pko_user_question.appointedDate, INTERVAL ? MONTH) <= pko_user_question.created_at', [$getRequerment->appointedDate]);
                        })
                    ->orWhere('pko_user_question.movement', '=', 1);
                })
                ->where(function($query) use ($getRequerment) {  // Use 'use' to include external variable
                    $query->where(function($subQuery) use ($getRequerment) {  // Include here as well
                        $subQuery->where('pko_user_question.rolePlayed', '=', 0)
                                 ->whereRaw('DATE_ADD(pko_user_question.missionCameDate, INTERVAL ? MONTH) <= pko_user_question.created_at', [$getRequerment->missionTypeFull]);
                        })
                    ->orWhere('pko_user_question.rolePlayed', '=', 1);
                })
                ->where(function($query) use ($getRequerment) {  // Use 'use' to include external variable
                    $query->where(function($subQuery) use ($getRequerment) {  // Include here as well
                        $subQuery->where('pko_user_question.punishment', '=', 0)
                                 ->whereRaw('DATE_ADD(pko_user_question.punishmentDate, INTERVAL ? MONTH) <= pko_user_question.created_at', [$getRequerment->punishmentDate]);
                        })
                    ->orWhere('pko_user_question.punishment', '=', 1);
                })
                ->join("pko_users", function ($query) {
                    $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
                })
                ->join("all_users", function ($query) {
                    $query->on("pko_users.allUsersID", "=", "all_users.id");
                })
                ->count();

            // $getHangasan = DB::table("pko_user_question")
            //     ->join("pko_users", function ($query) {
            //         $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
            //     })
            //     ->join("all_users", function ($query) {
            //         $query->on("pko_users.allUsersID", "=", "all_users.id");
            //     })
            //     ->where("pko_user_question.appointedDate", "<=", "2022-06-23")
            //     ->where(function ($query) {
            //         $query->where("pko_user_question.missionCameDate", "<=", "2021-06-23")
            //             ->orWhereNull("pko_user_question.missionCameDate");
            //     })
            //     ->where(function ($query) {
            //         $query->where("pko_user_question.punishmentDate", "<=", "2022-06-23")
            //             ->orWhereNull("pko_user_question.punishmentDate");
            //     })
            //     ->where("pko_user_question.studying", "=", 1)
            //     ->get();

            // $getHangaagui = DB::table("pko_user_question")
            //     ->join("pko_users", function ($query) {
            //         $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
            //     })
            //     ->join("all_users", function ($query) {
            //         $query->on("pko_users.allUsersID", "=", "all_users.id");
            //     })
            //     ->where("pko_user_question.appointedDate", ">", "2022-06-23")
            //     ->orWhere("pko_user_question.missionCameDate", ">", "2021-06-23")
            //     ->orWhere("pko_user_question.punishmentDate", ">", "2022-06-23")
            //     ->orWhere("pko_user_question.studying", "=", 0)
            //     ->get();
            $getHangaagui = DB::table("pko_user_question")
            ->where("pko_user_question.missionID", "=", $req->_missionID)
            ->where("pko_user_question.eeljID", "=", $req->_eeljID)
            ->where(function ($query) use ($getRequerment) {
                // Group OR conditions for checking columns equal to 0
                $query->where("pko_user_question.studying", "=", 0)
                    ->orWhere(function ($subQuery) use ($getRequerment) {
                        $subQuery->where("pko_user_question.movement", "=", 0)
                        ->whereRaw('DATE_ADD(pko_user_question.appointedDate, INTERVAL ? MONTH) > pko_user_question.created_at', [$getRequerment->appointedDate]);
                    })
                    ->orWhere(function ($subQuery) use ($getRequerment) {
                        $subQuery->where("pko_user_question.rolePlayed", "=", 0)
                        ->whereRaw('DATE_ADD(pko_user_question.missionCameDate, INTERVAL ? MONTH) > pko_user_question.created_at', [$getRequerment->missionTypeFull]);
                    })
                    ->orWhere(function ($subQuery) use ($getRequerment) {
                        $subQuery->where("pko_user_question.punishment", "=", 0)
                        ->whereRaw('DATE_ADD(pko_user_question.punishmentDate, INTERVAL ? MONTH) > pko_user_question.created_at', [$getRequerment->punishmentDate]);
                    });

            })
            ->join("pko_users", function ($query) {
                $query->on("pko_user_question.pkoUserID", "=", "pko_users.id");
            })
            ->join("all_users", function ($query) {
                $query->on("pko_users.allUsersID", "=", "all_users.id");
            })
            ->count();

            $row = array(
                "allUser" => $getUser,
                "allUserVerified" => $getUserVerified,

                "bugluugui" => $getUser - $getAll,
                "allTotal" => $getAll,
                "hangasan" => $getHangasan,
                "hangaagui" => $getHangaagui,
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


    public function checkUserQuestionWhenBeforeMission($newQuestion, $missionName, $isFirst) //Асуумж шаардлга хангаж байгаа эсэхийг шалгаж байна. Шинээр бичсэн
    {
        try {
            $appointedFromOther=""; // томилогдсон огноо 1 байвал тэнцэнэ.
            $rolePlayedMonthComplate="";  // Ажиллгаа хоорондын хугацаа бодох 1 байвал тэнцэнэ
            $punishmentCount=""; // шийтгэл эдлэж байсан эсэх 1 байвал тэнцэнэ
            $monthsSinceAppointed = 0;
            $cameMonthCount =0;
             $punishmentMonths =0;
            if($newQuestion->movement ==0) // Анги хооронд шилжсэн
            {
                $dateNow = Carbon::parse($newQuestion->created_at);
                $dateAppointed = Carbon::parse($newQuestion->appointedDate);
                $monthsSinceAppointed = $dateNow->diffInMonths($dateAppointed);

                $appointedFromOther = DB::table("pko_user_requirements")
                        ->where("pko_user_requirements.appointedDate", "<=", $monthsSinceAppointed)
                        ->count(); // 0 гарж байгаа бол боломжгүй гэсэн үг

            }else{
                $appointedFromOther = 1; // Бусад тохиолдол хугацаа бодохгүй шууд боломжтой болгох
            }


            if ($newQuestion->rolePlayed == 0) { // Ажиллагаанд явсан
                $dateNow1 = Carbon::parse($newQuestion->created_at);
                $dateCame = Carbon::parse($newQuestion->missionCameDate); // буцаж ирсэн огноо
                $cameMonthCount = $dateNow1->diffInMonths($dateCame); // өнөөдрийг хүртэл сарийг тоолж байна.

                $rolePlayedMonthComplate = DB::table("pko_user_requirements")
                ->where("pko_user_requirements.missionTypeFull", "<=", $cameMonthCount)
                ->count(); // 0 гарж байгаа бол боломжгүй гэсэн үг
            }else{
                $rolePlayedMonthComplate = 1;
            }

            // studying байгаа 0 = сурч байгаа учраас тэнцэхгүй. 1 = суралцаагүй учраас тэнцэнэ
            if ($newQuestion->punishment == 0) { // тийм
                $dateNow2 = Carbon::parse($newQuestion->created_at);
                $datePunishment = Carbon::parse($newQuestion->punishmentDate);
                $punishmentDate = $dateNow2->diffInMonths($datePunishment); // сараар гарч байгаа


                $punishmentCount = DB::table("pko_user_requirements")
                ->where("pko_user_requirements.punishmentDate", "<=", $punishmentDate)
                ->count();

                if($punishmentCount ==0){
                    $punishmentMonths = 12-$punishmentDate;
                }
            }else{
                $punishmentCount = 1;
            }

            if($appointedFromOther == 1 && $rolePlayedMonthComplate ==1 && $newQuestion->studying ==1 && $punishmentCount ==1){
                $getIsRequestedInWish = new Wish();
                return response(
                    array(
                        "count" => 1,
                        "missionName" => $missionName,
                        "msg" => $isFirst ? "Та энэ ажиллагаанд ХҮСЭЛТ илгээх боломжтой байна.": "Та энэ ажиллагаанд ХҮСЭЛТ илгээж сонгон шалгаруулалтад оролцох эрхтэй болсон байна.",
                        "isComplate" => true,
                        "isErrorArr" => [],
                        "isReqSent"=> $getIsRequestedInWish->isRequestedInWish(Auth::user()->id,$newQuestion->missionID, $newQuestion->eeljID),
                        "wishRow"=> $getIsRequestedInWish->getWishCreated_at(Auth::user()->id,$newQuestion->missionID, $newQuestion->eeljID),
                    ),
                    200
                );

            }else{
                $getErrorMsgs = array();

                if($appointedFromOther == 0){
                    $row = array("errorMsg"=>"Одоогийн албан тушаалд томилогдсоноос хойш 12 сарын хугацаа хүрээгүй байна.");
                    array_push($getErrorMsgs, $row);
                }
                if($rolePlayedMonthComplate == 0){
                    $row = array("errorMsg"=>"Таны ажиллагаа хоорондын хугацаа ".$cameMonthCount." сар байна. Ажиллагаа хоорондын хугацаа 24 сараас багагүй байх ёстой.");
                    array_push($getErrorMsgs, $row);
                }
                if($newQuestion->studying == 0){
                    $row = array("errorMsg"=>"Та БХ-ын болон бусад их, дээд
                    сургууль, коллежийн өдрийн ангийн
                    сургалт, дамжаанд суралцаж байна.");
                    array_push($getErrorMsgs, $row);
                }
                if($punishmentCount == 0){
                    $row = array("errorMsg"=>"Төрийн албаны тухай хууль, цэргийн сахилгын дүрэмд заасан сахилгын шийтгэл дуусах хугацаа ".$punishmentMonths." сар дутуу байна.");
                    array_push($getErrorMsgs, $row);
                }
                return response(
                    array(
                        "count" => 1,
                        "missionName" => $missionName,
                        "msg" =>  "Та энхийг сахиулах ажиллагааны сонгон шалгаруулалтын журмын зарим шалгуурыг хангаагүй байна.",
                        "isComplate" => false,
                        "isErrorArr" => $getErrorMsgs,
                        "isReqSent"=> 0,
                        "wishRow"=> [],
                    ),
                    200
                );

            }


        } catch (\Throwable $th) {
            return $th;
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ),
                500
            );
        }
    }

    public function checkUserQuestionEditedByGsmafAdmin($newQuestion) //Асуумж шаардлга хангаж байгаа эсэхийг шалгах gsmafAdmin -д зориулав
    {
        try {
            $appointedFromOther=""; // томилогдсон огноо 1 байвал тэнцэнэ.
            $rolePlayedMonthComplate="";  // Ажиллгаа хоорондын хугацаа бодох 1 байвал тэнцэнэ
            $punishmentCount=""; // шийтгэл эдлэж байсан эсэх 1 байвал тэнцэнэ
            $monthsSinceAppointed = 0;
            $cameMonthCount =0;
             $punishmentMonths =0;
            if($newQuestion->movement ==0) // Анги хооронд шилжсэн
            {
                $dateNow = Carbon::parse($newQuestion->created_at);
                $dateAppointed = Carbon::parse($newQuestion->appointedDate);
                $monthsSinceAppointed = $dateNow->diffInMonths($dateAppointed);

                $appointedFromOther = DB::table("pko_user_requirements")
                        ->where("pko_user_requirements.appointedDate", "<=", $monthsSinceAppointed)
                        ->count(); // 0 гарж байгаа бол боломжгүй гэсэн үг

            }else{
                $appointedFromOther = 1; // Бусад тохиолдол хугацаа бодохгүй шууд боломжтой болгох
            }


            if ($newQuestion->rolePlayed == 0) { // Ажиллагаанд явсан
                $dateNow1 = Carbon::parse($newQuestion->created_at);
                $dateCame = Carbon::parse($newQuestion->missionCameDate); // буцаж ирсэн огноо
                $cameMonthCount = $dateNow1->diffInMonths($dateCame); // өнөөдрийг хүртэл сарийг тоолж байна.

                $rolePlayedMonthComplate = DB::table("pko_user_requirements")
                ->where("pko_user_requirements.missionTypeFull", "<=", $cameMonthCount)
                ->count(); // 0 гарж байгаа бол боломжгүй гэсэн үг
            }else{
                $rolePlayedMonthComplate = 1;
            }

            // studying байгаа 0 = сурч байгаа учраас тэнцэхгүй. 1 = суралцаагүй учраас тэнцэнэ
            if ($newQuestion->punishment == 0) { // тийм
                $dateNow2 = Carbon::parse($newQuestion->created_at);
                $datePunishment = Carbon::parse($newQuestion->punishmentDate);
                $punishmentDate = $dateNow2->diffInMonths($datePunishment); // сараар гарч байгаа


                $punishmentCount = DB::table("pko_user_requirements")
                ->where("pko_user_requirements.punishmentDate", "<=", $punishmentDate)
                ->count();

                if($punishmentCount ==0){
                    $punishmentMonths = 12-$punishmentDate;
                }
            }else{
                $punishmentCount = 1;
            }

            if($appointedFromOther == 1 && $rolePlayedMonthComplate ==1 && $newQuestion->studying ==1 && $punishmentCount ==1){
                return true;
            }else{
                return false;
            }


        } catch (\Throwable $th) {
            return $th;
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
