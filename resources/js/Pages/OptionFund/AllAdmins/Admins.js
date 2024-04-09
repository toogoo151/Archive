import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "../../../AxiosUser";
import AllUserShiljuuleh from "./AllUserShiljuuleh";

const Admins = () => {
    const [users, setUsers] = useState([]);
    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);
    const [beforeIndex, setBeforeIndex] = useState(-1);
    // const [ranks, setRanks] = useState([]);
    useEffect(() => {
        refreshUsers();
    }, []);
    const refreshUsers = () => {
        axios
            .get("/get/all/amdins")
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
        event.nativeEvent.path[2].children[rowIndex].style.backgroundColor =
            "#ADD8E6";
        if (rowIndex != beforeIndex) {
            setBeforeIndex(rowIndex);
            event.nativeEvent.path[2].children[
                beforeIndex
            ].style.backgroundColor = "";
        }
    };
    return (
        <>
            <div className="row">
                <div className="info-box">
                    <div className="col-md-12">
                        <h1 className="text-center">Бүх хэрэглэгч</h1>
                        <ReactDatatable
                            config={config}
                            columns={columns}
                            records={users}
                            onRowClicked={handleChangeNew}
                        />
                    </div>
                </div>
            </div>

            {userType === "superAdmin" && (
                <div className="row">
                    <div
                        className="info-box"
                        style={{ padding: "20px", paddingBottom: "0px" }}
                    >
                        <div className="col-md-12">
                            <AllUserShiljuuleh
                                changeDataRow={changeDataRow}
                                getDataRowLenght={getDataRowLenght}
                                refreshUsers={refreshUsers}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Admins;
const columns = [
    {
        text: "№",
        key: "id",
        cell: (row, index) => {
            if (index == 0) {
                return index + 1;
            } else {
                return index + 1;
            }
        },
        align: "center",
        sortable: true,
    },
    {
        text: "Командлал",
        key: "comandlal",
        align: "center",
        sortable: true,
    },
    {
        text: "Анги",
        key: "unit",
        align: "center",
        sortable: true,
    },
    {
        text: "Цол",
        key: "shortRank",
        align: "center",
        sortable: true,
    },

    {
        text: "Регистрийн дугаар",
        key: "rd",
        align: "center",
        sortable: true,
    },
    {
        text: "Овог",
        key: "lastName",
        align: "center",
        sortable: true,
    },
    {
        text: "Нэр",
        key: "firstName",
        align: "center",
        sortable: true,
    },
    {
        text: "Нас",
        key: "age",
        align: "center",
        sortable: true,
    },
    {
        text: "Хүйс",
        key: "genderName",
        align: "center",
        sortable: true,
    },
    {
        text: "Албан тушаал",
        key: "position",
        align: "center",
        sortable: true,
    },
    {
        text: "Утасны дугаар",
        key: "phone",
        align: "center",
        sortable: true,
    },
    {
        text: "Цахим хаяг",
        key: "email",
        align: "center",
        sortable: true,
    },
];
