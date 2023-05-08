import * as React from "react";
import { useMotionValue } from "framer-motion";

const defaultWidth = 0;

export const ChatContext = React.createContext({
    draggable: true,
    setMax: () => {},
    width: defaultWidth,
});

export function ChatContextProvider({ children }: any) {
    const width = useMotionValue(defaultWidth);
    const [draggable, setDraggable] = React.useState(defaultWidth);

    return (
        <ChatContext.Provider value={{ width, draggable, setDraggable }}>
            {children}
        </ChatContext.Provider>
    );
}
