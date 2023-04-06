import React from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import Theme from "../styles/Theme";
import CenteredRow from "../styles/containers/CenteredRow";
import IconButton from "./IconButton";

const DefaultInputStyling = `
    padding: 0.7em 0.7em 1.1em 0.7em;
    position: relative;
    border-radius: 8px;
    box-sizing: content-box;
    border: 1px solid ${Theme.colours.primaryFaded};
    
    :focus-within {
        border: 1px solid ${Theme.colours.primaryStrong};
    }
    cursor: text;
`;

export const BaseInputStyle = styled.input`
    color: ${props => (props.color ? props.color : "white")};
    font-size: 16px;
    z-index: 1;
    width: 100%;
    background: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
    box-sizing: border-box;
    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active,
    :-internal-autofill-previewed,
    :-internal-autofill-selected {
        -webkit-transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: ${props =>
            props.theme.colours.primary} !important;
    }
    ${props => props.invalid && "border: 1px solid red !important;"};
    ${props => props.width && `width: ${props.width}`};
    ${props =>
        props.adornmentWidth &&
        `padding-right: calc(${props.adornmentWidth}px);`};
`;

export const CustomFieldset = styled.fieldset`
    ${DefaultInputStyling}
    flex-grow: 1;
`;

export const CustomLegend = styled.legend`
    padding: 0em 0.8em;
    visibility: hidden;
    max-width: 100%;
    visibility: block;
    ${props =>
        !props.visible &&
        `
        padding: 0;
        max-width: 0.01px;
    `};

    float: unset;
    width: auto;
    display: block;
    height: 11px;
    font-size: 0.75em;
    -webkit-transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    white-space: nowrap;
`;

const InputLabel = styled.label`
    position: absolute;
    transform-origin: top left;
    color: gray;
    z-index: -1;
`;

const EndAdornmentWrapper = styled.div`
    position: absolute;
    top: -5%;
    right: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    box-sizing: border-box;
`;

export const BaseInput = ({ inputRef, type, ...props }) => {
    const [wrapper, setRef] = React.useState(undefined);
    const [visible, setVisible] = React.useState(false);

    return (
        <>
            <BaseInputStyle
                {...props}
                type={visible ? "text" : type}
                ref={inputRef}
                adornmentWidth={wrapper?.getBoundingClientRect().width}
            />

            {type === "password" ? (
                <EndAdornmentWrapper>
                    <span ref={ref => setRef(ref)}>
                        <IconButton
                            as={motion.div}
                            whileTap={{ scale: 0.95 }}
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.3 },
                            }}
                            onClick={() => setVisible(!visible)}>
                            {visible ? (
                                <FaEye
                                    // style={{
                                    //     backgroundColor: "blue",
                                    //     borderRadius: "50%",

                                    // }}
                                    size="1.4em"
                                />
                            ) : (
                                <FaEyeSlash size="1.5em" />
                            )}
                        </IconButton>
                    </span>
                </EndAdornmentWrapper>
            ) : (
                props.endAdornment && (
                    <EndAdornmentWrapper>
                        <span ref={ref => setRef(ref)}>
                            {props.endAdornment}
                        </span>
                    </EndAdornmentWrapper>
                )
            )}
        </>
    );
};

export const Textfield = ({
    label,
    onChange,
    onClick,
    onBlur,
    required,
    color,
    ...props
}: any) => {
    const [focused, setFocused] = React.useState(false);
    const [input, setInput] = React.useState("");
    const [mouseEntered, setMouseEntered] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const LabelVariants = {
        focused: {
            x: "0.1em",
            y: "-1.7em",
            scale: 0.9,
            color: color ? color : Theme.colours.primaryStrong,
        },
        unfocused: { left: 13, scale: 1 },
    };

    if (required) label = `${label} *`;

    return (
        <CustomFieldset
            onClick={() => {
                console.log("mouse down");

                inputRef.current?.focus();
                setFocused(true);
            }}
            onMouseEnter={() => setMouseEntered(true)}
            onMouseLeave={() => setMouseEntered(false)}
            {...props}>
            <CustomLegend visible={focused || input.length}>
                {label}
            </CustomLegend>
            <InputLabel
                {...props}
                as={motion.label}
                initial={false}
                variants={LabelVariants}
                animate={focused || input.length ? "focused" : "unfocused"}>
                {label}
            </InputLabel>
            <BaseInput
                inputRef={inputRef}
                value={input}
                {...props}
                onChange={e => {
                    setInput(e.target.value);
                    onChange && onChange(e);
                }}
                onClick={e => {
                    setFocused(true);
                    onClick && onClick(e);
                }}
                onBlur={e => {
                    if (!mouseEntered) {
                        setFocused(false);
                        onBlur && onBlur(e);
                    }
                }}
            />
        </CustomFieldset>
    );
};
