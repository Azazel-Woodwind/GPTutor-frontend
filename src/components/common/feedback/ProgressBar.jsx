import React from "react";
import styled, { useTheme } from "styled-components";
import {
    motion,
    useMotionValue,
    animate,
    useTransform,
    useAnimation,
} from "framer-motion";
import TextWrapper from "@/components/utils/TextWrapper";

const ProgressBar = ({
    value,
    max,
    stops = [],
    width = "10rem",
    onClick = () => {},
    destroyOnClick = true,
    reverse = false,
    time,
    onEnd,
    colour,
    unfilledColour = "transparent",
    filledColour = "gradient",
    height = "0.38rem",
    pauseOnHover = true,
    hovering = undefined,
    canStart,
    stopSize = "1.25rem",
}) => {
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
};

const UnfilledProgress = styled.div`
    background-color: ${props => props.colour};
    height: 100%;
    flex-grow: 1;
    /* border: 1px solid black; */
`;

const Container = styled.div`
    position: relative;
    width: ${props => props.width};
    display: flex;
    align-items: center;
    background-color: ${props => props.colour || "rgb(255, 255, 255, 0.1)"};
    height: ${props => props.height};
`;

const Label = styled.p`
    position: absolute;
    top: ${props => props.stopSize};
    /* top: 50%;
    font-size: 90%;
    width: 150%; */
    color: ${props =>
        !props.active
            ? props.theme.colours.primaryFaded
            : props.theme.colours.primaryStrong};
    /* left: ${props => props.location - 1}%; */
`;

const Stop = styled.div`
    display: flex;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    left: ${props => props.location - 1}%;
    width: ${props => props.stopSize};
    height: ${props => props.stopSize};
    z-index: 10;

    ::after {
        content: "";
        position: absolute;
        width: 100%;
        padding: 0.15rem;
        height: 100%;
        border-radius: 50%;
        background-color: ${props => (!props.active ? "#1E2335;" : "unset")};
    }

    ${props => props.active && props.theme.gradient({ animationLength: 5 })};
`;

const Progress = styled(motion.div)`
    height: 100%;
    /* position: absolute;
    ${props => (props.reverse ? "right: 0px;" : "left: 0px;")} */
    background-color: ${props => props.colour};
    /* border: 1px solid blue; */
    ${props => props.colour === "gradient" && props.theme.gradient()}
`;

const ProgressContainer = styled(motion.div)`
    position: relative;

    overflow: clip;
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */

    display: flex;
    flex-direction: ${props => (props.reverse ? "row-reverse" : "row")};
`;
export default ProgressBar;
