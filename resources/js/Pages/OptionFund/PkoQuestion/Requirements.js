import React, { useEffect, useState } from "react";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Requirements = () => {
    const [getRequirements, setRequirements] = useState([]);
    const [getAppaointedDate, setAppaointedDate] = useState("");
    const [getHalf, setHalf] = useState("");
    const [getFull, setFull] = useState("");
    const [getPunishmentDate, setPunishmentDate] = useState("");

    useEffect(() => {
        axios
            .get("/get/requirements")
            .then((res) => {
                setRequirements(res.data.requirements);
                setAppaointedDate(res.data.appointedDate);
                setHalf(res.data.half);
                setFull(res.data.full);
                setPunishmentDate(res.data.punishmentDate);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        appointedDate: Yup.string().typeError(
            "Шаардлагатай хугацаа оруулна уу."
        ),
        missionTypeFull: Yup.string().typeError(
            "Шаардлагатай хугацаа оруулна уу."
        ),
        missionTypeFull: Yup.string().typeError(
            "Шаардлагатай хугацаа оруулна уу."
        ),
        punishment: Yup.number().typeError("Шаардлагатай хугацаа оруулна уу."),
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
        if (getRequirements == 0) {
            axios
                .post("/new/user/requirements", {
                    appointedDate: data.appointedDate,
                    missionTypeHalf: data.missionTypeHalf,
                    missionTypeFull: data.missionTypeFull,
                    punishmentDate: data.punishmentDate,
                })
                .then((res) => {
                    Swal.fire(res.data.msg);
                    refreshUserQuestion();
                })
                .catch((err) => {
                    Swal.fire(err.response.data.msg);
                });
        } else {
            axios
                .post("/new/user/requirements", {
                    appointedDate: getAppaointedDate,
                    missionTypeHalf: getHalf,
                    missionTypeFull: getFull,
                    punishmentDate: getPunishmentDate,
                })
                .then((res) => {
                    Swal.fire(res.data.msg);
                    refreshUserQuestion();
                })
                .catch((err) => {
                    Swal.fire(err.response.data.msg);
                });
        }
    };

    const changeAppointed = (e) => {
        setAppaointedDate(e.target.value);
    };
    const changePunishment = (e) => {
        setPunishmentDate(e.target.value);
    };
    const changeHalf = (e) => {
        setHalf(e.target.value);
    };
    const changeFull = (e) => {
        setFull(e.target.value);
    };

    if (getRequirements == 0) {
        return (
            <>
                <div className="card card-default">
                    <div className="card-header">
                        <h3 className="card-title">Тавигдах шаардлага</h3>
                    </div>
                    {/* /.card-header */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            Одоогийн албан тушаалд
                                            томилогдсоноос хойш /хугацаа сараар/
                                            {/* Цэргийн зохих шатны сургууль, дамжаа
                                            төгссөн, цэргийн гэрээт албанд
                                            элссэн болон шинэ албан тушаалд
                                            томилогдсоноос хойш шаардлагатай
                                            хугацаа /Сараар/: */}
                                        </label>
                                        <input
                                            type="number"
                                            {...register("appointedDate")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.appointedDate?.message}
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Шийтгэгдсэнээс хойш шаардлагатай
                                            хугацаа /Сараар/:
                                        </label>
                                        <input
                                            type="number"
                                            {...register("punishmentDate")}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            06 сараар үүрэг гүйцэтгэснээс хойш
                                            шаардлагатай хугацаа
                                            <br />
                                            /Сараар/:
                                        </label>
                                        <input
                                            type="number"
                                            {...register("missionTypeHalf")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.missionTypeHalf?.message}
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            12 сараар үүрэг гүйцэтгэснээс хойш
                                            шаардлагатай хугацаа /Сараар/:
                                        </label>
                                        <input
                                            type="number"
                                            {...register("missionTypeFull")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.missionTypeFull?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.card-body */}
                        <div
                            className="card-footer"
                            style={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "right",
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-success"
                                data-dismiss=""
                            >
                                Илгээх
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="card card-default">
                    <div className="card-header">
                        <h3 className="card-title">Тавигдах шаардлага</h3>
                    </div>
                    {/* /.card-header */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            Одоогийн албан тушаалд
                                            томилогдсоноос хойш /хугацаа сараар/
                                            {/* Цэргийн зохих шатны сургууль, дамжаа
                                            төгссөн, цэргийн гэрээт албанд
                                            элссэн болон шинэ албан тушаалд
                                            томилогдсоноос хойш шаардлагатай
                                            хугацаа /Сараар/: */}
                                        </label>
                                        <input
                                            type="number"
                                            onChange={changeAppointed}
                                            value={getAppaointedDate}
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Шийтгэгдсэн тохиолдолд /хугацаа
                                            сараар/:
                                        </label>
                                        <input
                                            type="number"
                                            onChange={changePunishment}
                                            value={getPunishmentDate}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            06 сараар үүрэг гүйцэтгэснээс хойш
                                            шаардлагатай хугацаа
                                            <br />
                                            /Сараар/:
                                        </label>
                                        <input
                                            type="number"
                                            onChange={changeHalf}
                                            value={getHalf}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            12 сараар үүрэг гүйцэтгэсэн
                                            тохиолдолд /хугацаа сараар/:
                                        </label>
                                        <input
                                            type="number"
                                            onChange={changeFull}
                                            value={getFull}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.card-body */}
                        <div
                            className="card-footer"
                            style={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "right",
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-warning"
                                data-dismiss=""
                            >
                                Шинэчлэх
                            </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
};

export default Requirements;
