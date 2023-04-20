import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import Theme from "../styles/Theme";
import CenteredRow from "../styles/containers/CenteredRow";
import IconButton from "./IconButton";

export const BaseInput = forwardRef(({ type, multiline, ...props }, ref) => {
    const [wrapper, setRef] = React.useState(undefined);
    const [visible, setVisible] = React.useState(false);
    const [endAdornmentWidth, setEndAdornmentWidth] = React.useState(0);

    React.useEffect(() => {
        setEndAdornmentWidth(wrapper?.getBoundingClientRect().width);
    });

    return (
        <>
            <BaseInputStyle
                {...props}
                type={visible ? "text" : type}
                ref={ref}
                adornmentWidth={endAdornmentWidth}
                {...(multiline && {
                    as: "textarea",
                    ...(props.rows && { rows: props.rows }),
                })}
                // style={{ marginTop: "5px" }}
            />

            {type === "password" ? (
                <EndAdornmentWrapper>
                    <span
                        style={{ paddingRight: "0.7em" }}
                        ref={ref => setRef(ref)}>
                        <IconButton
                            onMouseDown={e => e.preventDefault()}
                            onMouseOver={e => e.currentTarget.blur()}
                            onKeyUp={e => {
                                if (e.key === "Enter") {
                                    setVisible(!visible);
                                }
                            }}
                            onClick={e => {
                                setVisible(!visible);
                            }}>
                            {visible ? (
                                <FaEye size="1.4em" />
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
});

const EndAdornmentWrapper = styled.div`
    /* border: 1px solid red; */
    position: absolute;
    top: 5px;
    bottom: 0;
    right: 0;
    /* height: 100%; */
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    box-sizing: border-box;
    cursor: text;
    /* z-index: 5; */
`;

const ErrorText = styled.div`
    color: ${props => props.theme.colours.error};
    font-size: 0.95em;
    font-weight: 620;
    /* border: 2px solid blue; */
    /* height: 100%; */
    margin-left: 0.5em;
`;

export const CustomFieldset = styled.fieldset.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    position: absolute;
    /* z-index: 1; */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;

    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colours.primaryFaded};
    ${props => props.error && `border-color: ${props.theme.colours.error}70;`}

    border-color: ${props =>
        (props.focused || props.mouseEntered) &&
        (props.error
            ? `${props.theme.colours.error}99;`
            : `${props.theme.colours.secondary}90`)};

    ${props =>
        props.focused &&
        `
        border-width: 2px;
    `}

    transition: border-color 0.15s;
    cursor: text;
`;

export const CustomLegend = styled.legend.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    /* padding-bottom: 0.5em; */
    padding: 0 7px;
    /* padding: 0; */
    margin: 0;
    visibility: hidden;
    bottom: 0.5em;
    max-width: 100%;
    ${props =>
        !props.visible &&
        `
        padding: 0;
        max-width: 0.01px;
    `};

    width: auto;
    height: 11px;
    font-size: 14.4px;
    -webkit-transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    white-space: nowrap;
`;

export const BaseInputStyle = styled.input`
    margin: 0;
    margin-top: 5px;
    padding: 0 0.7em;
    /* padding-bottom: 0.4em; */
    ${props =>
        props.as === "textarea" && `margin-top: 21px; margin-bottom: 0.7em;`};
    /* border: 2px solid black; */
    position: relative;
    color: ${props => (props.color ? props.color : "white")};
    font-size: 16px;
    /* flex: 1; */
    /* z-index: 5; */
    background: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
    /* height: 100%; */
    width: 100%;

    /* border: none; */
    box-sizing: border-box;
    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-internal-autofill-previewed {
        -webkit-transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: ${props =>
            props.theme.colours.primary} !important;
    }
    cursor: auto; // causes default cursor when hovering over scrollbar
    ${props =>
        props.adornmentWidth &&
        `width: calc(100% - ${props.adornmentWidth}px);`};

    ${props => props.as === "textarea" && `resize: none;`}
`;

const InputLabel = styled(motion.div)`
    padding: 0;
    margin: 0;
    position: absolute;
    transform-origin: left;
    color: gray;
    left: 12px;
    top: 21px;
    font-size: 16px;
    /* ${props =>
        props.focused && `top: -5px; left: 20px; font-size: 14.4px;`}; */
    /* transition: font-size 0.15s; */
    z-index: 0;
`;

const TextfieldWrapper = styled.div.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    display: flex;
    position: relative;
    /* z-index: 50; */
    height: 100%;
    width: 100%;
    /* border: 1px solid red; */
    ${props => !props.multiline && `min-height: ${props.height || "64px"};`};
`;

const Container = styled.label.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    /* border: 1px solid green; */
    ${props => props.width && `width: ${props.width};`};
    ${props => props.fullwidth && `width: 100%;`};
    ${props => props.height && `height: ${props.height};`};
    ${props => props.fullheight && `height: 100%;`}
`;

export const Textfield = forwardRef(
    (
        { label, onChange, onClick, onBlur, required, color, ...props }: any,
        ref
    ) => {
        const [focused, setFocused] = React.useState(false);
        const [mouseEntered, setMouseEntered] = React.useState(false);

        // React.useEffect(() => {
        //     console.log(ref.current);
        // }, []);

        const LabelVariants = {
            focused: {
                x: 9,
                y: -26,
                fontSize: "14.4px",
                color: props.error
                    ? Theme.colours.error
                    : focused
                    ? Theme.colours.secondary
                    : Theme.colours.primaryFaded,
                transition: {
                    duration: 0.15,
                },
            },
        };

        return (
            <Container {...props}>
                <TextfieldWrapper
                    // onMouseDown={e => {
                    //     setFocused(true);
                    // }}
                    {...props}
                    onMouseOver={e => {
                        // console.log("mouse over");

                        setMouseEntered(true);
                        props.onMouseOver && props.onMouseOver(e);
                    }}
                    onMouseLeave={e => {
                        setMouseEntered(false);
                        props.onMouseLeave && props.onMouseLeave(e);
                    }}>
                    <CustomFieldset
                        focused={focused}
                        mouseEntered={mouseEntered}
                        {...props}>
                        <CustomLegend
                            visible={
                                !!(
                                    focused ||
                                    (props.value && props.value.length) ||
                                    (ref && ref.current?.value?.length > 0)
                                )
                            }>
                            {required ? `${label} *` : label}
                        </CustomLegend>
                    </CustomFieldset>
                    <InputLabel
                        initial={false}
                        variants={LabelVariants}
                        animate={
                            !!(
                                focused ||
                                (props.value && props.value.length) ||
                                (ref && ref.current?.value?.length > 0)
                            )
                                ? "focused"
                                : undefined
                        }>
                        {required ? `${label} *` : label}
                    </InputLabel>
                    <BaseInput
                        ref={ref}
                        type="text"
                        {...props}
                        onChange={e => {
                            onChange && onChange(e);
                        }}
                        onFocus={e => {
                            setFocused(true);
                        }}
                        onClick={e => {
                            // setFocused(true);
                            onClick && onClick(e);
                        }}
                        onBlur={e => {
                            // console.log(e);

                            if (!props.inAutoComplete) {
                                setFocused(false);
                                onBlur && onBlur(e);
                            }
                        }}
                    />
                </TextfieldWrapper>
                {props.error && focused && (
                    <ErrorText>
                        {props.helperText ? props.helperText : "Invalid input"}
                    </ErrorText>
                )}
            </Container>
        );
    }
);

export default Textfield;
