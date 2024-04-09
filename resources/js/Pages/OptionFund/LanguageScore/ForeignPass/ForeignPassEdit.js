import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
const ForeignPassEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [foreignFinishDate, setForeignFinishDate] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setForeignFinishDate(props.changeDataRow.foreignFinishDate);
        }
    }, [props.isEditBtnClick]);

    const saveForeignPass = () => {
        props.setRowsSelected([]);

        if (foreignFinishDate == "" || foreignFinishDate == null) {
            Swal.fire("Гадаад паспортын шаардлагатай хугацааг оруулна уу.");
            return;
        }

        axios
            .post("/edit/foreign/pass", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                foreignFinishDate: foreignFinishDate,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setForeignFinishDate("");
                setShowModal("");

                props.refreshForeignPass(
                    state.getMissionRowID,
                    state.getEeljRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeForeignDate = (e) => {
        setForeignFinishDate(e.target.value);
    };

    return (
        <>
            <div className="modal" id="foreignPassEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ГАДААД ПАСПОРТЫН ШААРДЛАГАТАЙ ХУГАЦАА ЗАСАХ
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
                                            Гадаад паспортын шаардлагатай
                                            хугацаа:
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        className="form-control"
                                        onChange={changeForeignDate}
                                        value={foreignFinishDate}
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
                                onClick={saveForeignPass}
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

export default ForeignPassEdit;
