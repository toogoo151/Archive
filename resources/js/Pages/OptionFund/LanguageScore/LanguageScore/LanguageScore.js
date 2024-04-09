import React, { useState, useEffect, useContext } from "react";
import axios from "../../../../AxiosUser";
import LanguageScored from "./LanguageScored";
import LanguageNoScore from "./LanguageNoScore";

const LanguageScore = () => {
    const [getLanguageState, setLanguageState] = useState("");

    const changeLanguageState = (e) => {
        setLanguageState(e.target.value);
    };

    return (
        <div>
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
                            onChange={changeLanguageState}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="0">Шалгалтын оноогүй</option>
                            <option value="2">Шалгалтын оноотой</option>
                        </select>
                    </div>
                </div>
            </div>

            {getLanguageState == "0" && <LanguageNoScore />}

            {getLanguageState == "2" && <LanguageScored />}
        </div>
    );
};

export default LanguageScore;
