import React, { useState, useEffect, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
const DocItemEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    // const [missionID, setMissionID] = useState("");
    // const [eeljID, setEeljID] = useState("");
    const [documentName, setDocumentName] = useState("");
    const [documentShaardlaga, setDocumentShaardlaga] = useState("");
    const [documentZagvar, setZagvarPdf] = useState("");
    const [getPdfName, setPdfName] = useState("");
    const fileInputRef = useRef(null);

    // const [getMissions, setMissions] = useState([]);
    // const [getEelj, setEeljs] = useState([]);
    const [getDataRow, setDataRow] = useState([]);

    // const newWindow = useRef(window);
    // const openZagvarPDF = () => {
    //     newWindow.current = window.open(
    //         "/laravel-filemanager",
    //         "",
    //         "width=1200,height=800,left=300,top=80"
    //     );
    //     window.SetUrl = (url, width, height, alt) => {
    //         setZagvarPdf(url[0].url);
    //     };
    // };

    // useEffect(() => {
    //     axios
    //         .get("/get/missions")
    //         .then((res) => {
    //             setMissions(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    // useEffect(() => {
    //     axios
    //         .post("/get/eelj/by/missionID", {
    //             _missionID: missionID,
    //         })
    //         .then((res) => {
    //             setEeljs(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [missionID]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            // setMissionID(props.changeDataRow.missionID);
            // setEeljID(props.changeDataRow.eeljID);
            setDocumentName(props.changeDataRow.documentName);
            setDocumentShaardlaga(props.changeDataRow.documentShaardlaga);
            setZagvarPdf(props.changeDataRow.documentZagvar);
        }
    }, [props.isEditBtnClick]);

    const saveDocItem = () => {
        props.setRowsSelected([]);
        // if (missionID == "" || missionID == null) {
        //     Swal.fire("Ажиллагааны нэр сонгоно уу.");
        //     return;
        // }
        // if (eeljID == "" || eeljID == null) {
        //     Swal.fire("Ээлж сонгоно уу.");
        //     return;
        // }
        if (documentName == "" || documentName == null) {
            Swal.fire("Бичиг баримтын нэр оруулна уу.");
            return;
        }
        // if (documentShaardlaga == "" || documentShaardlaga == null) {
        //     Swal.fire("Бичиг баримтад тавигдах шаардлагыг оруулна уу.");
        //     return;
        // }

        axios
            .post("/edit/doc/item", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                documentName: documentName,
                documentShaardlaga: documentShaardlaga,
                documentZagvar: documentZagvar,
                pdfName: getPdfName,
            })
            .then((res) => {
                fileInputRef.current.value = null;
                Swal.fire(res.data.msg);
                // setMissionID("");
                // setEeljID("");
                setDocumentName("");
                setDocumentShaardlaga("");
                setZagvarPdf("");
                setShowModal("");

                props.refreshDocItem(state.getMissionRowID, state.getEeljRowID);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changePdf = (e) => {
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
                setZagvarPdf(pdfData);
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
    //     setMissionID(e.target.value);
    //     setEeljID("0");
    // };
    // const changeEelj = (e) => {
    //     setEeljID(e.target.value);
    // };
    const changeDocItemName = (e) => {
        setDocumentName(e.target.value);
    };
    const changeDocShaardlaga = (e) => {
        setDocumentShaardlaga(e.target.value);
    };
    // const changeZagvar = (e) => {
    //     setZagvarPdf(e.target.value);
    // };

    return (
        <>
            <div className="modal" id="docItemEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                БИЧИГ БАРИМТЫН ТӨРӨЛ ЗАСАХ
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
                            {/* <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ажиллагааны нэр:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeMission}
                                        value={missionID}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getMissions.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.missionName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
                                        onChange={changeEelj}
                                        value={eeljID}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getEelj.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.eeljName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Бичиг баримтын нэр:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeDocItemName}
                                        value={documentName}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Бичиг баримтад тавигдах шаардлага:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeDocShaardlaga}
                                        value={documentShaardlaga}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
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
                                            value={
                                                documentZagvar
                                                    ? documentZagvar
                                                    : ""
                                            }
                                            readOnly
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
                                        value={documentZagvar}
                                        className="form-control"
                                        // placeholder="Эрүүл мэндийн хуудасны PDF..."
                                        onChange={changeZagvar}
                                        disabled={true}
                                    /> */}
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
                                onClick={saveDocItem}
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

export default DocItemEdit;
