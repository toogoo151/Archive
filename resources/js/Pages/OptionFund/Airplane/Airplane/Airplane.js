import React, { useState, useEffect, useContext } from "react";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
import EeljHiigdsen from "./EeljHiigdsen";
import EeljHiigdeegui from "./EeljHiigdeegui";
import AirplaneEelj from "./AirplaneEelj";

const Airplane = () => {
    const state = useContext(AppContext);

    const [getEeljs, setEeljs] = useState([]);
    const [isDataLength, setDataLength] = useState(0);
    const [getEeljState, setEeljState] = useState("");

    useEffect(() => {
        getAirplaneTotal(state.getMissionRowID, state.getEeljRowID);
    }, []);

    useEffect(() => {
        getAirplaneTotal(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const changeEeljState = (e) => {
        setEeljState(e.target.value);
    };

    const getAirplaneTotal = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/airplane/total", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setEeljs(res.data);
                    setDataLength(res.data.length);
                });
        }
    };

    return (
        <div>
            <div
                className="info-box col d-flex flex-column"
                style={{
                    paddingTop: "20px",
                    paddingBottom: "0px",
                }}
            >
                <div className="row d-flex px-3">
                    {isDataLength > 0 &&
                        getEeljs.map((el, index) => (
                            <AirplaneEelj key={index} el={el} />
                        ))}
                </div>
            </div>
            <div
                className="info-box"
                style={{
                    padding: "20px",
                    paddingBottom: "0px",
                }}
            >
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Төлөв:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={changeEeljState}
                            value={getEeljState}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="0">Хуваарилагдаагүй</option>
                            <option value="2">Хуваарилагдсан</option>
                        </select>
                    </div>
                </div>
            </div>

            {getEeljState == "0" && <EeljHiigdeegui />}

            {/* {clickedRowData != "" && (
                <AirplaneChild clickedRowData={clickedRowData} />
            )} */}
            {getEeljState == "2" && <EeljHiigdsen />}
        </div>
    );
};

export default Airplane;
