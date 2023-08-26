import React from "react";
import styled from "styled-components";
import IconButton from "./IconButton";
import { EyeOutline } from "@styled-icons/evaicons-outline/EyeOutline";
import { EyeOffOutline } from "@styled-icons/evaicons-outline/EyeOffOutline";

export const TextInput = React.forwardRef(
    ({ type, multiline, ...props }, ref) => {
        const [wrapper, setRef] = React.useState(undefined);
        const [visible, setVisible] = React.useState(false);
        const [endAdornmentWidth, setEndAdornmentWidth] = React.useState(0);

        React.useEffect(() => {
            setEndAdornmentWidth(wrapper?.getBoundingClientRect().width);
        });

        const callback = React.useCallback(node => {
            if (node !== null) {
                setRef(node);
            }
        }, []);

        return (
            <>
                <TextInputStyle
                    {...props}
                    autocomplete="off"
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
                        <span style={{ paddingRight: "0.7em" }} ref={callback}>
                            <IconButton
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        setVisible(!visible);
                                    }
                                }}
                                onClick={e => {
                                    setVisible(!visible);
                                }}>
                                {visible ? (
                                    <EyeOutline size={27} />
                                ) : (
                                    <EyeOffOutline size={27} />
                                )}
                            </IconButton>
                        </span>
                    </EndAdornmentWrapper>
                ) : (
                    props.endAdornment && (
                        <EndAdornmentWrapper>
                            <span ref={callback}>{props.endAdornment}</span>
                        </EndAdornmentWrapper>
                    )
                )}
            </>
        );
    }
);

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
