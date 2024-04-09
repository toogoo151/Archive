import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../Context/MyContext";
import Swal from "sweetalert2";

const HealthHuudas = () => {
    const state = useContext(AppContext);
    const [getHealthHuudas, setHealthHuudas] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getHealthHuudasState, setHealthHuudasState] = useState(0);
    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [healthTotal, setHealthHuudasTotal] = useState(0);
    const [huudasAvaagui, setHuudasAvaagui] = useState(0);
    const [huudasAvsan, setHuudasAvsan] = useState(0);

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
        refreshHealthHuudas(
            state.getMissionRowID,
            state.getEeljRowID,
            getHealthHuudasState,
            getComandlalID,
            getUnitID
        );
        getHealthHuudasTotal(
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
        refreshHealthHuudas(
            state.getMissionRowID,
            state.getEeljRowID,
            getHealthHuudasState,
            getComandlalID,
            e.target.value
        );
        getHealthHuudasTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getHealthHuudas[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshHealthHuudas(
            state.getMissionRowID,
            state.getEeljRowID,
            getHealthHuudasState,
            getComandlalID,
            getUnitID
        );
        getHealthHuudasTotal(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshHealthHuudas = (
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
                setHealthHuudas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeHealthState = (e) => {
        setclickedRowData([]);
        setHealthHuudasState(e.target.value);
        refreshHealthHuudas(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value,
            getComandlalID,
            getUnitID
        );
    };

    const getHealthHuudasTotal = (missionID, eeljID, comandlalID, unitID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/huudas/total", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                })
                .then((res) => {
                    if (res.data.total != undefined) {
                        setHealthHuudasTotal(res.data.total);
                    }
                    if (res.data.avaagui != undefined) {
                        setHuudasAvaagui(res.data.avaagui);
                    }
                    if (res.data.avsan != undefined) {
                        setHuudasAvsan(res.data.avsan);
                    }
                });
        }
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
                            width: 200,
                        },
                    };
                },
                setCellProps: () => {
                    return { align: "center" };
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    if (value == 0) {
                        return (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-dismiss=""
                                    onClick={() => {
                                        fn_olgoh_btn(
                                            value,
                                            tableMeta,
                                            updateValue
                                        );
                                    }}
                                >
                                    Өгөх
                                </button>
                            </>
                        );
                    } else {
                        return (
                            <span style={{ color: "#039847" }}>
                                Авсан байна
                            </span>
                        );
                    }
                },
            },
        },
    ];

    const fn_olgoh_btn = (value, tableMeta, updateValue) => {
        Swal.fire({
            title: "Та өгөхдөө итгэлтэй байна уу?",
            showCancelButton: true,
            confirmButtonText: `Тийм`,
            cancelButtonText: `Үгүй`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/is/huudas/olgoh", {
                        id: getHealthHuudas[tableMeta.rowIndex].id,
                        missionID: state.getMissionRowID,
                        eeljID: state.getEeljRowID,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshHealthHuudas(
                            state.getMissionRowID,
                            state.getEeljRowID,
                            getHealthHuudasState,
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
                            <span className="input-group-text">
                                Эрүүл мэндийн хуудас:
                            </span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeHealthState}
                        >
                            <option value="0">Аваагүй</option>
                            <option value="1">Авсан</option>
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
                                refreshHealthHuudas(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getHealthHuudasState,
                                    e.target.value,
                                    ""
                                );
                                getHealthHuudasTotal(
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
                            <h3>{huudasAvaagui}</h3>
                            <p>Хуудас аваагүй</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-bell" />
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{huudasAvsan}</h3>
                            <p>Хуудас авсан</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-check" />
                        </div>
                    </div>
                </div>
            </div>

            <MUIDatatable
                data={getHealthHuudas}
                setdata={setHealthHuudas}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ЭРҮҮЛ МЭНДИЙН ҮЗЛЭГИЙН ХУУДАС"}
                            excelDownloadData={getHealthHuudas}
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

export default HealthHuudas;

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Үзлэгийн хуудас", key: "healthHuudas" },
];
