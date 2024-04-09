import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const OronTooEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [getRots, setRots] = useState([]);
    const [getSalaas, setSalaas] = useState([]);
    const [getTasags, setTasags] = useState([]);
    const [getPositions, setPositions] = useState([]);

    const [rotID, setRotID] = useState("");
    const [salaaID, setSalaaID] = useState("");
    const [tasagID, setTasagID] = useState("");
    const [positionID, setPositionID] = useState("");
    const [getIsNoots, setIsNoots] = useState(false);

    useEffect(() => {
        fn_getRot(state.getMissionRowID, state.getEeljRowID);
        fn_getPosition(
            state.getMissionRowID,
            state.getEeljRowID,
            rotID,
            salaaID,
            tasagID
        );
    }, []);

    const fn_getRot = () => {
        axios
            .post("/get/rot", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                setRots(res.data);
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
            fn_getSalaa(props.changeDataRow.rotID);
            setRotID(props.changeDataRow.rotID);

            fn_getTasag(
                props.changeDataRow.salaaID != null
                    ? props.changeDataRow.salaaID
                    : ""
            );
            setSalaaID(
                props.changeDataRow.salaaID != null
                    ? props.changeDataRow.salaaID
                    : ""
            );
            setTasagID(
                props.changeDataRow.tasagID != null
                    ? props.changeDataRow.tasagID
                    : ""
            );

            setPositionID(props.changeDataRow.positionID);
            setIsNoots(props.changeDataRow.isNoots);
        }
        fn_getRot(state.getMissionRowID, state.getEeljRowID);
        // fn_getPosition(
        //     state.getMissionRowID,
        //     state.getEeljRowID,
        //     rotID,
        //     salaaID,
        //     tasagID
        // );
        fn_getPosition(
            state.getMissionRowID,
            state.getEeljRowID,
            props.changeDataRow.rotID,
            props.changeDataRow.salaaID,
            props.changeDataRow.tasagID
        );
    }, [props.isEditBtnClick]);

    const saveOronToo = () => {
        // if (rotID == "" || rotID == null) {
        //     Swal.fire("Рот сонгоно уу.");
        //     return;
        // }
        // if (positionID == "" || positionID == null) {
        //     Swal.fire("Албан тушаал сонгоно уу.");
        //     return;
        // }

        axios
            .post("/edit/oron/too/child", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                rotID: rotID,
                salaaID: salaaID,
                tasagID: tasagID,
                positionID: positionID,
                getIsNoots: getIsNoots,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshTomilogdson(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getRotID,
                    props.getSalaaID,
                    props.getTasagID
                );
                setRotID("");
                setSalaaID("");
                setTasagID("");
                setPositionID("");
                setIsNoots("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeRot = (e) => {
        setRotID(e.target.value);
        fn_getSalaa(e.target.value);
        setSalaaID("");
        setTasagID("");
        setPositionID("");
        fn_getPosition(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value,
            "",
            ""
        );
    };

    const fn_getSalaa = (rotID) => {
        axios
            .post("/get/salaa/by/rotID", {
                _rotID: rotID,
            })
            .then((res) => {
                setSalaas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeSalaa = (e) => {
        setSalaaID(e.target.value);
        fn_getTasag(e.target.value);
        setTasagID("");
        setPositionID("");
        fn_getPosition(
            state.getMissionRowID,
            state.getEeljRowID,
            rotID,
            e.target.value,
            ""
        );
    };

    const fn_getTasag = (salaaID) => {
        axios
            .post("/get/tasag/by/salaaID", {
                _salaaID: salaaID,
            })
            .then((res) => {
                setTasags(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeTasag = (e) => {
        setTasagID(e.target.value);
        setPositionID("");
        fn_getPosition(
            state.getMissionRowID,
            state.getEeljRowID,
            rotID,
            salaaID,
            e.target.value
        );
    };

    const fn_getPosition = (missionID, eeljID, rotID, salaaID, tasagID) => {
        axios
            .post("/get/position/by/tasagID", {
                _missionID: missionID,
                _eeljID: eeljID,
                _rotID: rotID,
                _salaaID: salaaID,
                _tasagID: tasagID,
            })
            .then((res) => {
                setPositions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changePosition = (e) => {
        setPositionID(e.target.value);
    };

    const changeNoots = (e) => {
        setIsNoots(e.target.checked);
        console.log(e.target.checked);
    };

    return (
        <>
            <div className="modal" id="oronTooEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ОРОН ТОО ЗАСАХ</h4>
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
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            {getIsNoots == true ? (
                                                <>
                                                    <input
                                                        className="custom-control-input"
                                                        type="checkbox"
                                                        id="customCheckbox2"
                                                        defaultChecked
                                                        value={getIsNoots}
                                                        onChange={changeNoots}
                                                    />
                                                    <label
                                                        htmlFor="customCheckbox2"
                                                        className="custom-control-label"
                                                    >
                                                        Нөөцөд томилох
                                                    </label>
                                                </>
                                            ) : (
                                                <>
                                                    <input
                                                        className="custom-control-input"
                                                        type="checkbox"
                                                        id="customCheckbox2"
                                                        // defaultChecked
                                                        value={getIsNoots}
                                                        onChange={changeNoots}
                                                    />
                                                    <label
                                                        htmlFor="customCheckbox2"
                                                        className="custom-control-label"
                                                    >
                                                        Нөөцөд томилох
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {getIsNoots == false && (
                                <>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        Рот:
                                                    </span>
                                                </div>

                                                <select
                                                    className="form-control"
                                                    value={rotID}
                                                    onChange={changeRot}
                                                >
                                                    <option value="">
                                                        Сонгоно уу
                                                    </option>
                                                    {getRots.map((el) => (
                                                        <option
                                                            key={el.id}
                                                            value={el.id}
                                                        >
                                                            {el.rotName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        Салаа:
                                                    </span>
                                                </div>

                                                <select
                                                    className="form-control"
                                                    value={salaaID}
                                                    onChange={changeSalaa}
                                                >
                                                    <option value="">
                                                        Сонгоно уу
                                                    </option>
                                                    {getSalaas.map((el) => (
                                                        <option
                                                            key={el.id}
                                                            value={el.id}
                                                        >
                                                            {el.salaaName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        Тасаг:
                                                    </span>
                                                </div>

                                                <select
                                                    className="form-control"
                                                    value={tasagID}
                                                    onChange={changeTasag}
                                                >
                                                    <option value="">
                                                        Сонгоно уу
                                                    </option>
                                                    {getTasags.map((el) => (
                                                        <option
                                                            key={el.id}
                                                            value={el.id}
                                                        >
                                                            {el.tasagName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        Албан тушаал:
                                                    </span>
                                                </div>

                                                <select
                                                    className="form-control"
                                                    value={positionID}
                                                    onChange={changePosition}
                                                >
                                                    <option value="">
                                                        Сонгоно уу
                                                    </option>
                                                    {getPositions.map((el) => (
                                                        <option
                                                            key={el.id}
                                                            value={el.id}
                                                        >
                                                            {el.positionName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveOronToo}
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

export default OronTooEdit;
