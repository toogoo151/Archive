import { format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../../../styles/muidatatable.css";
import axios from "../../../AxiosUser";
import CustomToolbar from "../../../components/Admin/general/MUIDatatable/CustomToolbar";
import MUIDatatable from "../../../components/Admin/general/MUIDatatable/MUIDatatable";
import NomEdit from "./NomEdit";
import NomNew from "./NomNew";
const Index = () => {

    // ================= FILTER CONTROL =================
    const [isFilterActive, setIsFilterActive] = useState(false);

    // ================= DATA =================
    const [allBooks, setAllbooks] = useState([]);
    const [getBooks, setBooks] = useState([]);
    const [getHumrug, setHumrug] = useState([]);
    const [getDans, setDans] = useState([]);

    const [getRowsSelected, setRowsSelected] = useState([]);
    const [clickedRowData, setclickedRowData] = useState([]);
    const [isEditBtnClick, setIsEditBtnClick] = useState(false);

    const [showModal] = useState("modal");

    // FETCH
    useEffect(() => {
        refreshNom();
        axios
            .get("/get/Humrug")
            .then((res) => {
                setHumrug(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get("/get/Dans")
            .then((res) => {
                setDans(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const refreshNom = () => {
        axios
            .get("/get/ashignoms")
            .then((res) => {
                setRowsSelected([]);
                setAllbooks(res.data);
                setBooks(res.data); // анх бүх өгөгдөл
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
            setclickedRowData(getBooks[getRowsSelected[0]]);
        }
    }, [getRowsSelected, getBooks]);

    //  DATE FILTER
    useEffect(() => {
        if (!isFilterActive) {
            setBooks(allBooks);
            return;
        }

    }, [isFilterActive, allBooks]);
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
                    .post("/delete/ashignom", {
                        id: getBooks[getRowsSelected[0]].id,
                    })
                    .then((res) => {
                        Swal.fire(res.data.msg);
                        refreshNom();
                    })
                    .catch((err) => {
                        Swal.fire(err.response?.data?.msg || "Алдаа гарлаа");
                    });
            }
        });
    };

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
        name: "humrug_id",
        label: "Хөмрөгийн дугаар",
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
            customBodyRenderLite: (dataIndex) => {
                const rowData = getBooks[dataIndex];
                if (!rowData || !rowData.humrug_id) return "-";
                const humrug = getHumrug.find((el) => el.id == rowData.humrug_id);
                return humrug?.humrug_dugaar || "-";
            },
        },
    },
    {
        name: "humrug_name",
        label: "Хөмрөгийн нэр",
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
            customBodyRenderLite: (dataIndex) => {
                const rowData = getBooks[dataIndex];
                if (!rowData || !rowData.humrug_id) return "-";
                const humrug = getHumrug.find((el) => el.id == rowData.humrug_id);
                return humrug?.humrug_ner || "-";
            },
        },
    },
    {
        name: "dans_id",
        label: "Дансны дугаар",
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
            customBodyRenderLite: (dataIndex) => {
                const rowData = getBooks[dataIndex];
                if (!rowData || !rowData.dans_id) return "-";
                const dans = getDans.find((el) => el.id == rowData.dans_id);
                return dans?.dans_dugaar || "-";
            },
        },
    },
    {
        name: "dans_name",
        label: "Дансны нэр",
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
            customBodyRenderLite: (dataIndex) => {
                const rowData = getBooks[dataIndex];
                if (!rowData || !rowData.dans_id) return "-";
                const dans = getDans.find((el) => el.id == rowData.dans_id);
                return dans?.dans_ner || "-";
            },
        },
    },
    {
        name: "nom_dugaar",
        label: "Номын дугаар",
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
        name: "nom_ners",
        label: "Номын нэр",
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

    //RENDER
    return (
        <>
            <div className="row">
                <div className="info-box">
                    <div className="col-md-12">
                        <h1 className="text-center">Ашигласан номын жагсаалт</h1>
                        {/* TABLE */}
                        <MUIDatatable
                            data={getBooks}
                            setdata={setBooks}
                            columns={columns}
                            costumToolbar={
                                <CustomToolbar
                                    btnClassName="btn btn-success"
                                    modelType="modal"
                                    dataTargetID="#NomNew"
                                    spanIconClassName="fas fa-plus"
                                    buttonName="НЭМЭХ"
                                    excelDownloadData={getBooks}
                                    excelHeaders={excelHeaders}
                                    isHideInsert={true}
                                />
                            }
                            btnEdit={btnEdit}
                            modelType={showModal}
                            editdataTargetID="#NomEdit"
                            btnDelete={btnDelete}
                            getRowsSelected={getRowsSelected}
                            setRowsSelected={setRowsSelected}
                            isHideDelete={true}
                            isHideEdit={true}
                        />

                        <NomNew refreshNom={refreshNom} />
                        <NomEdit
                            setRowsSelected={setRowsSelected}
                            refreshNom={refreshNom}
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

const excelHeaders = [
    { label: "Хөмрөгийн дугаар", key: "humrug_id" },
    { label: "Дансны дугаар", key: "dans_id" },
    { label: "Номын дугаар", key: "nom_dugaar" },
    { label: "Номын нэр", key: "nom_ners" },
];
