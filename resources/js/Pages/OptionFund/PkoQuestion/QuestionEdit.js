import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import EditChild from "./EditChild";
import { AppContext } from "../../../Context/MyContext";

const QuestionEdit = () => {
    const state = useContext(AppContext);
    const [getQuestionEdit, setQuestionEdit] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");

    const [getQuestionState, setQuestionState] = useState("");
    const [getGender, setGender] = useState("");

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        axios
            .get("/get/comandlal")
            .then((res) => {
                setComandlals(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        refreshQuestionEdit(
            getComandlalID,
            getUnitID,
            getQuestionState,
            getGender
        );
    }, []);

    useEffect(() => {
        refreshQuestionEdit(
            getComandlalID,
            getUnitID,
            getQuestionState,
            getGender
        );
    }, [state.getMissionRowID, state.getEeljRowID]);

    const changeComandlal = (inComandlal) => {
        axios
            .post("/get/units", {
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
        refreshQuestionEdit(
            getComandlalID,
            e.target.value,
            getQuestionState,
            getGender
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getQuestionEdit[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const refreshQuestionEdit = (
        comandlalID,
        unitID,
        questionState,
        gender
    ) => {
        axios
            .post("/get/question/edit", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                _comandlalID: comandlalID,
                _unitID: unitID,
                _questionState: questionState,
                _gender: gender,
            })
            .then((res) => {
                // console.log(res.data);
                // return;
                setQuestionEdit(res.data);
                setRowsSelected([]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const btnEdit = () => {
        setIsEditBtnClick(true);
    };

    const changeQuestionState = (e) => {
        setQuestionState(e.target.value);
        refreshQuestionEdit(
            getComandlalID,
            getUnitID,
            e.target.value,
            getGender
        );
    };

    const changeGender = (e) => {
        setGender(e.target.value);
        refreshQuestionEdit(
            getComandlalID,
            getUnitID,
            getQuestionState,
            e.target.value
        );
    };

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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "unitShortName",
            label: "Анги",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "position",
            label: "Албан тушаал",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "rd",
            label: "Регистрийн дугаар",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "myName",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "age",
            label: "Нас",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "genderName",
            label: "Хүйс",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "appointedDate",
            label: "Томилогдсон огноо",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "movement",
            label: "Одоогийн албан тушаалд томилогдсон байдал",
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
                customBodyRender: (value) => {
                    if (value == 1) {
                        return " Анги дотороо томилогдсон";
                    } else {
                        return "Анги хооронд шилжин томилогдсон";
                    }
                },
            },
        },
        {
            name: "rolePlayed",
            label: "Ажиллагаанд явсан эсэх",
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
                customBodyRender: (value) => {
                    if (value == 1) {
                        return "Үгүй";
                    } else {
                        return "Тийм";
                    }
                },
            },
        },
        {
            name: "missionName",
            label: "Ажиллагаа",
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
                customBodyRender: (value) => {
                    if (value == 0) {
                        return "Бүгд найрамдах өмнөд Судан улс - UNMISS";
                    } else if (value == 1) {
                        return "Бүгд найрамдах ардчилсан Конго улс - MONUSCO";
                    } else if (value == 2) {
                        return "Бүгд найрамдах Судан улс - UNISFA";
                    } else if (value == 3) {
                        return "Баруун сахар улс - MINURSO";
                    } else if (value == 4) {
                        return "Йемен улс - UNMHA";
                    } else if (value == 5) {
                        return "Мали улс - MINUSMA";
                    } else if (value == 6) {
                        return "Төв Африкийн бүгд найрамдах улс - MINUSA";
                    } else if (value == 7) {
                        return "Ливан улс - UNIFIL";
                    } else if (value == 8) {
                        return "Бусад";
                    } else if (value == null) {
                        return "";
                    } else {
                        return "";
                    }
                },
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "missionCameDate",
            label: "Ажиллагаанаас ирсэн огноо",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "studying",
            label: "Суралцаж байгаа эсэх",
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
                customBodyRender: (value) => {
                    if (value == 1) {
                        return "Үгүй";
                    } else {
                        return "Тийм";
                    }
                },
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "punishment",
            label: "Шийтгэгдсэн эсэх",
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
                customBodyRender: (value) => {
                    if (value == 1) {
                        return "Үгүй";
                    } else {
                        return "Тийм";
                    }
                },
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "punishmentDate",
            label: "Шийтгэгдсэн тушаалын огноо",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "updated_at",
            label: "Зассан огноо",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "comandlalName",
            label: "Зассан командлал",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "firstName",
            label: "Зассан админы нэр",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
        {
            name: "questionDes",
            label: "Тайлбар",
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
                // setCellProps: (value, rowIndex) => {
                //     const el = getQuestionEdit[rowIndex];
                //     if (el.updated_at != null) {
                //         return {
                //             align: "center",
                //             style: {
                //                 backgroundColor: "#D3CD0F",
                //                 color: "black",
                //             },
                //         };
                //     } else {
                //         return {
                //             align: "center",
                //             style: {
                //                 color: "black",
                //             },
                //         };
                //     }
                // },
            },
        },
    ];

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

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setComandlalID(e.target.value);
                                setUnitID("");
                                refreshQuestionEdit(
                                    e.target.value,
                                    "",
                                    getQuestionState,
                                    getGender
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
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Хүйс:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={changeGender}
                            value={getGender}
                        >
                            <option value="">Бүгд</option>
                            <option value="11">Эрэгтэй</option>
                            <option value="22">Эмэгтэй</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Засвар:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={changeQuestionState}
                            value={getQuestionState}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="hiigdeegui">Хийгдээгүй</option>
                            <option value="hiigdsen">Хийгдсэн</option>
                        </select>
                    </div>
                </div>
            </div>
            <div
                className="info-box"
                style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    width: "100%",
                }}
            >
                <MUIDatatable
                    data={getQuestionEdit}
                    setdata={setQuestionEdit}
                    columns={columns}
                    costumToolbar={
                        <>
                            <CustomToolbar
                                title={"АСУУМЖ ЗАСАХ"}
                                excelDownloadData={getQuestionEdit}
                                excelHeaders={excelHeaders}
                                isHideInsert={false}
                            />
                        </>
                    }
                    btnEdit={btnEdit}
                    editdataTargetID={"#questionEdit"}
                    modelType={showModal}
                    isHideDelete={false}
                    isHideEdit={true}
                    avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                    avgColumnName={"email"}
                    avgName={"Дундаж: "}
                    getRowsSelected={getRowsSelected}
                    setRowsSelected={setRowsSelected}
                />
            </div>

            <EditChild
                setRowsSelected={setRowsSelected}
                refreshQuestionEdit={refreshQuestionEdit}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default QuestionEdit;

const excelHeaders = [
    { label: "Албан тушаал", key: "position" },
    { label: "Регистрийн дугаар", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "myName" },
    { label: "Нас", key: "age" },
    { label: "Хүйс", key: "genderName" },
    { label: "Томилогдсон огноо", key: "appointedDate" },
    { label: "Ажиллагаанд явсан эсэх", key: "rolePlayed" },
    { label: "Ажиллагаа", key: "missionName" },
    { label: "Ажиллагаанаас ирсэн огноо", key: "missionCameDate" },
    { label: "Суралцаж байгаа эсэх", key: "studying" },
    { label: "Шийтгэгдсэн эсэх", key: "punishment" },
    { label: "Шийтгэгдсэн тушаалын огноо", key: "punishmentDate" },
    { label: "Зассан огноо", key: "updated_at" },
    { label: "Зассан командлал", key: "comandlalName" },
    { label: "Зассан админы нэр", key: "firstName" },
    { label: "Тайлбар", key: "questionDes" },
];
