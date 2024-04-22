import React, { useEffect, useState, useContext } from "react";

import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Imgicon from "../../../../../css/img/AjaxLoader.gif";
import Wrongicon from "../../../../../css/img/wrong.png";
import Righticon from "../../../../../css/img/tick.png";
import None from "../../../../../css/img/none.png";
import { AppContext } from "../../../../Context/MyContext";
import ProcessDes from "./ProcessDes";
// import HeltesDes from "./HeltesDes";
import PdfView from "./PdfView";

import ButtonShowModel from "../../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";

import "./style.css";

import axios from "axios";
import { Height } from "@material-ui/icons";
import { isEmpty } from "lodash";

// import axios from "../../../AxiosUser";

const OfficerProcess = () => {
    const state = useContext(AppContext);
    const [showText, setShowText] = useState(false);
    const [getMission, setMission] = useState([]);
    const [getEelj, setEelj] = useState([]);
    const [missionID, setMissionID] = useState("");
    const [eeljID, setEeljID] = useState("");

    const [isCheck, setIsCheck] = useState(null);
    const [getDocMain, setDocMain] = useState(0);
    const [getHealth, setHealth] = useState(0);
    const [getsport, setsport] = useState(0);
    const [getalcpt, setalcpt] = useState(0);
    const [getlanguage, setlanguage] = useState(0);
    const [getdriverApprove, setdriverApprove] = useState(0);
    const [getskillScore, setskillScore] = useState(0);






    const [checkPdf, setPdf] = useState("");
    const [languagecheckPdf, setlanguagePdf] = useState("");
    const [skillcheckPdf, setskillPdf] = useState("");




    const [getDesc, setDesc] = useState([]);
    const [getLastDescription, setLastDescription] = useState([]);

    const indexOfLastPost = getDesc;
    let currentPosts;
    useEffect(() => {
        if (getDesc !== null) {
            currentPosts = getDesc.slice(indexOfLastPost);
        }
    }, []);

    // const currentPosts = getDesc.slice(indexOfLastPost);

    const descArr = [];
    // const indexHeltesDes = getHeltesDes;

    // let currentHeltesDes;
    // useEffect(() => {
    //     if (getHeltesDes !== null) {
    //         currentHeltesDes = getHeltesDes.slice(indexHeltesDes);
    //     }
    // }, []);

    useEffect(() => {
        axios
            .get("/get/missions2")
            .then((res) => {
                setMission(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    //  const changeMission = (e) => {
    //     setMissionID(e.target.value);
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
    useEffect(() => {
        if (missionID !== "" && eeljID !== "") {
            setShowText(true);
        }
    }, [missionID, eeljID]);
    // useEffect(() => {
    //     axios
    //         .get("/get/checkTomilgoo")
    //         .then((res) => {
    //             setTomilgoo(res.data[0].isTomilogdson);

    //             // setTomilgoo(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    //       useEffect(() => {
    //     axios
    //         .get("/get/pdfView")
    //         .then((res) => {
    //              setPdf(res.data[0].healthPdf);

    //             // setTomilgoo(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    const changeMission = (e) => {
        setMissionID(e.target.value);
        axios
            .post("/get/eelj/by/missionID", {
                _missionID: e.target.value,
            })
            .then((res) => {
                setEelj(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // console.log(currentHeltesDes);
    const documentPdf = (checkPdf) => {
        let pdfUrl = "https://psod.maf.gov.mn/storage/" + checkPdf;

        // If checkPdf is null, use the backup PDF URL
        if (!checkPdf) {
            pdfUrl = "https://psod.maf.gov.mn/images/empty.pdf";
        }

        // Open the PDF in a new window
        const newWindow = window.open(
            pdfUrl,
            "_blank",
            "noopener,noreferrer,resizable"
        );

        if (newWindow) {
            // Avoid potential security issues by clearing the opener property
            newWindow.opener = null;
        } else {
            // Handle the case where the new window was blocked by the browser
            console.error("Алдаа.");
        }
    };

     const documentPdf1 = (languagecheckPdf) => {
        let pdfUrl = "https://psod.maf.gov.mn/storage/" + languagecheckPdf;

        // If checkPdf is null, use the backup PDF URL
        if (!languagecheckPdf) {
            pdfUrl = "https://psod.maf.gov.mn/images/empty.pdf";
        }

        // Open the PDF in a new window
        const newWindow = window.open(
            pdfUrl,
            "_blank",
            "noopener,noreferrer,resizable"
        );

        if (newWindow) {
            // Avoid potential security issues by clearing the opener property
            newWindow.opener = null;
        } else {
            // Handle the case where the new window was blocked by the browser
            console.error("Алдаа.");
        }
     };

      const documentPdf2 = (skillcheckPdf) => {
        let pdfUrl = "https://psod.maf.gov.mn/storage/" + skillcheckPdf;

        // If checkPdf is null, use the backup PDF URL
        if (!skillcheckPdf) {
            pdfUrl = "https://psod.maf.gov.mn/images/empty.pdf";
        }

        // Open the PDF in a new window
        const newWindow = window.open(
            pdfUrl,
            "_blank",
            "noopener,noreferrer,resizable"
        );

        if (newWindow) {
            // Avoid potential security issues by clearing the opener property
            newWindow.opener = null;
        } else {
            // Handle the case where the new window was blocked by the browser
            console.error("Алдаа.");
        }
     };




    //       const handlePdfButtonClick = () => {
    //     // Assuming you have the PDF file path in the state variable `checkPdf`
    //     documentPdf("http://127.0.0.1:8000/storage/" + checkPdf);
    //   };

    const refreshProcess = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/check/officer/process", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                                        console.log(res.data);

                    if (res.data == 0) {
                        setIsCheck(false);
                    } else {
                        setIsCheck(true);
                        // setShowText(false);

                        setDocMain(res.data[0].documentsMainApprove);
                        setHealth(res.data[0].healthApprove);
                        setsport(res.data[0].sportScore);
                        setlanguage(res.data[0].languageScore);
                        setalcpt(res.data[0].alcpt_score);

                        setdriverApprove(res.data[0].driverApprove);
                        setskillScore(res.data[0].skillScore);
                        setPdf(res.data[0].healthPdf);
                        setlanguagePdf(res.data[0].documentPdf);
                        setskillPdf(res.data[0].documentPdf);



                        // setDesc(res.data[0].docDescription);
                        setLastDescription(res.data);
                        for (let i = 0; i < res.data.length; i++) {
                            descArr.push(res.data[i].docDescription);
                        }
                        setDesc(descArr);
                        // setgetHeltesDes(res.data);

                        console.log(getDocMain)
                        if (getDesc.length === 0) {
                            setDesc([
                                /* initialize getDesc with some values */
                            ]);
                        }



                        // setName(res.data[0].adminName);

                        // setDesc(res.data.docDes);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    console.log(getLastDescription);
    // console.log(res.data);

    useEffect(() => {
        refreshProcess(missionID, eeljID);
    }, []);
    useEffect(() => {
        // refreshProcess(state.getMissionRowID, state.getEeljRowID);
        refreshProcess(missionID, eeljID);
    }, [missionID, eeljID]);

    let workIconStyles = {
        background: "green",
        textAlign: "center",
        fontSize: 35,
        justifyContent: "center",
        lineHeight: 1.2,
    };
    // let workIconStyles = { background: "#06D6A0" };
    let schoolIconStyles = {
        background: "rgb(33, 150, 243)",
        textAlign: "center",
        fontSize: 35,
        justifyContent: "center",
        lineHeight: 1.3,
    };
    let schoolIconStyles2 = {
        background: "red",
        textAlign: "center",
        fontSize: 35,
        justifyContent: "center",
        lineHeight: 1.3,
    };

    return (
        <div className="row">
            <div className="info-box">
                <div className="container mt-5">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    Ажиллагаа:
                                </span>
                            </div>
                            <select
                                className="form-control"
                                onChange={changeMission}
                                value={missionID}
                            >
                                <option value="">Сонгоно уу</option>
                                {getMission.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.missionName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Ээлж:</span>
                            </div>
                            <select
                                className="form-control"
                                onChange={(e) => {
                                    setEeljID(e.target.value);
                                }}
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
                    </div>
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            {!showText && (
                                <h2>Та ажиллагаа ээлжээ сонгоно уу!!!!</h2>
                            )}
                            {showText && !isCheck && (
                                <h2>Та хүсэлт илгээнэ үү</h2>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isCheck && (
                <>
                    <div className="info-box">
                        <div className="container mt-5">
                            <h1 className="text-center">Оролцооны байдал</h1>


                            <VerticalTimeline lineColor={"black"}>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        getDocMain == 0
                                            ? schoolIconStyles
                                            : getDocMain == 1
                                            ? workIconStyles
                                            : schoolIconStyles2
                                    }
                                    icon={
                                        getDocMain == 0 ? (
                                            <img src={Imgicon} alt="Imgicon" />
                                        ) : getDocMain == 1 ? (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        ) : (
                                            <img
                                                src={Wrongicon}
                                                alt="Wrongicon"
                                            />
                                        )
                                    }


                                >
                                    <h3 className="vertical-timeline-element-title">
                                        Бичиг баримтын бүрдэл <br />
                                        <br />
                                        <>


                                            {getDocMain === 2 && (
                                                <>
                                                    {getLastDescription.length !=
                                                        0 && (
                                                        <ProcessDes
                                                            // getDesc={
                                                            //     currentPosts
                                                            // }
                                                            getRowData={
                                                                getLastDescription
                                                            }
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </>
                                        {/* {mapDesc} */}
                                        {/* {getDesc} */}
                                    </h3>
                                </VerticalTimelineElement>

                                {/* <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    // date={getErHeltesmend}
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        getErHeltesmend == 0
                                            ? schoolIconStyles
                                            : getErHeltesmend == 1
                                            ? workIconStyles
                                            : schoolIconStyles2
                                    }
                                    icon={
                                        getDocMain == 1 &&
                                        getErHeltesmend == 0 ? (
                                            <img src={Imgicon} alt="Imgicon" />
                                        ) : getDocMain == 1 &&
                                          getErHeltesmend == 1 ? (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        ) : getDocMain == 1 &&
                                          getErHeltesmend == 2 ? (
                                            <img
                                                src={Wrongicon}
                                                alt="Wrongicon"
                                            />
                                        ) : (
                                            <img src={None} alt="None" />
                                        )
                                    }
                                >
                                    <h3 className="vertical-timeline-element-title">
                                        Эрүүл мэндийн үзлэгт орохыг зөвшөөрөх
                                    </h3>
                                    <br />

                                    {getDocMain === 1 && getErHeltesmend == 2 && (
                                        <>
                                            {getHeltesDes.length != 0 && (
                                                <HeltesDes
                                                    // getDesc={
                                                    //     currentPosts
                                                    // }
                                                    getRowData1={getHeltesDes}
                                                />
                                            )}
                                        </>
                                    )}


                                </VerticalTimelineElement> */}

                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        getHealth == 0
                                            ? schoolIconStyles
                                            : getHealth == 1
                                            ? workIconStyles
                                            : schoolIconStyles2
                                    }
                                    icon={
                                        getHealth == 0 ? (
                                            <img
                                                src={Imgicon}
                                                alt="Imgicon"
                                            />
                                        ):
                                          getHealth == 1 ? (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        ) :
                                          getHealth == 2 ? (
                                            <img
                                                src={Wrongicon}
                                                alt="Wrongicon"
                                            />
                                        ) : (
                                            <img src={None} alt="None" />
                                        )
                                    }

                                >
                                    <h3 className="vertical-timeline-element-title">
                                        Эрүүл мэндийн үзлэг
                                    </h3>

                                    <br></br>
                                    <>
                                        {/* <input
        type="text"
        value={"http://127.0.0.1:8000/storage/" + checkPdf}
        onChange={(e) => setPdf(e.target.value)}
        placeholder="Enter PDF File Path"
      /> */}

                                        {/* Button to open the PDF in a new window */}
                                        <button
                                            className="btn btn-warning btn-sm"
                                            style={{
                                                marginRight: "20px",
                                                width: "140px",
                                                height: "40px",
                                                fontSize: "15px",
                                            }}
                                            // onClick={() => documentPdf(value)}
                                            onClick={() =>
                                                documentPdf(checkPdf)
                                            }
                                        >
                                            PDF Харах
                                        </button>
                                    </>
                                </VerticalTimelineElement>

                                   <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        getalcpt == 0
                                            ? schoolIconStyles
                                            : workIconStyles
                                    }
                                    icon={
                                         getalcpt == 0 ? (
                                            <img src={Imgicon} alt="Imgicon" />
                                        ) : (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        )
                                    }

                                >
                                    <h3 className="vertical-timeline-element-title">
                                       AlCPT ( Дундаж оноо:
                                        {getalcpt})
                                    </h3>
                                </VerticalTimelineElement>

                                  <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        getlanguage == 0
                                            ? schoolIconStyles
                                            : workIconStyles
                                    }
                                    icon={
                                         getlanguage == 0 ? (
                                            <img src={Imgicon} alt="Imgicon" />
                                        ) : (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        )
                                    }

                                >
                                    <h3 className="vertical-timeline-element-title">
                                        Англи хэлний 4 чадвар ( Дундаж оноо:
                                        {getlanguage})
                                    </h3>
                                    <br></br>
                                         <button
                                            className="btn btn-warning btn-sm"
                                            style={{
                                                marginRight: "20px",
                                                width: "140px",
                                                height: "40px",
                                                fontSize: "15px",
                                            }}
                                            // onClick={() => documentPdf(value)}
                                            onClick={() =>
                                                documentPdf1(languagecheckPdf)
                                            }
                                        >
                                            PDF Харах
                                        </button>
                                </VerticalTimelineElement>

                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        getsport == 0
                                            ? schoolIconStyles
                                            : workIconStyles
                                    }
                                    icon={
                                        getsport == 0 ? (
                                            <img src={Imgicon} alt="Imgicon" />
                                        ) : (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        )
                                    }

                                >
                                    <h3 className="vertical-timeline-element-title">
                                        Бие бялдрын шалгалт ( Дундаж оноо:
                                        {getsport})
                                    </h3>
                                </VerticalTimelineElement>

                             <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        getdriverApprove == 0
                                            ? schoolIconStyles
                                            : getdriverApprove == 1
                                            ? workIconStyles
                                            : schoolIconStyles2
                                    }


                                        icon={
                                        getdriverApprove == 0 ? (
                                            <img src={Imgicon} alt="Imgicon" />
                                        ) : getdriverApprove == 1 ? (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        ) : (
                                            <img
                                                src={Wrongicon}
                                                alt="Wrongicon"
                                            />
                                        )
                                    }

                                    // icon={
                                    //    getdriverApprove == 1 ? (
                                    //         <img
                                    //             src={Righticon}
                                    //             alt="Righticon"
                                    //         />
                                    //     ) : (
                                    //         <img
                                    //             src={Wrongicon}
                                    //             alt="Wrongicon"
                                    //         />
                                    //     )
                                    // }


                                >
                                    <h3 className="vertical-timeline-element-title">
                                       Жолооны шалгалт <br />
                                        <br />
                                        {/* <>


                                            {getdriverApprove === 2 && (
                                                <>
                                                    {getLastDescription.length !=
                                                        0 && (
                                                        <ProcessDes
                                                            // getDesc={
                                                            //     currentPosts
                                                            // }
                                                            getRowData={
                                                                getLastDescription
                                                            }
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </> */}
                                        {/* {mapDesc} */}
                                        {/* {getDesc} */}
                                    </h3>
                                </VerticalTimelineElement>

                                {/* <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        (checkTomilogdson == 0 &&
                                            getTomilogdson == 0) ||
                                        (checkTomilogdson == 1 &&
                                            getTomilogdson == 0) ||
                                        (checkTomilogdson == 0 &&
                                            getTomilogdson == 1)
                                            ? schoolIconStyles
                                            : checkTomilogdson == 1 &&
                                              getTomilogdson == 1
                                            ? workIconStyles
                                            : schoolIconStyles2
                                    }
                                    icon={
                                        (checkTomilogdson == 0 &&
                                            getsport > 0 &&
                                            getTomilogdson == 0) ||
                                        (checkTomilogdson == 0 &&
                                            getsport > 0 &&
                                            getTomilogdson == 1) ||
                                        (checkTomilogdson == 1 &&
                                            getsport > 0 &&
                                            getTomilogdson == 0) ? (
                                            <img src={Imgicon} alt="Imgicon" />
                                        ) : checkTomilogdson == 1 &&
                                          getsport > 0 &&
                                          getTomilogdson == 1 ? (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        ) : checkTomilogdson == 1 &&
                                          getsport > 0 &&
                                          getTomilogdson == 2 ? (
                                            <img
                                                src={Wrongicon}
                                                alt="Wrongicon"
                                            />
                                        ) : (
                                            <img src={None} alt="None" />
                                        )
                                    }

                                >
                                    <h3 className="vertical-timeline-element-title">
                                        Томилгоо
                                    </h3>
                                </VerticalTimelineElement> */}

                                      <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight:
                                            "7px solid  rgb(33, 150, 243)",
                                    }}
                                    iconStyle={
                                        getskillScore == 0
                                            ? schoolIconStyles
                                            : workIconStyles
                                    }
                                    icon={
                                         getskillScore == 0 ? (
                                            <img src={Imgicon} alt="Imgicon" />
                                        ) : (
                                            <img
                                                src={Righticon}
                                                alt="Righticon"
                                            />
                                        )
                                    }

                                >
                                    <h3 className="vertical-timeline-element-title">
                                       Ур чадвар( Дундаж оноо:
                                        {getskillScore})
                                    </h3>

                                         <br></br>
                                         <button
                                            className="btn btn-warning btn-sm"
                                            style={{
                                                marginRight: "20px",
                                                width: "140px",
                                                height: "40px",
                                                fontSize: "15px",
                                            }}
                                            // onClick={() => documentPdf(value)}
                                            onClick={() =>
                                                documentPdf2(skillcheckPdf)
                                            }
                                        >
                                            PDF Харах
                                        </button>
                                </VerticalTimelineElement>



                                <VerticalTimelineElement
                                    iconStyle={{
                                        background: "rgb(0, 0, 0)",
                                        color: "#fff",
                                        textAlign: "center",
                                        fontSize: 35,
                                        justifyContent: "center",
                                    }}
                                />
                            </VerticalTimeline>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default OfficerProcess;
