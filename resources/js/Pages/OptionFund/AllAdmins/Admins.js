import React, { useEffect, useState, useContext } from "react";
import axios from "../../../AxiosUser";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import AllUserShiljuuleh from "./AllUserShiljuuleh";
import { AppContext } from "../../../Context/MyContext";
// import PkoComNew from "./PkoComNew";
import PkoUnitNew from "./PkoUnitNew";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import PkoUnitEdit from "./PkoUnitEdit";
import Swal from "sweetalert2";
const Admins = () => {
    const state = useContext(AppContext);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);
    const [isEditBtnClick, setIsEditBtnClick] = useState(false);
    const [showModal, setShowModal] = useState("modal");
    const [showModalEdit, setShowModalEdit] = useState("modal");
    const [users, setUsers] = useState([]);

    const [changeDataRow, setChangeDataRow] = useState([]);
    const [getDataRowLenght, setGetDataRowLenght] = useState(-1);
    const [beforeIndex, setBeforeIndex] = useState(-1);

    const [getAllSystemUsers, setAllSystemUsers] = useState(0);
    const [getAllAdmins, setAllAdmins] = useState(0);
    const [getAllUnitUsers, setAllUnitUsers] = useState(0);
    const [getAllUnitNotVerifiedUsers, setAllUnitNotVerifiedUsers] =
        useState(0);
    const [getRequestedInThisMission, setRequestedInThisMission] = useState(0);

    const [data, setData] = useState([]);
    // server side
    const [serverSidePage, setServerSidePage] = useState(0);
    const [serverSideCount, setServerSideCount] = useState(0);
    const [serverSideRowsPerPage, setServerSideRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
    // server side

    const [changeUsersType, setChangeUsersType] = useState(
        userType === "superAdmin"
            ? "2"
            : userType === "unitAdmin"
            ? "1"
            : userType === "gsmafAdmin"
            ? "2"
            : ""
    );
    const [seeAllUsers, setSeeAllUsers] = useState("");
    // const [ranks, setRanks] = useState([]);
    useEffect(() => {
        // if (changeUsersType != "" && seeAllUsers != "") {
        //     refreshUsers(
        //         state.getMissionRowID,
        //         state.getEeljRowID,
        //         changeUsersType,
        //         seeAllUsers
        //     );
        // }
        if (changeUsersType != "" && seeAllUsers != "") {
            refreshUsers(
                serverSidePage,
                serverSideRowsPerPage,
                state.getMissionRowID,
                state.getEeljRowID,
                changeUsersType,
                seeAllUsers,
                searchText
            );
        }
    }, []);
    // useEffect(() => {
    //     setRowsSelected([]);
    //     if (changeUsersType != "" && seeAllUsers != "") {
    //         refreshUsers(
    //             state.getMissionRowID,
    //             state.getEeljRowID,
    //             changeUsersType,
    //             seeAllUsers
    //         );
    //     }
    // }, [
    //     state.getMissionRowID,
    //     state.getEeljRowID,
    //     changeUsersType,
    //     seeAllUsers,
    // ]);
    // const refreshUsers = (
    //     _missionID,
    //     _eeljID,
    //     _changeUsersType,
    //     _seeAllUsers
    // ) => {
    //     axios
    //         .post("/get/all/amdins", {
    //             _missionID,
    //             _eeljID,
    //             _changeUsersType,
    //             _seeAllUsers,
    //         })
    //         .then((res) => {
    //             setAllSystemUsers(res.data.countAllSystemUsers);
    //             setAllAdmins(res.data.countAllAdmins);
    //             setAllUnitUsers(res.data.countAllUnitUsers);
    //             setRequestedInThisMission(res.data.countRequestedInThisMission);
    //             setUsers(res.data.requestedInThisMissionData);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    const refreshUsers = (
        page,
        rowsPerPage,
        _missionID,
        _eeljID,
        _changeUsersType,
        _seeAllUsers,
        _search
    ) => {
        axios
            .post("/user/page/by/ten", {
                page: page + 1, // Laravel pagination is 1-based
                per_page: rowsPerPage,
                _missionID,
                _eeljID,
                _changeUsersType,
                _seeAllUsers,
                _search,
            })
            .then((res) => {
                setAllSystemUsers(res.data.countAllSystemUsers);
                setAllAdmins(res.data.countAllAdmins);
                setAllUnitUsers(res.data.countAllUnitUsers);
                setAllUnitNotVerifiedUsers(
                    res.data.countAllUnitNotVerifiedUsers
                );
                setRequestedInThisMission(res.data.countRequestedInThisMission);

                setUsers(res.data.requestedInThisMissionData.original.data);
                setServerSideCount(
                    res.data.requestedInThisMissionData.original.total
                );
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };
    useEffect(() => {
        setRowsSelected([]);
        if (changeUsersType != "" && seeAllUsers != 0) {
            refreshUsers(
                serverSidePage,
                serverSideRowsPerPage,
                state.getMissionRowID,
                state.getEeljRowID,
                changeUsersType,
                seeAllUsers,
                searchText
            );
        }
    }, [
        serverSidePage,
        serverSideRowsPerPage,
        state.getMissionRowID,
        state.getEeljRowID,
        changeUsersType,
        seeAllUsers,
        searchText,
    ]);

    // const options = {
    //     filterType: "checkbox",
    //     serverSide: true,
    //     count: count,
    //     page: page,
    //     rowsPerPage: rowsPerPage,
    //     onTableChange: (action, tableState) => {
    //         if (action === "changePage") {
    //             setPage(tableState.page);
    //         } else if (action === "changeRowsPerPage") {
    //             setRowsPerPage(tableState.rowsPerPage);
    //             setPage(0); // Reset to first page when rows per page change
    //         }
    //     },
    // };

    const handleChangeNew = (event, data, rowIndex) => {
        setChangeDataRow(data);
        setGetDataRowLenght(rowIndex);
    };

    const btnEdit = () => {
        setIsEditBtnClick(true);
    };
    const fn_send_to_noots = () => {
        if (getRowsSelected[0] != undefined) {
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
                            setRowsSelected([]);
                            refreshUsers(
                                serverSidePage,
                                serverSideRowsPerPage,
                                state.getMissionRowID,
                                state.getEeljRowID,
                                changeUsersType,
                                seeAllUsers,
                                searchText
                            );
                        })
                        .catch((err) => {
                            Swal.fire(err.response.data.msg);
                        });
                } else if (result.isDenied) {
                }
            });
        } else {
            Swal.fire("Шилжүүлэх ЦАХ-ийг сонгоно уу");
        }
    };

    const onclickEditBtn = () => {
        setIsEditBtnClick(true);
    };
    const onclickHumenBtn = () => {
        fn_send_to_noots();
    };
    useEffect(() => {
        if (getRowsSelected[0] != undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(users[getRowsSelected[0]]);
        }
    }, [getRowsSelected]);

    return (
        <>
            <div
                className="info-box col d-flex flex-column"
                style={{
                    paddingTop: "25px",
                    paddingBottom: "0px",
                }}
            >
                <div className="row px-3">
                    {userType == "superAdmin" ||
                        (userType == "comandlalAdmin" && (
                            <>
                                <div className="col-md-6">
                                    <div
                                        className="bg-info small-box d-flex flex-column"
                                        style={{ height: "80%" }}
                                    >
                                        <div className="inner">
                                            <h3>{getAllSystemUsers}</h3>
                                            <p>НИЙТ СИСТЕМИЙН ХЭРЭГЛЭГЧ</p>
                                        </div>
                                        <div className="icon">
                                            <i className="fas fa-users" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div
                                        className="bg-info small-box d-flex flex-column"
                                        style={{ height: "80%" }}
                                    >
                                        <div className="inner">
                                            <h3>{getAllAdmins}</h3>
                                            <p>НИЙТ АДМИН</p>
                                        </div>
                                        <div className="icon">
                                            <i className="fas fa-users-cog" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}

                    <div className="col-lg-3 col-12 col-sm-6">
                        <div
                            className="bg-info small-box d-flex flex-column"
                            style={{ height: "80%" }}
                        >
                            <div className="inner">
                                <h3>{getAllUnitUsers}</h3>
                                <p>СИСТЕМД БҮРТГЭЛТЭЙ </p>
                                <p style={{ marginTop: -15 }}>
                                    НИЙТ ХЭРЭГЛЭГЧИД
                                </p>
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
                                <h3>{getAllUnitNotVerifiedUsers}</h3>
                                <p>ЦАХИМ ХАЯГ </p>
                                <p style={{ marginTop: -15 }}>
                                    БАТАЛГААЖААГҮЙ ХЭРЭГЛЭГЧИД
                                </p>
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
                                <h3>{getRequestedInThisMission}</h3>
                                <p>ЭНЭ АЖИЛЛАГААНД </p>
                                <p style={{ marginTop: -15 }}>
                                    ХҮСЭЛТ ГАРГАСАН ЦАХ
                                </p>
                            </div>
                            <div className="icon">
                                <i className="fas fas fa-user-check" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row px-3">
                    <div className="col-lg-3 col-12 col-sm-6">
                        <div
                            className="bg-success small-box  d-flex flex-column"
                            style={{ height: "80%" }}
                        >
                            <div className="inner">
                                <h3>{getDocTotal}</h3>

                                <div className="">
                                    <p>
                                        Бичиг баримтын бүрдэл
                                        <br className="d-lg-block d-none" />{" "}
                                        зөвшөөрөгдсөн
                                    </p>
                                </div>
                            </div>
                            <div className="icon">
                                <i className="fas fa-check" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 col-sm-6">
                        <div
                            className="bg-success small-box d-flex  flex-column"
                            style={{ height: "80%" }}
                        >
                            <div className="inner">
                                <h3>{getHeltesTotal}</h3>

                                <div className="">
                                    <p>
                                        Эрүүл мэндийн хэлтсээс
                                        <br className="d-lg-block d-none" />{" "}
                                        зөвшөөрөгдсөн
                                    </p>
                                </div>
                            </div>
                            <div className="icon">
                                <i className="fas fa-check" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-12 col-sm-6">
                        <div
                            className="bg-success small-box d-flex  flex-column"
                            style={{ height: "80%" }}
                        >
                            <div className="inner">
                                <h3>{getHealthTotal}</h3>

                                <div className="">
                                    <p>
                                        Эрүүл мэндийн үзлэгээр{" "}
                                        <br className="d-lg-block d-none" />{" "}
                                        тэнцсэн
                                    </p>
                                </div>
                            </div>
                            <div className="icon">
                                <i className="fas fa-check" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-12 col-sm-6">
                        <div
                            className="bg-success small-box  d-flex  flex-column"
                            style={{ height: "80%" }}
                        >
                            <div className="inner">
                                <h3>{getSportTotal}</h3>

                                <div className="">
                                    <p>
                                        Биеийн тамирын шалгалт
                                        <br className="d-lg-block d-none" />{" "}
                                        өгсөн
                                    </p>
                                </div>
                            </div>
                            <div className="icon">
                                <i className="fas fa-check" />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="info-box">
                <div className="col-md-12">
                    <div className="row">
                        {userType === "comandlalAdmin" && (
                            <>
                                <div className="col-md-2">
                                    {/* <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Командлал:
                                    </span>
                                </div> */}
                                    <select
                                        className="form-control"
                                        value={changeUsersType}
                                        onChange={(e) => {
                                            setChangeUsersType(e.target.value);
                                        }}
                                    >
                                        <option value="">Сонгоно уу</option>
                                        <option value="1">
                                            {state.getUserDataRow.userUnitName}
                                            {"-ийн "}
                                            хэрэглэгч
                                        </option>
                                        <option value="2">
                                            Харяа ангиудын хэрэглэгч
                                        </option>
                                    </select>
                                </div>
                                <div className="col-md-1">
                                    <h1>{"=>"}</h1>
                                </div>
                                <div className="col-md-3">
                                    {/* <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        Анги:
                                    </span>
                                </div> */}
                                    <select
                                        className="form-control"
                                        value={seeAllUsers}
                                        onChange={(e) => {
                                            setSeeAllUsers(e.target.value);
                                        }}
                                    >
                                        <option value="">
                                            Хэрэглэгч сонгоно уу
                                        </option>
                                        {changeUsersType == "1" ? (
                                            <>
                                                <option value="1">
                                                    Системд бүртгэлтэй{" "}
                                                    {
                                                        state.getUserDataRow
                                                            .userUnitName
                                                    }
                                                    -ийн нийт ЦАХ
                                                </option>
                                                <option value="2">
                                                    Энэ ажиллагаанд хүсэлт
                                                    гаргасан{" "}
                                                    {
                                                        state.getUserDataRow
                                                            .userUnitName
                                                    }
                                                    -ийн ЦАХ
                                                </option>
                                            </>
                                        ) : (
                                            changeUsersType == "2" && (
                                                <>
                                                    <option value="1">
                                                        Системд бүртгэлтэй нийт
                                                        ЦАХ
                                                    </option>
                                                    <option value="2">
                                                        Энэ ажиллагаанд хүсэлт
                                                        гаргасан ЦАХ
                                                    </option>
                                                </>
                                            )
                                        )}
                                    </select>
                                </div>
                            </>
                        )}
                        {userType === "unitAdmin" && (
                            <div className="col-md-3">
                                {/* <div className="input-group-prepend">
                            <span className="input-group-text">
                                Анги:
                            </span>
                        </div> */}
                                <select
                                    className="form-control"
                                    value={seeAllUsers}
                                    onChange={(e) => {
                                        setSeeAllUsers(e.target.value);
                                    }}
                                >
                                    <option value="">
                                        Хэрэглэгч сонгоно уу
                                    </option>
                                    <option value="1">
                                        Системд бүртгэлтэй нийт ЦАХ
                                    </option>
                                    <option value="2">
                                        Энэ ажиллагаанд хүсэлт гаргасан нийт ЦАХ
                                    </option>
                                </select>
                            </div>
                        )}
                        {userType == "superAdmin" ? (
                            <div className="col-md-3">
                                <select
                                    className="form-control"
                                    value={seeAllUsers}
                                    onChange={(e) => {
                                        setSeeAllUsers(e.target.value);
                                    }}
                                >
                                    <option value="">
                                        Хэрэглэгч сонгоно уу
                                    </option>
                                    <option value="1">
                                        Системд бүртгэлтэй нийт ЦАХ
                                    </option>
                                    <option value="2">
                                        Энэ ажиллагаанд хүсэлт гаргасан нийт ЦАХ
                                    </option>
                                </select>
                            </div>
                        ) : (
                            userType == "gsmafAdmin" && (
                                <div className="col-md-3">
                                    <select
                                        className="form-control"
                                        value={seeAllUsers}
                                        onChange={(e) => {
                                            setSeeAllUsers(e.target.value);
                                        }}
                                    >
                                        <option value="">
                                            Хэрэглэгч сонгоно уу
                                        </option>
                                        <option value="1">
                                            Системд бүртгэлтэй нийт ЦАХ
                                        </option>
                                        <option value="2">
                                            Энэ ажиллагаанд хүсэлт гаргасан нийт
                                            ЦАХ
                                        </option>
                                    </select>
                                </div>
                            )
                        )}

                        {/* <div className="col-md-3">
                            {userType === "comandlalAdmin" &&
                                changeUsersType == "1" &&
                                seeAllUsers == "1" && (
                                    <PkoUnitNew
                                        refreshUsers={refreshUsers}
                                        changeUsersType={changeUsersType}
                                        seeAllUsers={seeAllUsers}
                                    />
                                )}
                        </div> */}
                        <div className="col-md-6">
                            {userType === "comandlalAdmin" &&
                                changeUsersType == "1" &&
                                seeAllUsers == "1" && (
                                    <>
                                        <PkoUnitNew
                                            refreshUsers={refreshUsers}
                                            changeUsersType={changeUsersType}
                                            seeAllUsers={seeAllUsers}
                                            serverSidePage={serverSidePage}
                                            serverSideRowsPerPage={
                                                serverSideRowsPerPage
                                            }
                                        />
                                        <button
                                            style={{ marginLeft: "5px" }}
                                            type="button"
                                            className="btn btn-warning"
                                            data-toggle={showModalEdit}
                                            data-target="#userEdit"
                                            onClick={onclickEditBtn}
                                        >
                                            <span className="fas fa-solid fa-pen"></span>
                                            &nbsp; ЗАСАХ
                                        </button>
                                        <button
                                            style={{ marginLeft: "5px" }}
                                            type="button"
                                            className="btn btn-info"
                                            onClick={onclickHumenBtn}
                                        >
                                            <span className="fas fa-solid fa-pen"></span>
                                            &nbsp;{" "}
                                            {state.getUserDataRow.userUnitName}
                                            -аас бусад анги руу шилжсэн
                                        </button>
                                    </>
                                )}
                            {userType === "unitAdmin" &&
                                changeUsersType == "1" &&
                                seeAllUsers == "1" && (
                                    <>
                                        <PkoUnitNew
                                            refreshUsers={refreshUsers}
                                            changeUsersType={changeUsersType}
                                            seeAllUsers={seeAllUsers}
                                            serverSidePage={serverSidePage}
                                            serverSideRowsPerPage={
                                                serverSideRowsPerPage
                                            }
                                        />
                                        <button
                                            style={{ marginLeft: "5px" }}
                                            type="button"
                                            className="btn btn-warning"
                                            data-toggle={showModalEdit}
                                            data-target="#userEdit"
                                            onClick={onclickEditBtn}
                                        >
                                            <span className="fas fa-solid fa-pen"></span>
                                            &nbsp; ЗАСАХ
                                        </button>
                                        <button
                                            style={{ marginLeft: "5px" }}
                                            type="button"
                                            className="btn btn-info"
                                            onClick={onclickHumenBtn}
                                        >
                                            <span className="fas fa-solid fa-pen"></span>
                                            &nbsp;{" "}
                                            {state.getUserDataRow.userUnitName}
                                            -аас бусад анги руу шилжсэн
                                        </button>
                                    </>
                                )}
                        </div>
                    </div>
                    <div className="row">
                        <h1 className="text-center" style={{ paddingTop: 5 }}>
                            {seeAllUsers == "1"
                                ? "Системд бүртгэлтэй нийт ЦАХ"
                                : seeAllUsers == "2" &&
                                  "Энэ ажиллагаанд хүсэлт гаргасан ЦАХ"}
                        </h1>
                    </div>
                </div>
            </div>
            <div
                className="info-box"
                style={{
                    // overflow: "scroll",
                    marginBottom: "10px",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    width: "100%",
                }}
            >
                {/* <ReactDatatable
                            config={config}
                            columns={columns}
                            records={users}
                            onRowClicked={handleChangeNew}
                        /> */}
                {/* <MUIDatatable
                    data={data}
                    setdata={setData}
                    columns={columnsServer}
                    // options={options}
                    costumToolbar={
                        <>
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
                                isHideInsert={false}
                            />
                        </>
                    }
                    // serverSide
                    count={serverSideCount}
                    page={serverSidePage}
                    rowsPerPage={serverSideRowsPerPage}
                    setPage={setServerSidePage}
                    setRowsPerPage={setServerSideRowsPerPage}
                    isServerSide={true}
                    // serverSide end
                    btnEdit={btnEdit}
                    modelType={showModal}
                    editdataTargetID={"#userEdit"}
                    // btnDelete={btnDelete}
                    // btnHuman={fn_send_to_noots} // хүний нөөцөд шилжүүлэх
                    isHideHuman={false} // хүний нөөцөд шилжүүлэх
                    avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                    avgColumnName={"email"} //
                    avgName={"Дундаж: "}
                    getRowsSelected={getRowsSelected}
                    setRowsSelected={setRowsSelected}
                    isHideDelete={false}
                    isHideEdit={false}
                /> */}

                <MUIDatatable
                    data={users}
                    setdata={setUsers}
                    columns={columns}
                    costumToolbar={
                        <>
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
                                isHideInsert={false}
                            />
                        </>
                    }
                    // serverSide
                    count={serverSideCount}
                    page={serverSidePage}
                    rowsPerPage={serverSideRowsPerPage}
                    setPage={setServerSidePage}
                    setRowsPerPage={setServerSideRowsPerPage}
                    isServerSide={true}
                    setSearchText={setSearchText}
                    // serverSide end

                    btnEdit={btnEdit}
                    modelType={showModal}
                    editdataTargetID={"#userEdit"}
                    // btnDelete={btnDelete}
                    // btnHuman={fn_send_to_noots} // хүний нөөцөд шилжүүлэх
                    isHideHuman={false} // хүний нөөцөд шилжүүлэх
                    avgColumnIndex={-1} // -1 байвал дундаж бодохгүй. дундаж бодох column index оруул. index нь 0 ээс эхлэж байгаа
                    avgColumnName={"email"} //
                    avgName={"Дундаж: "}
                    getRowsSelected={getRowsSelected}
                    setRowsSelected={setRowsSelected}
                    isHideDelete={false}
                    isHideEdit={false}
                />
            </div>

            {userType === "comandlalAdmin" && (
                <PkoUnitEdit
                    setRowsSelected={setRowsSelected}
                    refreshUsers={refreshUsers}
                    changeUsersType={changeUsersType}
                    seeAllUsers={seeAllUsers}
                    changeDataRow={clickedRowData}
                    isEditBtnClick={isEditBtnClick}
                    serverSidePage={serverSidePage}
                    serverSideRowsPerPage={serverSideRowsPerPage}
                />
            )}
            {userType === "unitAdmin" && (
                <PkoUnitEdit
                    setRowsSelected={setRowsSelected}
                    refreshUsers={refreshUsers}
                    changeUsersType={changeUsersType}
                    seeAllUsers={seeAllUsers}
                    changeDataRow={clickedRowData}
                    isEditBtnClick={isEditBtnClick}
                    serverSidePage={serverSidePage}
                    serverSideRowsPerPage={serverSideRowsPerPage}
                />
            )}
        </>
    );
};

export default Admins;

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
        label: "Цээж зураг123",
        options: {
            filter: true,
            sort: true,

            setCellHeaderProps: (value) => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                        // width: 100,
                    },
                };
            },
            customBodyRender: (value, tableMeta, updateValue) => {
                if (value != "0") {
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
                                        ? "https://psod.maf.gov.mn/storage/" +
                                          value
                                        : "https://psod.maf.gov.mn/storage/profile/No-photo.jpg"
                                }
                                //  "https://psod.maf.gov.mn/storage/profile/No-photo.jpg"
                                style={{
                                    width: "65px",
                                    height: "70px",
                                }}
                                onClick={() => profile(value)}
                            />
                        </div>
                    );
                }
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
                        // width: 100,
                    },
                };
            },
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
                    },
                };
            },
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
                    },
                };
            },
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
                    },
                };
            },
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
                    },
                };
            },
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
                    },
                };
            },
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
                    },
                };
            },
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
                    },
                };
            },
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
        },
    },
    {
        name: "email_verified_date",
        label: "Баталгаажуулсан огноо",
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
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
            setCellProps: () => ({
                style: {
                    whiteSpace: "nowrap",
                },
            }),
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
