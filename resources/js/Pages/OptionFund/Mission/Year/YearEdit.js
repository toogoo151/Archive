import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const YearEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [year, setYear] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);
    useEffect(() => {
        if (props.isEditBtnClick) {
            setYear(props.changeDataRow.year);
        }
    }, [props.isEditBtnClick]);

    const saveYear = () => {
        props.setRowsSelected([]);
        if (year == "" || year == null) {
            Swal.fire("Он оруулна уу.");
            return;
        }

        axios
            .post("/edit/year", {
                id: props.changeDataRow.id,

                year: year,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setYear("");
                setShowModal("");

                props.refreshYear();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeYear = (e) => {
        setYear(e.target.value);
    };

    return (
        <>
            <div className="modal" id="yearEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ОН ЗАСАХ</h4>

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
                                            Он:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeYear}
                                        value={year}
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
                                onClick={saveYear}
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

export default YearEdit;
