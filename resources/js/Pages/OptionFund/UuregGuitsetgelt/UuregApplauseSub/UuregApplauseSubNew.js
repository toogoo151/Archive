import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";

const UuregApplauseSubNew = (props) => {
    const [getUuregApplause, setUuregApplause] = useState([]);

    useEffect(() => {
        axios
            .get("/get/uureg/applauses")
            .then((res) => {
                setUuregApplause(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        applauseID: Yup.string().required("Төрөл сонгоно уу."),
        applauseHelber: Yup.string().required("Хэлбэр оруулна уу."),
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
            .post("/new/uureg/applause/sub", {
                applauseID: data.applauseID,
                applauseHelber: data.applauseHelber,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        applauseID: "0",
                        applauseHelber: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshUuregApplauseSub();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="uuregApplauseSubNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">ХЭЛБЭР НЭМЭХ</h4>

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
                                                Төрөл:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            {...register("applauseID")}
                                        >
                                            <option value="0">
                                                Сонгоно уу
                                            </option>
                                            {getUuregApplause.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.isApplauseName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.applauseID?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Хэлбэр:
                                            </span>
                                        </div>
                                        <input
                                            {...register("applauseHelber")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.applauseHelber?.message}
                                    </p>
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

export default UuregApplauseSubNew;
