import React, { useState, useEffect, useContext } from "react";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
// import SpyMainDes from "./SpyMainDes";
import SpyMainHolbogdson from "./SpyMainHolbogdson";
import SpyMainHolbogdolgui from "./SpyMainHolbogdolgui";

const SpyMain = () => {
    const state = useContext(AppContext);

    const [getSpyState, setSpyState] = useState("");

    const changeSpyState = (e) => {
        setSpyState(e.target.value);
    };

    // const fn_confirm_btn = (value, tableMeta, updateValue) => {
    //     Swal.fire({
    //         title: "Та зөвшөөрөхдөө итгэлтэй байна уу?",
    //         showCancelButton: true,
    //         confirmButtonText: `Тийм`,
    //         cancelButtonText: `Үгүй`,
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios
    //                 .post("/is/crime/confirm", {
    //                     id: getSpyMain[tableMeta.rowIndex].id,
    //                 })
    //                 .then((res) => {
    //                     Swal.fire(res.data.msg);
    //                     refreshSpyMain(
    //                         state.getMissionRowID,
    //                         state.getEeljRowID,
    //                         getSpyState,
    //                         getComandlalID,
    //                         getUnitID
    //                     );
    //                     setShowModal("");
    //                 })
    //                 .catch((err) => {
    //                     Swal.fire(err.response.data.msg);
    //                 });
    //         } else if (result.isDenied) {
    //         }
    //     });
    // };

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
                            onChange={changeSpyState}
                        >
                            <option value="">Сонгоно уу</option>
                            <option value="0">Холбогдоогүй</option>
                            <option value="2">Холбогдсон</option>
                        </select>
                    </div>
                </div>
            </div>

            {getSpyState == "0" && <SpyMainHolbogdolgui />}
            {/* {clickedRowData != "" && (
                <SpyMainDes clickedRowData={clickedRowData} />
            )} */}
            {getSpyState == "2" && <SpyMainHolbogdson />}
        </div>
    );
};

export default SpyMain;
