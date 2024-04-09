import WishGrapicChart from "./WishGrapicChart";
import { AppContext } from "../../../Context/MyContext";
import axios from "../../../AxiosUser";
import React, { useState, useEffect, useContext } from "react";
const WishGrapic = () => {
    const state = useContext(AppContext);
    const [getChartsData, setChartsData] = useState([]);
    const [isDataLength, setDataLength] = useState(0);

    useEffect(() => {
        fn_axiosChartsData(state.getMissionRowID, state.getEeljRowID);
    }, []);

    useEffect(() => {
        fn_axiosChartsData(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const fn_axiosChartsData = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/grapic/wishes", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setDataLength(res.data.length);
                    setChartsData(res.data);
                });
        }
    };
    return (
        <div className="row">
            {isDataLength > 0 &&
                getChartsData.map((el, index) => (
                    <WishGrapicChart key={index} el={el} />
                ))}
        </div>
    );
};

export default WishGrapic;
