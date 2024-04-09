import React, { useEffect, useState, CSSProperties, useRef } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import InputMask from "react-input-mask";

const PkoComNew = (props) => {
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

    const [getRankParents, setRankParents] = useState([]);
    const [getRankTypes, setRankTypes] = useState([]);
    const [getRanks, setRanks] = useState([]);
    const [getGenders, setGenders] = useState([]);
    const [getComandlalID, setComandlalID] = useState([]);
    const [getUnitID, setUnitID] = useState([]);

    const [getPkoImage, setPkoImage] = useState("");

    const fileInputRef = useRef(null);

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
            .get("/get/Unit/ID")
            .then((res) => {
                setComandlalID(res.data.comID);
                setUnitID(res.data.unitID);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        rankParentID: Yup.number().notOneOf([0], "Бүрэлдэхүүн сонгоно уу."),
        rankTypeID: Yup.number().notOneOf([0], "Цолны төрөл сонгоно уу."),
        rankID: Yup.number().notOneOf([0], "Цол сонгоно уу."),
        gender: Yup.number().notOneOf([0], "Хүйс сонгоно уу."),
        firstName: Yup.string().required("Админий нэр оруулах шаардлагатай"),
        lastName: Yup.string().required("Админий Овог оруулах шаардлагатай"),
        rd: Yup.string().required("Регистрийн дугаар"),
        // age: Yup.string().required("Нас оруулах шаардлагатай"),
        // position: Yup.string().required("Албан тушаал оруулах шаардлагатай"),
        phone: Yup.string()
            .required("Утасны дугаар оруулана уу.")
            .matches(/^[0-9]+$/, "Зөвхөн цифр байх ёстой")
            .min(8, "8 оронтой байх ёстой!!!")
            .max(8, "8 оронтой байх ёстой!!!"),
        email: Yup.string()
            .email("Та заавал E-mail хаяг оруулан уу.")
            .required("Цахим хаяг оруулана уу."),
        userType: Yup.string().required("Админ төрөл сонгоно уу."),
        // userComandlal: Yup.number().typeError("Командлал сонгоно уу."),
        // userUnit: Yup.number().typeError("Анги сонгоно уу."),
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
        Swal.fire("Нэмэх товчийг нэг л удаа дарна уу. Түр хүлээнэ үү!");
        axios
            .post("/new/admin", {
                rankParentID: data.rankParentID,
                rankTypeID: data.rankTypeID,
                rankID: data.rankID,
                gender: data.gender,
                firstName: data.firstName,
                lastName: data.lastName,
                rd: data.rd,
                // age: data.age,
                userType: data.userType,
                position: data.position,
                phone: data.phone,
                email: data.email,
                comandlal: getComandlalID,
                unit: getUnitID,
                pkoImage: getPkoImage,
                foreignPass: data.foreignPass,
                foreignFinishDate: data.foreignFinishDate,
            })
            .then((res) => {
                setPkoImage("");
                fileInputRef.current.value = null;
                Swal.fire(res.data.msg);
                reset(
                    {
                        rankParentID: "0",
                        rankTypeID: "0",
                        rankID: "0",
                        gender: "0",
                        firstName: "",
                        lastName: "",
                        rd: "",
                        // age: "",
                        userType: "unitUser",
                        position: "",
                        phone: "",
                        email: "",
                        userComandlal: getComandlalID,
                        userUnit: getUnitID,
                        pkoImage: "",
                        foreignPass: "",
                        foreignFinishDate: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );

                props.refreshUsers();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeRankParent = (e) => {
        axios
            .post("/get/type/byParentID", {
                _rankParentID: e.target.value,
            })
            .then((res) => {
                setRankTypes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeRankType = (e) => {
        axios
            .post("/get/rank/byTypeID", {
                _rankTypeID: e.target.value,
            })
            .then((res) => {
                setRanks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // function convertToBase64(e) {
    //     const pdfFile = e.target.files[0];
    //     if (
    //         pdfFile.name.split(".").pop() === "jpg" ||
    //         pdfFile.name.split(".").pop() === "jpeg"
    //     ) {
    //         const maxSize = 100 * 1024; // 100KB

    //         if (pdfFile.size > maxSize) {
    //             const reader = new FileReader();
    //             reader.onload = function (event) {
    //                 const img = new Image();
    //                 img.onload = function () {
    //                     const canvas = document.createElement("canvas");
    //                     const scaleFactor = maxSize / pdfFile.size;
    //                     canvas.width = img.width * scaleFactor;
    //                     canvas.height = img.height * scaleFactor;
    //                     const ctx = canvas.getContext("2d");
    //                     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    //                     canvas.toBlob(
    //                         function (blob) {
    //                             const resizedFile = new File(
    //                                 [blob],
    //                                 pdfFile.name,
    //                                 { type: "image/jpeg" }
    //                             );

    //                             // Do something with the resized image file, e.g., upload it to a server
    //                             console.log(resizedFile);
    //                         },
    //                         "image/jpeg",
    //                         1
    //                     );
    //                 };
    //                 img.src = event.target.result;
    //             };
    //             reader.readAsDataURL(pdfFile);
    //         } else {
    //             // File is within the size limit, no need to resize
    //             // Do something with the original image file, e.g., upload it to a server
    //             console.log(pdfFile);
    //         }
    //     } else {
    //         alert(
    //             "Та зөвхөн зурган файл сонгоно уу. Алдаа: Зурган файлын өргөтгөл биш байна."
    //         );
    //     }
    // }

    const convertToBase64 = (e) => {
        const pdfFile = e.target.files[0];
        if (
            pdfFile.name.split(".").pop() === "jpg" ||
            pdfFile.name.split(".").pop() === "jpeg"
        ) {
            const maxSize = 65 * 1024; // 65KB
            if (pdfFile.size > maxSize) {
                const mySize = pdfFile.size / 1024;
                const replaceSize = mySize.toString().replace(/\.\d+/, "");
                alert(
                    "Таны оруулсан файлын хэмжээ:" +
                        replaceSize +
                        "KБ байна." +
                        ".Файлын хэмжээ 65KБ-аас хэтэрсэн тул багасгах шаардлагатай."
                );
                return;
            }

            var reader = new FileReader();
            reader.readAsDataURL(pdfFile);
            reader.onload = () => {
                setPkoImage(reader.result);
            };
            reader.onerror = (error) => {
                console.log(error);
            };
        } else {
            alert(
                "Та зөвхөн зурган файл сонгоно уу. Алдаа: Зурган файлын өргөтгөл биш байна."
            );
        }
    };

    return (
        <>
            <div className="modal" id="adminNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">НЭМЭХ</h4>

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
                                    <h5 style={{ color: "red" }}>
                                        * - Заавал бөглөх ёстой талбар
                                    </h5>
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
                                                {...register("rankParentID")}
                                                onChange={changeRankParent}
                                            >
                                                <option value="0">
                                                    Сонгоно уу
                                                </option>
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
                                        <p className="alerts">
                                            {errors.rankParentID?.message}
                                        </p>
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
                                                {...register("rankTypeID")}
                                                onChange={changeRankType}
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
                                        <p className="alerts">
                                            {errors.rankTypeID?.message}
                                        </p>
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
                                                {...register("rankID")}
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
                                        <p className="alerts">
                                            {errors.rankID?.message}
                                        </p>
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
                                                {...register("gender")}
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
                                        <p className="alerts">
                                            {errors.gender?.message}
                                        </p>
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
                                                {...register("lastName")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.lastName?.message}
                                        </p>
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
                                                {...register("firstName")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.firstName?.message}
                                        </p>
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
                                                    Регистрийн дугаар:
                                                </span>
                                            </div>
                                            <InputMask
                                                style={{
                                                    textTransform: "uppercase",
                                                }}
                                                mask={mask}
                                                {...register("rd")}
                                                className="form-control"
                                            />
                                            {/* <input
                                                {...register("rd")}
                                                className="form-control"
                                            /> */}
                                        </div>
                                        <p className="alerts">
                                            {errors.rd?.message}
                                        </p>
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
                                                    Эрх:
                                                </span>
                                            </div>

                                            {userType == "unitAdmin" && (
                                                <select
                                                    className="form-control"
                                                    {...register("userType")}
                                                >
                                                    {/* <option value="">
                                                        Сонгоно уу
                                                    </option> */}
                                                    <option value="unitUser">
                                                        Ангийн хэрэглэгч
                                                    </option>
                                                </select>
                                            )}
                                        </div>
                                        <p className="alerts">
                                            {errors.userType?.message}
                                        </p>
                                    </div>
                                    {/* <div className="col-md-3">
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
                                                type="number"
                                                {...register("age")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.age?.message}
                                        </p>
                                    </div> */}
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
                                            <InputMask
                                                mask={phoneMask}
                                                // type="number"
                                                {...register("phone")}
                                                className="form-control"
                                            />
                                            {/* <input
                                                type="number"
                                                {...register("phone")}
                                                className="form-control"
                                            /> */}
                                        </div>
                                        <p className="alerts">
                                            {errors.phone?.message}
                                        </p>
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
                                                    Цахим хаяг:
                                                </span>
                                            </div>
                                            <input
                                                {...register("email")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.email?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    {/* <div
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    >
                                                        *
                                                    </div> */}
                                                    Албан тушаал:
                                                </span>
                                            </div>
                                            <textarea
                                                {...register("position")}
                                                className="form-control"
                                            />
                                        </div>
                                        {/* <p className="alerts">
                                            {errors.position?.message}
                                        </p> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Гадаад паспортын дугаар:
                                                </span>
                                            </div>
                                            <input
                                                {...register("foreignPass")}
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
                                                {...register(
                                                    "foreignFinishDate"
                                                )}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-group mb-3">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={convertToBase64}
                                                ref={fileInputRef}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Цээж зураг нь албаны хувцастай, одоо байгаа
                                    цол, нэр, ромбо харагдахуйц 3x4 хэмжээтэй
                                    байх шаардлагатай. Мөн 65КБ-с ихгүй байна.
                                </p>
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

export default PkoComNew;
