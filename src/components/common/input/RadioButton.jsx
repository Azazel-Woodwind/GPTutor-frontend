import { nanoid } from "nanoid";
import React, { forwardRef, useMemo, useState } from "react";
import styled from "styled-components";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";

const RadioButtonContainer = styled.label`
    display: flex;
    align-items: center;
    gap: 0.2rem;
    ${props =>
        !props.disabled &&
        `
        cursor: pointer;

        :hover > div {
            color: ${props.theme.colours.primaryStrong};
        }
    `}
`;

const RadioButtonContainer2 = styled.div`
    position: relative;
    /* cursor: pointer; */
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RadioButtonInput = styled.input`
    margin: 0;
    visibility: hidden;
    position: absolute;
`;

const CustomRadioButton = styled.span`
    /* cursor: pointer; */
    width: ${props => props.size || "1.375rem"};
    height: ${props => props.size || "1.375rem"};
    box-shadow: ${props =>
                props.disabled ? "grey" : props.theme.colours.primaryStrong}
            0px -1px 3px 1px,
        ${props =>
                props.disabled ? "grey" : props.theme.colours.primaryStrong}
            0px 1px 1px 1px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    :after {
        visibility: ${props =>
            props.checked && (!props.transitioning || !props.hovering)
                ? "visible"
                : "hidden"};
        content: "";
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        ${props =>
            props.disabled
                ? "background-color: grey;"
                : props.theme.gradient({ animationLength: 5 })}
    }

    /* ${props =>
        (!props.checked || (props.transitioning && props.hovering)) &&
        `:before {
        content: "";
        width: 0.69rem;
        height: 0.69rem;
        border-radius: 50%;
        ${props.theme.utils.absoluteCentered}
        ${props.theme.gradient({ animationLength: 5 })}
        animation: none;
        transition: background-size 0.5s ease-in-out;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 0% 0%;

        ${props.hovering && "background-size: 100% 100%;"}
    }`} */

    ${props =>
        (!props.checked || (props.transitioning && props.hovering)) &&
        `:before {
        content: "";
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        position: absolute;
        ${props.theme.gradient({ animationLength: 5 })}
        scale: 0;
        transition: scale 0.5s ease;

        ${props.hovering && !props.disabled && "scale: 1;"}
    }`}
`;

const RadioButtonLabel = styled.div.withConfig({
    shouldForwardProp: (prop, defaultValidator) =>
        !["wrap"].includes(prop) && defaultValidator(prop),
})`
    white-space: ${props => (props.wrap ? "normal" : "nowrap")};
    font-size: ${props => props.fontSize || "1.125rem"};
    margin-left: 0.4rem;
    margin-bottom: 0.1rem;
    /* cursor: pointer; */
    ${props => props.theme.gradient({ animationLength: 5 })}
    transition: background 1s;
    color: rgb(150, 150, 150);
    ${props =>
        props.checked &&
        `-webkit-text-fill-color: transparent; font-weight: bold;`}

    ${props => props.disabled && `-webkit-text-fill-color: grey;`}

    -webkit-background-clip: text;

    ::after {
        display: block;
        content: attr(content);
        font-weight: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
`;

const SvgBorder = styled.svg`
    position: absolute;
    width: 1.875rem;
    height: 1.875rem;
    pointer-events: none;
    z-index: 2;
    ${props => (props.checked ? `opacity: 1;` : `opacity: 0;`)}
    transition: opacity 0.5s;
    /* border: 1px solid red; */
`;

const RadioButton = ({ wrap, fontSize, radioButtonSize, ...props }, ref) => {
    const [hovering, setHovering] = React.useState(false);
    const [transitioning, setTransitioning] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const gradientID = useMemo(nanoid, []);

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

export default forwardRef(RadioButton);
