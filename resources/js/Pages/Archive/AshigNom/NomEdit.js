import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "../../../AxiosUser";

const NomEdit = (props) => {
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
            setValue("nom_dugaar", props.changeDataRow.nom_dugaar || "");
            setValue("nom_ners", props.changeDataRow.nom_ners || "");

            // Open modal when edit button is clicked
            if (window.$) {
                window.$("#NomEdit").modal("show");
            }
        }
    }, [props.isEditBtnClick, props.changeDataRow, setValue]);

    const onSubmit = (data) => {
        axios
            .post("/edit/ashignom", {
                id: props.changeDataRow.id,
                humrug_id: data.humrug_id,
                dans_id: data.dans_id,
                nom_dugaar: data.nom_dugaar,
                nom_ners: data.nom_ners,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        humrug_id: "",
                        dans_id: "",
                        nom_dugaar: "",
                        nom_ners: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                if (window.$) {
                    window.$("#NomEdit").modal("hide");
                }
                if (props.setRowsSelected) {
                    props.setRowsSelected([]);
                }
                if (props.refreshNom) {
                    props.refreshNom();
                }
            })
            .catch((err) => {
                Swal.fire(err.response?.data?.msg || "Алдаа гарлаа");
            });
    };

    return (
        <>
            <div className="modal" id="NomEdit">
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
                                                    Номын дугаар:
                                                </span>
                                            </div>
                                            <input
                                                {...register("nom_dugaar")}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Номын нэр:
                                                </span>
                                            </div>
                                            <input
                                                {...register("nom_ners")}
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

export default NomEdit;
