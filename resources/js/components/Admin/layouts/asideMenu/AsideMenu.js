import { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user2 from "../../../../../dist/img/userIcon.png";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

export default function AsideMenu() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUrl = location.pathname;

    const state = useContext(AppContext);
    const [getName, setName] = useState("");
    const [getTuvshin, setTuvshin] = useState("");
    const [openMenu, setOpenMenu] = useState({});
    const [openSubMenu, setOpenSubMenu] = useState({});

    const menuData = [
        // { type: "header", label: "АЛБАН ХЭРЭГ ХӨТЛӨЛТ" },

        // {
        //     type: "menu",
        //     title: "Туслах сан",
        //     icon: "fa fa-th-large",
        //     level: [1, 2, 3],
        //     subMenu: [
        //         {
        //             name: "Хөтлөх хэргийн жагсаалт",
        //             url: "/get/hutheregs",
        //             icon: "fa fa-list",
        //         },
        //         {
        //             name: "Хадгаламжийн нэгжийн бүртгэл",
        //             url: "/get/hadgalamj",
        //             icon: "fa fa-list",
        //         },
        //     ],
        // },
        { type: "header", label: "АРХИВ" },
        {
            type: "menu",
            title: "Байнга хадгалагдах",
            icon: "fa fa-th-large",
            level: [1, 2, 3],
            subMenu: [
                { name: "Илт", url: "/get/BaingaIlts", icon: "fa fa-list" },

                // {
                //     name: "Данс бүртгэл",
                //     icon: "fa fa-folder",
                //     children: [
                //         {
                //             name: "Байнга хадгалагдах ХН",
                //             url: "/get/BaingaHadHns",
                //             icon: "fa fa-file-text",
                //         },
                //         {
                //             name: "70 жил хадгалагдах ХН",
                //             url: "/get/DalHadHns",
                //             icon: "fa fa-file-text",
                //         },
                //         {
                //             name: "Түр хадгалагдах ХН",
                //             url: "/get/dans/tailan",
                //             icon: "fa fa-file-text",
                //         },
                //     ],
                // },
                {
                    name: "Нууц",
                    url: "/get/BaingaNuutss",
                    icon: "fa fa-list",
                },
                {
                    name: "Архивт шилжүүлсэн",
                    url: "/get/tovchililsonUgs",
                    icon: "fa fa-list",
                },
            ],
        },

        {
            type: "menu",
            title: "Туслах сан",
            icon: "fa fa-th-large",
            level: [1, 2, 3],
            subMenu: [
                { name: "Хөмрөг", url: "/get/humrugs", icon: "fa fa-list" },
                {
                    name: "Данс бүртгэл",
                    url: "/get/DansBurtgels",
                    icon: "fa fa-list",
                },

                // {
                //     name: "Данс бүртгэл",
                //     icon: "fa fa-folder",
                //     children: [
                //         {
                //             name: "Байнга хадгалагдах ХН",
                //             url: "/get/BaingaHadHns",
                //             icon: "fa fa-file-text",
                //         },
                //         {
                //             name: "70 жил хадгалагдах ХН",
                //             url: "/get/DalHadHns",
                //             icon: "fa fa-file-text",
                //         },
                //         {
                //             name: "Түр хадгалагдах ХН",
                //             url: "/get/dans/tailan",
                //             icon: "fa fa-file-text",
                //         },
                //     ],
                // },
                // GANBAT NEMSEN START
                {
                    name: "Товчилсон үгийн жагсаалт",
                    url: "/get/tovchilsonug",
                    icon: "fa fa-list",
                },

                {
                    name: "Ашигласан номын жагсаалт",
                    url: "/get/dictonaries",
                    icon: "fa fa-book",
                },
                {
                    name: "Сэдэв зүйн заагч",
                    url: "/get/sedevZuilzaagch",
                    icon: "fa fa-search",
                },
                {
                    name: "Хадгалах хугацааны зүйлийн жагсаалт",
                    url: "/get/jagsaaltZuils",
                    icon: "fa fa-boxes",
                },
                // GANBAT NEMSEN END
            ],
        },

        {
            type: "menu",
            title: "Статистик2",
            icon: "fa fa-th-large",
            level: [1, 2, 3],
            subMenu: [
                { name: "Dashboard", url: "/home11", icon: "fa fa-dashboard" },
                { name: "Хэрэглэгчид", url: "/home2", icon: "fa fa-users" },
            ],
        },

        { type: "header", label: "НЭМЭЛТ МЭДЭЭЛЭЛ" },
        {
            type: "menu",
            title: "Хэрэглэгч",
            icon: "fa fa-th-large",
            level: [1, 2, 3],
            subMenu: [
                {
                    name: "Командлал",
                    url: "/get/comandlals",
                    icon: "fa fa-list",
                },
                { name: "Анги", url: "/get/classes", icon: "fa fa-list" },
                { name: "Салбар", url: "/get/salbars", icon: "fa fa-list" },
                { name: "Хэрэглэгчид", url: "/get/users", icon: "fa fa-users" },
            ],
        },
        {
            type: "menu",
            title: "СТАТИСТИК",
            icon: "fa fa-signal",
            level: [1, 2, 3],
            subMenu: [
                {
                    name: "СТАТИСТИК",
                    url: "/get/statistic",
                    icon: "fa fa-bar-chart",
                },
                {
                    name: "ГРАФИК",
                    url: "/get/graphic",
                    icon: "fa fa-pie-chart",
                },
            ],
        },
    ];

    useEffect(() => {
        axios.get("/get/auth/name").then((res) => {
            setName(res.data);
            localStorage.setItem("name", res.data);
        });

        axios.get("/get/auth/tuvshin").then((res) => {
            setTuvshin(res.data);
            localStorage.setItem("tuvshin", res.data);
        });
    }, []);

    useEffect(() => {
        const menuState = {};
        const subMenuState = {};

        menuData.forEach((menu, menuIndex) => {
            if (menu.type !== "menu") return;

            menu.subMenu.forEach((sub, subIndex) => {
                // 🔹 Энгийн submenu
                if (sub.url === currentUrl) {
                    menuState[menuIndex] = true;
                }

                // 🔹 Children-тэй submenu
                if (sub.children) {
                    sub.children.forEach((child) => {
                        if (child.url === currentUrl) {
                            menuState[menuIndex] = true;
                            subMenuState[`${menuIndex}-${subIndex}`] = true;
                        }
                    });
                }
            });
        });

        setOpenMenu(menuState);
        setOpenSubMenu(subMenuState);
    }, [currentUrl]);

    // useEffect(() => {
    //     const initialState = {};
    //     menuData.forEach((menu, index) => {
    //         if (menu.type === "menu") {
    //             const isActive = menu.subMenu.some(
    //                 (item) => item.url === currentUrl
    //             );
    //             initialState[index] = isActive;
    //         }
    //     });
    //     setOpenMenu(initialState);
    // }, [currentUrl]);

    const resetContextIsMission = () => {
        localStorage.removeItem("whatIsMission");
        navigate("/home");
    };

    return (
        <aside
            className="main-sidebar sidebar-dark-primary elevation-4"
            style={{
                background:
                    "linear-gradient(180deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
                boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
            }}
        >
            {/* LOGO */}
            <a
                className="brand-link"
                onClick={resetContextIsMission}
                style={{ cursor: "pointer", borderBottom: "1px solid #fff" }}
            >
                <div
                    style={{
                        textAlign: "center",
                        color: "#fff",
                        padding: "8px 10px",
                        background: "linear-gradient(90deg,#004e92,#000428)",
                        borderRadius: 6,
                    }}
                >
                    <div>АРХИВЫН ПРОГРАММ</div>
                </div>
            </a>

            <div className="sidebar">
                {/* USER PANEL */}
                <div
                    className="user-panel mt-3 pb-3 mb-3 d-flex"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
                >
                    <div className="image">
                        <img
                            src={user2}
                            className="img-circle elevation-2"
                            style={{ width: 40, height: 40 }}
                        />
                    </div>
                    <div className="info">
                        <span
                            className="d-block"
                            style={{ color: "#fff", fontSize: 18 }}
                        >
                            {getName}
                        </span>
                    </div>
                </div>

                {/* MENU */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        role="menu"
                        style={{ paddingBottom: 20 }}
                    >
                        {menuData.map((item, idx) => {
                            if (item.type === "header") {
                                return (
                                    <li
                                        key={idx}
                                        className="nav-header"
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #667eea, #764ba2)",
                                            color: "#fff",
                                            // margin: "15px 10px 5px 10px",
                                            padding: "10px 12px",
                                            borderRadius: 8,
                                            fontSize: 14,
                                            fontWeight: 700,
                                            letterSpacing: 0.5,
                                            boxShadow:
                                                "0 2px 6px rgba(0,0,0,0.2)",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            whiteSpace: "normal", // line-break-д зориулсан
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        <i
                                            className="fa fa-star"
                                            style={{ color: "#FFD700" }}
                                        />
                                        <span
                                            style={{
                                                display: "inline-block",
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            {item.label}
                                        </span>
                                    </li>
                                );
                            }

                            if (item.type === "menu") {
                                if (!item.level.includes(Number(getTuvshin)))
                                    return null;

                                const isOpen = openMenu[idx] || false;
                                const toggleMenu = () =>
                                    setOpenMenu((prev) => ({
                                        ...prev,
                                        [idx]: !prev[idx],
                                    }));

                                return (
                                    <li
                                        key={idx}
                                        className={`nav-item ${
                                            isOpen ? "menu-open" : ""
                                        }`}
                                    >
                                        <a
                                            className="nav-link"
                                            onClick={toggleMenu}
                                            style={{
                                                cursor: "pointer",
                                                color: isOpen ? "#fff" : "#DDD",
                                                background: isOpen
                                                    ? "rgba(102,126,234,0.15)"
                                                    : "transparent",
                                                borderRadius: 8,
                                                margin: "5px 10px",
                                                padding: "12px 15px",
                                                fontWeight: 600,
                                                borderLeft: isOpen
                                                    ? "3px solid #667eea"
                                                    : "3px solid transparent",
                                                transition: "all 0.2s",
                                            }}
                                        >
                                            <i
                                                className={item.icon}
                                                style={{ marginRight: 10 }}
                                            />
                                            <p>
                                                {item.title}{" "}
                                                <i className="right fa fa-angle-left" />
                                            </p>
                                        </a>
                                        <ul
                                            className="nav nav-treeview"
                                            style={{
                                                paddingLeft: 12,
                                                display: isOpen
                                                    ? "block"
                                                    : "none",
                                            }}
                                        >
                                            {item.subMenu.map((sub, i) => {
                                                /** 🔹 Данс бүртгэл (children-тэй) */
                                                if (sub.children) {
                                                    const key = `${idx}-${i}`;
                                                    const isSubOpen =
                                                        openSubMenu[key] ||
                                                        false;

                                                    return (
                                                        <li
                                                            key={key}
                                                            className={`nav-item ${
                                                                isSubOpen
                                                                    ? "menu-open"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <a
                                                                className="nav-link"
                                                                onClick={() =>
                                                                    setOpenSubMenu(
                                                                        (
                                                                            p
                                                                        ) => ({
                                                                            ...p,
                                                                            [key]: !p[
                                                                                key
                                                                            ],
                                                                        })
                                                                    )
                                                                }
                                                                style={{
                                                                    cursor: "pointer",
                                                                    paddingLeft: 30,
                                                                }}
                                                            >
                                                                <i
                                                                    className={
                                                                        sub.icon
                                                                    }
                                                                    style={{
                                                                        marginRight: 12,
                                                                        fontSize: 16,
                                                                        width: 18,
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                />
                                                                {/* <i
                                                                    className={
                                                                        sub.icon
                                                                    }
                                                                /> */}
                                                                <p>
                                                                    {sub.name}
                                                                    <i
                                                                        className="right fa fa-angle-left"
                                                                        style={{
                                                                            transition:
                                                                                "transform 0.25s ease",
                                                                            transform:
                                                                                isSubOpen
                                                                                    ? "rotate(-90deg)"
                                                                                    : "rotate(0deg)",
                                                                        }}
                                                                    />
                                                                </p>
                                                            </a>

                                                            <ul className="nav nav-treeview">
                                                                {sub.children.map(
                                                                    (
                                                                        child,
                                                                        c
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                c
                                                                            }
                                                                            className="nav-item"
                                                                        >
                                                                            <Link
                                                                                to={
                                                                                    child.url
                                                                                }
                                                                                className="nav-link"
                                                                                style={{
                                                                                    paddingLeft: 45,
                                                                                    borderRadius: 8,
                                                                                    color:
                                                                                        currentUrl ===
                                                                                        child.url
                                                                                            ? "#fff"
                                                                                            : "#cbd5e1",
                                                                                    background:
                                                                                        currentUrl ===
                                                                                        child.url
                                                                                            ? "linear-gradient(90deg,#667eea,#764ba2)"
                                                                                            : "transparent",
                                                                                    transition:
                                                                                        "all 0.2s ease",
                                                                                }}
                                                                            >
                                                                                <i
                                                                                    className={`nav-icon ${child.icon}`}
                                                                                />
                                                                                <p>
                                                                                    {
                                                                                        child.name
                                                                                    }
                                                                                </p>
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </li>
                                                    );
                                                }

                                                /** 🔹 Энгийн submenu */
                                                return (
                                                    <li
                                                        key={i}
                                                        className="nav-item"
                                                    >
                                                        <Link
                                                            to={sub.url}
                                                            className={`nav-link ${
                                                                currentUrl ===
                                                                sub.url
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <i
                                                                className={`nav-icon ${sub.icon}`}
                                                            />
                                                            <p>{sub.name}</p>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            }

                            return null;
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

// React 18 way
const container = document.getElementById("asideMenu");
if (container) {
    const root = createRoot(container);
    root.render(<AsideMenu />);
}
