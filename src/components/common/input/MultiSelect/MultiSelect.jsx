import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import Option from "./Option";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.7rem;
`;

/**
 * MultiSelect - A custom component for selecting multiple options.
 * It allows for flexible interaction with multiple choices and maintains the state of selected options.
 *
 * @param {Object} props - The component props.
 * @param {Object[]} props.options - The list of options available for selection.
 * @param {Object[]} props.selected - The currently selected options.
 * @param {Function} props.setSelected - Function to update the selected options.
 * @returns {React.Component} A component that renders multiple selectable options.
 */
function MultiSelect({ options, selected, setSelected, ...props }) {
    const [mouseDown, setMouseDown] = React.useState(false);
    React.useEffect(() => {
        const onMouseUp = () => {
            setMouseDown(false);
        };

        const onMouseDown = () => {
            setMouseDown(true);
        };

        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mousedown", onMouseDown);

        return () => {
            document.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mousedown", onMouseDown);
        };
    }, []);

    // console.log(options);

    const ids = React.useMemo(() => options.map(() => nanoid()), [options]);

    return (
        <Container {...props}>
            {options.map((option, i) => (
                <Option
                    key={ids[i]}
                    selected={selected}
                    setSelected={setSelected}
                    mouseDown={mouseDown}
                    option={option}
                />
            ))}
        </Container>
    );
}

export default MultiSelect;
