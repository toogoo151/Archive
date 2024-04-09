import React, { useEffect, useState } from "react";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import Mail from "../../../../css/img/mail-download.gif";
import Cancel from "../../../../css/img/cancel2.gif";

const ReqUser = () => {
    const [getMission, setMission] = useState([]);
    const [getEelj, setEelj] = useState([]);

    const [isRequest, setIsRequest] = useState(false);

    const [missionID, setMissionID] = useState("");
    const [eeljID, setEeljID] = useState("");
    const [Wrong, setshow] = useState(false);
    const [Ok, okshow] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get("/get/missions")
            .then((res) => {
                setMission(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        fn_isRequest(missionID, eeljID);
    }, []);

    const save = () => {
        if (missionID == "" || missionID == null) {
            alert("Ажиллагаа сонгоно уу!!!!!");
            return;
        }
        if (eeljID == "" || eeljID == null) {
            alert("Ээлжээ сонгоно уу!!!!!");
            return;
        }
        axios
            .post("/new/requser", {
                missionID: missionID,
                eeljID: eeljID,
            })
            .then((res) => {
                if (res.data.status === "already") {
                    Swal.fire(res.data.msg);
                    setshow(true);
                    okshow(false);
                }
                if (res.data.status === "success") {
                    Swal.fire(res.data.msg);
                    setshow(false);
                    okshow(true);
                    setMessage(res.data.msg); // Set the message received from the response
                }
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
                // setshow(true);
            });
    };

    useEffect(() => {
        if (Ok) {
            const timeout = setTimeout(() => {
                window.location.reload(); // Reload the page after 5 seconds
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [Ok]);

    const changeMission = (e) => {
        setMissionID(e.target.value);
        setEeljID("");
        axios
            .post("/get/eelj/by/missionID", {
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
        fn_isRequest(missionID, eeljID);
    }, [missionID, eeljID]);

    const fn_isRequest = (missionID, eeljID) => {
        if (missionID != "" && eeljID != "") {
            axios
                .post("/is/request/button", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setIsRequest(res.data);
                });
        }
    };

    return (
        <>
            <>
                <div className="row">
                    <div className="info-box">
                        <div className="container mt-5">
                            <h1 className="text-center">
                                Энхийг дэмжих ажиллагаанд үүрэг гүйцэтгэх хүсэлт
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
                                            setEeljID(e.target.value);
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
                            {missionID != "" && eeljID != "" && isRequest && (
                                <div className="col-md-6">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        data-dismiss=""
                                        onClick={save}
                                    >
                                        {" "}
                                        Хүсэлт илгээх
                                    </button>
                                </div>
                            )}
                            {missionID != "" && eeljID != "" && !isRequest && (
                                <div className="col-md-6">
                                    <button
                                        className="btn btn-warning"
                                        // style={{ padding: 10 }}
                                    >
                                        Хүсэлт илгээх хугацаа дууссан байна.
                                    </button>
                                </div>
                            )}

                            <div className="col-md-5">
                                {Ok ? <img src={Mail} alt="Mail" /> : null}
                            </div>
                            <div className="col-md-5">
                                {Wrong ? (
                                    <img src={Cancel} alt="Cancel" />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default ReqUser;
