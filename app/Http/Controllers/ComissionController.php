<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Health;
use App\Models\Sport;
use App\Models\SportChanged;
use Illuminate\Support\Facades\DB;

class ComissionController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    //Эрүүл мэнд
   public function sendRequest(Request $req){
    try {
       $sendReq = Health::find($req->id);
       $sendReq->healthEdit = 1;
       $sendReq->healthEditDes = $req->healthEditDes;
       $sendReq->save();
       return response(
        array(
            "status" => "success",
            "msg" => "Амжилттай илгээлээ.",

        ), 200);
    } catch (\Throwable $th) {
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
   }

   public function getComissionHealth(Request $req){
    try {
      $getHealth = DB::table("pko_health")
      ->where("pko_health.missionID", "=", $req->_missionID)
      ->where("pko_health.eeljID", "=", $req->_eeljID)
      ->where("pko_health.healthEdit", "=", 1)
      ->join("pko_missions", function($query){
        $query->on("pko_health.missionID", "=", "pko_missions.id");
        })
      ->join("pko_mission_eelj", function($query){
        $query->on("pko_health.eeljID", "=", "pko_mission_eelj.id");
        })
      ->join("pko_main_history", function($query){
            $query->on("pko_health.pkoMainHistoryID", "=", "pko_main_history.id");
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
      ->select("pko_health.*", "all_users.rd", "all_users.lastName", "all_users.firstName", "all_users.position", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "tb_ranks.shortRank", "pko_missions.missionName", "pko_mission_eelj.eeljName")
      ->get();
      return $getHealth;
    } catch (\Throwable $th) {
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
   }

   public function healtConfirm(Request $req){
    try {
       $confirm = Health::find($req->id);
       $confirm->healthEdit = 2;
       $confirm->save();
       return response(
        array(
            "status" => "success",
            "msg" => "Зөвшөөрлөө.",

        ), 200);
    } catch (\Throwable $th) {
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
   }

   public function healtDecline(Request $req){
    try {
       $confirm = Health::find($req->id);
       $confirm->healthEdit = 3;
       $confirm->save();
       return response(
        array(
            "status" => "success",
            "msg" => "Татгалзлаа.",

        ), 200);
    } catch (\Throwable $th) {
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
   }
   //Эрүүл мэнд энд дуусна

   //Спорт

//    public function sendSport(Request $req){
//     try {
//        $sendReq = Sport::find($req->id);
//        $sendReq->sportEdit = 1;
//        $sendReq->sportEditDes = $req->sportEditDes;
//        $sendReq->save();
//        return response(
//         array(
//             "status" => "success",
//             "msg" => "Амжилттай илгээлээ.",

//         ), 200);
//     } catch (\Throwable $th) {
//         return response(
//             array(
//                 "status" => "error",
//                 "msg" => "Алдаа гарлаа"
//             ), 500);
//     }
//    }

   public function changedSport(Request $req){
    try {
       $sendReq = SportChanged::find($req->id);
       $sendReq->sportEdit = 1;
       $sendReq->sportEditDes = $req->sportEditDes;
       $sendReq->save();
       return response(
        array(
            "status" => "success",
            "msg" => "Амжилттай илгээлээ.",

        ), 200);
    } catch (\Throwable $th) {
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
   }


   public function getComissionSport(Request $req){
    try {
      $getSport = DB::table("pko_sport_changed")
      ->where("pko_sport_changed.missionID", "=", $req->_missionID)
      ->where("pko_sport_changed.eeljID", "=", $req->_eeljID)
      ->where("pko_sport_changed.sportEdit", "=", 1)
      ->join("pko_missions", function($query){
        $query->on("pko_sport_changed.missionID", "=", "pko_missions.id");
        })
      ->join("pko_mission_eelj", function($query){
        $query->on("pko_sport_changed.eeljID", "=", "pko_mission_eelj.id");
        })
      ->join("pko_main_history", function($query){
            $query->on("pko_sport_changed.pkoMainHistoryID", "=", "pko_main_history.id");
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
      ->join("tb_gender", function($query){
        $query->on("pko_sport_changed.genderID", "=", "tb_gender.id");
        })
      ->select("pko_sport_changed.*", "all_users.rd", "all_users.lastName", "all_users.firstName", "all_users.position", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "tb_ranks.shortRank",  "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
      ->get();
      return $getSport;
    } catch (\Throwable $th) {
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
   }
//    public function getComissionSport(Request $req){
//     try {
//       $getSport = DB::table("pko_sport_score")
//       ->where("pko_sport_score.missionID", "=", $req->_missionID)
//       ->where("pko_sport_score.eeljID", "=", $req->_eeljID)
//       ->where("pko_sport_score.sportEdit", "=", 1)
//       ->join("pko_missions", function($query){
//         $query->on("pko_sport_score.missionID", "=", "pko_missions.id");
//         })
//       ->join("pko_mission_eelj", function($query){
//         $query->on("pko_sport_score.eeljID", "=", "pko_mission_eelj.id");
//         })
//       ->join("pko_main_history", function($query){
//             $query->on("pko_sport_score.pkoMainHistoryID", "=", "pko_main_history.id");
//       })
//       ->join("pko_users", function($query){
//             $query->on("pko_main_history.pkoUserID", "=", "pko_users.id");
//       })
//       ->join("all_users", function($query)use($req){
//             $query->on("pko_users.allUsersID", "=", "all_users.id");
//             if($req->_comandlalID != ""){
//                 $query->where("all_users.comandlalID", "=", $req->_comandlalID);
//                 if($req->_unitID != ""){
//                     $query->where("all_users.unitID", "=", $req->_unitID);
//                 }
//             }
//       })

//       ->join("tb_comandlal", function($query){
//         $query->on("all_users.comandlalID", "=", "tb_comandlal.id");
//         })
//       ->join("tb_unit", function($query){
//         $query->on("all_users.unitID", "=", "tb_unit.id");
//         })
//       ->join("tb_ranks", function($query){
//         $query->on("all_users.rankID", "=", "tb_ranks.id");
//         })
//       ->join("pko_sport_type", function($query){
//         $query->on("pko_sport_score.sportTypeID", "=", "pko_sport_type.id");
//         })
//       ->join("tb_gender", function($query){
//         $query->on("pko_sport_score.genderID", "=", "tb_gender.id");
//         })
//       ->select("pko_sport_score.*", "all_users.rd", "all_users.lastName", "all_users.firstName", "all_users.position", "tb_comandlal.comandlalShortName", "tb_unit.unitShortName", "tb_ranks.shortRank", "pko_sport_type.sportTypeName", "tb_gender.genderName", "pko_missions.missionName", "pko_mission_eelj.eeljName")
//       ->get();
//       return $getSport;
//     } catch (\Throwable $th) {
//         return response(
//             array(
//                 "status" => "error",
//                 "msg" => "Алдаа гарлаа"
//             ), 500);
//     }
//    }


   public function sportConfirm(Request $req){
    try {
    //    $confirm = Sport::find($req->id);
       $confirm = SportChanged::find($req->id);
       $confirm->sportEdit = 2;
       $confirm->save();
       return response(
        array(
            "status" => "success",
            "msg" => "Зөвшөөрлөө.",

        ), 200);
    } catch (\Throwable $th) {
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
   }

   public function sportDecline(Request $req){
    try {
    //    $confirm = Sport::find($req->id);
       $confirm = SportChanged::find($req->id);
       $confirm->sportEdit = 3;
       $confirm->save();
       return response(
        array(
            "status" => "success",
            "msg" => "Татгалзлаа.",

        ), 200);
    } catch (\Throwable $th) {
        return response(
            array(
                "status" => "error",
                "msg" => "Алдаа гарлаа"
            ), 500);
    }
   }
   //Спорт энд дуусна
}
