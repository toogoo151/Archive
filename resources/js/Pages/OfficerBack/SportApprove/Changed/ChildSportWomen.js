import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";
import SportNew from "./SportNew";
import SportOverNew from "./SportOverNew";
import SportEdit from "./SportEdit";
import SportOverEdit from "./SportOverEdit";

const ChildSportWomen = (props) => {
    const state = useContext(AppContext);
    const [getSportChildWomen, setSportChildWomen] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowDataChild, setclickedRowData] = useState([]);

    const [getEditRowData, editRowData] = useState([]);

    const [getEditBtn, setEditBtn] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshSportChild(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
    }, [state.getMissionRowID, state.getEeljRowID, props.clickedRowData.id]);

    useEffect(() => {
        fn_editBtn(state.getMissionRowID, state.getEeljRowID, getEditRowData);
    }, [state.getMissionRowID, state.getEeljRowID, getEditRowData]);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getSportChildWomen[getRowsSelected[0]]);
            editRowData(getSportChildWomen[getRowsSelected[0]].id);
        }
    }, [getRowsSelected]);

    const refreshSportChild = (missionID, eeljID, rowID) => {
        if (
            missionID != undefined &&
            eeljID != undefined &&
            rowID != undefined
        ) {
            axios
                .post("/get/sport/changed", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _rowID: rowID,
                })
                .then((res) => {
                    setSportChildWomen(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const fn_editBtn = (missionID, eeljID, childRowID) => {
        if (
            missionID != undefined &&
            eeljID != undefined &&
            childRowID != undefined
        ) {
            axios
                .post("/get/changed/sport/edit/btn", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _childRowID: childRowID,
                })
                .then((res) => {
                    setEditBtn(res.data.sportEdit);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const btnDelete = () => {
        if (getSportChildWomen[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/sport/child", {
                            id: getSportChildWomen[getRowsSelected[0]].id,
                            missionID: state.getMissionRowID,
                            eeljID: state.getEeljRowID,
                            pkoMainHistoryID: props.clickedRowData.id,
                        })
                        .then((res) => {
                            setRowsSelected([]);
                            Swal.fire(res.data.msg);
                            refreshSportChild(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                props.clickedRowData.id
                            );
                            fn_editBtn(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                getEditRowData
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
            name: "sportType1",
            label: "Гэдэсний таталт",
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
            },
        },
        {
            name: "sportType2",
            label: "Гар дээр суниах",
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
            },
        },
        {
            name: "sportType3",
            label: "100 метрийн гүйлт",
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
            },
        },
        {
            name: "sportType4",
            label: "1000 метрийн гүйлт",
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
            },
        },

        {
            name: "averageScore",
            label: "Дундаж оноо",
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
            },
        },
        {
            name: "sportEdit",
            label: "Засах хүсэлт",
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
                setCellProps: () => {
                    return { align: "center" };
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    if (value == 4) {
                        return "Засах хүсэлт дахин илгээх боломжгүй.";
                    } else if (value == 1) {
                        return "Хүсэлт илгээсэн..";
                    } else if (value == 2) {
                        return <CheckButton color={"success"}></CheckButton>;
                    } else if (value == 3) {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    } else {
                        return (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    data-dismiss=""
                                    onClick={() => {
                                        fn_request_btn(
                                            value,
                                            tableMeta,
                                            updateValue
                                        );
                                    }}
                                >
                                    Илгээх
                                </button>
                            </>
                        );
                    }
                },
            },
        },
        // {
        //     name: "sportEditDes",
        //     label: "Засах болсон шалтгаан",
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
    ];

    const fn_request_btn = (value, tableMeta, updateValue) => {
        Swal.fire({
            title: "Та засах хүсэлт илгээхдээ итгэлтэй байна уу?",
            text: "Засах болсон шалтгаан:",
            input: "textarea",
            inputValidator: (value) => {
                if (!value) {
                    return "Засах болсон шалтгаан оруулна уу!";
                }
            },
            showCancelButton: true,
            confirmButtonText: `Тийм`,
            cancelButtonText: `Үгүй`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/changed/comission/send/request/sport", {
                        id: getSportChildWomen[tableMeta.rowIndex].id,
                        sportEditDes: result.value,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshSportChild(
                            state.getMissionRowID,
                            state.getEeljRowID,
                            props.clickedRowData.id
                        );
                        fn_editBtn(
                            state.getMissionRowID,
                            state.getEeljRowID,
                            getEditRowData
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
                    <h3>БИЕИЙН ТАМИРЫН ШАЛГАЛТЫН ДҮН ОРУУЛГА</h3>
                </div>
                <br />
            </div>
            {getEditBtn == 2 ? (
                <MUIDatatable
                    data={getSportChildWomen}
                    setdata={setSportChildWomen}
                    columns={columns}
                    costumToolbar={
                        <>
                            {getSportChildWomen == "" ? (
                                <CustomToolbar
                                    title={"БИЕИЙН ТАМИРЫН ШАЛГАЛТЫН ОНОО"}
                                    btnClassName={"btn btn-success"}
                                    modelType={"modal"}
                                    dataTargetID={"#sportChildNew"}
                                    spanIconClassName={"fas fa-solid fa-plus"}
                                    buttonName={"НЭМЭХ"}
                                    // btnInsert={btnInsert}
                                    excelDownloadData={getSportChildWomen}
                                    excelHeaders={excelHeaders}
                                    isHideInsert={true}
                                />
                            ) : (
                                <CustomToolbar
                                    excelDownloadData={getSportChildWomen}
                                    excelHeaders={excelHeaders}
                                    isHideInsert={false}
                                />
                            )}
                        </>
                    }
                    btnEdit={btnEdit}
                    modelType={showModal}
                    editdataTargetID={"#sportChildEdit"}
                    btnDelete={btnDelete}
                    avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                    avgColumnName={"email"} //
                    avgName={"Дундаж: "}
                    getRowsSelected={getRowsSelected}
                    setRowsSelected={setRowsSelected}
                    isHideDelete={false}
                    isHideEdit={true}
                />
            ) : (
                <MUIDatatable
                    data={getSportChildWomen}
                    setdata={setSportChildWomen}
                    columns={columns}
                    costumToolbar={
                        <>
                            {getSportChildWomen == "" ? (
                                <CustomToolbar
                                    title={"БИЕИЙН ТАМИРЫН ШАЛГАЛТЫН ОНОО"}
                                    btnClassName={"btn btn-success"}
                                    modelType={"modal"}
                                    dataTargetID={"#sportChildNew"}
                                    spanIconClassName={"fas fa-solid fa-plus"}
                                    buttonName={"НЭМЭХ"}
                                    // btnInsert={btnInsert}
                                    excelDownloadData={getSportChildWomen}
                                    excelHeaders={excelHeaders}
                                    isHideInsert={true}
                                />
                            ) : (
                                <CustomToolbar
                                    excelDownloadData={getSportChildWomen}
                                    excelHeaders={excelHeaders}
                                    isHideInsert={false}
                                />
                            )}
                        </>
                    }
                    btnEdit={btnEdit}
                    modelType={showModal}
                    editdataTargetID={"#sportChildEdit"}
                    btnDelete={btnDelete}
                    avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                    avgColumnName={"email"} //
                    avgName={"Дундаж: "}
                    getRowsSelected={getRowsSelected}
                    setRowsSelected={setRowsSelected}
                    isHideDelete={false}
                    isHideEdit={false}
                />
            )}

            <br />

            {state.getMissionRowID != "" && state.getEeljRowID != "" && (
                <>
                    {props.clickedRowData.age < 41 ? (
                        <SportNew
                            refreshSportChild={refreshSportChild}
                            clickParentRowID={props.clickedRowData.id}
                            genderID={props.clickedRowData.gender}
                            firstName={props.clickedRowData.firstName}
                        />
                    ) : (
                        <SportOverNew
                            refreshSportChild={refreshSportChild}
                            clickParentRowID={props.clickedRowData.id}
                            genderID={props.clickedRowData.gender}
                            firstName={props.clickedRowData.firstName}
                        />
                    )}
                </>
            )}
            {props.clickedRowData.age < 41 ? (
                <SportEdit
                    setRowsSelected={setRowsSelected}
                    refreshSportChild={refreshSportChild}
                    changeDataRow={clickedRowDataChild}
                    isEditBtnClick={isEditBtnClick}
                    genderID={props.clickedRowData.gender}
                    firstName={props.clickedRowData.firstName}
                    clickParentRowID={props.clickedRowData.id}
                />
            ) : (
                <SportOverEdit
                    setRowsSelected={setRowsSelected}
                    refreshSportChild={refreshSportChild}
                    changeDataRow={clickedRowDataChild}
                    isEditBtnClick={isEditBtnClick}
                    genderID={props.clickedRowData.gender}
                    firstName={props.clickedRowData.firstName}
                    clickParentRowID={props.clickedRowData.id}
                />
            )}
        </div>
    );
};

export default ChildSportWomen;

const excelHeaders = [
    // { label: "Нэр", key: "firstName" },
    { label: "Гэдэсний таталт", key: "sportType1" },
    { label: "Гар дээр суниах", key: "sportType2" },
    { label: "100 метрийн гүйлт", key: "sportType3" },
    { label: "1000 метрийн гүйлт", key: "sportType4" },
    { label: "Дундаж оноо", key: "averageScore" },
];
