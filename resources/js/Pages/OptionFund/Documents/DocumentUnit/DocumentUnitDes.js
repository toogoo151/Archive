import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";

const DocumentUnitDes = (props) => {
    const state = useContext(AppContext);
    const [getDocUnitDes, setDocUnitDes] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);
    const [getDocDes, setDocDes] = useState("");
    const [getAdmin, setAdmin] = useState("");
    const [getComandlal, setComandlal] = useState("");

    useEffect(() => {
        refreshDocUnitDes(props.clickedRowData.id);
    }, []);

    useEffect(() => {
        refreshDocUnitDes(props.clickedRowData.id);
    }, [props.clickedRowData.id]);

    const refreshDocUnitDes = (rowID) => {
        if (rowID != undefined) {
            axios
                .post("/get/document/description", {
                    _rowID: rowID,
                })
                .then((res) => {
                    setRowsSelected([]);
                    setDocUnitDes(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getDocUnitDes[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    return (
        <div>
            {" "}
            <div
                className="info-box"
                style={{
                    padding: "20px",
                    paddingBottom: "0px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div className="row" style={{ textAlign: "center" }}>
                    <h3>БИЧИГ БАРИМТЫГ ТАТГАЛЗСАН ШАЛТГААН</h3>
                </div>
                <br />

                <div className="info-box">
                    <div className="col-md-12">
                        <table className="table" style={{ width: "100%" }}>
                            <tbody style={{ backgroundColor: "#fff" }}>
                                {getDocUnitDes.map((el) => (
                                    <>
                                        <tr key={el.id}>
                                            <td
                                                rowSpan={el.adminName}
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {el.id}
                                            </td>
                                            <td
                                                style={{ fontWeight: "bold" }}
                                                colSpan="4"
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        el.comandlalName +
                                                        "/" +
                                                        el.adminName,
                                                }}
                                            ></td>
                                            <td
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "blue",
                                                    fontStyle: "italic",
                                                    fontSize: "20px",
                                                }}
                                                colSpan="4"
                                                dangerouslySetInnerHTML={{
                                                    __html: el.docDescription,
                                                }}
                                            ></td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <div>
                    <div className="timeline-item">
                        <span className="time">
                            <i className="fas fa-university" /> {getComandlal}
                            {" /"}
                            <a style={{ fontStyle: "italic" }}>{getAdmin}</a>
                            {" /"}
                        </span>
                        <h3
                            className="timeline-header"
                            style={{
                                fontWeight: "bold",
                                color: "blue",
                                fontStyle: "italic",
                            }}
                        >
                            {getDocDes}
                        </h3>
                    </div>
                </div> */}
            </div>
            {/* <MUIDatatable
                data={getDocUnitDes}
                setdata={setDocUnitDes}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            excelDownloadData={getDocUnitDes}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                isHideDelete={false}
                isHideEdit={false}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            /> */}
            <br />
        </div>
    );
};

export default DocumentUnitDes;

// const columns = [
//     {
//         name: "id",
//         label: "№",
//         options: {
//             filter: true,
//             sort: true,
//             filter: false,
//             customBodyRenderLite: (rowIndex) => {
//                 if (rowIndex == 0) {
//                     return rowIndex + 1;
//                 } else {
//                     return rowIndex + 1;
//                 }
//             },
//             setCellProps: () => {
//                 return { align: "center" };
//             },
//             setCellHeaderProps: (value) => {
//                 return {
//                     style: {
//                         backgroundColor: "#5DADE2",
//                         color: "white",
//                         width: 50,
//                     },
//                 };
//             },
//         },
//     },
//     // {
//     //     name: "documentName",
//     //     label: "Бичиг баримтын нэр",
//     //     options: {
//     //         filter: true,
//     //         sort: false,
//     //         setCellProps: () => {
//     //             return { align: "center" };
//     //         },
//     //         setCellHeaderProps: (value) => {
//     //             return {
//     //                 style: {
//     //                     backgroundColor: "#5DADE2",
//     //                     color: "white",
//     //                     // width: 180,
//     //                 },
//     //             };
//     //         },
//     //     },
//     // },
//     {
//         name: "docDescription",
//         label: "Бичиг баримтыг татгалзсан шалтгаан",
//         options: {
//             filter: true,
//             sort: false,
//             setCellProps: () => {
//                 return { align: "center" };
//             },
//             setCellHeaderProps: (value) => {
//                 return {
//                     style: {
//                         backgroundColor: "#5DADE2",
//                         color: "white",
//                         // width: 180,
//                     },
//                 };
//             },
//         },
//     },
//     {
//         name: "comandlalName",
//         label: "Татгалзан командлал",
//         options: {
//             filter: true,
//             sort: false,
//             setCellProps: () => {
//                 return { align: "center" };
//             },
//             setCellHeaderProps: (value) => {
//                 return {
//                     style: {
//                         backgroundColor: "#5DADE2",
//                         color: "white",
//                         // width: 130,
//                     },
//                 };
//             },
//         },
//     },
//     {
//         name: "adminName",
//         label: "Татгалзан админ",
//         options: {
//             filter: true,
//             sort: false,
//             setCellProps: () => {
//                 return { align: "center" };
//             },
//             setCellHeaderProps: (value) => {
//                 return {
//                     style: {
//                         backgroundColor: "#5DADE2",
//                         color: "white",
//                         // width: 120,
//                     },
//                 };
//             },
//         },
//     },
// ];

// const excelHeaders = [
//     { label: "№", key: "id" },
//     // { label: "Бичиг баримтын нэр", key: "documentName" },
//     { label: "Бичиг баримтыг татгалзсан шалтгаан", key: "docDescription" },
//     { label: "Татгалзан командлал", key: "comandlalName" },
//     { label: "Татгалзан админ", key: "adminName" },
// ];
