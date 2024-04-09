import React, { useState, useEffect } from "react";
import ButtonShowModel from "../../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import "../../../../components/Admin/general/AlertStyle.css";
import Swal from "sweetalert2";

const UnitSubNew = (props) => {
    const [sendMsgErr, setsendMsgErr] = useState(null);
    const [getComandlals, setComandlal] = useState([]);
    const [getUnits, setUnit] = useState([]);

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
        unitID: Yup.string().required("Анги сонгоно уу."),
        unitSubShortName: Yup.string().required(
            "Салбарын товч нэр оруулна уу."
        ),
        unitSubFullName: Yup.string().required("Салбарын нэр оруулна уу"),
        //unitSubNumber: Yup.number().typeError("Салбарын дугаар оруулна уу"),
        unitSubNumber: Yup.string()
            .required("Салбарын дугаар оруулна уу")
            .matches(/^[0-9]+$/, "Зөвхөн цифр байх ёстой"),
        //.min(6, "Яг 6 оронтой байх ёстой")
        //.max(6, "Яг 6 оронтой байх ёстой"),
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
            .post("/new/unitSub", {
                comandlalID: data.comandlalID,
                unitID: data.unitID,
                unitSubShortName: data.unitSubShortName,
                unitSubFullName: data.unitSubFullName,
                unitSubNumber: data.unitSubNumber,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        comandlalID: "",
                        unitID: "",
                        unitSubShortName: "",
                        unitSubFullName: "",
                        unitSubNumber: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshUnitSub();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };
    const changeComandlal = (e) => {
        axios
            .post("/get/unit/byComandlalID", {
                id: e.target.value,
            })
            .then((res) => {
                setUnit(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <ButtonShowModel
                btnClassName={"btn btn-success"}
                modelType={"modal"}
                dataTargetID={"#unitSubNew"}
                spanIconClassName={"fas fa-solid fa-plus"}
                buttonName={"Нэмэх"}
            />
            <div className="modal" id="unitSubNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Салбар нэмэх</h4>

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
                                                onChange={changeComandlal}
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
                                {getUnits.length > 0 && (
                                    <div className="row">
                                        <div className="col-md-3 float-righ">
                                            <label className="float-right">
                                                Анги:
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
                                                    {...register("unitID")}
                                                >
                                                    <option value="">
                                                        Сонгоно уу
                                                    </option>
                                                    {getUnits.map((el) => (
                                                        <option
                                                            key={el.id}
                                                            value={el.id}
                                                        >
                                                            {el.unitShortName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <p className="alerts">
                                                {errors.unitID?.message}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="row">
                                    <div className="col-md-3 float-righ">
                                        <label className="float-right">
                                            Салбарын товч нэр:
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
                                                {...register(
                                                    "unitSubShortName",
                                                    {
                                                        required: true,
                                                        // maxLength: 20,
                                                    }
                                                )}
                                                className="form-control"
                                                placeholder="Салбарын товч нэр..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.unitSubShortName?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 float-righ">
                                        <label className="float-right">
                                            Салбарын нэр:
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
                                                {...register("unitSubFullName")}
                                                className="form-control"
                                                placeholder="Салбарын нэр..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.unitSubFullName?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 float-righ">
                                        <label className="float-right">
                                            Салбарын дугаар:
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
                                                {...register("unitSubNumber")}
                                                className="form-control"
                                                placeholder="Салбарын дугаар..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.unitSubNumber?.message}
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

export default UnitSubNew;
