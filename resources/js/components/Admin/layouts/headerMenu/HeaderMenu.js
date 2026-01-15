import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

// import Notification from "../../../../../img/1.svg";
// import NotifyMe from "react-notification-timeline";

import "./navbar.css";

export default function HeaderMenu(props) {
    const state = useContext(AppContext);
    const [getRows, setRows] = useState([]);
    const [loadData, setData] = useState([]);
    const [getName, setFirstName] = useState("");

    const [getTime, setTime] = useState("");
    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    // Get userType from localStorage or from state
    let userType =
        localStorage.getItem("userType") ||
        (state.getUserDataRow && state.getUserDataRow.user_type) ||
        "";

    const getLatestRowDetails = async () => {
        const results = await axios.get("/getLatestRow");
        setRows(results.data);
    };

    useEffect(() => {
        axios
            .get("/get/auth/name")
            .then((res) => {
                setFirstName(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Ulaanbaatar timezone offset (UTC+8)
            const options = {
                timeZone: "Asia/Ulaanbaatar",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            };
            const timeString = now.toLocaleTimeString("en-GB", options);
            setTime(timeString);
        };

        updateTime(); // set immediately
        const interval = setInterval(updateTime, 1000); // update every second

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    const logout = () => {
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        userType = "";
        localStorage.clear();
        axios
            .post("/logout", {
                _token: csrfToken,
            })
            .then((response) => {
                console.log(response.data);
                userType = "";
                window.location = "/home";
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status == 401) {
                    localStorage.clear();
                    userType = "";
                    window.location.href = "/login";
                }
            });
    };

    return (
        <nav
            className="main-header navbar navbar-expand navbar-white navbar-light"
            style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                borderBottom: "none",
            }}
        >
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-widget="pushmenu"
                        href="#"
                        role="button"
                        style={{ color: "#FFFFFF" }}
                    >
                        <i className="fa fa-bars" />
                    </a>
                </li>
            </ul>
            {/* RIGHT SIDE */}
            <ul className="navbar-nav ml-auto">
                <li
                    className="nav-item"
                    style={{
                        color: "#FFFFFF",
                        fontWeight: "500",
                        padding: "8px 16px",
                        fontSize: "14px",
                    }}
                >
                    🕒 {getTime} (MN)
                </li>
                <li
                    className="nav-item dropdown"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    {/* Circle avatar */}

                    <button
                        className="btn d-flex align-items-center"
                        data-toggle="dropdown"
                        style={{
                            background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            border: "none",
                            color: "#FFFFFF",
                            padding: "6px 12px", // smaller padding to align avatar and text
                            borderRadius: "8px",
                            fontWeight: "500",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-2px)";
                            e.target.style.boxShadow =
                                "0 6px 12px rgba(102, 126, 234, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow =
                                "0 4px 6px rgba(0, 0, 0, 0.1)";
                        }}
                    >
                        {/* Circle avatar */}
                        <span
                            style={{
                                display: "inline-flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "#764ba2",
                                color: "#fff",
                                fontWeight: "600",
                                marginRight: "10px",
                                textTransform: "uppercase",
                                fontSize: "14px",
                            }}
                        >
                            {capitalizeFirstLetter(getName?.trim()[0] || "")}
                        </span>

                        {/* User name */}
                        <span style={{ marginRight: "6px", fontSize: "14px" }}>
                            {capitalizeFirstLetter(getName?.trim() || "")}
                        </span>

                        {/* Caret */}
                        <span className="caret" />
                    </button>

                    <div className="dropdown-menu dropdown-menu-right">
                        <Link
                            to="/login"
                            onClick={() => logout()}
                            className="dropdown-item"
                        >
                            <i className="fa fa-sign-out-alt"></i> &nbsp; Гарах
                        </Link>
                    </div>
                </li>
            </ul>
        </nav>
    );
}
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

if (document.getElementById("headerMenu")) {
    ReactDOM.render(<HeaderMenu />, document.getElementById("headerMenu"));
}
{
}
