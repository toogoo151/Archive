import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";
const EditChild = (props) => {
    const state = useContext(AppContext);

    const [showModal, setShowModal] = useState("");

    const [getAppointedDate, setAppointedDate] = useState("");
    const [getMovement, setMovement] = useState("");
    const [getRolePlayed, setRolePlayed] = useState("");
    // const [getMissionType, setMissionType] = useState("");
    const [getMissionName, setMissionName] = useState("");
    const [getMissionCameDate, setMissionCameDate] = useState("");
    const [getStudying, setStudying] = useState("");
    const [getPunishment, setPunishment] = useState("");
    const [getPunishmentDate, setPunishmentDate] = useState("");
    const [getDes, setDes] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setAppointedDate(props.changeDataRow.appointedDate);
            setMovement(props.changeDataRow.movement);
            setRolePlayed(props.changeDataRow.rolePlayed);

            // setMissionType(
            //     props.changeDataRow.missionType != null
            //         ? props.changeDataRow.missionType
            //         : ""
            // );
            setMissionName(
                props.changeDataRow.missionName != null
                    ? props.changeDataRow.missionName
                    : ""
            );
            setMissionCameDate(
                props.changeDataRow.missionCameDate != null
                    ? props.changeDataRow.missionCameDate
                    : ""
            );
            setStudying(props.changeDataRow.studying);
            setPunishment(props.changeDataRow.punishment);
            setPunishmentDate(
                props.changeDataRow.punishmentDate != null
                    ? props.changeDataRow.punishmentDate
                    : ""
            );
            setDes(
                props.changeDataRow.questionDes != null
                    ? props.changeDataRow.questionDes
                    : ""
            );
        }
    }, [props.isEditBtnClick]);

    const saveQuestion = () => {
        axios
            .post("/edit/question/admin", {
                id: props.changeDataRow.id,
                pkoUserID: props.changeDataRow.pkoUserID,
                appointedDate: getAppointedDate,
                movement: getMovement,
                rolePlayed: getRolePlayed,
                // missionType: getMissionType,
                missionName: getMissionName,
                missionCameDate: getMissionCameDate,
                studying: getStudying,
                punishment: getPunishment,
                punishmentDate: getPunishmentDate,
                questionDes: getDes,
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                setAppointedDate("");
                setRolePlayed("");
                // setMissionType("");
                setMissionName("");
                setMissionCameDate("");
                setStudying("");
                setPunishment("");
                setPunishmentDate("");
                setDes("");
                setShowModal("");

                props.refreshQuestionEdit(
                    props.serverSidePage,
                    props.serverSideRowsPerPage,
                    "",
                    props.getComandlalID,
                    props.getUnitID,
                    props.getQuestionState
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeAppointed = (e) => {
        setAppointedDate(e.target.value);
    };
    const changeRole = (e) => {
        setRolePlayed(e.target.value);
        // setMissionType("");
        setMissionName("");
        setMissionCameDate("");
    };
    // const changeMissionType = (e) => {
    //     setMissionType(e.target.value);
    //     setMissionCameDate("");
    // };
    const changeMissionName = (e) => {
        setMissionName(e.target.value);
        setMissionCameDate("");
    };
    const changeCame = (e) => {
        setMissionCameDate(e.target.value);
    };
    const changeStudy = (e) => {
        setStudying(e.target.value);
    };
    const changePunishment = (e) => {
        setPunishment(e.target.value);
        setPunishmentDate("");
    };
    const changePunishmentDate = (e) => {
        setPunishmentDate(e.target.value);
    };
    const changeDes = (e) => {
        setDes(e.target.value);
    };

    return (
        <>
            <div className="modal" id="questionEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">АСУУМЖ ЗАСАХ</h4>

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
                                            Томилогдсон огноо:
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        className="form-control"
                                        onChange={changeAppointed}
                                        value={getAppointedDate}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Одоогийн албан тушаалд томилогдсон
                                            байдал:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={(e) => {
                                            setMovement(e.target.value);
                                        }}
                                        value={getMovement}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        <option value="1">
                                            Анги дотороо томилогдсон
                                        </option>
                                        <option value="0">
                                            Анги хооронд шилжин томилогдсон
                                        </option>
                                        <option value="1">Бусад</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ажиллагаанд явсан эсэх:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeRole}
                                        value={getRolePlayed}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        <option value="0">Тийм</option>
                                        <option value="1">Үгүй</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                {/* <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Сүүлд үүрэг гүйцэтгэсэн хугацаа:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeMissionType}
                                        value={getMissionType}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        <option value="0">06 сар</option>
                                        <option value="1">12 сар</option>
                                    </select>
                                </div> */}
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Сүүлд үүрэг гүйцэтгэсэн ажиллагаа :
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeMissionName}
                                        value={getMissionName}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        <option value="0">
                                            Бүгд найрамдах өмнөд Судан улс -
                                            UNMISS
                                        </option>
                                        <option value="1">
                                            Бүгд найрамдах ардчилсан Конго улс -
                                            MONUSCO
                                        </option>
                                        <option value="2">
                                            Бүгд найрамдах Судан улс - UNISFA
                                        </option>
                                        <option value="3">
                                            Баруун сахар улс - MINURSO
                                        </option>
                                        <option value="4">
                                            Йемен улс - UNMHA
                                        </option>
                                        <option value="5">
                                            Мали улс - MINUSMA
                                        </option>
                                        <option value="6">
                                            Төв Африкийн бүгд найрамдах улс -
                                            MINUSA
                                        </option>
                                        <option value="7">
                                            Ливан улс - UNIFIL
                                        </option>
                                        <option value="8">Бусад</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ажиллагаанаас ирсэн огноо:
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        className="form-control"
                                        onChange={changeCame}
                                        value={getMissionCameDate}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Суралцаж байгаа эсэх:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeStudy}
                                        value={getStudying}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        <option value="0">Тийм</option>
                                        <option value="1">Үгүй</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Шийтгэгдсэн эсэх:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changePunishment}
                                        value={getPunishment}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        <option value="0">Тийм</option>
                                        <option value="1">Үгүй</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Шийтгэгдсэн тушаалын огноо:
                                        </span>
                                    </div>
                                    <input
                                        type="date"
                                        className="form-control"
                                        onChange={changePunishmentDate}
                                        value={getPunishmentDate}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Тайлбар:
                                        </span>
                                    </div>
                                    <textarea
                                        className="form-control"
                                        onChange={changeDes}
                                        value={getDes}
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
                                onClick={saveQuestion}
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

export default EditChild;
