import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "../../../AxiosUser";
import AngiruuShiljuuleh from "./AngiruuShiljuuleh";

const DundiinTuluv = () => {
    const [users, setUsers] = useState([]);
    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);
    const [beforeIndex, setBeforeIndex] = useState(-1);
    const [ranks, setRanks] = useState([]);

    useEffect(() => {
        refreshUsers();
    }, []);
    const refreshUsers = () => {
        axios
            .get("/get/dundiin/tuluv")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const config = {
        page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,

        filename: "Тайлан",
        button: {
            excel: true,
            print: true,
            csv: false,
        },
        language: {
            length_menu: "Эхний _MENU_ мөрийг харж байна.",
            filter: "Хайх ...",
            info: "Эхний _START_ ээс _END_ өгөгдөл харж байна. Нийт _TOTAL_ өгөгдөл байна.",
            no_data_text: "Өгөгдөл олдсонгүй.",
            pagination: {
                first: "Эхний",
                previous: "Өмнхө",
                next: "Дараагийн",
                last: "Сүүлийн",
            },
        },
    };
    const handleChangeNew = (event, data, rowIndex) => {
        setChangeDataRow(data);
        setGetDataRowLenght(rowIndex);
    };
    const columns = [
        {
            text: "№",
            key: "id",
            cell: (row, index) => {
                if (index === 0) {
                    if (changeDataRow.id === row.id && getDataRowLenght > -1) {
                        return (
                            <div className="text-center pointer-on-hover">
                                <i className="fa fa-check fa animated-check text-success"></i>
                            </div>
                        );
                    }
                    return (
                        <div className="text-center pointer-on-hover">
                            {parseInt(index) + 1}
                        </div>
                    );
                } else {
                    if (changeDataRow.id === row.id && getDataRowLenght > -1) {
                        return (
                            <div className="pointer-on-hover">
                                <i className="fa fa-check fa animated-check text-success"></i>
                            </div>
                        );
                    }
                    return (
                        <div className="text-center pointer-on-hover">
                            {parseInt(index) + 1}
                        </div>
                    );
                }
            },
            align: "center",
            sortable: true,
            className: "small-column-id pointer-on-hover",
        },

        {
            text: "Цол",
            key: "shortRank",
            align: "center",
            sortable: true,
            className: "text-center pointer-on-hover",
            cell: (row) => {
                return (
                    <div
                        className="text-center pointer-on-hover"
                        style={{ width: "100px" }}
                    >
                        {row.shortRank}
                    </div>
                );
            },
        },
        {
            text: "РД:",
            key: "rd",
            align: "center",
            sortable: true,
            className: "text-center pointer-on-hover",
            cell: (row) => {
                return (
                    <div className="text-center" style={{ width: "100px" }}>
                        {row.rd}
                    </div>
                );
            },
        },
        {
            text: "Хүйс",
            key: "genderName",
            align: "center",
            sortable: true,
            className: "text-center pointer-on-hover",
            cell: (row) => {
                return (
                    <div className="text-center" style={{ width: "100px" }}>
                        {row.genderName}
                    </div>
                );
            },
        },
        {
            text: "Овог",
            key: "lastName",
            align: "center",
            sortable: true,
            className: "text-center pointer-on-hover",
            cell: (row) => {
                return (
                    <div className="text-center" style={{ width: "100px" }}>
                        {row.lastName}
                    </div>
                );
            },
        },
        {
            text: "Нэр",
            key: "firstName",
            align: "center",
            sortable: true,
            className: "text-center pointer-on-hover",
            cell: (row) => {
                return (
                    <div className="text-center" style={{ width: "100px" }}>
                        {row.firstName}
                    </div>
                );
            },
        },
        {
            text: "Утасны дугаар",
            key: "phone",
            align: "center",
            sortable: true,
            className: "text-center pointer-on-hover",
            cell: (row) => {
                return (
                    <div className="text-center" style={{ width: "100px" }}>
                        {row.phone}
                    </div>
                );
            },
        },
        {
            text: "Цахим хаяг",
            key: "email",
            align: "center",
            sortable: true,
            className: "text-center pointer-on-hover",
            cell: (row) => {
                return (
                    <div className="text-center" style={{ width: "100px" }}>
                        {row.email}
                    </div>
                );
            },
        },
        {
            text: "Албан тушаал",
            key: "position",
            align: "center",
            sortable: true,
            className: "text-center pointer-on-hover",
            cell: (row) => {
                return (
                    <div className="text-center" style={{ width: "100px" }}>
                        {row.position}
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <div className="row">
                <div className="info-box">
                    <div className="col-md-12">
                        <h1 className="text-center">
                            Хүний нөөцийн мэдэлд шилжсэн, анги байгууллага руу
                            томилогдоогүй ЦАХ
                        </h1>
                        <div
                            style={{
                                whiteSpace: "nowrap", // used only to display text as not wrapped lines
                                overflow: "scroll",
                                marginBottom: "10px",
                            }}
                        >
                            <ReactDatatable
                                config={config}
                                columns={columns}
                                records={users}
                                onRowClicked={handleChangeNew}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div
                    className="info-box"
                    style={{ padding: "20px", paddingBottom: "0px" }}
                >
                    <div className="col-md-12">
                        <AngiruuShiljuuleh
                            changeDataRow={changeDataRow}
                            getDataRowLenght={getDataRowLenght}
                            refreshUsers={refreshUsers}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DundiinTuluv;
