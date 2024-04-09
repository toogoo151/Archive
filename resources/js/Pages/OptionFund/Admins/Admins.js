import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import axios from "../../../AxiosUser";
import AdminEdit from "./AdminEdit";
import AdminNew from "./AdminNew";
import AdminDelete from "./AdminDelete";
import AdminPassReset from "./AdminPassReset";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";

const Admins = () => {
    const [users, setUsers] = useState([]);
    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);
    const [beforeIndex, setBeforeIndex] = useState(-1);
    const [nootsShiljuuleh, setNootsShiljuuleh] = useState([]);
    const [ranks, setRanks] = useState([]);
    useEffect(() => {
        refreshUsers();
    }, []);
    const refreshUsers = () => {
        axios
            .get("/get/amdins")
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
                previous: "Өмнөх",
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

    const fn_send_to_noots = () => {
        if (getDataRowLenght > -1) {
            Swal.fire({
                title: "Та шилжүүлэхдээ итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/nootsruu/shiljuuleh", {
                            id: changeDataRow.id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshUsers();
                            setShowModal("");
                        })
                        .catch((err) => {
                            Swal.fire(err.response.data.msg);
                        });
                } else if (result.isDenied) {
                }
            });
        } else {
            Swal.fire("Шилжүүлэх мөр сонгоно уу");
            return;
        }
    };

    const fn_token_tegleh = () => {
        if (getDataRowLenght > -1) {
            Swal.fire({
                title: "Та токен тэглэхдээ итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/token/tegleh", {
                            id: changeDataRow.id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshUsers();
                            setShowModal("");
                        })
                        .catch((err) => {
                            Swal.fire(err.response.data.msg);
                        });
                } else if (result.isDenied) {
                }
            });
        } else {
            Swal.fire("Токен тэглэх мөр сонгоно уу");
            return;
        }
    };
    return (
        <>
            <div className="row">
                <div className="info-box">
                    <div className="col-md-12">
                        <h1 className="text-center">Админы бүртгэл</h1>
                        <ReactDatatable
                            config={config}
                            columns={columns}
                            records={users}
                            onRowClicked={handleChangeNew}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div
                    className="info-box"
                    style={{ padding: "20px", paddingBottom: "0px" }}
                >
                    <div className="col-md-12">
                        <AdminNew refreshUsers={refreshUsers} />
                        <AdminEdit
                            changeDataRow={changeDataRow}
                            getDataRowLenght={getDataRowLenght}
                            refreshUsers={refreshUsers}
                        />
                        <AdminDelete
                            changeDataRow={changeDataRow}
                            getDataRowLenght={getDataRowLenght}
                            refreshUsers={refreshUsers}
                        />
                        <AdminPassReset
                            changeDataRow={changeDataRow}
                            getDataRowLenght={getDataRowLenght}
                            refreshUsers={refreshUsers}
                        />
                        <ButtonShowModel
                            btnClassName={"btn btn-secondary"}
                            buttonName={"Хүний нөөцрүү шилжүүлэх"}
                            clickHeaderOpenModal={fn_send_to_noots}
                        />
                        <ButtonShowModel
                            btnClassName={"btn btn-primary"}
                            buttonName={"Токен тэглэх"}
                            clickHeaderOpenModal={fn_token_tegleh}
                        />
                    </div>
                </div>
            </div>
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
        text: "РД",
        key: "rd",
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
    {
        text: "Албан тушаал",
        key: "position",
        align: "center",
        sortable: true,
    },
];
