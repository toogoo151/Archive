import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
const PositionEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getRotID, setRotID] = useState([]);
    const [getSalaaID, setSalaaID] = useState([]);
    const [getTasagID, setTasagID] = useState([]);
    const [rotName, setRotName] = useState("");
    const [salaaName, setSalaaName] = useState("");
    const [tasagName, setTasagName] = useState("");
    const [positionName, setPositionName] = useState("");
    const [positionShortName, setPositionShortName] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        fn_getRot(state.getMissionRowID, state.getEeljRowID);
    }, []);

    const fn_getRot = (missionID, eeljID) => {
        axios
            .post("/get/rot", {
                _missionID: missionID,
                _eeljID: eeljID,
            })
            .then((res) => {
                setRotID(res.data);
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
            fn_getSalaa(props.changeDataRow.rotID);
            setRotName(props.changeDataRow.rotID);
            fn_getTasag(props.changeDataRow.salaaID);
            setSalaaName(props.changeDataRow.salaaID);
            setTasagName(props.changeDataRow.tasagID);
            setPositionName(props.changeDataRow.positionName);
            if (props.changeDataRow.positionShortName != null) {
                setPositionShortName(props.changeDataRow.positionShortName);
            }
        }
        fn_getRot(state.getMissionRowID, state.getEeljRowID);
    }, [props.isEditBtnClick]);

    const savePosition = () => {
        props.setRowsSelected([]);
        if (rotName == "" || rotName == null) {
            Swal.fire("Ротын нэр сонгоно уу.");
            return;
        }
        if (positionName == "" || positionName == null) {
            Swal.fire("Албан тушаал оруулна уу.");
            return;
        }

        axios
            .post("/edit/position", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                rotID: rotName,
                salaaID: salaaName,
                tasagID: tasagName,
                positionName: positionName,
                positionShortName: positionShortName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setRotName("");
                setSalaaName("");
                setTasagName("");
                setPositionName("");
                setPositionShortName("");
                setShowModal("");

                props.refreshPosition(
                    state.getMissionRowID,
                    state.getEeljRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeRotName = (e) => {
        setRotName(e.target.value);
        fn_getSalaa(e.target.value);
        setSalaaName("");
        setTasagName("");
    };
    const fn_getSalaa = (rotID) => {
        axios
            .post("/get/salaa/by/rotID", {
                _rotID: rotID,
            })
            .then((res) => {
                setSalaaID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeSalaaName = (e) => {
        setSalaaName(e.target.value);
        fn_getTasag(e.target.value);
        setTasagName("");
    };
    const fn_getTasag = (salaaID) => {
        axios
            .post("/get/tasag/by/salaaID", {
                _salaaID: salaaID,
            })
            .then((res) => {
                setTasagID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const changeTasagName = (e) => {
        setTasagName(e.target.value);
    };
    const changePositionName = (e) => {
        setPositionName(e.target.value);
    };
    const changePositionShortName = (e) => {
        setPositionShortName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="positionEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">АЛБАН ТУШААЛ ЗАСАХ</h4>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ротын нэр:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeRotName}
                                        value={rotName}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getRotID.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.rotName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Салааны нэр:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeSalaaName}
                                        value={salaaName}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getSalaaID.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.salaaName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Тасгийн нэр:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeTasagName}
                                        value={tasagName}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getTasagID.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.tasagName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Албан тушаал:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changePositionName}
                                            value={positionName}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Албан тушаалын товчлол:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changePositionShortName}
                                            value={positionShortName}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={savePosition}
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

export default PositionEdit;
