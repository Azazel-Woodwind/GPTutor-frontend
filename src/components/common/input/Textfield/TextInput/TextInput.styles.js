import styled from "styled-components";

export const EndAdornmentWrapper = styled.div`
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

export const TextInputStyle = styled.input.withConfig({
    shouldForwardProp: (prop, defaultValidatorFn) =>
        !["width"].includes(prop) && defaultValidatorFn(prop),
})`
    font-size: 1em;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
    padding: 0 0.7em;
    padding-top: 5px;
    padding-bottom: 2px;
    ${props =>
        props.as === "textarea" &&
        `margin-top: 18px;line-height: 1.5; ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }`};
    position: relative;
    color: ${props => (props.color ? props.color : "white")};
    background: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
    width: 100%;
    box-sizing: border-box;
    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-internal-autofill-previewed {
        -webkit-transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: ${props =>
            props.theme.colours.primary} !important;
    }
    cursor: auto;
    ${props =>
        props.adornmentWidth &&
        `width: calc(100% - ${props.adornmentWidth}px) !important;`};

    ${props => props.as === "textarea" && `resize: none;`}

    ${props =>
        props.inTextfield &&
        `
        ::placeholder {
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
        }
    `}

    :focus::placeholder {
        opacity: 1;
    }

    cursor: ${props => (props.disabled ? "not-allowed" : "auto")};
`;
