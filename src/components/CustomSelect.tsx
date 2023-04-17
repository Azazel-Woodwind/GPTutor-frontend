import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const OptionContainer = styled.div`
    text-align: center;
    position: relative;
    padding: 0.8em;
    margin: 0.3em 0.4em;
    cursor: pointer;
    box-shadow: rgba(76, 72, 72, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    flex-grow: 1;
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
    selected: { scale: 1.05 },
    unselected: { scale: 1 },
};

const Option = ({ option, selected, setSelected, mouseDown }) => {
    const [mouseEnter, setMouseEnter] = React.useState(false);
    const [firstClicked, setFirstClicked] = React.useState(false);

    const isSelected = selected.includes(option);
    const clicked = () => {
        setSelected(prev => {
            if (isSelected) {
                const clone = [...prev];
                clone.splice(selected.indexOf(option), 1);
                return clone;
            } else return [...prev, option];
        });
    };

    useEffect(() => {
        if (firstClicked) clicked();
    }, [firstClicked]);

    useEffect(() => {
        if (!firstClicked && mouseEnter && mouseDown) clicked();
    }, [mouseEnter, mouseDown, firstClicked]);

    useEffect(() => {
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
};

function CustomSelect(props) {
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

    const ids = React.useMemo(() => props.options.map(() => nanoid()), []);

    return (
        <Container>
            {props.options.map((option, i) => (
                <Option
                    key={ids[i]}
                    {...props}
                    mouseDown={mouseDown}
                    option={option}
                />
            ))}
        </Container>
    );
}

export default CustomSelect;
