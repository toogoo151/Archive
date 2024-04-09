import React, { useState, useEffect } from "react";
import ButtonShowModel from "../../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import "../../../../components/Admin/general/AlertStyle.css";
import Swal from "sweetalert2";

const UnitNew = (props) => {
    const [sendMsg, setsendMsg] = useState(null);
    const [sendMsgErr, setsendMsgErr] = useState(null);
    const [getComandlals, setComandlal] = useState([]);

    useEffect(() => {
        axios
            .get("/get/comandlal")
            .then((res) => {
                setComandlal(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        comandlalID: Yup.string().required("Командлал сонгоно уу."),
        unitShortName: Yup.string().required("Товч нэр оруулна уу."),
        unitFullName: Yup.string().required("Нэр оруулна уу"),
        //unitNumber: Yup.number().typeError("Ангийн дугаар оруулна уу"),
        unitNumber: Yup.string()
            .required("Ангийн дугаар оруулна уу")
            .matches(/^[0-9]+$/, "Зөвхөн цифр байх ёстой")
            .min(3, "Яг 3 оронтой байх ёстой")
            .max(3, "Яг 3 оронтой байх ёстой"),
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
            .post("/new/unit", {
                comandlalID: data.comandlalID,
                unitShortName: data.unitShortName,
                unitFullName: data.unitFullName,
                unitNumber: data.unitNumber,
            })
            .then((res) => {
                // setsendMsg(res.data.msg);
                Swal.fire(res.data.msg);
                reset(
                    {
                        comandlalID: "",
                        unitShortName: "",
                        unitFullName: "",
                        unitNumber: "",
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
                props.refreshUnit();
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
                dataTargetID={"#unitNew"}
                spanIconClassName={"fas fa-solid fa-plus"}
                buttonName={"Нэмэх"}
            />
            <div className="modal" id="unitNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Анги нэмэх</h4>

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
                                    <div className="col-md-3 float-righ">
                                        <label className="float-right">
                                            Командлал:
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-star"></i>
                                                </span>
                                            </div>
                                            <select
                                                className="form-control"
                                                {...register("comandlalID")}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getComandlals.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.comandlalShortName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="alerts">
                                            {errors.comandlalID?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 float-righ">
                                        <label className="float-right">
                                            Ангийн товч нэр:
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-star"></i>
                                                </span>
                                            </div>
                                            <input
                                                {...register("unitShortName", {
                                                    required: true,
                                                    // maxLength: 20,
                                                })}
                                                className="form-control"
                                                placeholder="Ангийн товч нэр..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.unitShortName?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 float-righ">
                                        <label className="float-right">
                                            Ангийн нэр:
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-star"></i>
                                                </span>
                                            </div>
                                            <input
                                                {...register("unitFullName")}
                                                className="form-control"
                                                placeholder="Ангийн нэр..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.unitFullName?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 float-righ">
                                        <label className="float-right">
                                            Ангийн дугаар:
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i className="fas fa-star"></i>
                                                </span>
                                            </div>
                                            <input
                                                {...register("unitNumber")}
                                                className="form-control"
                                                placeholder="Ангийн дугаар..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.unitNumber?.message}
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

export default UnitNew;
