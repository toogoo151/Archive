import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../../Context/MyContext";
// import CanceledChild from "./CanceledChild";
import Tatgalzsan from "./Tatgalzsan";
import Tatgalzaagui from "./Tatgalzaagui";

const Canceled = () => {
    const state = useContext(AppContext);

    const [getCanceledState, setCanceledState] = useState("");

    const changeCanceledState = (e) => {
        setCanceledState(e.target.value);
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
                            onChange={changeCanceledState}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="0">Татгалзаагүй</option>
                            <option value="2">Татгалзсан</option>
                        </select>
                    </div>
                </div>
            </div>

            {getCanceledState == "0" && <Tatgalzaagui />}
            {/* {clickedRowData != "" && (
                <CanceledChild clickedRowData={clickedRowData} />
            )}  */}
            {getCanceledState == "2" && <Tatgalzsan />}
        </div>
    );
};

export default Canceled;
