import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "../../../AxiosUser";

const TovchlolEdit = (props) => {
    const [getHumrug, setHumrug] = useState([]);
    const [getDans, setDans] = useState([]);

    useEffect(() => {
        axios
            .get("/get/Humrug")
            .then((res) => {
                setHumrug(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get("/get/Dans")
            .then((res) => {
                setDans(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        humrug_id: Yup.string().required("Хөмрөг дугаар оруулна уу"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
    });

    // Populate form when edit button is clicked
    useEffect(() => {
        if (props.isEditBtnClick && props.changeDataRow) {
            setValue("humrug_id", props.changeDataRow.humrug_id || "");
            setValue("dans_id", props.changeDataRow.dans_id || "");
            setValue("tobchlol", props.changeDataRow.tobchlol || "");
            setValue("tailal", props.changeDataRow.tailal || "");

            // Open modal when edit button is clicked
            if (window.$) {
                window.$("#TovchlolEdit").modal("show");
            }
        }
    }, [props.isEditBtnClick, props.changeDataRow, setValue]);

    const onSubmit = (data) => {
        axios
            .post("/edit/tovchlol", {
                id: props.changeDataRow.id,
                humrug_id: data.humrug_id,
                dans_id: data.dans_id,
                tobchlol: data.tobchlol,
                tailal: data.tailal,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        humrug_id: "",
                        dans_id: "",
                        tobchlol: "",
                        tailal: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                if (window.$) {
                    window.$("#TovchlolEdit").modal("hide");
                }
                if (props.setRowsSelected) {
                    props.setRowsSelected([]);
                }
                if (props.refreshTovchlol) {
                    props.refreshTovchlol();
                }
            })
            .catch((err) => {
                Swal.fire(err.response?.data?.msg || "Алдаа гарлаа");
            });
    };

    return (
        <>
            <div className="modal" id="TovchlolEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">ЗАСАХ</h4>

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
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Хөмрөгийн дугаар:
                                                </span>
                                            </div>
                                            <select
                                                className="form-control"
                                                {...register("humrug_id")}
                                            >
                                                <option value="0">
                                                    Сонгоно уу
                                                </option>
                                                {getHumrug.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.humrug_dugaar}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Хөмрөгийн нэр:
                                                </span>
                                            </div>
                                            <input
                                                {...register("humrug_name")}
                                                className="form-control"
                                                disabled
                                                value={
                                                    getHumrug.find(
                                                        (el) =>
                                                            el.id ==
                                                            watch("humrug_id")
                                                    )?.humrug_ner || ""
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Дансны дугаар:
                                                </span>
                                            </div>
                                            <select
                                                className="form-control"
                                                {...register("dans_id")}
                                            >
                                                <option value="0">
                                                    Сонгоно уу
                                                </option>
                                                {getDans.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.dans_dugaar}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Дансны нэр:
                                                </span>
                                            </div>
                                            <input
                                                {...register("dans_name")}
                                                className="form-control"
                                                disabled={true}
                                                value={
                                                    getDans.find(
                                                        (el) =>
                                                            el.id ==
                                                            watch("dans_id")
                                                    )?.dans_ner || ""
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row clearfix">
                                    <div className="col-md-6">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Товчлол:
                                                </span>
                                            </div>
                                            <input
                                                {...register("tobchlol")}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Тайлал:
                                                </span>
                                            </div>
                                            <input
                                                {...register("tailal")}
                                                className="form-control"
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
                                >
                                    Засах
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

export default TovchlolEdit;
