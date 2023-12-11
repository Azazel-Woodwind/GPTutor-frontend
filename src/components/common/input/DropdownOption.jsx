import { motion } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components";

const itemVariants = i => ({
    open: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
            delay: 0.3 + (i + 1) * 0.05,
        },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
});

const OPTION_HEIGHT_IN_REM = 2.5;
const PADDING_IN_REM = 0.6;
const MAX_OPTION_CONTAINER_HEIGHT_IN_REM =
    OPTION_HEIGHT_IN_REM * 4 + PADDING_IN_REM * 5;

function DropdownOption({
    children,
    option,
    optionRefs,
    selected,
    setSelected,
    setFocusedOption,
    focusedOption,
    i,
    setOpen,
    open,
}) {
    if (option === "Physics") {
        console.log("OPEN", open);
    }

    return (
        <Option
            ref={node => {
                if (node) {
                    optionRefs.current[i] = node;
                }
            }}
            selected={selected === option}
            focused={focusedOption === i}
            onMouseEnter={() => {
                // console.log(i);
                setFocusedOption(i);
            }}
            onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                setSelected(option);
                setOpen(false);
            }}
            key={option}
            variants={itemVariants(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            {children}
        </Option>
    );
}

export const Option = styled(motion.li)`
    color: #6600ff;
    display: flex;
    align-items: center;

    border-radius: 5px;

    min-height: ${OPTION_HEIGHT_IN_REM}rem;
    font-weight: 600;

    padding-left: ${PADDING_IN_REM}rem;

    ${props =>
        props.disabled
            ? css`
                  color: #888;
              `
            : css`
                  cursor: pointer;
                  :hover {
                      background: #e6e6e6;
                  }
              `}
`;

export default DropdownOption;
