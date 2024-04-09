import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const UuregApplauseSubEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [applauseID, setApplauseID] = useState("");
    const [applauseHelber, setApplauseHelber] = useState("");

    const [getUuregApplauses, setUuregApplauses] = useState([]);
    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        axios
            .get("/get/uureg/applauses")
            .then((res) => {
                setUuregApplauses(res.data);
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
            setApplauseID(props.changeDataRow.applauseID);
            setApplauseHelber(props.changeDataRow.applauseHelber);
        }
    }, [props.isEditBtnClick]);

    const saveUuregApplauseSub = () => {
        props.setRowsSelected([]);
        if (applauseID == "" || applauseID == null) {
            Swal.fire("Төрөл сонгоно уу.");
            return;
        }
        if (applauseHelber == "" || applauseHelber == null) {
            Swal.fire("Хэлбэр оруулна уу.");
            return;
        }

        axios
            .post("/edit/uureg/applause/sub", {
                id: props.changeDataRow.id,

                applauseID: applauseID,
                applauseHelber: applauseHelber,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setApplauseID("");
                setApplauseHelber("");
                setShowModal("");

                props.refreshUuregApplauseSub();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeApplauseID = (e) => {
        setApplauseID(e.target.value);
    };
    const changeApplauseHelber = (e) => {
        setApplauseHelber(e.target.value);
    };

    return (
        <>
            <div className="modal" id="uuregApplauseSubEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ХЭЛБЭР ЗАСАХ</h4>

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
                                        onChange={changeApplauseID}
                                        value={applauseID}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getUuregApplauses.map((el) => (
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
                                    <input
                                        className="form-control"
                                        onChange={changeApplauseHelber}
                                        value={applauseHelber}
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
                                onClick={saveUuregApplauseSub}
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

export default UuregApplauseSubEdit;
