import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const CanceledTypeEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [canceledTypeName, setCanceledTypeName] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);
    useEffect(() => {
        if (props.isEditBtnClick) {
            setCanceledTypeName(props.changeDataRow.canceledTypeName);
        }
    }, [props.isEditBtnClick]);

    const saveCanceledType = () => {
        props.setRowsSelected([]);
        if (canceledTypeName == "" || canceledTypeName == null) {
            Swal.fire("Татгалзах шалтгаан оруулна уу.");
            return;
        }

        axios
            .post("/edit/canceled/type", {
                id: props.changeDataRow.id,

                canceledTypeName: canceledTypeName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setCanceledTypeName("");
                setShowModal("");

                props.refreshCanceledType();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeCanceledType = (e) => {
        setCanceledTypeName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="canceledTypeEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ТАТГАЛЗАХ ШАЛТГААН ЗАСАХ</h4>

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
                                            Татгалзах шалтгаан:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeCanceledType}
                                        value={canceledTypeName}
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
                                onClick={saveCanceledType}
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

export default CanceledTypeEdit;
