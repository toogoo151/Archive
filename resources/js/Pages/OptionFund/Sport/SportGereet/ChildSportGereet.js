import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";

const ChildSportGereet = (props) => {
    const state = useContext(AppContext);
    const [getSportChild, setSportChild] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowDataChild, setclickedRowData] = useState([]);

    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshSportChild(
            state.getMissionRowID,
            state.getEeljRowID,
            props.clickedRowData.id
        );
    }, [state.getMissionRowID, state.getEeljRowID, props.clickedRowData.id]);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(getSportChild[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    const refreshSportChild = (missionID, eeljID, rowID) => {
        if (
            missionID != undefined &&
            eeljID != undefined &&
            rowID != undefined
        ) {
            axios
                .post("/get/sport/changed", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                    _rowID: rowID,
                })
                .then((res) => {
                    setSportChild(res.data);
                    setRowsSelected([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const columns = [
        {
            name: "id",
            label: "№",
            options: {
                filter: true,
                sort: true,
                filter: false,
                customBodyRenderLite: (rowIndex) => {
                    if (rowIndex == 0) {
                        return rowIndex + 1;
                    } else {
                        return rowIndex + 1;
                    }
                },
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 50,
                        },
                    };
                },
            },
        },

        {
            name: "sportType1",
            label: "Суга савлуурт суниах",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            // width: 130,
                        },
                    };
                },
            },
        },
        {
            name: "sportType2",
            label: "Дүүжинд суниах",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            // width: 120,
                        },
                    };
                },
            },
        },
        {
            name: "sportType3",
            label: "100 метрийн гүйлт",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            // width: 120,
                        },
                    };
                },
            },
        },
        {
            name: "sportType4",
            label: "1000 метрийн гүйлт",
            options: {
                filter: true,
                sort: false,
                display: props.clickedRowData.age < 45 ? false : true,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            // width: 120,
                        },
                    };
                },
            },
        },
        {
            name: "sportType4",
            label: "3000 метрийн гүйлт",
            options: {
                filter: true,
                sort: false,
                display: props.clickedRowData.age > 45 ? false : true,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            // width: 120,
                        },
                    };
                },
            },
        },
        {
            name: "averageScore",
            label: "Дундаж оноо",
            options: {
                filter: true,
                sort: false,
                setCellProps: () => {
                    return { align: "center" };
                },
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            // width: 120,
                        },
                    };
                },
            },
        },
    ];

    return (
        <div>
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
                    <h3>БИЕИЙН ТАМИРЫН ШАЛГАЛТЫН ДҮН</h3>
                </div>
                <br />
            </div>

            <MUIDatatable
                data={getSportChild}
                setdata={setSportChild}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            excelDownloadData={getSportChild}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                modelType={showModal}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={false}
                isHideEdit={false}
            />
        </div>
    );
};

export default ChildSportGereet;
const excelHeaders = [
    { label: "Суга савлуурт суниах", key: "sportType1" },
    { label: "Дүүжинд суниах", key: "sportType2" },
    { label: "100 метрийн гүйлт", key: "sportType3" },
    { label: "Тэсвэр", key: "sportType4" },
    { label: "Дундаж оноо", key: "averageScore" },
];
