import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
import axios from "../../../../AxiosUser";

const ScoreNew = (props) => {
    const state = useContext(AppContext);
    const [getLanguageTypeID, setLanguageTypeID] = useState([]);

    useEffect(() => {
        axios
            .get("/get/language/types")
            .then((res) => {
                setLanguageTypeID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        languageTypeID: Yup.string().required("Шалгалт сонгоно уу."),
        languageScore: Yup.string().required("Шалгалтын оноо оруулна уу."),
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
            .post("/new/language/score", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                languageTypeID: data.languageTypeID,
                languageScore: data.languageScore,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        languageTypeID: [],
                        languageScore: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshNoScore(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getComandlalID,
                    props.getUnitID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="languageNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ШАЛГАЛТЫН ОНОО ОРУУЛАХ
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
                                                Шалгалтын төрөл:
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            {...register("languageTypeID")}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getLanguageTypeID.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.languageName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.languageTypeID?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Авсан оноо:
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            {...register("languageScore")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.languageScore?.message}
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
                                    Оруулах
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

export default ScoreNew;
