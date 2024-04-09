import React, { useEffect, useState, useContext, useRef } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";

const UserMissionHistory = (props) => {
    const state = useContext(AppContext);
    const [getUureg, setUureg] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа

    useEffect(() => {
        setUureg(props.getUuregGuitsetgelt);
    }, [props]);
    return (
        <>
            <div
                className="modal fade"
                id="userUuregGuitsetgelt"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    style={{ marginTop: "-110px" }}
                    role="document"
                >
                    <div className="modal-content shadow-lg">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                ҮҮРЭГ ГҮЙЦЭТГЭЛТИЙН ДЭЛГЭРЭНГҮЙ
                            </h4>
                            <button
                                type="button"
                                className="close"
                                onClick={() => {
                                    $("#userUuregGuitsetgelt, #modal2").modal(
                                        "hide"
                                    );
                                }}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        {/* <form onSubmit={handleSubmit}> */}
                        <div className="modal-body">
                            <MUIDatatable
                                data={getUureg}
                                setdata={setUureg}
                                columns={columns}
                                costumToolbar={
                                    <>
                                        <CustomToolbar
                                            excelDownloadData={getUureg}
                                            excelHeaders={excelHeaders}
                                            isHideInsert={false}
                                        />
                                    </>
                                }
                                isHideDelete={false}
                                isHideEdit={false}
                                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                                avgColumnName={"email"}
                                avgName={"Дундаж: "}
                                getRowsSelected={getRowsSelected}
                                setRowsSelected={setRowsSelected}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserMissionHistory;

const columns = [
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
                        width: 30,
                    },
                };
            },
        },
    },

    {
        name: "isApplauseName",
        label: "Төрөл",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 150,
                    },
                };
            },
        },
    },
    {
        name: "applauseHelber",
        label: "Хэлбэр",
        options: {
            filter: true,
            sort: false,
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
        name: "applauseDescription",
        label: "Тайлбар",
        options: {
            filter: true,
            sort: false,
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
        name: "applauseDate",
        label: "Огноо",
        options: {
            filter: true,
            sort: false,
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
];

const excelHeaders = [
    { label: "Төрөл", key: "isApplauseName" },
    { label: "Хэлбэр", key: "applauseHelber" },
    { label: "Тайлбар", key: "applauseDescription" },
    { label: "Огноо", key: "applauseDate" },
];
