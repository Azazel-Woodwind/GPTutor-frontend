import React from "react";
import styled from "styled-components";

const RadioButtonContainer = styled.div`
    display: flex;
    margin-left: 0.5rem;
    align-items: center;
    cursor: pointer;
`;

const RadioButtonContainer2 = styled.label`
    font-size: 14px;
    font-weight: 400;
    -webkit-tap-highlight-color: transparent;

    margin-top: 8px;
    margin-left: -10px;
`;

const RadioButtonInput = styled.input`
    margin: 0;
    visibility: hidden;

    :checked + span {
        box-shadow: white 0px -1px 4px, white 0px 1px 2px;
        box-shadow: ${props => props.theme.colours.primaryStrong} 0px -1px 3px 2px,
            ${props => props.theme.colours.primaryStrong} 0px 1px 2px 2px;
    }

    :checked + span:after {
        opacity: 1;
    }
`;

const CustomRadioButton = styled.span`
    cursor: pointer;
    width: 22px;
    height: 22px;
    //border: 2px solid rgb(255, 255, 255, 0.5);
    box-shadow: ${props => props.theme.colours.primaryStrong} 0px -1px 3px 1px,
        ${props => props.theme.colours.primaryStrong} 0px 1px 1px 1px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    z-index: 1;

    :after {
        content: "";
        width: 12px;
        height: 12px;
        background: ${props => props.theme.colours.primaryStrong};
        border-radius: 50%;
        ${props => props.theme.utils.absoluteCentered}
        opacity: 0;
        transition: opacity 0.2s;
    }
`;

const RadioButtonLabel = styled.label`
    font-size: 18px;
    margin-left: 0.4em;
    margin-top: 0.2em;
    color: ${props => props.theme.colours.primaryFaded};
    cursor: pointer;
    ${props => props.checked && `color: ${props.theme.colours.primaryStrong}`}
`;

const RadioButton = props => {
    const radioButtonRef = React.useRef(null);

    return (
        <RadioButtonContainer onClick={() => props.onClick && props.onClick()}>
            <RadioButtonContainer2>
                <RadioButtonInput
                    ref={radioButtonRef}
                    type="radio"
                    {...props}
                />
                <CustomRadioButton />
            </RadioButtonContainer2>
            <RadioButtonLabel checked={props.checked}>
                {props.label}
            </RadioButtonLabel>
        </RadioButtonContainer>
    );
};

export default RadioButton;
