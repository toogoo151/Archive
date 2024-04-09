import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
const ForeignPassNew = (props) => {
    const state = useContext(AppContext);

    const formSchema = Yup.object().shape({
        foreignFinishDate: Yup.string().required(
            "Гадаад паспортын шаардлагатай хугацааг оруулна уу."
        ),
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
            .post("/new/foreign/pass", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                foreignFinishDate: data.foreignFinishDate,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        foreignFinishDate: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshForeignPass(
                    state.getMissionRowID,
                    state.getEeljRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="foreignPassNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ГАДААД ПАСПОРТЫН ШААРДЛАГАТАЙ ХУГАЦАА ОРУУЛАХ
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
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Гадаад паспортын шаардлагатай
                                                хугацаа:
                                            </span>
                                        </div>
                                        <input
                                            type="date"
                                            {...register("foreignFinishDate")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.foreignFinishDate?.message}
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

export default ForeignPassNew;
