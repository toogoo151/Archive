import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "../../../../AxiosUser";
import { AppContext } from "../../../../Context/MyContext";
import MUIDatatable from "../../../../components/Admin/general/MUIDatatable/MUIDatatable";
import CustomToolbar from "../../../../components/Admin/general/MUIDatatable/CustomToolbar";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
} from "mdb-react-ui-kit";
import UserMissionHistory from "./UserMissionHistory";
import CheckButton from "@mui/icons-material/CheckCircleOutlineOutlined";
import DangerousButton from "@mui/icons-material/DangerousSharp";

const UserDetails = (props) => {
    const state = useContext(AppContext);
    const [getUserDetails, setUserDetails] = useState([]);
    const [getMissions, setMissions] = useState([]);
    const [getUnitCommanderAppr, setUnitCommanderAppr] = useState([]);
    const [getRowsSelected, setRowsSelected] = useState([]); // row clear хийж байгаа
    const [clickedRowData, setclickedRowData] = useState([]);
    const [getUsers, setUsers] = useState([]);
    const [getUuregGuitsetgelt, setUuregGuitsetgelt] = useState([]);

    useEffect(() => {
        setUsers(props.getUserDetails);
        setMissions(props.getMissionHistory);
        setUnitCommanderAppr(props.getUnitCommanderApprove);
    }, [props]);

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
            name: "missionName",
            label: "Ажиллагаа",
            options: {
                filter: true,
                sort: false,
                setCellHeaderProps: (value) => {
                    return {
                        style: {
                            backgroundColor: "#5DADE2",
                            color: "white",
                            width: 40,
                        },
                    };
                },
                setCellProps: () => {
                    return { align: "center" };
                },
            },
        },
        {
            name: "eeljName",
            label: "Ээлж",
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
            name: "startDate",
            label: "Явсан огноо",
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
            name: "finishDate",
            label: "Ирсэн огноо",
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
            name: "positionName",
            label: "Албан тушаал",
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
            name: "id",
            label: "Үүрэг гүйцэтгэлт",
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
                setCellProps: () => {
                    return { align: "center" };
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-toggle="modal"
                                data-target="#userUuregGuitsetgelt"
                                onClick={() => {
                                    fn_uureg_guitsetgelt_btn(
                                        value,
                                        tableMeta,
                                        updateValue
                                    );
                                }}
                            >
                                Үнэлгээ
                            </button>
                        </>
                    );
                },
            },
        },
    ];

    const fn_uureg_guitsetgelt_btn = (value, tableMeta, updateValue) => {
        axios
            .post("/get/user/uureg/guitsetgelt", {
                _missionID: state.getMissionRowID,
                _eeljID: state.getEeljRowID,
                _id: value,
            })
            .then((res) => {
                setUuregGuitsetgelt(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        <UserMissionHistory />;
    };

    return (
        <>
            <div className="modal" id="userDetails">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">ЦАХ-ИЙН ДЭЛГЭРЭНГҮЙ</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>
                        {/* <form onSubmit={handleSubmit}> */}
                        <div className="modal-body">
                            <MDBContainer>
                                <MDBRow className="justify-content-left">
                                    <MDBCol
                                        md="12"
                                        lg="7"
                                        xl="12"
                                        className="mt-12"
                                    >
                                        <MDBCard
                                            style={{ borderRadius: "15px" }}
                                        >
                                            <MDBCardBody className="p-12">
                                                <div className="d-flex text-black">
                                                    <div className="flex-shrink-0">
                                                        <MDBCardImage
                                                            style={{
                                                                width: "180px",
                                                                height: "180px",
                                                                borderRadius:
                                                                    "10px",
                                                            }}
                                                            // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                                            src={
                                                                getUsers.image !=
                                                                0
                                                                    ? // ? "http://172.16.10.78:8000/storage" +
                                                                      "https://psod.maf.gov.mn/storage" +
                                                                      getUsers.image
                                                                    : "https://psod.maf.gov.mn/storage/profile/No-photo.jpg"
                                                            }
                                                            alt="Generic placeholder image"
                                                            fluid
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            КОМАНДЛАЛ:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUsers.comandlalShortName
                                                            }
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            РД:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {getUsers.rd}
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            ОВОГ:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {getUsers.lastName}
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            НАС:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {getUsers.age}
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            АНГИ:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUsers.unitShortName
                                                            }
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            ЦОЛ:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {getUsers.shortRank}
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            НЭР:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {getUsers.firstName}
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            ХҮЙС:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUsers.genderName
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                            <MDBContainer>
                                <MDBRow className="justify-content-left">
                                    <MDBCol
                                        md="12"
                                        lg="7"
                                        xl="12"
                                        className="mt-12"
                                    >
                                        <MDBCard
                                            style={{ borderRadius: "15px" }}
                                        >
                                            <MDBCardBody className="p-12">
                                                <div className="d-flex text-black">
                                                    <div className="flex-shrink-0">
                                                        <h1>
                                                            Ангийн захирагчийн{" "}
                                                            <br />
                                                            шийдвэр
                                                        </h1>
                                                        <div
                                                            className="center"
                                                            style={{
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center",
                                                                // height: "100%",
                                                            }}
                                                        >
                                                            {getUnitCommanderAppr.chiefApprove ===
                                                            0 ? (
                                                                ""
                                                            ) : getUnitCommanderAppr.chiefApprove ===
                                                              1 ? (
                                                                <CheckButton
                                                                    color={
                                                                        "success"
                                                                    }
                                                                    fontSize={
                                                                        "large"
                                                                    }
                                                                ></CheckButton>
                                                            ) : (
                                                                <DangerousButton
                                                                    color={
                                                                        "error"
                                                                    }
                                                                    fontSize={
                                                                        "large"
                                                                    }
                                                                ></DangerousButton>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex-grow-1 ms-3">
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            Биеийн тамирын оноо:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUnitCommanderAppr.SportScore
                                                            }
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            Өндөр:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUnitCommanderAppr.height
                                                            }
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            Жин:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUnitCommanderAppr.weight
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            Бэлхүүсний тойрог:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUnitCommanderAppr.waist
                                                            }
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            Ташааны тойрог:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUnitCommanderAppr.thigh
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {getUnitCommanderAppr.chiefDesc !=
                                                        null && (
                                                        <div
                                                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                            style={{
                                                                backgroundColor:
                                                                    "#efefef",
                                                            }}
                                                        >
                                                            Тайлбар:
                                                            &nbsp;&nbsp;&nbsp;
                                                            {
                                                                getUnitCommanderAppr.chiefDesc
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <MUIDatatable
                                data={getMissions}
                                setdata={setMissions}
                                columns={columns}
                                costumToolbar={
                                    <>
                                        <CustomToolbar
                                            excelDownloadData={getMissions}
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
                            <UserMissionHistory
                                onClick={fn_uureg_guitsetgelt_btn}
                                clickedRowData={clickedRowData}
                                getUuregGuitsetgelt={getUuregGuitsetgelt}
                            />
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDetails;

const excelHeaders = [
    { label: "Ажиллагаа", key: "missionName" },
    { label: "Ээлж", key: "eeljName" },
    { label: "Явсан огноо", key: "startDate" },
    { label: "Ирсэн огноо", key: "finishDate" },
    { label: "Албан тушаал", key: "positionName" },
];
