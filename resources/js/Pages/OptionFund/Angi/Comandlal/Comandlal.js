import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import ComandlalNew from "./ComandlalNew";
import axios from "axios";
import ComandlalEdit from "./ComandlalEdit";
import ComandlalDelete from "./ComandlalDelete";

const Comandlal = () => {
    const [getComandlal, setComandlal] = useState([]);
    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);
    const [beforeIndex, setBeforeIndex] = useState(-1);

    useEffect(() => {
        refreshComandlal();
    }, []);
    const refreshComandlal = () => {
        axios
            .get("/get/comandlal")
            .then((res) => {
                setComandlal(res.data);
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
                        <h1 className="text-center">Командлал</h1>
                        <ReactDatatable
                            config={config}
                            columns={columns}
                            records={getComandlal}
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
                        <ComandlalNew refreshComandlal={refreshComandlal} />

                        <ComandlalEdit
                            getDataRowLenght={getDataRowLenght}
                            changeDataRow={changeDataRow}
                            refreshComandlal={refreshComandlal}
                        />

                        <ComandlalDelete
                            getDataRowLenght={getDataRowLenght}
                            changeDataRow={changeDataRow}
                            refreshComandlal={refreshComandlal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comandlal;

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
        text: "Товч нэр",
        key: "comandlalShortName",
        align: "center",
        sortable: true,
    },
    {
        text: "Командлал нэр",
        key: "comandlalName",
        align: "center",
        sortable: true,
    },
];
