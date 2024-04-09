import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
const SportTypeEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    // const [missionID, setMissionID] = useState("");
    // const [eeljID, setEeljID] = useState("");

    const [genderName, setGenderName] = useState("");
    const [sportTypeName, setSportTypeName] = useState("");

    // const [getMissions, setMissions] = useState([]);
    // const [getEelj, setEeljs] = useState([]);
    const [getGender, setGender] = useState([]);
    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        axios
            .post("/get/gender/admin")
            .then((res) => {
                setGender(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    //     axios
    //         .get("/get/missions")
    //         .then((res) => {
    //             setMissions(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    // useEffect(() => {
    //     axios
    //         .post("/get/eelj/by/missionID", {
    //             _missionID: missionID,
    //         })
    //         .then((res) => {
    //             setEeljs(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [missionID]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            // setMissionID(props.changeDataRow.missionID);
            // setEeljID(props.changeDataRow.eeljID);
            setGenderName(props.changeDataRow.genderID);
            setSportTypeName(props.changeDataRow.sportTypeName);
        }
    }, [props.isEditBtnClick]);

    const saveSportType = () => {
        props.setRowsSelected([]);
        // if (missionID == "" || missionID == null) {
        //     Swal.fire("Ажиллагааны нэр сонгоно уу.");
        //     return;
        // }
        // if (eeljID == "" || eeljID == null) {
        //     Swal.fire("Ээлж сонгоно уу.");
        //     return;
        // }
        if (genderName == "" || genderName == null) {
            Swal.fire("Хүйс оруулна уу.");
            return;
        }
        if (sportTypeName == "" || sportTypeName == null) {
            Swal.fire("Нормативын төрөл оруулна уу.");
            return;
        }

        axios
            .post("/edit/sport/type", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                genderID: genderName,
                sportTypeName: sportTypeName,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                // setMissionID("");
                // setEeljID("");
                setGenderName("");
                setSportTypeName("");
                setShowModal("");

                props.refreshSportType(
                    state.getMissionRowID,
                    state.getEeljRowID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    // const changeMission = (e) => {
    //     setMissionID(e.target.value);
    //     setEeljID("0");
    // };
    // const changeEelj = (e) => {
    //     setEeljID(e.target.value);
    // };
    const changeGender = (e) => {
        setGenderName(e.target.value);
    };
    const changeSportTypeName = (e) => {
        setSportTypeName(e.target.value);
    };

    return (
        <>
            <div className="modal" id="sportTypeEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                НОРМАТИВЫН ТӨРӨЛ ЗАСАХ
                            </h4>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ажиллагааны нэр:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeMission}
                                        value={missionID}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getMissions.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.missionName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Ээлж:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeEelj}
                                        value={eeljID}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getEelj.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.eeljName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Хүйс:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeGender}
                                        value={genderName}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getGender.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.genderName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Нормативын төрөл:
                                        </span>
                                    </div>
                                    <input
                                        className="form-control"
                                        onChange={changeSportTypeName}
                                        value={sportTypeName}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveSportType}
                            >
                                Засах
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Хаах
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SportTypeEdit;
