import React, { useEffect, useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import UnitSubNew from "./UnitSubNew";
import axios from "axios";
import UnitSubEdit from "./UnitSubEdit";
import UnitSubDelete from "./UnitSubDelete";

const UnitSub = () => {
    const [getUnitSub, setUnitSub] = useState([]);
    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);

    useEffect(() => {
        refreshUnitSub();
    }, []);
    const refreshUnitSub = () => {
        axios
            .get("/get/unitSub")
            .then((res) => {
                setUnitSub(res.data);
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

        filename: "Салбар анги",
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
                        <h1 className="text-center">Салбар</h1>
                        <ReactDatatable
                            config={config}
                            columns={columns}
                            records={getUnitSub}
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
                        <UnitSubNew refreshUnitSub={refreshUnitSub} />
                        <UnitSubEdit
                            getDataRowLenght={getDataRowLenght}
                            changeDataRow={changeDataRow}
                            refreshUnitSub={refreshUnitSub}
                        />
                        <UnitSubDelete
                            getDataRowLenght={getDataRowLenght}
                            changeDataRow={changeDataRow}
                            refreshUnitSub={refreshUnitSub}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UnitSub;
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
        text: "Ангийн дугаар",
        key: "unitShortName",
        align: "center",
        sortable: true,
    },
    {
        text: "Салбарын товч нэр",
        key: "unitSubShortName",
        align: "center",
        sortable: true,
    },
    {
        text: "Салбарын нэр",
        key: "unitSubFullName",
        align: "center",
        sortable: true,
    },
    {
        text: "Салбарын дугаар",
        key: "unitSubNumber",
        align: "center",
        sortable: true,
    },
];
