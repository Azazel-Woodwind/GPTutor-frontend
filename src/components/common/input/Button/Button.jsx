import React from "react";
import FilledButton from "./FilledButton";
import OutlinedButton from "./OutlinedButton";

/**
 * Button - A generic button component that can be either filled or outlined.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.disabled - If true, the button is disabled.
 * @param {boolean} props.outline - If true, renders an outlined button, otherwise a filled button.
 * @param {number} props.whileHoverScale - The scale of the button when hovered.
 * @param {number} props.whileTapScale - The scale of the button when tapped or clicked.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @returns {React.Component} - A styled button component based on the provided props.
 */
function Button({
    disabled = false,
    outline = false,
    whileHoverScale = 1.03,
    whileTapScale = 0.95,
    children,
    ...otherProps
}) {
    // Define hover and tap interactions for non-disabled buttons
    const interactiveProps = disabled
        ? {}
        : {
              whileHover: {
                  scale: whileHoverScale,
                  transition: { duration: 0.1 },
              },
              whileTap: {
                  scale: whileTapScale,
                  transition: { duration: 0.1 },
              },
          };

    // Render the outlined or filled button based on the 'outline' prop
    if (outline) {
        return (
            <OutlinedButton {...interactiveProps} {...otherProps}>
                {children}
            </OutlinedButton>
        );
    }
    return (
        <FilledButton {...interactiveProps} {...otherProps}>
            {children}
        </FilledButton>
    );
}

export default Button;
