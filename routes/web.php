<?php

use App\Http\Controllers\FrontendController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AirplaneController;
use App\Http\Controllers\AirplaneShiftItemController;
use App\Http\Controllers\AllAdminController;
use App\Http\Controllers\ComandlalController;
use App\Http\Controllers\UserInfoController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UnitSubController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\AllRanksController;
use App\Http\Controllers\BatalionOronTooController;
use App\Http\Controllers\CanceledTypeController;
use App\Http\Controllers\CovotController;
use App\Http\Controllers\DocumentItemController;
use App\Http\Controllers\DocumentUnitController;
use App\Http\Controllers\EeljController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\SportTypeController;
use App\Http\Controllers\UuregApplauseController;
use App\Http\Controllers\UuregApplauseSubController;
use App\Http\Controllers\WishController;
use App\Http\Controllers\RequserController;
use App\Http\Controllers\DocumentComandlalController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\MissionStructure;
use App\Http\Controllers\SportController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ZarlanController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ComissionController;
use App\Http\Controllers\ComplaintsController;
use App\Http\Controllers\DocumentHardagController;
use App\Http\Controllers\DocumentSuperController;
use App\Http\Controllers\DocumentUserController;
use App\Http\Controllers\ForeignPassController;
use App\Http\Controllers\MainHistoryController;
use App\Http\Controllers\ReqdateController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\UserQuestionController;
use App\Http\Controllers\UuregGuitsetgeltController;
use App\Http\Controllers\FaceController;
use App\Http\Controllers\KingController;
use App\Http\Controllers\MissionHistoryController;
use App\Http\Controllers\NoobController;
use App\Http\Controllers\SelengeController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\OfficerQuestionController;
use App\Http\Controllers\OffResearchController;
use App\Http\Controllers\DocumentOfficerController;
use App\Http\Controllers\HealthOfficerController;
use App\Http\Controllers\SportOfficerController;
use App\Models\Airplane;
use App\Models\AirplaneArrived;
use App\Models\AirplaneShiftItem;
use App\Models\all_users;
use App\Models\BatalionOronToo;
use App\Models\BT_Comandlal;
use App\Models\BT_Unit;
use App\Models\BT_UnitSub;
use App\Models\Canceled;
use App\Models\CanceledType;
use App\Models\ComandlalCovot;
use App\Models\Control;
use App\Models\DocumentItem;
use App\Models\Gender;
use App\Models\Mission;
use App\Models\Eelj;
use App\Models\MainHistory;
use App\Models\SportType;
use App\Models\UnitCovot;
use App\Models\UuregApplause;
use App\Models\UuregApplauseSub;
use App\Models\Wish;
use App\Models\ComDocMain;
use App\Models\Complaints;
use App\Models\Crime;
use App\Models\ForeignPass;
use App\Models\Health;
use App\Models\HealthDepartment;
use App\Models\LanguageScore;
use App\Models\LanguageType;
use App\Models\MissionHistory;
use App\Models\MissionPosition;
use App\Models\MissionRot;
use App\Models\MissionSalaa;
use App\Models\MissionTasag;
use App\Models\Sport;
use App\Models\UuregGuitsetgelt;
use App\Models\YearWish;
use App\Models\BT_recommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\OfficerMainHistory;

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::post('/logout',[App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');
});

Route::get('front', [FaceController::class, "show"]);

Route::get('/', [FrontendController::class, "showBlade"])->name('home');
Auth::routes(['register' => false, 'verify' => true]);
Route::get("/user/info", [AdminController::class, "getLoggedUser"]);

Route::get("show", [ShowController::class, "show"]);

// Route::get('/home', [App\Http\Controllers\AdminController::class, 'showBlade'])->name('home');
Route::post("/get/rank/name", [UserInfoController::class, "getRank"]);
Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});

// get admin about start --> nevtersen admintai holbootoi medeelel
// Route::get("/get/auth/name", [AdminController::class, "getAuthName"]);
Route::get("/get/auth/name", function(){
    $user = new all_users;
        $userName = $user->getUserName();
        return $userName;
});
Route::get("/get/auth/rank", function(){
    $user = new all_users;
        $userName = $user->getUserRank();
        return $userName;
});
Route::get("/get/auth/id", function(){
    $user = new all_users;
        $userId = $user->getUserId();
        return $userId;
});


Route::get("/get/auth", function(){
    $user = new all_users;
        return $user->getUser();
});
Route::get("/get/my/comandlal", function(){
    $user = new all_users;
        return $user->getUserComandlal();
});
Route::get("/get/my/unit", function(){
    $user = new all_users;
        return $user->getUserUnit();
});
Route::get("/get/auth/image", function(){
    $user = new all_users;
        return $user->getUserImage();
});
// get admin about end


// MAF_peacekeeper operation start
// Comandlal start
Route::post("/new/comandlal", [ComandlalController::class, "newComandlal"]);
Route::get("/get/comandlal", function(){
    $user = new BT_Comandlal();
        return $user->getComandlals();
});
Route::get("/get/comandlal/other", function(){
    $user = new BT_Comandlal();
        return $user->getComandlalOther();
});
Route::post("/edit/comandlal", [ComandlalController::class, "editComandlal"]);
Route::post("/delete/comandlal", [ComandlalController::class, "deleteComandlal"]);
Route::post("/get/comandlals", function(){
    $user = new BT_Comandlal();
        return $user->getComandlals();
});
// Comandlal end

