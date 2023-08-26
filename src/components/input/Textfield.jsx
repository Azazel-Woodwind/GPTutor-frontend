import React, { forwardRef } from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import Theme from "../../styles/Theme";
import { CheckSvgData, CrossSvgData } from "../../lib/svgIconData";
import SvgIcon from "../SvgIcon";
import { TextWrapper } from "../../styles/TextWrappers";
import {
    CONTAINS_LOWERCASE_REGEX,
    CONTAINS_NUMBER_REGEX,
    CONTAINS_SPECIAL_CHARACTER_REGEX,
    CONTAINS_UPPERCASE_REGEX,
    PASSWORD_LENGTH_REGEX,
} from "../../lib/regexes";
import { TextInput } from "./TextInput";
import Collapse from "../Collapse";

const LEGEND_FONT_SIZE = "0.9em";

export const ErrorText = styled.div`
    color: ${props => props.theme.colours.error};
    font-size: 0.94em;
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
`;

export const CustomLegend = styled.legend.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    padding: 0 0.4em;
    visibility: hidden;
    max-width: 100%;
    ${props =>
        !props.visible &&
        `
        padding: 0;
        max-width: 0.01px;
    `};

    width: auto;
    height: 0.69em;
    font-size: ${LEGEND_FONT_SIZE};
    -webkit-transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    white-space: nowrap;
`;

const InputLabel = styled(motion.div)`
    position: absolute;
    transform-origin: left;
    color: gray;
    left: 0.75em;
    top: 1.375em;
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
    min-height: 4em;
    ${props => props.multiline && "padding-bottom: 0.69em;"};
`;

const Label = styled.label.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    position: relative;
    display: inline-block;
    width: 100%;
    flex: 1;
`;

export const Textfield = forwardRef(
    (
        {
            label,
            onChange,
            onClick,
            onFocus,
            onBlur,
            onKeyDown,
            required,
            color,
            fontSize,
            ...props
        },
        ref
    ) => {
        const [focused, setFocused] = React.useState(false);
        const [mouseEntered, setMouseEntered] = React.useState(false);

        const inputRef = React.useRef(null);

        const LabelVariants = {
            focused: {
                x: "0.69em",
                y: "-1.625em",
                // fontSize: `${0.9 * HTML_FONT_SIZE_IN_PX}px`,
                fontSize: LEGEND_FONT_SIZE,
                color: props.error
                    ? Theme.colours.error
                    : focused
                    ? Theme.colours.secondary
                    : Theme.colours.primaryFaded,
                transition: {
                    duration: 0.15,
                },
            },
            unfocused: {
                x: "0em",
                y: "0em",
                fontSize: `1em`,
                color: "gray",
            },
        };

        // console.log(props.value, ref?.current?.value);

        return (
            <TextfieldContainer fontSize={fontSize} {...props}>
                <Label {...props}>
                    <TextfieldWrapper
                        {...props}
                        onMouseOver={e => {
                            if (props.disabled) return;
                            // console.log("mouse over");
                            setMouseEntered(true);
                            props.onMouseOver && props.onMouseOver(e);
                        }}
                        onMouseLeave={e => {
                            if (props.disabled) return;
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
                                    : "unfocused"
                            }>
                            {required ? `${label} *` : label}
                        </InputLabel>
                        <TextInput
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
                            onKeyDown={e => {
                                onKeyDown && onKeyDown(e);
                            }}
                            inTextfield={true}
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
    font-size: ${props => props.fontSize || "1em"};
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
    width: 1.875em;
    height: 1.875em;
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
    padding: 0.625em;
    display: flex;
    flex-direction: column;
    gap: 0.625em;
`;

export default Textfield;
