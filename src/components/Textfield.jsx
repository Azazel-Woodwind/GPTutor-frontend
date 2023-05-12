import React, { forwardRef } from "react";
import styled, { css, useTheme } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Theme from "../styles/Theme";
import CenteredRow from "../styles/containers/CenteredRow";
import { CheckSvgData, CrossSvgData } from "../lib/svgIconData";
import SvgIcon from "./SvgIcon";
import { TextWrapper } from "../styles/TextWrappers";
import {
    CONTAINS_LOWERCASE_REGEX,
    CONTAINS_NUMBER_REGEX,
    CONTAINS_SPECIAL_CHARACTER_REGEX,
    CONTAINS_UPPERCASE_REGEX,
    PASSWORD_LENGTH_REGEX,
} from "../lib/regexes";
import { BaseInput } from "./BaseInput";
import Collapse from "./Collapse";

export const ErrorText = styled.div`
    color: ${props => props.theme.colours.error};
    font-size: 15px;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding-top: 0.35em;
    padding-bottom: 0.625em;
    padding-left: 0.75em;
    padding-right: 0.75em;

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
        border-width: 3px;
    `}

    transition: border-color 0.15s;
    cursor: text;
`;

export const CustomLegend = styled.legend.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    padding: 0 7px;
    margin: 0;
    visibility: hidden;
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

const InputLabel = styled(motion.div)`
    position: absolute;
    transform-origin: left;
    color: gray;
    left: 12px;
    top: 22px;
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
    min-height: 64px;
    ${props => props.multiline && "padding-bottom: 11px;"};
`;

const Label = styled.label.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    /* border: 1px solid green; */
    position: relative;
    display: inline-block;
    width: 100%;
    flex: 1;
    /* height: 100%; */
    /* ${props => props.width && `width: ${props.width};`};
    ${props => props.fullwidth && `width: 100%;`};
    ${props => props.height && `height: ${props.height};`};
    ${props => props.fullheight && `height: 100%;`} */
`;

export const Textfield = forwardRef(
    (
        {
            label,
            onChange,
            onClick,
            onFocus,
            onBlur,
            required,
            color,
            ...props
        },
        ref
    ) => {
        const [focused, setFocused] = React.useState(false);
        const [mouseEntered, setMouseEntered] = React.useState(false);

        const inputRef = React.useRef(null);

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

        // console.log(props.value, ref?.current?.value);

        return (
            <TextfieldContainer {...props}>
                <Label {...props}>
                    <TextfieldWrapper
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
                                        (ref &&
                                            ref.current?.value?.length > 0) ||
                                        (inputRef &&
                                            inputRef.current?.value?.length > 0)
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
                                    (ref && ref.current?.value?.length > 0) ||
                                    (inputRef &&
                                        inputRef.current?.value?.length > 0)
                                )
                                    ? "focused"
                                    : undefined
                            }>
                            {required ? `${label} *` : label}
                        </InputLabel>
                        <BaseInput
                            ref={ref || inputRef}
                            type="text"
                            {...props}
                            onChange={e => {
                                onChange && onChange(e);
                            }}
                            onFocus={e => {
                                setFocused(true);
                                onFocus && onFocus(e);
                            }}
                            onClick={e => {
                                // setFocused(true);
                                onClick && onClick(e);
                            }}
                            onBlur={e => {
                                setFocused(false);
                                onBlur && onBlur(e);
                            }}
                        />
                    </TextfieldWrapper>
                    {props.type === "password" &&
                        label !== "Confirm Password" && (
                            <Collapse open={props.error && focused}>
                                <PasswordInfo
                                    password={
                                        props.value ?? ref?.current?.value
                                    }
                                />
                            </Collapse>
                        )}
                </Label>
                {props.error && focused && props.helperText && (
                    <ErrorText>{props.helperText}</ErrorText>
                )}
            </TextfieldContainer>
        );
    }
);

const TextfieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    ${props => props.width && `width: ${props.width};`};
    ${props => props.fullwidth && `width: 100%;`};
    ${props => props.height && `height: ${props.height};`};
    ${props => props.fullheight && `height: 100%;`}
`;

const PasswordInfoEntryContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const PasswordInfoEntryIcon = styled.div`
    width: 30px;
    height: 30px;
    /* border: 2px solid black; */
`;

function PasswordInfoEntry({ correct, text }) {
    const theme = useTheme();

    return (
        <PasswordInfoEntryContainer>
            <PasswordInfoEntryIcon>
                <SvgIcon
                    svgData={correct ? CheckSvgData : CrossSvgData}
                    fill={correct ? "gradient" : `${theme.colours.error}`}
                    size="100%"
                />
            </PasswordInfoEntryIcon>
            <TextWrapper
                mainGradient={correct}
                color={!correct ? theme.colours.error : undefined}>
                {text}
            </TextWrapper>
        </PasswordInfoEntryContainer>
    );
}

function PasswordInfo({ password }) {
    return (
        <PasswordInfoContainer>
            <PasswordInfoEntry
                correct={PASSWORD_LENGTH_REGEX.test(password)}
                text="Password must be between 8 and 24 characters"
            />
            <PasswordInfoEntry
                correct={CONTAINS_LOWERCASE_REGEX.test(password)}
                text="Password must contain at least 1 lowercase letter"
            />
            <PasswordInfoEntry
                correct={CONTAINS_UPPERCASE_REGEX.test(password)}
                text="Password must contain at least 1 uppercase letter"
            />
            <PasswordInfoEntry
                correct={CONTAINS_NUMBER_REGEX.test(password)}
                text="Password must contain at least 1 number"
            />
            <PasswordInfoEntry
                correct={CONTAINS_SPECIAL_CHARACTER_REGEX.test(password)}
                text="Password must contain at least 1 special character"
            />
        </PasswordInfoContainer>
    );
}

const PasswordInfoContainer = styled.div`
    box-shadow: rgba(76, 72, 72, 0.5) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default Textfield;
