import React, { useState, useEffect } from "react";
import ButtonShowModel from "../../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const UnitSubEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [comandlalID, setComandlalShortName] = useState("");
    const [unitID, setUnitShortName] = useState("");
    const [unitSubShortName, setUnitSubShortName] = useState("");
    const [unitSubFullName, setUnitSubFullName] = useState("");
    const [unitSubNumber, setUnitSubNumber] = useState("");

    const [getDataRow, setDataRow] = useState([]);
    const [getComandlal, setComandlal] = useState([]);
    const [getUnits, setUnit] = useState([]);

    useEffect(() => {
        axios
            .get("/get/comandlal")
            .then((res) => {
                setComandlal(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        axios
            .post("/get/unit/byComandlalID", {
                id: comandlalID,
            })
            .then((res) => {
                setUnit(res.data);
            });
    }, [comandlalID]);

    const clickHandlerEditBtn = () => {
        if (props.getDataRowLenght > -1) {
            setComandlalShortName(props.changeDataRow.comandlalIDshuu);
            setUnitShortName(props.changeDataRow.unitIDshuu);
            setUnitSubShortName(props.changeDataRow.unitSubShortName);
            setUnitSubFullName(props.changeDataRow.unitSubFullName);
            setUnitSubNumber(props.changeDataRow.unitSubNumber);
            setShowModal("modal");
        } else {
            setShowModal("");
            Swal.fire("Засах мөр сонгоно уу");
        }
    };
    const changeComandlalShortName = (e) => {
        setComandlalShortName(e.target.value);
    };
    const changeUnitShortName = (e) => {
        setUnitShortName(e.target.value);
    };
    const changeUnitSubShortName = (e) => {
        setUnitSubShortName(e.target.value);
    };
    const changeUnitSubFullName = (e) => {
        setUnitSubFullName(e.target.value);
    };
    const changeUnitSubNumber = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
            setUnitSubNumber(e.target.value);
        }
        //setUnitSubNumber(e.target.value);
    };
    const saveUnitSub = () => {
        //const pattern = /^[^.\s]/;
        // const pattern = /^[A-Za-z]+$\s/;

        if (comandlalID == "" || comandlalID == null) {
            Swal.fire("Командлал сонгоно уу.");
            return;
        }
        if (unitID == "" || unitID == null) {
            Swal.fire("Анги сонгоно уу.");
            return;
        }
        if (unitSubShortName == "" || unitSubShortName == null) {
            Swal.fire("Салбарын товч нэр оруулна уу.");
            return;
        }
        if (unitSubFullName == "" || unitSubFullName == null) {
            Swal.fire("Салбарын нэр оруулна уу.");
            return;
        }
        if (unitSubNumber == "" || unitSubNumber == null) {
            Swal.fire("Салбарын дугаар оруулна уу.");
            return;
        }

        axios
            .post("/edit/unitSub", {
                id: props.changeDataRow.id,
                comandlalID: comandlalID,
                unitID: unitID,
                unitSubShortName: unitSubShortName,
                unitSubFullName: unitSubFullName,
                unitSubNumber: unitSubNumber,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setComandlalShortName("");
                setUnitShortName("");
                setUnitSubShortName("");
                setUnitSubFullName("");
                setUnitSubNumber("");
                setShowModal("");
                props.refreshUnitSub();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            {/* modal */}
            <ButtonShowModel
                btnClassName={"btn btn-warning"}
                modelType={showModal}
                dataTargetID={"#unitSubEdit"}
                spanIconClassName={"fas fa-solid fa-pen"}
                buttonName={"Засах"}
                clickHeaderOpenModal={clickHandlerEditBtn}
            />
            <div className="modal" id="unitSubEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Салбар засах</h4>

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
                                <div className="col-md-3 float-righ">
                                    <label className="float-right">
                                        Командлал:
                                    </label>
                                </div>
                                <div className="col-md-9">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-star"></i>
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            onChange={changeComandlalShortName}
                                        >
                                            <option
                                                value={
                                                    getDataRow.comandlalIDshuu
                                                }
                                            >
                                                {getDataRow.comandlalShortName}
                                            </option>
                                            <option value="-1">
                                                Сонгоно уу
                                            </option>
                                            {getComandlal.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.comandlalShortName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-3 float-righ">
                                    <label className="float-right">Анги:</label>
                                </div>
                                <div className="col-md-9">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-star"></i>
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            onChange={changeUnitShortName}
                                            value={unitID}
                                        >
                                            <option value="">
                                                Сонголт өөрчлөх
                                            </option>
                                            {getUnits.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.unitShortName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

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
                                                <i className="fas fa-star"></i>
                                            </span>
                                        </div>
                                        <input
                                            value={unitSubShortName}
                                            className="form-control"
                                            placeholder="Товч нэр..."
                                            onChange={changeUnitSubShortName}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 float-righ">
                                    <label className="float-right">
                                        Салбарын нэр:
                                    </label>
                                </div>
                                <div className="col-md-9">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-star"></i>
                                            </span>
                                        </div>
                                        <input
                                            value={unitSubFullName}
                                            className="form-control"
                                            placeholder="Салбарын нэр..."
                                            onChange={changeUnitSubFullName}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 float-righ">
                                    <label className="float-right">
                                        Салбарын дугаар:
                                    </label>
                                </div>
                                <div className="col-md-9">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <i className="fas fa-star"></i>
                                            </span>
                                        </div>
                                        <input
                                            value={unitSubNumber}
                                            className="form-control"
                                            placeholder="Салбарын дугаар..."
                                            onChange={changeUnitSubNumber}
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
                                onClick={saveUnitSub}
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

export default UnitSubEdit;
