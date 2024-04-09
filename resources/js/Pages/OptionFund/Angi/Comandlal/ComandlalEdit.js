import React, { useState } from "react";
import ButtonShowModel from "../../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const ComandlalEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [shortName, setShortName] = useState("");
    const [fullName, setFullName] = useState("");
    const clickHandlerEditBtn = () => {
        if (props.getDataRowLenght > -1) {
            setShortName(props.changeDataRow.comandlalShortName);
            setFullName(props.changeDataRow.comandlalName);
            setShowModal("modal");
        } else {
            setShowModal("");
            Swal.fire("Засах мөр сонгоно уу");
        }
    };
    const changeShortName = (e) => {
        setShortName(e.target.value);
    };
    const changeFullName = (e) => {
        setFullName(e.target.value);
    };
    const saveComandlal = () => {
        if (shortName == "" || shortName == null) {
            Swal.fire("Товч нэр оруулна уу.");
            return;
        }
        if (fullName == "" || fullName == null) {
            Swal.fire("Командлалын нэр оруулна уу.");
            return;
        }

        axios
            .post("/edit/comandlal", {
                id: props.changeDataRow.id,
                shortName: shortName,
                fullName: fullName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setShortName("");
                setFullName("");
                setShowModal("");
                props.refreshComandlal();
            });
    };
    return (
        <>
            {/* modal */}
            <ButtonShowModel
                btnClassName={"btn btn-warning"}
                modelType={showModal}
                dataTargetID={"#comandlalEdit"}
                spanIconClassName={"fas fa-solid fa-pen"}
                buttonName={"Засах"}
                clickHeaderOpenModal={clickHandlerEditBtn}
            />
            <div className="modal" id="comandlalEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Командлал засах</h4>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>
                        {/* Modal body */}
                        {/* onSubmit={handleSubmit(onSubmit)} */}

                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-3 float-righ">
                                    <label className="float-right">
                                        Товч нэр:
                                    </label>
                                </div>
                                <div className="col-md-9">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-university"></i>
                                            </span>
                                        </div>
                                        <input
                                            value={shortName}
                                            className="form-control"
                                            placeholder="Товч нэр..."
                                            onChange={changeShortName}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 float-righ">
                                    <label className="float-right">
                                        Командлалын нэр:
                                    </label>
                                </div>
                                <div className="col-md-9">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fa fa-university"></i>
                                            </span>
                                        </div>
                                        <input
                                            value={fullName}
                                            className="form-control"
                                            placeholder="Командлалын нэр..."
                                            onChange={changeFullName}
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
                                onClick={saveComandlal}
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

export default ComandlalEdit;
