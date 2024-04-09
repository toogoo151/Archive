import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
const SalaaEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getRotID, setRotID] = useState([]);
    const [rotName, setRotName] = useState("");
    const [salaaName, setSalaaName] = useState("");
    const [salaaShortName, setSalaaShortName] = useState("");

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
            setRotName(props.changeDataRow.rotID);
            setSalaaName(props.changeDataRow.salaaName);
            setSalaaShortName(props.changeDataRow.salaaShortName);
        }
        fn_getRot(state.getMissionRowID, state.getEeljRowID);
    }, [props.isEditBtnClick]);

    const saveSalaa = () => {
        props.setRowsSelected([]);
        if (rotName == "" || rotName == null) {
            Swal.fire("Ротын нэр сонгоно уу.");
            return;
        }
        if (salaaName == "" || salaaName == null) {
            Swal.fire("Салааны нэр оруулна уу.");
            return;
        }

        axios
            .post("/edit/salaa", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                rotID: rotName,
                salaaName: salaaName,
                salaaShortName: salaaShortName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setRotName("");
                setSalaaName("");
                setSalaaShortName("");
                setShowModal("");

                props.refreshSalaa(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeRotName = (e) => {
        setRotName(e.target.value);
    };
    const changeSalaaName = (e) => {
        setSalaaName(e.target.value);
    };
    const changeSalaaShortName = (e) => {
        setSalaaShortName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="salaaEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">САЛААНЫ НЭР ЗАСАХ</h4>

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
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Салааны нэр:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeSalaaName}
                                            value={salaaName}
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
                                            onChange={changeSalaaShortName}
                                            value={salaaShortName}
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
                                onClick={saveSalaa}
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

export default SalaaEdit;
