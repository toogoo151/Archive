import React, { useState } from "react";
import ButtonShowModel from "../../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import "../../../../components/Admin/general/AlertStyle.css";
import AlertSuccess from "../../../../components/Admin/general/Alert/AlertSuccess";
import AlertError from "../../../../components/Admin/general/Alert/AlertError";
import Swal from "sweetalert2";

const ComandlalNew = (props) => {
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);

    const [sendMsg, setsendMsg] = useState(null);
    const [sendMsgErr, setsendMsgErr] = useState(null);

    const formSchema = Yup.object().shape({
        shortName: Yup.string().required("Хэрэглэгчийн эрх сонгоно уу."),
        name: Yup.string().required("Админий нэр оруулах шаардлагатай"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        getValues,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (data) => {
        axios
            .post("/new/comandlal", {
                shortName: data.shortName,
                name: data.name,
            })
            .then((res) => {
                // setsendMsg(res.data.msg);
                Swal.fire(res.data.msg);
                reset(
                    {
                        shortName: "",
                        name: "",
                    },
                    {
                        // keepErrors: true,
                        // keepDirty: true,
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshComandlal();
            })
            .catch((err) => {
                setsendMsgErr(err.response.data.msg);
            });
    };
    return (
        <>
            <ButtonShowModel
                btnClassName={"btn btn-success"}
                modelType={"modal"}
                dataTargetID={"#comandlalNew"}
                spanIconClassName={"fas fa-solid fa-plus"}
                buttonName={"Нэмэх"}
            />
            <div className="modal" id="comandlalNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Командлал нэмэх</h4>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>
                        {/* Modal body */}
                        {/* onSubmit={handleSubmit(onSubmit)} */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-3 float-right">
                                        <label className="float-right">
                                            Товч нэр:
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-university"></i>
                                                </span>
                                            </div>
                                            <input
                                                {...register("shortName", {
                                                    required: true,
                                                    // maxLength: 20,
                                                })}
                                                className="form-control"
                                                placeholder="Товч нэр..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.shortName?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 float-righ">
                                        <label className="float-right">
                                            Командлалын нэр:
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fa fa-university"></i>
                                                </span>
                                            </div>
                                            <input
                                                {...register("name")}
                                                className="form-control"
                                                placeholder="Командлалын нэр..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.name?.message}
                                        </p>
                                    </div>
                                </div>

                                {sendMsg && <AlertSuccess msg={sendMsg} />}
                                {sendMsgErr && <AlertError msg={sendMsgErr} />}
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

export default ComandlalNew;
