import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";

const ProgressBar = ({
    value,
    max,
    stops = [],
    width = "10em",
    onClick = () => {},
    destroyOnClick = true,
}) => {
    stops = stops.sort((a, b) => a.location - b.location);
    const progress = useMotionValue(value);
    const progress_percentage = useTransform(
        progress,
        val => `${(val / max) * 100}%`
    );

    const [lastCrossed, setLastCrossed] = React.useState(
        stops.findIndex(stop => value <= stop.location) - 1
    );

    React.useEffect(
        () =>
            progress.onChange(value => {
                if (value >= stops[lastCrossed + 1]?.location) {
                    // console.log("Crossed up");
                    setLastCrossed(prev => prev + 1);
                } else if (value < stops[lastCrossed]?.location) {
                    console.log("Crossed down");
                    setLastCrossed(prev => prev - 1);
                }
            }),
        [stops, value, lastCrossed]
    );
    animate(progress, value);

    return (
        <Container width={width}>
            {stops.map((stop, index) => {
                const percentage = (stop.location / max) * 100;
                const active = lastCrossed >= index;

                return (
                    <>
                        <Stop location={percentage} active={active} />
                        <Label location={percentage} active={active}>
                            {stop.label}
                        </Label>
                    </>
                );
            })}
            <ProgressContainer width={width}>
                <Progress
                    style={{
                        width: progress_percentage,
                    }}
                />
            </ProgressContainer>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: ${props => props.width};
    display: flex;
    align-items: center;
    background-color: rgb(255, 255, 255, 0.1);
`;

const Label = styled.p`
    position: absolute;
    top: 50%;
    font-size: 90%;
    width: 150%;
    color: ${props =>
        !props.active
            ? props.theme.colours.primaryFaded
            : props.theme.colours.primaryStrong};
    left: ${props => props.location - 1}%;
`;

const Stop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    left: ${props => props.location - 1}%;
    width: 1.2em;
    height: 1.2em;
    z-index: 10;

    ::after {
        content: "";
        position: absolute;
        width: 100%;
        padding: 1px;
        height: 100%;
        border-radius: 50%;
        background-color: ${props => (!props.active ? "#1E2335;" : "unset")};
    }

    ${props => props.active && props.theme.gradient({ animationLength: 5 })};
`;

const Progress = styled(motion.div)`
    height: 100%;
    ${props => props.theme.gradient({ animationLength: 5 })}
`;

const ProgressContainer = styled(motion.div)`
    position: relative;
    height: 0.5em;
    overflow: clip;
    width: 100%;
    width: ${props => props.width};
`;
export default ProgressBar;
