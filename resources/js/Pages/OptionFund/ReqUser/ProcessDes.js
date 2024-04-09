import React, { useEffect, useState, CSSProperties } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../../AxiosUser";
import Swal from "sweetalert2";
import ButtonShowModel from "../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import $ from "jquery";
import "./style2.css";

// getDesc
const ProcessDes = ({ getRowData }) => {
    const [isHide, setHide] = useState(false);

    useEffect(() => {
        // console.log("**********************");
        // console.log(getDesc);
        // getDesc.map((el) => {
        //     console.log("============");
        //     console.log(el);
        //     console.log("============");
        // });
        // console.log("**********************");
        // const items = Array.isArray(getDesc) ? getDesc : [getDesc];
        // const listItems = items
        //     .filter((item) => item.trim() !== "")
        //     .map((item, index) => <li key={`${index}-${item}`}>{item}</li>);
        // setHide(true);
        // listItems.forEach((li) => console.log(li.props.children));
        // console.log(listItems);
    }, []);

    // console.log(typeof getDesc, getDesc);

    return (
        <>
            <ButtonShowModel
                btnClassName={"btn btn-danger"}
                modelType={"modal"}
                dataTargetID={"#ProcessDes"}
                spanIconClassName={"fas fa-solid fa-exclamation"}
                buttonName={"Буцаагдсан шалтгаан"}
            />
            <div className="modal" id="ProcessDes">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">Буцаагдсан хэсэг</h4>

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
                                        <h2>Шалтгаанууд:</h2>

                                        {/* <ul>{isHide && listItems}</ul> */}
                                        <h2>
                                            <ul>
                                                {getRowData
                                                    .slice()
                                                    .reverse()
                                                    .map((el, index) => (
                                                        <li
                                                            key={
                                                                el.pkoDocDescID
                                                            }
                                                            className={
                                                                index === 0
                                                                    ? "text-background"
                                                                    : ""
                                                            }
                                                        >
                                                            {el.docDescription}
                                                        </li>
                                                    ))}
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

export default ProcessDes;
