import * as React from "react";

export const ChatContext = React.createContext({
    width: 200,
    setWidth: () => {},
});

export function ChatContextProvider({ children }: any) {
    const [width, setWidth] = React.useState(false);

    return (
        <ChatContext.Provider value={[width, setWidth]}>
            {children}
        </ChatContext.Provider>
    );
}