// Unit start
Route::post("/new/unit", [UnitController::class, "newUnit"]);
Route::get("/get/unit", function(){
    $unit = new BT_Unit();
        return $unit->getUnit();
});
Route::post("/edit/unit", [UnitController::class, "editUnit"]);
Route::post("/delete/unit", [UnitController::class, "deleteUnit"]);
Route::post("/get/units", [UnitController::class, "getUnits"]);
// Unit end

// UnitSub start
Route::post("/new/unitSub", [UnitSubController::class, "newUnitSub"]);
Route::get("/get/unitSub", function(){
    $unit = new BT_UnitSub();
        return $unit->getUnitSubs();
});
Route::post("/get/unit/byComandlalID", [UnitSubController::class, "getUnitByComandlalID"]);
Route::post("/edit/unitSub", [UnitSubController::class, "editUnitSub"]);
Route::post("/delete/unitSub", [UnitSubController::class, "deleteUnitSub"]);
// UnitSub end

// Admins start
Route::get("/get/amdins", [AdminController::class, "getAdmins"]);
//ЭДЦХАХ-ээс Төрийн цэргийн байгууллагын хэрэглэгчийг асуумж хүсэлтийг давуулж нэмэнх хэсэг
Route::get("/get/super/admins", [AdminController::class, "getSuperAdmins"]);
Route::post("/new/super/admin", [AdminController::class, "newSuperAdmin"]);
Route::post("/edit/super/users", [AdminController::class, "editSuperAdmin"]);
// Route::post("/delete/super/admin", [AdminController::class, "deleteSuperAdmin"]);
//ЭДЦХАХ-ээс Төрийн цэргийн байгууллагын хэрэглэгчийг асуумж хүсэлтийг давуулж нэмэнх хэсэг
Route::post("/new/admin", [AdminController::class, "newAdminStore"]);
Route::post("/edit/units", [AdminController::class, "editUser"]);
// Route::post("/delete/admin", [AdminController::class, "deleteAdmin"]);
Route::post("/nootsruu/shiljuuleh", [AdminController::class, "nootsruuShiljuuleh"]);
Route::post("/token/tegleh", [AdminController::class, "tokenTegleh"]);
Route::post("/change/password", [AdminController::class, "changePassword"]);
Route::post("/reset/password", [AdminController::class, "resetPassword"]);
Route::post("/get/gender/admin", function(){
    $unit = new Gender();
    return $unit->getGender();
});
Route::post("/get/ID/byComandlal", [AdminController::class, "getIDbyComandlal"]);
Route::get("/get/Com/ID", [AdminController::class, "getComID"]);
Route::get("/get/Unit/ID", [AdminController::class, "getUnitID"]);
Route::post("/get/ID/byUnit", [AdminController::class, "getIDbyUnit"]);
Route::post("/get/unit/sub/byIdUnit", [AdminController::class, "getUnitSubByIdUnit"]);
Route::post("/other/new/admin", [AdminController::class, "otherAdminNew"]);
Route::get("/my/admin/com/id", [AdminController::class, "myAdminComID"]);
// Admins end

// All admins start
Route::get("/get/all/amdins", [AllAdminController::class, "getAllAdmins"]);
Route::post("/angiruu/shiljuuleh", [AllAdminController::class, "angiruuShiljuuleh"]);
Route::get("/get/comandlal/users", [AllAdminController::class, "getComandlalUser"]);
Route::get("/get/dundiin/tuluv", [AllAdminController::class, "getDundiinTuluv"]);
Route::post("/user/erh/zasah", [AllAdminController::class, "userErhZasah"]);
// All admins end

// Ranks start --> negneesee hamaaraltai uchraas neg controller deer hiisen
Route::post("/get/rankParent", [AllRanksController::class, "getRankParent"]);
Route::post("/get/type/byParentID", [AllRanksController::class, "getTypeByParentID"]);
Route::post("/get/rank/byTypeID", [AllRanksController::class, "getRankByTypeID"]);
// Ranks end

// Рот салаа тасаг албан тушаал start --> negneesee hamaaraltai uchraas neg controller deer hiisen
Route::post("/get/rot", function(Request $req){
    $getRot = new MissionRot();
        return $getRot->getRot($req);
});
Route::post("/get/salaa", function(Request $req){
    $getSalaa = new MissionSalaa();
        return $getSalaa->getSalaa($req);
});
Route::post("/get/salaa/by/rotID", function(Request $req){
    $getSalaaID = new MissionSalaa();
        return $getSalaaID->getSalaaByRotID($req);
});
Route::post("/get/tasag", function(Request $req){
    $getTasag = new MissionTasag();
        return $getTasag->getTasag($req);
});
Route::post("/get/tasag/by/salaaID", function(Request $req){
    $getTasagID = new MissionTasag();
        return $getTasagID->getTasagBySalaaID($req);
});
Route::post("/get/position", function(Request $req){
    $getPosition = new MissionPosition();
        return $getPosition->getPosition($req);
});
Route::post("/get/position/by/tasagID", function(Request $req){
    $getPositionID = new MissionPosition();
        return $getPositionID->getPositionByTasagID($req);
});
Route::post("/new/rot", [MissionStructure::class, "newRot"]);
Route::post("/edit/rot", [MissionStructure::class, "editRot"]);
Route::post("/delete/rot", [MissionStructure::class, "deleteRot"]);
Route::post("/new/salaa", [MissionStructure::class, "newSalaa"]);
Route::post("/edit/salaa", [MissionStructure::class, "editSalaa"]);
Route::post("/delete/salaa", [MissionStructure::class, "deleteSalaa"]);
Route::post("/new/tasag", [MissionStructure::class, "newTasag"]);
Route::post("/edit/tasag", [MissionStructure::class, "editTasag"]);
Route::post("/delete/tasag", [MissionStructure::class, "deleteTasag"]);
Route::post("/new/position", [MissionStructure::class, "newPosition"]);
Route::post("/edit/position", [MissionStructure::class, "editPosition"]);
Route::post("/delete/position", [MissionStructure::class, "deletePosition"]);
// Рот салаа тасаг албан тушаал end

