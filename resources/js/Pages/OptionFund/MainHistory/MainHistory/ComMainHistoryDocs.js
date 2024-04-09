import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import Swal from "sweetalert2";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";
import CommainEdit from "./CommainEdit";

const ComMainHistoryDocs = (props) => {
    const state = useContext(AppContext);
    const [getMainDocument, setMainDocument] = useState([]);

    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);
    const [isEditBtnClick, setIsEditBtnClick] = useState(false);

    useEffect(() => {
        refreshMainDocument(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
    }, [state.getMissionRowID, state.getEeljRowID, props.clickedRowData.id]);
    const refreshMainDocument = (missionID, eeljID, pkoMainHistoryID) => {
        axios
            .post("get/main/comDocument", {
                _missionID: missionID,
                _eeljID: eeljID,
                _pkoMainHistoryID: pkoMainHistoryID,
            })
            .then((res) => {
                setRowsSelected([]);
                setMainDocument(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getMainDocument[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const btnEdit = () => {
        setIsEditBtnClick(true);
    };
    const columns1 = [
        {
            name: "id",
            label: "№",
            options: {
                filter: true,
                sort: true,
                filter: false,
                align: "center",
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
            name: "comandlalShortName",
            label: "Командлал",
            options: {
                filter: true,
                sort: false,
                display:
                    userType == "comandlalAdmin" || userType == "unitAdmin"
                        ? false
                        : true,
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
            name: "approveComandlal",
            label: "Төлөв",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => {
                    return { align: "center" };
                },
                // display: userType == "unitAdmin" ? false : true,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
                customBodyRender: (value) => {
                    if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    }
                    if (value == 0) {
                        // return "Шийдвэрлэгдээгүй";
                    } else {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    }
                    if (value == 2) {
                        return "Хориглосон";
                    }
                },
            },
        },

        {
            name: "documentName",
            label: "Нэр",
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
            name: "documentPdf",
            label: "PDF бичиг баримт",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (record, tableMeta, updateValue) => {
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
            name: "approveComandlal",
            label: "Зөвшөөрөл олгох",
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

                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={() => {
                                    fn_confirm_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Зөвшөөрөх
                            </button>
                            &nbsp;&nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss=""
                                onClick={() => {
                                    fn_cancel_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Татгалзсан
                            </button>
                            {/* <button onClick={() => console.log(value, tableMeta)}>
                            Зөвшөөрсөн
                        </button>
                        <button onClick={() => console.log(value, tableMeta)}>
                            Татгалзсан
                        </button> */}
                        </>
                    );
                },
            },
        },
    ];
    const fn_confirm_btn = (clickedRowData, fghfgh, fghfghlll) => {
        axios
            .post("/com/confirm", {
                id: getMainDocument[fghfgh.rowIndex].id,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setshow(true);
                props.refreshMainDocument(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickedRowData.id
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };
    const documentPdf = (record) => {
        const newWindow = window.open(
            record,
            "_blank",
            "noopener,noreferrer,resizable"
        );
        if (newWindow) newWindow.opener = null;
    };
    return (
        <>
            <div
                className="info-box"
                style={{
                    padding: "20px",
                    paddingBottom: "0px",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div className="col-md-12" style={{ textAlign: "center" }}>
                    <h1>БИЧИГ БАРИМТЫН БҮРДЭЛ</h1>
                </div>
            </div>
            {/* <h1>БИЧИГ БАРИМТЫН БҮРДЭЛ</h1> */}
            <MUIDatatable
                data={getMainDocument}
                setdata={setMainDocument}
                columns={columns1}
                costumToolbar={
                    <>
                        <CustomToolbar
                            excelDownloadData={getMainDocument}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                btnEdit={btnEdit}
                isHideDelete={false}
                isHideEdit={false}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
            <CommainEdit
                setRowsSelected={setRowsSelected}
                refreshMainDocument={refreshMainDocument}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
                clickParentRowID={props.clickedRowData.id}
            />
        </>
    );
};

export default ComMainHistoryDocs;
const excelHeaders = [
    { label: "№", key: "id" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Нэр", key: "firstName" },
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
];
