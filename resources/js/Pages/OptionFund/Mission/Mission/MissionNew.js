import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";

const MissionNew = (props) => {
    const formSchema = Yup.object().shape({
        missionName: Yup.string().required("Ажиллагааны нэр оруулна уу."),
        // missionStartDate: Yup.string().required("Эхлэх хугацаа оруулна уу."),
        // missionFinishDate: Yup.string().required("Дуусах хугацаа оруулна уу."),
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
            .post("/new/mission", {
                missionName: data.missionName,
                missionStartDate: data.missionStartDate,
                missionFinishDate: data.missionFinishDate,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        missionName: "",
                        missionStartDate: "",
                        missionFinishDate: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshMission();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="missionNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">АЖИЛЛАГАА НЭМЭХ</h4>

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
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ажиллагааны нэр:
                                            </span>
                                        </div>
                                        <input
                                            {...register("missionName")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.missionName?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Эхлэх хугацаа:
                                                </span>
                                            </div>
                                            <input
                                                {...register(
                                                    "missionStartDate"
                                                )}
                                                className="form-control"
                                                placeholder="Эхлэх хугацаа..."
                                                type="datetime-local"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.missionStartDate?.message}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Дуусах хугацаа:
                                                </span>
                                            </div>
                                            <input
                                                {...register(
                                                    "missionFinishDate"
                                                )}
                                                className="form-control"
                                                placeholder="Дуусах хугацаа..."
                                                type="datetime-local"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.missionFinishDate?.message}
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

export default MissionNew;
