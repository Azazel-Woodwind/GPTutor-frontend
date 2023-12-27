import React from "react";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";
import { OutlinedButtonStyle, SvgBorder } from "./styles";
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

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setButtonWidth(entry.contentRect.width);
                setButtonHeight(entry.contentRect.height);
            }
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
            paddingY={paddingY}
            paddingX={paddingX}
            borderWidth={borderWidth}
            {...otherProps}
            as={motion.div}
            style={{ margin: `${borderWidth}px` }}>
            <SvgBorder viewBox={`0 0 ${buttonWidth || 0} ${buttonHeight || 0}`}>
                <defs>
                    <SvgLinearGradient gradientID={borderGradientID} />
                </defs>
                <rect
                    x={0}
                    y={0}
                    width={buttonWidth || 0}
                    height={buttonHeight || 0}
                    rx="10"
                    fill={hovering ? "rgb(39, 46, 95)" : "none"}
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
