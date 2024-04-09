import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const DocumentUnitChildNew = (props) => {
    const state = useContext(AppContext);
    const [getDocumentItemID, setDocumentItemID] = useState([]);
    const [getDocumentPdf, setDocumentPdf] = useState([null]);

    useEffect(() => {
        axios
            .post("/get/doc/items", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
            })
            .then((res) => {
                setDocumentItemID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
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

    const formSchema = Yup.object().shape({
        documentItemID: Yup.string().required("Бичиг баримт сонгоно уу."),
        documentPdf: Yup.string().required("PDF оруулна уу."),
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
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                pkoMainHistoryID: props.clickParentRowID,
                documentItemID: data.documentItemID,
                documentPdf: data.documentPdf,
            })
            .then((res) => {
                setDocumentPdf("");
                Swal.fire(res.data.msg);
                reset(
                    {
                        pkoMainHistoryID: "0",
                        documentItemID: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshDocUnitChild(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.clickParentRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <div className="modal" id="documentChildNew">
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
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Бичиг баримт:
                                                </span>
                                            </div>

                                            <select
                                                className="form-control"
                                                {...register("documentItemID")}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
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

export default DocumentUnitChildNew;
