import { Fragment, useState } from "react";
import "./Print.css";

const BaingaPrint = ({ show, onClose, selectedRowsData }) => {
    const [expandedRows, setExpandedRows] = useState([]);

    if (!show) return null;

    // Хэвлэх функц
    const handlePrint = () => {
        const original = document.getElementById("printable-content");
        const clone = original.cloneNode(true);

        // input, textarea → div
        clone.querySelectorAll("input, textarea").forEach((el) => {
            const div = document.createElement("div");
            div.innerText = el.value;
            div.style.whiteSpace = "pre-wrap";
            div.style.fontFamily = "Times New Roman";
            div.style.fontSize = "12pt";
            div.style.marginBottom = "6px";
            el.replaceWith(div);
        });

        const printWindow = window.open("", "", "width=900,height=650");

        printWindow.document.write(`
        <html>
        <head>
            <title>Хэвлэх</title>
            <style>
                body {
                    margin-left: 3cm;
                    margin-top: 2cm;
                    margin-right: 1.5cm;
                    margin-bottom: 2cm;
                    font-family: "Times New Roman";
                    font-size: 12pt;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 5px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            ${clone.innerHTML}
        </body>
        </html>
    `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    // Харьяа оноор бүлэглэх
    const groupedData = selectedRowsData.reduce((acc, row) => {
        if (!acc[row.harya_on]) acc[row.harya_on] = [];
        acc[row.harya_on].push(row);
        return acc;
    }, {});

    const toggleRow = (year) => {
        setExpandedRows((prev) =>
            prev.includes(year)
                ? prev.filter((y) => y !== year)
                : [...prev, year]
        );
    };

    const autoResize = (e) => {
        const el = e.target;
        el.style.height = "auto";

        const minHeight = 12 * 3.78; // 12mm
        const maxHeight = 60 * 3.78; // 60mm

        el.style.height =
            Math.min(Math.max(el.scrollHeight, minHeight), maxHeight) + "px";
    };

    return (
        <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    {/* HEADER */}
                    <div className="modal-header">
                        <h5 className="modal-title">
                            🗂 ИЛ БАРИМТ БИЧИГ УСТГАХ АКТ
                        </h5>
                        <button className="close" onClick={onClose}>
                            ×
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="modal-body" id="printable-content">
                        <div className="input-wrapper">
                            {/* <div className="doc-top">
                       
                                <div className="doc-box">
                                    <textarea
                                        className="doc-textarea"
                                        defaultValue="БАТЛАВ"
                                    />
                                </div>

                           
                                <div className="doc-center">
                                    <input
                                        className="doc-input"
                                        defaultValue="ЗЭВСЭГТ ХҮЧНИЙ ЖАНЖИН ШТАБ"
                                    />
                                    <input
                                        className="doc-input bold"
                                        defaultValue="НУУЦ БАРИМТ БИЧИГ УСТГАХ АКТ № …"
                                    />
                                    <textarea
                                        className="doc-textarea center-area"
                                        defaultValue=""
                                    />
                                </div>

                               
                                <div className="doc-box">
                                    <textarea
                                        className="doc-textarea"
                                        defaultValue="БАТЛАВ 
2019 оны 01 дүгээр сарын ........–ны өдөр"
                                    />
                                </div>
                            </div>
                            */}
                            <div className="top-inputs">
                                {/* ЗҮҮН */}
                                <div className="left-box">
                                    <textarea
                                        className="word-text auto-textarea"
                                        defaultValue="БАТЛАВ"
                                        onInput={autoResize}
                                    />
                                </div>

                                {/* ГОЛ */}
                                <div className="center-box">
                                    <input
                                        id="3"
                                        defaultValue="ЗЭВСЭГТ ХҮЧНИЙ ЖАНЖИН ШТАБ"
                                    />
                                    <input
                                        id="4"
                                        defaultValue="НУУЦ БАРИМТ БИЧИГ УСТГАХ АКТ № …"
                                    />
                                </div>

                                {/* БАРУУН */}
                                <div className="right-box">
                                    <textarea
                                        id
                                        defaultValue={`БАТЛАВ 
2019 оны 01 дүгээр сарын ........–ны өдөр`}
                                    />
                                </div>
                            </div>
                            <textarea
                                className="word-text auto-textarea"
                                style={{ width: "100%" }}
                                defaultValue="Зэвсэгт хүчний Жанжин штабын дэргэдэх Баримт бичиг нягтлан шалгах комисс .......... нарын бүрэлдэхүүнтэй комисс нь дараах нууц баримт бичгийг устгахаар тогтов. Үүнд:"
                                onInput={autoResize}
                            />

                            {/* TABLE */}
                            <table className="table table-bordered">
                                <thead>
                                    {/* 1-р мөр */}
                                    <tr>
                                        <th rowSpan="3">ЗБ нэгжийн нэр</th>
                                        <th rowSpan="3">№</th>
                                        <th rowSpan="3">
                                            Хэрэг данс бүртгэлийн нэр
                                        </th>

                                        <th
                                            colSpan="2"
                                            style={{ textAlign: "center" }}
                                        >
                                            Материалын он
                                        </th>

                                        <th rowSpan="3">
                                            Бичиг баримтын дугаар
                                        </th>

                                        <th
                                            colSpan="2"
                                            style={{ textAlign: "center" }}
                                        >
                                            Хуудасны тоо
                                        </th>

                                        <th rowSpan="3">Тайлбар</th>
                                    </tr>

                                    {/* 2-р мөр */}
                                    <tr>
                                        <th>Эхлэл</th>
                                        <th>Төгсгөл</th>
                                        <th>Нэг бүрийн</th>
                                        <th>Бүгд</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Object.keys(groupedData).map((year) => (
                                        <Fragment key={year}>
                                            {/* Харьяа он */}
                                            <tr
                                                onClick={() => toggleRow(year)}
                                                style={{
                                                    backgroundColor: "#f5f5f5",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <td colSpan="9">
                                                    {/* + / - icon */}
                                                    <span
                                                        style={{
                                                            marginRight: "8px",
                                                        }}
                                                    >
                                                        {expandedRows.includes(
                                                            year
                                                        )}
                                                    </span>
                                                    {year}
                                                </td>
                                            </tr>

                                            {/* Мэдээллийн мөрүүд */}
                                            {expandedRows.includes(year) &&
                                                groupedData[year].map(
                                                    (row, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {
                                                                    row.hadgalamj_zbn
                                                                }
                                                            </td>
                                                            <td>{row.id}</td>
                                                            <td>
                                                                {
                                                                    row.hadgalamj_garchig
                                                                }
                                                            </td>
                                                            <td>
                                                                {row.on_ehen}
                                                            </td>
                                                            <td>
                                                                {row.on_suul}
                                                            </td>
                                                            <td>
                                                                {
                                                                    row.hadgalamj_dugaar
                                                                }
                                                            </td>
                                                            <td>
                                                                {row.huudas_too}
                                                            </td>
                                                            <td>
                                                                {row.huudas_too}
                                                            </td>
                                                            <td>
                                                                {row.hn_tailbar}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </Fragment>
                                    ))}
                                </tbody>
                            </table>

                            {/* Доод input */}
                            <div className="bottom-section">
                                <textarea
                                    className="word-text auto-textarea bottom-text"
                                    defaultValue={`КОМИССЫН НАРИЙН БИЧГИЙН ДАРГА: ...................
ГИШҮҮД: ....................................

Акт батлагдсаны дараа дээр дурьдсан баримт бичгийг акттай тулган шалгаж 2019 оны  дугаар сарын ........ өдөр .... ................................................ замаар бүрэн устгав.

ГИШҮҮД:..........................................................`}
                                    onInput={autoResize}
                                />
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            onClick={handlePrint}
                        >
                            Хэвлэх
                        </button>
                        <button className="btn btn-secondary" onClick={onClose}>
                            Болих
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaingaPrint;
