import { SocketContext } from "../../context/SocketContext";

import { useState, useEffect } from "react";

import React from "react";
import useX from "./useX";

function useXConversation(props) {
    const { Socket } = React.useContext(SocketContext);

    const X = useX({
        channel: "chat",
        ...props,
    });

    React.useEffect(() => {
        Socket.on("navigate", path => {
            console.log("NAVIGATING");
            X.sendSystemMessage(`Navigated you to: ${path}`);
        });

        Socket.emit("start_chat");

        return () => {
            Socket.off("navigate");
        };
    }, []);

    return {
        ...X,
    };
}

export default useXConversation;
