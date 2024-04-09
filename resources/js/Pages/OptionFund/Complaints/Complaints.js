import React, { useState, useEffect } from "react";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";

const Complaints = () => {
    const [getMissions, setMissions] = useState([]);
    const [getEeljs, setEeljs] = useState([]);
    const [getUserComplaints, setUserComplaints] = useState([]);

    const [getMissionID, setMissionID] = useState("");
    const [getEeljID, setEeljID] = useState("");
    const [getComplaints, setComplaints] = useState("");

    useEffect(() => {
        axios
            .get("/get/missions")
            .then((res) => {
                setMissions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        fn_complaints();
    }, []);

    const fn_complaints = () => {
        axios
            .get("/get/complaints")
            .then((res) => {
                setUserComplaints(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeMission = (e) => {
        setMissionID(e.target.value);
        setEeljID("");
        axios
            .post("/get/eelj/by/missionID", {
                _missionID: e.target.value,
            })
            .then((res) => {
                setEeljs(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const save = () => {
        if (getMissionID == "" || getMissionID == null) {
            alert("Ажиллагаа сонгоно уу!!");
            return;
        }
        if (getEeljID == "" || getEeljID == null) {
            alert("Ээлж сонгоно уу!!");
            return;
        }
        if (getComplaints == "" || getComplaints == null) {
            alert("Санал, гомдол оруулна уу!!");
            return;
        }
        axios
            .post("/user/complaints", {
                missionID: getMissionID,
                eeljID: getEeljID,
                complaints: getComplaints,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setMissionID("");
                setEeljID("");
                setComplaints("");
                fn_complaints();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeComplaints = (e) => {
        setComplaints(e.target.value);
    };

    return (
        <div>
            <section className="content">
                {/* Default box */}
                <div className="card">
                    <div className="card-body row">
                        <div className="col-5 text-center d-flex align-items-center justify-content-center">
                            <div className="true">
                                <h2>
                                    Санал, гомдол
                                    {/* <strong>LTE</strong> */}
                                </h2>
                                <p className="lead mb-5">
                                    Та оролцооны байдалд санал, гомдолтой байвал
                                    хажуугийн хэсгийг бөглөнө үү!
                                    <br />
                                    ЭДЦХАХ: +976 70152660
                                </p>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="form-group">
                                <label>Ажиллагаа</label>
                                <select
                                    className="form-control"
                                    onChange={changeMission}
                                    value={getMissionID}
                                >
                                    <option value="">Сонгоно уу</option>
                                    {getMissions.map((el) => (
                                        <option value={el.id} key={el.id}>
                                            {el.missionName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Ээлж</label>
                                <select
                                    className="form-control"
                                    onChange={(e) => {
                                        setEeljID(e.target.value);
                                    }}
                                    value={getEeljID}
                                >
                                    <option value="">Сонгоно уу</option>
                                    {getEeljs.map((el) => (
                                        <option value={el.id} key={el.id}>
                                            {el.eeljName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Санал, гомдол</label>
                                <textarea
                                    onChange={changeComplaints}
                                    value={getComplaints}
                                    className="form-control"
                                    rows={4}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss=""
                                    onClick={save}
                                >
                                    Илгээх
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Санал, гомдол</h3>
                </div>
                <div className="card-body">
                    {getUserComplaints.map((el) => (
                        <div id="accordion">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title w-100">
                                        <a
                                            className="d-block w-100"
                                            data-toggle="collapse"
                                            href={"#collapseOne" + el.id}
                                            key={el}
                                        >
                                            {/* {el.firstName}  */}
                                            {el.date}
                                        </a>
                                    </h4>
                                </div>
                                <div
                                    id={"collapseOne" + el.id}
                                    className="collapse show"
                                    data-parent="#accordion"
                                >
                                    <div className="card-body" key={el}>
                                        {el.complaints}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Complaints;
