import React from "react";
import { Routes, Route } from "react-router-dom";
import Unit from "../../../../Pages/OptionFund/Angi/Angi/Unit";
import Admins from "../../../../Pages/OptionFund/Admins/Admins";
import ComandlalUsers from "../../../../Pages/OptionFund/AllAdmins/ComandlalUsers";
import DundiinTuluv from "../../../../Pages/OptionFund/AllAdmins/DundiinTuluv";
import AllAdmins from "../../../../Pages/OptionFund/AllAdmins/Admins";
import Comandlal from "../../../../Pages/OptionFund/Angi/Comandlal/Comandlal";
import Salbar from "../../../../Pages/OptionFund/Angi/Salbar/UnitSub";

import AdminPassReset from "../../../../Pages/OptionFund/AdminPasswordReset/AdminPassReset";
import PkoAdmin from "../../../../Pages/OptionFund/Admins/PkoAdmin/PkoAdmin";

//Tuslah sangiin hesguud
//Tuslah sangiin Mission
import Mission from "../../../../Pages/OptionFund/Mission/Mission/Mission";
//Tuslah sangiin Eelj -> Ajillagaanii eeljiin medeelliig oruulna
import Eelj from "../../../../Pages/OptionFund/Mission/Eelj/Eelj";
//DocumentItem
import DocItem from "../../../../Pages/OptionFund/Documents/DocItems/DocItem";
//Sport type
import SportType from "../../../../Pages/OptionFund/Sport/SportType/SportType";
//Canceled type
import CanceledType from "../../../../Pages/OptionFund/Canceled/CanceledType/CanceledType";
//Airplane shift items
import AirplaneShiftItem from "../../../../Pages/OptionFund/Airplane/AirplaneShiftItem/AirplaneShiftItem";
//Uureg applause and punishment
import UuregApplause from "../../../../Pages/OptionFund/UuregGuitsetgelt/UuregApplause/UuregApplause";
//Uureg applause sub -> saishaal shiitgeliin helber
import UuregApplauseSub from "../../../../Pages/OptionFund/UuregGuitsetgelt/UuregApplauseSub/UuregApplauseSub";
//ЦАХ-ын ажиллагаанд явах хүсэлт илгээх хэсэг
import Wish from "../../../../Pages/OptionFund/Wish/Wish";
//Квотыг командлалд олгох хэсэг
import ComandlalCovot from "../../../../Pages/OptionFund/Covot/ComandlalCovot/ComandlalCovot";
//Квотыг ангид олгох хэсэг
import UnitCovot from "../../../../Pages/OptionFund/Covot/UnitCovot/UnitCovot";
//Үндсэн table - ын row click хийгээд админууд өөр өөрсдийнхөө эрхийн хүрээнд туслах table - д insert edit delete хийнэ.
import MainHistory from "../../../../Pages/OptionFund/MainHistory/MainHistory/MainHistory";

//Com undes
import ComMainHistory from "../../../../Pages/OptionFund/MainHistory/MainHistory/ComMainHistory";

//Tuslah san end
import Process from "../../../../Pages/OptionFund/ReqUser/Process";
import ReqUser from "../../../../Pages/OptionFund/ReqUser/ReqUser";
import ReqDate from "../../../../Pages/OptionFund/ReqUser/ReqDate";

