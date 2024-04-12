import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../Context/MyContext";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";
import UserDetails from "./UserDetails";
// import PkoMainUnitEdit from "./PkoMainUnitEdit";

const OfficerMainHistory = () => {
    const state = useContext(AppContext);
    const [getMainHistory, setMainHistory] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);

    const [getUserDetails, setUserDetails] = useState([]);
    const [getMissionHistory, setMissionHistory] = useState([]);

    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");
    const [allTsah, setallTsah] = useState(0);
    const [getIsWord, setIsWord] = useState("");
    const [getIsHeltes, setIsHeltes] = useState("");
    const [getIsHealth, setIsHealth] = useState("");
    const [getIsPhysic, setIsPhysic] = useState("");
    const [getGender, setGender] = useState("");

    const [getAllTotal, setAllTotal] = useState(0);
    const [getMaleTotal, setMaleTotal] = useState(0);
    const [getFemaleTotal, setFemaleTotal] = useState(0);
    const [getFlightTotal, setFlightTotal] = useState(0);
    const [getDocTotal, setDocTotal] = useState(0);
    const [getHeltesTotal, setHeltesTotal] = useState(0);
    const [getHealthTotal, setHealthTotal] = useState(0);
    const [getSportTotal, setSportTotal] = useState(0);
    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData([getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                if (userType == "comandlalAdmin" || userType == "unitAdmin") {
                    setComandlalID(res.data.firstComandlal);
                    setComandlals(res.data.getComandlals);
                    changeComandlal(res.data.firstComandlal["id"]);
                }
                if (userType == "superAdmin" || userType == "batalionAdmin") {
                    setComandlals(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            getGender
        );
        getTsahSum(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            getGender
        );
    }, []);

    const changeComandlal = (inComandlal) => {
        axios
            .post("/get/ID/byUnit", {
                _comandlalID: inComandlal,
            })
            .then((res) => {
                if (userType == "unitAdmin") {
                    setUnitID(res.data.firstUnit);
                    setUnits(res.data.getUnits);
                }
                if (
                    userType == "superAdmin" ||
                    userType == "comandlalAdmin" ||
                    userType == "batalionAdmin"
                ) {
                    setUnits(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const btnEdit = () => {
        setIsEditBtnClick(true);
    };

    const changeUnit = (e) => {
        setUnitID(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            getGender
        );
        getTsahSum(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            e.target.value,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            getGender
        );
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getMainHistory[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            getGender
        );
        getTsahSum(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            getGender
        );
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshMainHistory = (
        missionID,
        eeljID,
        comandlalID,
        unitID,
        documentsMainApprove,
        eruulMendHeltesApprove,
        healthApprove,
        sportScore,
        genderID
    ) => {
        axios
            .post("get/officer/back/main/historys", {
                _missionID: missionID,
                _eeljID: eeljID,
                _comandlalID: comandlalID,
                _unitID: unitID,
                _documentsMainApprove: documentsMainApprove,
                // _eruulMendHeltesApprove: eruulMendHeltesApprove,
                _healthApprove: healthApprove,
                _sportScore: sportScore,
                _gender: genderID,
            })
            .then((res) => {
                setRowsSelected([]);
                setMainHistory(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getTsahSum = (
        missionID,
        eeljID,
        comandlalID,
        unitID,
        documentsMainApprove,
        eruulMendHeltesApprove,
        healthApprove,
        sportScore,
        genderID
    ) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/count/main", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _comandlalID: comandlalID,
                    _unitID: unitID,
                    _documentsMainApprove: documentsMainApprove,
                    _eruulMendHeltesApprove: eruulMendHeltesApprove,
                    _healthApprove: healthApprove,
                    _sportScore: sportScore,
                    _gender: genderID,
                })
                .then((res) => {
                    if (res.data.sum != undefined) {
                        setallTsah(res.data.sum);
                    }
                    if (res.data.allTotal != undefined) {
                        setAllTotal(res.data.allTotal);
                    }
                    if (res.data.maleTotal != undefined) {
                        setMaleTotal(res.data.maleTotal);
                    }
                    if (res.data.femaleTotal != undefined) {
                        setFemaleTotal(res.data.femaleTotal);
                    }
                    if (res.data.flightTotal != undefined) {
                        setFlightTotal(res.data.flightTotal);
                    }
                    if (res.data.docTotal != undefined) {
                        setDocTotal(res.data.docTotal);
                    }
                    if (res.data.heltesTotal != undefined) {
                        setHeltesTotal(res.data.heltesTotal);
                    }
                    if (res.data.healthTotal != undefined) {
                        setHealthTotal(res.data.healthTotal);
                    }
                    if (res.data.sportTotal != undefined) {
                        setSportTotal(res.data.sportTotal);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const changeWord = (e) => {
        setIsWord(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            e.target.value,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            getGender
        );
        getTsahSum(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            e.target.value,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            getGender
        );
    };

    const changeHealth = (e) => {
        setIsHealth(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            e.target.value,
            getIsPhysic,
            getGender
        );
        getTsahSum(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            e.target.value,
            getIsPhysic,
            getGender
        );
    };

    const changeHeltes = (e) => {
        setIsHeltes(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            e.target.value,
            getIsHealth,
            getIsPhysic,
            getGender
        );
        getTsahSum(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            e.target.value,
            getIsHealth,
            getIsPhysic,
            getGender
        );
    };

    const changePhysic = (e) => {
        setIsPhysic(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            e.target.value,
            getGender
        );
        getTsahSum(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            e.target.value,
            getGender
        );
    };

    const changeGender = (e) => {
        setGender(e.target.value);
        refreshMainHistory(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            e.target.value
        );
        getTsahSum(
            state.getMissionRowID,
            state.getEeljRowID,
            getComandlalID,
            getUnitID,
            getIsWord,
            getIsHeltes,
            getIsHealth,
            getIsPhysic,
            e.target.value
        );
    };

    const columnsOld = [
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
            label: "Регистрийн дугаар",
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
                            width: 180,
                        },
                    };
                },
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
                            width: 180,
                        },
                    };
                },
            },
        },

        {
            name: "documentsMainApprove",
            label: "Бичиг баримтын бүрдэл",
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
                customBodyRender: (value) => {
                    if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    } else if (value == 0) {
                        return "Шийдвэрлэгдээгүй";
                    } else if (value == 2) {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    }
                },
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "eruulMendHeltesApprove",
            label: "Эрүүл мэндийн хэлтэс",
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
                customBodyRender: (value) => {
                    if (value == 2) {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    } else if (value == 0) {
                        return "Шийдвэрлэгдээгүй";
                    } else if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    }
                },
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "healthApprove",
            label: "Эрүүл мэндийн үзлэг",
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
                customBodyRender: (value) => {
                    if (value == 2) {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    } else if (value == 0) {
                        return "Ороогүй";
                    } else if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    }
                },
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "sportScore",
            label: "Биеийн тамирын оноо",
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
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "id",
            label: "Байр",
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
                customBodyRenderLite: (rowIndex) => {
                    if (rowIndex == 0) {
                        return rowIndex + 1;
                    } else {
                        return rowIndex + 1;
                    }
                },

                setCellProps: (value, rowIndex) => {
                    const el = getMainHistory[rowIndex];
                    if (el.sportScore >= 80) {
                        return {
                            align: "center",
                            style: {
                                backgroundColor: "#7FF6BA",
                                color: "black",
                            },
                        };
                    } else if (el.sportScore >= 50) {
                        return {
                            align: "center",
                            style: {
                                backgroundColor: "#F8EA71",
                                color: "black",
                            },
                        };
                    } else {
                        return {
                            align: "center",
                            style: {
                                backgroundColor: "#DD596F",
                                color: "black",
                            },
                        };
                    }
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 50,
                            fontWeight: "bold",
                        },
                    };
                },
            },
        },

        {
            name: "id",
            label: "Дэлгэрэнгүй",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 100,
                        },
                    };
                },
                setCellProps: () => {
                    return { align: "center" };
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-toggle="modal"
                                data-target="#userDetails"
                                onClick={() => {
                                    fn_details_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Дэлгэрэнгүй
                            </button>
                        </>
                    );
                },
            },
        },
    ];
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
            label: "Регистрийн дугаар",
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
                            width: 180,
                        },
                    };
                },
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
                            width: 180,
                        },
                    };
                },
            },
        },

        {
            name: "documentsMainApprove",
            label: "Бичиг баримтын бүрдэл",
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
                customBodyRender: (value) => {
                    if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    } else if (value == 0) {
                        return "Шийдвэрлэгдээгүй";
                    } else if (value == 2) {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    }
                },
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "healthApprove",
            label: "Эрүүл мэндийн үзлэг",
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
                customBodyRender: (value) => {
                    if (value == 2) {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    } else if (value == 0) {
                        return "Ороогүй";
                    } else if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    }
                },
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "",
            label: "ALCPT",
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
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "",
            label: "Англи хэлний 4 чадвар",
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
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "sportScore",
            label: "Биеийн тамирын оноо",
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
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "",
            label: "Жолооны шалгалт",
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
                customBodyRender: (value) => {
                    if (value == 2) {
                        return (
                            <DangerousButton color={"error"}></DangerousButton>
                        );
                    } else if (value == 0) {
                        return "Ороогүй";
                    } else if (value == 1) {
                        return <CheckButton color={"success"}></CheckButton>;
                    }
                },
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "",
            label: "Ур чадвар",
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
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "id",
            label: "Байр",
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
                customBodyRenderLite: (rowIndex) => {
                    if (rowIndex == 0) {
                        return rowIndex + 1;
                    } else {
                        return rowIndex + 1;
                    }
                },

                setCellProps: (value, rowIndex) => {
                    const el = getMainHistory[rowIndex];
                    if (el.sportScore >= 80) {
                        return {
                            align: "center",
                            style: {
                                backgroundColor: "#7FF6BA",
                                color: "black",
                            },
                        };
                    } else if (el.sportScore >= 50) {
                        return {
                            align: "center",
                            style: {
                                backgroundColor: "#F8EA71",
                                color: "black",
                            },
                        };
                    } else {
                        return {
                            align: "center",
                            style: {
                                backgroundColor: "#DD596F",
                                color: "black",
                            },
                        };
                    }
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 50,
                            fontWeight: "bold",
                        },
                    };
                },
            },
        },

        {
            name: "id",
            label: "Дэлгэрэнгүй",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 100,
                        },
                    };
                },
                setCellProps: () => {
                    return { align: "center" };
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-toggle="modal"
                                data-target="#userDetails"
                                onClick={() => {
                                    fn_details_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Дэлгэрэнгүй
                            </button>
                        </>
                    );
                },
            },
        },
    ];
    const fn_details_btn = (value, tableMeta, updateValue) => {
        axios
            .post("/get/user/details", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                _id: value,
            })
            .then((res) => {
                setUserDetails(res.data.getUserDetails);
                setMissionHistory(res.data.getMissionHistory);
            })
            .catch((err) => {
                console.log(err);
            });
        // <UserDetails />;
    };

    return (
        <>
            <div>
                <div
                    className="info-box col d-flex flex-column"
                    style={{
                        paddingTop: "25px",
                        paddingBottom: "0px",
                    }}
                >
                    <div className="row px-3">
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-info small-box d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getAllTotal}</h3>
                                    <p>НИЙТ ЦАХ ТОО</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-calculator" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-info small-box d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getMaleTotal}</h3>
                                    <p>ЭРЭГТЭЙ ЦАХ</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-male  " />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-info small-box d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getFemaleTotal}</h3>
                                    <p>ЭМЭГТЭЙ ЦАХ</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-female" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-info small-box d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getFlightTotal}</h3>
                                    <p>ТОМИЛОГДСОН ЦАХ</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-plane" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row px-3">
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-success small-box  d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getDocTotal}</h3>

                                    <div className="">
                                        <p>
                                            Бичиг баримтын бүрдэл
                                            <br className="d-lg-block d-none" />{" "}
                                            зөвшөөрөгдсөн
                                        </p>
                                    </div>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-check" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-success small-box d-flex  flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getHeltesTotal}</h3>

                                    <div className="">
                                        <p>
                                            Эрүүл мэндийн хэлтсээс
                                            <br className="d-lg-block d-none" />{" "}
                                            зөвшөөрөгдсөн
                                        </p>
                                    </div>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-check" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-success small-box d-flex  flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getHealthTotal}</h3>

                                    <div className="">
                                        <p>
                                            Эрүүл мэндийн үзлэгээр{" "}
                                            <br className="d-lg-block d-none" />{" "}
                                            тэнцсэн
                                        </p>
                                    </div>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-check" />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-success small-box  d-flex  flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getSportTotal}</h3>

                                    <div className="">
                                        <p>
                                            Биеийн тамирын шалгалт
                                            <br className="d-lg-block d-none" />{" "}
                                            өгсөн
                                        </p>
                                    </div>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-check" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="info-box"
                    style={{
                        padding: "20px",
                        paddingBottom: "0px",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {/* <div className="container col-md-12"> */}

                    <div className="col-md-4">
                        <div className="row">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Командлал:
                                    </span>
                                </div>
                                {userType == "superAdmin" ||
                                userType == "batalionAdmin" ? (
                                    <select
                                        className="form-control"
                                        onChange={(e) => {
                                            setComandlalID(e.target.value);
                                            setUnitID("");
                                            refreshMainHistory(
                                                state.getMissionRowID,
                                                state.getEeljRowID,
                                                e.target.value,
                                                "",
                                                getIsWord,
                                                getIsHeltes,
                                                getIsHealth,
                                                getIsPhysic,
                                                getGender
                                            );
                                            getTsahSum(
                                                state.getMissionRowID,
                                                state.getEeljRowID,
                                                e.target.value,
                                                "",
                                                getIsWord,
                                                getIsHeltes,
                                                getIsHealth,
                                                getIsPhysic,
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
                        <div className="row">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Анги:
                                    </span>
                                </div>
                                {userType == "superAdmin" ||
                                userType == "comandlalAdmin" ||
                                userType == "batalionAdmin" ? (
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
                        <div className="row">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Хүйс:
                                    </span>
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

                    <div className="col-md-4">
                        <div className="row">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Бичиг баримт бүрдэл:
                                    </span>
                                </div>
                                <select
                                    value={getIsWord}
                                    className="form-control"
                                    onChange={(e) => {
                                        changeWord(e);
                                    }}
                                >
                                    <option value="">Сонгоно уу</option>
                                    <option value="0">Шийдвэрлэгдээгүй</option>
                                    <option value="1">Зөвшөөрөгдсөн</option>
                                    <option value="2">Татгалзсан</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Эрүүл мэндийн үзлэг:
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    onChange={changeHealth}
                                >
                                    <option value="">Сонгоно уу</option>
                                    <option value="0">Ороогүй</option>
                                    <option value="1">Тэнцсэн</option>
                                    <option value="2">Тэнцээгүй</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <button
                                    className="btn btn-info"
                                    style={{
                                        width: "172px",
                                    }}
                                >
                                    НИЙТ {allTsah}
                                </button>
                            </div>
                        </div>
                        {/* <div className="col-md-3 col-sm-6 col-12">

                        <div className="info-box bg-gradient-info">
                            <span
                                className="info-box-icon"
                                style={{ fontSize: "47px" }}
                            >
                                {allTsah}
                            </span>
                            <div className="info-box-content">
                                <span
                                    className="info-box-text"
                                    style={{ fontSize: "32px" }}
                                >
                                    НИЙТ
                                </span>
                            </div>
                        </div>
                    </div> */}
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Эрүүл мэндийн хэлтэс:
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    onChange={changeHeltes}
                                >
                                    <option value="">Сонгоно уу</option>
                                    <option value="0">Шийдвэрлэгдээгүй</option>
                                    <option value="1">Зөвшөөрөгдсөн</option>
                                    <option value="2">Татгалзсан</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Биеийн тамирын шалгалт:
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    onChange={changePhysic}
                                >
                                    <option value="">Сонгоно уу</option>
                                    <option value="gived">Өгсөн</option>
                                    <option value="notGiven">Өгөөгүй</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* </div> */}
                </div>

                <MUIDatatable
                    data={getMainHistory}
                    setdata={setMainHistory}
                    columns={columns}
                    costumToolbar={
                        <>
                            <CustomToolbar
                                title={"ЦАХ-ДЫН ҮНДСЭН МЭДЭЭЛЭЛ"}
                                excelDownloadData={getMainHistory}
                                excelHeaders={excelHeaders}
                                isHideInsert={false}
                            />
                        </>
                    }
                    btnEdit={btnEdit}
                    modelType={showModal}
                    editdataTargetID={"#userEdit"}
                    isHideHuman={false}
                    isHideDelete={false}
                    isHideEdit={true}
                    avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                    avgColumnName={"email"}
                    avgName={"Дундаж: "}
                    getRowsSelected={getRowsSelected}
                    setRowsSelected={setRowsSelected}
                />

                <>
                    {userType == "unitAdmin" ? (
                        <>
                            {/* <PkoMainUnitEdit
                                setRowsSelected={setRowsSelected}
                                refreshMainHistory={refreshMainHistory}
                                changeDataRow={clickedRowData}
                                isEditBtnClick={isEditBtnClick}
                            /> */}
                        </>
                    ) : (
                        <></>
                    )}
                </>
                <br />
                <UserDetails
                    onClick={fn_details_btn}
                    refreshMainHistory={refreshMainHistory}
                    clickedRowData={clickedRowData}
                    getUserDetails={getUserDetails}
                    getMissionHistory={getMissionHistory}
                />
            </div>
        </>
    );
};

export default OfficerMainHistory;

const excelHeaders = [
    { label: "Ажиллагаа", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Командлал", key: "comandlalShortName" },
    { label: "Анги", key: "unitShortName" },
    { label: "Цол", key: "shortRank" },
    { label: "Регистрийн дугаар", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Нас", key: "age" },
    { label: "Хүйс", key: "genderName" },
    // { label: "Бичиг баримтын бүрдэл", key: "documentsMainApprove" },
    // { label: "Эрүүл мэндийн хэлтэс", key: "eruulMendHeltesApprove" },
    // { label: "Эрүүл мэндийн үзлэг", key: "healthApprove" },
    { label: "Биеийн тамирын оноо", key: "sportScore" },
    // { label: "Тагнуулын тодорхойлолт", key: "isCrime" },
    // { label: "Хасагдсан эсэх", key: "isCanceled" },
    // { label: "Ниссэн эсэх", key: "isFlight" },
    // { label: "Огноо 1", key: "created_at" },
    // { label: "Огноо 2", key: "updated_at" },
];
