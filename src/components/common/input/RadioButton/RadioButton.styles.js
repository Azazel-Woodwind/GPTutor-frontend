import styled, { css } from "styled-components";

export const RadioButtonContainer = styled.label`
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

export const RadioButtonContainer2 = styled.div`
    position: relative;
    /* cursor: pointer; */
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RadioButtonInput = styled.input`
    margin: 0;
    visibility: hidden;
    position: absolute;
`;

export const CustomRadioButton = styled.span`
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
        css`
            :before {
                content: "";
                width: 0.625rem;
                height: 0.625rem;
                border-radius: 50%;
                position: absolute;
                ${props.theme.gradient({ animationLength: 5 })}
                scale: 0;
                transition: scale 0.5s ease;

                ${props.hovering && !props.disabled && "scale: 1;"}
            }
        `}
`;

export const RadioButtonLabel = styled.div.withConfig({
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
    background-clip: text;

    ::after {
        display: block;
        content: attr(content);
        font-weight: bold;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
`;

export const SvgBorder = styled.svg`
    position: absolute;
    width: 1.875rem;
    height: 1.875rem;
    pointer-events: none;
    z-index: 2;
    ${props => (props.checked ? `opacity: 1;` : `opacity: 0;`)}
    transition: opacity 0.5s;
    /* border: 1px solid red; */
`;
