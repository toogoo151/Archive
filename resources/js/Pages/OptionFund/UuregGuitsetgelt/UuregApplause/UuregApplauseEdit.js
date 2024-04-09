import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const UuregApplauseEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [isApplauseName, setIsApplauseName] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);
    useEffect(() => {
        if (props.isEditBtnClick) {
            setIsApplauseName(props.changeDataRow.isApplauseName);
        }
    }, [props.isEditBtnClick]);

    const saveUuregApplause = () => {
        props.setRowsSelected([]);
        if (isApplauseName == "" || isApplauseName == null) {
            Swal.fire("Төрөл оруулна уу.");
            return;
        }

        axios
            .post("/edit/uureg/applause", {
                id: props.changeDataRow.id,

                isApplauseName: isApplauseName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setIsApplauseName("");
                setShowModal("");

                props.refreshUuregApplause();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeUuregApplause = (e) => {
        setIsApplauseName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="uuregApplauseEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ТӨРӨЛ ЗАСАХ</h4>

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
                                    <input
                                        className="form-control"
                                        onChange={changeUuregApplause}
                                        value={isApplauseName}
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
                                onClick={saveUuregApplause}
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

export default UuregApplauseEdit;
