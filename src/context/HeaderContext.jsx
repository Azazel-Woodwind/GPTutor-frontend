import { createContext, useContext } from "react";
import React from "react";

/**
 * Context for managing the state and behavior of the application header.
 */
const HeaderContext = createContext({
    showHeader: true,
    setShowHeader: () => {},
    showBoxShadow: false,
    setShowBoxShadow: () => {},
    handleScroll: () => {},
    showMainHeader: true,
    setShowMainHeader: () => {},
    setHovering: () => {},
});

/**
 * Provider component for the HeaderContext.
 * Manages the visibility and appearance of the header based on scroll and hover interactions.
 *
 * @param {ReactNode} children - The child components to be rendered within the provider.
 * @returns {ReactNode} A context provider wrapping children.
 */
export function HeaderContextProvider({ children }) {
    const [showHeader, setShowHeader] = React.useState(true);
    const [showBoxShadow, setShowBoxShadow] = React.useState(false);
    const [showMainHeader, setShowMainHeader] = React.useState(true);
    const [hovering, setHovering] = React.useState(false);

    const lastScrollTop = React.useRef(0);
    const showHeaderTimer = React.useRef(null);

    const handleScroll = e => {
        const scrollTop = e.target.scrollTop;

        if (scrollTop > 32) {
            setShowBoxShadow(true);
        } else {
            setShowBoxShadow(false);
        }

        if (scrollTop > lastScrollTop.current) {
            if (scrollTop > 32) {
                setShowHeader(false);
            }
        } else {
            setShowHeader(true);
            if (scrollTop > 32) {
                clearTimeout(showHeaderTimer.current);
                showHeaderTimer.current = setTimeout(() => {
                    setShowHeader(false);
                }, 3000);
            }
        }
        lastScrollTop.current = Math.max(scrollTop, 0);
    };

    React.useEffect(() => {
        // console.log(showHeader, showBoxShadow, hovering);
        clearTimeout(showHeaderTimer.current);
        if (showHeader && showBoxShadow && !hovering) {
            showHeaderTimer.current = setTimeout(() => {
                setShowHeader(false);
            }, 3000);
        }

        return () => {
            clearTimeout(showHeaderTimer.current);
        };
    }, [showHeader, showBoxShadow, hovering]);

    return (
        <HeaderContext.Provider
            value={{
                showHeader,
                setShowHeader,
                showBoxShadow,
                setShowBoxShadow,
                handleScroll,
                showMainHeader,
                setShowMainHeader,
                setHovering,
            }}>
            {children}
        </HeaderContext.Provider>
    );
}

/**
 * Custom hook to access the HeaderContext.
 *
 * @returns {Object} The context data containing header state and control functions.
 */
export function useHeader() {
    return useContext(HeaderContext);
}
