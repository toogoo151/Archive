import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const AirplaneEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [getDepartured, setDepartured] = useState([]);
    const [getArrived, setArrived] = useState([]);

    const [airplaneDeparturedID, setAirplaneDeparturedID] = useState("");
    const [airplaneArrivedID, setAirplaneArrivedID] = useState("");
    const [missionStartDate, setMissionStartDate] = useState("");
    const [missionFinishDate, setMissionFinishDate] = useState("");

    useEffect(() => {
        fn_getDepartured();
    }, []);

    const fn_getDepartured = () => {
        axios
            .get("/get/airplane/shift/items")
            .then((res) => {
                setDepartured(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/get/airplane/arrives")
            .then((res) => {
                setArrived(res.data);
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
            setAirplaneDeparturedID(props.changeDataRow.airplaneDeparturedID);
            setAirplaneArrivedID(props.changeDataRow.airplaneArrivedID);
            setMissionStartDate(props.changeDataRow.missionStartDate);
            setMissionFinishDate(props.changeDataRow.missionFinishDate);
        }
    }, [props.isEditBtnClick]);

    const saveOronToo = () => {
        if (airplaneDeparturedID == "" || airplaneDeparturedID == null) {
            Swal.fire("Нислэгийн ээлж сонгоно уу.");
            return;
        }

        axios
            .post("/edit/airplane/eelj", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                airplaneDeparturedID: airplaneDeparturedID,
                airplaneArrivedID: airplaneArrivedID,
                missionStartDate: missionStartDate,
                missionFinishDate: missionFinishDate,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshEeljHiigdsen(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getEeljHiigdsenState,
                    props.getRotID,
                    props.getSalaaID,
                    props.getTasagID
                );
                setAirplaneDeparturedID("");
                setAirplaneArrivedID("");
                setMissionStartDate("");
                setMissionFinishDate("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeDepartured = (e) => {
        setAirplaneDeparturedID(e.target.value);
    };
    const changeArrived = (e) => {
        setAirplaneArrivedID(e.target.value);
    };
    const changeStart = (e) => {
        setMissionStartDate(e.target.value);
    };
    const changeFinish = (e) => {
        setMissionFinishDate(e.target.value);
    };

    return (
        <>
            <div className="modal" id="airplaneEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                НИСЛЭГИЙН ЭЭЛЖ ЗАСАХ
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
                                                Явах ээлж:
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            value={airplaneDeparturedID}
                                            onChange={changeDepartured}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getDepartured.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.airplaneShiftItemName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ирэх ээлж:
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            value={airplaneArrivedID}
                                            onChange={changeArrived}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getArrived.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.arrivedName}
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
                                                Явах хугацаа:
                                            </span>
                                        </div>
                                        <input
                                            value={missionStartDate}
                                            className="form-control"
                                            type="datetime-local"
                                            onChange={changeStart}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ирэх хугацаа:
                                            </span>
                                        </div>
                                        <input
                                            value={missionFinishDate}
                                            className="form-control"
                                            type="datetime-local"
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
                                onClick={saveOronToo}
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

export default AirplaneEdit;
