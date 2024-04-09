import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const CanceledNew = (props) => {
    const state = useContext(AppContext);
    const [getCanceledType, setCanceledType] = useState([]);
    const [getCanceledPdf, setCanceledPdf] = useState("");

    useEffect(() => {
        axios
            .get("/get/canceled/types")
            .then((res) => {
                setCanceledType(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const newWindow = useRef(window);
    const openCanceledPDF = () => {
        newWindow.current = window.open(
            "/laravel-filemanager",
            "",
            "width=1200,height=800,left=300,top=80"
        );
        window.SetUrl = (url, width, height, alt) => {
            setCanceledPdf(url[0].url);
        };
    };

    const formSchema = Yup.object().shape({
        pkoCanceledTypeID: Yup.string().required("Шалтгаан сонгоно уу."),
        // canceledPdf: Yup.string().required("PDF оруулна уу."),
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
            .post("/new/canceled/child", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                pkoCanceledTypeID: data.pkoCanceledTypeID,
                canceledPdf: getCanceledPdf,
                canceledDescription: data.canceledDescription,
            })
            .then((res) => {
                setCanceledPdf("");
                Swal.fire(res.data.msg);
                reset(
                    {
                        pkoCanceledTypeID: "",
                        canceledDescription: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshTatgalzaagui(
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
            <div className="modal" id="canceledChildNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ТАТГАЛЗСАН МЭДЭЭЛЭЛ НЭМЭХ
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
                                                Татгалзсан шалтгаан:
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            {...register("pkoCanceledTypeID")}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getCanceledType.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.canceledTypeName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.pkoCanceledTypeID?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="btn btn-primary"
                                                onClick={openCanceledPDF}
                                            >
                                                Татгалзсан шалтгааны PDF:
                                            </label>
                                        </div>

                                        <input
                                            {...register("canceledPdf")}
                                            value={getCanceledPdf}
                                            className="form-control"
                                            placeholder="Татгалзсан шалтгааны PDF..."
                                            disabled={true}
                                        />
                                    </div>
                                    {/* <p className="alerts">
                                        {errors.canceledPdf?.message}
                                    </p> */}
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Тайлбар:
                                            </span>
                                        </div>
                                        <textarea
                                            {...register("canceledDescription")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.canceledDescription?.message}
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

export default CanceledNew;
