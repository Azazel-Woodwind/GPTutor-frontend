import React from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/SessionContext";

/**
 * Context for socket connection.
 */
export const SocketContext = React.createContext({
    Socket: null,
});

/**
 * Provider component for SocketContext.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The provider component.
 */
export function SocketContextProvider({ children }) {
    const navigate = useNavigate();
    const [Socket, setSocket] = React.useState(null);

    const { session, setLoading } = useAuth();

    React.useEffect(() => {
        if (!Socket) {
            setLoading(true);
            const socket = io(import.meta.env.VITE_API_URL, {
                auth: {
                    token: session?.access_token,
                },
            });
            console.log("Connecting to socket");
            socket.on("connect_error", err => {
                console.log("error:", err.message);
                // either no token, token is invalid, database error or timeout
            });

            socket.on("authenticated", () => {
                setSocket(socket);
                setLoading(false);
                // console.log(socket);
                console.log("Authenticated");
            });

            socket.on("navigate", navigate);
        } else {
            Socket.close();
            setSocket(null);
        }

        return () => {
            if (Socket) Socket.disconnect();
        };
    }, []);

    if (!Socket) return null;
    return (
        <SocketContext.Provider value={{ Socket }}>
            {children}
        </SocketContext.Provider>
    );
}

/**
 * Custom hook to use SocketContext.
 *
 * @returns {object} Socket instance from context.
 */
export function useSocket() {
    return React.useContext(SocketContext);
}
