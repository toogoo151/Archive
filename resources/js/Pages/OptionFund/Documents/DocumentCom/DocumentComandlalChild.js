import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";
import DocumentComadnlalDes from "./DocumentComandlalDes";

const DocumentComandlalChild = (props) => {
    const state = useContext(AppContext);
    const [getDocComChild, setDocComChild] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowDataChild, setclickedRowData] = useState([]);
    const [getComandlalName, setComandlalName] = useState("");
    const [getFirstName, setFirstName] = useState("");

    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshDocComChild(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
    }, []);

    useEffect(() => {
        refreshDocComChild(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID, props.clickedRowData.id]);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getDocComChild[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const refreshDocComChild = (missionID, eeljID, rowID) => {
        if (
            missionID != undefined &&
            eeljID != undefined &&
            rowID != undefined
        ) {
            axios
                .post("/get/document/comandlal/child", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _rowID: rowID,
                })
                .then((res) => {
                    setDocComChild(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        axios
            .get("/get/my/comandlal")
            .then((res) => {
                setComandlalName(res.data.comandlalShortName);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/get/auth/name")
            .then((res) => {
                setFirstName(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
        {
            name: "approveComandlal",
            label: "Командлалын төлөв",
            options: {
                filter: true,
                sort: false,
                display: userType == "gsmafAdmin" ? false : true,
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
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    }
                },
            },
        },

        {
            name: "approveComandlal",
            label: "Командлал",
            options: {
                filter: true,
                sort: false,
                display: userType == "gsmafAdmin" ? false : true,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 300,
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
                                Татгалзах
                            </button>
                        </>
                    );
                },
            },
        },
        {
            name: "approveGsmaf",
            label: "ЗХЖШ-ын төлөв",
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
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    }
                },
            },
        },
        {
            name: "approveGsmaf",
            label: "ЗХЖШ",
            options: {
                filter: true,
                sort: false,
                display: userType == "comandlalAdmin" ? false : true,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 300,
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
                                Татгалзах
                            </button>
                        </>
                    );
                },
            },
        },
    ];

    const fn_confirm_btn = (value, tableMeta, updateValue) => {
        Swal.fire({
            title: "Та зөвшөөрөхдөө итгэлтэй байна уу?",
            showCancelButton: true,
            confirmButtonText: `Тийм`,
            cancelButtonText: `Үгүй`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/document/comandlal/confirm", {
                        id: getDocComChild[tableMeta.rowIndex].id,
                        _missionID: state.getMissionRowID,
                        _eeljID: state.getEeljRowID,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshDocComChild(
                            state.getMissionRowID,
                            state.getEeljRowID,
                            props.clickedRowData.id
                        );
                        setShowModal("");
                    })
                    .catch((err) => {
                        Swal.fire(err.response.data.msg);
                    });
            } else if (result.isDenied) {
            }
        });
    };
    const fn_cancel_btn = (value, tableMeta, updateValue) => {
        Swal.fire({
            title: "Та татгалзахдаа итгэлтэй байна уу?",
            text: "Татгалзах шалтгаан:",
            input: "textarea",
            inputValidator: (value) => {
                if (!value) {
                    return "Тайлбар оруулна уу!";
                }
            },
            showCancelButton: true,
            confirmButtonText: `Тийм`,
            cancelButtonText: `Үгүй`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/document/comandlal/decline", {
                        id: getDocComChild[tableMeta.rowIndex].id,
                        docDescription: result.value,
                        comandlalName: getComandlalName,
                        adminName: getFirstName,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshDocComChild(
                            state.getMissionRowID,
                            state.getEeljRowID,
                            props.clickedRowData.id
                        );
                        setShowModal("");
                    })
                    .catch((err) => {
                        Swal.fire(err.response.data.msg);
                    });
            } else if (result.isDenied) {
            }
        });
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
                    <h3>БИЧИГ БАРИМТЫН ЗӨВШӨӨРӨЛ</h3>
                </div>
                <br />
            </div>
            <MUIDatatable
                data={getDocComChild}
                setdata={setDocComChild}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            excelDownloadData={getDocComChild}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                modelType={showModal}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={false}
                isHideEdit={false}
            />
            <br />

            {userType === "comandlalAdmin" && (
                <>
                    {clickedRowDataChild.approveComandlal == 2 ? (
                        <DocumentComadnlalDes
                            clickedRowData={clickedRowDataChild}
                        />
                    ) : (
                        <>
                            {clickedRowDataChild.approveGsmaf == 2 && (
                                <DocumentComadnlalDes
                                    clickedRowData={clickedRowDataChild}
                                />
                            )}
                        </>
                    )}
                </>
            )}
            {userType === "gsmafAdmin" && (
                <>
                    {clickedRowDataChild.approveGsmaf == 2 && (
                        <DocumentComadnlalDes
                            clickedRowData={clickedRowDataChild}
                        />
                    )}
                </>
            )}
            <br />
        </div>
    );
};

export default DocumentComandlalChild;

const excelHeaders = [
    { label: "№", key: "id" },
    { label: "Бичиг баримтын нэр", key: "documentName" },
    { label: "Бичиг баримтад тавигдах шаардлага", key: "documentShaardlaga" },
    { label: "PDF", key: "documentPdf" },
    { label: "Командлал зөвшөөрсөн эсэх", key: "approveComandlal" },
    { label: "ЗХЖШ зөвшөөрсөн эсэх", key: "approveGsmaf" },
];
