import React, { useState, useEffect, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";
const DocItemNew = (props) => {
    const state = useContext(AppContext);
    const [getItemPdf, setItemPdf] = useState("");
    const [getPdfName, setPdfName] = useState("");
    const fileInputRef = useRef(null);

    // const [getZagvarPdf, setZagvarPdf] = useState([null]);
    // const [getMission, setMission] = useState([]);
    // const [getEelj, setEelj] = useState([]);

    // const newWindow = useRef(null);
    // const openZagvarPDF = () => {
    //     if (!newWindow.current) {
    //         newWindow.current = window.open(
    //             "/laravel-filemanager",
    //             "",
    //             "width=1200,height=800,left=300,top=80"
    //         );
    //         window.SetUrl = (url, width, height, alt) => {
    //             setZagvarPdf(url[0].url);
    //         };
    //     }
    // };

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

    const formSchema = Yup.object().shape({
        // missionID: Yup.string().required("Ажиллагааны нэр сонгоно уу."),
        // eeljID: Yup.string().required("Ээлж сонгоно уу."),
        documentName: Yup.string().required("Бичиг баримтын нэр оруулна уу."),
        // documentShaardlaga: Yup.string().required(
        //     "Бичиг баримтад тавигдах шаардлагыг оруулна уу."
        // ),
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
            .post("/new/doc/item", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                documentName: data.documentName,
                documentShaardlaga: data.documentShaardlaga,
                documentZagvar: getItemPdf,
                pdfName: getPdfName,
            })
            .then((res) => {
                setZagvarPdf("");
                fileInputRef.current.value = null;
                Swal.fire(res.data.msg);
                reset(
                    {
                        documentName: "",
                        documentShaardlaga: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshDocItem(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const convertToBase64 = (e) => {
        const pdfFile = e.target.files[0];
        if (pdfFile.name.split(".").pop() === "pdf") {
            //Хэмжээ шалгах хэсэг
            const maxSize = 400 * 1024; // 400KB
            if (pdfFile.size > maxSize) {
                const mySize = pdfFile.size / 1024;
                const replaceSize = mySize.toString().replace(/\.\d+/, "");
                alert(
                    "Таны оруулсан файлын хэмжээ:" +
                        replaceSize +
                        "KБ байна." +
                        ".Файлын хэмжээ 400KБ-аас хэтэрсэн тул багасгах шаардлагатай."
                );
                return;
            }

            var reader = new FileReader();
            reader.readAsDataURL(pdfFile);
            reader.onload = () => {
                const pdfData = reader.result;
                setItemPdf(pdfData);
                const replacedName = pdfFile.name.replace(".pdf", "");
                setPdfName(replacedName);
            };
            reader.onerror = (error) => {
                console.log(error);
            };
        } else {
            alert(
                "Та зөвхөн Pdf файл сонгоно уу. Алдаа: Pdf файлын өргөтгөл биш байна."
            );
        }
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
            <div className="modal" id="docItemNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                БИЧИГ БАРИМТЫН ТӨРӨЛ НЭМЭХ
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
                                                Бичиг баримтын нэр:
                                            </span>
                                        </div>
                                        <input
                                            {...register("documentName")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.documentName?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Бичиг баримтад тавигдах
                                                шаардлага:
                                            </span>
                                        </div>
                                        <input
                                            {...register("documentShaardlaga")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.documentShaardlaga?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-group mb-3">
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                onChange={convertToBase64}
                                                ref={fileInputRef}
                                                className="form-control"
                                            />
                                            {/* <div className="input-group-prepend">
                                            <label
                                                className="btn btn-primary"
                                                onClick={openZagvarPDF}
                                            >
                                                Бичиг баримтын загвар PDF:
                                            </label>
                                        </div>

                                        <input
                                            {...register(
                                                "documentZagvar",
                                                setValue(
                                                    "documentZagvar",
                                                    getZagvarPdf
                                                )
                                            )}
                                            value={getZagvarPdf}
                                            className="form-control"
                                            // placeholder="загвар PDF..."
                                            disabled={true}
                                        /> */}
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

export default DocItemNew;
