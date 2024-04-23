import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppContext } from "../../../../Context/MyContext";

const OffResearch = () => {
    const [getUserID, setUserID2] = useState(-1);
    const [getFisrtDelyTime, setFisrtDelyTime] = useState(0);
    // const [getUserCheck2, setUserCheck2] = useState(-1);
    const [getWishID2, setWishID2] = useState(-1);
    const [getRankTypes, setRankTypes] = useState([]);
    const [getRanks, setRanks] = useState([]);



   const [getRolePlayed, setRolePlayed] = useState("");
   const [getRoleStudy, setRoleStudy] = useState("");

    // const [getMissionType, setMissionType] = useState("");

    const [showCard, setShowCard] = useState(false);
    const [showCard2, setShowCard2] = useState(false);
  const state = useContext(AppContext);




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
            .get("/officer/research/check")
            .then((res) => {
                setUserID2(res.data);
                if (res.data === 1) {
                    setShowCard(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // axios
        //     .get("/officer/question/wish")
        //     .then((res) => {
        //         setWishID2(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        // axios
        //     .post("/first/officer/rescheck")
        //     .then((res) => {
        //         setUserCheck2(res.data.userCheck);
        //         console.log(res.data.userCheck);
        //          if (res.data.userCheck === 0) {
        //             setShowCard2(true);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
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
//         rankTypeID: Yup.number().notOneOf([0], "Цолны төрөл сонгоно уу."),
//         rankID: Yup.number().notOneOf([0], "Цол сонгоно уу."),


//           positions: Yup.string()
//             .typeError("Албан тушаал оруулна уу.")
//             .required("Албан тушаал оруулна уу."),
//         last_joinDate: Yup.string()
//             .typeError("Одоо албан тушаалд томилогдсон огноо оруулна уу.")
//             .required("Одоо албан тушаалд томилогдсон огноо оруулна уу."),
//         education: Yup.string()
//             .typeError("Боловсрол, Цэргийн мэргэжил дамжаа төгссөн байдал оруулна уу.")
//             .required("Боловсрол, Цэргийн мэргэжил дамжаа төгссөн байдал оруулна уу."),
//           angi_situation: Yup.string()
//             .typeError("Анги, байгууллагад ажилласан байдал оруулна уу.")
//             .required("Анги, байгууллагад ажилласан байдал оруулна уу."),
//              performance: Yup.string()
//             .typeError("Энхийг дэмжих ажиллагаанд үүрэг гүйцэтгэсэн байдал оруулна уу.")
//             .required("Энхийг дэмжих ажиллагаанд үүрэг гүйцэтгэсэн байдал оруулна уу."),
//    english_score: Yup.string()
//             .typeError("Энхийг дэмжих ажиллагаанд үүрэг гүйцэтгэсэн байдал оруулна уу.")
//             .required("Энхийг дэмжих ажиллагаанд үүрэг гүйцэтгэсэн байдал оруулна уу."),



//         rolePlayed: Yup.number()
//             .typeError("Ажиллагаанд үүрэг гүйцэтгэсэн эсэхийг сонгоно уу.")
//             .required("Ажиллагаанд үүрэг гүйцэтгэсэн эсэхийг сонгоно уу."),
//         coursed: Yup.number()
//             .typeError("Дамжаа төгссөн эсэхийг сонгоно уу.")
//             .required("Дамжаа төгссөн эсэхийг сонгоно уу."),

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
        // Swal.fire("asdf");
        axios
            .post("/new/officer/research", {
                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                rankTypeID: data.rankTypeID,
                rankID: data.rankID,
                positions: data.positions,
                education: data.education,
                angi_situation: data.angi_situation,
                last_joinDate: data.last_joinDate,
                performance: data.performance,
                english_score: data.english_score,

            })
            .then((res) => {
                console.log(res);
                // setUserCheck2(res.data.userCheck);
                // setUserID2(res.data.pkoUserID);
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
                <div className="card card-default">
                    <div className="card-header">
                        <h3 className="card-title" style={{ color: "red" }}>
                            Заавал бөглөх ёстой!!! /Асуумжийг үнэн зөв бөглөнө үү. /Дахин бөглөх
                            боломжгүй бөгөөд тухайн асуумжийг ЭДЦХАХ-д  шалгана./
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
                                            Албан тушаал{" "}
                                        </label>
                                              <input
                                                    type="text"
                                                    {...register(
                                                        "positions"
                                                    )}
                                                    className="form-control"
                                                />

                                    </div>

                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                         Одоогийн албан тушаалд томилогдсон огноо{" "}
                                        </label>
                                        <input
                                            type="date"
                                            {...register("last_joinDate")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.last_joinDate?.message}
                                        </p>
                                    </div>
                                </div>
                            <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                         Боловсрол, Цэргийн мэргэжил дамжаа төгссөн байдал{" "}
                                        </label>
                                        <input
                                            type="text"
                                            {...register("education")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.education?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">

                                       <div className="form-group">
                                        <label>
                                         Анги, байгууллагад ажилласан байдал{" "}
                                        </label>
                                        <input
                                            type="text"
                                            {...register("angi_situation")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.angi_situation?.message}
                                        </p>
                                    </div>
                                </div>
                            <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                         Энхийг дэмжих ажиллагаанд үүрэг гүйцэтгэсэн байдал{" "}
                                        </label>
                                        <input
                                            type="text"
                                            {...register("performance")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.performance?.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                         <label>
                                         Англи хэлний түвшин тогтоох шалгалтын оноо /ALCPT, ECL,TOEFL, IELTS/{" "}
                                        </label>
                                        <input
                                            type="text"
                                            {...register("english_score")}
                                            className="form-control"
                                        />
                                        <p className="alerts">
                                            {errors.english_score?.message}
                                        </p>
                                    </div>
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

            <br />
            {/* {getWishID2 == 0 ? (
                <>
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
                </>


            )} */}
        </>
    );
};

export default OffResearch;
