import React, { useState, useRef, useEffect } from "react";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../AxiosUser";
import "../../../components/Admin/general/AlertStyle.css";
import AlertSuccess from "../../../components/Admin/general/Alert/AlertSuccess";
import AlertError from "../../../components/Admin/general/Alert/AlertError";
import Swal from "sweetalert2";
import "react-dropdown-tree-select/dist/styles.css";
import { connect } from "react-redux";
// import { CKEditor } from 'ckeditor4-react';
import CKEditor from "ckeditor4-react-advanced";

const AnnouncementNew = (props) => {
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [sendMsg, setsendMsg] = useState(null);
    const [RecommendationName, setRecMain] = useState(null);
    const [getSendUser, setSendUser] = useState([]);
    const [show, setShow] = useState("");

    const [sendMsgErr, setsendMsgErr] = useState(null);
    //    useEffect(() => {
    //     axios
    //         .get("/send/user")
    //         .then((res) => {
    //             setSendUser(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    const formSchema = Yup.object().shape({
        // question: Yup.string().required("Асуулт  оруулна уу."),
        // ans1score: Yup.string().typeError('Хариулт1 оноо оруулах шаардлагатай!'),
        // ans2score: Yup.string().typeError('Хариулт2 оноо оруулна шаардлагатай!'),
        // ans3score: Yup.string().typeError('Хариулт3 оноо оруулах шаардлагатай!'),
        // ans4score: Yup.string().typeError('Хариулт4 оноо оруулах шаардлагатай!'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        getValues,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
    });
    // const changeComment = (e) => {
    //     setComment(e.target.value);
    // };
    // const onEditorStateChange = (editor) => {
    //     setComment(editor.editor.getData());
    // };

    // const changeanswer1 = (e) => {
    //     setComment(e.target.value);
    // };

    const onEditorStateChange1 = (editor) => {
        setRecMain(editor.editor.getData());
    };
    const changePush = (e) => {
        setShow(e.target.value);
    };

    const onSubmit = (data) => {
        // axios
        //     .post("/new/answer", {
        //         question: data.question,
        //         answer1: data.answer1,
        //         answer2: data.answer2,
        //         answer3: data.answer3,
        //         answer4: data.answer4,
        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //         // setsendMsg(res.data.msg);
        //         Swal.fire(res.data.msg);
        //         reset(
        //             {
        //                 question: "",
        //                 answer1: "",
        //                 answer2: "",
        //                 answer3: "",
        //                 answer4: "",
        //             },
        //             {
        //                 // keepErrors: true,
        //                 // keepDirty: true,
        //                 keepIsSubmitted: false,
        //                 keepTouched: false,
        //                 keepIsValid: false,
        //                 keepSubmitCount: false,
        //             }
        //         );
        //         props.refreshAnswer();
        //     })
        //     .catch((err) => {
        //         setsendMsgErr(err.response.data.msg);
        //         console.log(err);
        //     });
    };
    const addBtn = () => {
        if (RecommendationName == "" || RecommendationName == null) {
            alert("Зарлалаа оруулна уу!!!!!");
            return;
        }

        // if(ans1score =="" || ans1score==null){
        //     alert("Хариулт1 оноо оруулна уу!!!");
        //     return
        // }
        // if(ans2score =="" || ans2score==null){
        //     alert("Хариулт2 оноо оруулна уу!!!");
        //     return
        // }

        axios
            .post("/new/announcement", {
                RecommendationName: RecommendationName,
                show: show,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setShow(null);
                setRecMain(null);
                props.refreshAnnouncement();
            })
            .catch((err) => {
                setsendMsgErr(err.response.data.msg);
            });
    };

    return (
        <>
            <ButtonShowModel
                btnClassName={"btn btn-success"}
                modelType={"modal"}
                dataTargetID={"#recNew"}
                spanIconClassName={"fas fa-solid fa-plus"}
                buttonName={"Нэмэх"}
            />

            <div className="modal" id="recNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Зарлал нэмэх</h4>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>
                        {/* Modal body */}
                        {/* onSubmit={handleSubmit(onSubmit)} */}

                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">
                                            Зөвшөөрөх товч:
                                        </span>
                                        <select
                                            className="form-control"
                                            onChange={changePush}
                                            value={show}
                                        >
                                            <option value="0">
                                                Сонгоно уу!!!
                                            </option>
                                            <option value="1">Гадна</option>
                                            <option value="2">Дотор</option>
                                            <option value="3">Бүгд</option>
                                        </select>
                                    </div>
                                </div>




                                <div className="col-md-9">
                                    <div className="input-group mb-3">
                                        <CKEditor
                                            data={RecommendationName}
                                            // onChange={this.onEditorChange}
                                            filebrowserImageBrowseUrl="/laravel-filemanager?type=Images"
                                            filebrowserImageUploadUrl="/laravel-filemanager/upload?type=Images&_token="
                                            filebrowserBrowseUrl="/laravel-filemanager?type=Files"
                                            filebrowserUploadUrl="/laravel-filemanager/upload?type=Files&_token="
                                            onChange={onEditorStateChange1}
                                            config={{
                                                filebrowserImageBrowseUrl:
                                                    "/laravel-filemanager?type=Images",
                                                filebrowserImageUploadUrl:
                                                    "/laravel-filemanager/upload?type=Images&_token=",
                                                filebrowserBrowseUrl:
                                                    "/laravel-filemanager?type=Files",
                                                filebrowserUploadUrl:
                                                    "/laravel-filemanager/upload?type=Files&_token=",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {sendMsg && <AlertSuccess msg={sendMsg} />}

                            {sendMsgErr && <AlertError msg={sendMsgErr} />}
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            {/* <button
                                    type="submit"
                                    className="btn btn-success"
                                    data-dismiss=""

                                >
                                    Нэмэх
                                </button> */}

                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={addBtn}
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

export default AnnouncementNew;
