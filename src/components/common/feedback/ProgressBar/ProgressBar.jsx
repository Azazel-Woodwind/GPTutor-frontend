import React from "react";
import { useTheme } from "styled-components";
import {
    useMotionValue,
    animate,
    useTransform,
    useAnimation,
} from "framer-motion";
import TextWrapper from "@/components/utils/TextWrapper";
import {
    Container,
    ProgressContainer,
    Progress,
    UnfilledProgress,
    Stop,
    Label,
} from "./ProgressBar.styles";

/**
 * ProgressBar - A component for displaying a progress bar with customizable features like stops, labels, and animation.
 * It supports both linear and time-based progress, with options for pausing on hover and reversing direction.
 *
 * @param {Object} props - The component props.
 * @param {number} props.value - The current value of the progress bar.
 * @param {number} props.max - The maximum value of the progress bar.
 * @param {Array} [props.stops=[]] - An array of stops for the progress bar, each with a location and label.
 * @param {string} [props.width="10rem"] - The width of the progress bar.
 * @param {boolean} [props.reverse=false] - If true, reverses the direction of the progress.
 * @param {number} [props.time] - Duration in seconds for time-based progress.
 * @param {Function} [props.onEnd] - Function called when the time-based progress completes.
 * @param {string} [props.unfilledColour="transparent"] - Colour of the unfilled part of the progress bar.
 * @param {string} [props.filledColour="gradient"] - Colour of the filled part of the progress bar.
 * @param {string} [props.height="0.38rem"] - Height of the progress bar.
 * @param {boolean} [props.pauseOnHover=true] - If true, pauses time-based progress when hovered.
 * @param {boolean} [props.hovering=undefined] - State to track if the progress bar is being hovered.
 * @param {boolean} [props.canStart] - State to control when the time-based progress can start.
 * @param {string} [props.stopSize="1.25rem"] - Size of the stop markers in the progress bar.
 * @returns {React.Component} A progress bar component with customizable features.
 */
function ProgressBar({
    value,
    max,
    stops = [],
    width = "10rem",
    reverse = false,
    time,
    onEnd,
    unfilledColour = "transparent",
    filledColour = "gradient",
    height = "0.38rem",
    pauseOnHover = true,
    hovering = undefined,
    canStart,
    stopSize = "1.25rem",
}) {
    const paused = React.useRef(false);
    const lastStart = React.useRef(null);
    const remainingTime = React.useRef(time);

    stops = stops.sort((a, b) => a.location - b.location);
    const progress = useMotionValue(value);
    const progress_percentage = useTransform(
        progress,
        val => `${(val / max) * 100}%`
    );
    const progressWidth = useAnimation();

    const [lastCrossed, setLastCrossed] = React.useState(
        stops.findIndex(stop => value <= stop.location) - 1
    );

    React.useEffect(
        () =>
            progress.on("change", value => {
                if (value >= stops[lastCrossed + 1]?.location) {
                    setLastCrossed(prev => prev + 1);
                } else if (value < stops[lastCrossed]?.location) {
                    setLastCrossed(prev => prev - 1);
                }
            }),
        [stops, value, lastCrossed]
    );

    React.useEffect(() => {
        animate(progress, value);
    }, [value]);

    React.useEffect(() => {
        if (time && canStart && !hovering) {
            progressWidth.start({
                width: "100%",
                transition: { duration: remainingTime.current },
            });
            lastStart.current = performance.now();
        }
    }, [canStart]);

    React.useEffect(() => {
        // console.log("Hovering", hovering);
        if (!time || !canStart || !pauseOnHover || hovering === undefined)
            return;

        if (hovering && !paused.current) {
            // console.log("pausing animation");
            paused.current = true;
            progressWidth.stop();
            remainingTime.current =
                remainingTime.current -
                (performance.now() - lastStart.current) / 1000;
        } else {
            // console.log("resuming animation");
            paused.current = false;
            progressWidth.start({
                width: "100%",
                transition: { duration: remainingTime.current },
            });
            lastStart.current = performance.now();
        }
    }, [hovering]);
    //React.useEffect(() => animate(progress, value));

    const theme = useTheme();

    return (
        <Container width={width} height={height}>
            {stops.map((stop, index) => {
                const percentage = (stop.location / max) * 100;
                const active = lastCrossed >= index;

                return (
                    <>
                        <Stop
                            location={percentage}
                            active={active}
                            stopSize={stopSize}>
                            <Label
                                location={percentage}
                                active={active}
                                stopSize={stopSize}>
                                <TextWrapper
                                    noWrap
                                    color={
                                        !active
                                            ? theme.colours.primaryFaded
                                            : theme.colours.primaryStrong
                                    }>
                                    {stop.label}
                                </TextWrapper>
                            </Label>
                        </Stop>
                    </>
                );
            })}
            <ProgressContainer width={width} reverse={reverse}>
                <Progress
                    {...(time
                        ? {
                              animate: progressWidth,
                              transition: { duration: time, ease: "linear" },
                              onAnimationComplete: () => {
                                  if (!paused.current) {
                                      //   console.log("ok");
                                      onEnd();
                                  }
                              },
                          }
                        : { style: { width: progress_percentage } })}
                    reverse={reverse}
                    colour={filledColour}
                />
                <UnfilledProgress colour={unfilledColour} />
            </ProgressContainer>
        </Container>
    );
}

export default ProgressBar;
