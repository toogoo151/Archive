import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const MissionEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [missionName, setMissionName] = useState("");
    const [missionStartDate, setMissionStartDate] = useState("");
    const [missionFinishDate, setMissionFinishDate] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);
    useEffect(() => {
        if (props.isEditBtnClick) {
            setMissionName(props.changeDataRow.missionName);
            setMissionStartDate(
                props.changeDataRow.missionStartDate != null
                    ? props.changeDataRow.missionStartDate
                    : ""
            );
            setMissionFinishDate(
                props.changeDataRow.missionFinishDate != null
                    ? props.changeDataRow.missionFinishDate
                    : ""
            );
        }
    }, [props.isEditBtnClick]);

    const saveMission = () => {
        props.setRowsSelected([]);
        if (missionName == "" || missionName == null) {
            Swal.fire("Ажиллагааны нэр оруулна уу.");
            return;
        }
        // if (missionStartDate == "" || missionStartDate == null) {
        //     Swal.fire("Эхлэх хугацаа оруулна уу.");
        //     return;
        // }
        // if (missionFinishDate == "" || missionFinishDate == null) {
        //     Swal.fire("Дуусах хугацаа оруулна уу.");
        //     return;
        // }

        axios
            .post("/edit/mission", {
                id: props.changeDataRow.id,

                missionName: missionName,
                missionStartDate: missionStartDate,
                missionFinishDate: missionFinishDate,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setMissionName("");
                setMissionStartDate("");
                setMissionFinishDate("");
                setShowModal("");

                props.refreshMission();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeMissionName = (e) => {
        setMissionName(e.target.value);
    };
    const changeMissionStartDate = (e) => {
        setMissionStartDate(e.target.value);
    };
    const changeMissionFinishDate = (e) => {
        setMissionFinishDate(e.target.value);
    };

    return (
        <>
            <div className="modal" id="missionEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">АЖИЛЛАГАА ЗАСАХ</h4>

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
                                            Ажиллагааны нэр:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeMissionName}
                                        value={missionName}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Эхлэх хугацаа:
                                            </span>
                                        </div>
                                        <input
                                            value={missionStartDate}
                                            className="form-control"
                                            placeholder="Эхлэх хугацаа..."
                                            type="datetime-local"
                                            onChange={changeMissionStartDate}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Дуусах хугацаа:
                                            </span>
                                        </div>
                                        <input
                                            value={missionFinishDate}
                                            className="form-control"
                                            placeholder="Дуусах хугацаа..."
                                            type="datetime-local"
                                            onChange={changeMissionFinishDate}
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
                                onClick={saveMission}
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

export default MissionEdit;
