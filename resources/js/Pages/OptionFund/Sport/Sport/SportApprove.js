import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
// import SportChild from "./SportChild";
import { array } from "yup";
import ChildSportMen from "./Changed/ChildSportMen";
import ChildSportWomen from "./Changed/ChildSportWomen";

const SportApprove = () => {
    const state = useContext(AppContext);
    const [getSportApprove, setSportApprove] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);
    const [getGenders, setGenders] = useState([]);
    const [getHealthDate, setHealthDate] = useState([]);

    const [isSportAddButton, setIsSportAddButton] = useState(false);

    const [getSportState, setSportState] = useState("all");
    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");
    const [getGenderID, setGenderID] = useState("");
    const [getDate, setDate] = useState("");

    const [total, setSportTotal] = useState(0);
    const [gived, setSportGived] = useState(0);
    const [notGiven, setSportNotGiven] = useState(0);

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
            .post("/get/gender/admin")
            .then((res) => {
                setGenders(res.data);
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
            getGenderID,
            getDate
        );
        getSportTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getGenderID
            // getDate
        );
        fn_isSportAddButton(state.getMissionRowID, state.getEeljRowID);
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
            getGenderID,
            getDate
        );
        getSportTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value,
            getGenderID
            // getDate
        );
        setclickedRowData([]);
    };

    const changeGender = (e) => {
        setGenderID(e.target.value);
        refreshSportApprove(
            state.getMissionRowID,
            state.getEeljRowID,
            getSportState,
            getComandlalID,
            getUnitID,
            e.target.value,
            getDate
        );
        getSportTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            e.target.value
            // getDate
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
            getGenderID,
            e.target.value
        );
        // getSportTotal(
        //     state.getMissionRowID,
        //     state.getEeljRowID,
        //     getComandlalID,
        //     getUnitID,
        //     getGenderID,
        //     e.target.value
        // );
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
            getGenderID,
            getDate
        );
        getSportTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getGenderID
            // getDate
        );
        setclickedRowData([]);
        fn_isSportAddButton(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshSportApprove = (
        missionID,
        eeljID,
        sportState,
        comandlalID,
        unitID,
        genderID,
        healthDate
    ) => {
        axios
            .post("get/main/historys", {
                _missionID: missionID,
                _eeljID: eeljID,
                _sportState: sportState,
                _comandlalID: comandlalID,
                _unitID: unitID,
                _genderID: genderID,
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
            getGenderID,
            getDate
        );
    };

    const getSportTotal = (
        missionID,
        eeljID,
        comandlalID,
        unitID,
        genderID
        // healthDate
    ) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/sport/total", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                    _genderID: genderID,
                    // _healthDate: healthDate,
                })
                .then((res) => {
                    if (res.data.total != undefined) {
                        setSportTotal(res.data.total);
                    }
                    if (res.data.gived != undefined) {
                        setSportGived(res.data.gived);
                    }
                    if (res.data.notGiven != undefined) {
                        setSportNotGiven(res.data.notGiven);
                    }
                });
        }
    };

    const columns = [
        // {
        //     name: "id",
        //     label: "№",
        //     options: {
        //         filter: true,
        //         sort: true,
        //         filter: false,
        //         align: "center",
        //         customBodyRenderLite: (rowIndex) => {
        //             if (rowIndex == 0) {
        //                 return rowIndex + 1;
        //             } else {
        //                 return rowIndex + 1;
        //             }
        //         },
        //         setCellProps: () => {
        //             return { align: "center" };
        //         },
        //         setCellHeaderProps: (value) => {
        //             return {
        //                 style: {
        //                     backgroundColor: "#5DADE2",
        //                     color: "white",
        //                     width: 50,
        //                 },
        //             };
        //         },
        //     },
        // },
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
        // {
        //     name: "sportScore",
        //     label: "Байр",
        //     options: {
        //         filter: true,
        //         sort: false,
        //         setCellHeaderProps: (value) => {
        //             return {
        //                 style: {
        //                     backgroundColor: "#5DADE2",
        //                     color: "white",
        //                 },
        //             };
        //         },
        //         customBodyRenderLite: (rowIndex) => {
        //             if (rowIndex == 0) {
        //                 return rowIndex + 1;
        //             } else {
        //                 return rowIndex + 1;
        //             }
        //         },

        //         setCellProps: (value, rowIndex) => {
        //             const el = getSportApprove[rowIndex];
        //             if (el.sportScore >= 80) {
        //                 return {
        //                     align: "center",
        //                     style: {
        //                         backgroundColor: "#7FF6BA",
        //                         color: "black",
        //                     },
        //                 };
        //             } else if (el.sportScore >= 50) {
        //                 return {
        //                     align: "center",
        //                     style: {
        //                         backgroundColor: "#F8EA71",
        //                         color: "black",
        //                     },
        //                 };
        //             } else {
        //                 return {
        //                     align: "center",
        //                     style: {
        //                         backgroundColor: "#DD596F",
        //                         color: "black",
        //                     },
        //                 };
        //             }
        //         },
        //         setCellHeaderProps: (value) => {
        //             return {
        //                 style: {
        //                     backgroundColor: "#5DADE2",
        //                     color: "white",
        //                     width: 50,
        //                     fontWeight: "bold",
        //                 },
        //             };
        //         },
        //     },
        // },
    ];

    const fn_isSportAddButton = (missionID, eeljID) => {
        if (missionID != "" && eeljID != "") {
            axios
                .post("/is/sport/add/button", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setIsSportAddButton(res.data);
                });
        }
    };

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
                                    getGenderID,
                                    getDate
                                );
                                getSportTotal(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    e.target.value,
                                    "",
                                    getGenderID
                                    // getDate
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
                            <span className="input-group-text">Хүйс:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeGender}
                        >
                            <option value="">Сонгоно уу</option>
                            {getGenders.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.genderName}
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
            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-2">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{total}</h3>
                            <p>Нийт ЦАХ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-calculator" />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{gived}</h3>
                            <p>Шалгалт өгсөн</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-dumbbell" />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{notGiven}</h3>
                            <p>Шалгалт өгөөгүй</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-spinner" />
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-2">
                    <button
                        className="btn btn-info"
                        style={{
                            width: "200px",
                        }}
                    >
                        НИЙТ ЦАХ: {total}
                    </button>
                </div> */}
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
            {clickedRowData != "" && isSportAddButton && (
                // <SportChild clickedRowData={clickedRowData} />
                <>
                    {clickedRowData.gender == 11 ? (
                        <ChildSportMen clickedRowData={clickedRowData} refreshSportApprove={refreshSportApprove}/>
                    ) : (
                        <ChildSportWomen clickedRowData={clickedRowData}   refreshSportApprove={refreshSportApprove}/>
                    )}
                </>
            )}
            {!isSportAddButton && clickedRowData != "" && (
                <button className="btn btn-warning" style={{ padding: 10 }}>
                    Биеийн тамирын шалгалтын оноо оруулах хугацаа хаагдсан
                    байна.
                </button>
            )}
        </div>
    );
};

export default SportApprove;

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
