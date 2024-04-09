import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";

const HealthEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [healthPdf, setHealthPdf] = useState("");
    const [healthApprove, setHealthApprove] = useState("");
    const [mydescription, description] = useState("");

    const [getDescription, setDescription] = useState(0);
    const [getPdfName, setPdfName] = useState("");
    const fileInputRef = useRef(null);

    // const newWindow = useRef(window);
    // const openHealthPDF = () => {
    //     newWindow.current = window.open(
    //         "/laravel-filemanager",
    //         "",
    //         "width=1200,height=800,left=300,top=80"
    //     );
    //     window.SetUrl = (url, width, height, alt) => {
    //         setHealthPdf(url[0].url);
    //     };
    // };

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setHealthPdf(props.changeDataRow.healthPdf);
            setHealthApprove(props.changeDataRow.healthApprove);
            description(props.changeDataRow.healthDescription);
        }
    }, [props.isEditBtnClick]);

    const saveHealth = () => {
        if (healthPdf == "" || healthPdf == null) {
            Swal.fire("PDF оруулна уу.");
            return;
        }
        if (healthApprove == "" || healthApprove == null) {
            Swal.fire("Шийдвэр оруулна уу.");
            return;
        }

        axios
            .post("/edit/health/child", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                healthPdf: healthPdf,
                pdfName: getPdfName,
                healthApprove: healthApprove,
                healthDescription: mydescription,
            })
            .then((res) => {
                props.setRowsSelected([]);
                fileInputRef.current.value = null;
                Swal.fire(res.data.msg);
                props.refreshHealthChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
                setHealthPdf("");
                setHealthApprove("");
                description("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeIsApprove = (e) => {
        setHealthApprove(e.target.value);
        setDescription(e.target.value);
    };
    const changeDes = (e) => {
        description(e.target.value);
    };

    const changePdf = (e) => {
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
            <div className="modal" id="healthChildEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ЭРҮҮЛ МЭНДИЙН ҮЗЛЭГИЙН МЭДЭЭЛЭЛ ЗАСАХ
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="row">
                                <div className="input-group mb-3">
                                    {/* <div className="input-group-prepend">
                                        <label
                                            className="btn btn-primary"
                                            onClick={openHealthPDF}
                                        >
                                            Эрүүл мэндийн хуудасны PDF:
                                        </label>
                                    </div> */}
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={changePdf}
                                        ref={fileInputRef}
                                        className="form-control"
                                    />
                                    <input
                                        type="text"
                                        value={healthPdf ? healthPdf : ""}
                                        readOnly
                                        className="form-control"
                                    />

                                    {/* <input
                                        value={healthPdf}
                                        className="form-control"
                                        placeholder="Эрүүл мэндийн хуудасны PDF..."
                                        onChange={changePdf}
                                        disabled={true}
                                    /> */}
                                </div>
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
                                        value={healthApprove}
                                        onChange={changeIsApprove}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        <option value="1">Тэнцсэн</option>
                                        <option value="2">Тэнцээгүй</option>
                                    </select>
                                </div>
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
                                            value={mydescription}
                                            onChange={changeDes}
                                        ></textarea>
                                    </div>
                                </div>
                            )}

                            <p>
                                Та нэг удаа засах эрхтэй. Буруу мэдээлэл
                                оруулсан тохиолдолд дахин засах боломжгүйг
                                анхаарна уу!!!
                            </p>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveHealth}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default HealthEdit;
