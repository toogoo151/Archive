import axios from "../../../../AxiosUser";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation, useParams, Link } from "react-router-dom";
// import logo from "../../../../../dist/img/psychology_logo.png";
import user2 from "../../../../../dist/img/userIcon.png";
import MenuItem from "../../MenuItem/MenuItem";
// import Soldier from "../../../../../dist/img/Soldier.png";
// import PsyLogo1 from "../../../../../dist/img/PsyLogo1.png";
import psylogo from "../../../../../dist/img/PsyLogo3.png";
import GsmafLogo from "../../../../../dist/img/GsmafLogo.png";
import Swal from "sweetalert2";
import AshiglahZaavar from "../../MenuItem/AshiglahZaavar";

export default function AsideMenu({ showFirstMenu, showSecondMenu }) {
    const [getRankName, setRankName] = useState("");
    const [getFirstName, setFirstName] = useState("");
    const [getImage, setImage] = useState("");

    const [getUserCheck, setUserCheck] = useState(-1);
    const [getWishID, setWishID] = useState(-1);
    const [getUserCheck2, setUserCheck2] = useState(-1);
    const [getWishID2, setWishID2] = useState(-1);
    const location = useLocation();
    const url = location.pathname;

    useEffect(() => {
        axios
            .get("/get/auth/rank")
            .then((res) => {
                setRankName(res.data.shortRank);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/get/auth/name")
            .then((res) => {
                setFirstName(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/get/auth/image")
            .then((res) => {
                setImage(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        //officer asuumj shalgah
        axios
            .post("/first/officer/qcheck")
            .then((res) => {
                setUserCheck2(res.data.userCheck);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/officer/question/wish")
            .then((res) => {
                setWishID2(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        //Асуумж хүсэлтийг шалгах
        axios
            .post("/first/check/question")
            .then((res) => {
                setUserCheck(res.data.userCheck);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/user/question/wish")
            .then((res) => {
                setWishID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <aside
            className="main-sidebar sidebar-dark-primary elevation-4"
            style={{ backgroundColor: "#06284C" }}
        >
            {/* Brand Logo */}
            <a
                href="/home"
                className="brand-link"
                style={{
                    textDecoration: "none",
                    borderBottom: "1px solid #FFFFFF",
                }}
            >
                {/* <div className="image">
                    <img
                        src={user2}
                        className="img-circle elevation-2"
                        alt="User Image"
                        style={{
                            width: "40px",
                        }}
                    />
                </div> */}
                <img
                    src={GsmafLogo}
                    alt="Зэвсэгт хүчний Жанжин штаб"
                    className="brand-image"
                    style={{
                        borderRadius: "1px",
                        width: "40px",
                        height: "50px",
                    }}
                />
                <span
                    className="brand-text font-weight-light"
                    style={{ color: "#FFFFFF" }}
                >
                    ЭДЦХАХ
                </span>
                {/* <div
                    className="row"
                    style={{
                        // textAlign: "center",
                        // alignItems: "center",
                        // justifyItems: "center",
                        justifyContent: "center",
                        // marginLeft: 10,
                    }}
                >

                </div>
                <div
                    className="row"
                    style={{ justifyContent: "center", textAlign: "center" }}
                >

                </div> */}
            </a>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div
                    className="user-panel mt-3 pb-3 mb-3 d-flex"
                    style={{
                        borderBottom: "1px solid #FFFFFF",
                    }}
                >
                    <div className="image">
                        {getImage == 0 ? (
                            <img
                                src={user2}
                                className="img-circle elevation-2"
                                alt="User Image"
                                style={{
                                    width: "40px",
                                }}
                            />
                        ) : (
                            <img
                                src={
                                    "https://psod.maf.gov.mn/storage" + getImage
                                }
                                className="img-circle elevation-2"
                                alt="User Image"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                }}
                            />
                        )}
                    </div>
                    <div className="info">
                        <a
                            href="#"
                            className="d-block"
                            style={{
                                fontSize: "18px",
                                fontStyle: "bold",
                                textDecoration: "none",
                                color: "#FFFFFF",
                            }}
                        >
                            {getRankName} &nbsp; {getFirstName}
                        </a>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <>
                            {userType == "superAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            style={{ color: "#FFFFFF" }}
                                            href="#"
                                            className="nav-link"
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/main/history"
                                                icon="nav-icon fa fa-archive"
                                                menuName="ЦАХ-ийн дэлгэрэнгүй"
                                            />
                                            <MenuItem
                                                url="/document/super"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримт шалгах"
                                            />
                                            <MenuItem
                                                url="/spy/main"
                                                icon="nav-icon fa fa-user-shield"
                                                menuName="Цагдаагийн тд"
                                            />
                                            <MenuItem
                                                url="/canceled/main"
                                                icon="nav-icon fa fa-bell-slash"
                                                menuName="Хүсэлт цуцлах"
                                            />
                                            <MenuItem
                                                url="/batalion/oron/too"
                                                icon="nav-icon fa fa-stream"
                                                menuName="Батальоны орон тоо"
                                            />
                                            <MenuItem
                                                url="/airplane/shift"
                                                icon="nav-icon fa fa-plane"
                                                menuName="Нислэгийн ээлж"
                                            />
                                            <MenuItem
                                                url="/uureg/guitsetgelt"
                                                icon="nav-icon fa fa-newspaper-o"
                                                menuName="Үүрэг гүйцэтгэлт"
                                            />
                                            <MenuItem
                                                url="/mission/history"
                                                icon="nav-icon fa fa-history"
                                                menuName="Ажиллагааны түүх"
                                            />
                                        </ul>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-group" />
                                            <p>
                                                КВОТ ОЛГОХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/comandlal/covot"
                                                icon="nav-icon fa fa-user-friends"
                                                menuName="Командлалын квот"
                                            />
                                        </ul>
                                    </li> */}
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-gavel" />
                                            <p>
                                                МЭДЭЭЛЭЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/question/edit"
                                                icon="nav-icon fa fa-question-circle"
                                                menuName="Асуумж шинэчлэх"
                                            />
                                            <MenuItem
                                                url="/wish/info"
                                                icon="nav-icon fa fa-info-circle"
                                                menuName="Хүсэлтийн мэдээлэл"
                                            />

                                            {/* <MenuItem
                                                url="/wishes/grapic"
                                                icon="nav-icon fa fa-bar-chart"
                                                menuName="Хүсэлтийн график"
                                            />
                                            <MenuItem
                                                url="/year/wishes/grapic"
                                                icon="nav-icon fa fa-bar-chart"
                                                menuName="Оны график"
                                            /> */}
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-gear" />
                                            <p>
                                                ТОХИРГОО
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{ paddingLeft: "10px" }}
                                        >
                                            <MenuItem
                                                url="/admin/control"
                                                icon="nav-icon fa fa-gear"
                                                menuName="Тохиргоо"
                                            />
                                        </ul>
                                    </li>

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-book-open" />
                                            <p>
                                                Ашиглах заавар
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/Video/zaawar"
                                                icon="nav-icon fa fa-book-open"
                                                menuName="Видео заавар"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon far fa-user" />
                                            <p>
                                                ХЭРЭГЛЭГЧ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{ paddingLeft: "10px" }}
                                        >
                                            <MenuItem
                                                url="/pko/admin"
                                                icon="nav-icon fa fa-user"
                                                menuName="Админ бүртгэх"
                                            />
                                            <MenuItem
                                                url="/pko/super/admin"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хэрэглэгч бүртгэх"
                                            />
                                            {/* <MenuItem
                                                url="/admins"
                                                icon="nav-icon fa fa-user"
                                                menuName="Админы бүртгэл"
                                            /> */}
                                            <MenuItem
                                                url="/all/admins"
                                                icon="nav-icon fa fa-user"
                                                menuName="Бүх хэрэглэгч"
                                            />
                                            <MenuItem
                                                url="/dundiin/tuluvt/baigaa"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хүний нөөцийн мэдэлд"
                                            />
                                            <MenuItem
                                                url="/admin/password/reset"
                                                icon="nav-icon fa fa-user"
                                                menuName="Нууц үг солих"
                                            />
                                        </ul>
                                    </li>
                                    {/* <a
                                        className="d-block font-weight-light"
                                        style={{
                                            fontSize: "18px",
                                            fontStyle: "italic",
                                            textDecoration: "none",
                                            borderTop: "1px solid gray",
                                            textAlign: "center",
                                            paddingTop: "15px",
                                            marginTop: "15px",
                                        }}
                                    >
                                        ТУСЛАХ САН
                                    </a> */}
                                    <a
                                        href="/home"
                                        className="brand-link"
                                        style={{
                                            textDecoration: "none",
                                            textAlign: "center",
                                            borderBottom: "1px solid #FFFFFF",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        <span className="brand-text font-weight-light">
                                            ТУСЛАХ САН
                                        </span>
                                    </a>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-university" />
                                            <p>
                                                АНГИ БАЙГУУЛЛАГА
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/comandlal"
                                                icon="nav-icon fa fa-university"
                                                menuName="Командлал"
                                            />
                                            <MenuItem
                                                url="/unit"
                                                icon="nav-icon fa fa-university"
                                                menuName="Анги"
                                            />
                                            <MenuItem
                                                url="/salbar"
                                                icon="nav-icon fa fa-university"
                                                menuName="Салбар"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paperclip" />
                                            <p>
                                                АЖИЛЛАГАА
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/mission"
                                                icon="nav-icon fa fa-file"
                                                menuName="Ажиллагаа"
                                            />
                                            <MenuItem
                                                url="/pko/eelj"
                                                icon="nav-icon fa fa-paste"
                                                menuName="Ажиллагааны ээлж"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                МЭДЭЭЛЭЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/year/wish"
                                                icon="nav-icon fa fa-calendar-alt"
                                                menuName="Он"
                                            />
                                            <MenuItem
                                                url="/canceled/type"
                                                icon="nav-icon fa fa-bell-slash"
                                                menuName="Хүсэлт цуцлах"
                                            />
                                            <MenuItem
                                                url="/user/requirements"
                                                icon="nav-icon fa fa-asterisk"
                                                menuName="Тавигдах шаардлага"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-address-book" />
                                            <p>
                                                АЛБАН ТУШААЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/mission/rot"
                                                icon="nav-icon fa fa-address-card"
                                                menuName="Рот"
                                            />
                                            <MenuItem
                                                url="/mission/salaa"
                                                icon="nav-icon fa fa-address-card"
                                                menuName="Салаа"
                                            />
                                            <MenuItem
                                                url="/mission/tasag"
                                                icon="nav-icon fa fa-address-card"
                                                menuName="Тасаг"
                                            />
                                            <MenuItem
                                                url="/mission/position"
                                                icon="nav-icon fa fa-address-card"
                                                menuName="Албан тушаал"
                                            />
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-folder-open" />
                                            <p>
                                                БУСАД
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/doc/item"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримт"
                                            />
                                            {/* <MenuItem
                                                url="/foreign/pass"
                                                icon="nav-icon fa fa-passport"
                                                menuName="Гадаад паспорт"
                                            /> */}

                                            <MenuItem
                                                url="/airplane/shift/item"
                                                icon="nav-icon fa fa-plane"
                                                menuName="Нислэгийн ээлж"
                                            />
                                            <MenuItem
                                                url="/inside/announcement"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал нэмэх"
                                            />
                                            <MenuItem
                                                url="/Album"
                                                icon="nav-icon fa fa-images"
                                                menuName="Зургийн цомог"
                                            />
                                            <MenuItem
                                                url="/about/inside"
                                                icon="nav-icon fa fa-users"
                                                menuName="Бидний тухай"
                                            />
                                            <MenuItem
                                                url="/News"
                                                icon="nav-icon fa fa-file"
                                                menuName="Мэдээ оруулах"
                                            />
                                            {/* <MenuItem
                                                url="/Page/new"
                                                icon="nav-icon fa fa-file"
                                                menuName="Хуудаст мэдээ оруулах"
                                            /> */}
                                        </ul>
                                    </li>
                                    <a
                                        href="/home"
                                        className="brand-link"
                                        style={{
                                            textDecoration: "none",
                                            textAlign: "center",
                                            borderBottom: "1px solid #FFFFFF",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        <span className="brand-text font-weight-light">
                                            АЖИГЛАГЧ
                                        </span>
                                    </a>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/officer/back/mainHistory"
                                                icon="nav-icon fa fa-archive"
                                                menuName="ЦАХ-ийн дэлгэрэнгүй"
                                            />
                                            <MenuItem
                                                url="/document/comandlal"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримт шалгах"
                                            />

                                            <MenuItem
                                                url="/officer/back/healt/approve"
                                                icon="nav-icon fa fa-user-md"
                                                menuName="Эрүүл мэндийн үзлэг"
                                            />

                                            <MenuItem
                                                url="/officer/back/sport/approve"
                                                icon="nav-icon fa fa-dumbbell"
                                                menuName="Биеийн тамирын шалгалт"
                                            />
                                            {/* <MenuItem
                                                url="/com/main/history"
                                                icon="nav-icon fa fa-university"
                                                menuName="Командлал үндсэн"
                                            /> */}
                                            {/* <MenuItem
                                                url="/document/comandlal"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримт шалгах"
                                            />
                                            <MenuItem
                                                url="/mission/history"
                                                icon="nav-icon fa fa-history"
                                                menuName="Ажиллагааны түүх"
                                            /> */}
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "comandlalAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            {/* <MenuItem
                                                url="/main/history"
                                                icon="nav-icon fa fa-archive"
                                                menuName="ЦАХ-ийн дэлгэрэнгүй"
                                            /> */}

                                            {/* <MenuItem
                                                url="/com/main/history"
                                                icon="nav-icon fa fa-university"
                                                menuName="Командлал үндсэн"
                                            /> */}
                                            <MenuItem
                                                url="/document/comandlal"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримт шалгах"
                                            />
                                            <MenuItem
                                                url="/mission/history"
                                                icon="nav-icon fa fa-history"
                                                menuName="Ажиллагааны түүх"
                                            />
                                        </ul>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-group" />
                                            <p>
                                                КВОТ ОЛГОХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/unit/covot"
                                                icon="nav-icon fa fa-user-friends"
                                                menuName="Ангийн квот"
                                            />
                                        </ul>
                                    </li> */}
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-gavel" />
                                            <p>
                                                ХҮСЭЛТ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/wish/info"
                                                icon="nav-icon fa fa-info-circle"
                                                menuName="Хүсэлтийн мэдээлэл"
                                            />
                                        </ul>
                                    </li>
                                    {/*
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-gavel" />
                                            <p>
                                                МЭДЭЭЛЭЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/question/edit"
                                                icon="nav-icon fa fa-question-circle"
                                                menuName="Асуумж шинэчлэх"
                                            />
                                        </ul>
                                    </li> */}

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon far fa-user" />
                                            <p>
                                                ХЭРЭГЛЭГЧ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{ paddingLeft: "10px" }}
                                        >
                                            <MenuItem
                                                url="/pko/admin"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хэрэглэгч бүртгэх"
                                            />
                                            <MenuItem
                                                url="/all/admins"
                                                icon="nav-icon fa fa-user"
                                                menuName="Бүх хэрэглэгч"
                                            />
                                            {/* <MenuItem
                                                url="/comandlal/users"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хэрэглэгчийн бүртгэл"
                                            /> */}
                                            <MenuItem
                                                url="/dundiin/tuluvt/baigaa"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хүний нөөцийн мэдэлд"
                                            />
                                            <MenuItem
                                                url="/admin/password/reset"
                                                icon="nav-icon fa fa-user"
                                                menuName="Нууц үг солих"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "gsmafAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/document/comandlal"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримт шалгах"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-gavel" />
                                            <p>
                                                МЭДЭЭЛЭЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/question/edit"
                                                icon="nav-icon fa fa-question-circle"
                                                menuName="Асуумж шинэчлэх"
                                            />
                                        </ul>
                                    </li>

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon far fa-user" />
                                            <p>
                                                ХЭРЭГЛЭГЧ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{ paddingLeft: "10px" }}
                                        >
                                            <MenuItem
                                                url="/pko/admin"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хэрэглэгч бүртгэх"
                                            />
                                            {/* <MenuItem
                                                url="/admins"
                                                icon="nav-icon fa fa-user"
                                                menuName="Админы бүртгэл"
                                            /> */}
                                            <MenuItem
                                                url="/all/admins"
                                                icon="nav-icon fa fa-user"
                                                menuName="Бүх хэрэглэгч"
                                            />
                                            <MenuItem
                                                url="/dundiin/tuluvt/baigaa"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хүний нөөцийн мэдэлд"
                                            />
                                            <MenuItem
                                                url="/admin/password/reset"
                                                icon="nav-icon fa fa-user"
                                                menuName="Нууц үг солих"
                                            />
                                        </ul>
                                    </li>

                                    <a
                                        href="/home"
                                        className="brand-link"
                                        style={{
                                            textDecoration: "none",
                                            textAlign: "center",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        <span className="brand-text font-weight-light">
                                            ТУСЛАХ САН
                                        </span>
                                    </a>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-university" />
                                            <p>
                                                АНГИ БАЙГУУЛЛАГА
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/comandlal"
                                                icon="nav-icon fa fa-university"
                                                menuName="Командлал"
                                            />
                                            <MenuItem
                                                url="/unit"
                                                icon="nav-icon fa fa-university"
                                                menuName="Анги"
                                            />
                                            <MenuItem
                                                url="/salbar"
                                                icon="nav-icon fa fa-university"
                                                menuName="Салбар"
                                            />
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-folder-open" />
                                            <p>
                                                БИЧИГ БАРИМТ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/doc/item"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримт"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "unitAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/main/history"
                                                icon="nav-icon fa fa-archive"
                                                menuName="ЦАХ-ийн дэлгэрэнгүй"
                                            />

                                            {/* <MenuItem
                                                url="/document/unit"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            /> */}
                                            {/* <MenuItem
                                                url="/mission/history"
                                                icon="nav-icon fa fa-history"
                                                menuName="Ажиллагааны түүх"
                                            /> */}
                                            <MenuItem
                                                url="/mission/unit/history"
                                                icon="nav-icon fa fa-history"
                                                menuName="Ажиллагааны түүх"
                                            />
                                        </ul>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-gavel" />
                                            <p>
                                                ХҮСЭЛТ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/wish"
                                                icon="nav-icon fa fa-gavel"
                                                menuName="Хүсэлт шийдвэрлэх"
                                            />
                                        </ul>
                                    </li> */}

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-book-open" />
                                            <p>
                                                Ашиглах заавар
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/Video/zaawar"
                                                icon="nav-icon fa fa-book-open"
                                                menuName="Видео заавар"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon far fa-user" />
                                            <p>
                                                ХЭРЭГЛЭГЧ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{ paddingLeft: "10px" }}
                                        >
                                            <MenuItem
                                                url="/pko/admin"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хэрэглэгч бүртгэх"
                                            />
                                            {/* <MenuItem
                                                url="/comandlal/users"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хэрэглэгчийн бүртгэл"
                                            /> */}
                                            <MenuItem
                                                url="/dundiin/tuluvt/baigaa"
                                                icon="nav-icon fa fa-user"
                                                menuName="Хүний нөөцийн мэдэлд"
                                            />
                                            <MenuItem
                                                url="/admin/password/reset"
                                                icon="nav-icon fa fa-user"
                                                menuName="Нууц үг солих"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "healthDepartmentAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/health/department"
                                                icon="nav-icon fa fa-university"
                                                menuName="Эрүүл мэндийн хэлтэс"
                                            />
                                        </ul>
                                    </li>

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "assistantAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/assistant/doctor"
                                                icon="nav-icon fa fa-user-md"
                                                menuName="Үзлэгийн хуудас"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "hospitalAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/hospital"
                                                icon="nav-icon fa fa-user-md"
                                                menuName="Эрүүл мэндийн үзлэг"
                                            />
                                        </ul>
                                    </li>

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "sportAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/sport/approve"
                                                icon="nav-icon fa fa-dumbbell"
                                                menuName="Биеийн тамирын шалгалт"
                                            />
                                            <MenuItem
                                                url="/sport/men"
                                                icon="nav-icon fa fa-male"
                                                menuName="ЗХ-ний эрэгтэй ЦАХ"
                                            />
                                            <MenuItem
                                                url="/sport/women"
                                                icon="nav-icon fa fa-female"
                                                menuName="ЗХ-ний эмэгтэй ЦАХ"
                                            />
                                            <MenuItem
                                                url="/sport/gereet"
                                                icon="nav-icon fa fa-male"
                                                menuName="ЗХ-ний ГЦАХ"
                                            />
                                            <MenuItem
                                                url="/sport/other"
                                                icon="nav-icon fa fa-male"
                                                menuName="Төрийн цэргийн байгууллага"
                                            />
                                        </ul>
                                    </li>

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                    <a
                                        href="/home"
                                        className="brand-link"
                                        style={{
                                            textDecoration: "none",
                                            textAlign: "center",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        <span className="brand-text font-weight-light">
                                            ТУСЛАХ САН
                                        </span>
                                    </a>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-folder-open" />
                                            <p>
                                                НОРМАТИВЫН ТӨРӨЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/sport/type"
                                                icon="nav-icon fa fa-dumbbell"
                                                menuName="Нормативын төрөл"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "languageAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/language/score"
                                                icon="nav-icon fa fa-language"
                                                menuName="Гадаад хэлний оноо"
                                            />
                                        </ul>
                                    </li>

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                    <a
                                        href="/home"
                                        className="brand-link"
                                        style={{
                                            textDecoration: "none",
                                            textAlign: "center",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        <span className="brand-text font-weight-light">
                                            ТУСЛАХ САН
                                        </span>
                                    </a>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-folder-open" />
                                            <p>
                                                ГАДААД ХЭЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/language/type"
                                                icon="nav-icon fa fa-language"
                                                menuName="Гадаад хэл"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "batalionAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/all/admins"
                                                icon="nav-icon fa fa-user"
                                                menuName="Бүх хэрэглэгч"
                                            />
                                            <MenuItem
                                                url="/main/history"
                                                icon="nav-icon fa fa-archive"
                                                menuName="ЦАХ-ийн дэлгэрэнгүй"
                                            />
                                            <MenuItem
                                                url="/batalion/oron/too"
                                                icon="nav-icon fa fa-stream"
                                                menuName="Батальоны орон тоо"
                                            />
                                            <MenuItem
                                                url="/airplane/shift"
                                                icon="nav-icon fa fa-plane"
                                                menuName="Нислэгийн ээлж"
                                            />
                                            <MenuItem
                                                url="/uureg/guitsetgelt"
                                                icon="nav-icon fa fa-newspaper-o"
                                                menuName="Үүрэг гүйцэтгэлт"
                                            />
                                        </ul>
                                    </li>

                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />

                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li> */}

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-bullhorn" />
                                            <p>
                                                ЗАРЛАЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/AnnouncementHistory"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал харах"
                                            />
                                        </ul>
                                    </li>
                                    <a
                                        href="/home"
                                        className="brand-link"
                                        style={{
                                            textDecoration: "none",
                                            textAlign: "center",
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        <span className="brand-text font-weight-light">
                                            ТУСЛАХ САН
                                        </span>
                                    </a>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-address-book" />
                                            <p>
                                                АЛБАН ТУШААЛ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/mission/rot"
                                                icon="nav-icon fa fa-address-card"
                                                menuName="Рот"
                                            />
                                            <MenuItem
                                                url="/mission/salaa"
                                                icon="nav-icon fa fa-address-card"
                                                menuName="Салаа"
                                            />
                                            <MenuItem
                                                url="/mission/tasag"
                                                icon="nav-icon fa fa-address-card"
                                                menuName="Тасаг"
                                            />
                                            <MenuItem
                                                url="/mission/position"
                                                icon="nav-icon fa fa-address-card"
                                                menuName="Албан тушаал"
                                            />
                                        </ul>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-newspaper-o" />
                                            <p>
                                                ҮҮРЭГ ГҮЙЦЭТГЭЛТ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/uureg/applause"
                                                icon="nav-icon fa fa-newspaper-o"
                                                menuName="Сайшаал || Шийтгэл"
                                            />
                                            <MenuItem
                                                url="/uureg/applause/sub"
                                                icon="nav-icon fa fa-newspaper-o"
                                                menuName="Хэлбэр"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-folder-open" />
                                            <p>
                                                НИСЛЭГ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/airplane/shift/item"
                                                icon="nav-icon fa fa-plane"
                                                menuName="Нислэгийн ээлж"
                                            />
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-folder-open" />
                                            <p>
                                                БУСАД
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/inside/announcement"
                                                icon="nav-icon fa fa-bullhorn"
                                                menuName="Зарлал нэмэх"
                                            />
                                            <MenuItem
                                                url="/Album"
                                                icon="nav-icon fa fa-images"
                                                menuName="Зургийн цомог"
                                            />
                                            <MenuItem
                                                url="/about/inside"
                                                icon="nav-icon fa fa-users"
                                                menuName="Бидний тухай"
                                            />
                                            <MenuItem
                                                url="/News"
                                                icon="nav-icon fa fa-file"
                                                menuName="Мэдээ оруулах"
                                            />
                                        </ul>
                                    </li>
                                </>
                            )}

                            {userType == "comissionAdmin" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-home" />
                                            <p>
                                                ҮНДСЭН
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/comission/health"
                                                icon="nav-icon fa fa-user-md"
                                                menuName="Эрүүл мэндийн үзлэг"
                                            />
                                            <MenuItem
                                                url="/comission/sport"
                                                icon="nav-icon fa fa-dumbbell"
                                                menuName="Биеийн тамирын шалгалт"
                                            />
                                            <MenuItem
                                                url="/complaints/list"
                                                icon="nav-icon fa fa-envelope"
                                                menuName="Санал гомдол"
                                            />
                                        </ul>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a
                                            href="#"
                                            className="nav-link"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            <i className="nav-icon fa fa-paper-plane" />
                                            <p>
                                                ХҮСЭЛТ ИЛГЭЭХ
                                                <i className="fas fa-angle-left right" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <MenuItem
                                                url="/pko/user/question"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqUser"
                                                icon="nav-icon fa fa-paper-plane"
                                                menuName="Хүсэлт илгээх"
                                            />
                                            <MenuItem
                                                url="/ReqDate"
                                                icon="nav-icon far fa-hourglass"
                                                menuName="Хүсэлт илгээх он"
                                            />
                                            <MenuItem
                                                url="/pko/user/documents"
                                                icon="nav-icon fa fa-file-text"
                                                menuName="Бичиг баримтын бүрдэл"
                                            />
                                            <MenuItem
                                                url="/Process"
                                                icon="nav-icon fa fa-spinner"
                                                menuName="Оролцооны байдал"
                                            />
                                        </ul>
                                    </li> */}
                                </>
                            )}

                            {userType === "unitUser" && (
                                <>
                                    {showFirstMenu && (
                                        <div>
                                            <li className="nav-item">
                                                <a
                                                    href="#"
                                                    className="nav-link"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <i className="nav-icon fa fa-home" />
                                                    <p>
                                                        ҮНДСЭН
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul
                                                    className="nav nav-treeview"
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        url="/pko/user/question"
                                                        icon="nav-icon fa fa-paper-plane"
                                                        menuName="Хүсэлт илгээх"
                                                    />

                                                    <MenuItem
                                                        url="/ReqDate"
                                                        icon="nav-icon far fa-hourglass"
                                                        menuName="Хүсэлт илгээх он"
                                                    />
                                                    {getUserCheck == 1 && (
                                                        <>
                                                            {getWishID == 1 && (
                                                                <>
                                                                    <MenuItem
                                                                        url="/pko/user/documents"
                                                                        icon="nav-icon fa fa-file-text"
                                                                        menuName="Бичиг баримтын бүрдэл"
                                                                    />
                                                                    <MenuItem
                                                                        url="/Process"
                                                                        icon="nav-icon fa fa-spinner"
                                                                        menuName="Оролцооны байдал"
                                                                    />
                                                                </>
                                                            )}
                                                        </>
                                                    )}

                                                    <MenuItem
                                                        url="/user/complaints"
                                                        icon="nav-icon fa fa-envelope"
                                                        menuName="Санал гомдол"
                                                    />
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    href="#"
                                                    className="nav-link"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <i className="nav-icon fa fa-bullhorn" />
                                                    <p>
                                                        ЗАРЛАЛ
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul
                                                    className="nav nav-treeview"
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        url="/AnnouncementHistory"
                                                        icon="nav-icon fa fa-bullhorn"
                                                        menuName="Зарлал харах"
                                                    />
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    href="#"
                                                    className="nav-link"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <i className="nav-icon fa fa-book-open" />
                                                    <p>
                                                        Ашиглах заавар
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul
                                                    className="nav nav-treeview"
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        url="/Video/zaawar"
                                                        icon="nav-icon fa fa-book-open"
                                                        menuName="Видео заавар"
                                                    />
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    href="#"
                                                    className="nav-link"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <i className="nav-icon far fa-user" />
                                                    <p>
                                                        ХЭРЭГЛЭГЧ
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul
                                                    className="nav nav-treeview"
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        url="/user/profile"
                                                        icon="nav-icon fa fa-user"
                                                        menuName="Профайл"
                                                    />
                                                    <MenuItem
                                                        url="/admin/password/reset"
                                                        icon="nav-icon fa fa-lock"
                                                        menuName="Нууц үг солих"
                                                    />
                                                </ul>
                                            </li>
                                        </div>
                                    )}
                                    {showSecondMenu && (
                                        <div>
                                            <li className="nav-item">
                                                <a
                                                    href="#"
                                                    className="nav-link"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <i className="nav-icon fa fa-home" />
                                                    <p>
                                                        ҮНДСЭН
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul
                                                    className="nav nav-treeview"
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        url="/pko/officer/question"
                                                        icon="nav-icon fa fa-paper-plane"
                                                        menuName="Хүсэлт илгээх"
                                                    />

                                                    {getUserCheck2 == 1 && (
                                                        <>
                                                            {getWishID2 ==
                                                                1 && (
                                                                <>
                                                                    <MenuItem
                                                                        url="/pko/officer/research"
                                                                        icon="nav-icon fa fa-file-text"
                                                                        menuName="Судалгаа"
                                                                    />
                                                                    <MenuItem
                                                                        url="/pko/officer/documents"
                                                                        icon="nav-icon fa fa-file-text"
                                                                        menuName="Бичиг баримтын бүрдэл"
                                                                    />
                                                                    <MenuItem
                                                                        url="/Process"
                                                                        icon="nav-icon fa fa-spinner"
                                                                        menuName="Оролцооны байдал"
                                                                    />
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                    <MenuItem
                                                        url="/pko/officer/documents"
                                                        icon="nav-icon fa fa-file-text"
                                                        menuName="Бичиг баримтын бүрдэл"
                                                    />
                                                    <MenuItem
                                                        url="/OfficerProcess"
                                                        icon="nav-icon fa fa-spinner"
                                                        menuName="Оролцооны байдал"
                                                    />
                                                    {/* </>
                                                    )}
                                                </>
                                            )} */}

                                                    <MenuItem
                                                        url="/user/complaints"
                                                        icon="nav-icon fa fa-envelope"
                                                        menuName="Санал гомдол"
                                                    />
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    href="#"
                                                    className="nav-link"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <i className="nav-icon fa fa-bullhorn" />
                                                    <p>
                                                        ЗАРЛАЛ
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul
                                                    className="nav nav-treeview"
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        url="/AnnouncementHistory"
                                                        icon="nav-icon fa fa-bullhorn"
                                                        menuName="Зарлал харах"
                                                    />
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    href="#"
                                                    className="nav-link"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <i className="nav-icon fa fa-book-open" />
                                                    <p>
                                                        Ашиглах заавар
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul
                                                    className="nav nav-treeview"
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        url="/Video/zaawar"
                                                        icon="nav-icon fa fa-book-open"
                                                        menuName="Видео заавар"
                                                    />
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    href="#"
                                                    className="nav-link"
                                                    style={{ color: "#FFFFFF" }}
                                                >
                                                    <i className="nav-icon far fa-user" />
                                                    <p>
                                                        ХЭРЭГЛЭГЧ
                                                        <i className="fas fa-angle-left right" />
                                                    </p>
                                                </a>
                                                <ul
                                                    className="nav nav-treeview"
                                                    style={{
                                                        paddingLeft: "10px",
                                                    }}
                                                >
                                                    <MenuItem
                                                        url="/user/profile"
                                                        icon="nav-icon fa fa-user"
                                                        menuName="Профайл"
                                                    />
                                                    <MenuItem
                                                        url="/admin/password/reset"
                                                        icon="nav-icon fa fa-lock"
                                                        menuName="Нууц үг солих"
                                                    />
                                                </ul>
                                            </li>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
}

if (document.getElementById("asideMenu")) {
    ReactDOM.render(<AsideMenu />, document.getElementById("asideMenu"));
}
