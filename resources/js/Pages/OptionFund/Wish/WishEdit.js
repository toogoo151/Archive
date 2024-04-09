import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "../../../AxiosUser";
import { AppContext } from "../../../Context/MyContext";

const WishEdit = (props) => {
    const state = useContext(AppContext);
    const [showModal, setShowModal] = useState("");

    const [insideApprove, setInsideApprove] = useState("");
    const [declineDescription, setDeclineDescription] = useState("");

    const [getDataRow, setDataRow] = useState([]);

    useEffect(() => {
        setDataRow(props.changeDataRow);
    }, [props.changeDataRow]);

    useEffect(() => {
        if (props.isEditBtnClick) {
            setInsideApprove(props.changeDataRow.insideApprove);
            setDeclineDescription(props.changeDataRow.declineDescription);
        }
    }, [props.isEditBtnClick]);

    const saveWish = () => {
        if (insideApprove == "" || insideApprove == null) {
            Swal.fire("Зөвшөөрсөн эсэхийг оруулна уу.");
            return;
        }
        if (insideApprove == 2) {
            if (declineDescription == "" || declineDescription == null) {
                Swal.fire("Татгалзсан шалтгаан оруулна уу.");
                return;
            }
        }

        axios
            .post("/edit/wish", {
                id: props.changeDataRow.id,
                insideApprove: insideApprove,
                declineDescription: declineDescription,
            })
            .then((res) => {
                Swal.fire(res.data.msg);
                setInsideApprove("-1");
                setDeclineDescription("");
                setShowModal("");
                props.refreshWish(
                    state.getMissionRowID,
                    state.getEeljRowID,
                    props.getIsApprove,
                    props.getComandlalID,
                    props.getUnitID
                );
            })
            .catch((err) => {
                Swal.fire(err.response.data.msg);
            });
    };

    const changeIsApprove = (e) => {
        setInsideApprove(e.target.value);
    };

    const changeDeclineDes = (e) => {
        setDeclineDescription(e.target.value);
    };
    return (
        <>
            <div className="modal" id="wishEdit">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">ХҮСЭЛТ ШИЙДВЭРЛЭХ</h4>

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
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            Зөвшөөрсөн эсэх:
                                        </span>
                                    </div>
                                    <select
                                        className="form-control"
                                        onChange={changeIsApprove}
                                        value={insideApprove}
                                    >
                                        <option value="-1">Сонгоно уу</option>
                                        <option value="1">
                                            Шаардлага хангасан
                                        </option>
                                        <option value="2">
                                            Шаардлага хангаагүй
                                        </option>
                                        <option value="4">
                                            Боломжтой нөөц
                                        </option>
                                    </select>
                                </div>
                            </div>
                            {insideApprove == 2 && (
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">
                                                Татгалзсан шалтгаан:
                                            </span>
                                        </div>
                                        <textarea
                                            className="form-control"
                                            onChange={changeDeclineDes}
                                            value={declineDescription}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss=""
                                onClick={saveWish}
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

export default WishEdit;
