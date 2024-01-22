import { nanoid } from "nanoid";
import React from "react";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";
import {
    CustomRadioButton,
    RadioButtonContainer,
    RadioButtonContainer2,
    RadioButtonInput,
    RadioButtonLabel,
    SvgBorder,
} from "./RadioButton.styles";

/**
 * RadioButton - A custom radio button component with enhanced styling and interactive features.
 * It includes a hover state, custom SVG border, and support for label and size customization.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.wrap - If true, allows label text to wrap to the next line.
 * @param {string} props.fontSize - The font size of the label.
 * @param {string} props.radioButtonSize - The size of the radio button.
 * @param {boolean} props.disabled - If true, the radio button will be disabled.
 * @param {boolean} props.checked - Controls the checked state of the radio button.
 * @param {Function} props.onChange - Callback function called when the radio button's value changes.
 * @param {string} props.label - The label text for the radio button.
 * @param {string} props.borderWidth - The width of the border of the SVG circle.
 * @param {React.Ref} ref - Ref object for the radio button.
 * @returns {React.Component} A custom styled radio button component.
 */
const RadioButton = ({ wrap, fontSize, radioButtonSize, ...props }, ref) => {
    const [hovering, setHovering] = React.useState(false);
    const [transitioning, setTransitioning] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const gradientID = React.useMemo(nanoid, []);

    // console.log(props.label, checked);

    return (
        <RadioButtonContainer
            disabled={props.disabled}
            onMouseEnter={() => {
                if (props.disabled) return;
                setHovering(true);
                !(props.checked !== undefined ? props.checked : checked) &&
                    setTransitioning(true);
            }}
            onMouseLeave={() => {
                if (props.disabled) return;
                setHovering(false);
                transitioning && setTransitioning(false);
            }}
            hovering={hovering}>
            <RadioButtonContainer2>
                <SvgBorder
                    checked={
                        props.checked !== undefined ? props.checked : checked
                    }
                    viewBox={`0 0 100 100`}>
                    <defs>
                        <SvgLinearGradient gradientID={gradientID} />
                    </defs>
                    <circle
                        cx={50}
                        cy={50}
                        r={40}
                        fill="none"
                        stroke={props.disabled ? "grey" : `url(#${gradientID})`}
                        strokeWidth={props.borderWidth || 8}
                    />
                </SvgBorder>
                <RadioButtonInput
                    {...props}
                    type="radio"
                    onChange={e => {
                        if (props.disabled) return;
                        // console.log(props.label, "changed");
                        if (props.onChange) {
                            props.onChange(e);
                        } else {
                            setChecked(e.currentTarget.checked);
                        }
                    }}
                    ref={ref}
                />
                <CustomRadioButton
                    size={radioButtonSize}
                    disabled={props.disabled}
                    checked={
                        props.checked !== undefined ? props.checked : checked
                    }
                    hovering={hovering}
                    onTransitionEnd={() => setTransitioning(false)}
                    transitioning={transitioning}
                />
            </RadioButtonContainer2>
            <RadioButtonLabel
                disabled={props.disabled}
                content={props.label}
                checked={props.checked !== undefined ? props.checked : checked}
                hovering={hovering}
                wrap={wrap}
                fontSize={fontSize}>
                {props.label}
            </RadioButtonLabel>
        </RadioButtonContainer>
    );
};

export default React.forwardRef(RadioButton);