import WishGrapic from "../../../../Pages/OptionFund/Wish/WishGrapic";
//Хүсэлт илгээсэн ЦАХ-ийн нэгдсэн мэдээллийг харах хэсэг
import WishInfo from "../../../../Pages/OptionFund/Wish/WishInfo";
//Админы тохиргооны хэсэг товч нээж хаах гэх мэт
import Control from "../../../../Pages/OptionFund/Control/Control";
//Бичиг баримтын бүрдлийг оруулга хийх ангийн админы хэсэг
import DocumentUnit from "../../../../Pages/OptionFund/Documents/DocumentUnit/DocumentUnit";
//Эрүүл мэндийн хэлтсийн зөвшөөрлийн хэсэг
import HealthApprove from "../../../../Pages/OptionFund/HealthHelstes/HealthApprove";
//Эрүүл мэндийн үзлэгийн pdf зөвшөөрсөн эсэхийг энд хийнэ
import Health from "../../../../Pages/OptionFund/Health/Health";
//Бичиг баримтын бүрдлийг зөвшөөрөх командлалын админы хэсэг
import DocumentComandlal from "../../../../Pages/OptionFund/Documents/DocumentCom/DocumentComandlal";
import DocumentSuper from "../../../../Pages/OptionFund/Documents/DocumentSuper/DocumentSuper";
//Биеийн тамирын шалгалтын дүнг оруулах спортын админы хэсэг
import SportApprove from "../../../../Pages/OptionFund/Sport/Sport/SportApprove";
//Ажиллагааны рот -> Жишээ нь удирдлага штаб, 1-р рот гэх мэтийг хийнэ
import Rot from "../../../../Pages/OptionFund/MissionStructure/Rot/Rot";
//Ажиллагааны салааг ротоос хамаарч -> Жишээ нь 1-р ротын 1-р салаа гэх мэтийг хийнэ
import Salaa from "../../../../Pages/OptionFund/MissionStructure/Salaa/Salaa";
//Ажиллагааны тасгийг салаанаас хамаарч -> 1-р салааны 1-р тасаг гэх мэт
import Tasag from "../../../../Pages/OptionFund/MissionStructure/Tasag/Tasag";
//Ажиллагааны албан тушаалыг тасгаас хамаарч -> 1-р тасгийн буудагч гэх мэт
import Position from "../../../../Pages/OptionFund/MissionStructure/Position/Position";
//Гэмт хэрэгт холбогдсон эсэхийг шалгаад зөвшөөрөх хэсэг
import SpyMain from "../../../../Pages/OptionFund/Crime/SpyMain/SpyMain";
//Өөрийн хүсэлтээр хасагдсан ЦАХ ийг энд бүртгэнэ
import Canceled from "../../../../Pages/OptionFund/Canceled/Canceled/Canceled";
//Бүх юм нь тэнцээд баталгаажсан ЦАХ-дыг батальоны орон тоонд зоох хэсэг
import OronToo from "../../../../Pages/OptionFund/MainHistory/OronToo/OronToo";
//Батальоны орон тоонд хуваарилагдсан ЦАХ-уудад нислэгийн жжлэ оноож өгөх хэсэг
import Airplane from "../../../../Pages/OptionFund/Airplane/Airplane/Airplane";
//image login tal
import Album from "../../../../Pages/OptionFund/Album/Album";
//Оноо сонгоод хүсэлтээ илгээх хэсгийн туслах сан он нэмэх засах устгах хэсэг
import Year from "../../../../Pages/OptionFund/Mission/Year/Year";
//Zarlan login tal
import Announcement from "../../../../Pages/OptionFund/Announcement/Announcement";
//Гадаад хэлний шалгалтын оноотой бүрэлдэхүүний оноог энд оруулна
import LanguageScore from "../../../../Pages/OptionFund/LanguageScore/LanguageScore/LanguageScore";
//Гадаад хэлний төрөл энд нэмж өгнө
import Language from "../../../../Pages/OptionFund/LanguageScore/LanguageType/Language";
//тухайн ажиллагаа ээлжид шаардлагатай гадаад паспортын дуусах хугацааг энд хийнэ
import ForeignPass from "../../../../Pages/OptionFund/LanguageScore/ForeignPass/ForeignPass";
//Bidniii tuhai
import About from "../../../../Pages/OptionFund/About/About";
//ЦАХ-ийн ажиллагаанд оролцсон түүхийг энд хадгалаж харах хэсэг
import MissionHistory from "../../../../Pages/OptionFund/MissionHistory/MissionHistoryCom/MissionHistory";
//Ажиллагааны газар орон дээр очоод ЦАХ - дын сайшаал, шийтгэлийн мэдээг оруулна
import UuregGuitsetgelt from "../../../../Pages/OptionFund/UuregGuitsetgelt/UuregGuitsetgelt/UuregGuitsetgelt";
//Оноор хүсэлт илэрхийлсэн ЦАХ-дын хүсэлтийн графикыг харах хэсэг
import YearWishGraphic from "../../../../Pages/OptionFund/Mission/Year/YearWishGraphic";
// Zarlan history
import AnnouncementHistory from "../../../../Pages/OptionFund/Zarlan/AnnouncementHistory";
//Эрүүл мэндийн үзлэгийн хариуг буруу оруулсан бол комиссын бүрэлдэхүүн засах эрхийг олгох хэсэг
import ComissionHealth from "../../../../Pages/OptionFund/Comission/ComissionHealth/ComissionHealth";
//Биеийн тамирын шалгалтын хариуг буруу оруулсан бол комиссын бүрэлдэхүүн засах эрхийг олгох хэсэг
import ComissionSport from "../../../../Pages/OptionFund/Comission/ComissionSport/ComisionSport";
//Хүсэлт илгээх ЦАХ-ийн заавал бөглөх асуумж
import Question from "../../../../Pages/OptionFund/PkoQuestion/Question";
//Хүсэлт илгээх ЦАХ-д тавигдах шаардлагыг оруулах хэсэг
import Requirements from "../../../../Pages/OptionFund/PkoQuestion/Requirements";
//ЦАХ-ийн буруу оруулсан асуумжийг засах хэсэг
import QuestionEdit from "../../../../Pages/OptionFund/PkoQuestion/QuestionGeneral";
//Бичиг баримтын бүрдлийг ЦАХ бүр өөрсдөө хийх хэсэг
import DocumentUser from "../../../../Pages/OptionFund/Documents/DocumentUser/DocumentUser";
//ЦАХ-ийн санал гомдол авах хэсэг
import Complaints from "../../../../Pages/OptionFund/Complaints/Complaints";
//ЦАХ-ийн санал гомдол харах хэсэг
import ComplaintsList from "../../../../Pages/OptionFund/Complaints/ComplaintsList";

