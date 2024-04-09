import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
const SalaaNew = (props) => {
    const state = useContext(AppContext);
    const [getRotID, setRotID] = useState([]);

    useEffect(() => {
        axios
            .post("/get/rot", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                setRotID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        rotID: Yup.string().required("Ротын нэр сонгоно уу."),
        salaaName: Yup.string().required("Салааны нэр оруулна уу."),
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
            .post("/new/salaa", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                rotID: data.rotID,
                salaaName: data.salaaName,
                salaaShortName: data.salaaShortName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        rotID: "",
                        salaaName: "",
                        salaaShortName: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshSalaa(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="salaaNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">САЛАА НЭМЭХ</h4>

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
                                                Ротын нэр:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            {...register("rotID")}
                                        >
                                            <option value="0">
                                                Сонгоно уу
                                            </option>
                                            {getRotID.map((el) => (
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

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Салааны нэр:
                                                </span>
                                            </div>
                                            <input
                                                {...register("salaaName")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.salaaName?.message}
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Товч нэр:
                                                </span>
                                            </div>
                                            <input
                                                {...register("salaaShortName")}
                                                className="form-control"
                                            />
                                        </div>
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

export default SalaaNew;
