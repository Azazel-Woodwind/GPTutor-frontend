import React, { useCallback } from "react";
import ChatHistory from "../components/ChatHistory";
import Controls from "../components/Controls";
import useAvatar from "./useAvatar";

const useChat = ({ hook }) => {
    const {
        sendMessage,
        history,
        setHistory,
        loading,
        currentMessage,
        sendSystemMessage,
        streaming,
        toggleMute,
        setSpeed,
        multiplier,
    } = hook;

    return {
        ChatHistory: useCallback(
            props => <ChatHistory {...props} hook={hook} />,
            [hook.history, hook.currentMessage]
        ),
        ChatHistoryProps: {},
        Controls: useCallback(props => <Controls {...props} hook={hook} />, []),
        Avatar: AnimatedAvatar,
        AvatarProps: {
            ...hook,
        },
    };
};

export const AnimatedAvatar = ({ multiplier, ...props }) => {
    const { Avatar, pulseX, avatarProps } = useAvatar(props);

    React.useEffect(() => {
        // console.log("multiplier", multiplier);
        pulseX(multiplier);
    }, [multiplier]);

    return <Avatar {...avatarProps} {...props} />;
};

export default useChat;
