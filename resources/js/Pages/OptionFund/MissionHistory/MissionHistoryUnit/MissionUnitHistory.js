import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import MissionUnitNew from "./MissionUnitNew";
import MissionUnitEdit from "./MissionUnitEdit";

const MissionUnitHistory = () => {
    const state = useContext(AppContext);
    const [getMissionHistory, setMissionHistory] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");
    const [getGender, setGender] = useState("");

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        axios
            .get("/get/Unit/ID")
            .then((res) => {
                setComandlalID(res.data.comID);
                setUnitID(res.data.unitID);
            })
            .catch((err) => {
                console.log(err);
            });

        refreshMissionUnitHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getGender
        );
    }, []);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getMissionHistory[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshMissionUnitHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getGender
        );
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshMissionUnitHistory = (
        missionID,
        eeljID,
        comandlalID,
        unitID,
        genderID
    ) => {
        axios
            .post("/get/mission/historys", {
                _missionID: missionID,
                _eeljID: eeljID,
                _comandlalID: comandlalID,
                _unitID: unitID,
                _genderID: genderID,
            })
            .then((res) => {
                setRowsSelected([]);
                setMissionHistory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeGender = (e) => {
        setGender(e.target.value);
        refreshMissionUnitHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            e.target.value
        );
    };

    const btnDelete = () => {
        setRowsSelected([]);
        if (getMissionHistory[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/mission/history", {
                            id: getMissionHistory[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshMissionUnitHistory(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                getComandlalID,
                                getUnitID,
                                getGender
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
                }}
            >
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Хүйс:</span>
                        </div>

                        <select
                            value={getGender}
                            className="form-control"
                            onChange={changeGender}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="11">Эрэгтэй</option>
                            <option value="22">Эмэгтэй</option>
                        </select>
                    </div>
                </div>
            </div>
            <MUIDatatable
                data={getMissionHistory}
                setdata={setMissionHistory}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"АЖИЛЛАГААНЫ ТҮҮХ"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#missionUnitHistoryNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            excelDownloadData={getMissionHistory}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                            buttonName={"НЭМЭХ"}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#missionUnitHistoryEdit"}
                btnDelete={btnDelete}
                isHideDelete={true}
                isHideEdit={true}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
            <MissionUnitNew
                refreshMissionUnitHistory={refreshMissionUnitHistory}
            />
            <MissionUnitEdit
                setRowsSelected={setRowsSelected}
                refreshMissionUnitHistory={refreshMissionUnitHistory}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default MissionUnitHistory;

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
        name: "missionName",
        label: "Ажиллагаа",
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
                        width: 50,
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
            display:
                userType == "comandlalAdmin" || userType == "unitAdmin"
                    ? false
                    : true,
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
        name: "positionName",
        label: "Албан тушаал",
        options: {
            filter: true,
            sort: false,
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
                        width: 50,
                    },
                };
            },
        },
    },
    {
        name: "unitShortName",
        label: "Анги",
        options: {
            filter: true,
            sort: false,
            display: userType == "unitAdmin" ? false : true,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 150,
                    },
                };
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
                        width: 40,
                    },
                };
            },
            setCellProps: () => {
                return { align: "center" };
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
                        width: 150,
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
                        width: 180,
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
                        width: 180,
                    },
                };
            },
        },
    },
    {
        name: "startDate",
        label: "Явсан огноо",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        // width: 250,
                    },
                };
            },
        },
    },
    {
        name: "finishDate",
        label: "Ирсэн огноо",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        // width: 250,
                    },
                };
            },
        },
    },
];

const excelHeaders = [
    { label: "Ажиллагаа", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Албан тушаал", key: "positionName" },
    { label: "Командлал", key: "comandlalShortName" },
    { label: "Анги", key: "unitShortName" },
    { label: "Цол", key: "shortRank" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Явсан огноо", key: "startDate" },
    { label: "Ирсэн огноо", key: "finishDate" },
];
