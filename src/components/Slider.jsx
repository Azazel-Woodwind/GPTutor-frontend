import React from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import styled, { css } from "styled-components";
import { TextWrapper } from "../styles/TextWrappers";

function roundToNearestMultiple(number, multiple) {
    return Math.round(number / multiple) * multiple;
}

function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
}

function generateMarks(min, max, step) {
    const marks = [];
    for (let i = min; i <= max; i += step) {
        marks.push({ value: i });
    }
    if (marks[marks.length - 1] !== max) {
        marks.push({ value: max });
    }
    return marks;
}

function Slider({
    min = 0,
    max = 100,
    defaultValue = 0,
    step = 1,
    marks = false,
    widthInPx = 300,
    heightInPx = 10,
    knobSizeInPx = 20,
    tooltipFontSize = "14px",
    markLabelFontSize = "14px",
    value,
    onChange,
    onDragStart,
    onDragEnd,
    ...props
}) {
    const [isDragging, setIsDragging] = React.useState(false);
    const [hovering, setHovering] = React.useState(false);
    const [state, setState] = React.useState(defaultValue.toFixed(1));
    value = value ?? state;
    onChange = onChange ?? setState;

    const knobX =
        ((clamp(value, min, max) - min) / (max - min)) * widthInPx -
        knobSizeInPx / 2;

    const xOffsetRef = React.useRef(knobX + knobSizeInPx / 2);
    const trackRef = React.useRef(null);

    const dragControls = useDragControls();

    function startDrag(e) {
        e.preventDefault();
        dragControls.start(e, { snapToCursor: true });
    }

    const stepWidthInPx = widthInPx * (step / (max - min));
    const markSize = "3px";

    if (marks === true) {
        marks = generateMarks(min, max, step);
    }

    function updatePosition() {
        const newValue =
            (roundToNearestMultiple(xOffsetRef.current, stepWidthInPx) /
                stepWidthInPx) *
                step +
            min;
        // console.log(newValue);
        onChange(Math.round(clamp(newValue, min, max) * 100) / 100);
    }

    return (
        <Track
            {...props}
            width={widthInPx}
            height={heightInPx}
            fillWidth={knobX + knobSizeInPx / 2}
            ref={trackRef}
            onPointerDown={e => {
                xOffsetRef.current =
                    e.clientX - trackRef.current.getBoundingClientRect().x;
                updatePosition();
                startDrag(e);
                props.onPointerDown && props.onPointerDown(e);
            }}>
            <Knob
                knobX={knobX}
                size={knobSizeInPx}
                onPointerEnter={() => setHovering(true)}
                onPointerLeave={() => setHovering(false)}>
                <AnimatePresence>
                    {(hovering || isDragging) && (
                        <TooltipContainer
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            tooltipFontSize={tooltipFontSize}>
                            {value}
                        </TooltipContainer>
                    )}
                </AnimatePresence>
            </Knob>
            <motion.div
                style={{
                    position: "absolute",
                    left: -knobSizeInPx,
                    visibility: "hidden",
                }}
                drag="x"
                dragListener={false}
                dragControls={dragControls}
                dragMomentum={false}
                dragElastic={0}
                onDragStart={() => {
                    xOffsetRef.current = clamp(
                        roundToNearestMultiple(
                            xOffsetRef.current,
                            stepWidthInPx
                        ),
                        0,
                        widthInPx - knobSizeInPx / 2
                    );
                    // console.log(xOffsetRef.current);
                    setIsDragging(true);
                    onDragStart && onDragStart();
                }}
                onDrag={(event, info) => {
                    xOffsetRef.current += info.delta.x;
                    // console.log(xOffsetRef.current);
                    updatePosition();
                }}
                onDragEnd={() => {
                    setIsDragging(false);
                    onDragEnd && onDragEnd();
                }}
                dragConstraints={{ left: 0, right: widthInPx }}
            />
            {marks && (
                <MarksContainer markSize={markSize} marks={marks}>
                    {marks.map(({ value, label }, i) => (
                        <Mark
                            key={i}
                            markSize={markSize}
                            style={{
                                position: "absolute",
                                left: `${((value - min) / (max - min)) * 100}%`,
                                transform: `translateX(-50%)`,
                            }}>
                            {label && (
                                <MarkLabel trackHeight={heightInPx}>
                                    <TextWrapper
                                        noHighlight
                                        fontSize={markLabelFontSize}>
                                        {label}
                                    </TextWrapper>
                                </MarkLabel>
                            )}
                        </Mark>
                    ))}
                </MarksContainer>
            )}
        </Track>
    );
}

const MarkLabel = styled.div`
    ${({ trackHeight }) => css`
        position: absolute;
        top: ${0.9 * trackHeight}px;
    `}
`;

const Mark = styled.div`
    ${({ markSize }) => css`
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 50%;
        height: ${markSize};
        width: ${markSize};
        background-color: #000000a2;
    `}
`;

const MarksContainer = styled.div`
    ${({ markSize, marks }) => css`
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: ${marks === true ? css`calc(100% + ${markSize})` : "100%"};
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `}
`;

const TooltipContainer = styled(motion.div)`
    ${({ tooltipFontSize }) => css`
        position: absolute;
        transform: translateY(-120%);
        user-select: none;
        color: ${props => props.theme.colours.primary};
        padding: 0.2em 0.5em;
        background-color: #21273f;
        border-radius: 0.5em;
        font-size: ${tooltipFontSize};
    `}
`;

const Knob = styled(motion.div)`
    ${({ size, knobX, theme }) => css`
        position: absolute;
        display: flex;
        justify-content: center;

        z-index: 2;
        top: calc(50% - ${size / 2}px);
        left: ${knobX}px;

        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        ${theme.gradient()}
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.3);
        cursor: pointer;
    `}
`;

const Track = styled(motion.div)`
    ${({ width, height, fillWidth, theme }) => css`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        width: ${width}px;
        height: ${height}px;
        border-radius: 10px;
        z-index: 0;
        ${theme.gradient()}

        cursor: pointer;

        ::after {
            content: "";
            position: absolute;
            right: 0;
            height: 100%;
            width: ${width - fillWidth}px;
            background-color: rgb(150, 150, 150);
            border-radius: 10px;
        }
    `}
`;

export default Slider;