//Mission start
Route::get("/get/missions", function(){
    $missions = new Mission();
        return $missions->getMissions();
});
Route::post("/new/mission", [MissionController::class, "newMission"]);
Route::post("/edit/mission", [MissionController::class, "editMission"]);
Route::post("/delete/mission", [MissionController::class, "deleteMission"]);
//Mission end

//Eelj start
Route::get("/get/eeljs", function(){
    $eelj = new Eelj();
        return $eelj->getEeljs();
});
Route::post("/new/eelj", [EeljController::class, "newEelj"]);
Route::post("/edit/eelj", [EeljController::class, "editEelj"]);
Route::post("/delete/eelj", [EeljController::class, "deleteEelj"]);
Route::post("/get/eelj/by/missionID", function(Request $req){
    $eeljByMission = new Eelj();
        return $eeljByMission->getEeljByMissionID($req);
});


//Eelj end

//ReqDate start
Route::get("/get/date", function(){
    $date = new YearWish();
        return $date->getYear();
});

//ReqDate end

//Documents start
//DocumentItems start -> documentiin tuslah san
Route::post("/get/doc/items", function(Request $req){
    $docItem = new DocumentItem();
        return $docItem->getDocItems($req);
});
Route::post("/get/doc/shaardlaga", [DocumentItemController::class, "documentItemiinShaardlaga"]);
Route::post("/new/doc/item", [DocumentItemController::class, "newDocItem"]);
Route::post("/edit/doc/item", [DocumentItemController::class, "editDocItem"]);
Route::post("/delete/doc/item", [DocumentItemController::class, "deleteDocItem"]);
Route::post("/count/doc/items",function(Request $req){
    $countDocItems = new DocumentItem();
        return $countDocItems->countDocItems($req);
});
//DocumentItems end
//Document User start
Route::post("/get/document/user", [DocumentUserController::class, "getDocUser"]);
//Document User end

//Document Unit start
Route::post("/get/document/units", [DocumentUnitController::class, "getDocUnit"]);
Route::post("/get/document/child", [DocumentUnitController::class, "getDocUnitChild"]);
Route::post("/new/document/child", [DocumentUnitController::class, "newDocUnitChild"]);
Route::post("/edit/document/child", [DocumentUnitController::class, "editDocUnitChild"]);
Route::post("/delete/document/child", [DocumentUnitController::class, "deleteDocUnitChild"]);
Route::post("/get/document/description", [DocumentUnitController::class, "getDocUnitDes"]);

//document unit end

//Document Comandlal start
Route::post("/get/document/comandlal", [DocumentComandlalController::class, "getDocumentTotal"]);
Route::post("/document/comandlal/confirm", [DocumentComandlalController::class, "documentComandlalConfirm"]);
Route::post("/document/comandlal/decline", [DocumentComandlalController::class, "documentComandlalDecline"]);
Route::post("/get/document/comandlal/child", [DocumentComandlalController::class, "getDocumentComandlalChild"]);
//Document Comandlal end

//document Officer Back start
// Route::post("/get/document/officer/back", [DocumentComandlalController::class, "getDocumentTotal"]);
//document Officer Back end

//Document Super start
Route::post("/get/document/super", [DocumentSuperController::class, "getDocumentSuperTotal"]);
Route::post("/get/document/super/child", [DocumentSuperController::class, "getDocumentSuperChild"]);
Route::post("/document/super/confirm", [DocumentSuperController::class, "documentSuperConfirm"]);
Route::post("/document/super/decline", [DocumentSuperController::class, "documentSuperDecline"]);
//Documentiig hardag super uur erhgui
Route::post("/get/document/hardag/super", [DocumentHardagController::class, "getDocumentHardagSuper"]);
Route::post("/get/document/child/hardag", [DocumentHardagController::class, "getDocumentHardagChild"]);


//Document Super end
//Documents end

//Sport start
//SportType start -> sportiin tuslah san
Route::post("/get/sport/types", function(Request $req){
    $sportType = new SportType();
        return $sportType->getSportTypes($req);
});
Route::post("/get/gender/sport/types", function(Request $req){
    $sportGenderType = new SportType();
        return $sportGenderType->getGenderSportTypes($req);
});
Route::post("/new/sport/type", [SportTypeController::class, "newSportType"]);
Route::post("/edit/sport/type", [SportTypeController::class, "editSportType"]);
Route::post("/delete/sport/type", [SportTypeController::class, "deleteSportType"]);
Route::post("/get/health/date", [SportTypeController::class, "getHealthDate"]);
//SportType end

