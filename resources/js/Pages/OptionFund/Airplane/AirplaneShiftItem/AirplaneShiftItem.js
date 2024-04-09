import React, { useState, useEffect } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import AirplaneShiftItemNew from "./AirplaneShiftItemNew";
import AirplaneShiftItemEdit from "./AirplaneShiftItemEdit";
import Swal from "sweetalert2";

const AirplaneShiftItem = () => {
    const [getAirplaneShiftItem, setAirplaneShiftItem] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshAirplaneShiftItem();
    }, []);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getAirplaneShiftItem[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshAirplaneShiftItem = () => {
        axios
            .get("/get/airplane/shift/items")
            .then((res) => {
                setAirplaneShiftItem(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getAirplaneShiftItem[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/airplane/shift/item", {
                            id: getAirplaneShiftItem[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshAirplaneShiftItem();
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
                data={getAirplaneShiftItem}
                setdata={setAirplaneShiftItem}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"НИСЛЭГИЙН ЭЭЛЖ"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#airplaneShiftItemNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getAirplaneShiftItem}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#airplaneShiftItemEdit"}
                btnDelete={btnDelete}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={true}
                isHideEdit={true}
            />

            <AirplaneShiftItemNew
                refreshAirplaneShiftItem={refreshAirplaneShiftItem}
            />
            <AirplaneShiftItemEdit
                setRowsSelected={setRowsSelected}
                refreshAirplaneShiftItem={refreshAirplaneShiftItem}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default AirplaneShiftItem;

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
        name: "airplaneShiftItemName",
        label: "Нислэгийн ээлж",
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
    { label: "Нислэгийн ээлж", key: "airplaneShiftItemName" },
];
