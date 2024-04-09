import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const MainEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [getApplauses, setApplauses] = useState([]);
    const [getApplauseSubs, setApplauseSubs] = useState([]);

    const [applauseID, setApplauseID] = useState("");
    const [applauseSubID, setApplauseSubID] = useState("");
    const [applauseDescription, setApplauseDescription] = useState("");
    const [applauseDate, setApplauseDate] = useState("");

    useEffect(() => {
        axios
            .get("/get/uureg/applauses")
            .then((res) => {
                setApplauses(res.data);
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
            fn_getApplause(
                props.changeDataRow.applauseID != null
                    ? props.changeDataRow.applauseID
                    : ""
            );
            setApplauseID(
                props.changeDataRow.applauseID != null
                    ? props.changeDataRow.applauseID
                    : ""
            );
            setApplauseSubID(
                props.changeDataRow.applauseSubID != null
                    ? props.changeDataRow.applauseSubID
                    : ""
            );
            setApplauseDescription(
                props.changeDataRow.applauseDescription != null
                    ? props.changeDataRow.applauseDescription
                    : ""
            );

            setApplauseDate(props.changeDataRow.applauseDate);
        }
    }, [props.isEditBtnClick]);

    const changeApplause = (e) => {
        setApplauseID(e.target.value);
        fn_getApplause(e.target.value);
        setApplauseSubID("");
    };

    const fn_getApplause = (applauseID) => {
        axios
            .post("/get/sub/by/applauseID", {
                _applauseID: applauseID,
            })
            .then((res) => {
                setApplauseSubs(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeApplauseSub = (e) => {
        setApplauseSubID(e.target.value);
    };

    const changeDescription = (e) => {
        setApplauseDescription(e.target.value);
    };

    const changeDate = (e) => {
        setApplauseDate(e.target.value);
    };

    const saveMain = () => {
        if (applauseDate == "" || applauseDate == null) {
            Swal.fire("Огноо оруулна уу.");
            return;
        }

        axios
            .post("/edit/uureg/guitsetgelt/new", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                applauseID: applauseID,
                applauseSubID: applauseSubID,
                applauseDescription: applauseDescription,
                applauseDate: applauseDate,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshMain(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getRotID,
                    props.getSalaaID,
                    props.getTasagID,
                    props.getApplauseID,
                    props.getDate
                );
                setApplauseID("");
                setApplauseSubID("");
                setApplauseDescription("");
                setApplauseDate("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="mainEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">МЭДЭЭ ЗАСАХ</h4>
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
                                            Төрөл:
                                        </span>
                                    </div>

                                    <select
                                        className="form-control"
                                        value={applauseID}
                                        onChange={changeApplause}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getApplauses.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.isApplauseName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Хэлбэр:
                                        </span>
                                    </div>

                                    <select
                                        className="form-control"
                                        value={applauseSubID}
                                        onChange={changeApplauseSub}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getApplauseSubs.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.applauseHelber}
                                            </option>
                                        ))}
                                    </select>
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
                                        value={applauseDescription}
                                        onChange={changeDescription}
                                        placeholder="Тайлбар..."
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Огноо:
                                        </span>
                                    </div>

                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={applauseDate}
                                        onChange={changeDate}
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
                                onClick={saveMain}
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

export default MainEdit;
