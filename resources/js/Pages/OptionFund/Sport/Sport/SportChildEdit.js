import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const SportChildEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [getGenders, setGenders] = useState([]);
    const [getSportTypes, setSportTypes] = useState([]);

    const [genderID, setGenderID] = useState("");
    const [sportTypeID, setSportTypeID] = useState("");
    const [sportScore, setSportScore] = useState("");

    useEffect(() => {
        axios
            .post("/get/gender/admin")
            .then((res) => {
                setGenders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const fn_getGender = (missionID, eeljID, genderID) => {
        axios
            .post("/get/gender/sport/types", {
                _missionID: missionID,
                _eeljID: eeljID,
                _genderID: genderID,
            })
            .then((res) => {
                setSportTypes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setGenderID(props.changeDataRow.genderID);
            setSportTypeID(props.changeDataRow.sportTypeID);
            setSportScore(props.changeDataRow.sportScore);
        }
        fn_getGender(
            state.getMissionRowID,
            state.getEeljRowID,
            props.changeDataRow.genderID
        );
    }, [props.isEditBtnClick]);

    const saveSport = () => {
        if (genderID == "" || genderID == null) {
            Swal.fire("Хүйс сонгоно уу.");
            return;
        }
        if (sportTypeID == "" || sportTypeID == null) {
            Swal.fire("Нормативын төрөл сонгоно уу.");
            return;
        }
        if (sportScore == "" || sportScore == null) {
            Swal.fire("Авсан оноо оруулна уу.");
            return;
        }

        axios
            .post("/edit/sport/child", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                genderID: genderID,
                sportTypeID: sportTypeID,
                sportScore: sportScore,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshSportChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
                setGenderID("");
                setSportTypeID("");
                setSportScore("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeSportType = (e) => {
        setSportTypeID(e.target.value);
        setSportScore("");
    };

    const changeScore = (e) => {
        setSportScore(e.target.value);
    };

    return (
        <>
            <div className="modal" id="sportChildEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                БИЕИЙН ТАМИРЫН ШАЛГАЛТЫН ОНОО ЗАСАХ
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
                                            Хүйс:
                                        </span>
                                    </div>

                                    <select
                                        className="form-control"
                                        value={genderID}
                                        onChange={(e) => {
                                            setGenderID(e.target.value);
                                            setSportTypeID("");
                                            fn_getGender(
                                                state.getMissionRowID,
                                                state.getEeljRowID,
                                                e.target.value
                                            );
                                        }}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getGenders.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.genderName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Нормативын төрөл:
                                        </span>
                                    </div>

                                    <select
                                        className="form-control"
                                        value={sportTypeID}
                                        onChange={changeSportType}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getSportTypes.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.sportTypeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Авсан оноо:
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={sportScore}
                                        onChange={changeScore}
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
                                onClick={saveSport}
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

export default SportChildEdit;
