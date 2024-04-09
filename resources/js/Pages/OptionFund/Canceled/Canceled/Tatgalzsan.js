import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import Swal from "sweetalert2";

const Tatgalzsan = () => {
    const state = useContext(AppContext);
    const [getTatgalzsan, setTatgalzsan] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [canceledTotal, setCanceledTotal] = useState(0);

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
        refreshTatgalzsan(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
        getCanceledTotal(
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
        refreshTatgalzsan(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value
        );
        getCanceledTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getTatgalzsan[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshTatgalzsan(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
        getCanceledTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshTatgalzsan = (missionID, eeljID, comandlalID, unitID) => {
        axios
            .post("/get/canceled/tatgalzsan", {
                _missionID: missionID,
                _eeljID: eeljID,
                _comandlalID: comandlalID,
                _unitID: unitID,
            })
            .then((res) => {
                setRowsSelected([]);
                setTatgalzsan(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const btnDelete = () => {
        if (getTatgalzsan[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/tatgalzsan", {
                            id: getTatgalzsan[getRowsSelected[0]].id,
                            missionID: state.getMissionRowID,
                            eeljID: state.getEeljRowID,
                        })
                        .then((res) => {
                            setRowsSelected([]);
                            Swal.fire(res.data.msg);
                            refreshTatgalzsan(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                getComandlalID,
                                getUnitID
                            );
                            getCanceledTotal(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                getComandlalID,
                                getUnitID
                            );
                        })
                        .catch((err) => {
                            Swal.fire(err.response.data.msg);
                        });
                } else if (result.isDenied) {
                    // Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
    };

    const getCanceledTotal = (missionID, eeljID, comandlalID, unitID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/canceled/total", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                })
                .then((res) => {
                    if (res.data != undefined) {
                        setCanceledTotal(res.data);
                    }
                });
        }
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

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setComandlalID(e.target.value);
                                setUnitID("");
                                refreshTatgalzsan(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    e.target.value,
                                    ""
                                );
                                getCanceledTotal(
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
                <div className="col-md-4"></div>
                <div className="col-md-2 col-sm-6 col-12">
                    <div className="info-box bg-gradient-info">
                        <span
                            className="info-box-icon"
                            style={{ fontSize: "36px" }}
                        >
                            {canceledTotal}
                        </span>
                        <div className="info-box-content">
                            <span
                                className="info-box-text"
                                style={{ fontSize: "20px" }}
                            >
                                Татгалзсан
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <MUIDatatable
                data={getTatgalzsan}
                setdata={setTatgalzsan}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ТАТГАЛЗСАН ЦАХ-Д"}
                            excelDownloadData={getTatgalzsan}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                btnDelete={btnDelete}
                modelType={showModal}
                isHideDelete={true}
                isHideEdit={false}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
        </div>
    );
};

export default Tatgalzsan;

const canceledPdf = (record) => {
    const newWindow = window.open(
        record,
        "_blank",
        "noopener,noreferrer,resizable"
    );
    if (newWindow) newWindow.opener = null;
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
        name: "canceledTypeName",
        label: "Шалтгаан",
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
        name: "canceledPdf",
        label: "PDF",
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
            customBodyRender: (record, tableMeta, updateValue) => {
                if (record != null) {
                    return (
                        <button
                            className="btn btn-primary btn-sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => canceledPdf(record)}
                        >
                            PDF Харах
                        </button>
                    );
                } else {
                    return <text>Хоосон</text>;
                }
            },
        },
    },
    {
        name: "canceledDescription",
        label: "Тайлбар",
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
    { label: "Шалтгаан", key: "canceledTypeName" },
    { label: "PDF", key: "canceledPdf" },
    { label: "Тайлбар", key: "canceledDescription" },
];
