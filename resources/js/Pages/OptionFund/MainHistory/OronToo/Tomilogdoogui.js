import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import OronTooNew from "./OronTooNew";
import UserDetails from "../MainHistory/UserDetails";

const Tomilogdoogui = (props) => {
    const state = useContext(AppContext);
    const [getTomilogdoogui, setTomilogdoogui] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getUserDetails, setUserDetails] = useState([]);
    const [getMissionHistory, setMissionHistory] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

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
        refreshTomilogdoogui(
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
        refreshTomilogdoogui(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getTomilogdoogui[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshTomilogdoogui(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshTomilogdoogui = (missionID, eeljID, comandlalID, unitID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/tomilogdoogui", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                })
                .then((res) => {
                    setRowsSelected([]);
                    setTomilogdoogui(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const tomilogdoogui = [
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
            name: "id",
            label: "Дэлгэрэнгүй",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 100,
                        },
                    };
                },
                setCellProps: () => {
                    return { align: "center" };
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-toggle="modal"
                                data-target="#userDetails"
                                onClick={() => {
                                    fn_details_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Дэлгэрэнгүй
                            </button>
                        </>
                    );
                },
            },
        },
        {
            name: "id",
            label: "Томилгоо хийх",
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
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-toggle="modal"
                                data-target="#oronTooNew"
                                onClick={() => {
                                    fn_tomilgoo_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Томилох
                            </button>
                        </>
                    );
                },
            },
        },
    ];

    const fn_details_btn = (value, tableMeta, updateValue) => {
        axios
            .post("/get/user/details", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                _id: value,
            })
            .then((res) => {
                setUserDetails(res.data.getUserDetails);
                setMissionHistory(res.data.getMissionHistory);
            })
            .catch((err) => {
                console.log(err);
            });
        <UserDetails />;
    };

    const fn_tomilgoo_btn = (value, tableMeta, updateValue) => {
        <OronTooNew
        // clickParentRowID={getTomilogdoogui[tableMeta.rowIndex].id}
        />;
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

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setComandlalID(e.target.value);
                                setUnitID("");
                                refreshTomilogdoogui(
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
            <MUIDatatable
                data={getTomilogdoogui}
                setdata={setTomilogdoogui}
                columns={tomilogdoogui}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"БАТАЛЬОНЫ ОРОН ТООНД ТОМИЛОГДООГҮЙ ЦАХ-Д"}
                            excelDownloadData={getTomilogdoogui}
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
            <UserDetails
                onClick={fn_details_btn}
                refreshTomilogdoogui={refreshTomilogdoogui}
                clickedRowData={clickedRowData}
                getUserDetails={getUserDetails}
                getMissionHistory={getMissionHistory}
            />
            <OronTooNew
                refreshTomilogdoogui={refreshTomilogdoogui}
                onClick={fn_tomilgoo_btn}
                clickParentRowID={clickedRowData.id}
            />
        </div>
    );
};

export default Tomilogdoogui;

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
];
