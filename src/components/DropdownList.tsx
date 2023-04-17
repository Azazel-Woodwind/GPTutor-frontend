import React from "react";
import { MdArrowDropDown, MdArrowDropUp, MdClose } from "react-icons/md";
import styled from "styled-components";
import CenteredRow from "../styles/containers/CenteredRow";
import IconButton from "./IconButton";
import Textfield from "./Textfield";

const Wrapper = styled.div`
    position: relative;
    z-index: 100;
    /* width: 400px; */
`;

const DropdownListWrapper = styled.div`
    visibility: ${props => (props.open ? "visible" : "hidden")};
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    /* border: 5px solid black; */
    border-radius: 8px;
    z-index: 100;
    box-shadow: rgba(76, 72, 72, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    overflow: hidden;
    overflow-y: auto;
    max-height: ${props => (props.open ? "200px" : "0")};
    background-color: ${props => props.theme.colours.secondary};
`;

const DropdownListOption = styled.div`
    color: ${props =>
        props.disabled
            ? props.theme.colours.priamryFaded
            : props.theme.colours.primary};
    padding: 0.7em;
    background-color: rgb(39, 46, 95);
    /* border: 1px solid black; */
    ${props =>
        props.selected
            ? !props.focused
                ? props.theme.gradient({ animationLength: 5 })
                : props.theme.gradientFaded({ animationLength: 5 })
            : `background-color: rgb(39, 46, 95)`};

    ${props =>
        !props.disabled &&
        `
        cursor: pointer;
            ${
                props.focused
                    ? props.selected
                        ? props.theme.gradient({ animationLength: 5 })
                        : `background-color: ${props.theme.colours.glow};`
                    : props.selected &&
                      props.theme.gradientFaded({ animationLength: 5 })
            }

    `}
`;

function DropdownListEndAdornment({
    mouseEntered,
    selected,
    setSelected,
    open,
    setOpen,
}) {
    return (
        <CenteredRow style={{ paddingRight: "0.7em" }}>
            <IconButton
                style={{
                    display: selected && mouseEntered ? "flex" : "none",
                }}
                onClick={() => setSelected("")}>
                <MdClose />
            </IconButton>
            <IconButton
                onClick={() => {
                    // console.log(1);
                    // setOpen(!open);
                }}>
                {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </IconButton>
        </CenteredRow>
    );
}

function DropdownList({
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
                }
                return;
            }
        },
        [focusedOption, visibleOptions]
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
        if (!selected) {
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
            }}>
            <Textfield
                {...props}
                onMouseOver={() => setMouseEntered(true)}
                onMouseLeave={() => setMouseEntered(false)}
                onClick={e => {
                    setOpen(!open);
                }}
                inAutoComplete={mouseEntered}
                label={label}
                type="text"
                required={required}
                value={inputValue}
                ref={inputRef}
                onChange={e => setInputValue(e.target.value)}
                endAdornment={
                    <DropdownListEndAdornment
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

export default DropdownList;
