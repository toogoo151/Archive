import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import ComandlalCovotNew from "./ComandlalCovotNew";
import ComandlalCovotEdit from "./ComandlalCovotEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const ComandlalCovot = () => {
    const state = useContext(AppContext);
    const [getComandlalCovot, setComandlalCovot] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshComandlalCovot(state.getMissionRowID, state.getEeljRowID);
    }, []);

    useEffect(() => {
        refreshComandlalCovot(state.getMissionRowID, state.getEeljRowID);
    }, [state.getMissionRowID, state.getEeljRowID]);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getComandlalCovot[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshComandlalCovot = (missionID, eeljID) => {
        axios
            .post("/get/comandlal/covots", {
                _missionID: missionID,
                _eeljID: eeljID,
            })
            .then((res) => {
                setComandlalCovot(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const btnDelete = () => {
        setRowsSelected([]);
        if (getComandlalCovot[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/comandlal/covot", {
                            id: getComandlalCovot[getRowsSelected[0]].id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            refreshComandlalCovot(
                                state.getMissionRowID,
                                state.getEeljRowID
                            );
                        })
                        .catch((err) => {
                            Swal.fire(err.response.data.msg);
                        });
                } else if (result.isDenied) {
                    // Swal.fire("Changes are not saved", "", "info");
                }
            });
        }
    };
    const btnEdit = () => {
        setIsEditBtnClick(true);
    };
    return (
        <div>
            <MUIDatatable
                data={getComandlalCovot}
                setdata={setComandlalCovot}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"КВОТ ОЛГОХ"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#comandlalCovotNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={getComandlalCovot}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#comandlalCovotEdit"}
                btnDelete={btnDelete}
                avgColumnIndex={2} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"covotOppitser"} //
                avgName={"Нийт: "}
                avgColumnIndex1={3}
                avgColumnName1={"covotAhlagch"} //
                avgName1={"Нийт: "}
                avgColumnIndex2={4}
                avgColumnName2={"covotGereet"} //
                avgName2={"Нийт: "}
                avgColumnIndex3={5}
                avgColumnName3={"covotComandlalSum"} //
                avgName3={"Нийт: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={true}
                isHideEdit={true}
            />
            {state.getMissionRowID != "" && state.getEeljRowID != "" && (
                <ComandlalCovotNew
                    refreshComandlalCovot={refreshComandlalCovot}
                />
            )}

            <ComandlalCovotEdit
                setRowsSelected={setRowsSelected}
                refreshComandlalCovot={refreshComandlalCovot}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            />
        </div>
    );
};

export default ComandlalCovot;

const columns = [
    {
        name: "id",
        label: "№",
        options: {
            filter: true,
            sort: true,
            filter: false,
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
            setCellProps: () => {
                return { align: "center" };
            },
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
        name: "covotOppitser",
        label: "Офицер",
        options: {
            filter: true,
            sort: false,

            setCellProps: () => {
                return { align: "center" };
            },
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 130,
                    },
                };
            },
        },
    },
    {
        name: "covotAhlagch",
        label: "Ахлагч",
        options: {
            filter: true,
            sort: false,
            setCellProps: () => {
                return { align: "center" };
            },
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 130,
                    },
                };
            },
        },
    },
    {
        name: "covotGereet",
        label: "Гэрээт",
        options: {
            filter: true,
            sort: false,
            setCellProps: () => {
                return { align: "center" };
            },
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 130,
                    },
                };
            },
        },
    },
    {
        name: "covotComandlalSum",
        label: "Нийт",
        options: {
            filter: true,
            sort: false,
            setCellProps: () => {
                return { align: "center" };
            },
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 130,
                    },
                };
            },
        },
    },
    {
        name: "covotDescription",
        label: "Тайлбар",
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
];

const excelHeaders = [
    { label: "Ажиллагааны нэр", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Командлал", key: "comandlalShortName" },
    { label: "Офицер", key: "covotOppitser" },
    { label: "Ахлагч", key: "covotAhlagch" },
    { label: "Гэрээт", key: "covotGereet" },
    { label: "Нийт", key: "covotComandlalSum" },
    { label: "Тайлбар", key: "covotDescription" },
];

// let isFooter = false;
// if (props.avgColumnIndex != 0) {
//     isFooter = true;
// }
// let avgAge =
//     opts.data.reduce((accu, item) => {
//         return accu + item.data[props.avgColumnIndex];
//     }, 0) / opts.data.length;

// avgAge = Math.round(avgAge);
// return (
//     <TableFooter className={footerClasses}>
//         {isFooter && (
//             <TableRow>
//                 {opts.selectableRows !== "none" ? (
//                     <TableCell className={footerClasses} />
//                 ) : null}
//                 {opts.columns.map((col, index) => {
//                     if (col.display === "true") {
//                         if (col.name === props.avgColumnName) {
//                             return (
//                                 <TableCell
//                                     key={index}
//                                     className={footerClasses}
//                                 >
//                                     {props.avgName} {avgAge}
//                                 </TableCell>
//                             );
//                         } else {
//                             return (
//                                 <TableCell
//                                     key={index}
//                                     className={footerClasses}
//                                 />
//                             );
//                         }
//                     }
//                     return null;
//                 })}
//             </TableRow>
//         )}
//     </TableFooter>
// );
