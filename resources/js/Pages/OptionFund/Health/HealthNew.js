import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../Context/MyContext";

const HealthNew = (props) => {
    const state = useContext(AppContext);
    // const [getHealthPdf, setHealthPdf] = useState([null]);
    const [getHealthPdf, setHealthPdf] = useState("");
    const [getDescription, setDescription] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBackdropVisible, setIsBackdropVisible] = useState(false);

    const [getPdfName, setPdfName] = useState("");
    const fileInputRef = useRef(null);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);



    // const newWindow = useRef(window);
    // const openHealthPDF = () => {
    //     newWindow.current = window.open(
    //         "/laravel-filemanager?type=pdf",
    //         "/laravel-filemanager/upload?type=pdf&_token=",
    //         "width=600,height=400,left=200,top=200"
    //     );
    //     window.SetUrl = (url, width, height, alt) => {
    //         const file = url[0].url;
    //         console.log(url);

    //         if (url[0].icon === "pdf") {
    //             setHealthPdf(url[0].url);
    //             //  alert("PDF bnaa .");
    //         } else {
    //             alert(
    //                 "Таны оруулсан файл нь PDF форматтай биш байна. Зөвхөн PDF файл оруулна уу."
    //             );
    //             return;
    //         }
    //     };
    // };
    useEffect(() => {
        console.log("isModalOpen value:", isModalOpen);
        // Rest of your code...
    }, [isModalOpen]);

    //  useEffect(() => {
    //   const backdropElement = document.querySelector('.modal-backdrop');

    //   if (backdropElement) {
    //     if (!isBackdropVisible) {
    //       backdropElement.remove();
    //     }
    //   }
    // }, [isBackdropVisible]);

    const formSchema = Yup.object().shape({
        // healthPdf: Yup.string().required("PDF оруулна уу."),
        healthApprove: Yup.string().required("Шийдвэр оруулна уу."),
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
          setIsSubmitDisabled(true);
        axios
            .post("/new/health/child", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                healthPdf: getHealthPdf,
                pdfName: getPdfName,
                healthApprove: data.healthApprove,
                healthDescription: data.healthDescription,
            })
            .then((res) => {
                setHealthPdf("");
                fileInputRef.current.value = null;

                Swal.fire(res.data.msg).then(() => {
                setIsSubmitDisabled(false);
                    console.log("Modal closing...");

                    setTimeout(() => {
                        Swal.close();

                        const backdrop =
                            document.querySelector(".modal-backdrop");

                        if (backdrop) {
                            backdrop.remove();
                        }
                        document.body.style.overflowY = "scroll";
                        console.log(isModalOpen);
                    }, 100); // Adjust the delay as needed
                });
                reset(
                    {
                        healthApprove: "",
                        healthDescription: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshHealthChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeApprove = (e) => {
        setDescription(e.target.value);
    };

    const convertToBase64 = (e) => {
        const pdfFile = e.target.files[0];
        if (pdfFile.name.split(".").pop() === "pdf") {
            //Хэмжээ шалгах хэсэг
            const maxSize = 350 * 1024; // 100KB
            if (pdfFile.size > maxSize) {
                const mySize = pdfFile.size / 1024;
                const replaceSize = mySize.toString().replace(/\.\d+/, "");
                alert(
                    "Таны оруулсан файлын хэмжээ:" +
                        replaceSize +
                        "KБ байна." +
                        ".Файлын хэмжээ 350KБ-аас хэтэрсэн тул багасгах шаардлагатай."
                );
                return;
            }

            var reader = new FileReader();
            reader.readAsDataURL(pdfFile);
            reader.onload = () => {
                const pdfData = reader.result;
                setHealthPdf(pdfData);
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

    return (
        <>
            <div
                className={`modal ${isModalOpen ? "show" : ""}`}
                id="healthChildNew"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ЭРҮҮЛ МЭНДИЙН ҮЗЛЭГИЙН МЭДЭЭЛЭЛ НЭМЭХ
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                {/* <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="btn btn-primary"
                                                onClick={openHealthPDF}
                                            >
                                                Эрүүл мэндийн хуудасны PDF:
                                            </label>
                                        </div>

                                        <input
                                            {...register("healthPdf")}
                                            value={getHealthPdf}
                                            className="form-control"
                                            placeholder="Эрүүл мэндийн хуудасны PDF..."
                                            disabled={true}
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.healthPdf?.message}
                                    </p>
                                </div> */}
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={convertToBase64}
                                            ref={fileInputRef}
                                            className="form-control"
                                        />
                                    </div>
                                    {/* <p className="alerts">
                                            {errors.healthPdf?.message}
                                        </p> */}
                                </div>
                                <div className="row">
                                    <label>
                                        Файлын хэмжээ 350КБ-аас ихгүй байх
                                        шаардлагатай
                                    </label>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Шийдвэр:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            {...register("healthApprove")}
                                            onChange={changeApprove}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            <option value="1">Тэнцсэн</option>
                                            <option value="2">Тэнцээгүй</option>
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.healthApprove?.message}
                                    </p>
                                </div>
                                {getDescription == 2 && (
                                    <div className="row">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Шалтгаан:
                                                </span>
                                            </div>
                                            <textarea
                                                className="form-control"
                                                {...register(
                                                    "healthDescription"
                                                )}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    data-dismiss=""
                                disabled={isSubmitDisabled}

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
            {/* {isBackdropVisible && (
  <div className="modal-backdrop show"></div>
)} */}
        </>
    );
};

export default HealthNew;
