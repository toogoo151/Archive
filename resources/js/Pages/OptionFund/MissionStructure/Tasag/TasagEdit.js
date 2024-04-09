import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
const TasagEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getRotID, setRotID] = useState([]);
    const [getSalaaID, setSalaaID] = useState([]);
    const [rotName, setRotName] = useState("");
    const [salaaID, setSalaaName] = useState("");
    const [tasagName, setTasagName] = useState("");
    const [tasagShortName, setTasagShortName] = useState("");

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
            setSalaaName(props.changeDataRow.salaaID);
            setTasagName(props.changeDataRow.tasagName);
            setTasagShortName(props.changeDataRow.tasagShortName);
        }
        fn_getRot(state.getMissionRowID, state.getEeljRowID);
    }, [props.isEditBtnClick]);

    const saveTasag = () => {
        // props.setRowsSelected([]);
        if (rotName == "" || rotName == null) {
            Swal.fire("Ротын нэр сонгоно уу.");
            return;
        }
        if (salaaID == "" || salaaID == null) {
            Swal.fire("Салааны нэр сонгоно уу.");
            return;
        }
        if (tasagName == "" || tasagName == null) {
            Swal.fire("Тасгийн нэр оруулна уу.");
            return;
        }

        axios
            .post("/edit/tasag", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                rotID: rotName,
                salaaID: salaaID,
                tasagName: tasagName,
                tasagShortName: tasagShortName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setRotName("");
                setSalaaName("");
                setTasagName("");
                setTasagShortName("");
                setShowModal("");

                props.refreshTasag(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeRotName = (e) => {
        setRotName(e.target.value);
        fn_getSalaa(e.target.value);
        setSalaaName("");
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
    };
    const changeTasagName = (e) => {
        setTasagName(e.target.value);
    };
    const changeTasagShortName = (e) => {
        setTasagShortName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="tasagEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ТАСГИЙН НЭР ЗАСАХ</h4>

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
                                        value={salaaID}
                                        onChange={changeSalaaName}
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
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Тасгийн нэр:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeTasagName}
                                            value={tasagName}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Товч нэр:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeTasagShortName}
                                            value={tasagShortName}
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
                                onClick={saveTasag}
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

export default TasagEdit;
