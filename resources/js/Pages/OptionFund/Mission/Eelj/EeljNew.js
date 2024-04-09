import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";

const EeljNew = (props) => {
    const [getMission, setMission] = useState([]);

    useEffect(() => {
        axios
            .get("/get/missions")
            .then((res) => {
                setMission(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        missionID: Yup.string().required("Ажиллагааны нэр сонгоно уу."),
        eeljName: Yup.string().required("Ээлж оруулна уу."),
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
            .post("/new/eelj", {
                missionID: data.missionID,
                eeljName: data.eeljName,
                eeljStartDate: data.eeljStartDate,
                eeljFinishDate: data.eeljFinishDate,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        missionID: "0",
                        eeljName: "",
                        eeljStartDate: "",
                        eeljFinishDate: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshEelj();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="eeljNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">ЭЭЛЖ НЭМЭХ</h4>

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
                                        <select
                                            className="form-control"
                                            {...register("missionID")}
                                        >
                                            <option value="0">
                                                Сонгоно уу
                                            </option>
                                            {getMission.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.missionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.missionID?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ээлж:
                                            </span>
                                        </div>
                                        <input
                                            {...register("eeljName")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.eeljName?.message}
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
                                                {...register("eeljStartDate")}
                                                className="form-control"
                                                placeholder="Эхлэх хугацаа..."
                                                type="datetime-local"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.eeljStartDate?.message}
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
                                                {...register("eeljFinishDate")}
                                                className="form-control"
                                                placeholder="Дуусах хугацаа..."
                                                type="datetime-local"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.eeljFinishDate?.message}
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

export default EeljNew;
