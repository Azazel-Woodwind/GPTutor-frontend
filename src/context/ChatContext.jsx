import React from "react";
import { useMotionValue } from "framer-motion";

const defaultWidth = 0;

/**
 * Context for managing chat UI state.
 */
export const ChatContext = React.createContext({
    draggable: true,
    setDraggable: () => {},
    width: defaultWidth,
});

/**
 * Provider component for the ChatContext.
 * It provides state management for chat components, particularly for draggability and width.
 *
 * @param {ReactNode} children - The child components to be rendered within the provider.
 * @returns {ReactNode} A context provider wrapping children.
 */
export function ChatContextProvider({ children }) {
    const width = useMotionValue(defaultWidth);
    const [draggable, setDraggable] = React.useState(true);

    return (
        <ChatContext.Provider value={{ width, draggable, setDraggable }}>
            {children}
        </ChatContext.Provider>
    );
}

/**
 * Custom hook to access the ChatContext.
 *
 * @returns {Object} The context data containing draggable state, width, and the setDraggable function.
 */
export function useChatContext() {
    return React.useContext(ChatContext);
}
