import React, { useEffect, useState, useContext, useRef } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";

const ReasearchDownload = () => {
    const state = useContext(AppContext);
    const [getDatas, setDatas] = useState([]);
    const [getComandlals, setComandlals] = useState([]);
    const [getUnits, setUnits] = useState([]);
    const [getComandlalID, setComandlalID] = useState("");
    const [getUnitID, setUnitID] = useState("");
    useEffect(() => {
        axios
            .post("/get/ID/byComandlal")
            .then((res) => {
                setComandlals(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        // refreshSudalgaa();
    }, []);
    useEffect(() => {
        refreshSudalgaa();
    }, [state.getMissionRowID, state.getEeljRowID, getComandlalID, getUnitID]);

    const refreshSudalgaa = () => {
        axios
            .post("/get/all/users/researchs", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                _comandlalID: getComandlalID,
                _unitID: getUnitID,
            })
            .then((res) => {
                setDatas(res.data);
                console.log("res.data huleej bn");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeComandlal = (inComandlal) => {
        axios
            .post("/get/ID/byUnit", {
                _comandlalID: inComandlal,
            })
            .then((res) => {
                setUnits(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const config = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,

        filename: "Судалгаа",
        button: {
            excel: true,
            print: true,
            csv: false,
        },
        language: {
            length_menu: "Эхний _MENU_ мөрийг харж байна.",
            filter: "Хайх ...",
            info: "Эхний _START_ ээс _END_ өгөгдөл харж байна. Нийт _TOTAL_ өгөгдөл байна.",
            no_data_text: "Өгөгдөл олдсонгүй.",
            pagination: {
                first: "Эхний",
                previous: "Өмнхө",
                next: "Дараагийн",
                last: "Сүүлийн",
            },
        },
    };
    return (
        <div
            className="info-box flex-column"
            style={{
                paddingTop: "20px",
                paddingLeft: "15px",
                paddingBottom: "0px",
            }}
        >
            <div className="row">
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Командлал:</span>
                        </div>
                        <select
                            className="form-control"
                            value={getComandlalID}
                            onChange={(e) => {
                                setComandlalID(e.target.value);
                                changeComandlal(e.target.value);
                            }}
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
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Анги:</span>
                        </div>
                        <select
                            className="form-control"
                            onChange={(e) => {
                                setUnitID(e.target.value);
                            }}
                        >
                            <option value="">Сонгоно уу</option>
                            {getUnits.map((el) => (
                                <option key={el.id} value={el.id}>
                                    {el.unitShortName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <ReactDatatable
                        config={config}
                        columns={columns}
                        records={getDatas}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReasearchDownload;
const columns = [
    {
        text: "№",
        width: 50,
        key: "id",
        cell: (row, index) => {
            if (index == 0) {
                return (
                    <div className="bg-success position-static mt-2 rounded text-center p-1">
                        <span hidden={true}>{parseInt(index) + 1}</span>
                        <i className="fa fa-check text-white"></i>
                    </div>
                );
            } else {
                return (
                    <div className="bg-success position-static mt-2 rounded text-center p-1">
                        <span hidden={true}>{parseInt(index) + 1}</span>
                        <i className="fa fa-check text-white"></i>
                    </div>
                );
            }
        },
        align: "center",
        sortable: true,
    },
    {
        text: "Командлал",
        key: "comandlalShortName",
        align: "center",
        sortable: true,
    },
    {
        text: "Анги",
        key: "unitShortName",
        align: "center",
        sortable: true,
    },
    {
        text: "Албан тушаал",
        key: "positions",
        align: "center",
        sortable: true,
    },

    {
        text: "Цол",
        key: "shortRank",
        align: "center",
        sortable: true,
    },

    {
        text: "Овог",
        key: "lastName",
        align: "center",
        sortable: true,
    },
    {
        text: "Нэр",
        key: "firstName",
        align: "center",
        sortable: true,
    },
    {
        text: "Хүйс",
        key: "genderName",
        align: "center",
        sortable: true,
    },
    {
        text: "Боловсрол, Цэргийн мэргэжил, дамжаа төгссөн байдал",
        key: "education",
        align: "center",
        sortable: true,
    },
    {
        text: "Анги, байгууллагад ажилласан байдал",
        key: "angi_situation",
        align: "center",
        sortable: true,
    },
    {
        text: "Одоогийн албан тушаалд томилогдсон огноо",
        key: "last_joinDate",
        align: "center",
        sortable: true,
    },
    {
        text: "Энхийг дэмжих ажиллагаанд үүрэг гүйцэтгэсэн байдал",
        key: "performance",
        align: "center",
        sortable: true,
    },
    {
        text: "Англи хэлний түвшин тогтоох шалгалтын оноо / ALCPT, ECL,TOEFL, IELTS /  ",
        key: "english_score",
        align: "center",
        sortable: true,
    },
];
