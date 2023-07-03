import * as React from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./SessionContext";

export const SocketContext = React.createContext({
    Socket: null,
});

export function useSocket() {
    return React.useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
    const navigate = useNavigate();
    const [Socket, setSocket] = React.useState(null);

    const { session, setLoading } = useAuth();

    React.useEffect(() => {
        if (!Socket) {
            setLoading(true);
            const socket = io(
                import.meta.env.PROD ? "https://api.xtutor.ai" : ":3000",
                {
                    auth: {
                        token: session?.access_token,
                    },
                }
            );
            console.log("Connecting to socket");
            socket.on("connect_error", err => {
                console.log("error:", err.message);
                // either no token, token is invalid, database error or timeout
            });

            socket.on("authenticated", bool => {
                if (!bool) return;
                setSocket(socket);
                setLoading(false);
                // console.log(socket);
                console.log("Authenticated ", bool);
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
