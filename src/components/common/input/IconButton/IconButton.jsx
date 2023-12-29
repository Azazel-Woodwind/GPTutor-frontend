import React from "react";
import BasicIconButton from "./BasicIconButton";
import OutlinedIconButton from "./OutlinedIconButton";

function IconButton(props) {
    const extraProps = props.disabled
        ? {
              onClick: undefined,
          }
        : {
              whileFocus: { scale: 1.1, transition: { duration: 0.2 } },
              whileHover: { scale: 1.1, transition: { duration: 0.2 } },
              whileTap: { scale: 0.95 },
          };

    if (props.outline) {
        return <OutlinedIconButton {...props} {...extraProps} />;
    }

    return <BasicIconButton {...props} {...extraProps} />;
}

export default IconButton;
