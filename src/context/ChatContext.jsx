import * as React from "react";
import { useMotionValue } from "framer-motion";

const defaultWidth = 0;

export const ChatContext = React.createContext({
    draggable: true,
    setDraggable: () => {},
    width: defaultWidth,
});

export function ChatContextProvider({ children }) {
    const width = useMotionValue(defaultWidth);
    const [draggable, setDraggable] = React.useState(true);

    return (
        <ChatContext.Provider value={{ width, draggable, setDraggable }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    return React.useContext(ChatContext);
}
