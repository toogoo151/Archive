import React, { useState, useEffect, useContext } from "react";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const SpyMainDes = (props) => {
    const state = useContext(AppContext);
    const [getSpyMainDes, setSpyMainDes] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    useEffect(() => {
        refreshSpyMainDes(props.clickedRowData.id);
    }, []);

    useEffect(() => {
        refreshSpyMainDes(props.clickedRowData.id);
    }, [props.clickedRowData.id]);

    const refreshSpyMainDes = (rowID) => {
        if (rowID != undefined) {
            axios
                .post("/get/spy/main/description", {
                    _rowID: rowID,
                })
                .then((res) => {
                    setRowsSelected([]);
                    setSpyMainDes(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getSpyMainDes[getRowsSelected[0]]);
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
                    <h3>
                        ЦАХ ГЭМТ ХЭРЭГТ ХОЛБОГДОЛТОЙ УЧИР ТАТГАЛЗСАН ТАЙЛБАР
                    </h3>
                </div>
                <br />

                <div className="info-box">
                    <div className="col-md-12">
                        <table className="table" style={{ width: "100%" }}>
                            <tbody style={{ backgroundColor: "#fff" }}>
                                {getSpyMainDes.map((el) => (
                                    <>
                                        <tr key={el.id}>
                                            <td
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {el.id}
                                            </td>
                                            <td
                                                style={{
                                                    fontWeight: "bold",
                                                    color: "blue",
                                                    fontStyle: "italic",
                                                    fontSize: "20px",
                                                }}
                                                colSpan="4"
                                                dangerouslySetInnerHTML={{
                                                    __html: el.isCrimeDescription,
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

export default SpyMainDes;
