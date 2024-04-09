import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";
import { AppContext } from "../../../../Context/MyContext";

const MissionComNew = (props) => {
    const state = useContext(AppContext);
    const [getPositions, setPositions] = useState([]);

    useEffect(() => {
        axios
            .post("/get/position", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                setPositions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [state.getMissionRowID, state.getEeljRowID]);

    const letter = /(?!.*[DFIOQU])[А-Я]/i;
    const digit = /[0-9]/;
    const mask = [
        letter,
        letter,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
    ];

    const formSchema = Yup.object().shape({
        userRD: Yup.string().required("Регистрийн дугаар оруулна уу."),
        startDate: Yup.string().required("Явсан хугацаа оруулна уу."),
        finishDate: Yup.string().required("Ирсэн хугацаа оруулна уу."),
        missionPosition: Yup.string().required("Албан тушаал оруулна уу."),
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
            .post("/new/mission/history", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                userRD: data.userRD,
                startDate: data.startDate,
                finishDate: data.finishDate,
                missionPosition: data.missionPosition,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        userRD: "",
                        startDate: "",
                        finishDate: "",
                        missionPosition: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshMissionHistory(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getComandlalID,
                    props.getUnitID,
                    props.getGender
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="missionHistoryNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                АЖИЛЛАГААНЫ ТҮҮХ НЭМЭХ
                            </h4>
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
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Регистрийн дугаар:
                                                </span>
                                            </div>
                                            <InputMask
                                                style={{
                                                    textTransform: "uppercase",
                                                }}
                                                mask={mask}
                                                {...register("userRD")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.userRD?.message}
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
                                                {...register("missionPosition")}
                                            >
                                                <option value="0">
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
                                        <p className="alerts">
                                            {errors.missionPosition?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Явсан огноо:
                                                </span>
                                            </div>
                                            <input
                                                type="datetime-local"
                                                {...register("startDate")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.startDate?.message}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Ирсэн огноо:
                                                </span>
                                            </div>
                                            <input
                                                type="datetime-local"
                                                {...register("finishDate")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.finishDate?.message}
                                        </p>
                                    </div>
                                </div>
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

export default MissionComNew;
