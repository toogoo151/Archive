import React, { useEffect, useState } from "react";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
const WishDetails = (props) => {
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setclickedRowData(props.getWishDetails[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    return (
        <div>
            <MUIDatatable
                data={props.getWishDetails}
                setdata={props.setWishDetails}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ХҮСЭЛТИЙН ДЭЛГЭРЭНГҮЙ"}
                            excelDownloadData={props.getWishDetails}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                isHideDelete={false}
                isHideEdit={false}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
        </div>
    );
};

export default WishDetails;

const columns = [
    {
        name: "id",
        label: "№",
        options: {
            filter: true,
            sort: true,
            filter: false,
            align: "center",
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
        name: "comandlalShortName",
        label: "Командлал",
        options: {
            filter: true,
            sort: false,
            display:
                userType == "comandlalAdmin" || userType == "unitAdmin"
                    ? false
                    : true,
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
        name: "unitShortName",
        label: "Анги",
        options: {
            filter: true,
            sort: false,
            display: userType == "unitAdmin" ? false : true,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 150,
                    },
                };
            },
        },
    },
    {
        name: "shortRank",
        label: "Цол",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 40,
                    },
                };
            },
            setCellProps: () => {
                return { align: "center" };
            },
        },
    },

    {
        name: "lastName",
        label: "Овог",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 180,
                    },
                };
            },
        },
    },
    {
        name: "firstName",
        label: "Нэр",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 180,
                    },
                };
            },
        },
    },
    {
        name: "rd",
        label: "РД",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 150,
                    },
                };
            },
        },
    },
    {
        name: "position",
        label: "Албан тушаал",
        options: {
            filter: true,
            sort: false,
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
];

const excelHeaders = [
    { label: "Ажиллагаа", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Командлал", key: "comandlalShortName" },
    { label: "Анги", key: "unitShortName" },
    { label: "Цол", key: "shortRank" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "РД", key: "rd" },
    { label: "Албан тушаал", key: "position" },
];
