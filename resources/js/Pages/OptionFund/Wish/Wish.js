import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import axios from "../../../AxiosUser";
import WishEdit from "./WishEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../Context/MyContext";
// import iconButtons from "@mui/icons-material";
import TrashButton from "@mui/icons-material/Delete";
import CheckButton1 from "@mui/icons-material/Check";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";

const Wish = () => {
    const state = useContext(AppContext);
    const [getWish, setWish] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlaluud, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getForeignFinishDate, setForeignFinishDate] = useState([]);

    const [getIsApprove, setIsApprove] = useState(0);
    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    const [covotSum, setCovotSum] = useState(0);
    const [covotGived, setCovotGived] = useState(0);
    const [covotRemained, setCovotRemained] = useState(0);
    const [approveTsah, setApproveTsah] = useState(0);

    const [isHidePushButton, setIsHidePushButton] = useState(false);

    useEffect(() => {
        fn_isHidePushButton(state.getMissionRowID, state.getEeljRowID);
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                if (userType === "comandlalAdmin" || userType === "unitAdmin") {
                    setComandlalID(res.data.firstComandlal);
                    setComandlals(res.data.getComandlals);
                    changeComandlal(res.data.firstComandlal["id"]);
                }
                if (userType === "superAdmin") {
                    setComandlals(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        refreshWish(
            state.getMissionRowID,
            state.getEeljRowID,
            getIsApprove,
            getComandlalID,
            getUnitID
        );
        getCovotSum(state.getMissionRowID, state.getEeljRowID);
    }, []);

    const fn_isHidePushButton = (missionID, eeljID) => {
        if (missionID != "" && eeljID != "") {
            axios
                .post("/is/hide/push/button", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setIsHidePushButton(res.data);
                });
            axios
                .post("/get/foreign/pass", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setForeignFinishDate(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        // setRowsSelected([]); // row selected clear
    }, [getIsApprove]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getWish[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        // setRowsSelected([]); // row selected clear
        refreshWish(
            state.getMissionRowID,
            state.getEeljRowID,
            getIsApprove,
            getComandlalID,
            getUnitID
        );
        getCovotSum(state.getMissionRowID, state.getEeljRowID);
        fn_isHidePushButton(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshWish = (missionID, eeljID, isApprove, comandlalID, unitID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/wishes", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _approve: isApprove,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                })
                .then((res) => {
                    setRowsSelected([]); // row selected clear
                    setWish(res.data.getWishes);
                    if (res.data.getWishApproveCount != undefined) {
                        setApproveTsah(res.data.getWishApproveCount);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const changeComandlal = (inComandlal) => {
        axios
            .post("/get/ID/byUnit", {
                _comandlalID: inComandlal,
            })
            .then((res) => {
                if (userType === "unitAdmin") {
                    setUnitID(res.data.firstUnit);
                    setUnits(res.data.getUnits);
                }
                if (
                    userType === "superAdmin" ||
                    userType === "comandlalAdmin"
                ) {
                    setUnits(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeUnit = (e) => {
        setUnitID(e.target.value);
        refreshWish(
            state.getMissionRowID,
            state.getEeljRowID,
            getIsApprove,
            getComandlalID,
            e.target.value
        );
    };
    const btnEdit = () => {
        setIsEditBtnClick(true);
    };

    const changeIsApprove = (e) => {
        setIsApprove(e.target.value);
        refreshWish(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value,
            getComandlalID,
            getUnitID
        );
    };
    const getCovotSum = (missionID, eeljID) => {
        if (missionID != "" && eeljID != "") {
            axios
                .post("/get/covot/sum/unit/in", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    if (res.data.sum != undefined) {
                        setCovotSum(res.data.sum);
                    }
                    if (res.data.gived != undefined) {
                        setCovotGived(res.data.gived);
                    }
                    if (res.data.remained != undefined) {
                        setCovotRemained(res.data.remained);
                    }
                });
        }
    };
    const fn_unitUsersStart = () => {
        if (approveTsah <= covotRemained) {
            Swal.fire({
                title: "Та баталгаажуулахдаа итгэлтэй байна уу? /Буцаах боломжгүйг анхаарна уу./",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/push/unit/users/to/history", {
                            _missionID: state.getMissionRowID,
                            _eeljID: state.getEeljRowID,
                            _approve: getIsApprove,
                            _comandlalID: getComandlalID,
                            _unitID: getUnitID,
                        })
                        .then((res) => {
                            // setRowsSelected([]); // row selected clear
                            refreshWish(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                getIsApprove,
                                getComandlalID,
                                getUnitID
                            );
                            Swal.fire(res.data.msg);
                        });
                } else if (result.isDenied) {
                }
            });
        } else {
            Swal.fire(
                "Баталгаажуулах боломжгүй байна. Квотын тооноос хэтэрсэн байна."
            );
        }
    };

    return (
        <div>
            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Төлөв:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeIsApprove}
                        >
                            <option value="0">Шийдвэрлэгдээгүй</option>
                            <option value="1">Шаардлага хангасан</option>
                            <option value="2">Шаардлага хангаагүй</option>
                            <option value="3">Зөвшөөрөгдсөн</option>
                            <option value="4">Боломжтой нөөц</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Командлал:</span>
                        </div>
                        {userType == "superAdmin" ? (
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    setComandlalID(e.target.value);
                                    setUnitID("");
                                    refreshWish(
                                        state.getMissionRowID,
                                        state.getEeljRowID,
                                        getIsApprove,
                                        e.target.value,
                                        ""
                                    );
                                    changeComandlal(e.target.value);
                                }}
                            >
                                <option value="">Сонгоно уу</option>
                                {getComandlaluud.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.comandlalShortName}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <select
                                className="form-control"
                                value={getComandlalID["id"]}
                                disabled={true}
                            >
                                <option value="">Сонгоно уу</option>
                                {getComandlaluud.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.comandlalShortName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Анги:</span>
                        </div>
                        {userType == "superAdmin" ||
                        userType == "comandlalAdmin" ? (
                            <select
                                className="form-control"
                                onChange={changeUnit}
                            >
                                <option value="">Сонгоно уу</option>
                                {getUnits.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.unitShortName}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <select
                                className="form-control"
                                // onChange={changeUnit}
                                value={getUnitID["id"]}
                                disabled={true}
                            >
                                <option value="">Сонгоно уу</option>
                                {getUnits.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.unitShortName}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-2">
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>{covotSum}</h3>
                            <p>Ангийн нийт квот</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-calculator" />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{covotGived}</h3>
                            <p>Олгогдсон квот</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-plus" />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>{covotRemained}</h3>
                            <p>Үлдсэн квот</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-tasks" />
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                    <div className="small-box bg-primary">
                        <div className="inner">
                            <h3>{approveTsah}</h3>
                            <p>Шаардлага хангасан ЦАХ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-check" />
                        </div>
                    </div>
                </div>
            </div>
            {/* <TrashButton style={{ color: "#1F618D" }}></TrashButton>
            <CheckButton color={"success"}></CheckButton>
            <CheckButton1 color={"success"}></CheckButton1>
            <DangerousButton color={"error"}></DangerousButton> */}
            {getIsApprove != 3 && (
                <>
                    <MUIDatatable
                        data={getWish}
                        setdata={setWish}
                        columns={columns}
                        costumToolbar={
                            <>
                                {getWish != undefined && (
                                    <CustomToolbar
                                        title={"ХҮСЭЛТ ШИЙДВЭРЛЭХ"}
                                        excelDownloadData={getWish}
                                        excelHeaders={excelHeaders}
                                        isHideInsert={false}
                                    />
                                )}
                            </>
                        }
                        btnEdit={btnEdit}
                        isHideDelete={false}
                        isHideEdit={userType == "unitAdmin" ? true : false}
                        modelType={showModal}
                        editdataTargetID={"#wishEdit"}
                        avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                        avgColumnName={"email"} //
                        avgName={"Дундаж: "}
                        getRowsSelected={getRowsSelected}
                        setRowsSelected={setRowsSelected}
                    />
                </>
            )}
            {getIsApprove == 3 && (
                <MUIDatatable
                    data={getWish}
                    setdata={setWish}
                    columns={columns}
                    costumToolbar={
                        <>
                            {getWish != undefined && (
                                <CustomToolbar
                                    excelDownloadData={getWish}
                                    excelHeaders={excelHeaders}
                                    isHideInsert={false}
                                />
                            )}
                        </>
                    }
                    btnEdit={btnEdit}
                    isHideDelete={false}
                    isHideEdit={false}
                    modelType={showModal}
                    editdataTargetID={"#wishEdit"}
                    avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                    avgColumnName={"email"} //
                    avgName={"Дундаж: "}
                    getRowsSelected={getRowsSelected}
                    setRowsSelected={setRowsSelected}
                />
            )}

            <br />

            {getIsApprove == 1 && approveTsah > 0 && isHidePushButton && (
                <div className="row">
                    <div className="col-md-3">
                        <button
                            className="btn btn-success"
                            onClick={fn_unitUsersStart}
                            style={{ padding: 10 }}
                        >
                            ЭДА оролцох цэргийн алба хаагчдыг зөвшөөрөх
                        </button>
                    </div>
                    <div className="col-md-4">
                        <button
                            className="btn btn-warning"
                            style={{ padding: 10 }}
                        >
                            Гадаад паспортын шаардлагатай дуусах хугацаа{" "}
                            {getForeignFinishDate[0].foreignFinishDate}
                        </button>
                    </div>
                </div>
            )}

            {getIsApprove == 1 && approveTsah > 0 && !isHidePushButton && (
                <button className="btn btn-warning" style={{ padding: 10 }}>
                    ЭДА оролцох цэргийн алба хаагчдыг зөвшөөрөх үйлдэл эхлээгүй
                    байна
                </button>
            )}

            {userType == "unitAdmin" && (
                <WishEdit
                    setRowsSelected={setRowsSelected}
                    refreshWish={refreshWish}
                    getIsApprove={getIsApprove}
                    getComandlalID={getComandlalID}
                    getUnitID={getUnitID}
                    changeDataRow={clickedRowData}
                    isEditBtnClick={isEditBtnClick}
                />
            )}
        </div>
    );
};

export default Wish;

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
    {
        name: "foreignFinishDate",
        label: "Гадаад паспортын дуусах хугацаа",
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
        name: "missionName",
        label: "Ажиллагааны нэр",
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
        name: "eeljName",
        label: "Ээлж",
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
        name: "insideApprove",
        label: "Зөвшөөрсөн эсэх",
        options: {
            filter: true,
            sort: false,
            // display: "excluded",
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 150,
                    },
                };
            },
            setCellProps: () => {
                return { align: "center" };
            },
            customBodyRender: (value) => {
                if (value == 1) {
                    return <CheckButton color={"success"}></CheckButton>;
                } else if (value == 0) {
                    return "Шийдвэрлэгдээгүй";
                } else if (value == 3) {
                    return "Зөвшөөрөгдсөн";
                } else if (value == 4) {
                    return "Боломжтой нөөц";
                } else {
                    return <DangerousButton color={"error"}></DangerousButton>;
                }
            },
        },
    },
    {
        name: "declineDescription",
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
            setCellProps: () => {
                return { align: "center" };
            },
            customBodyRender: (value) => {
                if (value != null) {
                    return value;
                } else {
                    return "Хоосон";
                }
            },
        },
    },
    {
        name: "created_at",
        label: "Хүсэлт илгээсэн огноо",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 250,
                    },
                };
            },
        },
    },
];

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Нэр", key: "pkoUserID" },
    { label: "Зөвшөөрсөн эсэх", key: "insideApprove" },
    { label: "Татгалзсан шалтгаан", key: "declineDescription" },
    { label: "Хүсэлт илгээсэн огноо", key: "created_at" },
];
