import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import DocumentSuperChild from "./DocumentSuperChild";

const DocumentComandlal = () => {
    const state = useContext(AppContext);
    const [getDocumentSuper, setDocumentSuper] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getDocumentState, setDocumentState] = useState("complete");
    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [docComTotal, setDocComTotal] = useState(0);
    const [notDoneDocCom, setNotDoneDocCom] = useState(0);
    const [approveDocCom, setApproveDocCom] = useState(0);
    const [declineDocCom, setDeclineDocCom] = useState(0);

    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                setComandlals(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        refreshDocumentSuper(
            state.getMissionRowID,
            state.getEeljRowID,
            getDocumentState,
            getComandlalID,
            getUnitID
        );
    }, []);

    const changeComandlal = (inComandlal) => {
        axios
            .post("/get/ID/byUnit", {
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
        refreshDocumentSuper(
            state.getMissionRowID,
            state.getEeljRowID,
            getDocumentState,
            getComandlalID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getDocumentSuper[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshDocumentSuper(
            state.getMissionRowID,
            state.getEeljRowID,
            getDocumentState,
            getComandlalID,
            getUnitID
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshDocumentSuper = (
        missionID,
        eeljID,
        allState,
        comandlalID,
        unitID
    ) => {
        if (missionID != undefined || eeljID != undefined) {
            axios
                .post("/get/document/super", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _allState: allState,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                })
                .then((res) => {
                    setRowsSelected([]);
                    setDocumentSuper(res.data.getMainHistory);
                    if (res.data.complete != undefined) {
                        setDocComTotal(res.data.complete);
                    }
                    if (res.data.notDone != undefined) {
                        setNotDoneDocCom(res.data.notDone);
                    }
                    if (res.data.approve != undefined) {
                        setApproveDocCom(res.data.approve);
                    }
                    if (res.data.decline != undefined) {
                        setDeclineDocCom(res.data.decline);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const changeDocumentState = (e) => {
        setclickedRowData([]);
        setDocumentState(e.target.value);
        refreshDocumentSuper(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value,
            getComandlalID,
            getUnitID
        );
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
                            onChange={changeDocumentState}
                        >
                            <option value="complete">Бүгд</option>
                            <option value="notDone">Шийдвэрлэгдээгүй</option>
                            <option value="approved">Зөвшөөрөгдсөн</option>
                            <option value="declined">Татгалзсан</option>
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
                                refreshDocumentSuper(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getDocumentState,
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
                            <h3>{docComTotal}</h3>
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
                            <h3>{notDoneDocCom}</h3>
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
                            <h3>{approveDocCom}</h3>
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
                            <h3>{declineDocCom}</h3>
                            <p>Татгалзсан</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-close" />
                        </div>
                    </div>
                </div>
            </div>

            <MUIDatatable
                data={getDocumentSuper}
                setdata={setDocumentSuper}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"БИЧИГ БАРИМТЫН БҮРДЭЛ"}
                            excelDownloadData={getDocumentSuper}
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
                <DocumentSuperChild
                    clickedRowData={clickedRowData}
                    // refreshDocumentSuper={refreshDocumentSuper}
                />
            )}
        </div>
    );
};

export default DocumentComandlal;

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
            display: userType == "gsmafAdmin" ? true : false,
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
        label: "Регистрийн дугаар",
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
];

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Командлал", key: "comandlalShortName" },
    { label: "Анги", key: "unitShortName" },
    { label: "Цол", key: "ranks" },
    { label: "Регистрийн дугаар", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "age", key: "Нас" },
    { label: "Хүйс", key: "genderName" },
];
