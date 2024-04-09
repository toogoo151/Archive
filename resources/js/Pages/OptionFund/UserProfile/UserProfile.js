import React, { useRef, useEffect, useState } from "react";
import axios from "../../../AxiosUser";

const UserProfile = () => {
    const [getInformation, setInformation] = useState([]);
    // const fileInputRef = useRef(null);

    // const handleClick = () => {
    //     fileInputRef.current.click();
    // };

    useEffect(() => {
        axios
            .get("/get/user/information")
            .then((res) => {
                setInformation(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const colorStyle = {
        color: "#026EC8",
    };

    return (
        <div>
            <link
                href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
                rel="stylesheet"
                id="bootstrap-css"
            />
            {/*---- Include the above in your HEAD tag --------*/}
            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img
                                    src={
                                        getInformation.image != 0
                                            ? "https://psod.maf.gov.mn/storage" +
                                              getInformation.image
                                            : "https://psod.maf.gov.mn/storage/profile/No-photo.jpg"
                                    }
                                    style={{
                                        width: "250px",
                                        height: "250px",
                                        borderRadius: "12%",
                                        border: "1px solid",
                                    }}
                                />
                                <div>
                                    {/* <button
                                        style={{
                                            display: "block",
                                            width: "275px",
                                            height: "30px",
                                            border: "none",
                                            textAlign: "center",
                                            backgroundColor: "green",
                                        }}
                                        onClick={handleClick}
                                    >
                                        Зураг солих
                                    </button>
                                    <input
                                        type="file"
                                        name="file"
                                        id="getFile"
                                        accept="image/*"
                                        style={{
                                            display: "none",
                                        }}
                                        ref={fileInputRef}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {getInformation.lastName}{" "}
                                    {getInformation.firstName}
                                </h5>
                                <h6 style={colorStyle}>
                                    {getInformation.position}
                                </h6>
                                <p className="proile-rating">
                                    {getInformation.unit}
                                </p>
                                <ul
                                    className="nav nav-tabs"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-toggle="tab"
                                            href="#home"
                                            role="tab"
                                            aria-controls="home"
                                            aria-selected="true"
                                        >
                                            Тухай
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="profile-tab"
                                            data-toggle="tab"
                                            href="#profile"
                                            role="tab"
                                            aria-controls="profile"
                                            aria-selected="false"
                                        >
                                            Бусад
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-md-2">
                            <input
                                type="submit"
                                className="profile-edit-btn"
                                name="btnAddMore"
                                defaultValue="Edit Profile"
                            />
                        </div> */}
                    </div>
                    <div className="row" style={{ paddingTop: "30px" }}>
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>ЗААВАР</p>
                                <a
                                    href="https://wpsic-mongolia2022.gov.mn/images/User.pdf"
                                    target="_blank"
                                >
                                    PDF заавар
                                </a>
                                <br />
                                <a
                                    href="https://wpsic-mongolia2022.gov.mn/images/Batalgaajuulalt.mp4"
                                    target="_blank"
                                >
                                    Баталгаажуулах заавар
                                </a>
                                <br />
                                <a
                                    href="https://wpsic-mongolia2022.gov.mn/images/Document.mp4"
                                    target="_blank"
                                >
                                    Бичиг баримт оруулах заавар
                                </a>
                                <br />
                                <br />
                                <p>
                                    Таны хувийн мэдээлэл зөрүүтэй байвал харьяа
                                    анги, байгууллагынхаа хүний нөөцийн
                                    мэргэжилтнээр засуулна уу.
                                </p>
                                <br />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div
                                className="tab-content profile-tab"
                                id="myTabContent"
                            >
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Регистрийн дугаар</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.rd}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Овог</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.lastName}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Нэр</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.firstName}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Нас</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.age}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Хүйс</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.genderName}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>
                                                Гадаад паспортын дугаар, дуусах
                                                хугацаа:
                                            </label>
                                            <p style={colorStyle}>
                                                {getInformation.foreignPass !=
                                                null
                                                    ? getInformation.foreignPass
                                                    : "Хоосон"}
                                                {", "}
                                                {getInformation.foreignFinishDate !=
                                                "2010-01-01"
                                                    ? getInformation.foreignFinishDate
                                                    : "Хоосон"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="profile"
                                    role="tabpanel"
                                    aria-labelledby="profile-tab"
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Командлал</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.comandlal}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Анги</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.unit}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Цол</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.rank}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Албан тушаал</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.position}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Утас</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Имэйл</label>
                                        </div>
                                        <div
                                            className="col-md-6"
                                            style={colorStyle}
                                        >
                                            <p>{getInformation.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
