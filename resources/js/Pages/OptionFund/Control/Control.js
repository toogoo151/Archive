import React, { useState, useEffect, useContext } from "react";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";
import Swal from "sweetalert2";

const Control = () => {
    const state = useContext(AppContext);

    const [isCheck, setIsCheck] = useState(null);
    const [isPushButton, setIsPushButton] = useState(0);
    const [isDocAddButton, setIsDocAddButton] = useState(0);
    const [isRequestButton, setIsRequestButton] = useState(0);
    const [isSportButton, setIsSportButton] = useState(0);
    const [isTomilogdsonButton, setIsTomilogdsonButton] = useState(0);
    const [isUserAddButton, setIsUserAddButton] = useState(0);

    const refreshControl = (missionID, eeljID) => {
        if (missionID != "" && eeljID != "") {
            axios
                .post("/get/controls/check", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    if (res.data.count == 0) {
                        setIsCheck(false);
                    } else {
                        setIsCheck(true);
                        setIsPushButton(res.data.row[0].isPush);
                        setIsDocAddButton(res.data.row[0].isDocument);
                        setIsRequestButton(res.data.row[0].isRequest);
                        setIsSportButton(res.data.row[0].isSport);
                        setIsTomilogdsonButton(res.data.row[0].isTomilogdson);
                        setIsUserAddButton(res.data.row[0].isUserAdd);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        refreshControl(state.getMissionRowID, state.getEeljRowID);
    }, []);
    useEffect(() => {
        refreshControl(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const fn_makeControl = () => {
        if (state.getMissionRowID != "" && state.getEeljRowID != "") {
            axios
                .post("/get/control/make", {
                    _missionID: state.getMissionRowID,
                    _eeljID: state.getEeljRowID,
                })
                .then((res) => {
                    Swal.fire(res.data.msg);
                })
                .catch((err) => {
                    Swal.fire(err.response.data.msg);
                });
        }

        refreshControl(state.getMissionRowID, state.getEeljRowID);
    };

    const btnPush = () => {
        axios
            .post("/edit/is/push", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                isPush: isPushButton,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };
    const btnDoc = () => {
        axios
            .post("/edit/is/doc/add", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                isDocument: isDocAddButton,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };
    const btnRequest = () => {
        axios
            .post("/edit/is/request", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                isRequest: isRequestButton,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };
    const btnSport = () => {
        axios
            .post("/edit/is/sport", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                isSport: isSportButton,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const btnTomilogdson = () => {
        axios
            .post("/edit/is/tomilogdson", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                isTomilogdson: isTomilogdsonButton,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const btnUserAdd = () => {
        axios
            .post("/edit/is/user/add", {
                isUserAdd: isUserAddButton,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changePush = (e) => {
        setIsPushButton(e.target.value);
    };
    const changeDoc = (e) => {
        setIsDocAddButton(e.target.value);
    };
    const changeRequest = (e) => {
        setIsRequestButton(e.target.value);
    };
    const changeSport = (e) => {
        setIsSportButton(e.target.value);
    };
    const changeTomilogdson = (e) => {
        setIsTomilogdsonButton(e.target.value);
    };
    const changeUserAdd = (e) => {
        setIsUserAddButton(e.target.value);
    };

    return (
        <div>
            <div
                className="info-box"
                style={{
                    padding: "20px",
                    paddingBottom: "0px",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {isCheck && (
                    <>
                        <div className="col-md-6">
                            {/* <div className="row">
                                <h4>
                                    ЭДА оролцох хүсэлтэй ЦАХ-ийг зөвшөөрөх
                                    үйлдлийг
                                </h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            Зөвшөөрөх товч:
                                        </span>
                                        <select
                                            className="form-control"
                                            onChange={changePush}
                                            value={isPushButton}
                                        >
                                            <option value="0">Зогсоох</option>
                                            <option value="1">Эхлүүлэх</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        className="btn btn-success"
                                        onClick={btnPush}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div> */}
                            <div className="row">
                                <h4>Бичиг баримт бүрдүүлэх үйлдлийг</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            Нэмэх товч:
                                        </span>
                                        <select
                                            className="form-control"
                                            onChange={changeDoc}
                                            value={isDocAddButton}
                                        >
                                            <option value="0">Зогсоох</option>
                                            <option value="1">Эхлүүлэх</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        className="btn btn-success"
                                        onClick={btnDoc}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <h4>
                                    ЦАХ-ийн томилогдсон орон тоог харуулах
                                    үйлдлийг
                                </h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            Харуулах товч:
                                        </span>
                                        <select
                                            className="form-control"
                                            onChange={changeTomilogdson}
                                            value={isTomilogdsonButton}
                                        >
                                            <option value="0">Хаалттай</option>
                                            <option value="1">Нээлттэй</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        className="btn btn-success"
                                        onClick={btnTomilogdson}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <h4>
                                    ЭДА оролцох хүсэлтэй ЦАХ-ийн хүсэлтийг авах
                                    үйлдлийг
                                </h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            Хүсэлтийн товч:
                                        </span>
                                        <select
                                            className="form-control"
                                            onChange={changeRequest}
                                            value={isRequestButton}
                                        >
                                            <option value="0">Зогсоох</option>
                                            <option value="1">Эхлүүлэх</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        className="btn btn-success"
                                        onClick={btnRequest}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <h4>
                                    Биеийн тамирын шалгалтын оноог оруулах
                                    үйлдлийг
                                </h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            Оруулах товч:
                                        </span>
                                        <select
                                            className="form-control"
                                            onChange={changeSport}
                                            value={isSportButton}
                                        >
                                            <option value="0">Зогсоох</option>
                                            <option value="1">Эхлүүлэх</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        className="btn btn-success"
                                        onClick={btnSport}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <h4>Хэрэглэгч бүртгэх үйлдлийг</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            Нэмэх товч:
                                        </span>
                                        <select
                                            className="form-control"
                                            onChange={changeUserAdd}
                                            value={isUserAddButton}
                                        >
                                            <option value="0">Хаалттай</option>
                                            <option value="1">Нээлттэй</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button
                                        className="btn btn-success"
                                        onClick={btnUserAdd}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {isCheck}
                {isCheck != null && !isCheck && (
                    <div>
                        <button
                            className="btn btn-success"
                            onClick={fn_makeControl}
                        >
                            Энэ ажиллаганд зориулж удирдлагын функц үүсгэх
                        </button>{" "}
                        {isCheck}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Control;
