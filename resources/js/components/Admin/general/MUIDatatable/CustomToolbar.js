import React from "react";
import Tooltip from "@mui/material/Tooltip";
import ExcelIcon from "@mui/icons-material/CloudDownload";
import { withStyles } from "tss-react/mui";
import { CSVLink } from "react-csv";
import MUIButtonShowModel from "../ButtonShowModel/MUIButtonShowModel";
import { Typography } from "@mui/material";
const defaultToolbarStyles = {
    iconButton: {},
};

class CustomToolbar extends React.Component {
    constructor(props, ref) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                {this.props.isHideInsert && (
                    <div className="col-md-2 col-ms-6">
                        <React.Fragment>
                            <Tooltip title={"custom icon"}>
                                <>
                                    <MUIButtonShowModel
                                        btnClassName={this.props.btnClassName}
                                        modelType={this.props.modelType}
                                        dataTargetID={this.props.dataTargetID}
                                        spanIconClassName={
                                            this.props.spanIconClassName
                                        }
                                        buttonName={this.props.buttonName}
                                        clickHeaderOpenModal={
                                            this.props.btnInsert
                                        }
                                    />
                                </>
                            </Tooltip>
                        </React.Fragment>
                    </div>
                )}
                <div
                    className="col-md-1 col-ms-6 text-left"
                    style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                    }}
                >
                    <CSVLink
                        data={this.props.excelDownloadData}
                        headers={this.props.excelHeaders}
                        title="Excel файл татах"
                    >
                        <ExcelIcon
                            style={{
                                color: "white",
                                width: 40,
                                height: 40,
                            }}
                        ></ExcelIcon>
                    </CSVLink>
                </div>
                {/* Header title shuuu */}
                <div
                    className="col-md-9 col-ms-7 text-left"
                    style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        sx={{ flex: "1 1 100%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {this.props.title}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(CustomToolbar, defaultToolbarStyles, {
    name: "CustomToolbar",
});
