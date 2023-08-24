import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import SvgLinearGradient from "../SvgLinearGradient";

export const fontSizeOptions = ["sm", "md", "lg", "xl", "xxl", "xxxl"];

export const getFontSize = size => {
    switch (size) {
        case "sm":
            return "0.75rem";
        case "md":
            return "1rem";
        case "lg":
            return "1.25rem";
        case "xl":
            return "24px";
        case "xxl":
            return "1.875rem";
        case "xxxl":
            return "45px";
        default:
            return "1rem";
    }
};

const BaseButtonStyles = css`
    font-size: ${props => getFontSize(props.size)};
    padding: 0.8em 2em;
`;

const OutlinedButtonStyle = styled(motion.button)`
    ${BaseButtonStyles}
    position: relative;
    background-color: transparent;
    border: none;
    ${props => !props.disabled && "cursor: pointer;"}
    /* overflow: hidden; */
    outline: none;
    /* border: 2px solid red; */
    width: fit-content;
    padding: 0;
`;

const ButtonText = styled.span`
    position: relative;
    z-index: 1;
    color: ${props => (props.disabled ? "gray" : "transparent")};
    ${props => props.theme.gradient({ animationLength: 5 })}
    -webkit-background-clip: text;
    pointer-events: none;
    font-weight: 600;
`;

const SvgBorder = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    /* border: 2px solid blue; */
    overflow: visible;
`;

const FilledButtonStyle = styled(motion.button)`
    ${BaseButtonStyles}

    display: flex;
    justify-content: center;
    align-items: center;

    border: unset;
    outline: unset;

    color: white;
    z-index: 10;

    border-radius: 0.625rem;
    ${props =>
        props.disabled
            ? "background-color: rgb(0, 0, 0, 0.1); color: gray;"
            : `${
                  props.type === "error"
                      ? `background-color: ${props.theme.colours.error};`
                      : props.theme.gradient({
                            animationLength: 5,
                        })
              }; cursor: pointer;`}

    transition: all 0.2s;
    /* background: rgba(255, 255, 255, 0); */
    // how do i get this to work?
    /* background: ${props => props.theme.linearGradient}; */
    //  background: -moz-linear-gradient(
    //   45deg,/ shiieee
    // imagine doing css ngl couldnt be me
    // nyash job
    // lmaooo
    // common kei L?
    // HAHA as if you werent going on about the fucking 0.01% change in colou9r of the
    // mky bad if orgot youre colour blind and deaf somehow
    // OMG we need it to be purple not slight purple blue >:(((())))
    // mb forgot you didnt grow up with a father not your fault
    // mb forgot your forehead is thicker than your skull
    //mb just remembered oyu got HARD abused as a kid absolutrely your fault id abuse too tbh
    // just remember LMAO pls no more im crying rn sorry lil bro didnt mean to hurt your feelings
    // what's wrong baby bro? mad?
    // seething perhaps????
    // smaller bro acting up today
    // talking a lot for skinniest boi from jamaica
    // lit not allowed within 400m of any highschool for a good reasn
    // this is some r/reddit thread LMFAO

    // mb forgot you were negleceted as a child adn thrown in the attic
    // mb just remember you got HARD dicked down by your parents
    // living in the attic life??
    //HAHA bad?
    // baby bro talking a lot these days?
    // talking a lot for chonkiest kid in town, moving like you domnt break every weighing scale you stand on into
    // millions of subatomic particles
    // HAHAHA ;) I know that's not the part she got tired of HAHAHAHA def not in the way oyu mean :))
    // couldnt handle getting dicked down more than twice a day was moving mad
    // PLS bro im
    // aahhh
    //alhhhhh
    //a hhh
    /* /all -moz-outline-radius-topright: ::afterl

HAHHA shieeet */
    // oui;
    // oui
    // oui
    // oui

    // sure your ex didnt get tired of your fucking elephant mutumbu chonkiness beyond belief ? ? ? ? ?? ? ?
    // HAHAHA is it
    // anyw fucker let me test this shit.
    // i can tellays
    // calm down bro
    // desolé
`;

const IconSvg = styled.svg`
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* transform: translateY(-50%); */
`;

function OutlinedButton(props) {
    const [hovering, setHovering] = useState(false);
    const [buttonWidth, setButtonWidth] = React.useState(undefined);
    const [buttonHeight, setButtonHeight] = React.useState(undefined);

    const containerRef = React.useRef(null);

    const borderGradientID = useMemo(nanoid, []);
    const iconGradientID = useMemo(nanoid, []);

    const borderWidth = props.borderWidth || 3;

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver((entries, observer) => {
            setButtonHeight(containerRef?.current?.offsetHeight);
            setButtonWidth(containerRef?.current?.offsetWidth);
            // console.log("entries:", entries);
            // console.log("observer:", observer);
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <OutlinedButtonStyle
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            ref={containerRef}
            {...props}
            style={{
                padding: `${props.paddingY || 0.8}rem ${
                    props.paddingX || 1.5
                }rem`,
                margin: `${borderWidth}px`,
            }}>
            <SvgBorder>
                <defs>
                    <SvgLinearGradient gradientID={borderGradientID} />
                </defs>
                <rect
                    x={0}
                    y={0}
                    width={buttonWidth || 0}
                    height={buttonHeight || 0}
                    rx="10"
                    fill={
                        props.disabled
                            ? "rgb(0, 0, 0, 0.1)"
                            : hovering
                            ? "rgb(39, 46, 95)"
                            : "none"
                    }
                    stroke={
                        props.disabled ? "gray" : `url(#${borderGradientID})`
                    }
                    strokeWidth={borderWidth}
                />
            </SvgBorder>
            {props.viewboxWidth && props.viewboxHeight && props.paths ? (
                <IconSvg
                    viewBox={`0 0 ${props.viewboxWidth} ${props.viewboxHeight}`}
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <SvgLinearGradient gradientID={iconGradientID} />
                    </defs>
                    {props.paths.map((path, i) => (
                        <path
                            key={i}
                            fill={`url(#${iconGradientID})`}
                            d={path}></path>
                    ))}
                </IconSvg>
            ) : (
                <ButtonText disabled={props.disabled}>
                    {props.children}
                </ButtonText>
            )}
        </OutlinedButtonStyle>
    );
}

function FilledButton(props) {
    return <FilledButtonStyle {...props}>{props.children}</FilledButtonStyle>;
}

const Button = props => {
    if (!props.disabled) {
        props = {
            ...props,
            whileHover: {
                scale: props.whileHoverScale || 1.03,
                transition: { duration: 0.1 },
            },
            whileTap: {
                scale: props.whileTapScale || 0.95,
                transition: { duration: 0.1 },
            },
        };
    }

    if (props.outline) {
        return <OutlinedButton {...props} />;
    }
    return <FilledButton {...props} />;
};

export default Button;
