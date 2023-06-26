import { SocketContext } from "../../context/SocketContext";
import React from "react";
import useX from "./useX";
import { useChatContext } from "../../context/ChatContext";

function useXConversation(props) {
    const { Socket } = React.useContext(SocketContext);
    const chatStarted = React.useRef(false);

    const X = useX({
        channel: "chat",
        ...props,
    });

    const { width } = useChatContext();

    React.useEffect(() => {
        const unsubscribe = width.on("change", latest => {
            if (latest > 0 && !chatStarted.current) {
                chatStarted.current = true;
                Socket.emit("start_chat");
                unsubscribe();
            }
        });

        return unsubscribe;
    }, []);

    React.useEffect(() => {
        Socket.on("navigate", path => {
            console.log("NAVIGATING");
            X.sendSystemMessage(`Navigated you to: ${path}`);
        });

        // Socket.emit("start_chat");

        return () => {
            Socket.off("navigate");
        };
    }, []);

    return {
        ...X,
    };
}

export default useXConversation;
