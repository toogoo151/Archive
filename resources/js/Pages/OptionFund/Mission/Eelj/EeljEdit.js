import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const EeljEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [missionID, setMissionID] = useState("");
    const [eeljName, setEeljName] = useState("");
    const [eeljStartDate, setEeljStartDate] = useState("");
    const [eeljFinishDate, setEeljFinishDate] = useState("");

    const [getMissions, setMissions] = useState([]);
    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        axios
            .get("/get/missions")
            .then((res) => {
                setMissions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setMissionID(props.changeDataRow.missionID);
            setEeljName(props.changeDataRow.eeljName);
            setEeljStartDate(
                props.changeDataRow.eeljStartDate != null
                    ? props.changeDataRow.eeljStartDate
                    : ""
            );
            setEeljFinishDate(
                props.changeDataRow.eeljFinishDate != null
                    ? props.changeDataRow.eeljFinishDate
                    : ""
            );
        }
    }, [props.isEditBtnClick]);

    const saveEelj = () => {
        props.setRowsSelected([]);
        if (missionID == "" || missionID == null) {
            Swal.fire("Ажиллагааны нэр сонгоно уу.");
            return;
        }
        if (eeljName == "" || eeljName == null) {
            Swal.fire("Ээлж оруулна уу.");
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
            .post("/edit/eelj", {
                id: props.changeDataRow.id,

                missionID: missionID,
                eeljName: eeljName,
                eeljStartDate: eeljStartDate,
                eeljFinishDate: eeljFinishDate,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setMissionID("");
                setEeljName("");
                setEeljStartDate("");
                setEeljFinishDate("");
                setShowModal("");

                props.refreshEelj();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeMission = (e) => {
        setMissionID(e.target.value);
    };
    const changeEeljName = (e) => {
        setEeljName(e.target.value);
    };
    const changeEeljStartDate = (e) => {
        setEeljStartDate(e.target.value);
    };
    const changeEeljFinishDate = (e) => {
        setEeljFinishDate(e.target.value);
    };

    return (
        <>
            <div className="modal" id="eeljEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ЭЭЛЖ ЗАСАХ</h4>

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
                                    <select
                                        className="form-control"
                                        onChange={changeMission}
                                        value={missionID}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getMissions.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.missionName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ээлж:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeEeljName}
                                        value={eeljName}
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
                                            value={eeljStartDate}
                                            className="form-control"
                                            placeholder="Эхлэх хугацаа..."
                                            type="datetime-local"
                                            onChange={changeEeljStartDate}
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
                                            value={eeljFinishDate}
                                            className="form-control"
                                            placeholder="Дуусах хугацаа..."
                                            type="datetime-local"
                                            onChange={changeEeljFinishDate}
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
                                onClick={saveEelj}
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

export default EeljEdit;