//News
import News from "../../../../Pages/OptionFund/News/News";
//Page
import Page from "../../../../Pages/OptionFund/Page/Page";
//Home
import Home from "../../../../Pages/OptionFund/Home/Home";
//zaawar
import Instructions from "../../../../Pages/OptionFund/Instructions/Instructions";
//Эрүүл мэндийн үзлэгийн хуудас өгөх хэсэг
import HealthHuudas from "../../../../Pages/OptionFund/Health/HealthHuudas";
//ЭДЦХАХ-ээс Төрийн цэргийн байгууллагын хэрэглэгчийг асуумж хүсэлтийг давуулж нэмэнх хэсэг
import PkoSuperAdmin from "../../../../Pages/OptionFund/Admins/PkoSuperAdmin/PkoSuperAdmin";
//Анги ажиллагааны түүх нэмэх хэсэг
import MissionUnitHistory from "../../../../Pages/OptionFund/MissionHistory/MissionHistoryUnit/MissionUnitHistory";
//Хэрэглэгчийн профайл
import UserProfile from "../../../../Pages/OptionFund/UserProfile/UserProfile";
//Спортод харуулах эрэгтэй ЦАХ
import SportMen from "../../../../Pages/OptionFund/Sport/SportMen/SportMen";
import SportWomen from "../../../../Pages/OptionFund/Sport/SportWomen/SportWomen";
import SportGereet from "../../../../Pages/OptionFund/Sport/SportGereet/SportGereet";
import SportOther from "../../../../Pages/OptionFund/Sport/SportOther/SportOther";
// import AnotherHome from "../../../../Pages/OptionFund/Home/AnotherHome";

//Officer ehlel
//Question start
import OffQuestion from "../../../../Pages/OptionFund/Officer/Question/OffQuestion";
import OffResearch from "../../../../Pages/OptionFund/Officer/Question/OffResearch";
import DocumentOfficer from "../../../../Pages/OptionFund/Officer/Document/DocumentOfficer";
import OfficerMainHistory from "../../../../Pages/OfficerBack/MainHistory/OfficerMainHistory";
import HealthOfficer from "../../../../Pages/OfficerBack/HealtApprove/Health";
import SportApproveOfficer from "../../../../Pages/OfficerBack/SportApprove/SportApprove";
// import OffResearch from "../../../../Pages/OptionFund/Officer/Question/OffResearch";

//Login tsag
// import UserProfile from "../../../../Pages/OptionFund/UserProfile/UserProfile";

