import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";

const DocumentUserNew = (props) => {
    const [getDocumentItemID, setDocumentItemID] = useState([]);
    const [getItemShaardlaga, setItemShaardlaga] = useState([]);
    const [getDocumentPdf, setDocumentPdf] = useState("");
    const [getPdfName, setPdfName] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        axios
            .post("/get/doc/items", {
                _missionID: props.missionID,
                _eeljID: props.eeljID,
            })
            .then((res) => {
                setDocumentItemID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // const newWindow = useRef(window);
    // const openDocPDF = () => {
    //     newWindow.current = window.open(
    //         "/laravel-filemanager",
    //         "",
    //         "width=1200,height=800,left=300,top=80"
    //     );
    //     window.SetUrl = (url, width, height, alt) => {
    //         setDocumentPdf(url[0].url);
    //     };
    // };

    const formSchema = Yup.object().shape({
        documentItemID: Yup.string().required("Бичиг баримт сонгоно уу."),
        // documentPdf: Yup.string().required("PDF оруулна уу."),
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
            .post("/new/document/child", {
                missionID: props.missionID,
                eeljID: props.eeljID,
                pkoMainHistoryID: props.getMainHistoryID,
                documentItemID: data.documentItemID,
                documentPdf: getDocumentPdf,
                pdfName: getPdfName,
            })
            .then((res) => {
                setDocumentPdf("");
                fileInputRef.current.value = null;

                if (props.countRow + 1 <= 7) {
                    Swal.fire("Амжилттай хадгаллаа");
                }
                if (props.countRow + 1 === 7) {
                    Swal.fire(
                        "Та бичиг баримтаа амжилттай оруулж дууслаа"
                    ).then(() => {
                        const modalBackdrop =
                            document.querySelector(".modal-backdrop");
                        if (modalBackdrop) {
                            modalBackdrop.classList.remove("show");
                            modalBackdrop.style.backgroundColor = "transparent";
                            location.reload();
                        }
                    });
                }
                // Swal.fire(res.data.msg);
                reset(
                    {
                        documentItemID: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshDocUser(props.missionID, props.eeljID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeItem = (e) => {
        axios
            .post("/get/doc/shaardlaga", {
                id: e.target.value,
            })
            .then((res) => {
                setItemShaardlaga(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const convertToBase64 = (e) => {
        const pdfFile = e.target.files[0];
        if (pdfFile.name.split(".").pop() === "pdf") {
            //Хэмжээ шалгах хэсэг
            const maxSize = 300 * 1024; // 300KB
            if (pdfFile.size > maxSize) {
                const mySize = pdfFile.size / 1024;
                const replaceSize = mySize.toString().replace(/\.\d+/, "");
                alert(
                    "Таны оруулсан файлын хэмжээ:" +
                        replaceSize +
                        "KБ байна." +
                        ".Файлын хэмжээ 300KБ-аас хэтэрсэн тул багасгах шаардлагатай."
                );
                return;
            }

            var reader = new FileReader();
            reader.readAsDataURL(pdfFile);
            reader.onload = () => {
                const pdfData = reader.result;
                setDocumentPdf(pdfData);
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
            <div className="modal" id="documentUserNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">БИЧИГ БАРИМТ НЭМЭХ</h4>
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
                                                Бичиг баримт:
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            {...register("documentItemID")}
                                            onChange={changeItem}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getDocumentItemID.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.documentName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="alerts">
                                        {errors.documentItemID?.message}
                                    </p>
                                </div>
                                <div className="row">
                                    <span>Тавигдах шаардлага:</span>
                                    <label>{getItemShaardlaga}</label>
                                </div>

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
                                            {errors.documentPdf?.message}
                                        </p> */}
                                </div>
                                <div className="row">
                                    <label>
                                        Файлын хэмжээ 300КБ-аас ихгүй байх
                                        шаардлагатай
                                    </label>
                                </div>
                                {/* <div className="row">
                                    <div className="col-md-9">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label
                                                    className="btn btn-primary"
                                                    onClick={openDocPDF}
                                                >
                                                    Бичиг баримтын PDF:
                                                </label>
                                            </div>

                                            <input
                                                {...register(
                                                    "documentPdf",
                                                    setValue(
                                                        "documentPdf",
                                                        getDocumentPdf
                                                    )
                                                )}
                                                value={getDocumentPdf}
                                                className="form-control"
                                                placeholder="Бичиг баримтын PDF..."
                                                disabled={true}
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.documentPdf?.message}
                                        </p>
                                    </div>
                                </div> */}
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

export default DocumentUserNew;
