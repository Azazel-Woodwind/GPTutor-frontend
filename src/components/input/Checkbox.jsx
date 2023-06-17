import { nanoid } from "nanoid";
import React from "react";
import styled from "styled-components";
import SvgLinearGradient from "../SvgLinearGradient";
import Theme from "../../styles/Theme";
import CenteredRow from "../../styles/containers/CenteredRow";
import { TextWrapper } from "../../styles/TextWrappers";
import { motion } from "framer-motion";
import { CheckSvgData } from "../../lib/svgIconData";

const SvgCheckbox = styled.svg`
    width: 100%;
    height: 100%;
`;

const Container = styled(motion.div)`
    ${props => props.theme.utils.centeredRow}
    position: relative;
    cursor: pointer;
    gap: 0.4em;
    /* border: 1px solid black; */
    width: fit-content;
`;

const CheckboxContainer = styled.div`
    position: relative;
    width: ${props => (props.size ? props.size : 20)}px;
    height: ${props => (props.size ? props.size : 20)}px;
    /* border: 1px solid black; */
`;

const CheckboxInput = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    cursor: pointer;
`;

const CheckIconWrapper = styled.div`
    width: 95%;
    height: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    /* border: 2px solid black; */
`;

const SvgCheckIcon = styled.svg`
    width: ${props => props.checkboxSize - 2 * props.borderWidth}px;
    height: ${props => props.checkboxSize - 2 * props.borderWidth}px;
    /* width: 80px;
    height: 80px; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
    /* border: 2px solid black; */
`;

function Checkbox(
    { label, checkboxSize, fontSize, checked, onChange, ...props },
    ref
) {
    const [hovering, setHovering] = React.useState(false);

    React.useEffect(() => {
        if (props.checked) {
            setChecked(props.checked);
        }
    }, [props.checked]);

    const gradientID1 = React.useMemo(nanoid, []);
    const gradientID2 = React.useMemo(nanoid, []);

    checkboxSize = checkboxSize || 35;
    const borderWidth = props.borderWidth || 0.1 * checkboxSize;

    return (
        <label>
            <Container
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                whileHover="hover"
                whileTap="tap">
                <CheckboxContainer
                    as={motion.div}
                    variants={{
                        hover: {
                            scale: 1.1,
                            transition: { duration: 0.2 },
                        },
                        tap: {
                            scale: 0.95,
                        },
                    }}
                    size={checkboxSize}>
                    <SvgCheckbox
                        viewBox={`0 0 ${checkboxSize} ${checkboxSize}`}>
                        <defs>
                            <SvgLinearGradient gradientID={gradientID1} />
                        </defs>
                        <rect
                            x={borderWidth}
                            y={borderWidth}
                            width={checkboxSize - borderWidth * 2}
                            height={checkboxSize - borderWidth * 2}
                            rx="7"
                            fill={hovering ? "rgb(39, 46, 95)" : "none"}
                            stroke={`url(#${gradientID1})`}
                            strokeWidth={borderWidth}
                        />
                    </SvgCheckbox>
                    <CheckboxInput
                        {...props}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        ref={ref}
                    />
                    <CheckIconWrapper>
                        <SvgCheckIcon
                            checkboxSize={checkboxSize}
                            borderWidth={borderWidth}
                            viewBox={`0 0 ${CheckSvgData.viewboxWidth} ${CheckSvgData.viewboxHeight}`}
                            focusable="false"
                            xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <SvgLinearGradient gradientID={gradientID2} />
                            </defs>
                            {CheckSvgData.paths.map((path, i) => (
                                <path
                                    key={path}
                                    fill={
                                        checked
                                            ? `url(#${gradientID2})`
                                            : hovering
                                            ? `${Theme.colours.primary}30`
                                            : "none"
                                    }
                                    d={path}></path>
                            ))}
                        </SvgCheckIcon>
                    </CheckIconWrapper>
                </CheckboxContainer>
                {label && (
                    <CheckboxText
                        content={label}
                        fontSize={fontSize || "1.2em"}
                        noWrap
                        color={
                            hovering
                                ? Theme.colours.primary
                                : "rgb(152, 152, 152)"
                        }
                        {...(checked && { mainGradient: true })}>
                        {label}
                    </CheckboxText>
                )}
            </Container>
        </label>
    );
}

const CheckboxText = styled(TextWrapper)`
    ::after {
        display: block;
        content: attr(content);
        font-weight: 500;
        height: 0;
        overflow: hidden;
        visibility: hidden;
    }
`;

export default React.forwardRef(Checkbox);
