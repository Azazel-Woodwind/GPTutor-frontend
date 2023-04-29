import React from "react";
import Notification from "../components/Notification";
import styled from "styled-components";

const NotificationsContainer = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: fit-content;
    gap: 0.5em;
    z-index: 1000;

    /* border: 3px solid red; */
`;

export const NotificationContext = React.createContext({
    sendNotification: () => {},
});

export function NotificationContextProvider({ children }: any) {
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
