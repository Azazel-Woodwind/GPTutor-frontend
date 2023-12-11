import React from "react";
import styled from "styled-components";
import Notification from "../components/common/feedback/Notification";

const NotificationsContainer = styled.div`
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
    gap: 0.5rem;
    z-index: 1000;

    /* border: 3px solid red; */
`;

export const NotificationContext = React.createContext({
    sendNotification: () => {},
});

export function NotificationContextProvider({ children }) {
    const [notifications, setNotifications] = React.useState([]);

    const sendNotification = props => {
        const key = Date.now();
        setNotifications(prev => [
            ...prev,
            <Notification
                key={key}
                onEnd={() => {
                    setNotifications(prev =>
                        prev.filter(notification => notification.key != key)
                    );
                }}
                {...props}
            />,
        ]);
    };

    return (
        <NotificationContext.Provider value={{ sendNotification }}>
            {notifications.length > 0 && (
                <NotificationsContainer>{notifications}</NotificationsContainer>
            )}

            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const { sendNotification } = React.useContext(NotificationContext);

    return sendNotification;
}
