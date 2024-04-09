import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const UnitCovotEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    // const [missionID, setMissionID] = useState("");
    // const [eeljID, setEeljID] = useState("");
    const [comandlalID, setComandlalID] = useState("");
    const [unitID, setUnitID] = useState("");
    const [covotOppitser, setCovotOppitser] = useState("");
    const [covotAhlagch, setCovotAhlagch] = useState("");
    const [covotGereet, setCovotGereet] = useState("");
    const [covotUnitSum, setCovotUnitSum] = useState("");
    const [covotDescription, setCovotDescription] = useState("");

    // const [getMissions, setMissions] = useState([]);
    // const [getEelj, setEeljs] = useState([]);
    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);
    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        // axios
        //     .get("/get/missions")
        //     .then((res) => {
        //         setMissions(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        axios
            .post("/get/comandlals")
            .then((res) => {
                setComandlals(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    //     axios
    //         .post("/get/eelj/by/missionID", {
    //             _missionID: missionID,
    //         })
    //         .then((res) => {
    //             setEeljs(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [missionID]);

    const unitByID = (userComandlalID) => {
        axios
            .post("/get/unit/byComandlalID", {
                id: userComandlalID,
            })
            .then((res) => {
                setUnits(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            // setMissionID(props.changeDataRow.missionID);
            // setEeljID(props.changeDataRow.eeljID);
            setComandlalID(props.changeDataRow.comandlalID);
            setUnitID(props.changeDataRow.unitID);
            unitByID(props.changeDataRow.comandlalID);
            setCovotOppitser(
                props.changeDataRow.covotOppitser != null
                    ? props.changeDataRow.covotOppitser
                    : ""
            );
            setCovotAhlagch(
                props.changeDataRow.covotAhlagch != null
                    ? props.changeDataRow.covotAhlagch
                    : ""
            );
            setCovotGereet(
                props.changeDataRow.covotGereet != null
                    ? props.changeDataRow.covotGereet
                    : ""
            );
            setCovotUnitSum(props.changeDataRow.covotUnitSum);
            setCovotDescription(
                props.changeDataRow.covotDescription != null
                    ? props.changeDataRow.covotDescription
                    : ""
            );
        }
    }, [props.isEditBtnClick]);

    const saveUnitCovot = () => {
        if (comandlalID == "" || comandlalID == null) {
            Swal.fire("Командлал сонгоно уу.");
            return;
        }
        if (unitID == "" || unitID == null) {
            Swal.fire("Анги сонгоно уу.");
            return;
        }
        if (covotUnitSum == "" || covotUnitSum == null) {
            Swal.fire("Нийт тоо оруулна уу.");
            return;
        }
        if (props.covotRemained >= covotUnitSum) {
            axios
                .post("/edit/unit/covot", {
                    id: props.changeDataRow.id,
                    missionID: state.getMissionRowID,
                    eeljID: state.getEeljRowID,
                    comandlalID: comandlalID,
                    unitID: unitID,
                    covotOppitser: covotOppitser,
                    covotAhlagch: covotAhlagch,
                    covotGereet: covotGereet,
                    covotUnitSum: covotUnitSum,
                    covotDescription: covotDescription,
                })
                .then((res) => {
                    props.setRowsSelected([]);
                    Swal.fire(res.data.msg);
                    props.getCovotSum(
                        state.getMissionRowID,
                        state.getEeljRowID
                    );
                    props.refreshUnitCovot(
                        state.getMissionRowID,
                        state.getEeljRowID
                    );
                    // setMissionID("");
                    // setEeljID("");
                    setComandlalID("");
                    setUnitID("");
                    setCovotOppitser("");
                    setCovotAhlagch("");
                    setCovotGereet("");
                    setCovotUnitSum("");
                    setCovotDescription("");
                    setShowModal("");
                })
                .catch((err) => {
                    Swal.fire(err.response.data.msg);
                });
        } else {
            Swal.fire("Боломжит үлдэгдлээс давсан байна.");
        }
    };

    // const changeMission = (e) => {
    //     setMissionID(e.target.value);
    //     setEeljID("0");
    // };
    // const changeEelj = (e) => {
    //     setEeljID(e.target.value);
    // };

    const changeComandlal = (e) => {
        setComandlalID(e.target.value);
        unitByID(e.target.value);
    };
    const changeUnit = (e) => {
        setUnitID(e.target.value);
    };
    const changeOpitser = (e) => {
        setCovotOppitser(e.target.value);
    };
    const changeAhlagch = (e) => {
        setCovotAhlagch(e.target.value);
    };

    const changeGereet = (e) => {
        setCovotGereet(e.target.value);
    };
    const changeSum = (e) => {
        setCovotUnitSum(e.target.value);
    };
    const changeDescription = (e) => {
        setCovotDescription(e.target.value);
    };

    return (
        <>
            <div className="modal" id="unitCovotEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">БОЛОМЖИТ ҮЛДЭГДЭЛ:</h4>
                            <h2 className="modal-title">
                                {" " + props.covotRemained}
                            </h2>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ажиллагааны нэр:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            onChange={changeMission}
                                            value={missionID}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getMissions.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.missionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ээлж:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            onChange={changeEelj}
                                            value={eeljID}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getEelj.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.eeljName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Командлал:
                                            </span>
                                        </div>
                                        {userType == "comandlalAdmin" ||
                                        userType == "unitAdmin" ? (
                                            <select
                                                className="form-control"
                                                value={comandlalID}
                                                onChange={changeComandlal}
                                                disabled={true}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getComandlals.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.comandlalShortName}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <select
                                                className="form-control"
                                                value={comandlalID}
                                                onChange={changeComandlal}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getComandlals.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.comandlalShortName}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Анги:
                                            </span>
                                        </div>
                                        {userType == "unitAdmin" ? (
                                            <select
                                                className="form-control"
                                                value={unitID}
                                                onChange={changeUnit}
                                                disabled={true}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getUnits.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.unitShortName}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <select
                                                className="form-control"
                                                value={unitID}
                                                onChange={changeUnit}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getUnits.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.unitShortName}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Офицер:
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control"
                                            onChange={changeOpitser}
                                            value={covotOppitser}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ахлагч:
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control"
                                            onChange={changeAhlagch}
                                            value={covotAhlagch}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Гэрээт:
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control"
                                            onChange={changeGereet}
                                            value={covotGereet}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Нийт:
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        onChange={changeSum}
                                        value={covotUnitSum}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Тайлбар:
                                        </span>
                                    </div>
                                    <textarea
                                        className="form-control"
                                        onChange={changeDescription}
                                        value={covotDescription}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveUnitCovot}
                            >
                                Засах
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Хаах
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnitCovotEdit;
