import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import NewsNew from "./NewsNew";
import NewsDelete from "./NewsDelete";
import axios from "../../../AxiosUser";

const News = () => {
    const [getNews, setNews] = useState([]);
    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);
    const [beforeIndex, setBeforeIndex] = useState(-1);

    useEffect(() => {
        refreshNews();
    }, []);
    const refreshNews = () => {
        axios
            .get("/get/news")
            .then((res) => {
                // console.log(res.data);
                setNews(res.data);
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

        filename: "Мэдээ",
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
                        <h1 className="text-center">Мэдээ нэмэх хэсэг</h1>
                        <ReactDatatable
                            config={config}
                            columns={columns}
                            records={getNews}
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
                        <NewsNew refreshNews={refreshNews} />
                        <NewsDelete
                            getDataRowLenght={getDataRowLenght}
                            changeDataRow={changeDataRow}
                            refreshNews={refreshNews}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default News;

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
        text: "Гарчиг",
        key: "title",
        align: "center",
        sortable: true,
    },
    {
        text: "Агуулга",
        key: "body",
        align: "center",
        sortable: true,
    },
    {
        text: "Нүүрний зураг",
        key: "featuredImage",
        align: "center",
        sortable: true,
    },

    {
        text: "Нийтэлсэн огноо",
        key: "created_at",
        align: "center",
        sortable: true,
    },
    {
        text: "Меню",
        key: "menuID",
        align: "center",
        sortable: true,
    },
];
