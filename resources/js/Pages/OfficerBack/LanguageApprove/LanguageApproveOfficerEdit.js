import React, { useState, useEffect, useContext, useRef} from "react";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";
const LanguageApproveOfficerEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [readCol, setReadcol] = useState("");
    const [writeCol, setWriteCol] = useState("");
    const [listenCol, setListencol] = useState("");
    const [speakCol, setSpeakCol] = useState("");
    const [alcpt, setAlcpt] = useState("");
    const [documentPdf, setDocumentPdf] = useState("");

    const fileInputRef = useRef(null);


    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setReadcol(props.changeDataRow.readCol);
            setWriteCol(props.changeDataRow.writeCol);
            setListencol(props.changeDataRow.listenCol);
            setSpeakCol(props.changeDataRow.speakCol);
            setAlcpt(props.changeDataRow.alcpt);
            setDocumentPdf(props.changeDataRow.documentPdf);


        }
    }, [props.isEditBtnClick]);

    const savelanguage = () => {
        props.setRowsSelected([]);
        if (readCol == "" || readCol == null) {
            Swal.fire("Уншсан оноо оруулна уу.");
            return;
        }
           if (writeCol == "" || writeCol == null) {
            Swal.fire("Бичсэн оноо оруулна уу.");
            return;
           }
            if (listenCol == "" || listenCol == null) {
            Swal.fire("Сонсгол оноо оруулна уу.");
            return;
            }
            if (speakCol == "" || speakCol == null) {
            Swal.fire("Ярьсан оноо оруулна уу.");
            return;
            }


        axios
            .post("/edit/officer/language", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                readCol: readCol,
                writeCol: writeCol,
                listenCol: listenCol,
                speakCol: speakCol,
                alcpt: alcpt,
                documentPdf:documentPdf,

            })
            .then((res) => {
                fileInputRef.current.value = null;
                Swal.fire(res.data.msg);
                setReadcol("");
                setWriteCol("");
                setShowModal("");
                setListencol("");
                setSpeakCol("");
                setAlcpt("");

                props.refreshLanguage(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeSignal = (e) => {
        setReadcol(e.target.value);
    };
    const changeLocationScore = (e) => {
        setWriteCol(e.target.value);
    };
      const changeListenScore = (e) => {
        setListencol(e.target.value);
      };
      const changeSpeakScore = (e) => {
        setSpeakCol(e.target.value);
      };
      const changeALCPT = (e) => {
        setAlcpt(e.target.value);
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
            <div className="modal" id="languageApproveOfficerEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Англи хэл</h4>

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
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                    Унших чадвар:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeSignal}
                                            value={readCol}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                               Сонсох чадвар:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeListenScore}
                                            value={listenCol}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                            Бичих чадвар:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeLocationScore}
                                            value={writeCol}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">

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

                                    {/* <p className="alerts">
                                            {errors.documentPdf?.message}
                                        </p> */}
                                </div>


                                  <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                               Ярих чадвар :
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeSpeakScore}
                                            value={speakCol}
                                        />
                                    </div>
                                </div>
                                  <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                               ALCPT оноо:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeALCPT}
                                            value={alcpt}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={savelanguage}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default LanguageApproveOfficerEdit;
