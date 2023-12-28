import React from "react";
import Textfield from "@/components/common/input/Textfield/Textfield";
import {
    DropdownListOption,
    DropdownListWrapper,
    Wrapper,
} from "./BasicDropdownList.styles";
import EndAdornment from "./EndAdornment";

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
function BasicDropdownList({
    label,
    options,
    selected,
    setSelected,
    required,
    ...props
}) {
    const [open, setOpen] = React.useState(false);
    const [mouseEntered, setMouseEntered] = React.useState(false);
    const [visibleOptions, setVisibleOptions] = React.useState(options);
    const [inputValue, setInputValue] = React.useState("");
    const [transitioning, setTransitioning] = React.useState(false);
    const [focusedOption, setFocusedOption] = React.useState(null);

    const inputRef = React.useRef(null);
    const optionRefs = React.useRef([]);
    const dropdownListRef = React.useRef(null);

    const filterVisibleOptions = () => {
        // console.log(options, inputValue);

        setVisibleOptions(
            options.filter(option =>
                option.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
    };

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
                    setSelected(visibleOptions[focusedOption]);
                    setOpen(false);
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
        // setInputValue(visibleOptions[focusedOption]);
    }, [focusedOption]);

    React.useEffect(() => {
        if (selected === null) return;
        filterVisibleOptions();
    }, [inputValue]);

    React.useEffect(() => {
        // console.log(selected);
        if (!selected) {
            // console.log("here");
            setInputValue("");
            return;
        }

        setInputValue(selected);
        inputRef.current.focus();
    }, [selected]);

    React.useEffect(() => {
        if (!open) {
            setFocusedOption(null);
        }

        setTransitioning(true);

        if (open) {
            setVisibleOptions(options);
            if (selected) {
                const currentOption = options.indexOf(selected);

                setFocusedOption(currentOption);
            } else {
                // move scrollbar to top
                dropdownListRef.current.scrollTop = 0;
            }
        }
    }, [open]);

    React.useEffect(() => {
        if (selected) {
            setSelected("");
        }
    }, [options]);

    // console.log(open);

    return (
        <Wrapper
            tabIndex={0}
            onBlur={() => {
                if (!mouseEntered) {
                    if (inputValue.length) {
                        setInputValue(selected);
                    }
                    setOpen(false);
                    return;
                }
            }}
            {...props}>
            <Textfield
                {...props}
                onMouseOver={() => setMouseEntered(true)}
                onMouseLeave={() => setMouseEntered(false)}
                onClick={e => {
                    setOpen(!open);
                }}
                label={label}
                type="text"
                required={required}
                value={inputValue}
                ref={inputRef}
                onChange={e => setInputValue(e.target.value)}
                endAdornment={
                    <EndAdornment
                        mouseEntered={mouseEntered}
                        selected={selected}
                        setSelected={setSelected}
                        open={open}
                        setOpen={setOpen}
                    />
                }
            />
            <DropdownListWrapper
                onMouseOver={() => setMouseEntered(true)}
                onMouseLeave={() => setMouseEntered(false)}
                onTransitionEnd={() => setTransitioning(false)}
                onMouseDown={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                transitioning={transitioning}
                open={open}
                ref={dropdownListRef}>
                {visibleOptions.length ? (
                    visibleOptions.map((option, i) => {
                        // assign ref to option and add to array
                        // optionRefs.current[i] = React.useRef();
                        return (
                            <DropdownListOption
                                ref={ref => (optionRefs.current[i] = ref)}
                                key={option}
                                selected={selected === option}
                                focused={focusedOption === i}
                                onMouseEnter={() => setFocusedOption(i)}
                                onClick={() => {
                                    setSelected(option);
                                    setOpen(false);
                                }}>
                                {option}
                            </DropdownListOption>
                        );
                    })
                ) : (
                    <DropdownListOption disabled>No options</DropdownListOption>
                )}
            </DropdownListWrapper>
        </Wrapper>
    );
}

export default BasicDropdownList;
