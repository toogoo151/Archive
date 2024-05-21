import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";

const ComissionHealth = () => {
    const state = useContext(AppContext);
    const [getComissionHealth, setComissionHealth] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

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
        refreshComissionHealth(
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
        refreshComissionHealth(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getComissionHealth[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshComissionHealth(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshComissionHealth = (missionID, eeljID, comandlalID, unitID) => {
        axios
            .post("/get/comission/health", {
                _missionID: missionID,
                _eeljID: eeljID,
                _comandlalID: comandlalID,
                _unitID: unitID,
            })
            .then((res) => {
                setRowsSelected([]);
                setComissionHealth(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const healthPdf = (record) => {
        const newWindow = window.open(
            "/storage" + record,
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
            name: "healthPdf",
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
                    if (record != "") {
                        return (
                            <button
                                className="btn btn-primary btn-sm"
                                style={{ marginRight: "5px" }}
                                onClick={() => healthPdf(record)}
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
            name: "healthApprove",
            label: "Эрүүл мэндийн үзлэгээр тэнцсэн эсэх",
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
                            width: 120,
                        },
                    };
                },
                customBodyRender: (value) => {
                    if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    } else if (value == 0) {
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
            name: "healthEditDes",
            label: "Засах болсон шалтгаан",
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
            name: "healthEdit",
            label: "Хүсэлт шийдвэрлэх",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 350,
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
                                    fn_done_btn(value, tableMeta, updateValue);
                                }}
                            >
                                Зөвшөөрөх
                            </button>
                            &nbsp;&nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss=""
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

    const fn_done_btn = (value, tableMeta, updateValue) => {
        Swal.fire({
            title: "Та зөвшөөрөхдөө итгэлтэй байна уу?",
            showCancelButton: true,
            confirmButtonText: `Тийм`,
            cancelButtonText: `Үгүй`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/comission/health/confirm", {
                        id: getComissionHealth[tableMeta.rowIndex].id,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshComissionHealth(
                            state.getMissionRowID,
                            state.getEeljRowID,
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
        Swal.fire({
            title: "Та татгалзахдаа итгэлтэй байна уу?",
            // text: "Татгалзах шалтгаан:",
            // input: "textarea",
            // inputValidator: (value) => {
            //     if (!value) {
            //         return "Тайлбар оруулна уу!";
            //     }
            // },
            showCancelButton: true,
            confirmButtonText: `Тийм`,
            cancelButtonText: `Үгүй`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/comission/health/decline", {
                        id: getComissionHealth[tableMeta.rowIndex].id,
                        // docDescription: result.value,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshComissionHealth(
                            state.getMissionRowID,
                            state.getEeljRowID,
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
                                refreshComissionHealth(
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
                data={getComissionHealth}
                setdata={setComissionHealth}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ЗАСАХ ХҮСЭЛТ ШИЙДВЭРЛЭХ"}
                            excelDownloadData={getComissionHealth}
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
        </div>
    );
};

export default ComissionHealth;

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Командлал", key: "comandlalShortName" },
    { label: "Анги", key: "unitShortName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Засах болсон шалтгаан", key: "healthEditDes" },
];
