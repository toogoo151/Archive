import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const ComandlalCovotEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");
    // const [missionID, setMissionID] = useState("");
    // const [eeljID, setEeljID] = useState("");
    const [comandlalID, setComandlalID] = useState("");
    const [covotOppitser, setCovotOppitser] = useState("");
    const [covotAhlagch, setCovotAhlagch] = useState("");
    const [covotGereet, setCovotGereet] = useState("");
    const [covotComandlalSum, setCovotComandlalSum] = useState("");
    const [covotDescription, setCovotDescription] = useState("");

    // const [getMissions, setMissions] = useState([]);
    // const [getEelj, setEeljs] = useState([]);
    const [getComandlals, setComandlals] = useState([]);
    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        // axios
        //     .get("/get/missions")
        //     .then((res) => {
        //         setMissions(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        axios
            .get("/get/comandlal")
            .then((res) => {
                setComandlals(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
            setComandlalID(props.changeDataRow.comandlalID);
            setCovotOppitser(
                props.changeDataRow.covotOppitser != null
                    ? props.changeDataRow.covotOppitser
                    : ""
            );
            setCovotAhlagch(
                props.changeDataRow.covotAhlagch != null
                    ? props.changeDataRow.covotAhlagch
                    : ""
            );
            setCovotGereet(
                props.changeDataRow.covotGereet != null
                    ? props.changeDataRow.covotGereet
                    : ""
            );
            setCovotComandlalSum(props.changeDataRow.covotComandlalSum);
            setCovotDescription(
                props.changeDataRow.covotDescription != null
                    ? props.changeDataRow.covotDescription
                    : ""
            );
        }
    }, [props.isEditBtnClick]);

    const saveComandlalCovot = () => {
        props.setRowsSelected([]);
        // if (missionID == "" || missionID == null) {
        //     Swal.fire("Ажиллагааны нэр сонгоно уу.");
        //     return;
        // }
        // if (eeljID == "" || eeljID == null) {
        //     Swal.fire("Ээлж сонгоно уу.");
        //     return;
        // }
        if (comandlalID == "" || comandlalID == null) {
            Swal.fire("Командлал сонгоно уу.");
            return;
        }
        if (covotComandlalSum == "" || covotComandlalSum == null) {
            Swal.fire("Нийт тоо оруулна уу.");
            return;
        }

        axios
            .post("/edit/comandlal/covot", {
                id: props.changeDataRow.id,

                missionID: state.getMissionRowID,
                eeljID: state.getEeljRowID,
                comandlalID: comandlalID,
                covotOppitser: covotOppitser,
                covotAhlagch: covotAhlagch,
                covotGereet: covotGereet,
                covotComandlalSum: covotComandlalSum,
                covotDescription: covotDescription,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                // setMissionID("");
                // setEeljID("");
                setComandlalID("");
                setCovotOppitser("");
                setCovotAhlagch("");
                setCovotGereet("");
                setCovotComandlalSum("");
                setCovotDescription("");
                setShowModal("");

                props.refreshComandlalCovot(
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

    const changeComandlal = (e) => {
        setComandlalID(e.target.value);
    };
    const changeOpitser = (e) => {
        setCovotOppitser(e.target.value);
    };
    const changeAhlagch = (e) => {
        setCovotAhlagch(e.target.value);
    };

    const changeGereet = (e) => {
        setCovotGereet(e.target.value);
    };
    const changeSum = (e) => {
        setCovotComandlalSum(e.target.value);
    };
    const changeDescription = (e) => {
        setCovotDescription(e.target.value);
    };

    return (
        <>
            <div className="modal" id="comandlalCovotEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                КОМАНДЛАЛД ОЛГОСОН КВОТ ЗАСАХ
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
                                <div className="col-md-6">
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
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.missionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
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
                                                <option
                                                    key={el.id}
                                                    value={el.id}
                                                >
                                                    {el.eeljName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Командлал:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeComandlal}
                                        value={comandlalID}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        {getComandlals.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.comandlalShortName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Офицер:
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control"
                                            onChange={changeOpitser}
                                            value={covotOppitser}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Ахлагч:
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control"
                                            onChange={changeAhlagch}
                                            value={covotAhlagch}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Гэрээт:
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            min={0}
                                            className="form-control"
                                            onChange={changeGereet}
                                            value={covotGereet}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Нийт:
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        onChange={changeSum}
                                        value={covotComandlalSum}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Тайлбар:
                                        </span>
                                    </div>
                                    <textarea
                                        className="form-control"
                                        onChange={changeDescription}
                                        value={covotDescription}
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
                                onClick={saveComandlalCovot}
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

export default ComandlalCovotEdit;
