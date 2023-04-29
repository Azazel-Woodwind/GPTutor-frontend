import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import SvgLinearGradient from "./SvgLinearGradient";

const IconButtonStyle = styled(motion.div)`
    position: relative;
    width: 2.4em;
    height: 2.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-right: 0.7em; */

    /* border: 1px solid black; */
    border-radius: 50%;
    z-index: 20;

    color: ${props => props.theme.colours.primaryStrong};

    /* ${props =>
        !props.disabled &&
        `
        cursor: pointer;
        background-image: radial-gradient(ellipse at center, #ffffff20, #ffffff20);
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: 0% 0%;
        transition: background-size 1s ease-in-out;
        :hover, :focus {
            border none;
            outline: none;
            background-size: 100% 100%;
        }
        `} */

    ${props =>
        !props.disabled &&
        `
        cursor: pointer;
        ::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            scale: 0;
            border-radius: 50%;
            background-color: #ffffff20;
            transition: scale 0.5s ease;
        }
        
        :hover::after, :focus::after {
            scale: 1;
        }

        :active::after {
            scale: 1;
        }

        :hover, :focus {
            outline: none;
        }
        `}
`;

export const IconSvg = styled.svg`
    width: ${props => props.iconSize - 2 * props.borderWidth}px;
    height: ${props => props.iconSize - 2 * props.borderWidth}px;
    /* width: 80px;
    height: 80px; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* border: 2px solid black; */
`;

export const BorderSvg = styled.svg`
    width: 100%;
    height: 100%;
`;

export const Container = styled.div`
    position: relative;
    width: ${props => props.width || 20}px;
    height: ${props => props.height || 20}px;
    min-width: ${props => props.width || 20}px;
    min-height: ${props => props.height || 20}px;
    cursor: pointer;
    /* border: 1px solid black; */
`;

function OutlinedIconButton({
    width,
    height,
    iconSize,
    borderWidth,
    viewboxWidth,
    viewboxHeight,
    paths,
    scale,
    ...props
}) {
    if (!props.disabled) {
        props = {
            ...props,
            whileFocus: { scale: 1.1, transition: { duration: 0.2 } },
            whileHover: { scale: 1.1, transition: { duration: 0.2 } },
            whileTap: { scale: 0.95 },
        };
    }

    const [hovering, setHovering] = React.useState(false);

    const gradientID1 = React.useMemo(nanoid, []);
    const gradientID2 = React.useMemo(nanoid, []);

    scale = scale || 1;
    width = scale * (width || 35);
    height = scale * (height || 35);
    borderWidth = scale * (borderWidth || 2);
    iconSize = scale * (iconSize || 20);

    return (
        <Container
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            as={motion.div}
            width={width}
            height={height}
            {...props}>
            <BorderSvg viewBox={`0 0 ${width} ${height}`}>
                <defs>
                    <SvgLinearGradient gradientID={gradientID1} />
                </defs>
                <rect
                    x={borderWidth / 2}
                    y={borderWidth / 2}
                    width={width - borderWidth}
                    height={height - borderWidth}
                    rx="7"
                    fill={hovering ? "rgb(39, 46, 95)" : "none"}
                    stroke={`url(#${gradientID1})`}
                    strokeWidth={borderWidth}
                />
            </BorderSvg>
            <IconSvg
                iconSize={iconSize}
                borderWidth={borderWidth}
                viewBox={`0 0 ${viewboxWidth} ${viewboxHeight}`}
                focusable="false"
                xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <SvgLinearGradient gradientID={gradientID2} />
                </defs>
                {paths.map((path, i) => (
                    <path key={i} fill={`url(#${gradientID2})`} d={path}></path>
                ))}
            </IconSvg>
        </Container>
    );
}

function BasicIconButton(props) {
    return (
        <IconButtonStyle
            onMouseDown={e => e.preventDefault()}
            onMouseOver={e => e.currentTarget.blur()}
            {...props}>
            {props.children}
        </IconButtonStyle>
    );
}

export default function IconButton(props) {
    if (props.outline) {
        return <OutlinedIconButton {...props} />;
    }

    return <BasicIconButton {...props} />;
}
