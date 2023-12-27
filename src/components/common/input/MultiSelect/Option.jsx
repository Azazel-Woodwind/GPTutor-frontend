import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";

const OptionContainer = styled.div`
    text-align: center;
    position: relative;
    padding: 0.8rem;
    /* margin: 0.3rem 0.4rem; */
    cursor: pointer;
    box-shadow: rgba(76, 72, 72, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    flex-grow: 1;
    /* max-width: fit-content; */
    background-color: rgb(112, 118, 179, 0.15);
    span {
        user-select: none;
        position: relative;
        z-index: 6;
    }
`;

const GradientBackground = styled.div`
    user-select: none;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: ${props => (props.visible ? "1" : "0")};
    z-index: 5;
    @keyframes gradient {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100% 0;
        }
    }

    background: #58c1fe;
    ${props => props.theme.gradient({ animationLength: 7 })}
    background-size: 800% auto;
`;

const layouts = {
    selected: { scale: 1 },
    unselected: { scale: 1 },
};

function Option({ option, selected, setSelected, mouseDown }) {
    const [mouseEnter, setMouseEnter] = React.useState(false);
    const [firstClicked, setFirstClicked] = React.useState(false);
    const isSelected = selected.includes(option);

    const clicked = () => {
        if (isSelected) {
            selected.splice(selected.indexOf(option), 1);
            setSelected(selected);
        } else {
            setSelected([...selected, option]);
        }
    };

    React.useEffect(() => {
        if (firstClicked) clicked();
    }, [firstClicked]);

    React.useEffect(() => {
        if (!firstClicked && mouseEnter && mouseDown) clicked();
    }, [mouseEnter, mouseDown, firstClicked]);

    React.useEffect(() => {
        if (!mouseDown) {
            setFirstClicked(false);
        }
    }, [mouseDown]);

    return (
        <OptionContainer
            selected={isSelected}
            onMouseEnter={e => setMouseEnter(true)}
            onMouseLeave={e => setMouseEnter(false)}
            onMouseDown={e => setFirstClicked(true)}
            as={motion.div}
            variants={layouts}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isSelected ? "selected" : "unselected"}>
            <GradientBackground visible={isSelected} />
            <span> {option} </span>
        </OptionContainer>
    );
}

export default Option;
