import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { array } from "yup/lib/locale";

const YearChart = (props) => {
    const [isProps, setProps] = useState(false);

    useEffect(() => {
        setProps(true);
        props.refreshYearWish(
            props.getComandlalID,
            props.getUnitID,
            props.getGender
        );
    }, []);

    return (
        <>
            {isProps && (
                <div className="col-md-6" style={{ paddingBottom: "5px" }}>
                    <div className="card">
                        <div className="card-header" style={{ height: "50px" }}>
                            <h5>
                                {
                                    "Хүсэлт илгээсэн ЦАХ-дын тоо" + " - "
                                    // + props.el.years
                                }
                            </h5>
                        </div>
                        <div className="card-body">
                            <Chart
                                type="bar"
                                width="100%"
                                height="200"
                                series={props.el.data}
                                options={{
                                    chart: {
                                        type: "bar",
                                        height: 350,
                                    },
                                    plotOptions: {
                                        bar: {
                                            horizontal: false,
                                            columnWidth: "55%",
                                            borderRadius: 12,
                                            endingShape: "rounded",
                                            dataLabels: {
                                                position: "top", // top, center, bottom
                                            },
                                        },
                                    },
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function (val) {
                                            return val + "";
                                        },
                                        offsetY: -20,
                                        style: {
                                            fontSize: "12px",
                                            colors: ["#304758"],
                                        },
                                    },
                                    fill: {
                                        opacity: 1,
                                    },
                                    stroke: {
                                        show: true,
                                        width: 2,
                                        colors: ["transparent"],
                                    },
                                    tooltip: {
                                        shared: true,
                                        intersect: false,
                                    },

                                    xaxis: {
                                        categories: [""],
                                    },
                                }}
                            ></Chart>
                        </div>
                    </div>
                </div>
                //  {getData.map((el) => (

                //  ))}
            )}
        </>
    );
};

export default YearChart;
