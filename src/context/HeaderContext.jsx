import { createContext, useContext } from "react";
import React from "react";

const HeaderContext = createContext();

export function useHeader() {
    return useContext(HeaderContext);
}

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
