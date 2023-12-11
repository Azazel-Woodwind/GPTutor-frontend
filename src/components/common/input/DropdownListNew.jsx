import React from "react";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import DropdownOptionsContainer from "./DropdownOptionsContainer";

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

function DropdownListNew({ label, options, selected, setSelected, required }) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [focusedOption, setFocusedOption] = React.useState(null);
    const [activeOption, setActiveOption] = React.useState(null);

    const inputRef = React.useRef(null);
    const optionRefs = React.useRef([]);
    const dropdownListRef = React.useRef(null);

    let visibleOptions = inputValue.startsWith("💀")
        ? options
        : options
              .filter(option =>
                  option.toLowerCase().includes(inputValue.toLowerCase())
              )
              .sort();

    const handleKeyDown = React.useCallback(
        e => {
            // console.log(e.key);

            // console.log(focusedOption);
            // e.preventDefault();

            if (inputRef.current === document.activeElement) {
                setOpen(true);
            }
            if (e.key === "Escape") {
                setOpen(false);
                return;
            }
            if (e.key === "ArrowDown") {
                setFocusedOption(prev => (prev === null ? 0 : prev + 1));
                return;
            }
            if (e.key === "ArrowUp") {
                setFocusedOption(prev =>
                    prev === null ? visibleOptions.length - 1 : prev - 1
                );
                return;
            }
            if (e.key === "Enter") {
                if (focusedOption !== null) {
                    setActiveOption(focusedOption);
                    e.preventDefault(); // NO idea why this is needed but this breaks on the create lesson page if you remove it
                }
                return;
            }
        },
        [focusedOption, visibleOptions, setSelected]
    );

    // reregister event listener when focusedOption or visibleOptions change
    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleKeyUp = React.useCallback(
        e => {
            // console.log(e.key);
            if (e.key === "Enter") {
                if (focusedOption !== null) {
                    setActiveOption(null);
                    setSelected(visibleOptions[focusedOption]);
                    setOpen(false);
                    e.preventDefault(); // NO idea why this is needed but this breaks on the create lesson page if you remove it
                }
                return;
            }
        },
        [focusedOption, visibleOptions, setSelected]
    );

    React.useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyUp]);

    React.useEffect(() => {
        if (focusedOption === null) return;
        if (focusedOption < 0) {
            setFocusedOption(visibleOptions.length - 1);
            return;
        }
        if (focusedOption >= visibleOptions.length) {
            setFocusedOption(0);
            return;
        }

        // scroll to focused option

        // console.log(optionRefs.current.length);
        // console.log(focusedOption);
        optionRefs.current[focusedOption].scrollIntoView({
            behavior: "auto",
            block: "nearest",
        });

        // setInputValue(visibleOptions[focusedOption]);
    }, [focusedOption]);

    React.useEffect(() => {
        // console.log(selected);
        if (!selected) {
            // console.log("here");
            setInputValue("");
            return;
        }

        // setInputValue("💀" + selected);
        inputRef.current.focus();
    }, [selected]);

    React.useEffect(() => {
        if (!open) {
            setFocusedOption(null);
        }

        if (open) {
            if (selected) {
                const currentOption = options.indexOf(selected);
                dropdownListRef.current.scrollTop = 0;
                setFocusedOption(currentOption);
            } else {
                // move scrollbar to top
                dropdownListRef.current.scrollTop = 0;
            }
        }
    }, [open]);

    React.useEffect(() => {
        if (selected) {
            // console.log("OVER HERE");
            setSelected("");
        }
    }, [options]);

    // React.useEffect(() => {
    //     if (inputValue.startsWith("💀")) {
    //         setOpen(false);
    //     }
    // }, [inputValue]);

    // console.log("OPEN:", open);
    // console.log(focusedOption);

    return (
        <Container initial={false} animate={open ? "open" : "closed"}>
            <DropdownSearchContainer
                tabIndex={0}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                    setOpen(prev => !prev);
                    if (!open) {
                        setInputValue("💀" + selected);
                    } else if (!inputValue) {
                        setSelected("");
                    }
                    inputRef.current.focus();
                }}
                onMouseDown={e => {
                    e.preventDefault();
                }}>
                <Search
                    onMouseDown={e => {
                        e.stopPropagation();
                    }}
                    onBlur={() => {
                        if (!inputValue) {
                            setSelected("");
                        }
                        setOpen(false);
                    }}
                    placeholder={`${label || "Search"}${required ? " *" : ""}`}
                    ref={inputRef}
                    value={!open ? selected : inputValue.replace("💀", "")}
                    onChange={e => setInputValue(e.target.value)}
                />
                <motion.div
                    variants={{
                        open: { rotate: 180 },
                        closed: { rotate: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}>
                    <svg width="15" height="15" viewBox="0 0 20 20">
                        <path d="M0 7 L 20 7 L 10 16" />
                    </svg>
                </motion.div>
            </DropdownSearchContainer>
            {/* <DropdownOptionsContainer
                dropdownListRef={dropdownListRef}
                visibleOptions={visibleOptions}
                optionRefs={optionRefs}
                selected={selected}
                setSelected={setSelected}
                setFocusedOption={setFocusedOption}
                focusedOption={focusedOption}
                open={open}
                setOpen={setOpen}
            /> */}
            <OptionContainer
                onAnimationComplete={() => {
                    if (!open) {
                        // console.log("CLOSE COMPLETE");
                        setInputValue("💀" + selected);
                    }
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
                                setFocusedOption(i);
                            }}
                            onClick={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                setSelected(option);
                                setOpen(false);
                                setActiveOption(null);
                            }}
                            key={i}
                            variants={itemVariants}
                            // whileHover={{ scale: 1.02 }}
                            // whileTap={{ scale: 0.98 }}
                            onMouseDown={e => {
                                setActiveOption(i);
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            // initial={{ scale: 1 }}
                            animate={
                                activeOption === i
                                    ? { scale: 0.98 }
                                    : focusedOption === i
                                    ? { scale: 1.02 }
                                    : { scale: 1 }
                            }>
                            {`${option}`}
                        </Option>
                    ))
                ) : (
                    <Option disabled>No results</Option>
                )}
            </OptionContainer>
        </Container>
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

const Search = styled.input`
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1.05rem;
    font-weight: 700;
    color: #6600ff;
    width: 100%;
    background: transparent;
    padding: 0.3rem 0;

    ::placeholder {
        color: #6600ff;
        opacity: 0.5;
    }
`;

const DropdownSearchContainer = styled(motion.div)`
    background: #fafafa;
    color: #6600ff;
    border-radius: 0.6rem;
    padding: 0.6rem 1.2rem;
    font-size: 1.12rem;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.6rem;

    path {
        fill: #6600ff;
    }
`;

const Option = styled(motion.li)`
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
                  ${props => props.focused && "background: #e6e6e6;"}
              `}

    ${props =>
        props.selected &&
        css`
            border: 1px solid #6600ff;
            /* background: rgb(0, 153, 255); */
            /* ${props.theme.gradient({ opacity: 0.5 })} */
        `}
`;

const Container = styled(motion.nav)`
    position: relative;

    filter: drop-shadow(1px 1px 1px #4700b3);
    width: 18.7rem;
    height: fit-content;

    /* border: 5px solid red; */
    user-select: auto;

    ul,
    li {
        list-style: none;
    }
`;

export default DropdownListNew;
