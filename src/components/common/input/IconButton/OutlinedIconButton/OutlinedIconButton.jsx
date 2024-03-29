import React from "react";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { IconSvg, BorderSvg, Container } from "./OutlinedIconButton.styles";

/**
 * OutlinedIconButton - A custom button component featuring an icon with an outline.
 * This component has interactive states like hover and tap, and it uses SVG for rendering the icon and its border.
 *
 * @param {Object} props - The component props.
 * @param {number} props.width - The width of the button (default: 35).
 * @param {number} props.height - The height of the button (default: 35).
 * @param {number} props.iconSize - The size of the icon (default: 20).
 * @param {number} props.borderWidth - The width of the border of the icon (default: 2).
 * @param {number} props.viewboxWidth - The width of the SVG viewBox.
 * @param {number} props.viewboxHeight - The height of the SVG viewBox.
 * @param {string[]} props.paths - The SVG path data for the icon.
 * @param {number} props.scale - The scale factor for the button (default: 1).
 * @returns {React.Component} A component that renders a styled icon button with hover and tap effects.
 */
function OutlinedIconButton({
    width,
    height,
    iconSize,
    borderWidth,
    viewboxWidth,
    viewboxHeight,
    paths,
    scale,
    ...props
}) {
    const [hovering, setHovering] = React.useState(false);

    const gradientID1 = React.useMemo(nanoid, []);
    const gradientID2 = React.useMemo(nanoid, []);

    scale = scale || 1;
    width = scale * (width || 35);
    height = scale * (height || 35);
    borderWidth = scale * (borderWidth || 2);
    iconSize = scale * (iconSize || 20);

    return (
        <Container
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            as={motion.div}
            width={width}
            height={height}
            {...props}>
            <BorderSvg viewBox={`0 0 ${width} ${height}`}>
                <defs>
                    <SvgLinearGradient gradientID={gradientID1} />
                </defs>
                <rect
                    x={borderWidth / 2}
                    y={borderWidth / 2}
                    width={width - borderWidth}
                    height={height - borderWidth}
                    rx="7"
                    fill={hovering ? "rgb(39, 46, 95)" : "none"}
                    stroke={`url(#${gradientID1})`}
                    strokeWidth={borderWidth}
                />
            </BorderSvg>
            <IconSvg
                iconSize={iconSize}
                borderWidth={borderWidth}
                viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <SvgLinearGradient gradientID={gradientID2} />
                </defs>
                {paths.map((path, i) => (
                    <path key={i} fill={`url(#${gradientID2})`} d={path}></path>
                ))}
            </IconSvg>
        </Container>
    );
}

export default OutlinedIconButton;
