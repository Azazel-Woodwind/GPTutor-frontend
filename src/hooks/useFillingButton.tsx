import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React from "react";
import styled, { useTheme } from "styled-components";
import SvgLinearGradient from "../components/SvgLinearGradient";
import { Container, BorderSvg, IconSvg } from "../components/IconButton";

const FillingButton =
    ({
        svgRef,
        fillAnimationRef1,
        fillAnimationRef2,
        onAnimationEnd,
        resetAnimation1Ref,
        resetAnimation2Ref,
    }) =>
    ({
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
        ...props
    }) => {
        if (disabled !== false) {
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
                {...props}>
                <BorderSvg ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
                    <defs>
                        <SvgLinearGradient gradientID={gradientID1} />
                        <linearGradient
                            x2="0%"
                            y1="100%"
                            y2="0%"
                            id={gradientID3}>
                            <stop
                                offset="0"
                                stopColor={`${theme.colours.glow}`}>
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
                                    hovering && !animating
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
                        stroke={`url(#${gradientID1})`}
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
                                animating
                                    ? theme.colours.secondary
                                    : `url(#${gradientID2})`
                            }
                            d={path}></path>
                    ))}
                </IconSvg>
            </Container>
        );
    };

function useFillingButton(props) {
    const [filling, setFilling] = React.useState(false);
    const [paused, setPaused] = React.useState(false);

    const fillAnimationRef1 = React.useRef();
    const fillAnimationRef2 = React.useRef();
    const resetAnimation1Ref = React.useRef();
    const resetAnimation2Ref = React.useRef();
    const svgRef = React.useRef();

    const startAnimation = () => {
        console.log("ANIMATION STARTED");

        fillAnimationRef1.current.beginElement();
        fillAnimationRef2.current.beginElement();
        setFilling(true);
        setPaused(false);

        props.onAnimationStart && props.onAnimationStart();
    };

    const pauseAnimation = () => {
        console.log("ANIMATION PAUSED");
        svgRef.current.pauseAnimations();
        svgRef.current.pauseAnimations();
        setPaused(true);
    };

    const resumeAnimation = () => {
        console.log("ANIMATION RESUMED");

        svgRef.current.unpauseAnimations();
        svgRef.current.unpauseAnimations();
        setPaused(false);
    };

    const stopAnimation = () => {
        fillAnimationRef1.current.endElement();
        fillAnimationRef2.current.endElement();
    };

    const onAnimationEnd = () => {
        setFilling(false);
        setPaused(false);
        props.onAnimationEnd && props.onAnimationEnd();
    };

    const Component = React.useMemo(
        () =>
            FillingButton({
                svgRef,
                fillAnimationRef1,
                fillAnimationRef2,
                onAnimationEnd,
                resetAnimation1Ref,
                resetAnimation2Ref,
            }),
        []
    );

    return {
        Component,
        startAnimation,
        pauseAnimation,
        resumeAnimation,
        stopAnimation,
        filling,
        paused,
    };
}

export default useFillingButton;
