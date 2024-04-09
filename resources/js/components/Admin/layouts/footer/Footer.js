import React from "react";
import ReactDOM from "react";

export default function Footer() {
    return (
        <div>
            <footer className="main-footer">
                <strong>
                    Зэвсэгт хүчний Программ хангамжийн төвд хөгжүүлэв © Бүх эрх
                    хуулиар хамгаалагдсан 2023
                </strong>
            </footer>
        </div>
    );
}

if (document.getElementById("footer")) {
    ReactDOM.render(<Footer />, document.getElementById("footer"));
}
