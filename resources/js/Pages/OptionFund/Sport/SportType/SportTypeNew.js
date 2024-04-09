import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
const SportTypeNew = (props) => {
    const state = useContext(AppContext);
    const [getGender, setGender] = useState([]);
    // const [getMission, setMission] = useState([]);
    // const [getEelj, setEelj] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("/get/missions")
    //         .then((res) => {
    //             setMission(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    useEffect(() => {
        axios
            .post("/get/gender/admin")
            .then((res) => {
                setGender(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        // missionID: Yup.string().required("Ажиллагааны нэр сонгоно уу."),
        // eeljID: Yup.string().required("Ээлж сонгоно уу."),
        genderID: Yup.string().required("Хүйс сонгоно уу."),
        sportTypeName: Yup.string().required("Нормативын төрөл оруулна уу."),
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
            .post("/new/sport/type", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                genderID: data.genderID,
                sportTypeName: data.sportTypeName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        // missionID: "0",
                        // eeljID: "0",
                        genderID: "",
                        sportTypeName: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshSportType(
                    state.getMissionRowID,
                    state.getEeljRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    // const changeMission = (e) => {
    //     axios
    //         .post("/get/eelj/by/missionID", {
    //             _missionID: e.target.value,
    //         })
    //         .then((res) => {
    //             setEelj(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    return (
        <>
            <div className="modal" id="sportTypeNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                НОРМАТИВЫН ТӨРӨЛ НЭМЭХ
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
                                {/* <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ажиллагааны нэр:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            {...register("missionID")}
                                            onChange={changeMission}
                                        >
                                            <option value="0">
                                                Сонгоно уу
                                            </option>
                                            {getMission.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.missionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.missionID?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ээлж:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            {...register("eeljID")}
                                        >
                                            <option value="0">
                                                Сонгоно уу
                                            </option>
                                            {getEelj.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.eeljName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.eeljID?.message}
                                    </p>
                                </div> */}
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Хүйс:
                                            </span>
                                        </div>
                                        <select
                                            {...register("genderID")}
                                            className="form-control"
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getGender.map((el) => (
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
                                        <input
                                            {...register("sportTypeName")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.sportTypeName?.message}
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

export default SportTypeNew;
