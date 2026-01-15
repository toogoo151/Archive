import ReactDOM from "react";

export default function Footer() {
    return (
        <footer
            className="main-footer"
            style={{
                textAlign: "center",
                padding: "10px 0",
                backgroundColor: "#f4f4f4", // optional background
                color: "#333", // optional text color
                fontWeight: "500",
            }}
        >
            Зэвсэгт хүчний Программ хангамжийн төвд хөгжүүлэв © Бүх эрх хуулиар
            хамгаалагдсан 2025
        </footer>
    );
}

if (document.getElementById("footer")) {
    ReactDOM.render(<Footer />, document.getElementById("footer"));
}
