import React from "react";
import FillingButton from "./FillingButton";

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

        props.onAnimationStart?.();
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
        props.onAnimationEnd?.();
    };

    return {
        Component: FillingButton,
        ComponentProps: {
            svgRef,
            fillAnimationRef1,
            fillAnimationRef2,
            onAnimationEnd,
            resetAnimation1Ref,
            resetAnimation2Ref,
        },
        startAnimation,
        pauseAnimation,
        resumeAnimation,
        stopAnimation,
        filling,
        paused,
    };
}

export default useFillingButton;
