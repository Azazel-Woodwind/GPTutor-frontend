import React from "react";
import { Option } from "./DropdownOption";
import styled from "styled-components";
import { motion } from "framer-motion";

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const OPTION_HEIGHT_IN_REM = 2.5;
const PADDING_IN_REM = 0.6;
const MAX_OPTION_CONTAINER_HEIGHT_IN_REM =
    OPTION_HEIGHT_IN_REM * 4 + PADDING_IN_REM * 5;

function DropdownOptionsContainer({
    dropdownListRef,
    visibleOptions,
    optionRefs,
    selected,
    setSelected,
    setFocusedOption,
    focusedOption,
    open,
    setOpen,
}) {
    // console.log("rerender");

    return (
        <OptionContainer
            onMouseDown={e => {
                e.preventDefault();
                e.stopPropagation();
            }}
            ref={dropdownListRef}
            variants={{
                open: {
                    clipPath: "inset(0% 0% 0% 0% round 10px 0 0 10px)",
                    // scale: 1,
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.3,
                        staggerChildren: 0.05,
                    },
                },
                closed: {
                    clipPath: "inset(10% 50% 90% 50% round 10px 0 0 10px)",
                    // scale: 0,
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.3,
                    },
                },
            }}
            style={{ pointerEvents: open ? "auto" : "none" }}
            numOptions={Math.max(visibleOptions.length, 1)}>
            {visibleOptions.length ? (
                visibleOptions.map((option, i) => (
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
                        key={i}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}>
                        {option}
                    </Option>
                ))
            ) : (
                <Option disabled>No results</Option>
            )}
        </OptionContainer>
    );
}

const OptionContainer = styled(motion.ul)`
    position: absolute;
    top: calc(100% + ${PADDING_IN_REM}rem);
    left: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    background: #fafafa;
    padding: ${PADDING_IN_REM}rem;

    max-height: ${MAX_OPTION_CONTAINER_HEIGHT_IN_REM}rem;

    overflow-y: auto;

    border-radius: 10px;
    /* border: 5px solid red; */
`;

function formPropsAreEqual(prevProps, nextProps) {
    // console.log(
    //     prevProps.form.control === nextProps.form.control &&
    //         prevProps.form.formState === nextProps.form.formState
    // );
    return (
        prevProps.open === nextProps.open &&
        prevProps.selected === nextProps.selected &&
        prevProps.focusedOption === nextProps.focusedOption &&
        prevProps.visibleOptions === nextProps.visibleOptions
    );
}

export default React.memo(DropdownOptionsContainer, formPropsAreEqual);
