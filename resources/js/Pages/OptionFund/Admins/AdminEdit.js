import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";

const AdminEdit = (props) => {
    const [showModal, setShowModal] = useState("");
    const [rankParentID, setRankParentID] = useState("");
    const [rankTypeID, setRankTypeID] = useState("");
    const [rankID, setRankID] = useState("");
    const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rd, setRD] = useState("");
    const [user_type, setUserTypeOld] = useState("");
    const [position, setPosition] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comandlal, setComandlal] = useState("");
    const [unit, setUnit] = useState("");

    const [getDataRow, setDataRow] = useState([]);
    const [getGenders, setGenders] = useState([]);
    const [getRankParents, setRankParents] = useState([]);
    const [getRankTypes, setRankTypes] = useState([]);
    const [getRanks, setRanks] = useState([]);
    const [comandlals, setComandlals] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        axios
            .post("/get/rankParent")
            .then((res) => {
                setRankParents(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .post("/get/gender/admin")
            .then((res) => {
                setGenders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .post("/get/comandlals")
            .then((res) => {
                setComandlals(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .post("/get/type/byParentID", {
                _rankParentID: rankParentID,
            })
            .then((res) => {
                setRankTypes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [rankParentID]);
    useEffect(() => {
        axios
            .post("/get/rank/byTypeID", {
                _rankTypeID: rankTypeID,
            })
            .then((res) => {
                setRanks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [rankTypeID]);

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
            setRankParentID(props.changeDataRow.rankParentID);
            setRankTypeID(props.changeDataRow.rankTypeID);
            setRankID(props.changeDataRow.rankID);
            setGender(props.changeDataRow.gender);
            setLastName(props.changeDataRow.lastName);
            setFirstName(props.changeDataRow.firstName);
            setRD(props.changeDataRow.rd);
            setUserTypeOld(props.changeDataRow.user_type);
            setPosition(props.changeDataRow.position);
            setPhone(props.changeDataRow.phone);
            setEmail(props.changeDataRow.email);
            setComandlal(props.changeDataRow.comandlalID);
            setUnit(props.changeDataRow.unitID);
            unitByID(props.changeDataRow.comandlalID);
            setShowModal("modal");
        } else {
            setShowModal("");
            Swal.fire("Засах мөр сонгоно уу");
        }
    };

    const saveUser = () => {
        const pattern = /^[^.\s]/;
        if (rankParentID == "" || rankParentID == null) {
            Swal.fire("Бүрэлдэхүүн сонгоно уу.");
            return;
        }
        if (rankTypeID == "" || rankTypeID == null) {
            Swal.fire("Цолны төрөл сонгоно уу.");
            return;
        }
        if (rankID == "" || rankID == null) {
            Swal.fire("Цол сонгоно уу.");
            return;
        }
        if (gender == "" || gender == null) {
            Swal.fire("Хүйс сонгоно уу.");
            return;
        }
        if (lastName == "" || lastName == null) {
            Swal.fire("Овог оруулна уу.");
            return;
        }
        if (firstName == "" || firstName == null) {
            Swal.fire("Нэр оруулна уу.");
            return;
        }
        if (rd == "" || rd == null) {
            Swal.fire("РД оруулна уу.");
            return;
        }
        if (user_type == "" || user_type == null) {
            Swal.fire("Эрх оруулна уу.");
            return;
        }

        if (phone == "" || phone == null) {
            Swal.fire("Утасны дугаар оруулна уу.");
            return;
        }
        if (!/[0-9]{8,}/.test(phone)) {
            Swal.fire("8 оронтой байх ёстой.");
            return;
        }

        if (email == "" || email == null) {
            Swal.fire("Цахим хаяг оруулна уу.");
            return;
        }
        if (unit == "" || unit == null) {
            Swal.fire("Анги сонгоно уу.");
            return;
        }
        axios
            .post("/edit/units", {
                id: props.changeDataRow.id,

                rankParentID: rankParentID,
                rankTypeID: rankTypeID,
                rankID: rankID,
                gender: gender,
                lastName: lastName,
                firstName: firstName,
                rd: rd,
                user_type: user_type,
                position: position,
                phone: phone,
                email: email,
                comandlal: comandlal,
                unit: unit,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setRankParentID("");
                setRankTypeID("0");
                setRankID("0");
                setGender("0");
                setLastName("");
                setFirstName("");
                setRD("");
                setUserTypeOld("");
                setPosition("");
                setPhone("");
                setEmail("");
                setComandlal("");
                setUnit("");
                setShowModal("");
                props.refreshUsers();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeGender = (e) => {
        setGender(e.target.value);
    };
    const changeRankParentID = (e) => {
        setRankParentID(e.target.value);
        setRankTypeID("0");
        setRankID("0");
    };
    const changeRankTypeID = (e) => {
        setRankTypeID(e.target.value);
        setRankID("0");
    };
    const changeRankID = (e) => {
        setRankID(e.target.value);
    };

    const changeLastName = (e) => {
        setLastName(e.target.value);
    };
    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const changeRD = (e) => {
        setRD(e.target.value);
    };
    const changeUsertype = (e) => {
        setUserTypeOld(e.target.value);
    };
    const changePosition = (e) => {
        setPosition(e.target.value);
    };
    const changePhone = (e) => {
        setPhone(e.target.value);
    };
    const changeEmail = (e) => {
        setEmail(e.target.value);
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
                dataTargetID={"#userEdit"}
                spanIconClassName={"fas fa-solid fa-pen"}
                buttonName={"Засах"}
                clickHeaderOpenModal={clickHandlerAdminEditBtn}
            />
            <div className="modal" id="userEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Засах</h4>

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
                                                Бүрэлдэхүүн:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            onChange={changeRankParentID}
                                            value={rankParentID}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            {getRankParents.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.rankParentName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Цолны төрөл:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            onChange={changeRankTypeID}
                                            value={rankTypeID}
                                        >
                                            <option value="0">
                                                Сонгоно уу
                                            </option>
                                            {getRankTypes.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.rankTypeName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Цол:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            onChange={changeRankID}
                                            value={rankID}
                                        >
                                            <option value="0">
                                                Сонгоно уу
                                            </option>
                                            {getRanks.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.rank}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Хүйс:
                                            </span>
                                        </div>
                                        <select
                                            className="form-control"
                                            onChange={changeGender}
                                            value={gender}
                                        >
                                            <option value="0">
                                                Сонгоно уу
                                            </option>
                                            {getGenders.map((el) => (
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.genderName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Овог:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeLastName}
                                            value={lastName}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Нэр:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeFirstName}
                                            value={firstName}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Регистрийн дугаар:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeRD}
                                            value={rd}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            {userType == "superAdmin" ||
                                            userType == "comandlalAdmin" ? (
                                                <span className="input-group-text">
                                                    Админий эрх:
                                                </span>
                                            ) : (
                                                <span className="input-group-text">
                                                    Эрх:
                                                </span>
                                            )}
                                        </div>
                                        {userType == "superAdmin" && (
                                            <select
                                                className="form-control"
                                                value={user_type}
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
                                            </select>
                                        )}
                                        {userType == "comandlalAdmin" && (
                                            <select
                                                className="form-control"
                                                value={user_type}
                                                onChange={changeUsertype}
                                            >
                                                <option value="unitAdmin">
                                                    ЗХ-ний анги байгууллага
                                                </option>
                                                <option value="unitUser">
                                                    Ангийн хэрэглэгч
                                                </option>
                                            </select>
                                        )}
                                        {userType == "unitAdmin" && (
                                            <select
                                                className="form-control"
                                                value={user_type}
                                                onChange={changeUsertype}
                                            >
                                                <option value="unitUser">
                                                    Ангийн хэрэглэгч
                                                </option>
                                            </select>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Албан тушаал:
                                            </span>
                                        </div>
                                        <textarea
                                            value={position}
                                            onChange={changePosition}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Утасны дугаар:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            value={phone}
                                            onChange={changePhone}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Цахим хаяг:
                                            </span>
                                        </div>
                                        <input
                                            value={email}
                                            onChange={changeEmail}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            {userType == "comandlalAdmin" ||
                                            userType == "unitAdmin" ? (
                                                <span className="input-group-text">
                                                    Командлал:{" "}
                                                </span>
                                            ) : (
                                                <span className="input-group-text">
                                                    Командлал сонгох:
                                                </span>
                                            )}
                                        </div>
                                        {userType == "comandlalAdmin" ||
                                        userType == "unitAdmin" ? (
                                            <select
                                                className="form-control"
                                                value={comandlal}
                                                onChange={changeComandlal}
                                                disabled={true}
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
                                        ) : (
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
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Анги сонгох:
                                            </span>
                                        </div>
                                        {userType == "unitAdmin" ? (
                                            <select
                                                className="form-control"
                                                value={unit}
                                                onChange={changeUnit}
                                                disabled={true}
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
                                        ) : (
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
                                        )}
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

export default AdminEdit;
