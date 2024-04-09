import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../Context/MyContext";
import HealthChild from "./HealthChild";

const Health = () => {
    const state = useContext(AppContext);
    const [getHealth, setHealth] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getHealthState, setHealthState] = useState("");
    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [healthTotal, setHealthTotal] = useState(0);
    const [notDoneHealth, setNotDoneHealth] = useState(0);
    const [approveHealth, setApproveHealth] = useState(0);
    const [declineHealth, setDeclineHealth] = useState(0);

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
        refreshHealth(
            state.getMissionRowID,
            state.getEeljRowID,
            getHealthState,
            getComandlalID,
            getUnitID
        );
        getHealthTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
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
    };

    const changeUnit = (e) => {
        setUnitID(e.target.value);
        refreshHealth(
            state.getMissionRowID,
            state.getEeljRowID,
            getHealthState,
            getComandlalID,
            e.target.value
        );
        getHealthTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getHealth[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshHealth(
            state.getMissionRowID,
            state.getEeljRowID,
            getHealthState,
            getComandlalID,
            getUnitID
        );
        getHealthTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshHealth = (
        missionID,
        eeljID,
        healthState,
        comandlalID,
        unitID
    ) => {
        axios
            .post("get/main/historys", {
                _missionID: missionID,
                _eeljID: eeljID,
                _healthState: healthState,
                _comandlalID: comandlalID,
                _unitID: unitID,
            })
            .then((res) => {
                setRowsSelected([]);
                setHealth(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeHealthState = (e) => {
        setclickedRowData([]);
        setHealthState(e.target.value);
        refreshHealth(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value,
            getComandlalID,
            getUnitID
        );
    };

    const getHealthTotal = (missionID, eeljID, comandlalID, unitID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/health/total", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                })
                .then((res) => {
                    if (res.data.total != undefined) {
                        setHealthTotal(res.data.total);
                    }
                    if (res.data.notDone != undefined) {
                        setNotDoneHealth(res.data.notDone);
                    }
                    if (res.data.approve != undefined) {
                        setApproveHealth(res.data.approve);
                    }
                    if (res.data.decline != undefined) {
                        setDeclineHealth(res.data.decline);
                    }
                });
        }
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
                            <span className="input-group-text">Төлөв:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeHealthState}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="0">Шийдвэрлэгдээгүй</option>
                            <option value="1">Зөвшөөрөгдсөн</option>
                            <option value="2">Татгалзсан</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Командлал:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setComandlalID(e.target.value);
                                setUnitID("");
                                refreshHealth(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getHealthState,
                                    e.target.value,
                                    ""
                                );
                                getHealthTotal(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    e.target.value,
                                    ""
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
                <div className="col-md-3">
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
            </div>

            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-3">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{healthTotal}</h3>
                            <p>Нийт ЦАХ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-calculator" />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{notDoneHealth}</h3>
                            <p>Шийдвэрлэгдээгүй</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-bell" />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{approveHealth}</h3>
                            <p>Зөвшөөрөгдсөн</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-check" />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>{declineHealth}</h3>
                            <p>Татгалзсан</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-close" />
                        </div>
                    </div>
                </div>
            </div>

            <MUIDatatable
                data={getHealth}
                setdata={setHealth}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ЭРҮҮЛ МЭНДИЙН ҮЗЛЭГ"}
                            excelDownloadData={getHealth}
                            excelHeaders={excelHeaders}
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
                <HealthChild clickedRowData={clickedRowData} />
            )}
        </div>
    );
};

export default Health;

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
        name: "healthHuudas",
        label: "Үзлэгийн хуудас",
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
            setCellProps: () => {
                return { align: "center" };
            },
            customBodyRender: (value) => {
                if (value == 0) {
                    return <span style={{ color: "#F85C36" }}>Аваагүй</span>;
                } else {
                    return <span style={{ color: "#039847" }}>Авсан</span>;
                }
            },
        },
    },
];

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Үзлэгийн хуудас", key: "healthHuudas" },
];
