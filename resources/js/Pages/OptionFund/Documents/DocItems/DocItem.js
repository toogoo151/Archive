import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import DocItemNew from "./DocItemNew";
import DocItemEdit from "./DocItemEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
const DocItem = () => {
    const state = useContext(AppContext);
    const [getDocItem, setDocItem] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshDocItem(state.getMissionRowID, state.getEeljRowID);
    }, []);
    useEffect(() => {
        refreshDocItem(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getDocItem[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshDocItem = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/doc/items", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setDocItem(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getDocItem[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/doc/item", {
                            id: getDocItem[getRowsSelected[0]].id,
                            documentZagvar:
                                getDocItem[getRowsSelected[0]].documentZagvar,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshDocItem(
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
                data={getDocItem}
                setdata={setDocItem}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"БИЧИГ БАРИМТЫН ТӨРӨЛ"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#docItemNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getDocItem}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#docItemEdit"}
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
                <DocItemNew refreshDocItem={refreshDocItem} />
            )}

            <DocItemEdit
                setRowsSelected={setRowsSelected}
                refreshDocItem={refreshDocItem}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default DocItem;

const zagvarPdf = (record) => {
    const newWindow = window.open(
        "https://psod.maf.gov.mn/storage" + record,
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
        name: "documentName",
        label: "Бичиг баримтын нэр",
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
        name: "documentShaardlaga",
        label: "Бичиг баримтад тавигдах шаардлага",
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
        name: "documentZagvar",
        label: "Загвар",
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
                if (record != null) {
                    return (
                        <button
                            className="btn btn-primary btn-sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => zagvarPdf(record)}
                        >
                            Загвар харах
                        </button>
                    );
                } else {
                    return <span>Хоосон</span>;
                }
            },
        },
    },
];

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Бичиг баримтын нэр", key: "documentName" },
    { label: "Бичиг баримтад тавигдах шаардлага", key: "documentShaardlaga" },
];
