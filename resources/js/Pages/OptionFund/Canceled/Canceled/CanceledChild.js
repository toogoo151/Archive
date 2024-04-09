import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import CanceledNew from "./CanceledNew";
import CanceledEdit from "./CanceledEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const CanceledChild = (props) => {
    const state = useContext(AppContext);
    const [getCanceledChild, setCanceledChild] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowDataChild, setclickedRowDataChild] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshCanceledChild(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
    }, [state.getMissionRowID, state.getEeljRowID, props.clickedRowData.id]);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowDataChild(getCanceledChild[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const refreshCanceledChild = (missionID, eeljID, rowID) => {
        if (
            missionID != undefined &&
            eeljID != undefined &&
            rowID != undefined
        ) {
            axios
                .post("/get/canceled/child", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _rowID: rowID,
                })
                .then((res) => {
                    setCanceledChild(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const btnDelete = () => {
        if (getCanceledChild[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/canceled/child", {
                            id: getCanceledChild[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            setRowsSelected([]);
                            Swal.fire(res.data.msg);
                            refreshCanceledChild(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                props.clickedRowData.id
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
                style={{
                    padding: "20px",
                    paddingBottom: "0px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div className="row" style={{ textAlign: "center" }}>
                    <h3>ТАТГАЛЗСАН ШАЛТГААН ОРУУЛГА</h3>
                </div>
                <br />
            </div>
            <MUIDatatable
                data={getCanceledChild}
                setdata={setCanceledChild}
                columns={columns}
                costumToolbar={
                    <>
                        {getCanceledChild == "" ? (
                            <CustomToolbar
                                btnClassName={"btn btn-success"}
                                modelType={"modal"}
                                dataTargetID={"#canceledChildNew"}
                                spanIconClassName={"fas fa-solid fa-plus"}
                                buttonName={"НЭМЭХ"}
                                // btnInsert={btnInsert}
                                excelDownloadData={getCanceledChild}
                                excelHeaders={excelHeaders}
                                isHideInsert={true}
                            />
                        ) : (
                            <CustomToolbar
                                excelDownloadData={getCanceledChild}
                                excelHeaders={excelHeaders}
                                isHideInsert={false}
                            />
                        )}
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#canceledChildEdit"}
                btnDelete={btnDelete}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={true}
                isHideEdit={true}
            />
            <br />
            {state.getMissionRowID != "" && state.getEeljRowID != "" && (
                <CanceledNew
                    refreshCanceledChild={refreshCanceledChild}
                    clickParentRowID={props.clickedRowData.id}
                />
            )}
            <CanceledEdit
                setRowsSelected={setRowsSelected}
                refreshCanceledChild={refreshCanceledChild}
                changeDataRow={clickedRowDataChild}
                isEditBtnClick={isEditBtnClick}
                clickParentRowID={props.clickedRowData.id}
            />
        </div>
    );
};

export default CanceledChild;

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
        name: "canceledTypeName",
        label: "Шалтгаан",
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
        },
    },
    {
        name: "canceledPdf",
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
        },
    },
];

const excelHeaders = [
    { label: "№", key: "id" },
    { label: "Шалтгаан", key: "canceledTypeName" },
    { label: "PDF", key: "canceledPdf" },
    { label: "Тайлбар", key: "canceledDescription" },
];
