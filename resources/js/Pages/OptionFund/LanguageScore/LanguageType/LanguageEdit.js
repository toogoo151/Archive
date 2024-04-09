import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const LanguageEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [languageName, setLanguageName] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);
    useEffect(() => {
        if (props.isEditBtnClick) {
            setLanguageName(props.changeDataRow.languageName);
        }
    }, [props.isEditBtnClick]);

    const saveLanguage = () => {
        props.setRowsSelected([]);
        if (languageName == "" || languageName == null) {
            Swal.fire("Гадаад хэлний нэр оруулна уу.");
            return;
        }

        axios
            .post("/edit/language/type", {
                id: props.changeDataRow.id,

                languageName: languageName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setLanguageName("");
                setShowModal("");

                props.refreshLanguage();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeLanguageName = (e) => {
        setLanguageName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="languageEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ГАДААД ХЭЛНИЙ НЭР ЗАСАХ
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
                                            Гадаад хэлний нэр:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeLanguageName}
                                        value={languageName}
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
                                onClick={saveLanguage}
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

export default LanguageEdit;