const MyRoutes = (props) => {
    const {
        showFirstMenu,
        showSecondMenu,
        handleFirstMenuClick,
        handleSecondMenuClick,
    } = props;
    return (
        <Routes>
            <Route path="/comandlal" element={<Comandlal />} />
            <Route path="/unit" element={<Unit />} />
            <Route path="/salbar" element={<Salbar />} />
            <Route path="/admins" element={<Admins />} />
            <Route path="/all/admins" element={<AllAdmins />} />
            <Route path="/comandlal/users" element={<ComandlalUsers />} />
            <Route path="/pko/super/admin" element={<PkoSuperAdmin />} />
            <Route path="/dundiin/tuluvt/baigaa" element={<DundiinTuluv />} />
            <Route path="/admin/password/reset" element={<AdminPassReset />} />
            <Route path="/pko/admin" element={<PkoAdmin />} />
            {/* <Route path="/home" element={<Admins />} /> */}
            {/* {userType != "unitUser" && userType != "unitAdmin" && (
                <Route path="/" element={<Admins />} />
            )} */}
            <Route path="/pko/mission" element={<Mission />} />
            <Route path="/pko/eelj" element={<Eelj />} />
            <Route path="/sport/type" element={<SportType />} />
            <Route path="/doc/item" element={<DocItem />} />
            <Route path="/canceled/type" element={<CanceledType />} />
            <Route
                path="/airplane/shift/item"
                element={<AirplaneShiftItem />}
            />
            <Route path="/uureg/applause" element={<UuregApplause />} />
            <Route path="/uureg/applause/sub" element={<UuregApplauseSub />} />
            <Route path="/wish" element={<Wish />} />
            <Route path="/wishes/grapic" element={<WishGrapic />} />
            <Route path="/Process" element={<Process />} />
            <Route path="/ReqUser" element={<ReqUser />} />
            <Route path="/comandlal/covot" element={<ComandlalCovot />} />
            <Route path="/unit/covot" element={<UnitCovot />} />
            <Route path="/main/history" element={<MainHistory />} />
            <Route path="/wish/info" element={<WishInfo />} />
            <Route path="/admin/control" element={<Control />} />
            <Route path="/com/main/history" element={<ComMainHistory />} />
            <Route path="/document/unit" element={<DocumentUnit />} />
            <Route path="/health/department" element={<HealthApprove />} />
            <Route path="/hospital" element={<Health />} />
            <Route path="/document/comandlal" element={<DocumentComandlal />} />
            <Route path="/document/super" element={<DocumentSuper />} />
            <Route path="/sport/approve" element={<SportApprove />} />
            <Route path="/mission/rot" element={<Rot />} />
            <Route path="/mission/salaa" element={<Salaa />} />
            <Route path="/mission/tasag" element={<Tasag />} />
            <Route path="/mission/position" element={<Position />} />
            <Route path="/spy/main" element={<SpyMain />} />
            <Route path="/canceled/main" element={<Canceled />} />
            <Route path="/batalion/oron/too" element={<OronToo />} />
            <Route path="/airplane/shift" element={<Airplane />} />
            <Route path="/Album/" element={<Album />} />
            <Route path="/year/wish" element={<Year />} />
            <Route path="/inside/announcement/" element={<Announcement />} />
            <Route path="/about/inside" element={<About />} />
            <Route path="/language/score" element={<LanguageScore />} />
            <Route path="/language/type" element={<Language />} />
            <Route path="/foreign/pass" element={<ForeignPass />} />
            <Route path="/ReqDate" element={<ReqDate />} />
            <Route path="/mission/history" element={<MissionHistory />} />
            <Route
                path="/mission/unit/history"
                element={<MissionUnitHistory />}
            />
            <Route path="/uureg/guitsetgelt" element={<UuregGuitsetgelt />} />
            <Route path="/year/wishes/grapic" element={<YearWishGraphic />} />
            <Route
                path="AnnouncementHistory"
                element={<AnnouncementHistory />}
            />
            <Route path="/comission/health" element={<ComissionHealth />} />
            <Route path="/comission/sport" element={<ComissionSport />} />
            <Route path="/pko/user/question" element={<Question />} />
            <Route path="/user/requirements" element={<Requirements />} />
            <Route path="/pko/question/edit" element={<QuestionEdit />} />
            <Route path="/pko/user/documents" element={<DocumentUser />} />
            <Route path="/user/complaints" element={<Complaints />} />
            <Route path="/complaints/list" element={<ComplaintsList />} />
            <Route
                path="dadaaFancy/jquery.fancybox.min.css"
                element={<Home />}
            />
            <Route
                path="/Home"
                element={
                    <Home
                        showFirstMenu={showFirstMenu}
                        showSecondMenu={showSecondMenu}
                        handleFirstMenuClick={handleFirstMenuClick}
                        handleSecondMenuClick={handleSecondMenuClick}
                    />
                }
            />
            {/* <Route path="/AnotherHome" element={<AnotherHome />}/> */}

            <Route path="/News" element={<News />} />
            <Route path="/Page/new" element={<Page />} />
            <Route path="/Video/zaawar" element={<Instructions />} />
            <Route path="/assistant/doctor" element={<HealthHuudas />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/sport/men" element={<SportMen />} />
            <Route path="/sport/women" element={<SportWomen />} />
            <Route path="/sport/gereet" element={<SportGereet />} />
            <Route path="/sport/other" element={<SportOther />} />
            {/* Officer */}
            <Route path="/pko/officer/question" element={<OffQuestion />} />
            <Route path="/pko/officer/research" element={<OffResearch />} />
            <Route
                path="/pko/officer/documents"
                element={<DocumentOfficer />}
            />

            {/* officer back start */}
            <Route
                path="/officer/back/mainHistory"
                element={<OfficerMainHistory />}
            />

            <Route
                path="/officer/back/healt/approve"
                element={<HealthOfficer />} // officerBack/HealtApprove/Health
            />

            <Route
                path="/officer/back/sport/approve"
                element={<SportApproveOfficer />} // officerBack/SportApprove/SportApprove
            />

            {/* <Route path="/Officer/Process" element={<OffResearch />} /> */}

            {/* <Route path="/login/attempt" element={<LoginAttempt/>} /> */}
        </Routes>
    );
};

export default MyRoutes;
