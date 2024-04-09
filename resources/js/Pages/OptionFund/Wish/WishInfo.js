import React, { useState, useEffect, useContext } from "react";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";
import WishDetails from "./WishDetails";

const WishInfo = () => {
    const state = useContext(AppContext);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getWishDetails, setWishDetails] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [getWishState, setWishState] = useState("");

    const [totalRequest, setTotalRequest] = useState(0);
    const [possible, setPossible] = useState(0);
    const [notResolved, setNotResolved] = useState(0);
    const [inpossible, setInpossible] = useState(0);
    const [totalCovot, setTotalCovot] = useState(0);
    const [totalCovotUnit, setTotalCovotUnit] = useState(0);
    const [confirmed, setConfirmed] = useState(0);
    const [reserved, setReserved] = useState(0);
    const [balance, setBalance] = useState(0);
    const [balanceUnit, setBalanceUnit] = useState(0);
    useEffect(() => {
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                if (userType === "comandlalAdmin") {
                    setComandlalID(res.data.firstComandlal);
                    setComandlals(res.data.getComandlals);
                    changeComandlal(res.data.firstComandlal["id"]);
                }
                if (userType === "superAdmin") {
                    setComandlals(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        refreshWishInfo(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getWishState
        );
    }, []);

    useEffect(() => {
        refreshWishInfo(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getWishState
        );
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshWishInfo = (
        missionID,
        eeljID,
        comandlalID,
        unitID,
        wishState
    ) => {
        if (missionID != undefined || eeljID != undefined) {
            axios
                .post("/get/wish/total/info", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                    _wishState: wishState,
                })
                .then((res) => {
                    setWishDetails(res.data.getWishDetails);
                    if (res.data.totalRequest != undefined) {
                        setTotalRequest(res.data.totalRequest);
                    }
                    if (res.data.notResolved != undefined) {
                        setNotResolved(res.data.notResolved);
                    }
                    if (res.data.possible != undefined) {
                        setPossible(res.data.possible);
                    }
                    if (res.data.inpossible != undefined) {
                        setInpossible(res.data.inpossible);
                    }
                    if (res.data.totalCovot != undefined) {
                        setTotalCovot(res.data.totalCovot);
                    } else {
                        setTotalCovot(0);
                    }
                    if (res.data.totalCovotUnit != undefined) {
                        setTotalCovotUnit(res.data.totalCovotUnit);
                    } else {
                        setTotalCovotUnit(0);
                    }
                    if (res.data.confirmed != undefined) {
                        setConfirmed(res.data.confirmed);
                    }
                    if (res.data.reserved != undefined) {
                        setReserved(res.data.reserved);
                    }
                    if (res.data.balance != undefined) {
                        setBalance(res.data.balance);
                    }
                    if (res.data.balanceUnit != undefined) {
                        setBalanceUnit(res.data.balanceUnit);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const changeComandlal = (inComandlal) => {
        axios
            .post("/get/ID/byUnit", {
                _comandlalID: inComandlal,
            })
            .then((res) => {
                if (
                    userType === "superAdmin" ||
                    userType === "comandlalAdmin"
                ) {
                    setUnits(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeUnit = (e) => {
        setUnitID(e.target.value);
        refreshWishInfo(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value,
            getWishState
        );
    };

    const changeWishState = (e) => {
        setWishState(e.target.value);
        refreshWishInfo(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            e.target.value
        );
    };

    return (
        <div>
            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Командлал:</span>
                        </div>
                        {userType == "superAdmin" ? (
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    setComandlalID(e.target.value);
                                    setUnitID("");
                                    refreshWishInfo(
                                        state.getMissionRowID,
                                        state.getEeljRowID,
                                        e.target.value,
                                        "",
                                        getWishState
                                    );
                                    changeComandlal(e.target.value);
                                }}
                            >
                                <option value="">Сонгоно уу</option>
                                {getComandlals.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.comandlalShortName}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <select
                                className="form-control"
                                value={getComandlalID["id"]}
                                disabled={true}
                            >
                                <option value="">Сонгоно уу</option>
                                {getComandlals.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.comandlalShortName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Анги:</span>
                        </div>
                        {userType == "superAdmin" && (
                            <select
                                className="form-control"
                                onChange={changeUnit}
                            >
                                <option value="">Сонгоно уу</option>
                                {getUnits.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.unitShortName}
                                    </option>
                                ))}
                            </select>
                        )}
                        {userType == "comandlalAdmin" && (
                            <select
                                className="form-control"
                                onChange={changeUnit}
                            >
                                <option value="">Сонгоно уу</option>
                                {getUnits.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.unitShortName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-3">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{totalRequest}</h3>
                            <p>Хүсэлт илгээсэн нийт ЦАХ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-calculator" />
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-3">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            {getUnitID != "" ? (
                                <h3>{totalCovotUnit}</h3>
                            ) : (
                                <h3>{totalCovot}</h3>
                            )}
                            <p>Нийт олгогдсон квот</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-tasks" />
                        </div>
                    </div>
                </div> */}
            </div>
            {/* <div className="info-box col d-flex flex-column">
                <div className="row" style={{ textAlign: "center" }}>
                    <h3>ХҮСЭЛТ ИЛГЭЭСЭН ЦАХ-ИЙН ДЭЛГЭРЭНГҮЙ</h3>
                </div>
                <br />

                <div className="row d-lg-flex px-3">
                    <div className="col-lg-3 col-12 col-sm-6 d-flex flex-column">
                        <div className="bg-info small-box h-75">
                            <div className="inner">
                                <h3>{totalRequest}</h3>
                                <p>
                                    Хүсэлт илгээсэн
                                    <br className="d-lg-block d-none" />
                                    нийт ЦАХ
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-calculator" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 col-sm-6 d-flex flex-column">
                        <div className="bg-warning small-box h-75">
                            <div className="inner">
                                <h3>{notResolved}</h3>
                                <p>
                                    Шийдвэрлээгүй{" "}
                                    <br className="d-lg-block d-none" />
                                    хүсэлт
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-plus" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 col-sm-6 d-flex flex-column">
                        <div className="bg-success small-box h-75">
                            <div className="inner">
                                <h3>{possible}</h3>
                                <p>
                                    Шаардлага{" "}
                                    <br className="d-lg-block d-none" />
                                    хангасан
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-check" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-12 col-sm-6 d-flex flex-column">
                        <div className="bg-danger small-box h-75">
                            <div className="inner">
                                <h3>{inpossible}</h3>
                                <p>
                                    Шаардлага{" "}
                                    <br className="d-lg-block d-none" />
                                    хангаагүй
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-close" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="info-box col d-flex flex-column">
                <div className="row" style={{ textAlign: "center" }}>
                    <h3>ОЛГОГДСОН КВОТ БОЛОН БОЛОМЖТОЙ НӨӨЦ</h3>
                </div>
                <br />

                <div className="row d-lg-flex px-3">
                    <div className="col-lg-3 col-12 col-sm-6 d-lg-flex flex-column">
                        <div className="small-box bg-secondary h-75">
                            <div className="inner">
                                {getUnitID != "" ? (
                                    <h3>{totalCovotUnit}</h3>
                                ) : (
                                    <h3>{totalCovot}</h3>
                                )}

                                <p>
                                    <div className="">
                                        Нийт олгогдсон
                                        <br className="d-lg-block d-none" />{" "}
                                        квот
                                    </div>
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-tasks" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 col-sm-6 d-lg-flex flex-column">
                        <div className="small-box bg-warning h-75">
                            <div className="inner">
                                <h3>{confirmed}</h3>
                                <p>
                                    <div className="">
                                        Ангиас зөвшөөрөгдсөн ЦАХ
                                    </div>
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-check-double" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 col-sm-6 d-lg-flex flex-column">
                        <div className="small-box bg-light h-75">
                            <div className="inner">
                                <h3>{reserved}</h3>
                                <p>
                                    <div className="">
                                        Боломжтой
                                        <br className="d-lg-block d-none" />{" "}
                                        нөөц
                                    </div>
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-address-book" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-12 col-sm-6 d-lg-flex flex-column">
                        <div className="small-box bg-dark h-75">
                            <div className="inner">
                                {getUnitID != "" ? (
                                    <h3>{balanceUnit}</h3>
                                ) : (
                                    <h3>{balance}</h3>
                                )}
                                <p>
                                    <div className="">
                                        Үлдсэн <br />
                                        квот
                                    </div>
                                </p>
                            </div>
                            <div className="icon">
                                <i
                                    className="fas fa-archive"
                                    style={{ color: "#B3B6B7" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Төлөв:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={changeWishState}
                            value={getWishState}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="0">Шийдвэрлээгүй</option>
                            <option value="3">Ангиас зөвшөөрөгдсөн</option>
                            <option value="1">
                                Шаардлага хангасан ч зөвшөөрөгдөөгүй
                            </option>
                            <option value="2">Шаардлага хангаагүй</option>
                        </select>
                    </div>
                </div>
            </div> */}
            <WishDetails
                getWishDetails={getWishDetails}
                setWishDetails={setWishDetails}
            />
        </div>
    );
};

export default WishInfo;
