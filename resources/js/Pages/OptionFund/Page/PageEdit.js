import React, { useState, useRef, useEffect } from "react";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import CKEditor from "ckeditor4-react-advanced";

const PageEdit = (props) => {
    const [showModal, setShowModal] = useState("hide");
    const [title, settitle] = useState("");
    const [body, setbody] = useState("");

    useEffect(() => {
        settitle(props.changeDataRow.title);
        setbody(props.changeDataRow.body);
    }, [props.changeDataRow && props.getDataRowLenght > -1]);

    const clickHandlerEditBtn = () => {
        if (props.getDataRowLenght > -1) {
            settitle(props.changeDataRow.title);
            setbody(props.changeDataRow.body);
            setShowModal("modal");
        } else {
            setShowModal("");
            Swal.fire("Засах мөр дарж сонгоно уу!!!");
        }
    };
    const changelist = (e) => {
        settitle(e.target.value);
    };
    const changelist1 = (e) => {
        setbody(e.editor.getData());
    };

    const savePage = () => {
        axios
            .post("/edit/page", {
                id: props.changeDataRow.id,
                title: title,
                body: body,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                settitle("");
                setbody("");
                setShowModal("");
                props.refreshPage();
            });
    };
    return (
        <>
            {/* modal */}
            <ButtonShowModel
                btnClassName={"btn btn-warning"}
                modelType={showModal}
                dataTargetID={"#pageEdit"}
                spanIconClassName={"fas fa-solid fa-pen"}
                buttonName={"Засах"}
                clickHeaderOpenModal={clickHandlerEditBtn}
            />
            <div className="modal" id="pageEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Мэдээлэл засах хэсэг
                            </h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend float-left">
                                            <span
                                                className="input-group-text"
                                                style={{ width: "150px" }}
                                            >
                                                <span className="fas fa-solid fa-list"></span>{" "}
                                                Гарчиг:
                                            </span>
                                        </div>
                                        <input
                                            className="form-control"
                                            value={title}
                                            placeholder="Нэр..."
                                            onChange={changelist}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="input-group mb-3">
                                        <CKEditor
                                            data={body}
                                            // onChange={this.onEditorChange}
                                            filebrowserImageBrowseUrl="/laravel-filemanager?type=Images"
                                            filebrowserImageUploadUrl="/laravel-filemanager/upload?type=Images&_token="
                                            filebrowserBrowseUrl="/laravel-filemanager?type=Files"
                                            filebrowserUploadUrl="/laravel-filemanager/upload?type=Files&_token="
                                            onChange={changelist1}
                                            config={{
                                                // toolbar: [
                                                //     ["Bold", "Italic", "Underline", "Link", "Unlink", "Image"],
                                                //     [
                                                //       "NumberedList",
                                                //       "BulletedList",
                                                //       "list",
                                                //       "indent",
                                                //       "blocks",
                                                //       "Paragraph",
                                                //       "Mode",
                                                //       "Document",
                                                //       "alignments",
                                                //       "Table",
                                                //       "BackgroundColor",
                                                //       "tools",
                                                //       "styles"
                                                //     ]
                                                //   ],
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
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={savePage}
                            >
                                Засах
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

export default PageEdit;
