import { createContext, useContext, useState } from "react";

const HeaderContext = createContext({
    showHeader: true,
    setShowHeader: (showHeader: boolean) => {},
});

export function useHeader() {
    return useContext(HeaderContext);
}

export function HeaderContextProvider({ children }) {
    const [showHeader, setShowHeader] = useState(true);

    return (
        <HeaderContext.Provider value={{ showHeader, setShowHeader }}>
            {children}
        </HeaderContext.Provider>
    );
}
