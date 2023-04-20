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
        speaking,
        toggleMute,
        setSpeed,
        multiplier,
    } = hook;

    return {
        ChatHistory: useCallback(
            props => <ChatHistory {...props} hook={hook} />,
            [history, currentMessage]
        ),
        Controls: useCallback(props => <Controls {...props} hook={hook} />, []),
        Avatar: AnimatedAvatar,
        AvatarProps: {
            ...hook,
        },
    };
};

const AnimatedAvatar = ({ multiplier }) => {
    const { Avatar, pulseX, avatarProps } = useAvatar({});

    React.useEffect(() => {
        pulseX(multiplier);
    }, [multiplier]);

    return <Avatar {...avatarProps} />;
};

export default useChat;
