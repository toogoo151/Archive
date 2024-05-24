import React, { useEffect, useState } from "react";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReqUser from "../ReqUser/ReqUser";

const Question = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [getMission, setMission] = useState([]);
    const [getEelj, setEelj] = useState([]);
    const [missionID, setMissionID] = useState("");
    const [eeljID, setEeljID] = useState("");

    const [missionName, setMissionName] = useState("");

    const [getUserID, setUserID] = useState(-1);
    const [getFisrtDelyTime, setFisrtDelyTime] = useState(0);
    const [getUserCheck, setUserCheck] = useState(-1);
    const [getWishID, setWishID] = useState(-1);

    const [getRolePlayed, setRolePlayed] = useState("");
    const [isWish, setWish] = useState(0);
    // const [getMissionType, setMissionType] = useState("");
    const [getPunishment, setPunishment] = useState("");

    const [showCard, setShowCard] = useState(false);
    const [showCard2, setShowCard2] = useState(false);

    const [getMsg, setMsg] = useState("");
    const [isComplate, setIsComplate] = useState(false);
    const [getErrorArr, setErrorArr] = useState([]);

    const [message, setMessage] = useState("");
    const [isResently, setResently] = useState(false);

    const [wishRowCreatedDate, setWishCreatedDate] = useState("");
    useEffect(() => {
        if (wishRowCreatedDate != "") {
            const now = new Date();
            const difference = (now - new Date(wishRowCreatedDate)) / 60000; // Convert ms to minutes

            if (difference <= 5) {
                setResently(true);
                setMessage("The event was within the last 5 minutes."); //
            } else {
                setResently(false);
                setMessage("The event was more than 5 minutes ago.");
            }
        }
    }, [wishRowCreatedDate]); // Dependency array to run effect when eventTime changes

    useEffect(() => {
        // console.log(now);
        axios
            .get("/get/missions3")
            .then((res) => {
                setMission(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        // axios
        //     .post("/first/check/question")
        //     .then((res) => {
        //         setUserCheck(res.data.userCheck);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const checkWish = (missionID, eeljID) => {
        console.log("orloo");
        console.log(missionID);
        console.log(eeljID);
        axios
            .post("/user/question/wish", {
                _missionID: missionID,
                _eeljID: eeljID,
            })
            .then((res) => {
                console.log("respose", res.data);
                setWish(res.data.count);
                setWishCreatedDate(res.data.getCreated_at);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const checkQuestion = (missionID, eeljID) => {
        // mission eelj сонгох үед шууд ажиллаж байна.
        if (missionID != "" && eeljID != "") {
            setUserID(-1);
            setMissionName("");

            setMsg("");
            setIsComplate(false);
            setWish(0);
            setWishCreatedDate("");
            axios
                .post("/user/question/check", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    console.log(res.data);

                    if (res.data.count == -1) {
                        return; //Хүсэлт илгээх нээгдээгүй.
                    }

                    if (res.data.count == 0) {
                        setUserID(res.data.count); //count = 0 ирнэ асуумж гарж ирнэ.
                    }
                    if (res.data.count == 1) {
                        setUserID(res.data.count);
                        setMissionName(res.data.missionName);
                        setWish(res.data.isReqSent);
                        if (res.data.isReqSent == 1) {
                            setWishCreatedDate(res.data.wishRow.created_at);
                        }
                        setMsg(res.data.msg);
                        setIsComplate(res.data.isComplate);
                        if (!res.data.isComplate) {
                            setErrorArr(res.data.isErrorArr);
                        } else {
                            setErrorArr([]);
                        }
                    }

                    // if (res.data.count === 1) {
                    //     setShowCard(true);
                    // }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        // requestSent(missionID, eeljID);
    };
    const changeMission = (e) => {
        setMissionID(e.target.value);
        setEeljID("");

        axios
            .post("/get/eelj/by/missionID/this/year", {
                _missionID: e.target.value,
            })
            .then((res) => {
                setEelj(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
        movement: Yup.number()
            .typeError("Одоогийн албан тушаалд томилогдсон байдал сонгоно уу.")
            .required("Одоогийн албан тушаалд томилогдсон байдал сонгоно уу."),
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
                _missionID: missionID,
                _eeljID: eeljID,
                appointedDate: data.appointedDate,
                rolePlayed: data.rolePlayed,
                movement: data.movement,
                missionName: data.missionName,
                missionCameDate: data.missionCameDate,
                studying: data.studying,
                punishment: data.punishment,
                punishmentDate: data.punishmentDate,
            })
            .then((res) => {
                // console.log(res.data);
                // return;
                // setUserCheck(res.data.userCheck);   // энд хүсэлт илгээх compenent нээгдэж байсан
                // setUserID(res.data.pkoUserID);
                setUserID(res.data.count);
                setMissionName(res.data.missionName);

                setMsg(res.data.msg);
                setIsComplate(res.data.isComplate);
                if (!res.data.isComplate) {
                    setErrorArr(res.data.isErrorArr);
                } else {
                    setErrorArr([]);
                }

                // setFisrtDelyTime(5000);
                // Swal.fire(res.data.msg);
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

    const requestSent = () => {
        axios
            .post("/new/requser", {
                missionID: missionID,
                eeljID: eeljID,
            })
            .then((res) => {
                if (res.data.status === "already") {
                    Swal.fire(res.data.msg);
                }
                if (res.data.status === "success") {
                    checkWish(missionID, eeljID);
                    Swal.fire(res.data.msg);
                }
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
                // setshow(true);
            });
    };

    return (
        <>
            <div className="row">
                <div className="info-box">
                    <div className="container ">
                        <h1 className="text-center">
                            Асуумж бөглөж Энхийг дэмжих ажиллагаанд оролцох
                            ХҮСЭЛТ илгээх
                        </h1>
                        <br />

                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Ажиллагаа:
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    onChange={changeMission}
                                    value={missionID}
                                >
                                    <option value="">Сонгоно уу</option>
                                    {getMission.map((el) => (
                                        <option key={el.id} value={el.id}>
                                            {el.missionName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Ээлж:
                                    </span>
                                </div>
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        setUserID(-1);
                                        setEeljID(e.target.value);
                                        checkQuestion(
                                            missionID,
                                            e.target.value
                                        );
                                    }}
                                    value={eeljID}
                                >
                                    <option value="">Сонгоно уу</option>
                                    {getEelj.map((el) => (
                                        <option key={el.id} value={el.id}>
                                            {el.eeljName} {"-"}{" "}
                                            {el.eeljStartDate}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={checkQuestion}
                            >
                                {" "}
                                Хүсэлт илгээх
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
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
                                            Одоогийн албан тушаалд томилогдсон
                                            байдал
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("movement")}
                                            // onChange={(e) => {
                                            //     setMovement(e.target.value);
                                            // }}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            <option value="1">
                                                Анги дотороо томилогдсон
                                            </option>
                                            <option value="0">
                                                Анги хооронд шилжин томилогдсон
                                            </option>
                                            <option value="1">Бусад</option>
                                        </select>
                                        <p className="alerts">
                                            {errors.movement?.message}
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
                                Асуумж илгээх
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                getUserID == 1 && (
                    <>
                        <div className="card bg-info">
                            <div className="card-header">
                                <h3
                                    className="card-title"
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    Та {missionName.eeljName + " ээлжид "}{" "}
                                    асуумж бөглөсөн байна.
                                </h3>
                            </div>
                        </div>
                        <div
                            className={
                                isComplate ? "card bg-info" : "card bg-danger"
                            }
                        >
                            <div className="card-header">
                                <h3
                                    className="card-title"
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    {getMsg}
                                </h3>
                            </div>

                            {getErrorArr != undefined &&
                                getErrorArr.length > 0 && (
                                    <div className="card-body">
                                        {getErrorArr.map((el, index) => (
                                            <p key={index}>
                                                {"  "}
                                                {index + 1}. {el.errorMsg}
                                            </p>
                                        ))}
                                    </div>
                                )}
                        </div>
                        {getErrorArr != undefined && getErrorArr.length > 0 ? (
                            <div className="card bg-danger">
                                <div className="card-header">
                                    <h3
                                        className="card-title"
                                        style={{
                                            textAlign: "center",
                                        }}
                                    >
                                        Уучлаарай та энэ ажиллагаанд хүсэлт
                                        илгээх боломжгүй байна. Танд гомдол
                                        байвал ЗХЖШ-ийн Хүний нөөцөд хандана уу.
                                    </h3>
                                </div>
                            </div>
                        ) : isWish == 0 ? (
                            <button
                                type="button"
                                className={
                                    isMobile
                                        ? "col-md-12 btn btn-success"
                                        : "btn btn-success"
                                }
                                data-dismiss=""
                                onClick={() => {
                                    requestSent();
                                }}
                            >
                                <div className="row">
                                    <div className="col-md-2 text-center">
                                        <i
                                            className="fa fa-paper-plane"
                                            style={{
                                                fontSize: "24px",
                                                color: "green",
                                                backgroundColor: "white",
                                                borderRadius: "50%",
                                                padding: 8,
                                            }}
                                        ></i>
                                    </div>
                                    <div className="col-md-10 text-center">
                                        <p style={{ paddingTop: 10 }}>
                                            ХҮСЭЛТ ИЛГЭЭХ
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                // onClick={() => {
                                //     requestSent();
                                // }}
                            >
                                <div className="row">
                                    <div className="col-md-10">
                                        {!isResently ? (
                                            <>
                                                <p>
                                                    ТАНЫ ХҮСЭЛТИЙГ ХҮЛЭЭЖ АВСАН
                                                    БАЙНА.
                                                </p>
                                                <p>
                                                    Та{" "}
                                                    {missionName.eeljName +
                                                        " ээлжийн "}
                                                    сонгон шалгаруулалтад
                                                    амжилттай бүртгэгдсэн байна.
                                                </p>
                                                <p>
                                                    Таны дараагийн алхам "БИЧИГ
                                                    БАРИМТ"-аа бүрдүүлж системд
                                                    оруулах.
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p>
                                                    ТАНЫ ХҮСЭЛТИЙГ ХҮЛЭЭЖ АВЛАА.
                                                </p>

                                                <p>
                                                    Та{" "}
                                                    {missionName.eeljName +
                                                        " ээлжийн "}
                                                    сонгон шалгаруулалтад
                                                    амжилттай бүртгэгдлээ.
                                                </p>
                                                <p>
                                                    Таны дараагийн алхам "БИЧИГ
                                                    БАРИМТ"-аа бүрдүүлж системд
                                                    оруулах.
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <div className="col-md-2">
                                        <i
                                            className="fa fa-check"
                                            style={{
                                                fontSize: "24px",
                                                color: "green",
                                                backgroundColor: "white",
                                                borderRadius: "50%",
                                                padding: 5,
                                            }}
                                        ></i>
                                    </div>
                                </div>
                            </button>
                        )}
                    </>
                )
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
