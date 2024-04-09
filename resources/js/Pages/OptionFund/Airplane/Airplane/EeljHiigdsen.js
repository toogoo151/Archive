import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import AirplaneEdit from "./AirplaneEdit";

const EeljHiigdsen = () => {
    const state = useContext(AppContext);
    const [getEeljHiigdsen, setEeljHiigdsen] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getRots, setRots] = useState([]);
    const [getSalaas, setSalaas] = useState([]);
    const [getTasags, setTasags] = useState([]);
    const [getAirplaneEeljStates, setAirplaneEeljStates] = useState([]);

    const [getEeljHiigdsenState, setEeljHiigdsenState] = useState("");

    const [getRotID, setRotID] = useState("");
    const [getSalaaID, setSalaaID] = useState("");
    const [getTasagID, setTasagID] = useState("");

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        axios
            .post("/get/rot", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                setRots(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        fn_getState();
        refreshEeljHiigdsen(
            state.getMissionRowID,
            state.getEeljRowID,
            getEeljHiigdsenState,
            getRotID,
            getSalaaID,
            getTasagID
        );
    }, []);

    const fn_getState = () => {
        axios
            .get("/get/airplane/shift/items")
            .then((res) => {
                setAirplaneEeljStates(res.data);
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
        refreshEeljHiigdsen(
            state.getMissionRowID,
            state.getEeljRowID,
            getEeljHiigdsenState,
            getRotID,
            getSalaaID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getEeljHiigdsen[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        fn_getState();
        refreshEeljHiigdsen(
            state.getMissionRowID,
            state.getEeljRowID,
            getEeljHiigdsenState,
            getRotID,
            getSalaaID,
            getTasagID
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshEeljHiigdsen = (
        missionID,
        eeljID,
        airplaneState,
        rotID,
        salaaID,
        tasagID
    ) => {
        axios
            .post("/get/airplane/eelj/hiigdsen", {
                _missionID: missionID,
                _eeljID: eeljID,
                _airplaneState: airplaneState,
                _rotID: rotID,
                _salaaID: salaaID,
                _tasagID: tasagID,
            })
            .then((res) => {
                setRowsSelected([]);
                setEeljHiigdsen(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const btnEdit = () => {
        setIsEditBtnClick(true);
    };

    const changeEeljHiigdsenState = (e) => {
        setEeljHiigdsenState(e.target.value);
        refreshEeljHiigdsen(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value,
            getRotID,
            getSalaaID,
            getTasagID
        );

        setclickedRowData([]);
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
                            <span className="input-group-text">Ээлж:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeEeljHiigdsenState}
                            value={getEeljHiigdsenState}
                        >
                            <option value="">Сонгоно уу</option>
                            {getAirplaneEeljStates.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.airplaneShiftItemName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
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
                                refreshEeljHiigdsen(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getEeljHiigdsenState,
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
                                refreshEeljHiigdsen(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getEeljHiigdsenState,
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
                data={getEeljHiigdsen}
                setdata={setEeljHiigdsen}
                columns={eeljhiigdsen}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"НИСЛЭГИЙН ЭЭЛЖИД ХУВААРИЛАГДСАН ЦАХ-Д"}
                            excelDownloadData={getEeljHiigdsen}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                btnEdit={btnEdit}
                editdataTargetID={"#airplaneEdit"}
                modelType={showModal}
                isHideDelete={false}
                isHideEdit={true}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
            <AirplaneEdit
                setRowsSelected={setRowsSelected}
                refreshEeljHiigdsen={refreshEeljHiigdsen}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
                clickParentRowID={clickedRowData.pkoMainHistoryID}
                // onClick={fn_tomilgoo_btn}
            />
        </div>
    );
};

export default EeljHiigdsen;

const eeljhiigdsen = [
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
        name: "airplaneShiftItemName",
        label: "Явах ээлж",
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
        name: "missionStartDate",
        label: "Явах хугацаа",
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
        name: "arrivedName",
        label: "Ирэх ээлж",
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
        name: "missionFinishDate",
        label: "Ирэх хугацаа",
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
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Гадаад паспортын дугаар", key: "foreignPass" },
    { label: "Гадаад паспортын дуусах хугацаа", key: "foreignFinishDate" },
    { label: "Рот", key: "rotName" },
    { label: "Салаа", key: "salaaName" },
    { label: "Тасаг", key: "tasagName" },
    { label: "Албан тушаал", key: "positionName" },
    { label: "Явах ээлж", key: "airplaneShiftItemName" },
    { label: "Явах хугацаа", key: "missionStartDate" },
    { label: "Ирэх ээлж", key: "arrivedName" },
    { label: "Ирэх хугацаа", key: "missionFinishDate" },
];
