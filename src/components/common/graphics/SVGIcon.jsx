import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";

const SVGIconStyle = styled.svg``;

/**
 * SVGIcon - A component for rendering SVG icons with optional customization.
 * It supports linear gradients and allows customization of size and fill color.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} [props.children] - Children elements to be rendered inside the SVG.
 * @param {string} [props.className] - Additional CSS class for styling.
 * @param {Object} props.svgData - Data for the SVG paths and viewbox dimensions.
 * @param {string} [props.fill] - The fill color of the SVG. Can be a color string or 'gradient' to use a linear gradient.
 * @param {string|number} [props.size="1.875rem"] - Size of the SVG icon.
 * @returns {React.Component} An SVG icon component with customizable features.
 */
function SVGIcon({
    children,
    className,
    svgData,
    fill,
    size = "1.875rem",
    ...props
}) {
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
            width={size}
            height={size}
            style={{
                minWidth: size,
                minHeight: size,
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
