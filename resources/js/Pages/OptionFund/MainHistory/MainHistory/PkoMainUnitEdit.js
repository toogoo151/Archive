import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";
import InputMask from "react-input-mask";

const PkoMainUnitEdit = (props) => {
     const [showModal, setShowModal] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [chiefApprove, setchiefApprove] = useState("");
    const [chiefDesc, setchiefDesc] = useState("");
    const [SportScore, setSportScore] = useState("");
    const [height, setheight] = useState("");
    const [weight, setweight] = useState("");
    const [waist, setwaist] = useState("");
    const [thigh, setthigh] = useState("");
    const [chiefDescVisible, setChiefDescVisible] = useState(false);





    const [getDataRow, setDataRow] = useState([]);
    // const fileInputRef = useRef(null);

    // const newWindow = useRef(window);
    // const openImage = () => {
    //     newWindow.current = window.open(
    //         "/laravel-filemanager",
    //         "",
    //         "width=1200,height=800,left=300,top=80"
    //     );
    //     window.SetUrl = (url, width, height, alt) => {
    //         setPkoImage(url[0].url);
    //     };
    // };



    useEffect(() => {
    setChiefDescVisible(chiefApprove !== "" && chiefApprove !== '1');
    }, [chiefApprove]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);
    useEffect(() => {
        if (props.isEditBtnClick) {
            setLastName(
                props.changeDataRow.lastName != null
                    ? props.changeDataRow.lastName
                    : ""
            );
            setFirstName(
                props.changeDataRow.firstName != null
                    ? props.changeDataRow.firstName
                    : ""
            );


        }
    }, [props.isEditBtnClick]);

    const saveUser = () => {
        props.setRowsSelected([]);
        // const pattern = /^[^.\s]/;

        axios
            .post("/new/PkoMainUnit", {
                MainHistoryID: props.changeDataRow.id,
                lastName: lastName,
                firstName: firstName,
                chiefApprove: chiefApprove,
                chiefDesc: chiefDesc,
                SportScore: SportScore,
                height: height,
                weight: weight,
                waist: waist,
                thigh: thigh,
            })
            .then((res) => {
                // fileInputRef.current.value = null;
               console.log(res);
                Swal.fire(res.data.msg);
                setLastName("");
                setFirstName("");
                setchiefApprove("");
                setchiefDesc("");
                setSportScore("");
                setheight("");
                setweight("");
                setwaist("");
                setthigh("");
                setShowModal("");
                props.refreshUsers();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };



    const changeLastName = (e) => {
        setLastName(e.target.value);
    };
    const changeFirstName = (e) => {
        setFirstName(e.target.value);
    };

      const onChangeAnsScore1 = (e) => {
        setchiefApprove(e.target.value);
      };
         const onChangeAnsScore2 = (e) => {
        setchiefDesc(e.target.value);
         };
       const onChangeAnsScore3 = (e) => {
        setSportScore(e.target.value);
       };
      const onChangeAnsScore4 = (e) => {
        setheight(e.target.value);
      };
        const onChangeAnsScore5 = (e) => {
        setweight(e.target.value);
        };
     const onChangeAnsScore6 = (e) => {
        setwaist(e.target.value);
     };
     const onChangeAnsScore7 = (e) => {
        setthigh(e.target.value);
      };




    return (
        <>
            {/* modal */}
            {/* <ButtonShowModel
                btnClassName={"btn btn-warning"}
                modelType={showModal}
                dataTargetID={"#userEdit"}
                spanIconClassName={"fas fa-solid fa-pen"}
                buttonName={"Засах"}
                clickHeaderOpenModal={clickHandlerAdminEditBtn}
            /> */}
            <div className="modal" id="userEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">НЭМЭХ</h4>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            {/* <div className="row">
                                <h5 style={{ color: "red" }}>
                                    * - Заавал бөглөх ёстой талбар
                                </h5>
                            </div> */}

                        <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Овог:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            // onChange={changeLastName}
                                            value={lastName}
                                           readOnly

                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">

                                                Нэр:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            // onChange={changeFirstName}
                                            value={firstName}
                                            readOnly

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Захирагчийн шийдвэр
                                            </span>

                                            </div>
                                          <select
                                            className="form-control"
                                            value={chiefApprove}
                                            onChange={onChangeAnsScore1}

                                                >
                                                    <option value="">
                                                        Сонгоно уу
                                                    </option>
                                                    <option value="1">
                                                     Зөвшөөрсөн
                                                    </option>
                                                    <option value="2">
                                                     Зөвшөөрөөгүй
                                                    </option>
                                                </select>
                                    </div>
                                </div>
                                  <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Биеийн тамирын оноо:
                                            </span>

                                        </div>
                                              <input
                                            className="form-control"
                                            value={SportScore}
                                            onChange={onChangeAnsScore3}
                                            />
                                    </div>
                                </div>
                            </div>

                                        {chiefDescVisible && (
                            <div className="row">
                                      <div className="col-md-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Захирагчийн шийдвэр зөвшөөрөөгүй бол тайлбар:
                                            </span>

                                        </div>
                                              <textarea
                                            className="form-control"
                                            value={chiefDesc}
                                            onChange={onChangeAnsScore2}
                                            />
                                    </div>
                                </div>
                            </div>
                                )}

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Өндөр:
                                            </span>

                                        </div>
                                              <input
                                            className="form-control"
                                            value={height}
                                            onChange={onChangeAnsScore4}
                                            />
                                    </div>
                                </div>

                                    <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Жин:
                                            </span>

                                        </div>
                                              <input
                                            className="form-control"
                                            value={weight}
                                            onChange={onChangeAnsScore5}
                                            />
                                    </div>
                                </div>
                            </div>

                            <div className="row">


                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                БТХ:
                                            </span>

                                        </div>
                                              <input
                                             className="form-control"
                                            value={waist}
                                            onChange={onChangeAnsScore6}
                                            />
                                    </div>
                                </div>

                                 <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                ТТХ:
                                            </span>

                                        </div>
                                              <input
                                                 className="form-control"
                                            value={thigh}
                                            onChange={onChangeAnsScore7}
                                            />
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveUser}
                            >
                                Нэмэх
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Хаах
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PkoMainUnitEdit;
