import React, { useState } from "react";
import Tomilogdoogui from "./Tomilogdoogui";
import Tomilogdson from "./Tomilogdson";
import Noots from "./Noots";

const OronToo = () => {
    const [getOronTooState, setOronTooState] = useState("");

    const changeOronTooState = (e) => {
        setOronTooState(e.target.value);
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
                            onChange={changeOronTooState}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="tomilogdoogui">Томилогдоогүй</option>
                            <option value="tomilogdson">Томилогдсон</option>
                            <option value="noots">Нөөц</option>
                        </select>
                    </div>
                </div>
            </div>
            {getOronTooState != "" && (
                <>
                    {getOronTooState == "tomilogdoogui" && <Tomilogdoogui />}
                    {getOronTooState == "tomilogdson" && <Tomilogdson />}
                    {getOronTooState == "noots" && <Noots />}
                </>
            )}
        </div>
    );
};

export default OronToo;
