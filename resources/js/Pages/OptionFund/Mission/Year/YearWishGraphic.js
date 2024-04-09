import React, { useState, useEffect, useContext } from "react";
import axios from "../../../../AxiosUser";
import YearChart from "./YearChart";

const YearWishGraphic = () => {
    const [getAllData, setAllData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");
    const [getGender, setGender] = useState("");

    useEffect(() => {
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                if (userType == "comandlalAdmin" || userType == "unitAdmin") {
                    setComandlalID(res.data.firstComandlal);
                    setComandlals(res.data.getComandlals);
                    changeComandlal(res.data.firstComandlal["id"]);
                }
                if (userType == "superAdmin") {
                    setComandlals(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const changeComandlal = (inComandlal) => {
        axios
            .post("/get/ID/byUnit", {
                _comandlalID: inComandlal,
            })
            .then((res) => {
                if (userType == "unitAdmin") {
                    setUnitID(res.data.firstUnit);
                    setUnits(res.data.getUnits);
                }
                if (userType == "superAdmin" || userType == "comandlalAdmin") {
                    setUnits(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        refreshYearWish(getComandlalID, getUnitID, getGender);
    }, []);

    const refreshYearWish = (comandlalID, unitID, genderID) => {
        axios
            .post("/get/year/wish/count", {
                _comandlalID: comandlalID,
                _unitID: unitID,
                _genderID: genderID,
            })
            .then((res) => {
                setAllData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeUnit = (e) => {
        setUnitID(e.target.value);
        refreshYearWish(getComandlalID, e.target.value, getGender);
    };

    const changeGender = (e) => {
        setGender(e.target.value);
        refreshYearWish(getComandlalID, getUnitID, e.target.value);
    };

    return (
        <div>
            <div
                className="info-box"
                style={{
                    padding: "20px",
                    paddingBottom: "0px",
                }}
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
                                    refreshYearWish(
                                        e.target.value,
                                        "",
                                        getGender
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
                        {userType == "superAdmin" ||
                        userType == "comandlalAdmin" ? (
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
                        ) : (
                            <select
                                className="form-control"
                                value={getUnitID["id"]}
                                disabled={true}
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
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Хүйс:</span>
                        </div>
                        <select
                            value={getGender}
                            className="form-control"
                            onChange={changeGender}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="11">Эрэгтэй</option>
                            <option value="22">Эмэгтэй</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                {getAllData.map((el, index) => (
                    <YearChart
                        refreshYearWish={refreshYearWish}
                        key={index}
                        el={el}
                    />
                ))}
            </div>
        </div>
    );
};

export default YearWishGraphic;
