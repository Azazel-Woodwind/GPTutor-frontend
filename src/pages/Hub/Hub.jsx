import React from "react";
import useConversationDisplay from "../../hooks/useConversationDisplay";
import { animate } from "framer-motion";
import { ChatContext } from "../../context/ChatContext";

const Hub = () => {
    useConversationDisplay(true);

    const { width } = React.useContext(ChatContext);

    React.useEffect(() => {
        return () => {
            animate(width, 0, {
                duration: 0.5,
            });
        };
    }, []);

    return <></>;
};

export default Hub;
