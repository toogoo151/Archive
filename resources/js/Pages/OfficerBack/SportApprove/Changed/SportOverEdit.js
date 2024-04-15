import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const SportOverEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [genderID, setGenderID] = useState("");
    const [sportType1, setSportType1] = useState("");
    const [sportType2, setSportType2] = useState("");
    const [sportType3, setSportType3] = useState("");
    const [sportType4, setSportType4] = useState("");

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setGenderID(props.changeDataRow.genderID);
            setSportType1(props.changeDataRow.sportType1);
            setSportType2(props.changeDataRow.sportType2);
            setSportType3(props.changeDataRow.sportType3);
            setSportType4(props.changeDataRow.sportType4);
        }
    }, [props.isEditBtnClick]);

    const saveSport = () => {
        if (sportType1 == "" || sportType1 == null) {
            Swal.fire("Авсан оноо оруулна уу.");
            return;
        }
        if (sportType2 == "" || sportType2 == null) {
            Swal.fire("Авсан оноо оруулна уу.");
            return;
        }
        if (sportType3 == "" || sportType3 == null) {
            Swal.fire("Авсан оноо оруулна уу.");
            return;
        }
        if (sportType4 == "" || sportType4 == null) {
            Swal.fire("Авсан оноо оруулна уу.");
            return;
        }

        axios
            .post("/edit/sport/officer/changed", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                genderID: props.genderID,
                sportType1: sportType1,
                sportType2: sportType2,
                sportType3: sportType3,
                sportType4: sportType4,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshSportChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
                setGenderID("");
                setSportType1("");
                setSportType2("");
                setSportType3("");
                setSportType4("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeSportType1 = (e) => {
        setSportType1(e.target.value);
    };
    const changeSportType2 = (e) => {
        setSportType2(e.target.value);
    };
    const changeSportType3 = (e) => {
        setSportType3(e.target.value);
    };
    const changeSportType4 = (e) => {
        setSportType4(e.target.value);
    };

    return (
        <>
            <div className="modal" id="sportChildEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                БИЕИЙН ТАМИРЫН ШАЛГАЛТЫН ОНОО ЗАСАХ
                                <br />
                                ЦАХ-ийн нэр: {props.firstName}
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>

                        {props.genderID == 11 ? (
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Суга савлуурт суниах:
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={sportType1}
                                                onChange={changeSportType1}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Дүүжинд суниах:
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={sportType2}
                                                onChange={changeSportType2}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    100 метрийн гүйлт:
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={sportType3}
                                                onChange={changeSportType3}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    1000 метрийн гүйлт:
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={sportType4}
                                                onChange={changeSportType4}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Гэдэсний таталт:
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={sportType1}
                                                onChange={changeSportType1}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Гар дээр суниах:
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={sportType2}
                                                onChange={changeSportType2}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    100 метрийн гүйлт:
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={sportType3}
                                                onChange={changeSportType3}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    1000 метрийн гүйлт:
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="form-control"
                                                value={sportType4}
                                                onChange={changeSportType4}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveSport}
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

export default SportOverEdit;
