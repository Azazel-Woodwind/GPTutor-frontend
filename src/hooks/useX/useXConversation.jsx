import { SocketContext } from "../../context/SocketContext";
import React from "react";
import useX from "./useX";
import { useChatContext } from "../../context/ChatContext";
import { useAuth } from "../../context/SessionContext";
import UserAPI from "../../api/UserAPI";
import {
    useLocation,
    useNavigate,
} from "react-router-dom/dist/umd/react-router-dom.development";
import supabase from "../../api/configs/supabase";

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
