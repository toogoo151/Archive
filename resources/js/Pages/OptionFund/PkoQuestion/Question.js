import React, { useEffect, useState } from "react";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReqUser from "../ReqUser/ReqUser";

const Question = () => {
    const [getUserID, setUserID] = useState(-1);
    const [getFisrtDelyTime, setFisrtDelyTime] = useState(0);
    const [getUserCheck, setUserCheck] = useState(-1);
    const [getWishID, setWishID] = useState(-1);

    const [getRolePlayed, setRolePlayed] = useState("");
    // const [getMissionType, setMissionType] = useState("");
    const [getPunishment, setPunishment] = useState("");

    const [showCard, setShowCard] = useState(false);
    const [showCard2, setShowCard2] = useState(false);

    useEffect(() => {
        axios
            .get("/user/question/check")
            .then((res) => {
                setUserID(res.data);
                if (res.data === 1) {
                    setShowCard(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/user/question/wish")
            .then((res) => {
                setWishID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post("/first/check/question")
            .then((res) => {
                setUserCheck(res.data.userCheck);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (getFisrtDelyTime > 0) {
            const hideTimeout = setTimeout(() => {
                setShowCard(true);
            }, getFisrtDelyTime); // 20 seconds
            return () => clearTimeout(hideTimeout);
        }
    }, [getFisrtDelyTime]);

    const formSchema = Yup.object().shape({
        appointedDate: Yup.string()
            .typeError("Томилогдсон хугацаа оруулна уу.")
            .required("Томилогдсон хугацаа оруулна уу."),
        rolePlayed: Yup.number()
            .typeError("Ажиллагаанд үүрэг гүйцэтгэсэн эсэхийг сонгоно уу.")
            .required("Ажиллагаанд үүрэг гүйцэтгэсэн эсэхийг сонгоно уу."),
        studying: Yup.number()
            .typeError("Одоо суралцаж байгаа эсэхийг сонгоно уу.")
            .required("Одоо суралцаж байгаа эсэхийг сонгоно уу."),
        punishment: Yup.number()
            .typeError("Сахилгын шийтгэлтэй эсэхийг сонгоно уу.")
            .required("Сахилгын шийтгэлтэй эсэхийг сонгоно уу."),
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
            .post("/new/user/question", {
                appointedDate: data.appointedDate,
                rolePlayed: data.rolePlayed,
                // missionType: data.missionType,
                missionName: data.missionName,
                missionCameDate: data.missionCameDate,
                studying: data.studying,
                punishment: data.punishment,
                punishmentDate: data.punishmentDate,
            })
            .then((res) => {
                setUserCheck(res.data.userCheck);
                setUserID(res.data.pkoUserID);
                setFisrtDelyTime(5000);
                Swal.fire(res.data.msg);
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg).then(() => {
                    if (getUserID === 1 && !showCard) {
                        setShowCard2(true);
                    }
                });
            });
    };

    const changeRolePlayed = (e) => {
        setRolePlayed(e.target.value);
    };
    // const changeMissionType = (e) => {
    //     setMissionType(e.target.value);
    // };

    const changePunishment = (e) => {
        setPunishment(e.target.value);
    };

    return (
        <>
            {getUserID == 0 ? (
                <div className="card card-default">
                    <div className="card-header">
                        <h3 className="card-title" style={{ color: "red" }}>
                            Асуумжийг үнэн зөв бөглөнө үү. /Дахин бөглөх
                            боломжгүй бөгөөд тухайн асуумжийг ЗХЖШ-ын хүний
                            нөөцийн хэлтэс шалгах тул худал бөглөсөн тохиолдолд
                            таны гадаадад суралцах болон ажиллагаанд явах эрхийг
                            3 жилээр хасахыг анхаарна уу/
                        </h3>
                    </div>
                    {/* /.card-header */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            Одоогийн албан тушаалд томилогдсон
                                            огноо{" "}
                                            {/* <p
                                                style={{
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                //
                                            </p> */}
                                            {/* Цэргийн зохих шатны сургууль, дамжаа
                                            төгссөн, цэргийн гэрээт албанд
                                            элссэн болон шинэ албан тушаалд
                                            томилогдсон хугацаа: */}
                                        </label>
                                        <input
                                            type="date"
                                            {...register("appointedDate")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.appointedDate?.message}
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Ажиллагааны туршлагатай эсэх
                                            {/* Өмнө нь энхийг дэмжих ажиллагаанд
                                            үүрэг гүйцэтгэсэн эсэх: */}
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("rolePlayed")}
                                            onChange={changeRolePlayed}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            <option value="0">Тийм</option>
                                            <option value="1">Үгүй</option>
                                        </select>
                                        <p className="alerts">
                                            {errors.rolePlayed?.message}
                                        </p>
                                    </div>
                                    {getRolePlayed == 0 && getRolePlayed != "" && (
                                        // <div className="form-group">
                                        //     <label>
                                        //         Сүүлд үүрэг гүйцэтгэсэн
                                        //         ажиллагаа:
                                        //     </label>
                                        //     <select
                                        //         className="form-control"
                                        //         {...register("missionType")}
                                        //         onChange={changeMissionType}
                                        //     >
                                        //         <option value="">
                                        //             Сонгоно уу
                                        //         </option>
                                        //         <option value="0">
                                        //             06 сар
                                        //         </option>
                                        //         <option value="1">
                                        //             12 сар
                                        //         </option>
                                        //     </select>
                                        // </div>
                                        <div className="form-group">
                                            <label>
                                                Сүүлд үүрэг гүйцэтгэсэн
                                                ажиллагаа:{" "}
                                                <p
                                                    style={{
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                    /Таны үүрэг гүйцэтгэсэн
                                                    ажиллагааны нэр доорх
                                                    жагсаалтад байхгүй бол
                                                    "Бусад" гэсэн сонголтыг
                                                    сонгоно уу/
                                                </p>
                                            </label>
                                            <select
                                                className="form-control"
                                                {...register("missionName")}
                                                // onChange={changeMissionName}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                <option value="0">
                                                    Бүгд найрамдах өмнөд Судан
                                                    улс - UNMISS
                                                </option>
                                                <option value="1">
                                                    Бүгд найрамдах ардчилсан
                                                    Конго улс - MONUSCO
                                                </option>
                                                <option value="2">
                                                    Бүгд найрамдах Судан улс -
                                                    UNISFA
                                                </option>
                                                <option value="3">
                                                    Баруун сахар улс - MINURSO
                                                </option>
                                                <option value="4">
                                                    Йемен улс - UNMHA
                                                </option>
                                                <option value="5">
                                                    Мали улс - MINUSMA
                                                </option>
                                                <option value="6">
                                                    Төв Африкийн бүгд найрамдах
                                                    улс - MINUSA
                                                </option>
                                                <option value="7">
                                                    Ливан улс - UNIFIL
                                                </option>
                                                <option value="8">Бусад</option>
                                            </select>
                                        </div>
                                    )}
                                    {getRolePlayed == 0 && getRolePlayed != "" && (
                                        <>
                                            <div className="form-group">
                                                <label>
                                                    Ажиллагаанаас буцаж ирсэн
                                                    огноо:
                                                </label>
                                                <input
                                                    type="date"
                                                    {...register(
                                                        "missionCameDate"
                                                    )}
                                                    className="form-control"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            Одоо БХ-ын болон бусад их, дээд
                                            сургууль, коллежийн өдрийн ангийн
                                            сургалт, дамжаанд сурч байгаа эсэх:
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("studying")}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            <option value="0">Тийм</option>
                                            <option value="1">Үгүй</option>
                                        </select>
                                        <p className="alerts">
                                            {errors.studying?.message}
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Төрийн албаны тухай хууль, цэргийн
                                            сахилгын дүрэмд заасан сахилгын
                                            шийтгэлтэй эсэх:
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("punishment")}
                                            onChange={changePunishment}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            <option value="0">Тийм</option>
                                            <option value="1">Үгүй</option>
                                        </select>
                                        <p className="alerts">
                                            {errors.punishment?.message}
                                        </p>
                                    </div>
                                    {getPunishment != "" && getPunishment == 0 && (
                                        <div className="form-group">
                                            <label>
                                                Шийтгэгдсэн тушаалын хугацаа:
                                            </label>
                                            <input
                                                type="date"
                                                {...register("punishmentDate")}
                                                className="form-control"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* /.card-body */}
                        <div
                            className="card-footer"
                            style={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "right",
                            }}
                        >
                            <button
                                type="submit"
                                className="btn btn-success"
                                data-dismiss=""
                            >
                                Илгээх
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    {/* <div className="card bg-success">
                    <div className="card-header">
                        <h3
                            className="card-title"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            Та асуумж бөглөсөн байна.
                        </h3>
                    </div>
                </div> */}
                </>
            )}
            <br />
            {getWishID == 0 ? (
                <>
                    {getUserCheck == 1 && (
                        <div>
                            <ReqUser />
                        </div>
                    )}
                    {getUserCheck == 0 && (
                        <>
                            {getUserID == 1 ? (
                                <>
                                    {showCard && (
                                        <div className="card bg-danger fade-out">
                                            <div className="card-header">
                                                <h3
                                                    className="card-title"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    Уучлаарай та хүсэлт илгээх
                                                    боломжгүй байна. Сонгон
                                                    шалгаруулалтын шаардлагыг
                                                    хангасангүй. Танд гомдол
                                                    байвал ЭДЦХАХ-д хандана уу.
                                                </h3>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="card bg-warning">
                                    <div className="card-header">
                                        <h3
                                            className="card-title"
                                            style={{
                                                textAlign: "center",
                                            }}
                                        >
                                            Асуумж бөглөнө үү.
                                        </h3>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <>
                    {showCard2 && (
                        <div className="card bg-danger fade-out">
                            <div className="card-header">
                                <h3
                                    className="card-title"
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    Уучлаарай та хүсэлт илгээх боломжгүй байна.
                                    Сонгон шалгаруулалтын шаардлагыг
                                    хангасангүй. Танд гомдол байвал ЭДЦХАХ-д
                                    хандана уу.
                                </h3>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default Question;
