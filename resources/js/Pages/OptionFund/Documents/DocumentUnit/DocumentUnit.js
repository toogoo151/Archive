import React, { useContext, useEffect, useState } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import DocumentUnitChild from "./DocumentUnitChild";

const DocumentUnit = () => {
    const state = useContext(AppContext);
    const [getDocumentUnit, setDocumentUnit] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getAllState, setAllState] = useState("all");

    const [complete, setComplete] = useState(0);
    const [incomplete, setIncomplete] = useState(0);
    const [notdone, setNotdone] = useState(0);
    const [totalDoc, setTotalDoc] = useState(0);
    const [approve, setApprove] = useState(0);
    const [decline, setDecline] = useState(0);

    const refreshDocUnit = (missionID, eeljID, allState) => {
        if (missionID != undefined || eeljID != undefined) {
            axios
                .post("/get/document/units", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _allState: allState,
                })
                .then((res) => {
                    setRowsSelected([]);
                    setDocumentUnit(res.data.getMainHistory);
                    if (res.data.complete != undefined) {
                        setComplete(res.data.complete);
                    }
                    if (res.data.inComplete != undefined) {
                        setIncomplete(res.data.inComplete);
                    }
                    if (res.data.notDone != undefined) {
                        setNotdone(res.data.notDone);
                    }
                    if (res.data.totalDoc != undefined) {
                        setTotalDoc(res.data.totalDoc);
                    }
                    if (res.data.approve != undefined) {
                        setApprove(res.data.approve);
                    }
                    if (res.data.decline != undefined) {
                        setDecline(res.data.decline);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getDocumentUnit[getRowsSelected]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshDocUnit(state.getMissionRowID, state.getEeljRowID, getAllState);
    }, []);
    useEffect(() => {
        refreshDocUnit(state.getMissionRowID, state.getEeljRowID, getAllState);
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const changeAllState = (e) => {
        setclickedRowData([]);
        setAllState(e.target.value);
        refreshDocUnit(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value
        );
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
                <div className="row ">
                    <div className="col-md-3">
                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{complete}</h3>
                                <p>Бичиг баримтын бүрдэл бүрэн</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-tasks" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{incomplete}</h3>
                                <p>Бичиг баримтын бүрдэл дутуу</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-exclamation-circle" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="small-box bg-primary">
                            <div className="inner">
                                <h3>{notdone}</h3>
                                <p>Бичиг баримтын бүрдэл хийгдээгүй</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-bell" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="small-box bg-secondary">
                            <div className="inner">
                                <h3>{totalDoc}</h3>
                                <p>Нийт</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-calculator" />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Төлөв:</span>
                            </div>

                            <select
                                className="form-control"
                                onChange={changeAllState}
                            >
                                <option value="all">Бүгд</option>
                                <option value="complete">
                                    Бичиг баримтын бүрдэл бүрэн
                                </option>
                                <option value="incomplete">
                                    Бичиг баримтын бүрдэл дутуу
                                </option>
                                <option value="notdone">
                                    Бичиг баримтын бүрдэл хийгдээгүй
                                </option>
                                <option value="approved">Зөвшөөрөгдсөн</option>
                                <option value="declined">Татгалзсан</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{approve}</h3>
                                <p>Зөвшөөрөгдсөн</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-check" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>{decline}</h3>
                                <p>Татгалзсан</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-close" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MUIDatatable
                data={getDocumentUnit}
                setdata={setDocumentUnit}
                columns={columns}
                costumToolbar={
                    <>
                        {getDocumentUnit != undefined && (
                            <CustomToolbar
                                title={"БИЧИГ БАРИМТЫН БҮРДЭЛ"}
                                excelDownloadData={getDocumentUnit}
                                excelHeaders={excelHeaders}
                                isHideInsert={false}
                            />
                        )}
                    </>
                }
                isHideDelete={false}
                isHideEdit={false}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
            <br />
            {clickedRowData != "" && (
                <>
                    <DocumentUnitChild clickedRowData={clickedRowData} />
                </>
            )}
        </div>
    );
};

export default DocumentUnit;

const columns = [
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
        name: "image",
        label: "Цээж зураг",
        options: {
            filter: true,
            sort: true,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 100,
                    },
                };
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <div
                        style={{
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            className="image css-img-object"
                            src={
                                value
                                    ? "https://psod.maf.gov.mn/storage" + value
                                    : ""
                            }
                            style={{
                                width: "50px",
                                height: "auto",
                            }}
                        />
                    </div>
                );
            },
        },
    },
    {
        name: "shortRank",
        label: "Цол",
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
        name: "rd",
        label: "РД",
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
        name: "lastName",
        label: "Овог",
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
        name: "firstName",
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
];

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "shortRank" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
];
