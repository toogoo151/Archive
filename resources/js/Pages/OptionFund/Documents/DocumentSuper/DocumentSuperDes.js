import React, { useState, useEffect, useContext } from "react";
import axios from "../../../../AxiosUser";

const DocumentComandlalDes = (props) => {
    const [getDocSuperDes, setDocSuperDes] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    useEffect(() => {
        refreshDocSuperDes(props.clickedRowData.id);
    }, []);

    useEffect(() => {
        refreshDocSuperDes(props.clickedRowData.id);
    }, [props.clickedRowData.id]);

    const refreshDocSuperDes = (rowID) => {
        if (rowID != undefined) {
            axios
                .post("/get/document/description", {
                    _rowID: rowID,
                })
                .then((res) => {
                    setRowsSelected([]);
                    setDocSuperDes(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getDocSuperDes[getRowsSelected[0]]);
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
                                {getDocSuperDes.map((el) => (
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
            </div>
            <br />
        </div>
    );
};

export default DocumentComandlalDes;
