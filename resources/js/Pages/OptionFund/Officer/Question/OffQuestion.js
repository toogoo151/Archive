import React, { useEffect, useState } from "react";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ReqUser2 from "../../ReqUser/ReqUser2";
const OffQuestion = () => {
    const [getUserID, setUserID2] = useState(-1);
    const [getFisrtDelyTime, setFisrtDelyTime] = useState(0);
    const [getUserCheck2, setUserCheck2] = useState(-1);
    const [getWishID2, setWishID2] = useState(-1);
    const [getRankTypes, setRankTypes] = useState([]);
    const [getRanks, setRanks] = useState([]);


   const [getRolePlayed, setRolePlayed] = useState("");
   const [getRoleStudy, setRoleStudy] = useState("");

    // const [getMissionType, setMissionType] = useState("");

    const [showCard, setShowCard] = useState(false);
    const [showCard2, setShowCard2] = useState(false);
    const [showCard3, setShowCard3] = useState(false);




        useEffect(() => {
        axios
            .post("/get/rankType")
            .then((res) => {
                setRankTypes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/officer/question/check")
            .then((res) => {
                setUserID2(res.data);
                if (res.data === 1) {
                    setShowCard(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get("/officer/question/wish")
            .then((res) => {
                setWishID2(res.data);
                console.log(res.data);
                   if (res.data === 1) {
                    setShowCard3(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .post("/first/officer/qcheck")
            .then((res) => {
                setUserCheck2(res.data.userCheck);
                console.log(res.data.userCheck);
                 if (res.data.userCheck === 0) {
                    setShowCard2(true);
                }
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
        rankTypeID: Yup.number().notOneOf([0], "Цолны төрөл сонгоно уу."),
        rankID: Yup.number().notOneOf([0], "Цол сонгоно уу."),
        startedDate: Yup.string()
            .typeError("Ажиллаж эхэлсэн хугацаа оруулна уу.")
            .required("Ажиллаж эхэлсэн  оруулна уу."),
        rolePlayed: Yup.number()
            .typeError("Ажиллагаанд үүрэг гүйцэтгэсэн эсэхийг сонгоно уу.")
            .required("Ажиллагаанд үүрэг гүйцэтгэсэн эсэхийг сонгоно уу."),
        coursed: Yup.number()
            .typeError("Дамжаа төгссөн эсэхийг сонгоно уу.")
            .required("Дамжаа төгссөн эсэхийг сонгоно уу."),

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
            .post("/new/officer/question", {
                rankTypeID: data.rankTypeID,
                rankID: data.rankID,
                startedDate: data.startedDate,
                rolePlayed: data.rolePlayed,
                missionName: data.missionName,
                missionCameDate: data.missionCameDate,
                coursed: data.coursed,
                courseName: data.courseName,

            })
            .then((res) => {
                setUserCheck2(res.data.userCheck);
                setUserID2(res.data.pkoUserID);
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

       const changeRoleStudy = (e) => {
        setRoleStudy(e.target.value);
    };


    // const changeMissionType = (e) => {
    //     setMissionType(e.target.value);
    // };
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
                                            Цолны төрөл{" "}
                                        </label>
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
                                           <p className="alerts">
                                            {errors.rankTypeID?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="form-group">
                                        <label>
                                            Цол{" "}
                                        </label>
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
                                           <p className="alerts">
                                            {errors.rankID?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                           Цэргийн албанд ажиллаж эхэлсэн
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
                                            {...register("startedDate")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.startedDate?.message}
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Ажиллагааны туршлагатай эсэх:
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
                                            Ажиллагааны дамжаа төгссөн эсэх:

                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("coursed")}
                                            onChange={changeRoleStudy}
                                        >
                                            <option value="">Сонгоно уу</option>
                                            <option value="0">Тийм</option>
                                            <option value="1">Үгүй</option>
                                        </select>
                                        <p className="alerts">
                                            {errors.coursed?.message}
                                        </p>
                                    </div>

                                    {getRoleStudy == 0 && getRoleStudy != "" && (

                                        <div className="form-group">
                                            <label>
                                                Ажиллагааны дамжаа:{" "}
                                                <p
                                                    style={{
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                </p>
                                            </label>
                                            <select
                                                className="form-control"
                                                {...register("courseName")}
                                                // onChange={changeMissionName}
                                            >
                                                <option value="">
                                                    Сонгоно уу
                                                </option>
                                                <option value="0">
                                                    UNMO
                                                </option>
                                                 <option value="1">
                                                     UNSO
                                                </option>
                                                <option value="2">
                                                     UNMO+UNSO
                                                </option>

                                            </select>
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
          {getWishID2 == 0 ? (
    <>
        {getUserCheck2 == 1 && (
            <div>
                <ReqUser2 />
            </div>
        )}
        {getUserCheck2 == 0 && (
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
        {getWishID2 == 1 ? (
            <>
                {showCard3 && (
                    <div className="card bg-success fade-out">
                        <div className="card-header">
                            <h3
                                className="card-title"
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                Уучлаарай та хүсэлт аль хэдийн хүсэлт илгээсэн байна.
                            </h3>
                        </div>
                    </div>
                )}
            </>
        ) : (
            <> Уншиж байна..... </>
        )}
    </>
)}
        </>
    );
};

export default OffQuestion;
