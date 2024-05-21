import axios from "../../../../AxiosUser";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../Context/MyContext";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Box";
import Button from "@mui/material/Button";
import GsmafLogo from "../../../../../dist/img/GsmafLogo.png";

// import Notification from "../../../../../img/1.svg";
// import NotifyMe from "react-notification-timeline";

import "./navbar.css";

export default function HeaderMenu(props) {
    const state = useContext(AppContext);
    const [getRows, setRows] = useState([]);
    const [loadData, setData] = useState([]);
    // const [getRankName, setRankName] = useState(localStorage.getItem("rank"));
    // const [getFirstName, setFirstName] = useState(localStorage.getItem("name"));
    // const [getUserId, setUserId] = useState(localStorage.getItem("userID"));

    // const [getnotify, setNotify] = useState("");

    const [getMissionID, setMissionID] = useState([]);
    const [getEeljID, setEeljID] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
        loadList();
    };

    const loadList = async () => {
        try {
            const response = await axios.get("/list");
            const data = response.data;
            setData(data);

            if (
                data &&
                data.length > 0 &&
                "Notification" in window &&
                "serviceWorker" in navigator
            ) {
                const registration = await navigator.serviceWorker.ready;
                await registration.showNotification(
                    "Шинэ мэдэгдэл ирсэн байна.",
                    {
                        icon: { GsmafLogo },
                        data: {},
                    }
                );
                console.log("Notification sent");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        loadList();

        const interval = setInterval(loadList, 1800000); // 30 min 1 sec 1000

        return () => {
            clearInterval(interval);
        };
    }, []);

    const updateNotification = () => {
        axios
            .post("/updateNotification")
            .then((result) => {
                setOpen(false);
                getLatestRowDetails();
            })
            .catch(() => {
                alert("Error in the Code");
            });
    };

    // const updateNotification = () => {
    //     //Update Notification table
    //     axios
    //         .post("https://psod.maf.gov.mn/updateNotification")
    //         .then((result) => {
    //             setOpen(false);
    //             getLatestRowDetails();
    //         })
    //         .catch(() => {
    //             alert("Error in the Code");
    //         });
    // };
    // const loadList = async () => {
    //     try {
    //         const response = await axios.get("https://psod.maf.gov.mn/list");
    //         const data = response.data;
    //         setData(data);

    //         if (
    //             data &&
    //             data.length > 0 &&
    //             "Notification" in window &&
    //             "serviceWorker" in navigator
    //         ) {
    //             const registration = await navigator.serviceWorker.ready;
    //             await registration.showNotification(
    //                 "Шинэ мэдэгдэл ирсэн байна.",
    //                 {
    //                     icon: { GsmafLogo },
    //                     data: {},
    //                 }
    //             );
    //             console.log("Notification sent");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    const getLatestRowDetails = async () => {
        const results = await axios.get("/getLatestRow");
        setRows(results.data);
    };

    useEffect(() => {
        loadList();
        getLatestRowDetails();
    }, []);

    // const [getNotify, setNotify] = useState([]);
    // const showCount = 10;

    useEffect(() => {
        // axios
        //     .get("/get/notify")
        //     .then((res) => {
        //         setNotify(res.data.RecommendationName);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // axios
        //     .get("/get/auth/rank")
        //     .then((res) => {
        //         setRankName(res.data.shortRank);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // axios
        //     .get("/get/auth/name")
        //     .then((res) => {
        //         setFirstName(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        // axios
        //     .get("/get/auth/id")
        //     .then((res) => {
        //         setUserId(res.data.id);
        //     })
        //     .catch((err) => {
        //         window.location.href = "/login";
        //         console.log(err);
        //     });

        axios
            .get("/get/missions")
            .then((res) => {
                setMissionID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const changeMission = (e) => {
        state.setEeljRowID("");
        state.setMissionRowID(e.target.value);
        axios
            .post("/get/eelj/by/missionID", {
                _missionID: e.target.value,
            })
            .then((res) => {
                setEeljID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeEelj = (e) => {
        state.setEeljRowID(e.target.value);
    };
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
    if ("Notification" in window && "serviceWorker" in navigator) {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                navigator.serviceWorker
                    .register("service-worker.js")
                    .then((registration) => {
                        console.log("Service Worker registered");
                    })
                    .catch((error) => {
                        console.error(
                            "Service Worker registration failed:",
                            error
                        );
                    });
            } else {
            }
        });
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-widget="pushmenu"
                        href="#"
                        role="button"
                    >
                        <i className="fa fa-bars" />
                    </a>
                </li>
            </ul>

            {userType != "unitUser" && (
                <ul className="navbar-nav ml-auto">
                    <li
                        className="nav-item"
                        style={{
                            marginBottom: "-16px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ажиллагааны нэр:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        // {...register("missionID")}
                                        onChange={changeMission}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getMissionID.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.missionName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            &nbsp; &nbsp;
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ээлж:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeEelj}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getEeljID.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.eeljName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            &nbsp; &nbsp;
                        </div>
                    </li>
                </ul>
            )}

            <ul className="navbar-nav ml-auto">
                <br />
                <MenuItem onClick={handleOpen}>
                    <IconButton
                        style={{ height: "10px" }}
                        // size="small"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge
                            badgeContent={getRows == "0" ? "0" : getRows}
                            color="error"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </MenuItem>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            padding: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%", // Set the width to 100% for mobile style
                                maxWidth: "80%", // Set the maximum width for PC style
                                maxHeight: "100%",
                                overflow: "auto",
                                bgcolor: "background.paper",
                                border: "2px solid #000",
                                boxShadow: 24,
                                p: 4,
                                "@media (min-width: 600px)": {
                                    // Media query for PC style
                                    maxWidth: "50%",
                                    maxHeight: "100%",
                                },
                            }}
                        >
                            {/* <Box sx={style}> */}

                            <Button
                                type="button"
                                className="close"
                                onClick={handleClose}
                            >
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <h2 style={{ color: "black" }}>×</h2>
                            </Button>
                            {/* <b>
                                <h2 style={{ textAlign: "center" }}>ЗАРЛАЛ</h2>
                            </b> */}
                            <br />
                            <Grid container spacing={2}>
                                <Grid xs={12}>
                                    <TableContainer component={Paper}>
                                        <Table
                                            sx={{ minWidth: 250 }}
                                            size="small"
                                            aria-label="a dense table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        component="th"
                                                        style={{
                                                            fontWeight: "bold",
                                                            backgroundColor:
                                                                "#1761a7",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <b>Нэр</b>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        style={{
                                                            fontWeight: "bold",
                                                            backgroundColor:
                                                                "#1761a7",
                                                            color: "white",
                                                        }}
                                                    >
                                                        <b>Зарлал</b>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {loadData.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        style={{
                                                            backgroundColor:
                                                                row.status.includes(
                                                                    state
                                                                        .getUserDataRow
                                                                        .id
                                                                )
                                                                    ? "#FCF3CF"
                                                                    : "white",
                                                        }}
                                                    >
                                                        <TableCell>
                                                            {" "}
                                                            {row.firstName}{" "}
                                                        </TableCell>
                                                        <TableCell>
                                                            {row.RecommendationName.replace(
                                                                /<[^>]+>/g,
                                                                ""
                                                            )
                                                                .replace(
                                                                    /&nbsp;/g,
                                                                    ""
                                                                )
                                                                .replace(
                                                                    /&ldquo;/g,
                                                                    ""
                                                                )
                                                                .replace(
                                                                    /&rdquo;/g,
                                                                    ""
                                                                )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            <br />
                            <br />
                            <Box textAlign="center">
                                {" "}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={updateNotification}
                                >
                                    Мэдээ авлаа
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                {/* <NotifyMe
                    data={data}
                    storageKey="notific_key"
                    notific_key="timestamp"
                    notific_value="update"
                    heading="Notification Alerts"
                    sortedByKey={false}
                    showDate={true}
                    size={64}
                    color="yellow"
                    markAsReadFn={() => yourOwnFunctionHandler()}
                /> */}
                {/* <li className="nav-item">
                    <div className="Headicon">
                        <img src={Notification} className="iconImg" alt="" />
                        <div className="counter">2</div>
                    </div>
                </li> */}
                &nbsp; &nbsp;
                {/* &nbsp;
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-widget="fullscreen"
                        href="#"
                        role="button"
                    >
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>{" "}
                &nbsp; */}
                <li className="nav-item dropdown">
                    <button className="btn btn-success" data-toggle="dropdown">
                        <i className="fa fa-user" />
                        &nbsp; &nbsp;
                        <span className="glyphicon glyphicon-user" />
                        {userType != "unitUser" &&
                            userType != "superAdmin" &&
                            state.getUserDataRow.userUnitName}{" "}
                        &nbsp;{" "}
                        {userType != "superAdmin" && state.getUserDataRow.rank}{" "}
                        &nbsp; {state.getUserDataRow.name}
                        {/* {getRankName.map((el) => el.shortRank)}  */}
                        {/* {varAdminName} */}
                        <span className="caret" />
                        &nbsp;
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
                &nbsp; &nbsp; &nbsp;
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
    /* <Box
    sx={{
        width: "100%",
        maxWidth: "100%",
        padding: "16px",
        "@media (min-width: 600px)": {
            maxWidth: "600px",
            margin: "0 auto",
        },
        "@media (min-width: 960px)": {
            maxWidth: "960px",
        },
        "@media (min-width: 1280px)": {
            maxWidth: "1280px",
        },
    }}
>
</Box> */
}
