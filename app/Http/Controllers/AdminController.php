<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\all_users;
use App\Models\MainHistory;
use App\Models\UserQuestion;
use App\Models\Wish;
use App\Models\log_users;
use App\Notifications\EmailRegisteredNotification;
use DateTime;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;

class AdminController extends Controller
{
    // MAF_peacekeeper operation function эхлэл
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function showBlade(){
        // return view('welcome');
        return redirect('/');

        // if(Auth::user()->user_type == "super" || Auth::user()->user_type == "user"){
        //     return view('welcome');
        // }
        // else{
        //     return redirect('/');
        // }
    }

    public function getAuthName(){
        $user = new all_users;
        $userName = $user->getUserName();
        return  $userName;
    }

    //User profile heseg
    public function getUserInformation(){
        try {
            $admins = DB::table("pko_users")
            ->where("pko_users.id", "=", Auth::user()->id)
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
            ->select("pko_users.id", "pko_users.email", "pko_users.user_type", "all_users.image", "all_users.foreignPass", "all_users.foreignFinishDate", "pko_users.phone", "all_users.comandlalID", "all_users.unitID", "all_users.rankParentID", "all_users.rankTypeID", "all_users.rankID", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.age", "all_users.gender", "all_users.position", "tb_gender.genderName","tb_comandlal.comandlalName as comandlal", "tb_unit.unitFullName as unit", "tb_ranks.rank")->first();
            return $admins;
        } catch (\Throwable $th) {
            return response(
                array(
                    "status" => "error",
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function getAdmins(Request $req){
        try {
            // getAdminsByType
            $admins = DB::table("pko_users")
            ->where( function($query)use($req){
                if($req->getAdminsByType ==="allAdmin"){
                    $query->where("pko_users.user_type", "!=", "unitUser");
                // ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                // ->where("all_users.dundiinTulv", "=", 0);
                }
                if($req->getAdminsByType ==="comandlalAdmin"|| $req->getAdminsByType ==="unitAdmin"){
                    $query->where("pko_users.user_type", "=", $req->getAdminsByType)
                ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                ->where("all_users.dundiinTulv", "=", 0);
                }
                if($req->getAdminsByType ==="otherAdmin"){
                    $query->whereIn("pko_users.user_type", ["superAdmin","gsmafAdmin", "healthDepartmentAdmin", "comissionAdmin", "hospitalAdmin", "sportAdmin", "languageAdmin", "batalionAdmin"] )
                ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                ->where("all_users.dundiinTulv", "=", 0);
                }

                // if(Auth::user()->user_type == "gsmafAdmin"){
                //     $query->whereIn("pko_users.user_type", ["comandlalAdmin", "unitAdmin"] )
                //     ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                //     ->where("all_users.dundiinTulv", "=", 0);
                // }


                if(Auth::user()->user_type == "comandlalAdmin"){
                    $myComandlal = new all_users;
                    $myComandlalID = $myComandlal->getUserComandlal();

                    $query->whereIn("pko_users.user_type", ["unitAdmin"] )
                    ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                    ->where("all_users.comandlalID", "=", $myComandlalID->id)
                    ->where("all_users.dundiinTulv", "=", 0);
                }
                // if(Auth::user()->user_type == "unitAdmin"){
                //     $myUnit = new all_users;
                //     $myUnitFirstRow = $myUnit->getUserUnit();

                //     $query->where("pko_users.user_type", "=", "unitUser")
                //     ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                //     ->where("all_users.unitID", "=", $myUnitFirstRow->id)
                //     ->where("all_users.dundiinTulv", "=", 0);
                // }

            })
            ->join("pko_admin_type", function($query){
                $query->on("pko_users.user_type", "=", "pko_admin_type.adminTypeName");
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
            ->select("pko_users.id", "pko_users.email", "pko_users.user_type", "all_users.image", "all_users.foreignPass", "all_users.foreignFinishDate", "pko_users.phone", "all_users.comandlalID", "all_users.unitID", "all_users.rankParentID", "all_users.rankTypeID", "all_users.rankID", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.gender", "all_users.position", "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank", "pko_admin_type.adminTypeDescription as adminPermision")->get();
            // return $admins;
            return response(
                array(
                    "allSysytemAdmins" => $this->countAdmins(1),
                    "comandlalAdmins" => $this->countAdmins(2),
                    "allUnitAdmin" => $this->countAdmins(3),
                    "otherSystemAdmins" => $this->countAdmins(4),
                    "adminsData" => $admins,
            ), 200
            );
        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }
    public function countAdmins($countKind){
        if($countKind ==1){
            $allSysytemAdmins = DB::table("pko_users")
                ->where("pko_users.user_type", "!=", "unitUser")
                ->select( "pko_users.id")
                ->count();
            return  $allSysytemAdmins;
        }
        if($countKind ==2){
            $comandlalAdmins = DB::table("pko_users")
                ->where("pko_users.email_verified_at", "!=", null) // идвэхтэй админууд
                ->where("pko_users.user_type", "=", "comandlalAdmin")
                ->select( "pko_users.id")
                ->count();
            return  $comandlalAdmins;
        }
        if($countKind ==3){
            $allUnitAdmin = DB::table("pko_users")
                ->where("pko_users.user_type", "=", "unitAdmin")
                ->select( "pko_users.id")
                ->count();
            return  $allUnitAdmin;
        }
        if($countKind ==4){
            $otherSystemAdmins = DB::table("pko_users")
                ->where("pko_users.user_type", "!=", "comandlalAdmin")
                ->where("pko_users.user_type", "!=", "unitAdmin")
                ->where("pko_users.user_type", "!=", "unitUser")
                ->select( "pko_users.id")
                ->count();
            return  $otherSystemAdmins;
        }

    }

//ЭДЦХАХ-ээс Төрийн цэргийн байгууллагын хэрэглэгчийг асуумж хүсэлтийг давуулж нэмэнх хэсэг
    public function getSuperAdmins(){
        try {
            $admins = DB::table("pko_users")
            ->where( function($query){
                    $query->where("pko_users.user_type", "=", "unitUser" )
                    ->where("pko_users.permission", "=", Auth::user()->id)
                    ->join("all_users", "all_users.id", "=", "pko_users.allUsersID")
                    ->where("all_users.dundiinTulv", "=", 0);

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
            ->select("pko_users.id", "pko_users.email", "pko_users.user_type", "all_users.image", "all_users.foreignPass", "all_users.foreignFinishDate", "pko_users.phone", "all_users.comandlalID", "all_users.unitID", "all_users.rankParentID", "all_users.rankTypeID", "all_users.rankID", "all_users.firstName", "all_users.lastName", "all_users.rd", "all_users.age", "all_users.gender", "all_users.position", "tb_gender.genderName","tb_comandlal.comandlalShortName as comandlal", "tb_unit.unitShortName as unit", "tb_ranks.shortRank")->get();
            return $admins;
        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }

    public function newSuperAdmin(Request $req){
        try {

            if(!$this->checkEmail($req->email)){
                return response(
                    array(
                        "msg" => "Цахим хаяг бүртгэлтэй байна."
                    ), 500
                );
            }
            if(!$this->checkPhone($req->phone)){
                return response(
                    array(
                        "msg" => "Утасны дугаар бүртгэлтэй байна."
                    ), 500
                );
            }
            if(!$this->checkRD($req->rd)){ // хэрэглэгч all_users олдвол энэ пункц ажилна.
                $rd = all_users::where("rd", "=", $req->rd)->first();
                $getPkoUserRowCount = User::where("allUsersID", "=", $rd->id)->count();
                if($getPkoUserRowCount === 0)
                {
                    // pko usert insert hiine
                    $quickpass = substr( str_shuffle( str_repeat( 'abcdefghijklmnopqrstuvwxyz0123456789', 10 ) ), 0, 10 );
                    $user =  new User();
                    $user->allUsersID = $rd->id;
                    $user->permission = Auth::user()->id;
                    $user->user_type = $req->userType;
                    $user->phone = $req->phone;
                    $user->email = $req->email;
                    $user->password = Hash::make($quickpass);
                    $user->pinCode = Hash::make(1234);
                    $user->save();
                }
                else{
                    return response(
                        array(
                            "msg" => "Регистрийн дугаар бүртгэлтэй байна."
                        ), 500
                    );
                }

            }



                // zuragtai holbootoi heseg
                if($req->pkoImage != ""){
                    $todayDate = Carbon::now()->format('Y-m-d');
                    $image_64 = $req->pkoImage;
                    $setImagePathID = rand(9, 99999999)."_".$todayDate;

                    $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
                    $replace = substr($image_64, 0, strpos($image_64, ',')+1);
                    $image = str_replace($replace, '', $image_64);
                    $image = str_replace(' ', '+', $image);
                    // $imageName = Str::random(10).'.'.$extension;
                    $path = 'public/profile/'.$setImagePathID.".".$extension;

                    Storage::disk('local')->put($path, base64_decode($image));

                    $getImageUrl = '/profile'.'/'.$setImagePathID.".".$extension;
                }
                //zuragtai holbootoi heseg end duusna


            $all_user = new all_users();
            $all_user->comandlalID = $req->comandlal;
            $all_user->unitID = $req->unit;
            $all_user->rankParentID = $req->rankParentID;
            $all_user->rankTypeID = $req->rankTypeID;
            $all_user->rankID = $req->rankID;
            $all_user->firstName = $req->firstName;
            $all_user->lastName = $req->lastName;
            $all_user->rd = $req->rd;
            $resultAge =  $this->calculateAge($req->rd);
            $all_user->age = $resultAge['age'];
            $all_user->gender = $req->gender;
            $all_user->position = $req->position;
            if($req->pkoImage != ""){
                $all_user->image = $getImageUrl;
            }
            $all_user->foreignPass = $req->foreignPass;
            if($req->foreignFinishDate != "" || $req->foreignFinishDate != null){
                $all_user->foreignFinishDate = $req->foreignFinishDate;
            }

            $all_user->phone= $req->phone;
            $all_user->email = $req->email;
            $all_user->save();

            $quickpass = substr( str_shuffle( str_repeat( 'abcdefghijklmnopqrstuvwxyz0123456789', 10 ) ), 0, 10 );
            $user =  new User();
            $user->allUsersID = $all_user->id;
            $user->permission = Auth::user()->id;
            $user->user_type = $req->userType;
            $user->phone = $req->phone;
            $user->email = $req->email;
            $user->password = Hash::make($quickpass);
            $user->pinCode = Hash::make(1234);
            $user->save();

            $questionInsert = new UserQuestion();
            $questionInsert->pkoUserID = $user->id;
            $questionInsert->appointedDate = "2010-01-01";
            $questionInsert->rolePlayed = 1;
            $questionInsert->missionType = 1;
            $questionInsert->studying = 1;
            $questionInsert->punishment = 1;
            $questionInsert->save();

            $insertlist = new Wish();
            $insertlist->pkoUserID = $user->id;
            $insertlist->missionID = $req->missionID;
            $insertlist->eeljID = $req->eeljID;
            $insertlist->save();

            $store = new MainHistory();
            $store->pkoUserID = $insertlist->pkoUserID;
            $store->missionID = $insertlist->missionID;
            $store->eeljID = $insertlist->eeljID;
            $store->save();

            $lognew = new log_users();
            $lognew->missionID = $store->missionID;
            $lognew->eeljID = $store->eeljID;
            $lognew->comandlalID = $all_user->comandlalID;
            $lognew->unitID = $all_user->unitID;
            $lognew->rankID = $all_user->rankID;
            $lognew->firstName = $all_user->firstName;
            $lognew->lastName = $all_user->lastName;
            $lognew->rd = $all_user->rd;
            $lognew->email = $user->email;
            $lognew->successful = "Нэмсэн";
            $lognew->admin_id = Auth::user()->id;
            $lognew->admin_email = Auth::user()->email;
            $lognew->admin_name = all_users::find(Auth::user()->allUsersID)->getUserName();
            $editorRD = DB::table("all_users")->where("id", Auth::user()->allUsersID)->first();
            $lognew->adminRD = $editorRD->rd;
            $lognew->user_ip = $req->ip();
            $lognew->save();



            Notification::route('mail', $user->email)->notify(new EmailRegisteredNotification());

            return response(
                array(
                    "msg" => "Амжилттай хадгаллаа, бүртгүүлсэн тухай мэдэгдлийг ЦАХ-ийн мэйл хаягруу илгээсэн. "
                ), 201
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    public function editSuperAdmin(Request $req){
        try {

            $user =  User::find($req->id);
            $user->user_type = $req->user_type;
            $user->phone = $req->phone;
            $user->email = $req->email;
            $user->save();
            $missionID = $req->missionID ?? null;
            $eeljID  = $req->eeljID  ?? null;



            // zuragtai holbootoi heseg
            if($req->pkoImage != "" && strlen($req->pkoImage) >50){
                //image delete
                $deleteImage = all_users::find($user->allUsersID);
                if($deleteImage->image != "0"){
                Storage::delete('public' . $deleteImage->image);
                }
                //image delete
                $todayDate = Carbon::now()->format('Y-m-d');
                $image_64 = $req->pkoImage;
                $setImagePathID = rand(9, 99999999)."_".$todayDate;

                $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
                $replace = substr($image_64, 0, strpos($image_64, ',')+1);
                $image = str_replace($replace, '', $image_64);
                $image = str_replace(' ', '+', $image);
                // $imageName = Str::random(10).'.'.$extension;
                $path = 'public/profile/'.$setImagePathID.".".$extension;

                Storage::disk('local')->put($path, base64_decode($image));

                $getImageUrl = '/profile'.'/'.$setImagePathID.".".$extension;
            } else{
                $getImageUrl = $req->pkoImage;
            }
            //zuragtai holbootoi heseg end duusna

            $all_user = all_users::find($user->allUsersID);
            $all_user->comandlalID = $req->comandlal;
            $all_user->unitID = $req->unit;
            $all_user->rankParentID = $req->rankParentID;
            $all_user->rankTypeID = $req->rankTypeID;
            $all_user->rankID = $req->rankID;
            $all_user->firstName = $req->firstName;
            $all_user->lastName = $req->lastName;
            $all_user->rd = $req->rd;
            $resultAge =  $this->calculateAge($req->rd);
            $all_user->gender = $req->gender;
            $all_user->age = $resultAge['age'];
            $all_user->position = $req->position;
            if($req->pkoImage != ""){
                $all_user->image = $getImageUrl;
            }
            $all_user->foreignPass = $req->foreignPass;
            if($req->foreignFinishDate != "" || $req->foreignFinishDate != null){
                $all_user->foreignFinishDate = $req->foreignFinishDate;
            }
            $all_user->phone= $req->phone;
            $all_user->email= $req->email;
            $all_user->save();

            $lognew = new log_users();
            $lognew->missionID = $missionID;
            $lognew->eeljID = $eeljID;
            $lognew->comandlalID = $all_user->comandlalID;
            $lognew->unitID = $all_user->unitID;
            $lognew->rankID = $all_user->rankID;
            $lognew->firstName = $all_user->firstName;
            $lognew->lastName = $all_user->lastName;
            $lognew->rd = $all_user->rd;
            $lognew->email = $user->email;
            $lognew->successful = "Зассан";
            $lognew->admin_id = Auth::user()->id;
            $lognew->admin_email = Auth::user()->email;
            $lognew->admin_name = all_users::find(Auth::user()->allUsersID)->getUserName();
            $editorRD = DB::table("all_users")->where("id", Auth::user()->allUsersID)->first();
            $lognew->adminRD = $editorRD->rd;
            $lognew->user_ip = $req->ip();
            $lognew->save();

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

    // public function deleteSuperAdmin(Request $req){
    //     try {
    //         $myQuestion = DB::table("pko_user_question")
    //         ->where("pko_user_question.pkoUserID", "=", $req->id)
    //         ->get();

    //         $user = User::find($req->id);
    //         $deleteImage = all_users::find($user->allUsersID);
    //         if($deleteImage->image != "0"){
    //             Storage::delete('public' . $deleteImage->image);
    //         }
    //         $question = UserQuestion::find($myQuestion->id);
    //         $question->delete();
    //         $wish = Wish::find($myQuestion->id);
    //         $wish->delete();
    //         $deleteImage->delete();
    //         $user->delete();
    //         return response(
    //             array("msg" => "Амжилттай утсгалаа"), 200
    //         );
    //     } catch (\Throwable $th) {
    //         return response(
    //             array(
    //                 "msg" => "Алдаа гарлаа."
    //             ), 500
    //         );
    //     }
    // }
    //ЭДЦХАХ-ээс Төрийн цэргийн байгууллагын хэрэглэгчийг асуумж хүсэлтийг давуулж нэмэнх хэсэг


    public function getComID(Request $req){
        try {

                $comandlal = DB::table("tb_comandlal")
                ->get();
                return $comandlal;

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

    public function getUnitID(Request $req){
        try {
                $getMyUnitID = new all_users();
                $unit = DB::table("tb_unit")
                ->where("id", "=", $getMyUnitID->getUserUnit()->id)
                ->first();
                $row = array(
                    "comID" => $unit->comandlalID,
                    "unitID" => $unit->id,
                );
                return $row;

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

   public function getIDbyComandlal(Request $req)
    {
        try {
            if (Auth::user()->user_type === "superAdmin" || Auth::user()->user_type === "gsmafAdmin" || Auth::user()->user_type === "batalionAdmin") {
                $comandlal = DB::table("tb_comandlal")
                ->get();
                return $comandlal;
            }
            if (Auth::user()->user_type === "comandlalAdmin" || Auth::user()->user_type === "unitAdmin") {
                $getMyComandlal = new all_users();
                $comandlal = DB::table("tb_comandlal")
                ->where("tb_comandlal.id", "=", $getMyComandlal->getUserComandlal()->id)
                ->first();
                $comandlals = DB::table("tb_comandlal")
                ->where("tb_comandlal.id", "=", $getMyComandlal->getUserComandlal()->id)
                ->get();
                $row = array(
                    "firstComandlal" => $comandlal,
                    "getComandlals" => $comandlals,
                );
                return $row;
            }

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

   public function getIDbyUnit(Request $req)
    {
        try {
            if (Auth::user()->user_type === "superAdmin" || Auth::user()->user_type === "comandlalAdmin" || Auth::user()->user_type === "gsmafAdmin" || Auth::user()->user_type === "batalionAdmin") {
                $units = DB::table("tb_unit")
                ->where("comandlalID", "=", $req->_comandlalID)
                ->get();
                return $units;
            }

            if ( Auth::user()->user_type === "unitAdmin") {
                $getMyUnit = new all_users();
                $unit = DB::table("tb_unit")
                ->where("tb_unit.comandlalID", "=", $req->_comandlalID)
                ->where("tb_unit.id", "=", $getMyUnit->getUserUnit()->id)
                ->first();
                $units = DB::table("tb_unit")
                ->where("tb_unit.comandlalID", "=", $req->_comandlalID)
                ->where("tb_unit.id", "=", $getMyUnit->getUserUnit()->id)
                ->get();
                $row = array(
                    "firstUnit" => $unit,
                    "getUnits" => $units,
                );
                return $row;
            }

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


    public function getUnitSubByIdUnit(Request $req){
        try {
            $unitSub = DB::table("tb_unit_sub")->where("unitID", "=", $req->unitID)->get();
            return $unitSub;
        } catch (\Throwable $th) {
            return response(
                "aldaa garlaa", 500
            );
        }
    }

    public function newAdminStore(Request $req){
        try {

            if(!$this->checkEmail($req->email)){
                return response(
                    array(
                        "msg" => "Цахим хаяг бүртгэлтэй байна."
                    ), 500
                );
            }
            if(!$this->checkPhone($req->phone)){
                return response(
                    array(
                        "msg" => "Утасны дугаар бүртгэлтэй байна."
                    ), 500
                );
            }
            if(!$this->checkRD($req->rd)){
                $rd = all_users::where("rd", "=", $req->rd)->first();
                $getPkoUserRowCount = User::where("allUsersID", "=", $rd->id)->count();
                if($getPkoUserRowCount === 0)
                {
                    // pko usert insert hiine
                    $quickpass = substr( str_shuffle( str_repeat( 'abcdefghijklmnopqrstuvwxyz0123456789', 10 ) ), 0, 10 );
                    $user =  new User();
                    $user->allUsersID = $rd->id;
                    $user->permission = Auth::user()->id;
                    $user->user_type = $req->userType;
                    $user->phone = $req->phone;
                    $user->email = $req->email;
                    $user->password = Hash::make($quickpass);
                    $user->pinCode = Hash::make(1234);
                    $user->save();
                }
                else{
                    return response(
                        array(
                            "msg" => "Регистрийн дугаар бүртгэлтэй байна."
                        ), 500
                    );
                }

            }



                // zuragtai holbootoi heseg
                if($req->pkoImage != ""){
                    $todayDate = Carbon::now()->format('Y-m-d');
                    $image_64 = $req->pkoImage;
                    $setImagePathID = rand(9, 99999999)."_".$todayDate;

                    $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
                    $replace = substr($image_64, 0, strpos($image_64, ',')+1);
                    $image = str_replace($replace, '', $image_64);
                    $image = str_replace(' ', '+', $image);
                    // $imageName = Str::random(10).'.'.$extension;
                    $path = 'public/profile/'.$setImagePathID.".".$extension;

                    Storage::disk('local')->put($path, base64_decode($image));

                    $getImageUrl = '/profile'.'/'.$setImagePathID.".".$extension;
                }
                //zuragtai holbootoi heseg end duusna


            $all_user = new all_users();
            $all_user->comandlalID = $req->comandlal;
            $all_user->unitID = $req->unit;
            $all_user->rankParentID = $req->rankParentID;
            $all_user->rankTypeID = $req->rankTypeID;
            $all_user->rankID = $req->rankID;
            $all_user->firstName = $req->firstName;
            $all_user->lastName = $req->lastName;
            $all_user->rd = $req->rd;
            $resultAge =  $this->calculateAge($req->rd);
            // $all_user->gender = $resultAge['gender'];
            $all_user->age = $resultAge['age'];
            $all_user->gender = $req->gender;
            // $all_user->age = $req->age;
            $all_user->position = $req->position;
            if($req->pkoImage != ""){
                $all_user->image = $getImageUrl;
            }
            $all_user->foreignPass = $req->foreignPass;
            if($req->foreignFinishDate != "" || $req->foreignFinishDate != null){
                $all_user->foreignFinishDate = $req->foreignFinishDate;
            }

            $all_user->phone= $req->phone;
            $all_user->email = $req->email;
            $all_user->save();



            $quickpass = substr( str_shuffle( str_repeat( 'abcdefghijklmnopqrstuvwxyz0123456789', 10 ) ), 0, 10 );
            $user =  new User();
            $user->allUsersID = $all_user->id;
            $user->permission = Auth::user()->id;
            $user->user_type = $req->userType;
            $user->phone = $req->phone;
            $user->email = $req->email;
            $user->password = Hash::make($quickpass);
            $user->pinCode = Hash::make(1234);
            $user->save();

            Notification::route('mail', $user->email)->notify(new EmailRegisteredNotification());

            return response(
                array(
                    "msg" => "Амжилттай хадгаллаа, бүртгүүлсэн тухай мэдэгдлийг ЦАХ-ийн мэйл хаягруу илгээсэн. "
                ), 201
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }


    //nas gender oloh heseg
    public function calculateAge($rd){
       try {
        //rd-ees nas oloh
        $currentYear = (int)Carbon::now()->format('Y');
        $yearOfBirth = substr($rd, 4, 2);
        if($yearOfBirth > 40){
            $age = $currentYear - (1900 + $yearOfBirth);
        }
        if($yearOfBirth < 60){
            $age = $currentYear - (2000 + $yearOfBirth);
        }

        //rd-ees nas oloh

        //rd-ees gender oloh heseg
        // $genderDigit = (int)substr($registrationNumber, 9, 2);
        // $gender = ($genderDigit % 2 === 0) ? 22 : 11;
         //rd-ees gender oloh heseg

         return [
             'age' => $age,
            //  'gender' => $gender,
         ];
       } catch (\Throwable $th) {
        return response(
                    array(
                        "msg" => "Алдаа гарлаа."
                    ), 500
                );
       }
    }
    //nas gender oloh heseg

    public function editUser(Request $req){
        try {

            // $getComandlalID = BT_Unit::find($req->unit);

             $user =  User::find($req->id);
            // $user->allUsersID = $all_user->id;
            // $user->permission = Auth::user()->id;
            $user->user_type = $req->user_type;
            $user->phone = $req->phone;
            $user->email = $req->email;
            // $user->password = Hash::make(123456789);
            // $user->pinCode = Hash::make(1234);
            $user->save();



            // zuragtai holbootoi heseg
            if($req->pkoImage != "" && strlen($req->pkoImage) >50){
                //image delete
                $deleteImage = all_users::find($user->allUsersID);
                if($deleteImage->image != "0"){
                Storage::delete('public' . $deleteImage->image);
                }
                //image delete
                $todayDate = Carbon::now()->format('Y-m-d');
                $image_64 = $req->pkoImage;
                $setImagePathID = rand(9, 99999999)."_".$todayDate;

                $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
                $replace = substr($image_64, 0, strpos($image_64, ',')+1);
                $image = str_replace($replace, '', $image_64);
                $image = str_replace(' ', '+', $image);
                // $imageName = Str::random(10).'.'.$extension;
                $path = 'public/profile/'.$setImagePathID.".".$extension;

                Storage::disk('local')->put($path, base64_decode($image));

                $getImageUrl = '/profile'.'/'.$setImagePathID.".".$extension;
            } else{
                $getImageUrl = $req->pkoImage;
            }
            //zuragtai holbootoi heseg end duusna

            $all_user = all_users::find($user->allUsersID);
            $all_user->comandlalID = $req->comandlal;
            $all_user->unitID = $req->unit;
            $all_user->rankParentID = $req->rankParentID;
            $all_user->rankTypeID = $req->rankTypeID;
            $all_user->rankID = $req->rankID;
            $all_user->firstName = $req->firstName;
            $all_user->lastName = $req->lastName;
            $all_user->rd = $req->rd;
            $resultAge =  $this->calculateAge($req->rd);
            $all_user->gender = $req->gender;
            $all_user->age = $resultAge['age'];
            $all_user->position = $req->position;
            if($req->pkoImage != ""){
                $all_user->image = $getImageUrl;
            }
            $all_user->foreignPass = $req->foreignPass;
            if($req->foreignFinishDate != "" || $req->foreignFinishDate != null){
                $all_user->foreignFinishDate = $req->foreignFinishDate;
            }
            $all_user->phone= $req->phone;
            $all_user->email= $req->email;
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


    // public function deleteAdmin(Request $req){
    //     try {
    //         $user = User::find($req->id);
    //         $deleteImage = all_users::find($user->allUsersID);
    //         if($deleteImage->image != "0"){
    //             Storage::delete('public' . $deleteImage->image);
    //         }
    //         $deleteImage->delete();
    //         $user->delete();
    //         return response(
    //             array("msg" => "Амжилттай утсгалаа"), 200
    //         );
    //     } catch (\Throwable $th) {
    //         return response(
    //             array(
    //                 "msg" => "Алдаа гарлаа."
    //             ), 500
    //         );
    //     }
    // }



    public function tokenTegleh(Request $req){
        try {
            $user = User::find($req->id);
            $user->remember_token = 0;
            $user->save();
            return response(
                array("msg" => "Амжилттай тэглэлээ"), 200
            );
        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }


    public function changePassword(Request $req){
        try {
                if(!Hash::check($req->oldPassword, Auth::user()->password)){
                    return response(
                        array(
                            "msg" => "Хуучин нууц үг таарахгүй байна."
                        ),500
                    );
                }else{
                    $user = User::find(Auth::user()->id);
                    $user->password = Hash::make($req->newPassword);
                    $user->save();

                }

                return response(
                    array("msg" => "Нууц үг солигдлоо."),201
                );

        } catch (\Throwable $th) {
            return response(
                array("msg" => "Сервер алдаа"),500
            );
        }
    }

    public function resetPassword(Request $req){
        try {
            $user = User::find($req->id);
            $user->pinCode = Hash::make($req->pinCode);
            $user->save();
            return response(
                array("msg" => "Амжилттай сэргээллээ."), 201
            );

        } catch (\Throwable $th) {
            return response(
                array("msg" => "Серверд алдаа гарлаа."), 500
            );
        }
    }


    // Өмнөн бүртгэлтэй эсэхийг энд шалгана
    public function checkEmail($email){
        $user = User::where("email", "=", $email)->get();
        if(count($user) == 0)
            return true;
        else
            return false;
    }
    public function checkPhone($phone){
        $user = User::where("phone", "=", $phone)->get();
        if(count($user) == 0)
            return true;
        else
            return false;
    }
    public function checkRD($rd){
        $rd = all_users::where("rd", "=", $rd)->get();
        if(count($rd) == 0)
            return true;
        else
            return false;
    }
    // Өмнөн бүртгэлтэй эсэхийг шалгах функц энд дуусна

    public function nootsruuShiljuuleh(Request $req){
        try {
            $user = User::find($req->id);
            $all_user = all_users::find($user->allUsersID);
            $all_user->comandlalID = 0;
            $all_user->unitID = 0;
            $all_user->dundiinTulv = 1;
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




    //Төрийн цэргийн байгууллагууд квотод тааруулж бүртгэл хийнэ
    public function otherAdminNew(Request $req){
        try {
            $myComID = new all_users();
            $myComFirstRow = $myComID->getUserComandlal();
            $covotSum = DB::table("pko_covot_comandlal")
            ->where("pko_covot_comandlal.comandlalID", "=", $myComFirstRow->id)
            ->first()->covotComandlalSum;


            $allBurtgegdsen = DB::table("all_users")
            ->where("all_users.comandlalID", "=", 12)
            ->get();

            $comCount = 0;
            foreach ($allBurtgegdsen as  $unitUserteiTentsuu) {
                $count = DB::table("pko_users")
                ->where("pko_users.allUsersID", "=", $unitUserteiTentsuu->id)
                ->where("pko_users.user_type", "=", "unitUser")
                ->count();
                $comCount += $count;
            }

        if ($covotSum > $comCount){

                    if(!$this->checkEmail($req->email)){
                        return response(
                            array(
                                "msg" => "Цахим хаяг бүртгэлтэй байна."
                            ), 500
                        );
                    }
                    if(!$this->checkPhone($req->phone)){
                        return response(
                            array(
                                "msg" => "Утасны дугаар бүртгэлтэй байна."
                            ), 500
                        );
                    }
                    if(!$this->checkRD($req->rd)){
                        $rd = all_users::where("rd", "=", $req->rd)->first();
                        $getPkoUserRowCount = User::where("allUsersID", "=", $rd->id)->count();
                        if($getPkoUserRowCount === 0)
                        {
                            // pko usert insert hiine
                            $quickpass = substr( str_shuffle( str_repeat( 'abcdefghijklmnopqrstuvwxyz0123456789', 10 ) ), 0, 10 );
                            $user =  new User();
                            $user->allUsersID = $rd->id;
                            $user->permission = Auth::user()->id;
                            $user->user_type = $req->userType;
                            $user->phone = $req->phone;
                            $user->email = $req->email;
                            $user->password = Hash::make($quickpass);
                            $user->pinCode = Hash::make(1234);
                            $user->save();
                        }
                        else{
                            return response(
                                array(
                                    "msg" => "Регистрийн дугаар бүртгэлтэй байна."
                                ), 500
                            );
                        }

                    }

                    // zuragtai holbootoi heseg
                    if($req->pkoImage != ""){
                        $todayDate = Carbon::now()->format('Y-m-d');
                        $image_64 = $req->pkoImage;
                        $setImagePathID = rand(9, 99999999)."_".$todayDate;

                        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];
                        $replace = substr($image_64, 0, strpos($image_64, ',')+1);
                        $image = str_replace($replace, '', $image_64);
                        $image = str_replace(' ', '+', $image);
                        // $imageName = Str::random(10).'.'.$extension;
                        $path = 'public/profile/'.$setImagePathID.".".$extension;

                        Storage::disk('local')->put($path, base64_decode($image));

                        $getImageUrl = '/profile'.'/'.$setImagePathID.".".$extension;
                    }
                    //zuragtai holbootoi heseg end duusna

                    $all_user = new all_users();
                    $all_user->comandlalID = $req->comandlal;
                    $all_user->unitID = $req->unit;
                    $all_user->rankParentID = $req->rankParentID;
                    $all_user->rankTypeID = $req->rankTypeID;
                    $all_user->rankID = $req->rankID;
                    $all_user->firstName = $req->firstName;
                    $all_user->lastName = $req->lastName;
                    $all_user->rd = $req->rd;
                    $all_user->gender = $req->gender;
                    $all_user->age = $req->age;
                    $all_user->position = $req->position;
                    if($req->pkoImage != ""){
                        $all_user->image = $getImageUrl;
                    }
                    $all_user->foreignPass = $req->foreignPass;
                    if($req->foreignFinishDate != "" || $req->foreignFinishDate != null){
                        $all_user->foreignFinishDate = $req->foreignFinishDate;
                    }

                    $all_user->phone= $req->phone;
                    $all_user->email = $req->email;
                    $all_user->save();

                    $quickpass = substr( str_shuffle( str_repeat( 'abcdefghijklmnopqrstuvwxyz0123456789', 10 ) ), 0, 10 );
                    $user =  new User();
                    $user->allUsersID = $all_user->id;
                    $user->permission = Auth::user()->id;
                    $user->user_type = $req->userType;
                    $user->phone = $req->phone;
                    $user->email = $req->email;
                    $user->password = Hash::make($quickpass);
                    $user->pinCode = Hash::make(1234);
                    $user->save();
                    return response(
                        array(
                            "msg" => "Амжилттай хадгаллаа."
                        ), 201
                    );
        } else {
            return response(
                array(
                    "msg" => "Уучлаарай бүртгэх боломжгүй, бүртгэл квотын тоонд хүрсэн байна."
                ), 500
            );
        }

        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

    //newtersen adminii comandlal id
    public function myAdminComID(){
        try {
            $myComID = new all_users();
            $myComFirstRow = $myComID->getUserComandlal();
            $myComID = DB::table("tb_comandlal")
            ->where("tb_comandlal.id", "=", $myComFirstRow->id)
            ->first()->id;
            return $myComID;
        } catch (\Throwable $th) {
            return response(
                array(
                    "msg" => "Алдаа гарлаа."
                ), 500
            );
        }
    }

// MAF_peacekeeper operation function end
}
