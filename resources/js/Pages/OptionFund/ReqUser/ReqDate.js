import React, { useEffect, useState } from "react";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import Mail from "../../../../css/img/mail-download.gif";
import Cancel from "../../../../css/img/cancel2.gif";

const ReqDate = () => {
    const [getDate, setDate] = useState([]);

    const [yearID, setYearID] = useState("");

    const [Wrong, setshow] = useState(false);
    const [Ok, okshow] = useState(false);

    useEffect(() => {
        axios
            .get("/get/date")
            .then((res) => {
                setDate(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const save = () => {
        if (yearID == "" || yearID == null) {
            alert("Ажиллагаа сонгоно уу!!!!!");
            return;
        }
        axios
            .post("/new/reqyear", {
                yearID: yearID,
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
                }
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
                // setshow(true);
            });
    };

    const changeDate = (e) => {
        setYearID(e.target.value);
        axios
            .post("/get/yearID", {
                _yearID: e.target.value,
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <>
                <div className="row">
                    <div className="info-box">
                        <div className="container mt-5">
                            <h1 className="text-center">Хүсэлт гаргах он</h1>
                            <br />

                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Огноо:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeDate}
                                        value={yearID}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getDate.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

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

export default ReqDate;
