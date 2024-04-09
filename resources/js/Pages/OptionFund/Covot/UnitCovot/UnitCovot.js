import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import UnitCovotNew from "./UnitCovotNew";
import UnitCovotEdit from "./UnitCovotEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const UnitCovot = () => {
    const state = useContext(AppContext);
    const [getUnitCovot, setUnitCovot] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    const [covotSum, setCovotSum] = useState(0);
    const [covotGived, setCovotGived] = useState(0);
    const [covotRemained, setCovotRemained] = useState(0);

    useEffect(() => {
        refreshUnitCovot(state.getMissionRowID, state.getEeljRowID);
        getCovotSum(state.getMissionRowID, state.getEeljRowID);
    }, []);

    useEffect(() => {
        refreshUnitCovot(state.getMissionRowID, state.getEeljRowID);
        getCovotSum(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getUnitCovot[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshUnitCovot = (missionID, eeljID) => {
        axios
            .post("/get/unit/covots", {
                _missionID: missionID,
                _eeljID: eeljID,
            })
            .then((res) => {
                setUnitCovot(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getCovotSum = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/covot/sum/comandlal/in", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    if (res.data.sum != undefined) {
                        setCovotSum(res.data.sum);
                    }
                    if (res.data.gived != undefined) {
                        setCovotGived(res.data.gived);
                    }
                    if (res.data.remained != undefined) {
                        setCovotRemained(res.data.remained);
                    }
                });
        }
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getUnitCovot[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/unit/covot", {
                            id: getUnitCovot[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            getCovotSum(
                                state.getMissionRowID,
                                state.getEeljRowID
                            );
                            refreshUnitCovot(
                                state.getMissionRowID,
                                state.getEeljRowID
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
    const btnEdit = () => {
        setIsEditBtnClick(true);
    };
    return (
        <div>
            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-2">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{covotSum}</h3>
                            <p>Нийт квот</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-calculator" />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{covotGived}</h3>
                            <p>Олгогдсон</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-plus" />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{covotRemained}</h3>
                            <p>Үлдсэн</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-tasks" />
                        </div>
                    </div>
                </div>
            </div>
            <MUIDatatable
                data={getUnitCovot}
                setdata={setUnitCovot}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"КВОТ ОЛГОХ"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#unitCovotNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getUnitCovot}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#unitCovotEdit"}
                btnDelete={btnDelete}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={true}
                isHideEdit={true}
            />

            {state.getMissionRowID != "" && state.getEeljRowID != "" && (
                <UnitCovotNew
                    refreshUnitCovot={refreshUnitCovot}
                    getCovotSum={getCovotSum}
                    covotRemained={covotRemained}
                />
            )}
            <UnitCovotEdit
                setRowsSelected={setRowsSelected}
                refreshUnitCovot={refreshUnitCovot}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
                getCovotSum={getCovotSum}
                covotRemained={covotRemained}
            />
        </div>
    );
};

export default UnitCovot;

const columns = [
    {
        name: "id",
        label: "№",
        options: {
            filter: true,
            sort: true,
            filter: false,
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
    // {
    //     name: "comandlalShortName",
    //     label: "Командлал",
    //     options: {
    //         filter: true,
    //         sort: false,
    //         setCellProps: () => {
    //             return { align: "center" };
    //         },
    //         setCellHeaderProps: (value) => {
    //             return {
    //                 style: {
    //                     backgroundColor: "#5DADE2",
    //                     color: "white",
    //                     width: 180,
    //                 },
    //             };
    //         },
    //     },
    // },
    {
        name: "unitShortName",
        label: "Анги",
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
                        width: 180,
                    },
                };
            },
        },
    },
    {
        name: "covotOppitser",
        label: "Офицер",
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
                        width: 130,
                    },
                };
            },
        },
    },
    {
        name: "covotAhlagch",
        label: "Ахлагч",
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
                        width: 130,
                    },
                };
            },
        },
    },
    {
        name: "covotGereet",
        label: "Гэрээт",
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
                        width: 130,
                    },
                };
            },
        },
    },
    {
        name: "covotUnitSum",
        label: "Нийт",
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
                        width: 130,
                    },
                };
            },
        },
    },
    {
        name: "covotDescription",
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
    { label: "Командлал", key: "comandlalShortName" },
    { label: "Анги", key: "unitShortName" },
    { label: "Офицер", key: "covotOppitser" },
    { label: "Ахлагч", key: "covotAhlagch" },
    { label: "Гэрээт", key: "covotGereet" },
    { label: "Нийт", key: "covotComandlalSum" },
    { label: "Тайлбар", key: "covotDescription" },
];