//Биеийн тамирын шалгалтын дүнг оруулах хэсэг эндээс эхэлнэ
Route::post("/get/sport/total", function(Request $req){
    $sportTotal = new Sport();
        return $sportTotal->getSportTotal($req);
});
Route::post("/get/sport/child", [SportController::class, "getSportChild"]);
Route::post("/get/sport/edit/btn", [SportController::class, "getEditSport"]);
Route::post("/new/sport/child", [SportController::class, "newSportChild"]);
Route::post("/edit/sport/child", [SportController::class, "editSportChild"]);
Route::post("/delete/sport/child", [SportController::class, "deleteSportChild"]);
Route::get("/get/average", [SportController::class, "scoreAverage"]);
//Энэ жилдээ ганцхан удаа ашиглах спортын оноо оруулах хэсэг
Route::post("/get/sport/changed", [SportController::class, "getSportChanged"]);
Route::post("/new/sport/changed", [SportController::class, "newSportChanged"]);
Route::post("/edit/sport/changed", [SportController::class, "editSportChanged"]);
Route::post("/get/changed/sport/edit/btn", [SportController::class, "getChangedEditSport"]);
Route::post("/changed/comission/send/request/sport", [ComissionController::class, "changedSport"]);
Route::post("/get/sport/men", [SportController::class, "getSportMen"]);
Route::post("/get/sport/women", [SportController::class, "getSportWomen"]);
Route::post("/get/sport/gereet", [SportController::class, "getSportGereet"]);
Route::post("/get/sport/other", [SportController::class, "getSportOther"]);
//Биеийн тамирын шалгалтын дүнг оруулах хэсэг энд дуусна
//Sport end

//Canceled start
//Canceled type start -> cancelediin tuslah san
Route::get("/get/canceled/types", function(){
    $sportType = new CanceledType();
        return $sportType->getCanceledTypes();
});
Route::post("/new/canceled/type", [CanceledTypeController::class, "newCanceledType"]);
Route::post("/edit/canceled/type", [CanceledTypeController::class, "editCanceledType"]);
Route::post("/delete/canceled/type", [CanceledTypeController::class, "deleteCanceledType"]);
//Canceled type end
//Canceled end

//Airplane start
//Airplane shift item -> airplaniin tuslah san
Route::get("/get/airplane/shift/items", function(){
    $airplaneShiftitem = new AirplaneShiftItem();
        return $airplaneShiftitem->getAirplaneShiftItems();
});
Route::get("/get/airplane/arrives", function(){
    $airplaneArrived = new AirplaneArrived();
        return $airplaneArrived->getAirplaneArrived();
});
Route::post("/new/airplane/shift/item", [AirplaneShiftItemController::class, "newAirplaneShiftItem"]);
Route::post("/edit/airplane/shift/item", [AirplaneShiftItemController::class, "editAirplaneShiftItem"]);
Route::post("/delete/airplane/shift/item", [AirplaneShiftItemController::class, "deleteAirplaneShiftItem"]);
//Airplane shift item end
//Airplane end

//Uureg guitsetgelt start
//Uureg guitsetgelt info endees
Route::post("/get/uureg/guitsetgelt/info", function(Request $req){
    $getInfo = new UuregGuitsetgelt();
        return $getInfo->getInfos($req);
});
Route::post("/new/uureg/guitsetgelt/new", [UuregGuitsetgeltController::class, "newUuregGuitsetgelt"]);
Route::post("/edit/uureg/guitsetgelt/new", [UuregGuitsetgeltController::class, "editUuregGuitsetgelt"]);
Route::post("/delete/uureg/guitsetgelt/new", [UuregGuitsetgeltController::class, "deleteUuregGuitsetgelt"]);
Route::post("/get/uureg/guitsetgelt/main", [UuregGuitsetgeltController::class, "getMains"]);
Route::post("/get/ognoo/uureg/guitsetgelt", [UuregGuitsetgeltController::class, "getOgnooApplause"]);
//Uureg guitsetgelt info duusna

//Uureg applause -> uureg guitsetgeltiin tuslah san
Route::get("/get/uureg/applauses", function(){
    $uuregApplauses = new UuregApplause();
        return $uuregApplauses->getUuregApplauses();
});
Route::post("/new/uureg/applause", [UuregApplauseController::class, "newUuregApplause"]);
Route::post("/edit/uureg/applause", [UuregApplauseController::class, "editUuregApplause"]);
Route::post("/delete/uureg/applause", [UuregApplauseController::class, "deleteUuregApplause"]);
//Uureg applause end

//Uureg applause sub -> uureg guitsetgeltiin uureg applausiin tuslah san
Route::get("/get/uureg/applause/subs", function(){
    $applauseSub = new UuregApplauseSub();
        return $applauseSub->getUuregApplauseSubs();
});
Route::post("/new/uureg/applause/sub", [UuregApplauseSubController::class, "newUuregApplauseSub"]);
Route::post("/edit/uureg/applause/sub", [UuregApplauseSubController::class, "editUuregApplauseSub"]);
Route::post("/delete/uureg/applause/sub", [UuregApplauseSubController::class, "deleteUuregApplauseSub"]);
Route::post("/get/sub/by/applauseID", function(Request $req){
    $subByApplause = new UuregApplauseSub();
        return $subByApplause->getSubByApplauseID($req);
});
//Uureg applause sub end
//Uureg guitsetgelt end

//Wish start -> ЦАХ ажиллагаанд явах хүсэлтээ гаргах хэсэг
Route::post("/get/wishes", [WishController::class, "getWish"]);
Route::post("/edit/wish", [WishController::class, "editWish"]);
Route::post("/grapic/wishes", [WishController::class, "grapicWishes"]);

//Wish info ->хүсэлт илгээсэн ЦАХ-ийн нэгдсэн мэдээллийг эндээс харна
Route::post("/get/wish/total/info", function(Request $req){
    $getWishTotalInfo = new Wish();
        return $getWishTotalInfo->getWishTotalInfo($req);
});
//Wish info end

