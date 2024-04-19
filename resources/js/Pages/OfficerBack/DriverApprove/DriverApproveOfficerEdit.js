import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";
import "./style.css";

const DriverApproveOfficerEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [score, setScore] = useState("");
    const [scoreApprove, setScoreApprove] = useState("");
    const [practice, setPractice] = useState("");


    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setScore(props.changeDataRow.score);
            setScoreApprove(props.changeDataRow.scoreApprove);
            setPractice(props.changeDataRow.practice);


        }
    }, [props.isEditBtnClick]);

    const savelanguage = () => {
        props.setRowsSelected([]);
        if (score == "" || score == null) {
            Swal.fire("Тест оноо оруулна уу.");
            return;
        }
           if (scoreApprove == "" || scoreApprove == null) {
            Swal.fire("Тест төлөв оруулна уу.");
            return;
           }
            if (practice == "" || practice == null) {
            Swal.fire("Дадлага оруулна уу.");
            return;
            }



        axios
            .post("/edit/officer/driver", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                score: score,
                scoreApprove: scoreApprove,
                practice: practice,


            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setScore("");
                setScoreApprove("");
                setShowModal("");
                setPractice("");


                props.refreshDriver(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeSignal = (e) => {
        setScore(e.target.value);
    };
    const changeLocationScore = (e) => {
        setScoreApprove(e.target.value);
    };
      const changeListenScore = (e) => {
        setPractice(e.target.value);
      };



    return (
        <>
            <div className="modal" id="driverApproveOfficerEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Жолооны шалгалт</h4>

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
                                <div className="col-md-9">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                    Тест оноо:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeSignal}
                                            value={score}
                                        />
                                    </div>
                                </div>
        <div className="col-md-6">
            <div className="input-group mb-4">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        Тест тэнцсэн эсэх:
                    </span>
                                        </div>
                                        {/* <div className="col-md-0.6"></div> */}
                <div className="col-md-1">
                    <label htmlFor="status1" className={`fas fa-check ${scoreApprove === "1" ? "green" : ""}`}></label>
                    <br />
                    <input type="radio" id="status1" name="status" value="1" onChange={changeLocationScore} />
                </div>
                <div className="col-md-1">
                    <label htmlFor="status2" className={`fas fa-close ${scoreApprove === "2" ? "red" : ""}`}></label>
                    <br />
                    <input type="radio" id="status2" name="status" value="2" onChange={changeLocationScore} />
                </div>
            </div>
        </div>
            {/* <div className="col-md-3">
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                Тест төлөв:
                            </span>
                                        </div>
                                         <div className="col-md-2">
                                        <label htmlFor="status1" class="fas fa-check" ></label>
                                        <br/>
                                            <input type="radio" id="status1" name="status" value="1" onChange={changeLocationScore} />

                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="status2" class="fas fa-close"></label>
                                                <br/>
                                            <input type="radio" id="status2" name="status" value="2" onChange={changeLocationScore} />
                                    </div>

                 </div>
        </div> */}

                                  <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                              Дадлага тэнцсэн эсэх:
                                            </span>
                                        </div>
                                        <div className="col-md-1">
                    <label htmlFor="status3" className={`fas fa-check ${practice === "1" ? "green" : ""}`}></label>
                    <br />
                    <input type="radio" id="status3" name="status2" value="1" onChange={changeListenScore} />
                </div>
                <div className="col-md-1">
                    <label htmlFor="status4" className={`fas fa-close ${practice === "2" ? "red" : ""}`}></label>
                    <br />
                    <input type="radio" id="status4" name="status2" value="2" onChange={changeListenScore} />
                </div>
                                  {/* <div className="col-md-2">
                                        <label htmlFor="status3" class="fas fa-check" ></label>
                                        <br/>
                                            <input type="radio" id="status3" name="status2" value="1" onChange={changeListenScore} />

                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="status4" class="fas fa-close"></label>
                                                <br/>
                                            <input type="radio" id="status4" name="status2" value="2" onChange={changeListenScore} />
                                    </div> */}

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
                                onClick={savelanguage}
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

export default DriverApproveOfficerEdit;
