import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const AirplaneShiftItemEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [airplaneShiftItemName, setAirplaneShiftItemName] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);
    useEffect(() => {
        if (props.isEditBtnClick) {
            setAirplaneShiftItemName(props.changeDataRow.airplaneShiftItemName);
        }
    }, [props.isEditBtnClick]);

    const saveAirplaneShiftItem = () => {
        props.setRowsSelected([]);
        if (airplaneShiftItemName == "" || airplaneShiftItemName == null) {
            Swal.fire("Нислэгийн ээлж оруулна уу.");
            return;
        }

        axios
            .post("/edit/airplane/shift/item", {
                id: props.changeDataRow.id,

                airplaneShiftItemName: airplaneShiftItemName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setAirplaneShiftItemName("");
                setShowModal("");

                props.refreshAirplaneShiftItem();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeAirplaneShiftItem = (e) => {
        setAirplaneShiftItemName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="airplaneShiftItemEdit">
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
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Нислэгийн ээлж:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeAirplaneShiftItem}
                                        value={airplaneShiftItemName}
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
                                onClick={saveAirplaneShiftItem}
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

export default AirplaneShiftItemEdit;
