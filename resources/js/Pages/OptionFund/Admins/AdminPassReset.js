import React, { useState } from "react";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AlertSuccess from "../../../components/Admin/general/Alert/AlertSuccess";
import AlertError from "../../../components/Admin/general/Alert/AlertError";
import axios from "../../../AxiosUser";

const AdminPassReset = (props) => {
    const [changeModalType, setchangeModalType] = useState(null);
    const [getUserId, setgetUserId] = useState(null);
    const [toggle1, setToggle1] = useState(false);
    const [sendMsg, setsendMsg] = useState(null);
    const [sendMsgErr, setsendMsgErr] = useState(null);

    const clickHandlerResetPassBtn = () => {
        if (props.getDataRowLenght > -1) {
            setgetUserId(props.changeDataRow.id);
            setchangeModalType("modal");
        } else {
            if (props.getDataRowLenght < 1 || props.getDataRowLenght === 0) {
                Swal.fire("Та ПИН КОД СОЛИХ хэрэглэгч сонгоно уу!!!");
                setchangeModalType("");
                return;
            }
            if (props.getDataRowLenght > 1) {
                Swal.fire("Та 1 хэрэглэгч сонгоно уу!!!");
                setchangeModalType("");
                return;
            }
        }
    };
    const formSchema = Yup.object().shape({
        pinCode: Yup.string()
            .required("Пин код оруулах шаардлагатай")
            .min(4, "Пин код хамгийн багадаа 4 тэмдэгт байх ёстой.")
            .max(4, "Пин код 4 тэмдэгтээс илүү байж болохгүй"),
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

    const onSubmit = (data) => {
        axios
            .post("/reset/password", {
                _token: document.querySelector('meta[name="csrf-token"]')
                    .content,
                id: getUserId,
                pinCode: data.pinCode,
            })
            .then((response) => {
                setsendMsg(response.data.msg);
                reset(
                    {
                        pinCode: "",
                    },
                    {
                        keepIsSubmitted: false,
                        keepTouched: false,
                        keepIsValid: false,
                        keepSubmitCount: false,
                    }
                );
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    localStorage.clear();
                    window.location.href = "/login";
                }
                setsendMsgErr(err.response.data.msg);
            });
    };
    return (
        <>
            <ButtonShowModel
                btnClassName={"btn btn-info"}
                modelType={changeModalType}
                dataTargetID={"#adminResetPassword"}
                spanIconClassName={"fas fa-solid fa-key"}
                buttonName={"Пин код солих"}
                clickHeaderOpenModal={clickHandlerResetPassBtn}
            />
            <div className="modal" id="adminResetPassword">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Хэрэглэгчийн пин код солих
                            </h4>

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
                                    <div className="col-md-3 float-righ">
                                        <label className="float-righ">
                                            Пин код:
                                        </label>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <i
                                                        id="showpass"
                                                        className="fa fa-eye icon"
                                                        onClick={() => {
                                                            setToggle1(
                                                                !toggle1
                                                            );
                                                        }}
                                                    />
                                                </span>
                                            </div>

                                            <input
                                                maxLength={4}
                                                type={
                                                    toggle1 ? "text" : "pinCode"
                                                }
                                                className="form-control"
                                                placeholder="Пин код"
                                                {...register("pinCode")}
                                            />
                                        </div>
                                        <p className="alerts">
                                            {errors.pinCode?.message}
                                        </p>
                                    </div>
                                </div>

                                {sendMsg && <AlertSuccess msg={sendMsg} />}
                                {sendMsgErr && <AlertError msg={sendMsgErr} />}
                            </div>

                            {/* Modal footer */}
                            <div className="modal-footer">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    data-dismiss=""
                                    // onClick={clickNewAdmin}
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

export default AdminPassReset;
