import React, { useState, useEffect, useContext } from "react";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";

const ComplaintsList = () => {
    const state = useContext(AppContext);

    const [getUserComplaints, setUserComplaints] = useState([]);

    useEffect(() => {
        fn_complaints(state.getMissionRowID, state.getEeljRowID);
    }, []);

    useEffect(() => {
        fn_complaints(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const fn_complaints = (missionID, eeljID) => {
        axios
            .post("/get/list/complaints", {
                _missionID: missionID,
                _eeljID: eeljID,
            })
            .then((res) => {
                setUserComplaints(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Санал, гомдол</h3>
                </div>
                <div className="card-body">
                    {getUserComplaints.map((el) => (
                        <div id="accordion">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4
                                        className="card-title w-100"
                                        style={{ display: "flex" }}
                                    >
                                        <a
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "left",
                                                textAlign: "left",
                                            }}
                                            className="d-block w-100 col-md-6"
                                            data-toggle="collapse"
                                            href={"#collapseOne" + el.id}
                                            key={el}
                                        >
                                            {el.unitShortName}{" "}
                                        </a>
                                        <div
                                            className="col-md-6"
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "right",
                                                textAlign: "right",
                                            }}
                                        >
                                            {el.shortRank} {el.firstName}
                                        </div>
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
                                    <div className="card-footer" key={el}>
                                        {el.date}
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

export default ComplaintsList;
