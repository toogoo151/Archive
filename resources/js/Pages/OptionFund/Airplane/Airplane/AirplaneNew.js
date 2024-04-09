import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const AirplaneNew = (props) => {
    const state = useContext(AppContext);
    const [getDepartured, setDepartured] = useState([]);
    const [getArrived, setArrived] = useState([]);

    useEffect(() => {
        axios
            .get("/get/airplane/shift/items")
            .then((res) => {
                setDepartured(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/get/airplane/arrives")
            .then((res) => {
                setArrived(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        airplaneDeparturedID: Yup.string().required(
            "Нислэгийн ээлж сонгоно уу."
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
            .post("/new/airplane/eelj", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                airplaneDeparturedID: data.airplaneDeparturedID,
                airplaneArrivedID: data.airplaneArrivedID,
                missionStartDate: data.missionStartDate,
                missionFinishDate: data.missionFinishDate,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        airplaneDeparturedID: "",
                        airplaneArrivedID: "",
                        missionStartDate: "",
                        missionFinishDate: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshEeljHiigdeegui(
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
            <div className="modal" id="airplaneNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                НИСЛЭГИЙН ЭЭЛЖ ХУВААРИЛАХ
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
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Явах ээлж:
                                                </span>
                                            </div>

                                            <select
                                                className="form-control"
                                                {...register(
                                                    "airplaneDeparturedID"
                                                )}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getDepartured.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {
                                                            el.airplaneShiftItemName
                                                        }
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="alerts">
                                            {
                                                errors.airplaneDeparturedID
                                                    ?.message
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Ирэх ээлж:
                                                </span>
                                            </div>

                                            <select
                                                className="form-control"
                                                {...register(
                                                    "airplaneArrivedID"
                                                )}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                {getArrived.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.arrivedName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Явах хугацаа:
                                                </span>
                                            </div>

                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                {...register(
                                                    "missionStartDate"
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Ирэх хугацаа:
                                                </span>
                                            </div>

                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                {...register(
                                                    "missionFinishDate"
                                                )}
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

export default AirplaneNew;
