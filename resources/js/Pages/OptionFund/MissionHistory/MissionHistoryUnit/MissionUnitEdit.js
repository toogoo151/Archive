import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
import InputMask from "react-input-mask";

const MissionUnitEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [getPositions, setPositions] = useState([]);

    const [getUserRD, setUserRD] = useState("");
    const [getStartDate, setStartDate] = useState("");
    const [getFinishDate, setFinishDate] = useState("");
    const [getMissionPosition, setMissionPosition] = useState("");

    const letter = /(?!.*[DFIOQU])[А-Я]/i;
    const digit = /[0-9]/;
    const mask = [
        letter,
        letter,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
    ];

    useEffect(() => {
        fn_position();
    }, []);

    const fn_position = () => {
        axios
            .post("/get/position", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                setPositions(res.data);
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
            setUserRD(props.changeDataRow.rd);
            setStartDate(props.changeDataRow.startDate);
            setFinishDate(props.changeDataRow.finishDate);
            setMissionPosition(props.changeDataRow.missionPosition);
            fn_position(props.changeDataRow.missionPosition);
        }
    }, [props.isEditBtnClick]);

    const saveHistory = () => {
        if (getUserRD == "" || getUserRD == null) {
            Swal.fire("Регистрийн дугаар оруулна уу.");
            return;
        }
        if (getStartDate == "" || getStartDate == null) {
            Swal.fire("Явсан огноо оруулна уу.");
            return;
        }
        if (getFinishDate == "" || getFinishDate == null) {
            Swal.fire("Ирсэн огноо оруулна уу.");
            return;
        }
        if (getMissionPosition == "" || getMissionPosition == null) {
            Swal.fire("Албан тушаал оруулна уу.");
            return;
        }

        axios
            .post("/edit/mission/history", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                userRD: getUserRD,
                startDate: getStartDate,
                finishDate: getFinishDate,
                missionPosition: getMissionPosition,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshMissionUnitHistory(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getComandlalID,
                    props.getUnitID,
                    props.getGender
                );
                setUserRD("");
                setStartDate("");
                setFinishDate("");
                setMissionPosition("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeRD = (e) => {
        setUserRD(e.target.value);
    };
    const changeStart = (e) => {
        setStartDate(e.target.value);
    };
    const changeFinish = (e) => {
        setFinishDate(e.target.value);
    };
    const changePosition = (e) => {
        setMissionPosition(e.target.value);
    };

    return (
        <>
            <div className="modal" id="missionUnitHistoryEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                АЖИЛЛАГААНЫ ТҮҮХ ЗАСАХ
                            </h4>
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
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Регистрийн дугаар:
                                            </span>
                                        </div>
                                        <InputMask
                                            style={{
                                                textTransform: "uppercase",
                                            }}
                                            mask={mask}
                                            onChange={changeRD}
                                            value={getUserRD}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Албан тушаал:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            value={getMissionPosition}
                                            onChange={changePosition}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getPositions.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.positionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Явсан огноо:
                                            </span>
                                        </div>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={getStartDate}
                                            onChange={changeStart}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ирсэн огноо:
                                            </span>
                                        </div>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={getFinishDate}
                                            onChange={changeFinish}
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
                                onClick={saveHistory}
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

export default MissionUnitEdit;
