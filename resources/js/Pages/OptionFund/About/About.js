import React, { useEffect, useState } from "react";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import CKEditor from "ckeditor4-react-advanced";

// import ClassicEditor from "ckeditor4-build-classic";

const About = (props) => {
    const [getAbouts, setAbouts] = useState([]);
    const [getBodys, setBodys] = useState([]);
    const [title, settitle] = useState("");
    const [body, setbody] = useState("");

    useEffect(() => {
        axios
            .get("/get/abouts")
            .then((res) => {
                setAbouts(res.data[0].title);
                setBodys(res.data[0].body);
                // console.log(res.data[0].title);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    //     console.log(props.changeDataRow);
    //     settitle(props.changeDataRow.title);
    //     setbody(props.changeDataRow.body);
    // }, [props.changeDataRow && props.getDataRowLenght > -1]);

    const onChangetitle = (e) => {
        settitle(e.editor.getData());
        // settitle(e.target.value);
    };

    const changelist1 = (e) => {
        setbody(e.editor.getData());
    };
    const save = () => {
        if (title == "" || title == null) {
            Swal.fire("Гарчиг оруулна уу!!!");
            return;
        }
        if (body == "" || body == null) {
            Swal.fire("Мэдээлэл оруулна уу!!!");
            return;
        }
        axios
            .post("/edit/about", {
                title: title,
                body: body,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                settitle("");
                setbody("");
            });
    };

    return (
        <>
            <>
                <div className="row">
                    <div className="info-box">
                        <div className="container mt-5">
                            <h1 className="text-center"> Бидний тухай</h1>
                            <br />
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Гарчиг:
                                        </span>
                                    </div>
                                </div>
                                <CKEditor
                                    data={getAbouts}
                                    // onChange={this.onEditorChange}
                                    filebrowserImageBrowseUrl="/laravel-filemanager?type=Images"
                                    filebrowserImageUploadUrl="/laravel-filemanager/upload?type=Images&_token="
                                    filebrowserBrowseUrl="/laravel-filemanager?type=Files"
                                    filebrowserUploadUrl="/laravel-filemanager/upload?type=Files&_token="
                                    onChange={onChangetitle}
                                    config={{
                                        toolbar: [
                                            ["Bold", "Italic", "Underline"],
                                            [
                                                "NumberedList",
                                                "BulletedList",
                                                "list",
                                                "indent",
                                                "blocks",
                                                "Paragraph",
                                                "Mode",
                                                "Document",
                                                "alignments",
                                                "Table",
                                                "BackgroundColor",
                                                "tools",
                                                "styles",
                                            ],
                                        ],
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

                                {/* <CKEditor
                                        data={getAbouts}
                                        filebrowserImageBrowseUrl="/laravel-filemanager?type=Images"
                                        filebrowserImageUploadUrl="/laravel-filemanager/upload?type=Images&_token="
                                        filebrowserBrowseUrl="/laravel-filemanager?type=Files"
                                        filebrowserUploadUrl="/laravel-filemanager/upload?type=Files&_token="
                                        onChange={onChangetitle}
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
                                    /> */}
                                {/* <input
                                        value={getAbouts}
                                        className="form-control"
                                        placeholder="Гарчиг..."
                                        onChange={onChangetitle}
                                    /> */}
                            </div>
                            <br />
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Агуулга:
                                        </span>
                                    </div>
                                    <CKEditor
                                        data={getBodys}
                                        filebrowserImageBrowseUrl="/laravel-filemanager?type=Images"
                                        filebrowserImageUploadUrl="/laravel-filemanager/upload?type=Images&_token="
                                        filebrowserBrowseUrl="/laravel-filemanager?type=Files"
                                        filebrowserUploadUrl="/laravel-filemanager/upload?type=Files&_token="
                                        onChange={changelist1}
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
                            <div className="col-md-6">
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={save}
                                >
                                    Засах
                                </button>
                            </div>
                            <br /> <br />
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default About;
