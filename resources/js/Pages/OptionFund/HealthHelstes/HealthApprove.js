import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../Context/MyContext";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";
import Swal from "sweetalert2";
import HeltesDes from "./HeltesDes";

const HealthApprove = () => {
    const state = useContext(AppContext);
    const [getHealthDepartment, setHealthDepartment] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getDepartmentState, setDepartmentState] = useState("");
    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [departmentTotal, setDepartmentTotal] = useState(0);
    const [notDoneDepartment, setNotDoneDepartment] = useState(0);
    const [approveDepartment, setApproveDepartment] = useState(0);
    const [declineDepartment, setDeclineDepartment] = useState(0);

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
        refreshHealthDepartment(
            state.getMissionRowID,
            state.getEeljRowID,
            getDepartmentState,
            getComandlalID,
            getUnitID
        );
        getDepartmentTotal(
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
        refreshHealthDepartment(
            state.getMissionRowID,
            state.getEeljRowID,
            getDepartmentState,
            getComandlalID,
            e.target.value
        );
        getDepartmentTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            // setIsEditBtnClick(false);
            setclickedRowData(getHealthDepartment[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshHealthDepartment(
            state.getMissionRowID,
            state.getEeljRowID,
            getDepartmentState,
            getComandlalID,
            getUnitID
        );
        getDepartmentTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshHealthDepartment = (
        missionID,
        eeljID,
        departmentState,
        comandlalID,
        unitID
    ) => {
        axios
            .post("get/main/historys", {
                _missionID: missionID,
                _eeljID: eeljID,
                _department: departmentState,
                _comandlalID: comandlalID,
                _unitID: unitID,
            })
            .then((res) => {
                setRowsSelected([]);
                setHealthDepartment(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDepartmentTotal = (missionID, eeljID, comandlalID, unitID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/department/total", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                })
                .then((res) => {
                    if (res.data.total != undefined) {
                        setDepartmentTotal(res.data.total);
                    }
                    if (res.data.notDone != undefined) {
                        setNotDoneDepartment(res.data.notDone);
                    }
                    if (res.data.approve != undefined) {
                        setApproveDepartment(res.data.approve);
                    }
                    if (res.data.decline != undefined) {
                        setDeclineDepartment(res.data.decline);
                    }
                });
        }
    };

    const heltesPdf = (record) => {
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
            name: "heltesPdf",
            label: "PDF",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            // width: 130,
                        },
                    };
                },
                customBodyRender: (record, tableMeta, updateValue) => {
                    if (record != null) {
                        return (
                            <button
                                className="btn btn-primary btn-sm"
                                style={{ marginRight: "5px" }}
                                onClick={() => heltesPdf(record)}
                            >
                                PDF Харах
                            </button>
                        );
                    } else {
                        return <p>Хоосон</p>;
                    }
                },
            },
        },

        {
            name: "eruulMendHeltesApprove",
            label: "Төлөв",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 160,
                        },
                    };
                },
                customBodyRender: (value) => {
                    if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    }
                    if (value == 0) {
                        return "Шийдвэрлэгдээгүй";
                    } else {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    }
                },
            },
        },
        {
            name: "eruulMendHeltesApprove",
            label: "Эрүүл мэндийн хэлтэс",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 300,
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
                                data-dismiss=""
                                onClick={() => {
                                    fn_confirm_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Зөвшөөрөх
                            </button>
                            &nbsp;&nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-toggle="modal"
                                data-target="#heltesEdit"
                                onClick={() => {
                                    fn_cancel_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Татгалзах
                            </button>
                        </>
                    );
                },
            },
        },
    ];

    const fn_confirm_btn = (value, tableMeta, updateValue) => {
        Swal.fire({
            title: "Та зөвшөөрөхдөө итгэлтэй байна уу?",
            showCancelButton: true,
            confirmButtonText: `Тийм`,
            cancelButtonText: `Үгүй`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/health/department/corfirm", {
                        id: getHealthDepartment[tableMeta.rowIndex].id,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshHealthDepartment(
                            state.getMissionRowID,
                            state.getEeljRowID,
                            getDepartmentState,
                            getComandlalID,
                            getUnitID
                        );
                        setShowModal("");
                    })
                    .catch((err) => {
                        Swal.fire(err.response.data.msg);
                    });
            } else if (result.isDenied) {
            }
        });
    };
    const fn_cancel_btn = (value, tableMeta, updateValue) => {
        <HeltesDes />;
        // Swal.fire({
        //     title: "Та татгалзахдаа итгэлтэй байна уу?",
        //     text: "Татгалзах шалтгаан:",
        //     input: "textarea",
        //     inputValidator: (value) => {
        //         if (!value) {
        //             return "Тайлбар оруулна уу!";
        //         }
        //     },
        //     showCancelButton: true,
        //     confirmButtonText: `Тийм`,
        //     cancelButtonText: `Үгүй`,
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         axios
        //             .post("/health/department/decline", {
        //                 id: getHealthDepartment[tableMeta.rowIndex].id,
        //                 heltesDescription: result.value,
        //             })
        //             .then((res) => {
        //                 Swal.fire(res.data.msg);
        //                 refreshHealthDepartment(
        //                     state.getMissionRowID,
        //                     state.getEeljRowID,
        //                     getDepartmentState,
        //                     getComandlalID,
        //                     getUnitID
        //                 );
        //                 setShowModal("");
        //             })
        //             .catch((err) => {
        //                 Swal.fire(err.response.data.msg);
        //             });
        //     } else if (result.isDenied) {
        //     }
        // });
    };

    const changeDepartmentState = (e) => {
        setDepartmentState(e.target.value);
        refreshHealthDepartment(
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
                            onChange={changeDepartmentState}
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
                                refreshHealthDepartment(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getDepartmentState,
                                    e.target.value,
                                    ""
                                );
                                getDepartmentTotal(
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
                            <h3>{departmentTotal}</h3>
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
                            <h3>{notDoneDepartment}</h3>
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
                            <h3>{approveDepartment}</h3>
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
                            <h3>{declineDepartment}</h3>
                            <p>Татгалзсан</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-close" />
                        </div>
                    </div>
                </div>
            </div>

            <MUIDatatable
                data={getHealthDepartment}
                setdata={setHealthDepartment}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ЭРҮҮЛ МЭНДИЙН ХЭЛТСИЙН ШИЙДВЭР"}
                            excelDownloadData={getHealthDepartment}
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
            {/* {clickedRowData.healthApprove == 2 && ( */}
            <HeltesDes
                onClick={fn_cancel_btn}
                refreshHealthDepartment={refreshHealthDepartment}
                clickParentRowID={clickedRowData.id}
            />
            {/* )} */}
        </div>
    );
};

export default HealthApprove;

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Бичиг баримтын бүрдэл", key: "documentsMainApprove" },
    { label: "Эрүүл мэндийн хэлтэс", key: "eruulMendHeltesApprove" },
];
