import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";
const LanguageApproveOfficerEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [readCol, setReadcol] = useState("");
    const [writeCol, setWriteCol] = useState("");
    const [listenCol, setListencol] = useState("");
    const [speakCol, setSpeakCol] = useState("");
    const [alcpt, setAlcpt] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setReadcol(props.changeDataRow.readCol);
            setWriteCol(props.changeDataRow.writeCol);
            setListencol(props.changeDataRow.listenCol);
            setSpeakCol(props.changeDataRow.speakCol);
            setAlcpt(props.changeDataRow.alcpt);

        }
    }, [props.isEditBtnClick]);

    const savelanguage = () => {
        props.setRowsSelected([]);
        if (readCol == "" || readCol == null) {
            Swal.fire("Уншсан оноо оруулна уу.");
            return;
        }
           if (writeCol == "" || writeCol == null) {
            Swal.fire("Бичсэн оноо оруулна уу.");
            return;
           }
            if (listenCol == "" || listenCol == null) {
            Swal.fire("Сонсгол оноо оруулна уу.");
            return;
            }
            if (speakCol == "" || speakCol == null) {
            Swal.fire("Ярьсан оноо оруулна уу.");
            return;
            }


        axios
            .post("/edit/officer/language", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                readCol: readCol,
                writeCol: writeCol,
                listenCol: listenCol,
                speakCol: speakCol,
                alcpt: alcpt,

            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setReadcol("");
                setWriteCol("");
                setShowModal("");
                setListencol("");
                setSpeakCol("");
                setAlcpt("");

                props.refreshLanguage(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeSignal = (e) => {
        setReadcol(e.target.value);
    };
    const changeLocationScore = (e) => {
        setWriteCol(e.target.value);
    };
      const changeListenScore = (e) => {
        setListencol(e.target.value);
      };
      const changeSpeakScore = (e) => {
        setSpeakCol(e.target.value);
      };
      const changeALCPT = (e) => {
        setAlcpt(e.target.value);
    };


    return (
        <>
            <div className="modal" id="languageApproveOfficerEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Англи хэл</h4>

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
                                                    Уншсан оноо:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeSignal}
                                            value={readCol}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                               Бичсэн оноо:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeLocationScore}
                                            value={writeCol}
                                        />
                                    </div>
                                </div>

                                  <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                               Сонсгол оноо:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeListenScore}
                                            value={listenCol}
                                        />
                                    </div>
                                </div>
                                  <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                               Яриа оноо:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeSpeakScore}
                                            value={speakCol}
                                        />
                                    </div>
                                </div>
                                  <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                               ALCPT оноо:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeALCPT}
                                            value={alcpt}
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

export default LanguageApproveOfficerEdit;
