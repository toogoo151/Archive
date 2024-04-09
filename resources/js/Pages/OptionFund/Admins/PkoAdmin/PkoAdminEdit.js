import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import InputMask from "react-input-mask";

const PkoAdminEdit = (props) => {
    const firstLetter = /(?!.*[DFIOQU])[A-VXY]/i;
    const letter = /(?!.*[DFIOQU])[А-Я]/i;
    const digit = /[0-9]/;
    const mask = [
        letter,
        letter,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
        digit,
    ];
    const phoneMask = [digit, digit, digit, digit, digit, digit, digit, digit];

    const [showModal, setShowModal] = useState("");
    const [rankParentID, setRankParentID] = useState("");
    const [rankTypeID, setRankTypeID] = useState("");
    const [rankID, setRankID] = useState("");
    const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rd, setRD] = useState("");
    const [age, setAge] = useState("");
    const [user_type, setUserTypeOld] = useState("");
    const [position, setPosition] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comandlal, setComandlal] = useState("");
    const [unit, setUnit] = useState("");
    const [pkoImage, setPkoImage] = useState("");
    const [foreignPass, setForeignPass] = useState("");
    const [foreignFinishDate, setForeignDate] = useState("");

    const [getDataRow, setDataRow] = useState([]);
    const [getGenders, setGenders] = useState([]);
    const [getRankParents, setRankParents] = useState([]);
    const [getRankTypes, setRankTypes] = useState([]);
    const [getRanks, setRanks] = useState([]);
    const [comandlals, setComandlals] = useState([]);
    const [units, setUnits] = useState([]);
    const fileInputRef = useRef(null);

    // const newWindow = useRef(window);
    // const openImage = () => {
    //     newWindow.current = window.open(
    //         "/laravel-filemanager",
    //         "",
    //         "width=1200,height=800,left=300,top=80"
    //     );
    //     window.SetUrl = (url, width, height, alt) => {
    //         setPkoImage(url[0].url);
    //     };
    // };

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
    useEffect(() => {
        if (props.isEditBtnClick) {
            setRankParentID(props.changeDataRow.rankParentID);
            setRankTypeID(props.changeDataRow.rankTypeID);
            setRankID(props.changeDataRow.rankID);
            setGender(
                props.changeDataRow.gender != null
                    ? props.changeDataRow.gender
                    : ""
            );
            setLastName(
                props.changeDataRow.lastName != null
                    ? props.changeDataRow.lastName
                    : ""
            );
            setFirstName(
                props.changeDataRow.firstName != null
                    ? props.changeDataRow.firstName
                    : ""
            );
            setRD(props.changeDataRow.rd != null ? props.changeDataRow.rd : "");
            setAge(
                props.changeDataRow.age != null ? props.changeDataRow.age : ""
            );
            setUserTypeOld(
                props.changeDataRow.user_type != null
                    ? props.changeDataRow.user_type
                    : ""
            );
            setPosition(
                props.changeDataRow.position != null
                    ? props.changeDataRow.position
                    : ""
            );
            setPkoImage(
                props.changeDataRow.image != 0 ? props.changeDataRow.image : ""
            );
            setForeignPass(
                props.changeDataRow.foreignPass != null
                    ? props.changeDataRow.foreignPass
                    : ""
            );
            setForeignDate(
                props.changeDataRow.foreignFinishDate != null
                    ? props.changeDataRow.foreignFinishDate
                    : ""
            );
            setPhone(
                props.changeDataRow.phone != null
                    ? props.changeDataRow.phone
                    : ""
            );
            setEmail(
                props.changeDataRow.email != null
                    ? props.changeDataRow.email
                    : ""
            );
            setComandlal(props.changeDataRow.comandlalID);
            setUnit(props.changeDataRow.unitID);
            unitByID(props.changeDataRow.comandlalID);
        }
    }, [props.isEditBtnClick]);

    const saveUser = () => {
        props.setRowsSelected([]);
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
        if (age == "" || age == null) {
            Swal.fire("Нас оруулна уу.");
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
                age: age,
                user_type: user_type,
                position: position,
                pkoImage: pkoImage,
                foreignPass: foreignPass,
                foreignFinishDate: foreignFinishDate,
                phone: phone,
                email: email,
                comandlal: comandlal,
                unit: unit,
            })
            .then((res) => {
                fileInputRef.current.value = null;
                Swal.fire(res.data.msg);
                setRankParentID("");
                setRankTypeID("0");
                setRankID("0");
                setGender("0");
                setLastName("");
                setFirstName("");
                setRD("");
                setAge("");
                setUserTypeOld("");
                setPosition("");
                setPkoImage("");
                setForeignPass("");
                setForeignDate("");
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
    const changeAge = (e) => {
        setAge(e.target.value);
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
    const changeImage = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setPkoImage(reader.result);
        };
        reader.onerror = (error) => {
            console.log(error);
        };
        // setPkoImage(e.target.value);
    };
    const changeForeignPass = (e) => {
        setForeignPass(e.target.value);
    };
    const changeForeignDate = (e) => {
        setForeignDate(e.target.value);
    };

    return (
        <>
            {/* modal */}
            {/* <ButtonShowModel
                btnClassName={"btn btn-warning"}
                modelType={showModal}
                dataTargetID={"#userEdit"}
                spanIconClassName={"fas fa-solid fa-pen"}
                buttonName={"Засах"}
                clickHeaderOpenModal={clickHandlerAdminEditBtn}
            /> */}
            <div className="modal" id="userEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ЗАСАХ</h4>

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
                                <h5 style={{ color: "red" }}>
                                    * - Заавал бөглөх ёстой талбар
                                </h5>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            {userType == "comandlalAdmin" ||
                                            userType == "unitAdmin" ? (
                                                <span className="input-group-text">
                                                    <div
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    >
                                                        *
                                                    </div>
                                                    Командлал:{" "}
                                                </span>
                                            ) : (
                                                <span className="input-group-text">
                                                    <div
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    >
                                                        *
                                                    </div>
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
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
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
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
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
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
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
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
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
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
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
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
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
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
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
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
                                                Регистрийн дугаар:
                                            </span>
                                        </div>
                                        <InputMask
                                            style={{
                                                textTransform: "uppercase",
                                            }}
                                            mask={mask}
                                            onChange={changeRD}
                                            value={rd}
                                            className="form-control"
                                        />
                                        {/* <input
                                            className="form-control"
                                            onChange={changeRD}
                                            value={rd}
                                        /> */}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            {userType == "superAdmin" ||
                                            userType == "comandlalAdmin" ? (
                                                <span className="input-group-text">
                                                    <div
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    >
                                                        *
                                                    </div>
                                                    Админий эрх:
                                                </span>
                                            ) : (
                                                <span className="input-group-text">
                                                    <div
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    >
                                                        *
                                                    </div>
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
                                                <option value="gsmafAdmin">
                                                    ЗХЖШ-ын Хүний нөөцийн хэлтэс
                                                </option>
                                                <option value="healthDepartmentAdmin">
                                                    Эрүүл мэндийн хэлтэс
                                                </option>
                                                <option value="assistantAdmin">
                                                    Туслах эмч
                                                </option>
                                                <option value="hospitalAdmin">
                                                    Эмнэлгийн админ
                                                </option>
                                                <option value="sportAdmin">
                                                    Спортын админ
                                                </option>
                                                <option value="languageAdmin">
                                                    Гадаад хэлний админ
                                                </option>
                                                <option value="batalionAdmin">
                                                    Батальоны админ
                                                </option>
                                                <option value="comissionAdmin">
                                                    Комиссын админ
                                                </option>
                                            </select>
                                        )}
                                        {userType == "comandlalAdmin" && (
                                            <select
                                                className="form-control"
                                                value={user_type}
                                                onChange={changeUsertype}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                <option value="unitAdmin">
                                                    ЗХ-ний анги байгууллага
                                                </option>
                                                <option value="unitUser">
                                                    Командлалын хэрэглэгч
                                                </option>
                                            </select>
                                        )}
                                        {userType == "unitAdmin" && (
                                            <select
                                                className="form-control"
                                                value={user_type}
                                                onChange={changeUsertype}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                <option value="unitUser">
                                                    Ангийн хэрэглэгч
                                                </option>
                                            </select>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
                                                Нас:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            onChange={changeAge}
                                            value={age}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
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
                                                <div
                                                    style={{
                                                        color: "red",
                                                    }}
                                                >
                                                    *
                                                </div>
                                                Утасны дугаар:
                                            </span>
                                        </div>
                                        <input
                                            type="number"
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
                                            <span className="input-group-text">
                                                Гадаа паспорт:
                                            </span>
                                        </div>
                                        <input
                                            value={foreignPass}
                                            onChange={changeForeignPass}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Дуусах хугацаа:
                                            </span>
                                        </div>
                                        <input
                                            type="date"
                                            value={foreignFinishDate}
                                            onChange={changeForeignDate}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-group mb-3">
                                        {/* <div className="input-group-prepend">
                                            <label
                                                className="btn btn-primary"
                                                // onClick={openImage}
                                            >
                                                Цээж зураг:
                                            </label>
                                        </div> */}
                                        {}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={changeImage}
                                            ref={fileInputRef}
                                            // value={pkoImage}
                                            className="form-control"
                                            // disabled={true}
                                        />
                                        <input
                                            type="text"
                                            value={pkoImage ? pkoImage : ""}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p>
                                Цээж зураг нь албаны хувцастай, одоо байгаа цол,
                                нэр, ромбо харагдахуйц 3x4 хэмжээтэй байх
                                шаардлагатай.
                            </p>
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

export default PkoAdminEdit;
