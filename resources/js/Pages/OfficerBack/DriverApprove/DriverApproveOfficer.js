import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import DriverApproveOfficerEdit from "./DriverApproveOfficerEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../Context/MyContext";

const DriverApproveOfficer = () => {
    const state = useContext(AppContext);
    const [getdriver, setDriver] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [skillTotal, setSkillTotal] = useState(0);
    const [scoretrueTotal, setScoretrueTotal] = useState(0);
    const [scorefalseTotal, setScorefalseTotal] = useState(0);






    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");


    //    useEffect(() => {
    //  axios
    //         .post("skill/count")
    //         .then((res) => {
    //             // console.log(res.data);
    //             setSkillTotal(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    //   }, []);

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
        refreshDriver(
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
        refreshDriver(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value,
        );
      };

     const changeType = (e) => {
        refreshDriver(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            e.target.value,
        );
      };



    useEffect(() => {
        refreshDriver(state.getMissionRowID, state.getEeljRowID);
    }, []);
    useEffect(() => {
        refreshDriver(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getdriver[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);


       useEffect(() => {
        refreshDriver(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID
        );
    }, [state.getMissionRowID, state.getEeljRowID]);




    const refreshDriver =
    (
        missionID,
        eeljID,
        comandlalID,
        unitID,
        typeID
    ) =>
    {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/officer/driver", {
                _missionID: missionID,
                _eeljID: eeljID,
                _comandlalID: comandlalID,
                _unitID: unitID,
                _typeID: typeID,

                })
                .then((res) => {
                    setDriver(res.data.data);
                    setRowsSelected([]);
                    setSkillTotal(res.data.count);
                    setScoretrueTotal(res.data.score_true_count);
                    setScorefalseTotal(res.data.score_false_count);




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
        if (getdriver[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/rot", {
                            id: getdriver[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.data.msg);
                            refreshDriver(
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
                            <span className="input-group-text">Төлөв:</span>
                        </div>

                        <select className="form-control" onChange={changeType}>
                            <option value="">Сонгоно уу</option>
                            <option value="1">Өгсөн ЦАХ</option>
                            <option value="0">Өгөөгүй ЦАХ</option>

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
                                    refreshDriver(
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
                            <h3>{skillTotal}</h3>
                            <p>Нийт ЦАХ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-calculator" />
                        </div>
                    </div>
                </div>
                    <div className="col-md-3">
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>{scoretrueTotal}</h3>
                            <p>Шалгалт өгсөн ЦАХ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-check" />
                        </div>
                    </div>
                </div>
                    <div className="col-md-3">
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>{scorefalseTotal}</h3>
                            <p>Шалгалт өгөөгүй ЦАХ</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-close" />
                        </div>
                    </div>
                </div>
                </div>

            <MUIDatatable
                data={getdriver}
                setdata={setDriver}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ЖОЛООНЫ ШАЛГАЛТ"}
                            // btnClassName={"btn btn-success"}
                            // modelType={"modal"}
                            // dataTargetID={"#rotNew"}
                            // spanIconClassName={"fas fa-solid fa-plus"}
                            // buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getdriver}
                            excelHeaders={excelHeaders}
                            // isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#driverApproveOfficerEdit"}
                btnDelete={btnDelete}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж:"}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={false}
                isHideEdit={true}
            />
            {/* {state.getMissionRowID != "" && state.getEeljRowID != "" && (
                <RotNew refreshDriver={refreshDriver} />
            )} */}

            <DriverApproveOfficerEdit
                setRowsSelected={setRowsSelected}
                refreshDriver={refreshDriver}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default DriverApproveOfficer;

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
        name: "score",
        label: "Тест оноо",
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
        name: "scoreApprove",
         label: "Тест",
           options: {
            filter: true,
            sort: false,
         customBodyRender: (value) => {
    console.log("Value:", value);
             if (value === 1) {
        // return "Тэнцсэн"
                 return <i className="fas fa-check" style={{ color: 'green', display: 'block', margin: 'auto', alignItems: "center", textAlign:"center" }}></i>;
             }
             else if (value === 2) {
        // return "Тэнцээгүй"
        return <i className="fas fa-close" style={{ color: 'red', display: 'block', margin: 'auto', alignItems: "center", textAlign:"center" }}></i>;
    } else {
        return "Хоосон";
    }
},
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        textAlign: "center"
                    },
                };
            },
        },
        //  options: {
        //     filter: true,
        //     sort: false,
        //     setCellHeaderProps: (value) => {
        //         return {
        //             style: {
        //                 backgroundColor: "#5DADE2",
        //                 color: "white",
        //             },
        //         };
        //     },
        // },
    },

    //  {
    //     name: "scoreApprove",
    //     label: "Тест төлөв",
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
        name: "practice",
        label: "Дадлага",
        options: {
            filter: true,
            sort: false,
         customBodyRender: (value) => {
    console.log("Value:", value);
             if (value === 1) {
        // return "Тэнцсэн"
                 return <i className="fas fa-check" style={{ color: 'green', display: 'block', margin: 'auto', alignItems: "center", textAlign:"center" }}></i>;
             }
             else if (value === 2) {
        // return "Тэнцээгүй"
        return <i className="fas fa-close" style={{ color: 'red', display: 'block', margin: 'auto', alignItems: "center", textAlign:"center" }}></i>;
    } else {
        return "Хоосон";
    }
},
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        textAlign: "center"
                    },
                };
            },
        },
    },
    //             {
    //     name: "practice",
    //     label: "Дадлага",
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
        name: "Finally",
        label: "Дүн",
        options: {
            filter: true,
            sort: false,
         customBodyRender: (value) => {
    console.log("Value:", value);
             if (value === 1) {
        // return "Тэнцсэн"
                 return <i className="fas fa-check" style={{ color: 'green', display: 'block', margin: 'auto', alignItems: "center", textAlign:"center" }}></i>;
             }
             else if (value === 2) {
        // return "Тэнцээгүй"
        return <i className="fas fa-close" style={{ color: 'red', display: 'block', margin: 'auto', alignItems: "center", textAlign:"center" }}></i>;
    } else {
        return "Хоосон";
    }
},
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        textAlign: "center"
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
     { label: "Тест оноо", key: "score" },
    { label: "Дадлага", key: "practice" },
    { label: "Дүн", key: "Finally" },

];
