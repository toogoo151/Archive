import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import OronTooNew from "./OronTooNew";
import OronTooEdit from "./OronTooEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";

const OronTooChild = (props) => {
    const state = useContext(AppContext);
    const [getOronTooChild, setOronTooChild] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowDataChild, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshOronTooChild(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
    }, [state.getMissionRowID, state.getEeljRowID, props.clickedRowData.id]);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getOronTooChild[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const refreshOronTooChild = (missionID, eeljID, rowID) => {
        if (
            missionID != undefined &&
            eeljID != undefined &&
            rowID != undefined
        ) {
            axios
                .post("/get/oron/too/child", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _rowID: rowID,
                })
                .then((res) => {
                    setOronTooChild(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const btnDelete = () => {
        if (getOronTooChild[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/oron/too/child", {
                            id: getOronTooChild[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            setRowsSelected([]);
                            Swal.fire(res.data.msg);
                            refreshOronTooChild(
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
                    <h3>БАТАЛЬОНЫ ОРОН ТОО ОРУУЛГА</h3>
                </div>
                <br />
            </div>
            <MUIDatatable
                data={getOronTooChild}
                setdata={setOronTooChild}
                columns={columns}
                costumToolbar={
                    <>
                        {getOronTooChild == "" ? (
                            <CustomToolbar
                                btnClassName={"btn btn-success"}
                                modelType={"modal"}
                                dataTargetID={"#oronTooNew"}
                                spanIconClassName={"fas fa-solid fa-plus"}
                                buttonName={"НЭМЭХ"}
                                // btnInsert={btnInsert}
                                excelDownloadData={getOronTooChild}
                                excelHeaders={excelHeaders}
                                isHideInsert={true}
                            />
                        ) : (
                            <CustomToolbar
                                excelDownloadData={getOronTooChild}
                                excelHeaders={excelHeaders}
                                isHideInsert={false}
                            />
                        )}
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#oronTooEdit"}
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
                <OronTooNew
                    refreshOronTooChild={refreshOronTooChild}
                    clickParentRowID={props.clickedRowData.id}
                />
            )}
            <OronTooEdit
                setRowsSelected={setRowsSelected}
                refreshOronTooChild={refreshOronTooChild}
                changeDataRow={clickedRowDataChild}
                isEditBtnClick={isEditBtnClick}
                clickParentRowID={props.clickedRowData.id}
            />
        </div>
    );
};

export default OronTooChild;

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
        name: "firstName",
        label: "Нэр",
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
        name: "rotName",
        label: "Рот",
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
        name: "salaaName",
        label: "Салаа",
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
        name: "tasagName",
        label: "Тасаг",
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
        name: "positionName",
        label: "Албан тушаал",
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
    { label: "Нэр", key: "firstName" },
    { label: "Рот", key: "rotName" },
    { label: "Салаа", key: "salaaName" },
    { label: "Тасаг", key: "tasagName" },
    { label: "Албан тушаал", key: "positionName" },
];
