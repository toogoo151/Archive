import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const DocumentUnitEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);

    const [getDocumentItemID, setDocumentItemID] = useState([]);

    const [documentItemID, setDocumentItem] = useState("");
    const [documentPdf, setDocumentPdf] = useState("");

    useEffect(() => {
        fn_docItems(state.getMissionRowID, state.getEeljRowID);
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

    const newWindow = useRef(window);
    const openDocPDF = () => {
        newWindow.current = window.open(
            "/laravel-filemanager",
            "",
            "width=1200,height=800,left=300,top=80"
        );
        window.SetUrl = (url, width, height, alt) => {
            setDocumentPdf(url[0].url);
        };
    };

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setDocumentItem(props.changeDataRow.documentItemID);
            setDocumentPdf(props.changeDataRow.documentPdf);
        }
        fn_docItems(state.getMissionRowID, state.getEeljRowID);
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
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                documentItemID: documentItemID,
                documentPdf: documentPdf,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshDocUnitChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
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
    };
    const changePdf = (e) => {
        setDocumentPdf(e.target.value);
    };

    return (
        <>
            <div className="modal" id="documentChildEdit">
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
                                <div className="col-md-6">
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
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.documentName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
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
                                            value={documentPdf}
                                            className="form-control"
                                            placeholder="Бичиг баримтын PDF..."
                                            onChange={changePdf}
                                            disabled={true}
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

export default DocumentUnitEdit;
