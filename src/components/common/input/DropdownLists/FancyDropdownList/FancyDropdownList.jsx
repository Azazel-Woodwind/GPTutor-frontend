import React from "react";
import { motion } from "framer-motion";
import {
    Container,
    DropdownSearchContainer,
    OptionContainer,
    Search,
} from "./styles";

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

/**
 * DropdownList - A custom dropdown list component for selecting an option.
 * It features an interactive list that opens on click, with options that can be dynamically filtered.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the dropdown list.
 * @param {string[]} props.options - An array of option strings for the dropdown list.
 * @param {string} props.selected - The currently selected option.
 * @param {Function} props.setSelected - Function to set the currently selected option.
 * @param {boolean} [props.required=false] - Whether the dropdown is a required field.
 * @returns {React.Component} A component that renders a dropdown list with selectable options.
 */
function FancyDropdownList({
    label,
    options,
    selected,
    setSelected,
    required,
}) {
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

        optionRefs.current[focusedOption].scrollIntoView({
            behavior: "auto",
            block: "nearest",
        });
    }, [focusedOption]);

    React.useEffect(() => {
        if (!selected) {
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

export default FancyDropdownList;
