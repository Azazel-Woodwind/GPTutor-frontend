import React from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import IconButton from "./IconButton";

export const BaseInput = React.forwardRef(
    ({ type, multiline, ...props }, ref) => {
        const [wrapper, setRef] = React.useState(undefined);
        const [visible, setVisible] = React.useState(false);
        const [endAdornmentWidth, setEndAdornmentWidth] = React.useState(0);

        React.useEffect(() => {
            setEndAdornmentWidth(wrapper?.getBoundingClientRect().width);
        });

        return (
            <>
                <BaseInputStyle
                    {...props}
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
                        <span
                            style={{ paddingRight: "0.7em" }}
                            ref={ref => setRef(ref)}>
                            <IconButton
                                onMouseDown={e => e.preventDefault()}
                                onMouseOver={e => e.currentTarget.blur()}
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        setVisible(!visible);
                                    }
                                }}
                                onClick={e => {
                                    setVisible(!visible);
                                }}>
                                {visible ? (
                                    <FaEye size="1.4em" />
                                ) : (
                                    <FaEyeSlash size="1.5em" />
                                )}
                            </IconButton>
                        </span>
                    </EndAdornmentWrapper>
                ) : (
                    props.endAdornment && (
                        <EndAdornmentWrapper>
                            <span ref={ref => setRef(ref)}>
                                {props.endAdornment}
                            </span>
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

export const BaseInputStyle = styled.input`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
    margin: 0;
    /* margin-top: 5px;  */
    padding: 0 0.7em;
    /* padding-bottom: 0.4em; */
    ${props =>
        props.as === "textarea" && `margin-top: 21px; margin-bottom: 0.7em;`};
    /* border: 2px solid black; */
    position: relative;
    color: ${props => (props.color ? props.color : "white")};
    font-size: 16px;
    /* flex: 1; */
    /* z-index: 5; */
    background: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
    /* height: 100%; */
    width: 100%;

    /* border: none; */
    box-sizing: border-box;
    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-internal-autofill-previewed {
        -webkit-transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: ${props =>
            props.theme.colours.primary} !important;
    }
    cursor: auto; // causes default cursor when hovering over scrollbar
    ${props =>
        props.adornmentWidth &&
        `width: calc(100% - ${props.adornmentWidth}px);`};

    ${props => props.as === "textarea" && `resize: none;`}
`;
