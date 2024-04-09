import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import DocumentUserNew from "../DocumentUser/DocumentUserNew";
import DocumentUserEdit from "../DocumentUser/DocumentUserEdit";
import Swal from "sweetalert2";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";
import DocumentUnitDes from "../DocumentUnit/DocumentUnitDes";

const DocumentUser = () => {
    const [getDocUser, setDocUser] = useState([]);
    const [getMainHistoryID, setMainHistoryID] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowDataChild, setclickedRowData] = useState([]);

    const [isDocumentAddButton, setIsDocumentAddButton] = useState(false);

    const [getMission, setMission] = useState([]);
    const [getEelj, setEelj] = useState([]);
    const [missionID, setMissionID] = useState("");
    const [eeljID, setEeljID] = useState("");

    const [getMyDocTotal, setMyDocTotal] = useState(0);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        axios
            .get("/get/missions")
            .then((res) => {
                setMission(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        refreshDocUser(missionID, eeljID);
        fn_isDocumentAddButton(missionID, eeljID);
    }, []);

    const changeMission = (e) => {
        setMissionID(e.target.value);
        setEeljID("");
        axios
            .post("/get/eelj/by/missionID", {
                _missionID: e.target.value,
            })
            .then((res) => {
                setEelj(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        refreshDocUser(missionID, eeljID);
        fn_isDocumentAddButton(missionID, eeljID);
        setclickedRowData([]);
    }, [missionID, eeljID]);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getDocUser[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const refreshDocUser = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/document/user", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setDocUser(res.data.getDocUser);
                    setMainHistoryID(res.data.pkoMainHistoryID);
                    setMyDocTotal(res.data.getMyDocTotal);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const btnDelete = () => {
        if (getDocUser[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/document/child", {
                            id: getDocUser[getRowsSelected[0]].id,
                            documentPdf:
                                getDocUser[getRowsSelected[0]].documentPdf,
                        })
                        .then((res) => {
                            setRowsSelected([]);
                            Swal.fire(res.data.msg);
                            refreshDocUser(missionID, eeljID);
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

    const fn_isDocumentAddButton = (missionID, eeljID) => {
        if (missionID != "" && eeljID != "") {
            axios
                .post("/is/document/add/button", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setIsDocumentAddButton(res.data);
                });
        }
    };

    return (
        <div>
            {isMobile ? (
                <p
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    Уучлаарай та энэ хэсгийг утсаар үзэх боломжгүй байна!!!{" "}
                    <strong>/Компьютероос хандана уу/</strong>
                </p>
            ) : (
                <div>
                    <div
                        className="info-box"
                        style={{
                            padding: "20px",
                            paddingBottom: "0px",
                        }}
                    >
                        <div className="col-md-3">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Ажиллагаа:
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    onChange={changeMission}
                                    value={missionID}
                                >
                                    <option value="">Сонгоно уу</option>
                                    {getMission.map((el) => (
                                        <option key={el.id} value={el.id}>
                                            {el.missionName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Ээлж:
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        setEeljID(e.target.value);
                                    }}
                                    value={eeljID}
                                >
                                    <option value="">Сонгоно уу</option>
                                    {getEelj.map((el) => (
                                        <option key={el.id} value={el.id}>
                                            {el.eeljName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button
                                className="btn btn-warning"
                                // style={{ padding: 10 }}
                            >
                                Эхлээд "Ажиллагааны нэр", "Ээлж" хоёрыг сонгоно
                                уу!
                            </button>
                        </div>
                    </div>
                    <div
                        className="info-box"
                        style={{
                            padding: "20px",
                            paddingBottom: "0px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div className="row">
                            <div
                                className="col-md-4"
                                style={{ textAlign: "left" }}
                            >
                                <a
                                    href="https://psod.maf.gov.mn/images/Document.mp4"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Бичиг баримт оруулах заавар
                                </a>
                            </div>
                            <div
                                className="col-md-4"
                                style={{ textAlign: "center" }}
                            >
                                <h3>БИЧИГ БАРИМТЫН ОРУУЛГА</h3>
                            </div>
                            <div
                                className="col-md-4"
                                style={{ textAlign: "right" }}
                            >
                                <a
                                    href="https://www.ilovepdf.com/compress_pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    PDF файлын хэмжээ багасгах холбоос
                                </a>
                            </div>
                        </div>

                        <br />
                    </div>
                    <MUIDatatable
                        data={getDocUser}
                        setdata={setDocUser}
                        columns={columns}
                        costumToolbar={
                            <>
                                {getMyDocTotal != 1 ? (
                                    <CustomToolbar
                                        title={"БҮРДҮҮЛСЭН БИЧИГ БАРИМТ"}
                                        btnClassName={"btn btn-success"}
                                        modelType={"modal"}
                                        dataTargetID={"#documentUserNew"}
                                        spanIconClassName={
                                            "fas fa-solid fa-plus"
                                        }
                                        buttonName={"НЭМЭХ"}
                                        // btnInsert={btnInsert}
                                        excelDownloadData={getDocUser}
                                        excelHeaders={excelHeaders}
                                        isHideInsert={true}
                                    />
                                ) : (
                                    <CustomToolbar
                                        title={"БҮРДҮҮЛСЭН БИЧИГ БАРИМТ"}
                                        btnClassName={"btn btn-success"}
                                        modelType={"modal"}
                                        dataTargetID={"#documentUserNew"}
                                        spanIconClassName={
                                            "fas fa-solid fa-plus"
                                        }
                                        buttonName={"НЭМЭХ"}
                                        excelDownloadData={getDocUser}
                                        excelHeaders={excelHeaders}
                                        isHideInsert={false}
                                    />
                                )}
                            </>
                        }
                        btnEdit={btnEdit}
                        modelType={showModal}
                        editdataTargetID={"#documentUserEdit"}
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
                    {missionID != "" &&
                        eeljID != "" &&
                        isDocumentAddButton &&
                        getMyDocTotal != 1 && (
                            <DocumentUserNew
                                refreshDocUser={refreshDocUser}
                                missionID={missionID}
                                eeljID={eeljID}
                                getMainHistoryID={getMainHistoryID}
                                countRow={getDocUser.length}
                            />
                        )}

                    <DocumentUserEdit
                        setRowsSelected={setRowsSelected}
                        refreshDocUser={refreshDocUser}
                        missionID={missionID}
                        eeljID={eeljID}
                        changeDataRow={clickedRowDataChild}
                        isEditBtnClick={isEditBtnClick}
                        getMainHistoryID={getMainHistoryID}
                    />
                    {clickedRowDataChild.approveComandlal == 2 && (
                        <>
                            {clickedRowDataChild.approveGsmaf == 2 ? (
                                <DocumentUnitDes
                                    clickedRowData={clickedRowDataChild}
                                />
                            ) : (
                                <DocumentUnitDes
                                    clickedRowData={clickedRowDataChild}
                                />
                            )}
                            {/* {clickedRowDataChild.approveGsmaf == 2 && (
                                <DocumentUnitDes
                                    clickedRowData={clickedRowDataChild}
                                />
                            )} */}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DocumentUser;

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
        label: "Командлал зөвшөөрсөн эсэх",
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
    { label: "Командлал зөвшөөрсөн эсэх", key: "approveComandlal" },
    { label: "ЗХЖШ зөвшөөрсөн эсэх", key: "approveGsmaf" },
];
