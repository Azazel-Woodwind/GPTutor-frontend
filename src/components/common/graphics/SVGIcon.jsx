import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";

const SVGIconStyle = styled.svg``;

function SVGIcon({ children, className, svgData, fill, size, ...props }) {
    const gradientID = React.useMemo(nanoid, []);

    // 🗿
    // 🗿
    // 🗿
    // 🗿

    return (
        <SVGIconStyle
            className={className}
            viewBox={`0 0 ${svgData.viewboxWidth} ${svgData.viewboxHeight}`}
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            width={size || "1.875rem"}
            height={size || "1.875rem"}
            style={{
                minWidth: size || "1.875rem",
                minHeight: size || "1.875rem",
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
        </SVGIconStyle>
    );
}

export default SVGIcon;
