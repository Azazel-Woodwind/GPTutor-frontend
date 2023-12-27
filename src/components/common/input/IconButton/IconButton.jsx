import React from "react";
import BasicIconButton from "./BasicIconButton";
import OutlinedIconButton from "./OutlinedIconButton";

function IconButton(props) {
    if (props.outline) {
        return <OutlinedIconButton {...props} />;
    }

    return <BasicIconButton {...props} />;
}

export default IconButton;
