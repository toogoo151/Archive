import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import PkoSuperAdminNew from "./PkoSuperAdminNew";
import PkoSuperAdminEdit from "./PkoSuperAdminEdit";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const PkoSuperAdmin = (props) => {
    const state = useContext(AppContext);
    const [users, setSuperUsers] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        refreshSuperUsers();
    }, []);

    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(users[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    const refreshSuperUsers = () => {
        axios
            .get("/get/super/admins")
            .then((res) => {
                setSuperUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const btnDelete = () => {
    //     setRowsSelected([]);
    //     if (users[getRowsSelected[0]].id != "") {
    //         Swal.fire({
    //             title: "Та устгахдаа итгэлтэй байна уу?",
    //             showCancelButton: true,
    //             confirmButtonText: `Тийм`,
    //             cancelButtonText: `Үгүй`,
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 axios
    //                     .post("/delete/super/admin", {
    //                         id: users[getRowsSelected[0]].id,
    //                     })
    //                     .then((res) => {
    //                         Swal.fire(res.data.msg);
    //                         refreshSuperUsers();
    //                     })
    //                     .catch((err) => {
    //                         Swal.fire(err.response.data.msg);
    //                     });
    //             } else if (result.isDenied) {
    //                 // Swal.fire("Changes are not saved", "", "info");
    //             }
    //         });
    //     }
    // };

    const btnEdit = () => {
        setIsEditBtnClick(true);
    };

    return (
        <div>
            <MUIDatatable
                data={users}
                setdata={setSuperUsers}
                columns={columns}
                costumToolbar={
                    <>
                        <CustomToolbar
                            title={"ХЭРЭГЛЭГЧИЙН БҮРТГЭЛ"}
                            btnClassName={"btn btn-success"}
                            modelType={"modal"}
                            dataTargetID={"#superUserNew"}
                            spanIconClassName={"fas fa-solid fa-plus"}
                            buttonName={"НЭМЭХ"}
                            // btnInsert={btnInsert}
                            excelDownloadData={users}
                            excelHeaders={excelHeaders}
                            isHideInsert={true}
                        />
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#superUserEdit"}
                // btnDelete={btnDelete}
                isHideHuman={false}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={false}
                isHideEdit={true}
            />
            {state.getMissionRowID != "" && state.getEeljRowID != "" && (
                <>
                    <PkoSuperAdminNew
                        refreshSuperUsers={refreshSuperUsers}
                        getMission={state.getMissionRowID}
                        getEelj={state.getEeljRowID}
                    />

                    <PkoSuperAdminEdit
                        setRowsSelected={setRowsSelected}
                        refreshSuperUsers={refreshSuperUsers}
                        getMission={state.getMissionRowID}
                        getEelj={state.getEeljRowID}
                        changeDataRow={clickedRowData}
                        isEditBtnClick={isEditBtnClick}
                    />
                </>
            )}
        </div>
    );
};

export default PkoSuperAdmin;

const profile = (value) => {
    if (value == "0") {
        const newWindow = window.open(
            "https://psod.maf.gov.mn/storage/profile/No-photo.jpg",
            "_blank",
            "noopener,noreferrer,resizable"
        );
        if (newWindow) newWindow.opener = null;
    } else {
        const newWindow = window.open(
            "https://psod.maf.gov.mn/storage" + value,
            "_blank",
            "noopener,noreferrer,resizable"
        );
        if (newWindow) newWindow.opener = null;
    }
};

const columns = [
    {
        name: "id",
        label: "№",
        options: {
            filter: true,
            sort: true,
            // display: false,
            // viewColumns: false,
            filter: false,
            customBodyRenderLite: (rowIndex) => {
                if (rowIndex == 0) {
                    return rowIndex + 1;
                } else {
                    return rowIndex + 1;
                }
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
            setCellProps: () => {
                return { align: "center" };
            },
        },
    },
    {
        name: "image",
        label: "Цээж зураг",
        options: {
            filter: true,
            sort: true,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 100,
                    },
                };
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <div
                        style={{
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            className="image css-img-object"
                            src={
                                value != 0
                                    ? "https://psod.maf.gov.mn/storage" + value
                                    : "https://psod.maf.gov.mn/storage/profile/No-photo.jpg"
                            }
                            style={{
                                width: "65px",
                                height: "70px",
                            }}
                            onClick={() => profile(value)}
                        />
                    </div>
                );
            },
        },
    },
    {
        name: "comandlal",
        label: "Командлал",
        options: {
            filter: true,
            sort: true,
            display:
                userType == "comandlalAdmin" || userType == "unitAdmin"
                    ? false
                    : true,
            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        width: 100,
                    },
                };
            },
        },
    },
    {
        name: "unit",
        label: "Анги",
        options: {
            filter: true,
            sort: false,
            display: userType == "unitAdmin" ? false : true,
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
                        width: 50,
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
        name: "rd",
        label: "Регистрийн дугаар",
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
        name: "age",
        label: "Нас",
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
        name: "genderName",
        label: "Хүйс",
        options: {
            filter: true,
            sort: false,
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
        name: "foreignPass",
        label: "Гадаад паспорт",
        options: {
            filter: true,
            sort: false,
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
        name: "foreignFinishDate",
        label: "Гадаад паспортын дуусах хугацаа",
        options: {
            filter: true,
            sort: false,
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
        name: "phone",
        label: "Утасны дугаар",
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
        name: "email",
        label: "Цахим хаяг",
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
        name: "position",
        label: "Албан тушаал",
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
    { label: "Командлал", key: "comandlal" },
    { label: "Анги", key: "unit" },
    { label: "Цол", key: "shortRank" },
    { label: "Регистрийн дугаар", key: "rd" },
    { label: "Нас", key: "age" },
    { label: "Хүйс", key: "genderName" },
    { label: "Овог", key: "lastName" },
    { label: "Нэр", key: "firstName" },
    { label: "Гадаад паспорт", key: "foreignPass" },
    { label: "Гадаад паспортын дуусах хугацаа", key: "foreignFinishDate" },
    { label: "Утасны дугаар", key: "phone" },
    { label: "Цахим хаяг", key: "email" },
    { label: "Албан тушаал", key: "position" },
];

//Ашиглагдах action
// customBodyRender: (value, tableMeta, updateValue) => {
//     return (
//         <a href="123">
//             <button className="btn btn-success">{value}</button>
//         </a>
//     );
// },
