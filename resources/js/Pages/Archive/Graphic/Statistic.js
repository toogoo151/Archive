import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { MdFolder, MdPeople, MdSchool } from "react-icons/md";
import axios from "../../../AxiosUser";

const Statistic = () => {
    const [classCount, setClassCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [hutheregCount, setHutheregCount] = useState(0);

    useEffect(() => {
        refreshStatic();
    }, []);

    const refreshStatic = () => {
        axios.post("/get/ClaccCount").then((res) => setClassCount(res.data));
        axios.post("/get/Usercount").then((res) => setUserCount(res.data));
        axios
            .post("/get/HutheregCount")
            .then((res) => setHutheregCount(res.data));
    };

    // Card-ийн background өнгө
    const cardBackgrounds = ["#f0f8ff", "#ffe4e1", "#e6ffe6", "#fff5e6"];
    const iconGradients = [
        "linear-gradient(270deg, #ff416c, #ff4b2b, #ffcc33, #ff416c)",
        "linear-gradient(270deg, #4776E6, #8E54E9, #6a11cb, #4776E6)",
        "linear-gradient(270deg, #11998e, #38ef7d, #11998e, #11998e)",
        "linear-gradient(270deg, #f7971e, #ffd200, #f7971e, #ffd200)",
    ];

    const StatCard = ({ title, value, icon: Icon, cardBg, iconGradient }) => (
        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
            <div
                className="hover-card"
                style={{
                    backdropFilter: "blur(5px)",
                    background: cardBg,
                    borderRadius: "16px",
                    padding: "20px",
                    color: "#000",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    <h6
                        style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#000",
                        }}
                    >
                        {title}
                    </h6>
                    <h2
                        style={{
                            fontWeight: "bold",
                            marginTop: "5px",
                            fontSize: "22px",
                            color: "#000",
                        }}
                    >
                        <CountUp end={value} duration={1.5} separator="," />
                    </h2>
                </div>

                <div
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: iconGradient,
                        backgroundSize: "400% 400%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        animation: "gradientAnimation 10s ease infinite",
                        marginLeft: "10px",
                    }}
                >
                    <Icon />
                </div>
            </div>
        </div>
    );

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col-12 text-center">
                    <h2 style={{ fontWeight: "700", color: "#000" }}>
                        📊 НИЙТ СТАТИСТИК ҮЗҮҮЛЭЛТ
                    </h2>
                    <p style={{ color: "#555", fontSize: "14px" }}>
                        Системийн ерөнхий мэдээлэл
                    </p>
                </div>
            </div>

            <div className="row g-3">
                <StatCard
                    title="Нийт бүртгэгдсэн анги"
                    value={classCount}
                    icon={MdSchool}
                    cardBg={cardBackgrounds[0]}
                    iconGradient={iconGradients[0]}
                />

                <StatCard
                    title="Нийт бүртгэгдсэн системийн хэрэглэгч"
                    value={userCount}
                    icon={MdPeople}
                    cardBg={cardBackgrounds[1]}
                    iconGradient={iconGradients[1]}
                />

                <StatCard
                    title="Нийт бүртгэгдсэн хөтлөх хэргийн жагсаалт"
                    value={hutheregCount}
                    icon={MdFolder}
                    cardBg={cardBackgrounds[2]}
                    iconGradient={iconGradients[2]}
                />

                <StatCard
                    title="Нэмэлт статистик"
                    value={1234}
                    icon={MdFolder}
                    cardBg={cardBackgrounds[3]}
                    iconGradient={iconGradients[3]}
                />
                {/* <StatCard
                    title="Нэмэлт статистик"
                    value={1234}
                    icon={MdFolder}
                    cardBg={cardBackgrounds[3]}
                    iconGradient={iconGradients[3]}
                />
                <StatCard
                    title="Нэмэлт статистик"
                    value={1234}
                    icon={MdFolder}
                    cardBg={cardBackgrounds[3]}
                    iconGradient={iconGradients[3]}
                /> */}
            </div>

            {/* Hover and gradient animation CSS */}
            <style>{`
        .hover-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </div>
    );
};

export default Statistic;
