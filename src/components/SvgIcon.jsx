import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import SvgLinearGradient from "./SvgLinearGradient";

const SvgIconStyle = styled.svg``;

function SvgIcon({ children, className, svgData, fill, size, ...props }) {
    const gradientID = React.useMemo(nanoid, []);

    // 🗿
    // 🗿
    // 🗿
    // 🗿

    return (
        <SvgIconStyle
            className={className}
            viewBox={`0 0 ${svgData.viewboxWidth} ${svgData.viewboxHeight}`}
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            width={size || "30px"}
            height={size || "30px"}
            style={{
                minWidth: size || "30px",
                minHeight: size || "30px",
            }}
            {...props}>
            <defs>
                <SvgLinearGradient gradientID={gradientID} />
            </defs>
            {svgData.paths.map((path, i) => (
                <path
                    key={path}
                    fill={fill === "gradient" ? `url(#${gradientID})` : fill}
                    d={path}></path>
            ))}
            {children}
        </SvgIconStyle>
    );
}

export default SvgIcon;
