import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import ForeignPassNew from "./ForeignPassNew";
import ForeignPassEdit from "./ForeignPassEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const ForeignPass = () => {
    const state = useContext(AppContext);
    const [getForeignPass, setForeignPass] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshForeignPass(state.getMissionRowID, state.getEeljRowID);
    }, []);
    useEffect(() => {
        refreshForeignPass(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getForeignPass[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshForeignPass = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/foreign/pass", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setForeignPass(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getForeignPass[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/foreign/pass", {
                            id: getForeignPass[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshForeignPass(
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
                data={getForeignPass}
                setdata={setForeignPass}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ГАДААД ПАСПОРТЫН ШААРДЛАГАТАЙ ХУГАЦАА"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#foreignPassNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getForeignPass}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#foreignPassEdit"}
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
                <ForeignPassNew refreshForeignPass={refreshForeignPass} />
            )}

            <ForeignPassEdit
                setRowsSelected={setRowsSelected}
                refreshForeignPass={refreshForeignPass}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default ForeignPass;

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
        name: "foreignFinishDate",
        label: "Гадаад паспортын шаардлагатай хугацаа",
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
    {
        label: "Гадаад паспортын шаардлагатай хугацаа",
        key: "foreignFinishDate",
    },
];
