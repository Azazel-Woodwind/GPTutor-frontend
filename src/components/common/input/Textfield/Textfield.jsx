import React from "react";
import { TextInput } from "./TextInput/TextInput";
import Theme from "@/styles/Theme";
import Collapse from "../../layout/Collapse";
import {
    CustomFieldset,
    CustomLegend,
    ErrorText,
    InputLabel,
    Label,
    TextfieldContainer,
    TextfieldWrapper,
} from "./styles";
import TextInput from "./TextInput/TextInput";
import PasswordInfo from "./PasswordInfo/PasswordInfo";

const LEGEND_FONT_SIZE = "0.9em";

/**
 * Textfield - A custom text input component that provides enhanced user experience features.
 * It includes label animation, focus management, error display, and password information display.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the text field.
 * @param {Function} props.onChange - Callback for when the input value changes.
 * @param {Function} props.onClick - Callback for when the text field is clicked.
 * @param {Function} props.onFocus - Callback for when the text field gains focus.
 * @param {Function} props.onBlur - Callback for when the text field loses focus.
 * @param {Function} props.onKeyDown - Callback for key down events on the text field.
 * @param {boolean} props.required - Indicates if the field is required.
 * @param {string} props.color - The color of the text field.
 * @param {string} props.fontSize - The font size for the text within the text field.
 * @param {Object} ref - Ref object for the text field.
 * @returns {React.Component} A custom text input field component.
 */
function Textfield(
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
) {
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
            color: "rgb(128, 128, 128)",
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
                                    (ref && ref.current?.value?.length > 0) ||
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
                {props.type === "password" && label !== "Confirm Password" && (
                    <Collapse open={props.error && focused}>
                        <PasswordInfo
                            password={props.value ?? ref?.current?.value}
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

export default React.forwardRef(Textfield);
