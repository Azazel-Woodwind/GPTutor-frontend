import React from "react";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";
import {
    ButtonText,
    OutlinedButtonStyle,
    SvgBorder,
} from "./OutlinedButton.styles";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";

/**
 * OutlinedButton - A button component with an outlined style.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.disabled - If true, the button is disabled.
 * @param {number} props.paddingY - Vertical padding of the button.
 * @param {number} props.paddingX - Horizontal padding of the button.
 * @param {number} props.borderWidth - Width of the border.
 * @param {number} props.viewboxWidth - Width of the SVG viewbox.
 * @param {number} props.viewboxHeight - Height of the SVG viewbox.
 * @param {Array} props.paths - SVG path data for icons.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @returns {React.Component} - A styled outlined button component.
 */
function OutlinedButton({
    disabled = false,
    paddingY = 0.8,
    paddingX = 1.5,
    borderWidth = 3,
    viewboxWidth,
    viewboxHeight,
    paths,
    children,
    ...otherProps
}) {
    const [hovering, setHovering] = React.useState(false);
    const [buttonWidth, setButtonWidth] = React.useState(undefined);
    const [buttonHeight, setButtonHeight] = React.useState(undefined);

    const containerRef = React.useRef(null);
    const borderGradientID = React.useRef(nanoid()).current;
    const iconGradientID = React.useRef(nanoid()).current;
    // const borderGradientID = React.useMemo(nanoid, []);
    // const iconGradientID = React.useMemo(nanoid, []);

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setButtonHeight(containerRef?.current?.offsetHeight);
            setButtonWidth(containerRef?.current?.offsetWidth);
            // for (let entry of entries) {
            //     setButtonHeight(containerRef?.current?.offsetHeight);
            //     setButtonWidth(containerRef?.current?.offsetWidth);
            //     // setButtonWidth(entry.contentRect.width);
            //     // setButtonHeight(entry.contentRect.height);
            // }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <OutlinedButtonStyle
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            ref={containerRef}
            disabled={disabled}
            {...otherProps}
            style={{
                padding: `${paddingY}rem ${paddingX}rem`,
                margin: `${borderWidth}px`,
                ...otherProps.style,
            }}>
            <SvgBorder>
                <defs>
                    <SvgLinearGradient gradientID={borderGradientID} />
                </defs>
                <rect
                    x={0}
                    y={0}
                    width={buttonWidth || 0}
                    height={buttonHeight || 0}
                    rx="10"
                    fill={
                        disabled
                            ? "rgb(0, 0, 0, 0.1)"
                            : hovering
                            ? "rgb(39, 46, 95)"
                            : "none"
                    }
                    stroke={disabled ? "gray" : `url(#${borderGradientID})`}
                    strokeWidth={borderWidth}
                />
            </SvgBorder>
            {viewboxWidth && viewboxHeight && paths ? (
                <IconSvg
                    viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <SvgLinearGradient gradientID={iconGradientID} />
                    </defs>
                    {paths.map((path, i) => (
                        <path
                            key={i}
                            fill={`url(#${iconGradientID})`}
                            d={path}></path>
                    ))}
                </IconSvg>
            ) : (
                <ButtonText disabled={disabled}>{children}</ButtonText>
            )}
        </OutlinedButtonStyle>
    );
}

export default OutlinedButton;
