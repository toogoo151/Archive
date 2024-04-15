import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import SkillApproveOfficerEdit from "./SkillApproveOfficerEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../Context/MyContext";
const SkillApproveOfficer = () => {
    const state = useContext(AppContext);
    const [getSkill, setSkill] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

   const [skillTotal, setSkillTotal] = useState(0);




    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

//     useEffect(() => {
//           axios
//             .post("skill/count")
//             .then((res) => {
//                 // console.log(res.data);
//                 setSkillTotal(res.data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

// )

      useEffect(() => {
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                if (userType == "comandlalAdmin") {
                    setComandlalID(res.data.firstComandlal);
                    setComandlals(res.data.getComandlals);
                    changeComandlal(res.data.firstComandlal["id"]);
                }
                if (userType == "superAdmin") {
                    setComandlals(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        refreshSkill(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
        );
      }, []);

     const changeComandlal = (inComandlal) => {
        axios
            .post("/get/ID/byUnit", {
                _comandlalID: inComandlal,
            })
            .then((res) => {
                setUnits(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
     };

      const changeUnit = (e) => {
        setUnitID(e.target.value);
        refreshSkill(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value,
        );
    };





    useEffect(() => {
        refreshSkill(state.getMissionRowID, state.getEeljRowID);
    }, []);
    useEffect(() => {
        refreshSkill(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getSkill[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);


       useEffect(() => {
        refreshSkill(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
        );
    }, [state.getMissionRowID, state.getEeljRowID]);




    const refreshSkill =
    (
        missionID,
        eeljID,
        comandlalID,
        unitID,
    ) =>
    {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/skill", {
                _missionID: missionID,
                _eeljID: eeljID,
                _comandlalID: comandlalID,
                _unitID: unitID,
                })
                .then((res) => {
                    setSkill(res.data);
                    setRowsSelected([]);
                //   if (res.data.complete != undefined) {
                //         setSkillTotal(res.data.complete);
                //     }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getSkill[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/rot", {
                            id: getSkill[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshSkill(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                getComandlalID,
                                getUnitID,
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
                            <span className="input-group-text">Командлал:</span>
                        </div>
                        {userType == "superAdmin" ? (
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    setComandlalID(e.target.value);
                                    setUnitID("");
                                    refreshSkill(
                                        state.getMissionRowID,
                                        state.getEeljRowID,
                                        e.target.value,
                                        "",

                                    );
                                    changeComandlal(e.target.value);
                                }}
                            >
                                <option value="">Сонгоно уу</option>
                                {getComandlals.map((el) => (
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
                                {getComandlals.map((el) => (
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

                        <select className="form-control" onChange={changeUnit}>
                            <option value="">Сонгоно уу</option>
                            {getUnits.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.unitShortName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>
                <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-3">
                    <div className="small-box bg-info">
                        <div className="inner">
                            {/* <h3>{skillTotal}</h3> */}
                            <p>Нийт ЦАХ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-calculator" />
                        </div>
                    </div>
                </div>
                </div>

            <MUIDatatable
                data={getSkill}
                setdata={setSkill}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"УР ЧАДВАРЫН ШАЛГАЛТ"}
                            // btnClassName={"btn btn-success"}
                            // modelType={"modal"}
                            // dataTargetID={"#rotNew"}
                            // spanIconClassName={"fas fa-solid fa-plus"}
                            // buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getSkill}
                            excelHeaders={excelHeaders}
                            // isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#skillApproveOfficerEdit"}
                btnDelete={btnDelete}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={true}
                isHideEdit={true}
            />
            {/* {state.getMissionRowID != "" && state.getEeljRowID != "" && (
                <RotNew refreshSkill={refreshSkill} />
            )} */}

            <SkillApproveOfficerEdit
                setRowsSelected={setRowsSelected}
                refreshSkill={refreshSkill}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default SkillApproveOfficer;

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
        name: "comandlalShortName",
        label: "Командлалын нэр",
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
        name: "unitShortName",
        label: "Анги",
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
        name: "lastName",
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
        name: "SignalScore",
        label: "Холбоо",
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
        name: "LocationScore",
        label: "Байрзүй",
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
        name: "TotalScore",
        label: "Дүн",
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
    { label: "Командлалын нэр", key: "comandlalShortName" },
    { label: "Анги", key: "unitShortName" },
    { label: "Овог нэр", key: "firstName" },
    { label: "Нэр", key: "lastName" },
     { label: "Холбоо", key: "SignalScore" },
    { label: "Байрзүй", key: "LocationScore" },
    { label: "Дүн", key: "TotalScore" },

];
