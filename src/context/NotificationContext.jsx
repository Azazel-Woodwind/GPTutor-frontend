import React from "react";
import styled from "styled-components";
import Notification from "../components/common/feedback/Notification";

/**
 * Styled container for notifications.
 */
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

/**
 * Context for managing notifications.
 */
export const NotificationContext = React.createContext({
    sendNotification: () => {},
});

/**
 * Provider component for the NotificationContext.
 * Manages the display and state of notifications.
 *
 * @param {ReactNode} children - The child components to be rendered within the provider.
 * @returns {ReactNode} A context provider wrapping children.
 */
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

/**
 * Custom hook to access the NotificationContext.
 *
 * @returns {Object} The context data containing the sendNotification function.
 */
export function useNotification() {
    return React.useContext(NotificationContext);
}
