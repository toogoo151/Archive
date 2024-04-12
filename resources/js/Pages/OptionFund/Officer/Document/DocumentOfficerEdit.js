import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const DocumentOfficerEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [getDocumentItemID, setDocumentItemID] = useState([]);
    const [getItemShaardlaga, setItemShaardlaga] = useState([]);

    const [documentItemID, setDocumentItem] = useState("");
    const [documentPdf, setDocumentPdf] = useState("");
    const [getPdfName, setPdfName] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        fn_docItems(props.missionID, props.eeljID);
    }, []);

    const fn_docItems = (missionID, eeljID) => {
        axios
            .post("/get/doc/items", {
                _missionID: missionID,
                _eeljID: eeljID,
            })
            .then((res) => {
                setDocumentItemID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setDocumentItem(props.changeDataRow.documentItemID);
            setDocumentPdf(props.changeDataRow.documentPdf);
            setItemShaardlaga(props.changeDataRow.documentShaardlaga);
        }
        fn_docItems(props.missionID, props.eeljID);
    }, [props.isEditBtnClick]);

    const saveDocUnit = () => {
        if (documentItemID == "" || documentItemID == null) {
            Swal.fire("Бичиг баримт сонгоно уу.");
            return;
        }
        if (documentPdf == "" || documentPdf == null) {
            Swal.fire("PDF оруулна уу.");
            return;
        }

        axios
            .post("/edit/document/child", {
                id: props.changeDataRow.id,
                missionID: props.missionID,
                eeljID: props.eeljID,
                pkoMainHistoryID: props.getMainHistoryID,
                documentItemID: documentItemID,
                documentPdf: documentPdf,
                pdfName: getPdfName,
            })
            .then((res) => {
                props.setRowsSelected([]);
                fileInputRef.current.value = null;
                Swal.fire(res.data.msg);
                props.refreshDocUser(props.missionID, props.eeljID);
                setDocumentItem("");
                setDocumentPdf("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeDocItem = (e) => {
        setDocumentItem(e.target.value);
        setDocumentPdf("");
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
    const changePdf = (e) => {
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
            <div className="modal" id="documentOfficerEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">БИЧИГ БАРИМТ ЗАСАХ</h4>
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
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Бичиг баримт:
                                        </span>
                                    </div>

                                    <select
                                        className="form-control"
                                        value={documentItemID}
                                        onChange={changeDocItem}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getDocumentItemID.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.documentName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <span>Тавигдах шаардлага:</span>
                                <label>{getItemShaardlaga}</label>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    {/* <div className="input-group-prepend">
                                            <label
                                                className="btn btn-primary"
                                                onClick={openDocPDF}
                                            >
                                                Бичиг баримтын PDF:
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
                                        value={documentPdf ? documentPdf : ""}
                                        readOnly
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <label>
                                    Файлын хэмжээ 300КБ-аас ихгүй байх
                                    шаардлагатай
                                </label>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveDocUnit}
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

export default DocumentOfficerEdit;
