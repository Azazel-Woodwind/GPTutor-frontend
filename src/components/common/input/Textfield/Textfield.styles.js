import styled from "styled-components";
import { motion } from "framer-motion";

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

export const LEGEND_FONT_SIZE = "0.9em";
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

export const InputLabel = styled(motion.div)`
    position: absolute;
    transform-origin: left;
    color: rgb(128, 128, 128);
    left: 0.75em;
    top: 1.375em;
    z-index: 0;
`;

export const TextfieldWrapper = styled.div.withConfig({
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

export const Label = styled.label.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["name", "value"].includes(prop) && defaultValidatorFn(prop),
})`
    position: relative;
    display: inline-block;
    width: 100%;
    flex: 1;
`;

export const TextfieldContainer = styled.div`
    font-size: ${props => props.fontSize || "1em"};
    display: flex;
    flex-direction: column;
    ${props => props.width && `width: ${props.width};`};
    ${props => props.fullwidth && `width: 100%;`};
    ${props => props.height && `height: ${props.height};`};
    ${props => props.fullheight && `height: 100%;`}
`;
