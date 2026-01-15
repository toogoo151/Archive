import { format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../../../styles/muidatatable.css";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import JagsaaltEdit from "./JagsaaltEdit";
import JagsaaltNew from "./JagsaaltNew";
const Index = () => {
    // ================= FILTER CONTROL =================
    const [isFilterActive, setIsFilterActive] = useState(false);

    // ================= DATA =================
    const [allJagsaalt, setAllJagsaalt] = useState([]);
    const [getJagsaalt, setJagsaalt] = useState([]);

    const [getRowsSelected, setRowsSelected] = useState([]);
    const [clickedRowData, setclickedRowData] = useState([]);
    const [isEditBtnClick, setIsEditBtnClick] = useState(false);

    const [showModal] = useState("modal");



    // FETCH
    useEffect(() => {
        refreshJagsaalt();
    }, []);

    const refreshJagsaalt = () => {
        axios
            .get("/get/jagsaalt")
            .then((res) => {
                setRowsSelected([]);
                setAllJagsaalt(res.data);
                setJagsaalt(res.data); // анх бүх өгөгдөл
                setIsFilterActive(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //  ROW SELECT
    useEffect(() => {
        if (getRowsSelected[0] !== undefined) {
            setIsEditBtnClick(false);
            setclickedRowData(getJagsaalt[getRowsSelected[0]]);
        }
    }, [getRowsSelected, getJagsaalt]);

    //  DATE FILTER
    useEffect(() => {
        if (!isFilterActive) {
            setJagsaalt(allJagsaalt);
            return;
        }

    }, [isFilterActive,  allJagsaalt]);

    const btnEdit = () => {
        setIsEditBtnClick(true);
    };

    const btnDelete = () => {
        if (!getRowsSelected.length) return;

        Swal.fire({
            title: "Та устгахдаа итгэлтэй байна уу?",
            showCancelButton: true,
            confirmButtonText: "Тийм",
            cancelButtonText: "Үгүй",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post("/delete/jagsaalt", {
                        id: getJagsaalt[getRowsSelected[0]].id,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshJagsaalt();
                    })
                    .catch((err) => {
                        Swal.fire(err.response?.data?.msg || "Алдаа гарлаа");
                    });
            }
        });
    };
    // Filter states

useEffect(() => {
    refreshDans();
    }, [selectedJname, selectedRetention]);
    const [getJname, setGetJname] = useState([]);
    const [getRetention, setGetRetention] = useState([]);
    const [selectedJname, setSelectedJname] = useState(0);
    const [selectedRetention, setSelectedRetention] = useState(0);

    const refreshDans = () => {
    let filteredData = allJagsaalt;

    if (selectedJname !== 0) {
        filteredData = filteredData.filter(
            (item) => Number(item.jagsaalt_turul) === selectedJname
        );
    }

    if (selectedRetention !== 0) {
        filteredData = filteredData.filter(
            (item) => Number(item.hugatsaa_turul) === selectedRetention
        );
    }

    setJagsaalt(filteredData);
    setIsFilterActive(true);
    }

    useEffect(() => {
        // Fetch distinct jName values
        axios
            .get("/get/jagsaaltTurul")
            .then((res) => {
                setGetJname(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        // Fetch retention options
        axios
            .get("/get/hugatsaaTurul")
            .then((res) => {
                setGetRetention(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Filter end states
useEffect(() => {
    console.log("selectedJname:", selectedJname);
    console.log("selectedRetention:", selectedRetention);
    console.log("sample item:", allJagsaalt[0]);
    console.log("jagsaalt_turul type :", typeof allJagsaalt[0]?.jagsaalt_turul);
    console.log("hugatsaa_turul type :", typeof allJagsaalt[0]?.hugatsaa_turul);
}, [selectedJname, selectedRetention]);


    //RENDER
    return (
        <>
            <div className="row">
                <div className="info-box">
                    <div className="col-md-12">
                        <h1 className="text-center">Хадгалах хугацааны зүйлийн жагсаалт</h1>
                        {/* FILTERS */
                        <div className="col-md-8 mb-3">
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            Жагсаалтын төрөл:
                                                        </span>

                                                        <select
                                                            className="form-control"
                                                            value={selectedJname}
                                                            onChange={(e) => {
                                                                const value = Number(e.target.value);
                                                                setSelectedJname(value);

                                                                // 0 сонгосон бол alert
                                                                if (value === 0) {
                                                                    Swal.fire({
                                                                        icon: "warning",
                                                                        title: "Анхаар!",
                                                                        text: "Жагсаалтын төрөл сонгоно уу",
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <option value={0}>Сонгоно уу</option>
                                                            {getJname.map((el) => (
                                                                <option
                                                                    key={el.id}
                                                                    value={el.id}
                                                                >
                                                                    {el.jName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <span className="mx-2"></span>
                                                        <span className="input-group-text">
                                                            Хадгалах хугацаа:
                                                        </span>

                                                        <select
                                                            className="form-control"
                                                            value={selectedRetention}
                                                            onChange={(e) => {
                                                                const value = Number(e.target.value);
                                                                setSelectedRetention(value);
                                                                if (value === 0) {
                                                                    Swal.fire({
                                                                        icon: "warning",
                                                                        title: "Анхаар!",
                                                                        text: "Хадгалах хугацааг сонгоно уу",
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <option value={0}>Сонгоно уу</option>
                                                            {getRetention.map((el) => (
                                                                <option key={el.id} value={el.id}>
                                                                    {el.RetName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>}

                        {/* TABLE */}
                        <MUIDatatable
                            data={getJagsaalt}
                            setdata={setJagsaalt}
                            columns={columns}
                            costumToolbar={
                                <CustomToolbar
                                    btnClassName="btn btn-success"
                                    modelType="modal"
                                    dataTargetID="#jagsaaltNew"
                                    spanIconClassName="fas fa-plus"
                                    buttonName="НЭМЭХ"
                                    excelDownloadData={getJagsaalt}
                                    excelHeaders={excelHeaders}
                                    isHideInsert={true}
                                    onClick={() => {
                                                                            if (
                                                                                selectedJname === 0 ||
                                                                                selectedRetention === 0
                                                                            ) {
                                                                                // Сонголт хийгээгүй бол зөвхөн анхааруулах
                                                                                Swal.fire({
                                                                                    icon: "warning",
                                                                                    title: "Анхааруулга",
                                                                                    text: "Жагсаалтын төрөл болон хадгалах хугацааг сонгоно уу!",
                                                                                });
                                                                            }
                                                                            // else блокоор modal автоматаар нээгдэх учраас өөр юу ч хийх шаардлагагүй
                                                                        }}
                                />
                            }
                            btnEdit={btnEdit}
                            modelType={showModal}
                            editdataTargetID="#jagsaaltedit"
                            btnDelete={btnDelete}
                            getRowsSelected={getRowsSelected}
                            setRowsSelected={setRowsSelected}
                            isHideDelete={true}
                            isHideEdit={true}
                        />

                        <JagsaaltNew refreshJagsaalt={refreshJagsaalt} />
                        <JagsaaltEdit
                            setRowsSelected={setRowsSelected}
                            refreshJagsaalt={refreshJagsaalt}
                            changeDataRow={clickedRowData}
                            isEditBtnClick={isEditBtnClick}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;

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
                        width: 50,
                    },
                };
            },
        },
    },
    {
        name: "jName",
        label: "Жагсаалтын төрөл",
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
        name: "barimt_turul",
        label: "Баримт төрөл",
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
        name: "barimt_dedturul",
        label: "Баримтын дэд төрөл",
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
        name: "barimt_dd",
        label: "Дэс дугаар",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: () => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                    },
                };
            },
            customBodyRender: (value) => {
                if (
                    value === null ||
                    value === "" ||
                    value === 0 ||
                    value === undefined
                ) {
                    return "-";
                }
                return value;
            },
        },
    },

    {
        name: "barimt_ner",
        label: "Баримтын нэр",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: () => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                    },
                };
            },
            customBodyRender: (value) => {
                if (
                    value === null ||
                    value === "" ||
                    value === 0 ||
                    value === undefined
                ) {
                    return "-";
                }
                return value;
            },
        },
    },

    {
        name: "RetName",
        label: "Хадгалах хугацааны төрөл",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: () => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                    },
                };
            },
            customBodyRender: (value) => {
                if (
                    value === null ||
                    value === "" ||
                    value === 0 ||
                    value === undefined
                ) {
                    return "-";
                }
                return value;
            },
        },
    },

    {
        name: "hugatsaa",
        label: "Хадгалах хугацаа",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: () => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                    },
                };
            },
            customBodyRender: (value) => {
                if (
                    value === null ||
                    value === "" ||
                    value === 0 ||
                    value === undefined
                ) {
                    return "-";
                }
                return value;
            },
        },
    },
    {
        name: "tailbar",
        label: "Тайлбар",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: () => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                    },
                };
            },
            customBodyRender: (value) => {
                if (
                    value === null ||
                    value === "" ||
                    value === 0 ||
                    value === undefined
                ) {
                    return "-";
                }
                return value;
            },
        },
    },
    {
        name: "tobchlol",
        label: "Товчлол",
        options: {
            filter: true,
            sort: false,
            setCellHeaderProps: () => {
                return {
                    style: {
                        backgroundColor: "#5DADE2",
                        color: "white",
                    },
                };
            },
            customBodyRender: (value) => {
                if (
                    value === null ||
                    value === "" ||
                    value === 0 ||
                    value === undefined
                ) {
                    return "-";
                }
                return value;
            },
        },
    },
];

const excelHeaders = [
    { label: "Жагсаалтын төрөл", key: "jName" },
    { label: "Баримт төрөл", key: "barimt_turul" },
    { label: "Баримтын дэд төрөл", key: "barimt_dedturul" },
    { label: "Дэс дугаар", key: "barimt_dd" },
    { label: "Баримтын нэр", key: "barimt_ner" },
    { label: "Хадгалах хугацааны төрөл", key: "RetName" },
    { label: "Хадгалах хугацаа", key: "hugatsaa" },
    { label: "Тайлбар", key: "tailbar" },
    { label: "Товчлол", key: "tobchlol" },
];
