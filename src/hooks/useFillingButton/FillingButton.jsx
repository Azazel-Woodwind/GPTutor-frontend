import React from "react";
import { useTheme } from "styled-components";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";
import {
    Container,
    BorderSvg,
    IconSvg,
} from "@/components/common/input/IconButton/IconButton";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";

/**
 * A component for an animated filling button. This component is used by useFillingButton.js.
 * @see useFillingButton.js
 *
 * @param {object} props - Props for the FillingButton component.
 * @param {number} props.width - Width of the button.
 * @param {number} props.height - Height of the button.
 * @param {number} props.iconSize - Size of the icon inside the button.
 * @param {number} props.borderWidth - Width of the button's border.
 * @param {number} props.viewboxWidth - Width of the SVG viewBox.
 * @param {number} props.viewboxHeight - Height of the SVG viewBox.
 * @param {Array<string>} props.paths - SVG paths for the icon.
 * @param {number} props.scale - Scale factor for the button.
 * @param {boolean} props.disabled - Indicates if the button is disabled.
 * @param {string} props.fillColour - Colour used for filling animation.
 * @param {number} props.duration - Duration of the filling animation.
 * @param {boolean} props.recording - Indicates if recording is in progress.
 * @param {React.Ref} props.svgRef - Ref to the SVG element.
 * @param {React.Ref} props.fillAnimationRef1 - Ref to the first fill animation element.
 * @param {React.Ref} props.fillAnimationRef2 - Ref to the second fill animation element.
 * @param {Function} props.onAnimationEnd - Callback function when animation ends.
 * @param {React.Ref} props.resetAnimation1Ref - Ref to reset the first animation.
 * @param {React.Ref} props.resetAnimation2Ref - Ref to reset the second animation.
 * @param {Function} props.onClick - Click event handler.
 * @param {boolean} props.speaking - Indicates if speaking animation should be shown.
 * @param {object} props...rest - Other props.
 * @returns {React.ReactNode} The rendered FillingButton component.
 */
function FillingButton({
    width,
    height,
    iconSize,
    borderWidth,
    viewboxWidth,
    viewboxHeight,
    paths,
    scale,
    disabled,
    fillColour,
    duration,
    recording,
    svgRef,
    fillAnimationRef1,
    fillAnimationRef2,
    onAnimationEnd,
    resetAnimation1Ref,
    resetAnimation2Ref,
    onClick,
    speaking,
    ...props
}) {
    // console.log("disabled:", disabled);
    if (disabled !== true) {
        props = {
            ...props,
            whileFocus: { scale: 1.1, transition: { duration: 0.2 } },
            whileHover: { scale: 1.1, transition: { duration: 0.2 } },
            whileTap: { scale: 0.95 },
        };
    }

    const theme = useTheme();
    const [hovering, setHovering] = React.useState(false);
    const [animating, setAnimating] = React.useState(false);
    const gradientID1 = React.useMemo(nanoid, []);
    const gradientID2 = React.useMemo(nanoid, []);
    const gradientID3 = React.useMemo(nanoid, []);

    scale = scale || 1;
    width = scale * (width || 35);
    height = scale * (height || 35);
    borderWidth = scale * (borderWidth || 2);
    iconSize = scale * (iconSize || 20);
    duration = duration || 10;

    React.useEffect(() => {
        fillAnimationRef2.current.onend = e => {
            setAnimating(false);
            resetAnimation1Ref.current.beginElement();
            resetAnimation2Ref.current.beginElement();
            onAnimationEnd();
        };

        fillAnimationRef2.current.onbegin = () => {
            setAnimating(true);
        };
    }, []);

    return (
        <Container
            onMouseEnter={() => {
                setHovering(true);
            }}
            onMouseLeave={() => {
                setHovering(false);
            }}
            as={motion.div}
            width={width}
            height={height}
            disabled={disabled}
            {...props}
            onClick={disabled ? undefined : onClick}>
            <BorderSvg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
                <defs>
                    <SvgLinearGradient gradientID={gradientID1} />
                    <linearGradient x2="0%" y1="100%" y2="0%" id={gradientID3}>
                        <stop offset="0" stopColor={`${theme.colours.glow}`}>
                            <animate
                                ref={fillAnimationRef1}
                                dur={`${duration}s`}
                                attributeName="offset"
                                attributeType="XML"
                                fill="freeze"
                                from="0"
                                to="1"
                                begin="indefinite"
                                restart="always"
                            />
                            <set
                                ref={resetAnimation1Ref}
                                attributeName="offset"
                                to="0"></set>
                        </stop>
                        <stop
                            offset="0"
                            stopColor={
                                hovering && !animating && !disabled
                                    ? "rgb(39, 46, 95)"
                                    : "none"
                            }
                            stopOpacity={hovering ? "1" : "0"}>
                            <animate
                                ref={fillAnimationRef2}
                                dur={`${duration}s`}
                                attributeName="offset"
                                attributeType="XML"
                                fill="freeze"
                                from="0"
                                to="1"
                                begin="indefinite"
                                // repeatCount="2"
                                restart="always"
                            />
                            <set
                                ref={resetAnimation2Ref}
                                attributeName="offset"
                                to="0"></set>
                        </stop>
                    </linearGradient>
                </defs>
                <rect
                    x={borderWidth / 2}
                    y={borderWidth / 2}
                    width={width - borderWidth}
                    height={height - borderWidth}
                    rx="7"
                    // fill="rgb(39, 46, 95)"
                    fill={`url(#${gradientID3})`}
                    stroke={disabled ? "gray" : `url(#${gradientID1})`}
                    strokeWidth={borderWidth}
                />
            </BorderSvg>
            <IconSvg
                iconSize={iconSize}
                borderWidth={borderWidth}
                viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
                focusable="false"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <SvgLinearGradient gradientID={gradientID2} />
                </defs>
                {paths.map((path, i) => (
                    <path
                        key={i}
                        fill={
                            disabled
                                ? "gray"
                                : animating
                                ? speaking
                                    ? theme.colours.error
                                    : `${theme.colours.primary}EF`
                                : `url(#${gradientID2})`
                        }
                        d={path}></path>
                ))}
            </IconSvg>
        </Container>
    );
}

export default FillingButton;
