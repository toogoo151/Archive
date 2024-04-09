import React, { useState, useEffect } from "react";
import ButtonShowModel from "../../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const UnitEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [comandlalID, setComandlalShortName] = useState("");
    const [unitShortName, setUnitShortName] = useState("");
    const [unitFullName, setUnitFullName] = useState("");
    const [unitNumber, setUnitNumber] = useState("");

    const [getDataRow, setDataRow] = useState([]);
    const [getComandlal, setComandlal] = useState([]);

    //const pattern = /^[A-Za-z]+$\s,-_/;
    // const pattern = /[`~a-w!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;

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

    const clickHandlerEditBtn = () => {
        if (props.getDataRowLenght > -1) {
            setComandlalShortName(props.changeDataRow.comandlalIDshuu);
            setUnitShortName(props.changeDataRow.unitShortName);
            setUnitFullName(props.changeDataRow.unitFullName);
            setUnitNumber(props.changeDataRow.unitNumber);
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
    const changeUnitFullName = (e) => {
        setUnitFullName(e.target.value);
    };
    const changeUnitNumber = (e) => {
        const re = /^[0-9\b]+$/;

        // if value is not blank, then test the regex

        if (e.target.value === "" || re.test(e.target.value)) {
            setUnitNumber(e.target.value);
        }

        // const text = e.target.value;

        // setUnitNumber(text.replace(pattern, ""));
        // text.replace(pattern, "");
        // console.log(text);
        // setUnitNumber(e.target.value.replace(pattern, ""));
        // text = text.replace(isCheckV, "");
        // setUnitNumber(e.target.value);
    };
    const saveUnit = () => {
        //const pattern = /^[^.\s]/;
        // const pattern = /^[A-Za-z]+$\s,-_/;

        if (comandlalID == "" || comandlalID == null) {
            Swal.fire("Командлал сонгоно уу.");
            return;
        }
        if (unitShortName == "" || unitShortName == null) {
            Swal.fire("Товч нэр оруулна уу.");
            return;
        }
        if (unitFullName == "" || unitFullName == null) {
            Swal.fire("Ангийн нэр оруулна уу.");
            return;
        }
        if (unitNumber == "" || unitNumber == null) {
            Swal.fire("Ангийн дугаар оруулна уу.");
            return;
        }

        axios
            .post("/edit/unit", {
                id: props.changeDataRow.id,
                comandlalID: comandlalID,
                unitShortName: unitShortName,
                unitFullName: unitFullName,
                unitNumber: unitNumber,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setComandlalShortName("");
                setUnitShortName("");
                setUnitFullName("");
                setUnitNumber("");
                setShowModal("");
                props.refreshUnit();
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
                dataTargetID={"#unitEdit"}
                spanIconClassName={"fas fa-solid fa-pen"}
                buttonName={"Засах"}
                clickHeaderOpenModal={clickHandlerEditBtn}
            />
            <div className="modal" id="unitEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Анги засах</h4>

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
                                            value={unitShortName}
                                            className="form-control"
                                            placeholder="Товч нэр..."
                                            onChange={changeUnitShortName}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 float-righ">
                                    <label className="float-right">
                                        Ангийн нэр:
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
                                            value={unitFullName}
                                            className="form-control"
                                            placeholder="Ангийн нэр..."
                                            onChange={changeUnitFullName}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 float-righ">
                                    <label className="float-right">
                                        Ангийн дугаар:
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
                                            value={unitNumber}
                                            className="form-control"
                                            placeholder="Ангийн дугаар..."
                                            onChange={changeUnitNumber}
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
                                onClick={saveUnit}
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

export default UnitEdit;
