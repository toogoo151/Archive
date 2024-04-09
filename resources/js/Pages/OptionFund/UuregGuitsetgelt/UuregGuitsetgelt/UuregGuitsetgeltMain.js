import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import MainEdit from "./MainEdit";

const UuregGuitsetgeltMain = () => {
    const state = useContext(AppContext);
    const [getMain, setMain] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getRots, setRots] = useState([]);
    const [getSalaas, setSalaas] = useState([]);
    const [getTasags, setTasags] = useState([]);
    const [getApplauses, setApplauses] = useState([]);
    const [getOgnoo, setOgnoo] = useState([]);

    const [getRotID, setRotID] = useState("");
    const [getSalaaID, setSalaaID] = useState("");
    const [getTasagID, setTasagID] = useState("");
    const [getApplauseID, setApplauseID] = useState("");
    const [getDate, setDate] = useState("");

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        axios
            .post("/get/rot", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                setRots(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .post("/get/ognoo/uureg/guitsetgelt", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                setOgnoo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/get/uureg/applauses")
            .then((res) => {
                setApplauses(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        refreshMain(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            getTasagID,
            getApplauseID,
            getDate
        );
    }, []);

    const changeRot = (rotID) => {
        axios
            .post("/get/salaa/by/rotID", {
                _rotID: rotID,
            })
            .then((res) => {
                setSalaas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeSalaa = (salaaID) => {
        axios
            .post("/get/tasag/by/salaaID", {
                _salaaID: salaaID,
            })
            .then((res) => {
                setTasags(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const changeTasag = (e) => {
        setTasagID(e.target.value);
        refreshMain(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            e.target.value,
            getApplauseID,
            getDate
        );
    };

    const changeApplause = (e) => {
        setApplauseID(e.target.value);
        refreshMain(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            getTasagID,
            e.target.value,
            getDate
        );
    };

    const changeDate = (e) => {
        setDate(e.target.value);
        refreshMain(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            getTasagID,
            getApplauseID,
            e.target.value
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getMain[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshMain(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            getTasagID,
            getApplauseID,
            getDate
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshMain = (
        missionID,
        eeljID,
        rotID,
        salaaID,
        tasagID,
        applauseID,
        applauseDate
    ) => {
        axios
            .post("/get/uureg/guitsetgelt/main", {
                _missionID: missionID,
                _eeljID: eeljID,
                _rotID: rotID,
                _salaaID: salaaID,
                _tasagID: tasagID,
                _applauseID: applauseID,
                _applauseDate: applauseDate,
            })
            .then((res) => {
                setRowsSelected([]);
                setMain(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const uuregMain = [
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
        {
            name: "rotName",
            label: "Рот",
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
            name: "salaaName",
            label: "Салаа",
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
            name: "tasagName",
            label: "Тасаг",
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
                        },
                    };
                },
            },
        },
        {
            name: "isApplauseName",
            label: "Төрөл",
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
            name: "applauseHelber",
            label: "Хэлбэр",
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
            name: "applauseDescription",
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
            },
        },
        {
            name: "applauseDate",
            label: "Огноо",
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

    const btnDelete = () => {
        setRowsSelected([]);
        if (getMain[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/uureg/guitsetgelt/new", {
                            id: getMain[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshMain(
                                state.getMissionRowID,
                                state.getEeljRowID,
                                getRotID,
                                getSalaaID,
                                getTasagID,
                                getApplauseID,
                                getDate
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
                <div className="col">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Төрөл:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={changeApplause}
                        >
                            <option value="">Сонгоно уу</option>
                            {getApplauses.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.isApplauseName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Рот:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setRotID(e.target.value);
                                setSalaaID("");
                                setTasagID("");
                                refreshMain(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    e.target.value,
                                    "",
                                    "",
                                    getApplauseID,
                                    getDate
                                );
                                changeRot(e.target.value);
                            }}
                        >
                            <option value="">Сонгоно уу</option>
                            {getRots.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.rotName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Салаа:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={(e) => {
                                setSalaaID(e.target.value);
                                setTasagID("");
                                refreshMain(
                                    state.getMissionRowID,
                                    state.getEeljRowID,
                                    getRotID,
                                    e.target.value,
                                    "",
                                    getApplauseID,
                                    getDate
                                );
                                changeSalaa(e.target.value);
                            }}
                        >
                            <option value="">Сонгоно уу</option>
                            {getSalaas.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.salaaName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Тасаг:</span>
                        </div>

                        <select className="form-control" onChange={changeTasag}>
                            <option value="">Сонгоно уу</option>
                            {getTasags.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.tasagName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Огноо:</span>
                        </div>

                        <select className="form-control" onChange={changeDate}>
                            <option value="">Сонгоно уу</option>
                            {getOgnoo.map((el) => (
                                <option key={el.new_date} value={el.new_date}>
                                    {el.new_date} {"сар"}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <MUIDatatable
                data={getMain}
                setdata={setMain}
                columns={uuregMain}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ЦАХ-ИЙН ҮҮРЭГ ГҮЙЦЭТГЭЛТИЙН МЭДЭЭ ХАРАХ"}
                            excelDownloadData={getMain}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                btnEdit={btnEdit}
                editdataTargetID={"#mainEdit"}
                modelType={showModal}
                btnDelete={btnDelete}
                isHideDelete={true}
                isHideEdit={true}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
            <MainEdit
                setRowsSelected={setRowsSelected}
                refreshMain={refreshMain}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
                clickParentRowID={clickedRowData.pkoMainHistoryID}
            />
        </div>
    );
};

export default UuregGuitsetgeltMain;

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Рот", key: "rotName" },
    { label: "Салаа", key: "salaaName" },
    { label: "Тасаг", key: "tasagName" },
    { label: "Албан тушаал", key: "positionName" },
    { label: "Төрөл", key: "isApplauseName" },
    { label: "Хэлбэр", key: "applauseHelber" },
    { label: "Тайлбар", key: "applauseDescription" },
    { label: "Огноо", key: "applauseDate" },
];
