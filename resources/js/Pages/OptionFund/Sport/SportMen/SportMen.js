import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import ChildSportMen from "./ChildSportMen";

const SportMen = () => {
    const state = useContext(AppContext);
    const [getSportApprove, setSportApprove] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);
    const [getHealthDate, setHealthDate] = useState([]);

    const [getSportState, setSportState] = useState("all");
    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");
    const [getDate, setDate] = useState("");

    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        axios
            .get("/get/comandlal")
            .then((res) => {
                setComandlals(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post("/get/health/date")
            .then((res) => {
                setHealthDate(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        refreshSportApprove(
            state.getMissionRowID,
            state.getEeljRowID,
            getSportState,
            getComandlalID,
            getUnitID,
            getDate
        );
    }, []);

    const changeComandlal = (inComandlal) => {
        axios
            .post("/get/units", {
                _comandlalID: inComandlal,
            })
            .then((res) => {
                setUnits(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setclickedRowData([]);
    };

    const changeUnit = (e) => {
        setUnitID(e.target.value);
        refreshSportApprove(
            state.getMissionRowID,
            state.getEeljRowID,
            getSportState,
            getComandlalID,
            e.target.value,
            getDate
        );

        setclickedRowData([]);
    };

    const changeHealthDate = (e) => {
        setDate(e.target.value);
        refreshSportApprove(
            state.getMissionRowID,
            state.getEeljRowID,
            getSportState,
            getComandlalID,
            getUnitID,
            e.target.value
        );

        setclickedRowData([]);
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getSportApprove[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshSportApprove(
            state.getMissionRowID,
            state.getEeljRowID,
            getSportState,
            getComandlalID,
            getUnitID,
            getDate
        );

        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshSportApprove = (
        missionID,
        eeljID,
        sportState,
        comandlalID,
        unitID,
        healthDate
    ) => {
        axios
            .post("/get/sport/men", {
                _missionID: missionID,
                _eeljID: eeljID,
                _sportState: sportState,
                _comandlalID: comandlalID,
                _unitID: unitID,
                _healthDate: healthDate,
            })
            .then((res) => {
                setRowsSelected([]);
                setSportApprove(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeSportState = (e) => {
        setclickedRowData([]);
        setSportState(e.target.value);
        refreshSportApprove(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value,
            getComandlalID,
            getUnitID,
            getDate
        );
    };

    const columns = [
        {
            name: "comandlalShortName",
            label: "Командлал",
            options: {
                filter: true,
                sort: false,
                display:
                    userType == "comandlalAdmin" || userType == "unitAdmin"
                        ? false
                        : true,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "unitShortName",
            label: "Анги",
            options: {
                filter: true,
                sort: false,
                display: userType == "unitAdmin" ? false : true,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "rd",
            label: "РД",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "shortRank",
            label: "Цол",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },

        {
            name: "lastName",
            label: "Овог",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "firstName",
            label: "Нэр",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "age",
            label: "Нас",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "genderName",
            label: "Хүйс",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "sportScore",
            label: "Дундаж оноо",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "healthDate",
            label: "Огноо",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
    ];

    return (
        <div>
            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Төлөв:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeSportState}
                        >
                            <option value="all">Бүгд</option>
                            <option value="gived">Шалгалт өгсөн</option>
                            <option value="notGiven">Шалгалт өгөөгүй</option>
                        </select>
                    </div>
                </div>
                <div className="col-md">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Командлал:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={(e) => {
                                setComandlalID(e.target.value);
                                setUnitID("");
                                refreshSportApprove(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getSportState,
                                    e.target.value,
                                    "",
                                    getDate
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
                    </div>
                </div>
                <div className="col-md">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Анги:</span>
                        </div>
                        <select className="form-control" onChange={changeUnit}>
                            <option value="">Сонгоно уу</option>
                            {getUnits.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.unitShortName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-md">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Огноо:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeHealthDate}
                        >
                            <option value="">Сонгоно уу</option>
                            {getHealthDate.map((el) => (
                                <option
                                    key={el.healthDate}
                                    value={el.healthDate}
                                >
                                    {el.healthDate}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <MUIDatatable
                data={getSportApprove}
                setdata={setSportApprove}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"БИЕИЙН ТАМИРЫН ШАЛГАЛТ"}
                            excelDownloadData={getSportApprove}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                        <CustomToolbar
                            title={"ЗХЖШ-ын СБГ"}
                            excelDownloadData={getSportApprove}
                            excelHeaders={excelHeaders1}
                            isHideInsert={false}
                        />
                    </>
                }
                modelType={showModal}
                isHideDelete={false}
                isHideEdit={false}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
            <br />
            {clickedRowData != "" && (
                <ChildSportMen clickedRowData={clickedRowData} />
            )}
        </div>
    );
};

export default SportMen;

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Командлал", key: "comandlalShortName" },
    { label: "Анги", key: "unitShortName" },
    { label: "РД", key: "rd" },
    { label: "Цол", key: "shortRank" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Нас", key: "age" },
    { label: "Хүйс", key: "genderName" },
    { label: "Дундаж оноо", key: "sportScore" },
    { label: "Огноо", key: "healthDate" },
];
// const fullNameKey = "lastName" + "firstName";
const excelHeaders1 = [
    { label: "Анги", key: "unitShortName" },
    { label: "Цол", key: "shortRank" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Нас", key: "age" },
    { label: "Хүйс", key: "genderName" },
];
