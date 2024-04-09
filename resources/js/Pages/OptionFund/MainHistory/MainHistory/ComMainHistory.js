import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import ComMainHistoryDocs from "./ComMainHistoryDocs";

const ComMainHistory = () => {
    const state = useContext(AppContext);
    const [getMainHistorys, setMainHistory] = useState([]);
    // const [getMainDocument, setMainDocument] = useState([]);

    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");
    const [allTsah, setallTsah] = useState(0);
    const [getIsWord, setIsWord] = useState("");
    const [getIsHeltes, setIsHeltes] = useState("");
    const [getIsHealth, setIsHealth] = useState("");
    const [getIsPhysic, setIsPhysic] = useState("");

    useEffect(() => {
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                if (userType == "comandlalAdmin" || userType == "unitAdmin") {
                    setComandlalID(res.data.firstComandlal);
                    setComandlals(res.data.getComandlals);
                    changeComandlal(res.data.firstComandlal["id"]);
                }
                if (userType == "gsmafAdmin") {
                    setComandlals(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic
        );
        getTsahSum(state.getMissionRowID, state.getEeljRowID);
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
                if (userType == "gsmafAdmin" || userType == "comandlalAdmin") {
                    setUnits(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeUnit = (e) => {
        setUnitID(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic
        );
    };

    useEffect(() => {
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic
        );
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshMainHistory = (
        missionID,
        eeljID,
        comandlalID,
        unitID,
        documentsMainApprove,
        eruulMendHeltesApprove,
        healthApprove,
        sportScore
    ) => {
        axios
            .post("get/com/main/historys", {
                _missionID: missionID,
                _eeljID: eeljID,
                _comandlalID: comandlalID,
                _unitID: unitID,
                _documentsMainApprove: documentsMainApprove,
                _eruulMendHeltesApprove: eruulMendHeltesApprove,
                _healthApprove: healthApprove,
                _sportScore: sportScore,
            })
            .then((res) => {
                setRowsSelected([]);
                setMainHistory(res.data);
                if (res.data.getTsahCount != undefined) {
                    setallTsah(res.data.getTsahCount);
                }
                getTsahSum(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getMainHistorys[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const getTsahSum = (missionID, eeljID) => {
        if (missionID != "" && eeljID != "") {
            axios
                .post("/get/count/main", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setallTsah(res.data.sum);
                });
        }
    };

    const changeWord = (e) => {
        setIsWord(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            e.target.value,
            getIsHeltes,
            getIsHealth,
            getIsPhysic
        );
    };

    const changeHealth = (e) => {
        setIsHealth(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            e.target.value,
            getIsPhysic
        );
    };

    const changeHeltes = (e) => {
        setIsHeltes(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            e.target.value,
            getIsHealth,
            getIsPhysic
        );
    };

    const changePhysic = (e) => {
        setIsPhysic(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            e.target.value
        );
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
                <div className="col-md-2">
                    <div className="small-box bg-primary">
                        <div className="inner">
                            <h3>{allTsah}</h3>
                            <p>ЗӨВШӨӨРӨГДСӨН</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-check" />
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="small-box bg-primary">
                        <div className="inner">
                            <h3>{allTsah}</h3>
                            <p>ТАТГАЛЗСАН</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-check" />
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="small-box bg-primary">
                        <div className="inner">
                            <h3>{allTsah}</h3>
                            <p>ШИЙДВЭРЛЭГДЭЭГҮЙ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-check" />
                        </div>
                    </div>
                </div>

                <div className="col-md-2">
                    <div className="small-box bg-primary">
                        <div className="inner">
                            <h3>{allTsah}</h3>
                            <p>НИЙТ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-check" />
                        </div>
                    </div>
                </div>
            </div>
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
                        {userType == "gsmafAdmin" ? (
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    setComandlalID(e.target.value);
                                    setUnitID("");
                                    refreshMainHistory(
                                        state.getMissionRowID,
                                        state.getEeljRowID,
                                        e.target.value,
                                        "",
                                        getIsWord,
                                        getIsHeltes,
                                        getIsHealth,
                                        getIsPhysic
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
                        {userType == "gsmafAdmin" ||
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
            </div>
            <MUIDatatable
                data={getMainHistorys}
                setdata={setMainHistory}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            excelDownloadData={getMainHistorys}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                isHideDelete={false}
                isHideEdit={false}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
            <div></div>
            <br />
            {clickedRowData != "" && (
                <ComMainHistoryDocs clickedRowData={clickedRowData} />
            )}
            {/* <ComMainHistoryDocs clickedRowData={clickedRowData} /> */}
        </div>
    );
};

export default ComMainHistory;

const columns = [
    {
        name: "id",
        label: "№",
        options: {
            filter: true,
            sort: true,
            filter: false,
            align: "center",
            customBodyRenderLite: (rowIndex) => {
                if (rowIndex == 0) {
                    return rowIndex + 1;
                } else {
                    return rowIndex + 1;
                }
            },
            setCellProps: () => {
                return { align: "center" };
            },
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 50,
                    },
                };
            },
        },
    },
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
];

const excelHeaders = [
    { label: "№", key: "id" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Нэр", key: "firstName" },
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
];

//     label: "Бичиг баримтын бүрдэл",
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
//     },
// },
// {
//     name: "eruulMendHeltesApprove",
//     label: "Эрүүл мэндийн хэлтэс",
//     options: {
//         filter: true,
//         sort: false,
//         setCellHeaderProps: (value) => {
//             return {
//                 style: {
//                     backgroundColor: "#5DADE2",
//                     color: "white",
//                     // width: 150,
//                 },
//             };
//         },
//         setCellProps: () => {
//             return { align: "center" };
//         },
//     },
// },
// {
//     name: "healthApprove",
//     label: "Эрүүл мэндийн үзлэг",
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
//     },
// },
// {
//     name: "sportScore",
//     label: "Биеийн тамирын оноо",
//     options: {
//         filter: true,
//         sort: false,
//         setCellHeaderProps: (value) => {
//             return {
//                 style: {
//                     backgroundColor: "#5DADE2",
//                     color: "white",
//                     // width: 250,
//                 },
//             };
//         },
//     },
// },
// {
//     name: "isCrime",
//     label: "Гэмт хэрэгт үйлдсэн эсэх",
//     options: {
//         filter: true,
//         sort: false,
//         setCellHeaderProps: (value) => {
//             return {
//                 style: {
//                     backgroundColor: "#5DADE2",
//                     color: "white",
//                     // width: 250,
//                 },
//             };
//         },
//     },
// },
// {
//     name: "isCanceled",
//     label: "Татгалзсан эсэх",
//     options: {
//         filter: true,
//         sort: false,
//         setCellHeaderProps: (value) => {
//             return {
//                 style: {
//                     backgroundColor: "#5DADE2",
//                     color: "white",
//                     // width: 250,
//                 },
//             };
//         },
//     },
// },
// {
//     name: "isFlight",
//     label: "Ниссэн эсэх",
//     options: {
//         filter: true,
//         sort: false,
//         setCellHeaderProps: (value) => {
//             return {
//                 style: {
//                     backgroundColor: "#5DADE2",
//                     color: "white",
//                     // width: 250,
//                 },
//             };
//         },
//     },
// },
// {
//     name: "created_at",
//     label: "Огноо 1",
//     options: {
//         filter: true,
//         sort: false,
//         setCellHeaderProps: (value) => {
//             return {
//                 style: {
//                     backgroundColor: "#5DADE2",
//                     color: "white",
//                     // width: 250,
//                 },
//             };
//         },
//     },
// },
// {
//     name: "updated_at",
//     label: "Огноо 2",
//     options: {
//         filter: true,
//         sort: false,
//         setCellHeaderProps: (value) => {
//             return {
//                 style: {
//                     backgroundColor: "#5DADE2",
//                     color: "white",
//                     // width: 250,
//                 },
//             };
//         },
//     },
// },

// { label: "Бичиг баримтын бүрдэл", key: "documentsMainApprove" },
// { label: "Эрүүл мэндийн хэлтэс", key: "eruulMendHeltesApprove" },
// { label: "Эрүүл мэндийн үзлэг", key: "healthApprove" },
// { label: "Биеийн тамирын оноо", key: "sportScore" },
// { label: "Гэмт хэрэгт үйлдсэн эсэх", key: "isCrime" },
// { label: "Татгалзсан эсэх", key: "isCanceled" },
// { label: "Ниссэн эсэх", key: "isFlight" },
// { label: "Огноо 1", key: "created_at" },
// { label: "Огноо 2", key: "updated_at" },
