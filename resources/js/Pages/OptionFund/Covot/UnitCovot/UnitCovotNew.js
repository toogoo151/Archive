import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../../AxiosUser";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const UnitCovotNew = (props) => {
    const state = useContext(AppContext);
    // const [getMission, setMission] = useState([]);
    // const [getEelj, setEelj] = useState([]);
    const [getComandlalID, setComandlalID] = useState([]);
    const [getUnitID, setUnitID] = useState([]);

    const [getComandlalIDFirst, setComandlalIDFirst] = useState("");
    const [getUnitIDFirst, setUnitIDFirst] = useState("");

    useEffect(() => {
        // axios
        //     .get("/get/missions")
        //     .then((res) => {
        //         setMission(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                if (userType === "comandlalAdmin" || userType === "unitAdmin") {
                    setComandlalIDFirst(res.data.firstComandlal);
                    setComandlalID(res.data.getComandlals);
                    fnSetComandlal(res.data.firstComandlal["id"]);
                }
                if (userType === "superAdmin") {
                    setComandlalID(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const formSchema = Yup.object().shape({
        // missionID: Yup.string().required("Ажиллагааны нэр сонгоно уу."),
        // eeljID: Yup.string().required("Ээлж сонгоно уу."),
        comandlalID: Yup.string().required("Командлал сонгоно уу."),
        unitID: Yup.string().required("Анги сонгоно уу."),
        covotUnitSum: Yup.string().required("Нийт тоо оруулна уу."),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (data) => {
        if (props.covotRemained >= data.covotUnitSum) {
            axios
                .post("/new/unit/covot", {
                    missionID: state.getMissionRowID,
                    eeljID: state.getEeljRowID,
                    comandlalID: data.comandlalID,
                    unitID: data.unitID,
                    covotOppitser: data.covotOppitser,
                    covotAhlagch: data.covotAhlagch,
                    covotGereet: data.covotGereet,
                    covotUnitSum: data.covotUnitSum,
                    covotDescription: data.covotDescription,
                })
                .then((res) => {
                    Swal.fire(res.data.msg);
                    props.getCovotSum(
                        state.getMissionRowID,
                        state.getEeljRowID
                    );
                    reset(
                        {
                            // missionID: "0",
                            // eeljID: "0",
                            comandlalID: "0",
                            unitID: "0",
                            covotOppitser: "",
                            covotAhlagch: "",
                            covotGereet: "",
                            covotUnitSum: "",
                            covotDescription: "",
                        },
                        {
                            keepIsSubmitted: false,
                            keepTouched: false,
                            keepIsValid: false,
                            keepSubmitCount: false,
                        }
                    );
                    props.refreshUnitCovot(
                        state.getMissionRowID,
                        state.getEeljRowID
                    );
                })
                .catch((err) => {
                    Swal.fire(err.response.data.msg);
                });
        } else {
            Swal.fire("Боломжит үлдэгдлээс давсан байна.");
        }
    };

    // const changeMission = (e) => {
    //     axios
    //         .post("/get/eelj/by/missionID", {
    //             _missionID: e.target.value,
    //         })
    //         .then((res) => {
    //             setEelj(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    const fnSetComandlal = (inComandlal) => {
        axios
            .post("/get/ID/byUnit", {
                _comandlalID: inComandlal,
            })
            .then((res) => {
                if (userType === "unitAdmin") {
                    setUnitIDFirst(res.data.firstUnit);
                    setUnitID(res.data.getUnits);
                }
                if (
                    userType === "superAdmin" ||
                    userType === "comandlalAdmin"
                ) {
                    setUnitID(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="modal" id="unitCovotNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">БОЛОМЖИТ ҮЛДЭГДЭЛ:</h4>
                            <h2 className="modal-title">
                                {" " + props.covotRemained}
                            </h2>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                                {...register("missionID")}
                                                onChange={changeMission}
                                            >
                                                <option value="0">
                                                    Сонгоно уу
                                                </option>
                                                {getMission.map((el) => (
                                                    <option
                                                        key={el.id}
                                                        value={el.id}
                                                    >
                                                        {el.missionName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p className="alerts">
                                            {errors.missionID?.message}
                                        </p>
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
                                                {...register("eeljID")}
                                            >
                                                <option value="0">
                                                    Сонгоно уу
                                                </option>
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
                                        <p className="alerts">
                                            {errors.eeljID?.message}
                                        </p>
                                    </div>
                                </div> */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Командлал:
                                                </span>
                                            </div>
                                            {userType == "superAdmin" ? (
                                                <select
                                                    className="form-control"
                                                    {...register(
                                                        "comandlalID",
                                                        {
                                                            onChange: (e) => {
                                                                fnSetComandlal(
                                                                    e.target
                                                                        .value
                                                                );
                                                            },
                                                        }
                                                    )}
                                                >
                                                    <option value="0">
                                                        Сонгоно уу
                                                    </option>
                                                    {getComandlalID.map(
                                                        (el) => (
                                                            <option
                                                                key={el.id}
                                                                value={el.id}
                                                            >
                                                                {
                                                                    el.comandlalShortName
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            ) : (
                                                <select
                                                    className="form-control"
                                                    {...register(
                                                        "comandlalID",
                                                        setValue(
                                                            "comandlalID",
                                                            getComandlalIDFirst[
                                                                "id"
                                                            ]
                                                        )
                                                    )}
                                                    disabled={true}
                                                >
                                                    {getComandlalID.map(
                                                        (el) => (
                                                            <option
                                                                key={el.id}
                                                                value={el.id}
                                                            >
                                                                {
                                                                    el.comandlalShortName
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            )}
                                        </div>
                                        <p className="alerts">
                                            {errors.comandlalID?.message}
                                        </p>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    Анги:
                                                </span>
                                            </div>
                                            {userType == "superAdmin" ||
                                            userType == "comandlalAdmin" ? (
                                                <select
                                                    className="form-control"
                                                    {...register("unitID")}
                                                >
                                                    <option value="0">
                                                        Сонгоно уу
                                                    </option>
                                                    {getUnitID.map((el) => (
                                                        <option
                                                            key={el.id}
                                                            value={el.id}
                                                        >
                                                            {el.unitShortName}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <select
                                                    className="form-control"
                                                    {...register(
                                                        "unitID",
                                                        setValue(
                                                            "unitID",
                                                            getUnitIDFirst["id"]
                                                        )
                                                    )}
                                                    value={getUnitIDFirst["id"]}
                                                    disabled={true}
                                                >
                                                    <option value="0">
                                                        Сонгоно уу
                                                    </option>
                                                    {getUnitID.map((el) => (
                                                        <option
                                                            key={el.id}
                                                            value={el.id}
                                                        >
                                                            {el.unitShortName}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                        <p className="alerts">
                                            {errors.unitID?.message}
                                        </p>
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
                                                {...register("covotOppitser")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.covotOppitser?.message}
                                        </p>
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
                                                {...register("covotAhlagch")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.covotAhlagch?.message}
                                        </p>
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
                                                {...register("covotGereet")}
                                                className="form-control"
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.covotGereet?.message}
                                        </p>
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
                                            {...register("covotUnitSum")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.covotUnitSum?.message}
                                    </p>
                                </div>
                                <div className="col-row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Тайлбар:
                                            </span>
                                        </div>
                                        <textarea
                                            {...register("covotDescription")}
                                            className="form-control"
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.covotDescription?.message}
                                    </p>
                                </div>
                            </div>

                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    data-dismiss=""
                                >
                                    Нэмэх
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Хаах
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnitCovotNew;
