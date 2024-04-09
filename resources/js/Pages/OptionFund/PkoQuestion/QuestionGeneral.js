import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Context/MyContext";
import axios from "../../../AxiosUser";
// import CanceledChild from "./CanceledChild";
import QuestionEdit from "./QuestionEdit";
import QuestionHangaagui from "./QuestionHangaagui";
import QuestionAll from "./QuestionAll";

const QuestionGeneral = () => {
    const state = useContext(AppContext);

    const [getQuestionState, setQuestionState] = useState("");
    const [getAllUser, setAllUser] = useState("");
    const [getBugluugui, setBugluugui] = useState("");
    const [getAllTotal, setAllTotal] = useState("");
    const [getHangasan, setHangasan] = useState("");
    const [getHangaagui, setHangaagui] = useState("");

    useEffect(() => {
        getTsahSum();
    }, []);

    const getTsahSum = () => {
        axios
            .post("/get/count/question")
            .then((res) => {
                if (res.data.allUser != undefined) {
                    setAllUser(res.data.allUser);
                }
                if (res.data.bugluugui != undefined) {
                    setBugluugui(res.data.bugluugui);
                }
                if (res.data.allTotal != undefined) {
                    setAllTotal(res.data.allTotal);
                }
                if (res.data.hangasan != undefined) {
                    setHangasan(res.data.hangasan);
                }
                if (res.data.hangaagui != undefined) {
                    setHangaagui(res.data.hangaagui);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeQuestionState = (e) => {
        setQuestionState(e.target.value);
    };

    const labelBtnFnFirst = (e) => {
        setQuestionState("");
    };
    const labelBtnFnSecond = (e) => {
        setQuestionState("1");
    };
    const labelBtnFnThird = (e) => {
        setQuestionState("0");
    };

    return (
        <div>
            <div
                className="info-box"
                style={{
                    padding: "20px",
                }}
            >
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Төлөв:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeQuestionState}
                            value={getQuestionState}
                        >
                            <option value="">Асуумж бөглөсөн нийт</option>
                            <option value="1">Шаардлага хангасан</option>
                            <option value="0">Шаардлага хангаагүй</option>
                        </select>
                    </div>
                </div>
                <div
                    className="col-md-3"
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <button
                        className="btn btn-info"
                        style={{
                            width: "280px",
                        }}
                    >
                        Нийт ЦАХ -{" "}
                        <strong style={{ fontSize: "30px", color: "black" }}>
                            {getAllUser}
                        </strong>
                    </button>
                </div>

                <div
                    className="col-md-6"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        flexDirection: "row",
                    }}
                >
                    <div className="col-md-6">
                        <div className="row">
                            <button
                                className="btn btn-info"
                                style={{
                                    width: "280px",
                                }}
                                onClick={labelBtnFnFirst}
                            >
                                Асуумж бөглөсөн нийт -{" "}
                                <strong
                                    style={{ fontSize: "30px", color: "black" }}
                                >
                                    {getAllTotal}
                                </strong>
                            </button>
                        </div>
                        <br />
                        <div className="row">
                            <button
                                className="btn btn-success"
                                style={{
                                    width: "280px",
                                }}
                                onClick={labelBtnFnSecond}
                            >
                                Шаардлага хангасан -{" "}
                                <strong
                                    style={{ fontSize: "30px", color: "white" }}
                                >
                                    {getHangasan}
                                </strong>
                            </button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <button
                                className="btn btn-info"
                                style={{
                                    width: "280px",
                                }}
                            >
                                Асуумж бөглөөгүй нийт -{" "}
                                <strong
                                    style={{ fontSize: "30px", color: "black" }}
                                >
                                    {getBugluugui}
                                </strong>
                            </button>
                        </div>
                        <br />
                        <div className="row">
                            <button
                                className="btn btn-warning"
                                style={{
                                    width: "280px",
                                }}
                                onClick={labelBtnFnThird}
                            >
                                Шаардлага хангаагүй -{" "}
                                <strong
                                    style={{ fontSize: "30px", color: "red" }}
                                >
                                    {getHangaagui}
                                </strong>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {getQuestionState == "" && <QuestionAll />}

            {getQuestionState == "1" && <QuestionEdit />}

            {getQuestionState == "0" && <QuestionHangaagui />}
        </div>
    );
};

export default QuestionGeneral;
