import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
const RotEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [rotName, setRotName] = useState("");
    const [rotShortName, setRotShortName] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setRotName(props.changeDataRow.rotName);
            setRotShortName(props.changeDataRow.rotShortName);
        }
    }, [props.isEditBtnClick]);

    const saveRot = () => {
        props.setRowsSelected([]);
        if (rotName == "" || rotName == null) {
            Swal.fire("Ротын нэр оруулна уу.");
            return;
        }

        axios
            .post("/edit/rot", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                rotName: rotName,
                rotShortName: rotShortName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setRotName("");
                setRotShortName("");
                setShowModal("");

                props.refreshRot(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeRot = (e) => {
        setRotName(e.target.value);
    };
    const changeRotShortName = (e) => {
        setRotShortName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="rotEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">РОТЫН НЭР ЗАСАХ</h4>

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
                                                Ротын нэр:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeRot}
                                            value={rotName}
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
                                            onChange={changeRotShortName}
                                            value={rotShortName}
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
                                onClick={saveRot}
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

export default RotEdit;
