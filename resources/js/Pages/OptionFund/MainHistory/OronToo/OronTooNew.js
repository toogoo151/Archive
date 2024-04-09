import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const OronTooNew = (props) => {
    const state = useContext(AppContext);
    const [getRots, setRots] = useState([]);
    const [getSalaas, setSalaas] = useState([]);
    const [getTasags, setTasags] = useState([]);
    const [getPositions, setPositions] = useState([]);
    const [getRotID, setRotID] = useState("");
    const [getSalaaID, setSalaaID] = useState("");
    const [getTasagID, setTasagID] = useState("");
    const [getIsNoots, setIsNoots] = useState(false);

    useEffect(() => {
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
    }, []);

    const changeRot = (e) => {
        setRotID(e.target.value);
        setSalaaID("");
        setTasagID("");
        axios
            .post("/get/salaa/by/rotID", {
                _rotID: e.target.value,
            })
            .then((res) => {
                setSalaas(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        fb_getPostionName(
            state.getMissionRowID,
            state.getEeljRowID,
            e.target.value,
            getSalaaID,
            getTasagID
        );
    };

    const changeSalaa = (e) => {
        setSalaaID(e.target.value);
        setTasagID("");
        axios
            .post("/get/tasag/by/salaaID", {
                _salaaID: e.target.value,
            })
            .then((res) => {
                setTasags(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        fb_getPostionName(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            e.target.value,
            getTasagID
        );
    };

    const changeTasag = (e) => {
        setTasagID(e.target.value);
        fb_getPostionName(
            state.getMissionRowID,
            state.getEeljRowID,
            getRotID,
            getSalaaID,
            e.target.value
        );
    };

    const fb_getPostionName = (missionID, eeljID, rotID, salaaID, tasagID) => {
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

    const formSchema = Yup.object().shape({
        // rotID: Yup.string().required("Рот сонгоно уу."),
        // positionID: Yup.string().required("Албан тушаал сонгоно уу."),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (data) => {
        axios
            .post("/new/oron/too/child", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                rotID: data.rotID,
                salaaID: data.salaaID,
                tasagID: data.tasagID,
                positionID: data.positionID,
                getIsNoots: getIsNoots,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        rotID: "",
                        salaaID: "",
                        tasagID: "",
                        positionID: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshTomilogdoogui(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getComandlalID,
                    props.getUnitID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeNoots = (e) => {
        setIsNoots(e.target.checked);
    };

    return (
        <>
            <div className="modal" id="oronTooNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">ОРОН ТОО НЭМЭХ</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    id="customCheckbox2"
                                                    // defaultChecked
                                                    onChange={changeNoots}
                                                    value={getIsNoots}
                                                />
                                                <label
                                                    htmlFor="customCheckbox2"
                                                    className="custom-control-label"
                                                >
                                                    Нөөцөд томилох
                                                </label>
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
                                                        {...register("rotID")}
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
                                                <p className="alerts">
                                                    {errors.rotID?.message}
                                                </p>
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
                                                        {...register("salaaID")}
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
                                                <p className="alerts">
                                                    {errors.salaaID?.message}
                                                </p>
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
                                                        {...register("tasagID")}
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
                                                <p className="alerts">
                                                    {errors.tasagID?.message}
                                                </p>
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
                                                        {...register(
                                                            "positionID"
                                                        )}
                                                    >
                                                        <option value="">
                                                            Сонгоно уу
                                                        </option>
                                                        {getPositions.map(
                                                            (el) => (
                                                                <option
                                                                    key={el.id}
                                                                    value={
                                                                        el.id
                                                                    }
                                                                >
                                                                    {
                                                                        el.positionName
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <p className="alerts">
                                                    {errors.positionID?.message}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    data-dismiss=""
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OronTooNew;