//Он сонгож хүсэлт илгээх хэсгийн туслах сан  Year start
Route::get("/get/years", function(){
    $getYears = new YearWish();
        return $getYears->getYear();
});
Route::post("/new/year", [WishController::class, "newYear"]);
Route::post("/edit/year", [WishController::class, "editYear"]);
Route::post("/delete/year", [WishController::class, "deleteYear"]);
Route::post("/get/year/wish/count", [WishController::class, "getYearWish"]);
Route::get("/get/year/wish/count", [WishController::class, "testshuuu"]);
//Year end
//Wish end

//Covot olgoh start
//Comandlald covot olgoh start
Route::post("/get/comandlal/covots", function(Request $req){
    $comandlalCovot = new ComandlalCovot();
     return $comandlalCovot->getComandlalCovots($req);
});
Route::post("/get/covot/sum/comandlal/in", function(Request $req){
    $comandlalCovot = new ComandlalCovot();
     return $comandlalCovot->getMyComandlalCovotSum($req);
});

Route::post("/new/comandlal/covot", [CovotController::class, "newComandlalCovot"]);
Route::post("/edit/comandlal/covot", [CovotController::class, "editComandlalCovot"]);
Route::post("/delete/comandlal/covot", [CovotController::class, "deleteComandlalCovot"]);

//Comandlald covot olgoh end

//Angid covot olgoh start
Route::post("/get/unit/covots", function(Request $req){
    $unitCovot = new UnitCovot();
     return $unitCovot->getUnitCovots($req);
});
Route::post("/get/covot/sum/unit/in", function(Request $req){
    $comandlalCovot = new UnitCovot();
     return $comandlalCovot->getUnitCovotSum($req);
});
Route::post("/new/unit/covot", [CovotController::class, "newUnitCovot"]);
Route::post("/edit/unit/covot", [CovotController::class, "editUnitCovot"]);
Route::post("/delete/unit/covot", [CovotController::class, "deleteUnitCovot"]);


//Angid covot olgoh end
//Covot olgoh end

// unit users push to histtory start
Route::post("/push/unit/users/to/history", [WishController::class, "unitUsersPushToHistory"]);
// unit users push to histtory end

//Undsen table pko_Main_history start
Route::post("get/main/historys", function(Request $req){
    $getMainHistorys = new MainHistory();
        return $getMainHistorys->getMainHistorys($req);
});
Route::post("/get/count/main", function(Request $req){
    $getCountTsah = new MainHistory();
     return $getCountTsah->getTsahSum($req);
});
Route::post("/get/user/details", [MainHistoryController::class, "getUserDetails"]);
Route::post("/get/user/uureg/guitsetgelt", [MainHistoryController::class, "getUuregGuitsetgelt"]);
//Undsen table pko_Main_history end

//ComMain
Route::post("get/com/main/historys", function(Request $req){
    $getComHistorys = new ComDocMain();
        return $getComHistorys->getComHistorys($req);
});
Route::post("/get/main/comDocument", function(Request $req){
    $getDoc = new ComDocMain();
     return $getDoc->getChildDocuments($req);
});
Route::post("/com/confirm", [DocumentComandlalController::class, "confirm"]);



//Control start -> хүсэлт, зөвшөөрөл нтрийг хаана, нээнэ
Route::post("/get/controls/check", function(Request $req){
    $getControls = new Control();
        return $getControls->getControlCheck($req);
});
Route::post("/is/hide/push/button", function(Request $req){
    $getControls = new Control();
        return $getControls->isHidePushButton($req);
});
Route::post("/is/document/add/button", function(Request $req){
    $getControls = new Control();
        return $getControls->isDocumentAddButton($req);
});
Route::post("/is/sport/add/button", function(Request $req){
    $getControls = new Control();
        return $getControls->isSportAddButton($req);
});
Route::post("/is/request/button", function(Request $req){
    $getControls = new Control();
        return $getControls->isRequestButton($req);
});
Route::post("/is/user/add/button", function(Request $req){
    $getControls = new Control();
        return $getControls->isUserAddButton($req);
});
Route::post("/get/control/make", function(Request $req){
    $getControls = new Control();
        return $getControls->makeControl($req);
});
Route::post("/edit/is/push", function(Request $req){
    $getControls = new Control();
        return $getControls->editPush($req);
});
Route::post("/edit/is/doc/add", function(Request $req){
    $getControls = new Control();
        return $getControls->editDocAdd($req);
});
Route::post("/edit/is/request", function(Request $req){
    $getControls = new Control();
        return $getControls->editRequest($req);
});
Route::post("/edit/is/sport", function(Request $req){
    $getControls = new Control();
        return $getControls->editSport($req);
});
Route::post("/edit/is/tomilogdson", function(Request $req){
    $getControls = new Control();
        return $getControls->editTomilogdson($req);
});
Route::post("/edit/is/user/add", function(Request $req){
    $getControls = new Control();
        return $getControls->editUserAdd($req);
});
//Control end

//Health department approve start
Route::post("/health/department/corfirm", function(Request $req){
    $healthApprove = new HealthDepartment();
        return $healthApprove->healthCorfirm($req);
});
Route::post("/health/department/decline", function(Request $req){
    $healthApprove = new HealthDepartment();
        return $healthApprove->healthDecline($req);
});
Route::post("/get/department/total", function(Request $req){
    $departmentTotal = new HealthDepartment();
        return $departmentTotal->getDepartmentTotal($req);
});
//Health department approve end

