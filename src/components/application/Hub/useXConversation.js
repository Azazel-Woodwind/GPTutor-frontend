import { SocketContext } from "@/context/SocketContext";
import React from "react";
import useX from "@/hooks/useX";
import { useChatContext } from "@/context/ChatContext";
import { useAuth } from "@/context/SessionContext";
import UserAPI from "@/api/UserAPI";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "@/api/configs/supabase";

/**
 * useXConversation - A custom React hook for managing chat conversations.
 * This hook integrates various contexts and APIs to handle chat functionalities,
 * navigation, and session management. It depends on the external `useX` hook for
 * chat-related operations and state management.
 *
 * @param {Object} props - Properties passed to configure the hook.
 * @returns {Object} An object containing the properties and methods from the `useX` hook,
 *                   along with additional chat conversation functionalities.
 * @see useX for the underlying chat functionality.
 * @see SocketContext for socket connection handling.
 * @see useChatContext for context related to chat UI.
 * @see useAuth for authentication state management.
 * @see useLocation, useNavigate from "react-router-dom" for routing functionalities.
 * @see UserAPI, supabase for user data and session management.
 */
function useXConversation(props) {
    const { Socket } = React.useContext(SocketContext);
    const chatStarted = React.useRef(false);
    const { session } = useAuth();
    const location = useLocation();

    const navigate = useNavigate();

    const [inIntroduction, setInIntroduction] = React.useState(
        session.user.new
    );

    const X = useX({
        channel: "chat",
        ...props,
    });

    const { width } = useChatContext();

    React.useEffect(() => {
        if (!inIntroduction) return;

        if (X.history.length === 4) {
            setInIntroduction(false);
        }
    }, [X.history]);

    React.useEffect(() => {
        if (!inIntroduction) return;

        // console.log(X.speaking, X.history.length);

        let timeout;

        if (
            X.history.length === 3 &&
            !X.speaking &&
            location.pathname !== "/lessons"
        ) {
            navigate("/lessons");
            timeout = setTimeout(() => {
                Socket.emit("chat_moved_to_lessons");
            }, 1000);
        }

        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [X.history, X.speaking]);

    React.useEffect(() => {
        const unsubscribe = width.on("change", latest => {
            if (latest > 0 && !chatStarted.current) {
                chatStarted.current = true;
                Socket.emit("start_chat", { new: session.user.new });
                UserAPI.setUsed();
                supabase.auth.refreshSession();

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
