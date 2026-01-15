import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "../../../AxiosUser";

const SedevNew = (props) => {
    // const [getHumrug, setHumrug] = useState([]);
    const [getHumrug, setHumrug] = useState([]);
    const [getDans, setDans] = useState([]);

    useEffect(() => {
        axios
            .get("/get/Humrug")
            .then((res) => {
                setHumrug(res.data);
            })
            .catch((err) => {});

        axios
            .get("/get/Dans")
            .then((res) => {
                setDans(res.data);
            })
            .catch((err) => {});
    }, []);

    const formSchema = Yup.object().shape({
        humrug_id: Yup.string().required("Хөмрөг дугаар оруулна уу"),
        // humrug_ner: Yup.string().required("Хөмрөгийн нэр оруулна уу"),
        // humrug_zereglel: Yup.string().required("Хөмрөгийн зэрэглэл оруулна уу"),
        // anhnii_ognoo: Yup.string().required("Анхны огноо оруулна уу"),
        // humrug_uurchlult: Yup.string().nullable(),
        // uurchlult_ognoo: Yup.string().nullable(),
        // humrug_tailbar: Yup.string().nullable(),
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
            .post("/new/sedevzui", {
                humrug_id: data.humrug_id,
                dans_id: data.dans_id,
                zaagch_tobchlol: data.zaagch_tobchlol,
                zaagch_tailal: data.zaagch_tailal,
                // barimt_ner: data.barimt_ner,
                // hugatsaa_turul: data.hugatsaa_turul,
                // hugatsaa: data.hugatsaa,
                // tailbar: data.tailbar,
                // tobchlol: data.tobchlol,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                reset(
                    {
                        humrug_id: "",
                        dans_id: "",
                        zaagch_tobchlol: "",
                        zaagch_tailal: "",
                        // barimt_ner: "",
                        // hugatsaa_turul: "",
                        // hugatsaa: "",
                        // tailbar: "",
                        // tobchlol: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshSedevzui();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="SedevNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title"> Жагсаалт нэмэх</h4>

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
                                                {...register(
                                                    "humrug_id"
                                                )}
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
                                        {/* <p className="alerts">
                                            {errors.jagsaalt_turul?.message}
                                        </p> */}
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
                                                {...register(
                                                    "dans_id"
                                                )}
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
                                        {/* <p className="alerts">
                                            {errors.jagsaalt_turul?.message}
                                        </p> */}
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
                                                disabled = {true}
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
                                                {...register("zaagch_tobchlol")}
                                                className="form-control"
                                            />
                                        </div>
                                        {/* <p className="alerts">
                                            {errors.barimt_dedturul?.message}
                                        </p> */}
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                  Тайлал :
                                                </span>
                                            </div>
                                            <input
                                                {...register("zaagch_tailal")}
                                                className="form-control"
                                            />
                                        </div>
                                        {/* <p className="alerts">
                                            {errors.barimt_dd?.message}
                                        </p> */}
                                    </div>
                                </div>

                            </div>

                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-success"
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

export default SedevNew;
