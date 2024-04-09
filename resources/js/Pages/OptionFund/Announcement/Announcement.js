import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import AnnouncementNew from "./AnnouncementNew";
import AnnouncementDelete from "./AnnouncementDelete";
import axios from "../../../AxiosUser";

const Announcement = () => {
    const [getAnnouncement, setAnnouncement] = useState([]);
    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);
    const [beforeIndex, setBeforeIndex] = useState(-1);

    useEffect(() => {
        refreshAnnouncement();
    }, []);
    const refreshAnnouncement = () => {
        axios
            .get("/get/announcement")
            .then((res) => {
                // console.log(res.data);
                setAnnouncement(res.data);
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

        filename: "Зарлал",
        button: {
            excel: true,
            print: true,
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
    return (
        <>
            <div className="row">
                <div className="info-box">
                    <div className="col-md-12">
                        <br></br>
                        <h1 className="text-center">Зарлал нэмэх хэсэг</h1>
                        <ReactDatatable
                            config={config}
                            columns={columns}
                            records={getAnnouncement}
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
                        <AnnouncementNew
                            refreshAnnouncement={refreshAnnouncement}
                        />
                        <AnnouncementDelete
                            getDataRowLenght={getDataRowLenght}
                            changeDataRow={changeDataRow}
                            refreshAnnouncement={refreshAnnouncement}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Announcement;

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
        text: "Зарлал",
        key: "RecommendationName",
        align: "center",
        sortable: true,
    },
    {
        text: "Нийтэлсэн огноо",
        key: "created_at",
        align: "center",
        sortable: true,
    },
];
