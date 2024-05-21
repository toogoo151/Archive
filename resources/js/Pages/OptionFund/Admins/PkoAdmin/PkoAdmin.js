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

    const [getSystemAllAdmins, setSystemAllAdmins] = useState(0);
    const [getComandlalAdmins, setComandlalAdmins] = useState(0);
    const [getUnitAdmins, setUnitAdmins] = useState(0);
    const [getOtherAdmins, setOtherAdmins] = useState(0);

    const [getAdminsByType, setAdminsByType] = useState(
        userType == "superAdmin"
            ? "allAdmin"
            : userType == "gsmafAdmin"
            ? "comandlalAdmin"
            : ""
    ); // allAdmin, comandlalAdmin, unitAdmin, otherAdmin
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
            console.log(users[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);
    useEffect(() => {
        refreshUsers();
    }, [getAdminsByType]);
    const refreshUsers = () => {
        axios
            .post("/get/amdins", {
                getAdminsByType: getAdminsByType,
            })
            .then((res) => {
                setSystemAllAdmins(res.data.allSysytemAdmins);
                setComandlalAdmins(res.data.comandlalAdmins);
                setUnitAdmins(res.data.allUnitAdmin);
                setOtherAdmins(res.data.otherSystemAdmins);
                setUsers(res.data.adminsData);
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
                title: "Та хүний нөөцийн мэдэлд шилжүүлэхдээ итгэлтэй байна уу?",
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
        <>
            {userType != "comandlalAdmin" && (
                <div
                    className="info-box col d-flex flex-column"
                    style={{
                        paddingTop: "25px",
                        paddingBottom: "0px",
                    }}
                >
                    <div className="row px-3">
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-info small-box d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getSystemAllAdmins}</h3>
                                    <p>НИЙТ СИСТЕМИЙН АДМИН</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-users" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-info small-box d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getComandlalAdmins}</h3>
                                    <p>КОМАНДЛАЛЫН АДМИН</p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-users-cog" />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-info small-box d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getUnitAdmins}</h3>
                                    <p>АНГИЙН АДМИН </p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-user-friends" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-12 col-sm-6">
                            <div
                                className="bg-info small-box d-flex flex-column"
                                style={{ height: "80%" }}
                            >
                                <div className="inner">
                                    <h3>{getOtherAdmins}</h3>
                                    <p>БУСАД </p>
                                    <p style={{ marginTop: -15 }}>
                                        СИСТЕМИЙН АДМИНУУД
                                    </p>
                                </div>
                                <div className="icon">
                                    <i className="fas fas fa-user-check" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {userType} */}
                    {/* <PkoAdminEdit
            setRowsSelected={setRowsSelected}
            refreshUsers={refreshUsers}
            changeDataRow={clickedRowData}
            isEditBtnClick={isEditBtnClick}
        /> */}
                </div>
            )}
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

            <div className="info-box">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                            {/* <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Командлал:
                                    </span>
                                </div> */}
                            {userType != "comandlalAdmin" && (
                                <select
                                    className="form-control"
                                    value={getAdminsByType}
                                    onChange={(e) => {
                                        setAdminsByType(e.target.value);
                                    }}
                                >
                                    {userType == "superAdmin" && (
                                        <>
                                            <option value="allAdmin">
                                                Бүх админ
                                            </option>
                                            <option value="comandlalAdmin">
                                                Командлал админ
                                            </option>
                                            <option value="unitAdmin">
                                                Ангийн админ
                                            </option>
                                            <option value="otherAdmin">
                                                Бусад админ
                                            </option>
                                        </>
                                    )}
                                    {userType == "gsmafAdmin" && (
                                        <>
                                            <option value="comandlalAdmin">
                                                Командлал админ
                                            </option>
                                            <option value="unitAdmin">
                                                Ангийн админ
                                            </option>
                                        </>
                                    )}
                                </select>
                            )}
                        </div>
                        <div className="col-md-9">
                            <h1
                                className="text-center"
                                style={{ paddingTop: 5 }}
                            >
                                {getAdminsByType == "allAdmin"
                                    ? "Бүх админ"
                                    : getAdminsByType == "comandlalAdmin"
                                    ? "Командлал админ"
                                    : getAdminsByType == "unitAdmin"
                                    ? "Ангийн админ"
                                    : getAdminsByType == "otherAdmin" &&
                                      "Бусад админ"}
                            </h1>
                            {userType == "comandlalAdmin" && (
                                <h1>Харьяа ангийн админууд</h1>
                            )}
                        </div>
                    </div>
                    <div
                        className="row"
                        style={{
                            overflow: "scroll",
                            marginBottom: "10px",
                        }}
                    >
                        <MUIDatatable
                            data={users}
                            setdata={setUsers}
                            columns={columns}
                            costumToolbar={
                                <>
                                    {userType == "superAdmin" ? (
                                        <CustomToolbar
                                            title={"АДМИНЫ БҮРТГЭЛ"}
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
                                        <>
                                            {isUserAddButton === 1 ? (
                                                <CustomToolbar
                                                    title={"АДМИНЫ БҮРТГЭЛ"}
                                                    btnClassName={
                                                        "btn btn-success"
                                                    }
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
                                                    title={"АДМИНЫ БҮРТГЭЛ"}
                                                    btnClassName={
                                                        "btn btn-success"
                                                    }
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
                            btnHuman={fn_send_to_noots} // хүний нөөцөд шилжүүлэх
                            isHideHuman={false} // хүний нөөцөд шилжүүлэх
                            avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                            avgColumnName={"email"} //
                            avgName={"Дундаж: "}
                            getRowsSelected={getRowsSelected}
                            setRowsSelected={setRowsSelected}
                            isHideDelete={false}
                            isHideEdit={true}
                        />
                    </div>
                </div>
            </div>
        </>
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
    // {
    //     name: "image",
    //     label: "Цээж зураг",
    //     options: {
    //         filter: true,
    //         sort: true,
    //         setCellHeaderProps: (value) => {
    //             return {
    //                 style: {
    //                     backgroundColor: "#5DADE2",
    //                     color: "white",
    //                     width: 100,
    //                 },
    //             };
    //         },
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             return (
    //                 <div
    //                     style={{
    //                         textAlign: "center",
    //                         justifyContent: "center",
    //                         alignItems: "center",
    //                     }}
    //                 >
    //                     <img
    //                         className="image css-img-object"
    //                         src={
    //                             value != 0
    //                                 ? "https://psod.maf.gov.mn/storage" + value
    //                                 : "https://psod.maf.gov.mn/storage/profile/No-photo.jpg"
    //                         }
    //                         // https://psod.maf.gov.mn/storage
    //                         style={{
    //                             width: "65px",
    //                             height: "70px",
    //                         }}
    //                         onClick={() => profile(value)}
    //                     />
    //                 </div>
    //             );
    //         },
    //     },
    // },
    {
        name: "comandlal",
        label: "Командлал",
        options: {
            filter: true,
            sort: true,
            display:
                userType == "comandlalAdmin" || userType == "gsmaf"
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
    {
        name: "adminPermision",
        label: "Админы эрх",
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
