import { nanoid } from "nanoid";
import React from "react";
import SvgLinearGradient from "@/components/common/graphics/SvgLinearGradient";
import Theme from "@/styles/Theme";
import { motion } from "framer-motion";
import { CheckSvgData } from "@/lib/svgIconData";
import {
    CheckIconWrapper,
    CheckboxContainer,
    CheckboxInput,
    CheckboxText,
    Container,
    SvgCheckIcon,
    SvgCheckbox,
} from "./styles";

/**
 * Checkbox - A custom checkbox component with an optional label and custom styling.
 * This component features a responsive design with hover and tap effects, and utilizes SVG icons.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text to be displayed next to the checkbox.
 * @param {number} props.checkboxSize - The size of the checkbox in pixels.
 * @param {string} props.fontSize - The font size of the label.
 * @param {boolean} props.checked - Indicates whether the checkbox is checked.
 * @param {Function} props.onChange - Function to handle the change event when the checkbox is clicked.
 * @returns {React.Component} A component that renders a custom, interactive checkbox with a label.
 */
function Checkbox(
    { label, checkboxSize, fontSize, checked, onChange, ...props },
    ref
) {
    const [hovering, setHovering] = React.useState(false);

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
                        fontSize={fontSize || "1.2rem"}
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

export default React.forwardRef(Checkbox);
