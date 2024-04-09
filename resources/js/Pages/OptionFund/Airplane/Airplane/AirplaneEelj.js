import React, { useEffect, useState } from "react";

const AirplaneEelj = (props) => {
    const [isProps, setProps] = useState(false);
    useEffect(() => {
        setProps(true);
    }, []);
    return (
        <>
            {isProps && (
                <div className="col-sm-6 col-lg-3 col-12">
                    <div className="bg-info small-box">
                        <div className="inner">
                            <h3>{props.el.eelj}</h3>
                            <p>{props.el.eeljName}</p>
                        </div>
                        <div className="icon">
                            <i className="fas fa-calculator" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AirplaneEelj;
