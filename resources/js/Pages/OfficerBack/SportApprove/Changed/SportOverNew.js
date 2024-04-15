import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const SportOverNew = (props) => {
    const state = useContext(AppContext);

    const formSchema = Yup.object().shape({
        sportType1: Yup.string().required("Авсан оноо оруулна уу."),
        sportType2: Yup.string().required("Авсан оноо оруулна уу."),
        sportType3: Yup.string().required("Авсан оноо оруулна уу."),
        sportType4: Yup.string().required("Авсан оноо оруулна уу."),
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
            .post("/new/sport/officer/changed", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                genderID: props.genderID,
                sportType1: data.sportType1,
                sportType2: data.sportType2,
                sportType3: data.sportType3,
                sportType4: data.sportType4,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        sportType1: "",
                        sportType2: "",
                        sportType3: "",
                        sportType4: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshSportChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <div>
            <>
                <div className="modal" id="sportChildNew">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    БИЕИЙН ТАМИРЫН ШАЛГАЛТЫН ОНОО ОРУУЛАХ
                                    <br />
                                    ЦАХ-ийн нэр: {props.firstName}
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
                                {props.genderID == 11 ? (
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            Суга савлуурт
                                                            суниах:
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(
                                                            "sportType1"
                                                        )}
                                                        className="form-control"
                                                        placeholder="Авсан оноо..."
                                                    />
                                                </div>
                                                <p className="alerts">
                                                    {errors.sportType1?.message}
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            Дүүжинд суниах:
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(
                                                            "sportType2"
                                                        )}
                                                        className="form-control"
                                                        placeholder="Авсан оноо..."
                                                    />
                                                </div>
                                                <p className="alerts">
                                                    {errors.sportType2?.message}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            100 метрийн гүйлт:
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(
                                                            "sportType3"
                                                        )}
                                                        className="form-control"
                                                        placeholder="Авсан оноо..."
                                                    />
                                                </div>
                                                <p className="alerts">
                                                    {errors.sportType3?.message}
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            1000 метрийн гүйлт:
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(
                                                            "sportType4"
                                                        )}
                                                        className="form-control"
                                                        placeholder="Авсан оноо..."
                                                    />
                                                </div>
                                                <p className="alerts">
                                                    {errors.sportType4?.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            Гэдэсний таталт:
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(
                                                            "sportType1"
                                                        )}
                                                        className="form-control"
                                                        placeholder="Авсан оноо..."
                                                    />
                                                </div>
                                                <p className="alerts">
                                                    {errors.sportType1?.message}
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            Гар дээр суниах:
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(
                                                            "sportType2"
                                                        )}
                                                        className="form-control"
                                                        placeholder="Авсан оноо..."
                                                    />
                                                </div>
                                                <p className="alerts">
                                                    {errors.sportType2?.message}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            100 метрийн гүйлт:
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(
                                                            "sportType3"
                                                        )}
                                                        className="form-control"
                                                        placeholder="Авсан оноо..."
                                                    />
                                                </div>
                                                <p className="alerts">
                                                    {errors.sportType3?.message}
                                                </p>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            1000 метрийн гүйлт:
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        {...register(
                                                            "sportType4"
                                                        )}
                                                        className="form-control"
                                                        placeholder="Авсан оноо..."
                                                    />
                                                </div>
                                                <p className="alerts">
                                                    {errors.sportType4?.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

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
        </div>
    );
};

export default SportOverNew;
