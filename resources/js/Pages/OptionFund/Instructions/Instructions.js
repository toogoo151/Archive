import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "../../../AxiosUser";
import "./Instructions.css";

const Instructions = () => {
    return (
        <>
            <>
                {userType === "superAdmin" && (
                    <div className="row">
                        <div className="info-box1">
                            <div className="container mt-5">
                                <h1
                                    className="text-center"
                                    style={{
                                        fontSize: "27px",
                                        fontWeight: "bold",
                                        color: "black",
                                    }}
                                >
                                    Энхийг дэмжих ажиллагааны веб программын
                                    ашиглах заавар хэсэг.
                                </h1>
                                <br /> <br />
                                <div className="player-container">
                                    {/* <ReactPlayer
                                        url="http://127.0.0.1:8000//images/Document.mp4"
                                        controls={true}
                                    /> */}
                                </div>
                                <br /> <br /> <br /> <br />
                            </div>
                        </div>
                    </div>
                )}

                {userType === "unitAdmin" && (
                    <div className="row">
                        <div className="info-box1">
                            <div className="container mt-5">
                                <h1
                                    className="text-center"
                                    style={{
                                        fontSize: "27px",
                                        fontWeight: "bold",
                                        color: "black",
                                    }}
                                >
                                    Энхийг дэмжих ажиллагааны веб программын
                                    ашиглах заавар хэсэг.
                                </h1>
                                <br /> <br />
                                <div className="player-container">
                                    {/* <ReactPlayer
                                        url="http://172.16.10.78:8000/images/zaavar.mp4"
                                        controls={true}
                                    /> */}
                                </div>
                                <br /> <br /> <br /> <br />
                            </div>
                        </div>
                    </div>
                )}

                {userType === "unitUser" && (
                    <div className="row">
                        <div className="info-box1">
                            <div className="container mt-5">
                                <h1
                                    className="text-center"
                                    style={{
                                        fontSize: "27px",
                                        fontWeight: "bold",
                                        color: "black",
                                    }}
                                >
                                    Энхийг дэмжих ажиллагааны веб программын
                                    ашиглах заавар хэсэг.
                                </h1>
                                <br /> <br />
                                <div className="player-container">
                                           <ReactPlayer
                                        url="http://127.0.0.1:8000/images/Document.mp4"
                                        controls={true}
                                    />
                                    {/* <ReactPlayer
                                        url="http://172.16.10.78:8000/images/zaavar.mp4"
                                        controls={true}
                                    /> */}
                                </div>
                                <br /> <br /> <br /> <br />
                            </div>
                        </div>
                    </div>
                )}
            </>
        </>
    );
};

export default Instructions;
