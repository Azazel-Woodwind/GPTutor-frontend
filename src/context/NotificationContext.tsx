import React from "react";
import Notification from "../components/Notification";

export const NotificationContext = React.createContext({
    sendNotification: () => {},
});

export function NotificationContextProvider({ children }: any) {
    const [notifications, setNotifications] = React.useState([]);

    const sendNotification = props => {
        setNotifications(prev => [
            ...prev,
            <Notification key={Date.now()} {...props} />,
        ]);
        setTimeout(
            () => setNotifications(prev => prev.slice(1)),
            (props.duration + 3 || 8) * 1000
        );
    };

    return (
        <NotificationContext.Provider value={{ sendNotification }}>
            {notifications}
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const { sendNotification } = React.useContext(NotificationContext);

    return sendNotification;
}
