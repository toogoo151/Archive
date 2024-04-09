import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import { AppContext } from "../../../../Context/MyContext";
import NootsEdit from "./NootsEdit";

const Noots = () => {
    const state = useContext(AppContext);
    const [getNoots, setNoots] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshNoots(state.getMissionRowID, state.getEeljRowID);
    }, []);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getNoots[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    useEffect(() => {
        refreshNoots(state.getMissionRowID, state.getEeljRowID);
        setclickedRowData([]);
    }, [state.getMissionRowID, state.getEeljRowID]);

    const refreshNoots = (missionID, eeljID) => {
        if (missionID != undefined && eeljID != undefined) {
            axios
                .post("/get/noots", {
                    _missionID: missionID,
                    _eeljID: eeljID,
                })
                .then((res) => {
                    setRowsSelected([]);
                    setNoots(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const noots = [
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
                        },
                    };
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
                        },
                    };
                },
            },
        },
        {
            name: "childScore",
            label: "Авсан оноо",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
            },
        },
        {
            name: "isNoots",
            label: "Төлөв",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                        },
                    };
                },
                customBodyRender: (value) => {
                    if (value == 1) {
                        return "Нөөц";
                    }
                },
            },
        },
    ];

    const btnEdit = () => {
        setIsEditBtnClick(true);
    };

    return (
        <div>
            <MUIDatatable
                data={getNoots}
                setdata={setNoots}
                columns={noots}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"НӨӨЦӨД ТОМИЛОГДСОН ЦАХ-Д"}
                            excelDownloadData={getNoots}
                            excelHeaders={excelHeaders}
                            isHideInsert={false}
                        />
                    </>
                }
                btnEdit={btnEdit}
                editdataTargetID={"#nootsEdit"}
                modelType={showModal}
                isHideDelete={false}
                isHideEdit={true}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"}
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
            />
            <NootsEdit
                setRowsSelected={setRowsSelected}
                refreshNoots={refreshNoots}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
                clickParentRowID={clickedRowData.id}
                // onClick={fn_tomilgoo_btn}
            />
        </div>
    );
};

export default Noots;

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Цол", key: "ranks" },
    { label: "РД", key: "rd" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Авсан оноо", key: "childScore" },
    { label: "Төлөв", key: "isNoots" },
];
