import React, { useState, useEffect } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import UuregApplauseSubNew from "./UuregApplauseSubNew";
import UuregApplauseSubEdit from "./UuregApplauseSubEdit";
import Swal from "sweetalert2";

const UuregApplauseSub = () => {
    const [getUuregApplauseSub, setUuregApplauseSub] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshUuregApplauseSub();
    }, []);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getUuregApplauseSub[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshUuregApplauseSub = () => {
        axios
            .get("/get/uureg/applause/subs")
            .then((res) => {
                setUuregApplauseSub(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getUuregApplauseSub[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/uureg/applause/sub", {
                            id: getUuregApplauseSub[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshUuregApplauseSub();
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
                data={getUuregApplauseSub}
                setdata={setUuregApplauseSub}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"САЙШААЛ || ШИЙТГЭЛИЙН ХЭЛБЭРҮҮД"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#uuregApplauseSubNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getUuregApplauseSub}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#uuregApplauseSubEdit"}
                btnDelete={btnDelete}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={true}
                isHideEdit={true}
            />

            <UuregApplauseSubNew
                refreshUuregApplauseSub={refreshUuregApplauseSub}
            />
            <UuregApplauseSubEdit
                setRowsSelected={setRowsSelected}
                refreshUuregApplauseSub={refreshUuregApplauseSub}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default UuregApplauseSub;

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
        name: "isApplauseName",
        label: "Төрөл",
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
        name: "applauseHelber",
        label: "Хэлбэр",
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
    { label: "Төрөл", key: "isApplauseName" },
    { label: "Хэлбэр", key: "applauseHelber" },
];
