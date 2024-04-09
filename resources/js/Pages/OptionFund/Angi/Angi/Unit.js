import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import UnitNew from "./UnitNew";
import axios from "axios";
import UnitEdit from "./UnitEdit";
import UnitDelete from "./UnitDelete";

const Unit = () => {
    const [getUnit, setUnit] = useState([]);
    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);
    const [beforeIndex, setBeforeIndex] = useState(-1);

    useEffect(() => {
        refreshUnit();
    }, []);
    const refreshUnit = () => {
        axios
            .get("/get/unit")
            .then((res) => {
                setUnit(res.data);
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

        filename: "Анги байгууллага1",
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
                        <h1 className="text-center">Анги, нэгтгэл</h1>
                        <ReactDatatable
                            config={config}
                            columns={columns}
                            records={getUnit}
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
                        <UnitNew refreshUnit={refreshUnit} />
                        <UnitEdit
                            getDataRowLenght={getDataRowLenght}
                            changeDataRow={changeDataRow}
                            refreshUnit={refreshUnit}
                        />
                        <UnitDelete
                            getDataRowLenght={getDataRowLenght}
                            changeDataRow={changeDataRow}
                            refreshUnit={refreshUnit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Unit;
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
        key: "comandlalShortName",
        align: "center",
        sortable: true,
    },
    {
        text: "Товч нэр",
        key: "unitShortName",
        align: "center",
        sortable: true,
    },
    {
        text: "Ангийн нэр",
        key: "unitFullName",
        align: "center",
        sortable: true,
    },
    {
        text: "Ангийн дугаар",
        key: "unitNumber",
        align: "center",
        sortable: true,
    },
];
