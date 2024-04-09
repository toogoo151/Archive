import React from "react";
import ButtonShowModel from "../../../../components/Admin/general/ButtonShowModel/ButtonShowModel";
import Swal from "sweetalert2";
import axios from "../../../../AxiosUser";

const UnitDelete = (props) => {
    const clickHandlerDeleteBtn = () => {
        if (props.getDataRowLenght > -1) {
            swal.fire({
                title: "Та устгахдаа итгэлтэй байна уу?",
                showCancelButton: true,
                confirmButtonText: `Тийм`,
                cancelButtonText: `Үгүй`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .post("/delete/unit", {
                            id: props.changeDataRow.id,
                        })
                        .then((res) => {
                            Swal.fire(res.data.msg);
                            props.refreshUnit();
                        })
                        .catch((err) => {
                            Swal.fire(err.response.data.msg);
                        });
                } else if (result.isDenied) {
                    // Swal.fire("Changes are not saved", "", "info");
                }
            });
        } else {
            Swal.fire("Устгах мөр сонгоно уу");
        }
    };
    return (
        <>
            <ButtonShowModel
                btnClassName={"btn btn-danger"}
                dataTargetID={""}
                spanIconClassName={"fas fa-solid fa-trash"}
                buttonName={"Устгах"}
                clickHeaderOpenModal={clickHandlerDeleteBtn}
            />
        </>
    );
};

export default UnitDelete;
