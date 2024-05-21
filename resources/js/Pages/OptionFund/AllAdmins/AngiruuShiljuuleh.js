import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";

const AngiruuShiljuuleh = (props) => {
    const [showModal, setShowModal] = useState("");

    const [userTypeOld, setUserTypeOld] = useState("");
    const [comandlal, setComandlal] = useState("");
    const [unit, setUnit] = useState("");

    const [getDataRow, setDataRow] = useState([]);
    const [comandlals, setComandlals] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        axios
            .post("/get/comandlals")
            .then((res) => {
                setComandlals(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const unitByID = (userComandlalID) => {
        axios
            .post("/get/unit/byComandlalID", {
                id: userComandlalID,
            })
            .then((res) => {
                setUnits(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    const clickHandlerAdminEditBtn = () => {
        if (props.getDataRowLenght > -1) {
            // setUserTypeOld(props.changeDataRow.userTypeOld);
            setComandlal(props.changeDataRow.comandlalID);
            setUnit(props.changeDataRow.unitID);
            unitByID(props.changeDataRow.comandlalID);
            setShowModal("modal");
        } else {
            setShowModal("");
            Swal.fire("Шилжүүлэх мөр сонгоно уу");
        }
    };

    const saveUser = () => {
        const pattern = /^[^.\s]/;

        // if (userTypeOld == "" || userTypeOld == null) {
        //     Swal.fire("Эрх оруулна уу.");
        //     return;
        // }

        if (comandlal == "" || comandlal == null) {
            Swal.fire("Командлал сонгоно уу.");
            return;
        }

        if (unit == "" || unit == null) {
            Swal.fire("Анги сонгоно уу.");
            return;
        }
        axios
            .post("/angiruu/shiljuuleh", {
                id: props.changeDataRow.id,
                // userTypeOld: userTypeOld,
                comandlal: comandlal,
                unit: unit,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                // setUserTypeOld("");
                setComandlal("");
                setUnit("");
                setShowModal("");
                props.refreshUsers();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeUsertype = (e) => {
        setUserTypeOld(e.target.value);
    };
    const changeUnit = (e) => {
        setUnit(e.target.value);
    };
    const changeComandlal = (e) => {
        setComandlal(e.target.value);
        unitByID(e.target.value);
    };

    return (
        <>
            {/* modal */}
            <ButtonShowModel
                btnClassName={"btn btn-warning"}
                modelType={showModal}
                dataTargetID={"#angiruuShiljuuleh"}
                spanIconClassName={"fas fa-solid fa-pen"}
                buttonName={"Шилжүүлэх"}
                clickHeaderOpenModal={clickHandlerAdminEditBtn}
            />
            <div className="modal" id="angiruuShiljuuleh">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Шилжүүлэх</h4>

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
                                {/* <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Админий эрх:
                                            </span>
                                        </div>
                                        {userType == "superAdmin" ? (
                                            <select
                                                className="form-control"
                                                value={userTypeOld}
                                                onChange={changeUsertype}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                <option value="superAdmin">
                                                    Энхийг дэмжих цэргийн хамтын
                                                    ажиллагааны хэлтэс
                                                </option>
                                                <option value="comandlalAdmin">
                                                    Төрлийн цэрэг
                                                </option>
                                                <option value="unitAdmin">
                                                    ЗХ-ний анги байгууллага
                                                </option>
                                                <option value="unitUser">
                                                    Ангийн хэрэглэгч
                                                </option>
                                            </select>
                                        ) : (
                                            <select
                                                className="form-control"
                                                value={userTypeOld}
                                                onChange={changeUsertype}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                <option value="comandlalAdmin">
                                                    Төрлийн цэрэг
                                                </option>
                                                <option value="unitAdmin">
                                                    ЗХ-ний анги байгууллага
                                                </option>
                                                <option value="unitUser">
                                                    Ангийн хэрэглэгч
                                                </option>
                                            </select>
                                        )}
                                    </div>
                                </div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Командлал сонгох:
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            value={comandlal}
                                            onChange={changeComandlal}
                                        >
                                            <option value="">
                                                Командлал сонгоно уу
                                            </option>
                                            {comandlals.map((el) => (
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
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Анги сонгох:
                                            </span>
                                        </div>

                                        <select
                                            className="form-control"
                                            value={unit}
                                            onChange={changeUnit}
                                        >
                                            <option value="">
                                                Анги сонгоно уу
                                            </option>
                                            {units.map((el) => (
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
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveUser}
                            >
                                Шилжүүлэх
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

export default AngiruuShiljuuleh;
