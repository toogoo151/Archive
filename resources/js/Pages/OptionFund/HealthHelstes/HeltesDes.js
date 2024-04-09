import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";

const HeltesDes = (props) => {
    const state = useContext(AppContext);

    const [heltesPdf, setHeltesPdf] = useState(null);

    const newWindow = useRef(window);
    const openHeltesPDF = () => {
        newWindow.current = window.open(
            "/laravel-filemanager",
            "",
            "width=1200,height=800,left=300,top=80"
        );
        window.SetUrl = (url, width, height, alt) => {
            setHeltesPdf(url[0].url);
        };
    };

    const formSchema = Yup.object().shape({
        heltesDescription: Yup.string().required("Шалтгаан оруулна уу."),
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
            .post("/health/department/decline", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                heltesPdf: heltesPdf,
                heltesDescription: data.heltesDescription,
            })
            .then((res) => {
                setHeltesPdf("");
                Swal.fire(res.data.msg);
                reset(
                    {
                        heltesDescription: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshHealthDepartment(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getDepartmentState,
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
            <div className="modal" id="heltesEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ТАТГАЛЗСАН ШАЛТГААН ОРУУЛАХ
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
                                            <label
                                                className="btn btn-primary"
                                                onClick={openHeltesPDF}
                                            >
                                                Татгалзсан шалтгааны PDF:
                                            </label>
                                        </div>

                                        <input
                                            {...register("heltesPdf")}
                                            value={heltesPdf}
                                            className="form-control"
                                            placeholder="Татгалзсан шалтгааны PDF..."
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Тайлбар:
                                            </span>
                                        </div>
                                        <textarea
                                            {...register("heltesDescription")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.heltesDescription?.message}
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

export default HeltesDes;