//Health start-> Эрүүл мэндийн үзлэгийн дүнг оруулах хэсэг
Route::post("/get/health/total", function(Request $req){
    $healthTotal = new Health();
        return $healthTotal->getHealthTotal($req);
});
Route::post("/get/huudas/total", function(Request $req){
    $huudasTotal = new Health();
        return $huudasTotal->getHuudasTotal($req);
});
Route::post("/is/huudas/olgoh", [HealthController::class, "isHuudasOlgoh"]);
Route::post("/get/health/child", [HealthController::class, "getHealthChild"]);
Route::post("/new/health/child", [HealthController::class, "newHealthChild"]);
Route::post("/edit/health/child", [HealthController::class, "editHealthChild"]);
Route::post("/delete/health/child", [HealthController::class, "deleteHealthChild"]);

//Health end
//Crime start
Route::post("/get/spy/main", function(Request $req){
    $getSpyMain = new Crime();
        return $getSpyMain->getSpyMain($req);
});
// Route::post("/is/crime/confirm", function(Request $req){
//     $getSpyMain = new Crime();
//         return $getSpyMain->isCrimeConfirm($req);
// });
Route::post("/is/crime/decline", function(Request $req){
    $getSpyMain = new Crime();
        return $getSpyMain->isCrimeDecline($req);
});

Route::post("/get/spy/holbogdson", function(Request $req){
    $getSpyHolbogdson = new Crime();
        return $getSpyHolbogdson->isHolbogdson($req);
});
Route::post("/delete/spy/holbogdson", function(Request $req){
    $deleteSpy = new Crime();
        return $deleteSpy->deleteSpyHolbogdson($req);
});
// Route::post("/get/spy/main/description", function(Request $req){
//     $getSpyMainDes = new Crime();
//         return $getSpyMainDes->getSpyMainDes($req);
// });

//Crime end

//Canceled start
Route::post("/get/canceled", function(Request $req){
    $getCanceled = new Canceled();
        return $getCanceled->getCanceledMain($req);
});
Route::post("/get/canceled/total", function(Request $req){
    $getCanceledTotal = new Canceled();
        return $getCanceledTotal->getCanceledTotal($req);
});
Route::post("/get/canceled/tatgalzsan", [CanceledTypeController::class, "getTatgalzsan"]);
Route::post("/delete/tatgalzsan", [CanceledTypeController::class, "deleteTatgalzsan"]);
Route::post("/get/canceled/child", [CanceledTypeController::class, "getCanceledChild"]);
Route::post("/new/canceled/child", [CanceledTypeController::class, "newCanceledChild"]);
Route::post("/edit/canceled/child", [CanceledTypeController::class, "editCanceledChild"]);
Route::post("/delete/canceled/child", [CanceledTypeController::class, "deleteCanceledChild"]);

//Canceled end

//Баталгаатай болсон ЦАХ-чдад батальоны орон тоо оноож өгөх хэсэг -> Batalion oron too start
Route::post("/get/tomilogdson", function(Request $req){
    $getOronToo = new BatalionOronToo();
        return $getOronToo->getTomilogdson($req);
});
Route::post("/get/tomilogdoogui", function(Request $req){
    $getTomilogdoogui = new BatalionOronToo();
        return $getTomilogdoogui->getTomilogdoogui($req);
});
Route::post("/get/noots", function(Request $req){
    $getNoots = new BatalionOronToo();
        return $getNoots->getNoots($req);
});

Route::post("/get/oron/too/child", [BatalionOronTooController::class, "getOronTooChild"]);
Route::post("/new/oron/too/child", [BatalionOronTooController::class, "newOronToo"]);
Route::post("/edit/oron/too/child", [BatalionOronTooController::class, "editOronToo"]);
Route::post("/delete/oron/too/child", [BatalionOronTooController::class, "deleteOronToo"]);

//Batalion oron too end

//Airplane -> Рот салаагаар жагсааж нислэгийн ээлж олгох хэсэг start
Route::post("/get/airplanes", function(Request $req){
    $getAirplanes = new Airplane();
        return $getAirplanes->getAirplaneEeljHiigdeegui($req);
});
Route::post("/get/airplane/total", function(Request $req){
    $getAirplaneTotal = new Airplane();
        return $getAirplaneTotal->getAirplaneTotal($req);
});
Route::get("/get/airplane/test", function(Request $req){
    $getAirplaneTotal = new Airplane();
        return $getAirplaneTotal->test($req);
});
Route::post("/get/airplane/eelj/hiigdsen", [AirplaneController::class, "getEeljHiigdsen"]);
Route::post("/new/airplane/eelj", [AirplaneController::class, "newAirplaneEelj"]);
Route::post("/edit/airplane/eelj", [AirplaneController::class, "editAirplaneEelj"]);
//Airplane end

//Language score start -> Гадаад нэлний шалгалтын оноотой ЦАХ ийг энд бүртгэнэ
//Language types -> Гадаад хэлний төрлийг оруулах туслах сан
Route::get("/get/language/types", function(){
    $getLanguageTypes = new LanguageType();
     return $getLanguageTypes->getLanguageType();
});
Route::post("/new/language/type", [LanguageController::class, "newLanguageType"]);
Route::post("/edit/language/type", [LanguageController::class, "editLanguageType"]);
Route::post("/delete/language/type", [LanguageController::class, "deleteLanguageType"]);
//Language types end
//SCORE
Route::post("/get/language/scored", function(Request $req){
    $getLanguageScored = new LanguageScore();
     return $getLanguageScored->getLanguageScored($req);
});
Route::post("/get/language/no/score", function(Request $req){
    $getLanguageNoScore = new LanguageScore();
     return $getLanguageNoScore->getLanguageNoScore($req);
});
Route::post("/new/language/score", [LanguageController::class, "newLanguageScore"]);
Route::post("/edit/language/score", [LanguageController::class, "editLanguageScore"]);
Route::post("/delete/language/score", [LanguageController::class, "deleteLanguageScore"]);
//Language score end

