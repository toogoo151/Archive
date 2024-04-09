import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
const WishGrapicChart = (props) => {
    const [isProps, setProps] = useState(false);
    useEffect(() => {
        setProps(true);
    }, []);
    return (
        <>
            {isProps && (
                <div className="col-md-4" style={{ paddingBottom: "5px" }}>
                    <div className="card">
                        <div className="card-header" style={{ height: "50px" }}>
                            <h5>{props.el.name}</h5>
                        </div>
                        <div className="card-body">
                            <Chart
                                key={props.el.name}
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
            )}
        </>
    );
};

export default WishGrapicChart;
