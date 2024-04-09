import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const InfoNew = (props) => {
    const state = useContext(AppContext);
    const [getApplause, setApplause] = useState([]);
    const [getApplauseSub, setApplauseSub] = useState([]);

    useEffect(() => {
        axios
            .get("/get/uureg/applauses")
            .then((res) => {
                setApplause(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const changeApplause = (e) => {
        axios
            .post("/get/sub/by/applauseID", {
                _applauseID: e.target.value,
            })
            .then((res) => {
                setApplauseSub(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formSchema = Yup.object().shape({
        applauseID: Yup.string().required("Төрөл сонгоно уу."),
        applauseSubID: Yup.string().required("Хэлбэр сонгоно уу."),
        applauseDate: Yup.string().required("Огноо оруулна уу."),
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
            .post("/new/uureg/guitsetgelt/new", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                applauseID: data.applauseID,
                applauseSubID: data.applauseSubID,
                applauseDescription: data.applauseDescription,
                applauseDate: data.applauseDate,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        applauseID: "",
                        applauseSubID: "",
                        applauseDescription: "",
                        applauseDate: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshInfo(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getRotID,
                    props.getSalaaID,
                    props.getTasagID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="infoNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">МЭДЭЭ ОРУУЛАХ</h4>
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
                                            onChange={changeApplause}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getApplause.map((el) => (
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

                                        <select
                                            className="form-control"
                                            {...register("applauseSubID")}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getApplauseSub.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.applauseHelber}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.applauseSubID?.message}
                                    </p>
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
                                            {...register("applauseDescription")}
                                            placeholder="Тайлбар..."
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Огноо:
                                            </span>
                                        </div>

                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            {...register("applauseDate")}
                                        />
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

export default InfoNew;