//Foreign pass finish date -> Тухайн ажиллагаа ээлжид шаардлагатай гадаад паспортын хугацааг энд оруулна. Энийг үндсэн table д бүртгэхээс өмнө шалгана
Route::post("/get/foreign/pass", function(Request $req){
    $getForeignPass = new ForeignPass();
        return $getForeignPass->getForeignPass($req);
});
Route::post("/new/foreign/pass", [ForeignPassController::class, "newForeignPass"]);
Route::post("/edit/foreign/pass", [ForeignPassController::class, "editForeignPass"]);
Route::post("/delete/foreign/pass", [ForeignPassController::class, "deleteForeignPass"]);
//Foreign pass finish date end

//Mission history -> ЦАХ-ын ажиллагаанд явсан түүхийг эндээс харна
Route::post("/get/mission/historys", function(Request $req){
    $getMissionHistory = new MissionHistory();
        return $getMissionHistory->getMissionHistorys($req);
});
Route::post("/new/mission/history", [MissionHistoryController::class, "newMissionHistory"]);
Route::post("/edit/mission/history", [MissionHistoryController::class, "editMissionHistory"]);
Route::post("/delete/mission/history", [MissionHistoryController::class, "deleteMissionHistory"]);
//Mission history end

//Comission health -> Эрүүл мэндийн үзлэгийн хариуг буруу оруулсан тохиолдолд засах хүсэлтээ илгээх хэсэг
Route::post("/comission/send/request", [ComissionController::class, "sendRequest"]);
Route::post("/get/comission/health", [ComissionController::class, "getComissionHealth"]);
Route::post("/comission/health/confirm", [ComissionController::class, "healtConfirm"]);
Route::post("/comission/health/decline", [ComissionController::class, "healtDecline"]);
Route::post("/comission/send/request/sport", [ComissionController::class, "sendSport"]);

Route::post("/get/comission/sport", [ComissionController::class, "getComissionSport"]);
Route::post("/comission/sport/confirm", [ComissionController::class, "sportConfirm"]);
Route::post("/comission/sport/decline", [ComissionController::class, "sportDecline"]);
//Comission health -> end

//Pko user question -> Хүсэлт илгээх ЦАХ-ийн боломжтой эсэхийг тодорхойлох зорилгоор асуумж бөглүүлэх хэсэг
Route::get("/user/question/check", [UserQuestionController::class, "getQuestionCheck"]);
Route::get("/user/question/wish", [UserQuestionController::class, "getUserWish"]);

Route::post("/new/user/question", [UserQuestionController::class, "newQuestion"]);
Route::post("/new/user/requirements", [UserQuestionController::class, "newRequirements"]);
Route::get("/get/requirements", [UserQuestionController::class, "getRequirements"]);
Route::post("/get/question/edit", [UserQuestionController::class, "getQuestionEdit"]);
Route::post("/get/question/hangaagui", [UserQuestionController::class, "getQuestionHangaagui"]);
Route::post("/edit/question/admin", [UserQuestionController::class, "editQuestion"]);
// Route::get("/get/testttt", [UserQuestionController::class, "testssss"]);

Route::post("/first/check/question", [UserQuestionController::class, "firstCheckQuestion"]);
Route::post("/get/question/all", [UserQuestionController::class, "getQuestionAll"]);
Route::post("/get/count/question", [UserQuestionController::class, "getQuestionTotal"]);
//Pko user question end

//PKo user complaints -> Санал гомдол илгээх хэсэг
Route::post("/user/complaints", [ComplaintsController::class, "complaints"]);
Route::get("/get/complaints", [ComplaintsController::class, "getComplaints"]);
Route::post("/get/list/complaints", [ComplaintsController::class, "getListComplaints"]);
//Pko user complaints end

//User profile start
Route::get("/get/user/information", [AdminController::class, "getUserInformation"]);
//User profile end

// MAF_peacekeeper operation end


//word


//Requser
Route::post("/new/requser",[RequserController::class,"plus"]);
Route::post("/new/reqyear",[ReqdateController::class,"plus"]);


//login nemeltF
Route::get("/image", [ImageController::class, "image"]);
Route::get("announcement", [ImageController::class, "announcement"]);
Route::get("about", [ImageController::class, "about"]);



//login image nemeh
//image start
Route::get("/get/album", [ImageController::class, "getalbum"]);
Route::post("/delete/album", [ImageController::class, "deletealbum"]);
Route::post("/new/album", [ImageController::class, "newalbum"]);

//Zarlan start
Route::get("get/announcement", [ZarlanController::class, "getannouncement"]);
Route::post("/delete/announcement", [ZarlanController::class, "deleteannouncement"]);
Route::post("/new/announcement", [ZarlanController::class, "newannouncement"]);

//About
Route::get("/info/onePost/{postID}", [AboutController::class, "showPost"]);
Route::post("/edit/about", [AboutController::class, "edit"]);
Route::get("/get/abouts", [AboutController::class, "getAbout"]);

//Process
Route::get("/get/process", [ProcessController::class, "get"]);

Route::post("/get/check/process", function(Request $req){
    $getProcess = new MainHistory();
        return $getProcess->getProcessCheck($req);
});

// Notify start
Route::get("/get/notify", [ZarlanController::class, "notify"]);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('upload',[ZarlanController::class,'saveImage']);

