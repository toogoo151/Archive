import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem(props) {
    return (
        <li className="nav-item">
            <Link
                to={props.url}
                className="nav-link"
                style={{ color: "#FFFFFF" }}
            >
                <i className={props.icon} />
                {props.menuName}
            </Link>
        </li>
    );
}
