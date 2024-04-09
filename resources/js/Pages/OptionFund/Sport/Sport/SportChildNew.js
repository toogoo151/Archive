import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const SportChildNew = (props) => {
    const state = useContext(AppContext);
    const [getGenders, setGenders] = useState([]);
    const [getSportTypeID, setSportTypeID] = useState([]);

    useEffect(() => {
        axios
            .post("/get/gender/admin")
            .then((res) => {
                setGenders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const changeGender = (e) => {
        axios
            .post("/get/gender/sport/types", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                _genderID: e.target.value,
            })
            .then((res) => {
                setSportTypeID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const formSchema = Yup.object().shape({
        genderID: Yup.string().required("Хүйс сонгоно уу."),
        sportTypeID: Yup.string().required("Нормативын төрөл сонгоно уу."),
        sportScore: Yup.string().required("Авсан оноо оруулна уу."),
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
            .post("/new/sport/child", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                genderID: data.genderID,
                sportTypeID: data.sportTypeID,
                sportScore: data.sportScore,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        genderID: "",
                        sportTypeID: "",
                        sportScore: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshSportChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <div>
            <>
                <div className="modal" id="sportChildNew">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    БИЕИЙН ТАМИРЫН ШАЛГАЛТЫН ОНОО ОРУУЛАХ
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
                                                    Хүйс:
                                                </span>
                                            </div>

                                            <select
                                                className="form-control"
                                                {...register("genderID")}
                                                onChange={changeGender}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getGenders.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.genderName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="alerts">
                                            {errors.genderID?.message}
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Нормативын төрөл:
                                                </span>
                                            </div>

                                            <select
                                                className="form-control"
                                                {...register("sportTypeID")}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getSportTypeID.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.sportTypeName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="alerts">
                                            {errors.sportTypeID?.message}
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
                                                {...register("sportScore")}
                                                className="form-control"
                                                placeholder="Авсан оноо..."
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.sportScore?.message}
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
        </div>
    );
};

export default SportChildNew;