Route::get('list',[ZarlanController::class,'dataList']);

Route::get('delete/{id}',[ZarlanController::class,'deleteImg']);


Route::get('getLatestRow',[ZarlanController::class,'getLatestRow']);

Route::post('updateNotification',[ZarlanController::class,'updateNotification']);
//Notify end

//Dotor zarlan start
Route::get('get/AnnouncementHistory',[ZarlanController::class,'getHistory']);


Route::get("/send/user", function(){
    $user = new BT_recommendation();
        return $user->getUsers();
});

//zarlan end


//Nuur web date news start
Route::get("/datenews/onePost/{postID}", [FaceController::class, "showPost"]);
//end
//Noob news
Route::get('/noob/news', [NoobController::class, "show"]);
Route::get("/noobnews/onePost/{postID}", [NoobController::class, "showPost"]);
//

//King start
Route::get('/king', [KingController::class, "show"]);
Route::get("/king/onePost/{postID}", [KingController::class, "showPost"]);
//end

//Selenge start
Route::get('/selenge', [SelengeController::class, "show"]);
Route::get("/selenge/onePost/{postID}", [SelengeController::class, "showPost"]);
//end

//Aravt start
// Route::get('/ten', [AravtController::class, "show"]);
// Route::get("/aravt/onePost/{postID}", [AravtController::class, "showPost"]);
//end

//OnePage start
Route::get("/first", [PageController::class, "first"]);
Route::get("/baharhal", [PageController::class, "pride"]);
Route::get("/womens", [PageController::class, "womens"]);
Route::get("/active", [PageController::class, "active"]);
//end

//Image start
Route::get("see/image", [PageController::class, "image"]);
//end


//Admin medee nemeh start
Route::get("get/news", [NewsController::class, "get"]);
Route::post("/delete/news", [NewsController::class, "delete"]);
Route::post("/new/news", [NewsController::class, "new"]);
//end

//Page start
Route::get("Page/new", [PageController::class, "get"]);
Route::post("/edit/page", [PageController::class, "edit"]);
//end

//Video start
Route::get("see/video", [PageController::class, "video"]);
//end

// //zaawar
// Route::get("zaawar", [PageController::class, "zaawarPdf"]);
// //Zaawar
//Zaawar start
Route::get("zaawar", [PageController::class, "zaawar"]);
//end

//Haani neelt
Route::get("ereld", [PageController::class, "ereld"]);
//end

//Haani haalt
Route::get("haalt", [PageController::class, "haalt"]);
//end

//Kaanquest neelt
Route::get("start", [PageController::class, "start"]);
//end

//Kaanquest haalt
Route::get("end", [PageController::class, "end"]);
//end

//Hamtdaa start
Route::get("hamtdaa", [PageController::class, "hamtdaa"]);
//end

// Process tomilgoo
Route::get("get/checkTomilgoo", [ProcessController::class, "tomilgoo"]);
//

//UserPlus
Route::post("/new/PkoMainUnit", [OfficerQuestionController::class, "newPkoMainUnit"]);

//

//Officer start

//OffQuestion start
Route::get("/officer/question/check", [OfficerQuestionController::class, "getOfficerQuestionCheck"]);
Route::get("/officer/question/wish", [OfficerQuestionController::class, "getOfficerWish"]);
Route::post("/first/officer/qcheck", [OfficerQuestionController::class, "firstCheckOffQuestion"]);
Route::post("get/rankType", [OfficerQuestionController::class, "RankType"]);
Route::post("/new/officer/question", [OfficerQuestionController::class, "newofficerQuestion"]);

//Req mission
Route::get("/get/missions2", function () {
    $missions = new Mission();
    return $missions->getMissions2();
});

Route::post("/new/requser2", [RequserController::class, "plus2"]);

//OffResearch start
Route::get("/officer/research/check", [OffResearchController::class, "getOfficerResearchCheck"]);
Route::post("/first/officer/rescheck", [OffResearchController::class, "firstCheckOffResearch"]);
Route::post("/new/officer/research", [OffResearchController::class, "newofficerResearch"]);

//OffDocument
Route::post("/get/document/officer", [DocumentOfficerController::class, "getDocOfficer"]);


//OffMission start
Route::post("/get/eelj/officer/missionID", function (Request $req) {
    $eeljByMission = new Eelj();
    return $eeljByMission->getEeljOfficerMissionID($req);
});


// officer backEnd start
Route::post("get/officer/back/main/historys", function(Request $req){
    $getMainHistorys = new OfficerMainHistory();
        return $getMainHistorys->getMainHistorys($req);
});
Route::post("/get/users/officer/main/history", [HealthOfficerController::class, "getUsersFromOfficerMainHistory"]);

Route::post("/officer/get/health/child", [HealthOfficerController::class, "getHealthChild"]);
Route::post("/officer/new/health/child", [HealthOfficerController::class, "newHealthChild"]);
Route::post("/officer/edit/health/child", [HealthOfficerController::class, "editHealthChild"]);
Route::post("/officer/delete/health/child", [HealthOfficerController::class, "deleteHealthChild"]);
Route::post("/officer/health/total", [HealthOfficerController::class, "getHealthTotal"]);

Route::post("/get/users/officer/main/history/for/sportApprove", [SportOfficerController::class, "getUsersFromOfficerMainHistory"]);










// Route::get("/officer/question/check", [OfficerQuestionController::class, "getOfficerQuestionCheck"]);






Route::any('{catchall}', [FrontendController::class, "showBlade"])->where('catchall', '.*');
