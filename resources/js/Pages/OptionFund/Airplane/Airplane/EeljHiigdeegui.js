import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import AirplaneNew from "./AirplaneNew";

const EeljHiigdeegui = () => {
    const state = useContext(AppContext);
    const [getEeljHiigdeegui, setEeljHiigdeegui] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getRots, setRots] = useState([]);
    const [getSalaas, setSalaas] = useState([]);
    const [getTasags, setTasags] = useState([]);

    const [getRotID, setRotID] = useState("");
    const [getSalaaID, setSalaaID] = useState("");
    const [getTasagID, setTasagID] = useState("");

    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        fn_getRots(state.getMissionRowID, state.getEeljRowID);
        refreshEeljHiigdeegui(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            getTasagID
        );
    }, []);

    const fn_getRots = (missionID, eeljID) => {
        axios
            .post("/get/rot", {
                _missionID: missionID,
                _eeljID: eeljID,
            })
            .then((res) => {
                setRots(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeRot = (rotID) => {
        axios
            .post("/get/salaa/by/rotID", {
                _rotID: rotID,
            })
            .then((res) => {
                setSalaas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeSalaa = (salaaID) => {
        axios
            .post("/get/tasag/by/salaaID", {
                _salaaID: salaaID,
            })
            .then((res) => {
                setTasags(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const changeTasag = (e) => {
        setTasagID(e.target.value);
        refreshEeljHiigdeegui(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getEeljHiigdeegui[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        fn_getRots(state.getMissionRowID, state.getEeljRowID);
        refreshEeljHiigdeegui(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            getTasagID
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshEeljHiigdeegui = (
        missionID,
        eeljID,
        rotID,
        salaaID,
        tasagID
    ) => {
        axios
            .post("/get/airplanes", {
                _missionID: missionID,
                _eeljID: eeljID,
                _rotID: rotID,
                _salaaID: salaaID,
                _tasagID: tasagID,
            })
            .then((res) => {
                setRowsSelected([]);
                setEeljHiigdeegui(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
            name: "rotName",
            label: "Рот",
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
            name: "salaaName",
            label: "Салаа",
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
            name: "tasagName",
            label: "Тасаг",
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
            name: "positionName",
            label: "Албан тушаал",
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
            label: "Нислэгийн ээлж",
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
                                data-target="#airplaneNew"
                                onClick={() => {
                                    fn_tomilgoo_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Хуваарилах
                            </button>
                        </>
                    );
                },
            },
        },
    ];

    const fn_tomilgoo_btn = (value, tableMeta, updateValue) => {
        <AirplaneNew />;
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
                            <span className="input-group-text">Рот:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setRotID(e.target.value);
                                setSalaaID("");
                                setTasagID("");
                                refreshEeljHiigdeegui(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    e.target.value,
                                    "",
                                    ""
                                );
                                changeRot(e.target.value);
                            }}
                        >
                            <option value="">Сонгоно уу</option>
                            {getRots.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.rotName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Салаа:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setSalaaID(e.target.value);
                                setTasagID("");
                                refreshEeljHiigdeegui(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getRotID,
                                    e.target.value,
                                    ""
                                );
                                changeSalaa(e.target.value);
                            }}
                        >
                            <option value="">Сонгоно уу</option>
                            {getSalaas.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.salaaName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Тасаг:</span>
                        </div>

                        <select className="form-control" onChange={changeTasag}>
                            <option value="">Сонгоно уу</option>
                            {getTasags.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.tasagName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <MUIDatatable
                data={getEeljHiigdeegui}
                setdata={setEeljHiigdeegui}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"НИСЛЭГИЙН ЭЭЛЖИД ХУВААРИЛАГДААГҮЙ ЦАХ-Д"}
                            excelDownloadData={getEeljHiigdeegui}
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
            <AirplaneNew
                refreshEeljHiigdeegui={refreshEeljHiigdeegui}
                onClick={fn_tomilgoo_btn}
                clickParentRowID={clickedRowData.pkoMainHistoryID}
            />
        </div>
    );
};

export default EeljHiigdeegui;

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Рот", key: "rotName" },
    { label: "Салаа", key: "salaaName" },
    { label: "Тасаг", key: "tasagName" },
    { label: "Албан тушаал", key: "positionName" },
];
