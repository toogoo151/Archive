import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import SportTypeNew from "./SportTypeNew";
import SportTypeEdit from "./SportTypeEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
const SportType = () => {
    const state = useContext(AppContext);
    const [getSportType, setSportType] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshSportType(state.getMissionRowID, state.getEeljRowID);
    }, []);
    useEffect(() => {
        refreshSportType(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getSportType[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshSportType = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/sport/types", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setSportType(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getSportType[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/sport/type", {
                            id: getSportType[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshSportType(
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
                data={getSportType}
                setdata={setSportType}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"БИЕИЙН ТАМИРЫН НОРМАТИВЫН ТӨРЛҮҮД"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#sportTypeNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getSportType}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#sportTypeEdit"}
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
                <SportTypeNew refreshSportType={refreshSportType} />
            )}

            <SportTypeEdit
                setRowsSelected={setRowsSelected}
                refreshSportType={refreshSportType}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default SportType;

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
    // {
    //     name: "missionName",
    //     label: "Ажиллагааны нэр",
    //     options: {
    //         filter: true,
    //         sort: false,
    //         setCellHeaderProps: (value) => {
    //             return {
    //                 style: {
    //                     backgroundColor: "#5DADE2",
    //                     color: "white",
    //                 },
    //             };
    //         },
    //     },
    // },
    // {
    //     name: "eeljName",
    //     label: "Ээлж",
    //     options: {
    //         filter: true,
    //         sort: false,
    //         setCellHeaderProps: (value) => {
    //             return {
    //                 style: {
    //                     backgroundColor: "#5DADE2",
    //                     color: "white",
    //                 },
    //             };
    //         },
    //     },
    // },
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
    {
        name: "sportTypeName",
        label: "Нормативын төрөл",
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
    { label: "Хүйс", key: "genderName" },
    { label: "Нормативын төрөл", key: "sportTypeName" },
];
