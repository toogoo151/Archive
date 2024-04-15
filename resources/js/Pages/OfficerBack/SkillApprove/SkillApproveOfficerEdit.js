import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";
const SkillApproveOfficerEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [SignalScore, setSignalScore] = useState("");
    const [LocationScore, setLocationScore] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setSignalScore(props.changeDataRow.SignalScore);
            setLocationScore(props.changeDataRow.LocationScore);
        }
    }, [props.isEditBtnClick]);

    const saveRot = () => {
        props.setRowsSelected([]);
        if (SignalScore == "" || SignalScore == null) {
            Swal.fire("Холбоо оруулна уу.");
            return;
        }
           if (LocationScore == "" || LocationScore == null) {
            Swal.fire("Байр зүй оруулна уу.");
            return;
        }

        axios
            .post("/edit/officer/skill", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                SignalScore: SignalScore,
                LocationScore: LocationScore,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setSignalScore("");
                setLocationScore("");
                setShowModal("");

                props.refreshSkill(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeSignal = (e) => {
        setSignalScore(e.target.value);
    };
    const changeLocationScore = (e) => {
        setLocationScore(e.target.value);
    };

    return (
        <>
            <div className="modal" id="skillApproveOfficerEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">УР ЧАДВАР</h4>

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
                                                    Холбоо:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeSignal}
                                            value={SignalScore}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                               Байрзүй:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeLocationScore}
                                            value={LocationScore}
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
                                Нэмэх
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

export default SkillApproveOfficerEdit;
