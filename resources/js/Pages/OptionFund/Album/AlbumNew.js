import React, { useState, useRef, useEffect } from "react";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import axios from "../../../AxiosUser";
import "../../../components/Admin/general/AlertStyle.css";
import Swal from "sweetalert2";
import "react-dropdown-tree-select/dist/styles.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AlbumNew = (props) => {
    const [getImage, setimage] = useState(null);

    const newWindow = useRef(window);
    const openPicture1 = () => {
        newWindow.current = window.open(
            "/laravel-filemanager?type=Images",
            "/laravel-filemanager/upload?type=Images&_token=",
            "width=600,height=400,left=200,top=200"
        );
        window.SetUrl = (url, width, height, alt) => {
            setimage(url[0].url);
        };
    };

    const formSchema = Yup.object().shape({
        // image: Yup.string().required("Зураг оруулна уу."),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(formSchema),
    });

    const onSubmit = (data) => {
        axios
            .post("/new/album", {
                image: getImage,
            })
            .then((res) => {
                setimage(null);
                Swal.fire(res.data.msg);
                reset(
                    {
                        image: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
                props.refreshAlbum();
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    return (
        <>
            <ButtonShowModel
                btnClassName={"btn btn-success"}
                modelType={"modal"}
                dataTargetID={"#albumNew"}
                spanIconClassName={"fas fa-solid fa-plus"}
                buttonName={"Нэмэх"}
            />

            <div className="modal" id="albumNew">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Зураг нэмэх</h4>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <label
                                                className="btn btn-primary"
                                                onClick={openPicture1}
                                            >
                                                Зураг:
                                            </label>
                                        </div>

                                        <input
                                            {...register("image")}
                                            value={getImage}
                                            className="form-control"
                                            placeholder="Зураг..."
                                            disabled={true}
                                        />
                                    </div>
                                    <p className="alerts">
                                        {errors.image?.message}
                                    </p>
                                </div>
                            </div>

                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    data-dismiss=""
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AlbumNew;
