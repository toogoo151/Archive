import React from "react";
import ReactDOM from "react";
import MyRoutes from "../Routes/MyRoutes";

export default function Content(props) {
     const {
        showFirstMenu,
        showSecondMenu,
        handleFirstMenuClick,
        handleSecondMenuClick,
    } = props;
    return (
        <>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                <section className="content">
                    <br />
                    <div className="container-fluid">
                        <MyRoutes
                          showFirstMenu={showFirstMenu}
                            showSecondMenu={showSecondMenu}
                             handleFirstMenuClick={handleFirstMenuClick}
                            handleSecondMenuClick={handleSecondMenuClick}
                        />
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}
        </>
    );
}

if (document.getElementById("content")) {
    ReactDOM.render(<Content />, document.getElementById("content"));
}
