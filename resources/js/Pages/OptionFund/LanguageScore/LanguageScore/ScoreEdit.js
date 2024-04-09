import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const ScoreEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [getLanguageTypes, setLanguageTypes] = useState([]);

    const [languageTypeID, setLanguageTypeID] = useState("");
    const [languageScore, setLanguageScore] = useState("");

    useEffect(() => {
        axios
            .get("/get/language/types")
            .then((res) => {
                setLanguageTypes(res.data);
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
            setLanguageTypeID(props.changeDataRow.languageTypeID);
            setLanguageScore(props.changeDataRow.languageScore);
        }
    }, [props.isEditBtnClick]);

    const saveScored = () => {
        if (languageTypeID == "" || languageTypeID == null) {
            Swal.fire("Шалгалтын төрөл сонгоно уу.");
            return;
        }
        if (languageScore == "" || languageScore == null) {
            Swal.fire("Авсан оноо оруулна уу.");
            return;
        }

        axios
            .post("/edit/language/score", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                languageTypeID: languageTypeID,
                languageScore: languageScore,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshScored(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getTypeID,
                    props.getComandlalID,
                    props.getUnitID
                );
                setLanguageTypeID("");
                setLanguageScore("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeType = (e) => {
        setLanguageTypeID(e.target.value);
        setLanguageScore("");
    };

    const changeScore = (e) => {
        setLanguageScore(e.target.value);
    };

    return (
        <>
            <div className="modal" id="languageEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">АВСАН ОНОО ЗАСАХ</h4>
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
                                                Шалгалтын төрөл:
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            value={languageTypeID}
                                            onChange={changeType}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getLanguageTypes.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.languageName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Авсан оноо:
                                            </span>
                                        </div>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={languageScore}
                                            onChange={changeScore}
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
                                onClick={saveScored}
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

export default ScoreEdit;
