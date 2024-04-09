import React, { useState } from "react";
import UuregGuitsetgeltInfo from "./UuregGuitsetgeltInfo";
import UuregGuitsetgeltMain from "./UuregGuitsetgeltMain";

const UuregGuitsetgelt = () => {
    const [getUuregGuitsetgelt, setUuregGuitsetgelt] = useState("");

    const changeUuregGuitsetgelt = (e) => {
        setUuregGuitsetgelt(e.target.value);
    };

    return (
        <div>
            <div
                className="info-box"
                style={{ padding: "20px", paddingBottom: "0px" }}
            >
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Төлөв:</span>
                        </div>

                        <select
                            className="form-control"
                            onChange={changeUuregGuitsetgelt}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="insertNews">Мэдээ оруулах</option>
                            <option value="seeNews">Мэдээ харах</option>
                        </select>
                    </div>
                </div>
            </div>
            {getUuregGuitsetgelt != "" && (
                <>
                    {getUuregGuitsetgelt == "insertNews" ? (
                        <UuregGuitsetgeltInfo />
                    ) : (
                        <UuregGuitsetgeltMain />
                    )}
                </>
            )}
        </div>
    );
};

export default UuregGuitsetgelt;
