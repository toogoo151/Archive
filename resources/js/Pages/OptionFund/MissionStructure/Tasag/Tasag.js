import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import TasagNew from "./TasagNew";
import TasagEdit from "./TasagEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
const Tasag = () => {
    const state = useContext(AppContext);
    const [getTasag, setTasag] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshTasag(state.getMissionRowID, state.getEeljRowID);
    }, []);
    useEffect(() => {
        refreshTasag(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getTasag[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshTasag = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/tasag", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setTasag(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getTasag[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/tasag", {
                            id: getTasag[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshTasag(
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
            <MUIDatatable
                data={getTasag}
                setdata={setTasag}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ТАСАГ"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#tasagNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getTasag}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#tasagEdit"}
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
                <TasagNew refreshTasag={refreshTasag} />
            )}

            <TasagEdit
                setRowsSelected={setRowsSelected}
                refreshTasag={refreshTasag}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default Tasag;

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
        label: "Ротын нэр",
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
        label: "Салааны нэр",
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
        label: "Тасгийн нэр",
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
        name: "tasagShortName",
        label: "Товч нэр",
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
    { label: "Ротын нэр", key: "rotName" },
    { label: "Салааны нэр", key: "salaaName" },
    { label: "Тасгийн нэр", key: "tasagName" },
    { label: "Товч нэр", key: "tasagShortName" },
];
