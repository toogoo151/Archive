import React, { useEffect, useState, CSSProperties } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import $ from "jquery";
import "./style2.css";

const HeltesDes = ({ getRowData1 }) => {
    const [isHide, setHide] = useState(false);
    const uniqueIds = [...new Set(getRowData1.map((el) => el.pkoHeltesDescID))];

    // const items = Array.isArray(getHeltesDes) ? getHeltesDes : [getHeltesDes];
    // const listItems = items
    //     .filter((item) => item.trim() !== "")
    //     .map((item, index) => <li key={`${index}-${item}`}>{item}</li>);

    // listItems.forEach((li) => console.log(li.props.children));
    // console.log(filteredData);

    // console.log(typeof getDesc, getDesc);

    return (
        <>
            <ButtonShowModel
                btnClassName={"btn btn-danger"}
                modelType={"modal"}
                dataTargetID={"#HeltesDes"}
                spanIconClassName={"fas fa-solid fa-exclamation"}
                buttonName={"Зөвшөөрөөгүй шалтгаан"}
            />
            <div className="modal" id="HeltesDes">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Зөвшөөрөөгүй хэсэг</h4>

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
                                <div className="col-md-6">
                                    <div>
                                        <h2>Шалтгаан:</h2>
                                        <h2>
                                            <ul>
                                                {uniqueIds.map((id, index) => {
                                                    const filteredData =
                                                        getRowData1.filter(
                                                            (el) =>
                                                                el.pkoHeltesDescID ===
                                                                id
                                                        );
                                                    return (
                                                        <li
                                                            key={`${id}-${index}`}
                                                        >
                                                            {
                                                                filteredData[0]
                                                                    .heltesDescription
                                                            }
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </h2>
                                    </div>
                                    {/* <p className="alerts">
                                        {errors.rankParentID?.message}
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeltesDes;
