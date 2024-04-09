import React, { useState, useEffect, useContext } from "react";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import axios from "../../../../AxiosUser";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
// import PkoAdminNew from "./PkoAdminNew";
import PkoComNew from "./PkoComNew";
import PkoUnitNew from "./PkoUnitNew";
import PkoAdminEdit from "./PkoAdminEdit";
import PkoComEdit from "./PkoComEdit";
import PkoUnitEdit from "./PkoUnitEdit";
import PkoOtherNew from "./PkoOtherNew";
import Swal from "sweetalert2";
import { AppContext } from "../../../../Context/MyContext";

const PkoAdmin = (props) => {
    const state = useContext(AppContext);
    const [users, setUsers] = useState([]);
    // const [getRowSelectedIndex, setRowSelectedIndex] = useState(-1);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);

    const [getComID, setComID] = useState([]);

    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [isUserAddButton, setIsUserAddButton] = useState(false);

    const [showModal, setShowModal] = useState("modal");

    useEffect(() => {
        axios
            .get("/my/admin/com/id")
            .then((res) => {
                setComID(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        refreshUsers();
        fn_isUserAddButton();
    }, []);
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(users[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
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
    //                     .post("/delete/admin", {
    //                         id: users[getRowsSelected[0]].id,
    //                     })
    //                     .then((res) => {
    //                         Swal.fire(res.data.msg);
    //                         refreshUsers();
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

    const fn_send_to_noots = () => {
        setRowsSelected([]);
        if (users[getRowsSelected[0]].id != "") {
            Swal.fire({
                title: "Та шилжүүлэхдээ итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/nootsruu/shiljuuleh", {
                            id: users[getRowsSelected[0]].id,
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
        }
    };

    const fn_isUserAddButton = () => {
        axios
            .post("/is/user/add/button")
            .then((res) => {
                setIsUserAddButton(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            {/* {state.getMissionRowID} {state.getEeljRowID} */}

            <MUIDatatable
                data={users}
                setdata={setUsers}
                columns={columns}
                costumToolbar={
                    <>
                        {userType == "superAdmin" ? (
                            <CustomToolbar
                                title={"ХЭРЭГЛЭГЧИЙН БҮРТГЭЛ"}
                                btnClassName={"btn btn-success"}
                                modelType={"modal"}
                                dataTargetID={"#adminNew"}
                                spanIconClassName={"fas fa-solid fa-plus"}
                                buttonName={"НЭМЭХ"}
                                // btnInsert={btnInsert}
                                excelDownloadData={users}
                                excelHeaders={excelHeaders}
                                isHideInsert={true}
                            />
                        ) : (
                            <>
                                {isUserAddButton === 1 ? (
                                    <CustomToolbar
                                        title={"ХЭРЭГЛЭГЧИЙН БҮРТГЭЛ"}
                                        btnClassName={"btn btn-success"}
                                        modelType={"modal"}
                                        dataTargetID={"#adminNew"}
                                        spanIconClassName={
                                            "fas fa-solid fa-plus"
                                        }
                                        buttonName={"НЭМЭХ"}
                                        // btnInsert={btnInsert}
                                        excelDownloadData={users}
                                        excelHeaders={excelHeaders}
                                        isHideInsert={true}
                                    />
                                ) : (
                                    <CustomToolbar
                                        title={"ХЭРЭГЛЭГЧИЙН БҮРТГЭЛ"}
                                        btnClassName={"btn btn-success"}
                                        modelType={"modal"}
                                        dataTargetID={"#adminNew"}
                                        spanIconClassName={
                                            "fas fa-solid fa-plus"
                                        }
                                        buttonName={"НЭМЭХ"}
                                        // btnInsert={btnInsert}
                                        excelDownloadData={users}
                                        excelHeaders={excelHeaders}
                                        isHideInsert={false}
                                    />
                                )}
                            </>
                        )}
                    </>
                }
                btnEdit={btnEdit}
                modelType={showModal}
                editdataTargetID={"#userEdit"}
                // btnDelete={btnDelete}
                btnHuman={fn_send_to_noots}
                isHideHuman={true}
                avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                avgColumnName={"email"} //
                avgName={"Дундаж: "}
                getRowsSelected={getRowsSelected}
                setRowsSelected={setRowsSelected}
                isHideDelete={false}
                isHideEdit={true}
            />

            {/* <PkoAdminNew refreshUsers={refreshUsers} /> */}
            {userType == "unitAdmin" ? (
                <>
                    <PkoUnitNew refreshUsers={refreshUsers} />

                    <PkoUnitEdit
                        setRowsSelected={setRowsSelected}
                        refreshUsers={refreshUsers}
                        changeDataRow={clickedRowData}
                        isEditBtnClick={isEditBtnClick}
                    />
                </>
            ) : (
                <>
                    {getComID < 8 ? (
                        <>
                            <PkoComNew refreshUsers={refreshUsers} />

                            <PkoComEdit
                                setRowsSelected={setRowsSelected}
                                refreshUsers={refreshUsers}
                                changeDataRow={clickedRowData}
                                isEditBtnClick={isEditBtnClick}
                            />
                        </>
                    ) : (
                        <PkoOtherNew refreshUsers={refreshUsers} />
                    )}
                </>
            )}
            {/* {userType} */}
            {/* <PkoAdminEdit
                setRowsSelected={setRowsSelected}
                refreshUsers={refreshUsers}
                changeDataRow={clickedRowData}
                isEditBtnClick={isEditBtnClick}
            /> */}
        </div>
    );
};

export default PkoAdmin;

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
