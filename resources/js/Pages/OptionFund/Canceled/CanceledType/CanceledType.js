import React, { useState, useEffect } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import CanceledTypeNew from "./CanceledTypeNew";
import CanceledTypeEdit from "./CanceledTypeEdit";
import Swal from "sweetalert2";

const CanceledType = () => {
    const [getCanceledType, setCanceledType] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshCanceledType();
    }, []);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getCanceledType[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshCanceledType = () => {
        axios
            .get("/get/canceled/types")
            .then((res) => {
                setCanceledType(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getCanceledType[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/canceled/type", {
                            id: getCanceledType[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshCanceledType();
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
                data={getCanceledType}
                setdata={setCanceledType}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ХҮСЭЛТ ЦУЦЛАХ ШАЛТГААН"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#canceledTypeNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getCanceledType}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#canceledTypeEdit"}
                btnDelete={btnDelete}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={true}
                isHideEdit={true}
            />

            <CanceledTypeNew refreshCanceledType={refreshCanceledType} />
            <CanceledTypeEdit
                setRowsSelected={setRowsSelected}
                refreshCanceledType={refreshCanceledType}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default CanceledType;

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
        name: "canceledTypeName",
        label: "Татгалзсан шалтгаан",
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
    { label: "Татгалзсан шалтгаан", key: "canceledTypeName" },
];
