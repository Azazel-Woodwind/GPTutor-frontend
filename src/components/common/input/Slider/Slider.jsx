import React from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import TextWrapper from "@/components/utils/TextWrapper";
import { clamp, roundToNearestMultiple } from "@/utils/misc";
import { Knob, Mark, MarksContainer, TooltipContainer, Track } from "./styles";

/**
 * Slider - A custom slider component for selecting a value within a range.
 * It provides visual feedback, draggable functionality, and optional marks for steps.
 *
 * @param {Object} props - The component props.
 * @param {number} props.min - The minimum value of the slider (default: 0).
 * @param {number} props.max - The maximum value of the slider (default: 100).
 * @param {number} props.defaultValue - The initial value of the slider (default: 0).
 * @param {number} props.step - The step size for the slider (default: 1).
 * @param {boolean|Object[]} props.marks - Whether to display marks on the slider. If `true`, marks are auto-generated. If an array, it specifies custom marks.
 * @param {number} props.widthInPx - The width of the slider in pixels.
 * @param {number} props.heightInPx - The height of the slider in pixels.
 * @param {number} props.knobSizeInPx - The size of the slider knob in pixels.
 * @param {string} props.tooltipFontSize - The font size of the tooltip.
 * @param {string} props.markLabelFontSize - The font size of the mark labels.
 * @param {number} props.value - The current value of the slider.
 * @param {Function} props.onChange - Callback function called when the value changes.
 * @param {Function} props.onDragStart - Callback function called when dragging starts.
 * @param {Function} props.onDragEnd - Callback function called when dragging ends.
 * @returns {React.Component} A custom slider component.
 */
function Slider({
    min = 0,
    max = 100,
    defaultValue = 0,
    step = 1,
    marks = false,
    widthInPx = 300,
    heightInPx = 10,
    knobSizeInPx = 20,
    tooltipFontSize = "0.875rem",
    markLabelFontSize = "0.875rem",
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

export default Slider;
