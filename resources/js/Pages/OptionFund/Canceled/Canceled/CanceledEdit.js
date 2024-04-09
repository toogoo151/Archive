import React, { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const CanceledEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    const [getDataRow, setDataRow] = useState([]);
    const [getTypeID, setTypeID] = useState([]);

    const [pkoCanceledTypeID, setPkoCanceledTypeID] = useState("");
    const [canceledPdf, setCanceledPdf] = useState("");
    const [canceledDescription, setCanceledDescription] = useState("");

    useEffect(() => {
        fn_canceledType();
    }, []);

    const fn_canceledType = () => {
        axios
            .get("/get/canceled/types")
            .then((res) => {
                setTypeID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const newWindow = useRef(window);
    const openCanceledPDF = () => {
        newWindow.current = window.open(
            "/laravel-filemanager",
            "",
            "width=1200,height=800,left=300,top=80"
        );
        window.SetUrl = (url, width, height, alt) => {
            setCanceledPdf(url[0].url);
        };
    };

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setPkoCanceledTypeID(props.changeDataRow.pkoCanceledTypeID);
            setCanceledPdf(props.changeDataRow.canceledPdf);
            setCanceledDescription(props.changeDataRow.canceledDescription);
        }
    }, [props.isEditBtnClick]);

    const saveHealth = () => {
        if (canceledPdf == "" || canceledPdf == null) {
            Swal.fire("PDF оруулна уу.");
            return;
        }
        if (pkoCanceledTypeID == "" || pkoCanceledTypeID == null) {
            Swal.fire("Шалтгаан сонгоно уу.");
            return;
        }

        axios
            .post("/edit/canceled/child", {
                id: props.changeDataRow.id,
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                pkoCanceledTypeID: pkoCanceledTypeID,
                canceledPdf: canceledPdf,
                canceledDescription: canceledDescription,
            })
            .then((res) => {
                props.setRowsSelected([]);
                Swal.fire(res.data.msg);
                props.refreshCanceledChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
                setPkoCanceledTypeID("");
                setCanceledPdf("");
                setCanceledDescription("");
                setShowModal("");
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeType = (e) => {
        setPkoCanceledTypeID(e.target.value);
    };

    const changePdf = (e) => {
        setCanceledPdf(e.target.value);
    };

    const changeDescription = (e) => {
        setCanceledDescription(e.target.value);
    };

    return (
        <>
            <div className="modal" id="canceledChildEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ТАТГАЛЗСАН МЭДЭЭЛЭЛ ЗАСАХ
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
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Шалтгаан:
                                        </span>
                                    </div>

                                    <select
                                        className="form-control"
                                        value={pkoCanceledTypeID}
                                        onChange={changeType}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getTypeID.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.canceledTypeName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <label
                                            className="btn btn-primary"
                                            onClick={openCanceledPDF}
                                        >
                                            Татгалзсан шалтгааны PDF:
                                        </label>
                                    </div>

                                    <input
                                        value={canceledPdf}
                                        className="form-control"
                                        placeholder="Татгалзсан шалтгааны PDF..."
                                        onChange={changePdf}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Тайлбар:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        value={canceledDescription}
                                        onChange={changeDescription}
                                    />
                                </div>
                            </div>
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

export default CanceledEdit;
