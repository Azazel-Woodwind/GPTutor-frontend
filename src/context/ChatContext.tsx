import * as React from "react";
import { useMotionValue } from "framer-motion";

const defaultWidth = 600;

export const ChatContext = React.createContext({
    max: true,
    setMax: () => {},
    width: defaultWidth,
});

export function ChatContextProvider({ children }: any) {
    const width = useMotionValue(defaultWidth);
    const [max, setMax] = React.useState(defaultWidth);

    return (
        <ChatContext.Provider value={{ width, max, setMax }}>
            {children}
        </ChatContext.Provider>
    );
}
