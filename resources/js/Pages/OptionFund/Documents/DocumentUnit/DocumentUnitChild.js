import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import DocumentUnitNew from "./DocumentUnitNew";
import DocumentUnitEdit from "./DocumentUnitEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";
import DocumentUnitDes from "./DocumentUnitDes";

const DocumentUnitChild = (props) => {
    const state = useContext(AppContext);
    const [getDocUnitChild, setDocUnitChild] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowDataChild, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshDocUnitChild(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
    }, []);

    useEffect(() => {
        refreshDocUnitChild(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID, props.clickedRowData.id]);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getDocUnitChild[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const refreshDocUnitChild = (missionID, eeljID, rowID) => {
        if (
            missionID != undefined &&
            eeljID != undefined &&
            rowID != undefined
        ) {
            axios
                .post("/get/document/child", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _rowID: rowID,
                })
                .then((res) => {
                    setDocUnitChild(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const btnDelete = () => {
        if (getDocUnitChild[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/document/child", {
                            id: getDocUnitChild[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            setRowsSelected([]);
                            Swal.fire(res.data.msg);
                            refreshDocUnitChild(
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
                    <h3>БИЧИГ БАРИМТЫН ОРУУЛГА</h3>
                </div>
                <br />
            </div>
            <MUIDatatable
                data={getDocUnitChild}
                setdata={setDocUnitChild}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"БҮРДҮҮЛСЭН БИЧИГ БАРИМТ"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#documentChildNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getDocUnitChild}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#documentChildEdit"}
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
                <DocumentUnitNew
                    refreshDocUnitChild={refreshDocUnitChild}
                    clickParentRowID={props.clickedRowData.id}
                />
            )}
            <DocumentUnitEdit
                setRowsSelected={setRowsSelected}
                refreshDocUnitChild={refreshDocUnitChild}
                changeDataRow={clickedRowDataChild}
                isEditBtnClick={isEditBtnClick}
                clickParentRowID={props.clickedRowData.id}
            />
            {clickedRowDataChild.approveComandlal == 2 && (
                <>
                    {clickedRowDataChild.approveGsmaf == 2 ? (
                        <DocumentUnitDes clickedRowData={clickedRowDataChild} />
                    ) : (
                        <DocumentUnitDes clickedRowData={clickedRowDataChild} />
                    )}
                </>
            )}
            {/* {clickedRowDataChild.approveComandlal == 2 ||
                (clickedRowDataChild.approveGsmaf == 1 && (
                    <>
                        <DocumentUnitDes clickedRowData={clickedRowDataChild} />
                    </>
                ))} */}
        </div>
    );
};

export default DocumentUnitChild;

const documentPdf = (record) => {
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
        name: "documentName",
        label: "Бичиг баримтын нэр",
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
                        // width: 180,
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
            setCellProps: () => {
                return { align: "center" };
            },
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        // width: 180,
                    },
                };
            },
        },
    },
    {
        name: "documentPdf",
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
                            // onClick={() => documentPdf(value)}
                            onClick={() => documentPdf(record)}
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
    // {
    //     name: "approveComandlal",
    //     label: "Командлал зөвшөөрсөн эсэх",
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
    //                     // width: 120,
    //                 },
    //             };
    //         },
    //         customBodyRender: (value) => {
    //             if (value == 1) {
    //                 return <CheckButton color={"success"}></CheckButton>;
    //             } else if (value == 0) {
    //                 return "Шийдвэрлэгдээгүй";
    //             } else {
    //                 return <DangerousButton color={"error"}></DangerousButton>;
    //             }
    //         },
    //     },
    // },
    {
        name: "approveGsmaf",
        label: "ЗХЖШ зөвшөөрсөн эсэх",
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
                        // width: 120,
                    },
                };
            },
            customBodyRender: (value) => {
                if (value == 1) {
                    return <CheckButton color={"success"}></CheckButton>;
                } else if (value == 0) {
                    return "Шийдвэрлэгдээгүй";
                } else {
                    return <DangerousButton color={"error"}></DangerousButton>;
                }
            },
        },
    },
];

const excelHeaders = [
    { label: "Бичиг баримтын нэр", key: "documentName" },
    { label: "Бичиг баримтад тавигдах шаардлага", key: "documentShaardlaga" },
    { label: "PDF", key: "documentPdf" },
    // { label: "Командлал зөвшөөрсөн эсэх", key: "approveComandlal" },
    { label: "ЗХЖШ зөвшөөрсөн эсэх", key: "approveGsmaf" },
];
