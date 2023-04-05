import * as React from "react";
import io from "socket.io-client";

import { useNavigate } from "react-router-dom";
import supabase from "../api/configs/supabase";
import { useAuth } from "./SessionContext";
export const SocketContext = React.createContext({
    Socket: null,
    authenticated: false,
    setAuthenticated: (authenticated: boolean) => {},
});

export function SocketContextProvider({ children }: any) {
    const [authenticated, setAuthenticated] = React.useState(
        !localStorage.getItem("token") === null
    );
    const navigate = useNavigate();
    const [Socket, setSocket] = React.useState<any>(null);

    const { session, setLoading } = useAuth();

    React.useEffect(() => {
        if (!Socket) {
            setLoading(true);
            const socket = io(":3001", {
                auth: {
                    token: session?.access_token,
                },
            });

            console.log("Connecting to socket");

            socket.on("authenticated", bool => {
                setAuthenticated(bool);
                if (!bool) return;
                setSocket(socket);
                setLoading(false);
                console.log("Authenticated ", bool);
            });

            socket.on("navigate", navigate);
        } else {
            Socket.close();
            setSocket(null);
        }
    }, []);

    if (!Socket) return null;
    return (
        <SocketContext.Provider
            value={{ Socket, authenticated, setAuthenticated }}>
            {children}
        </SocketContext.Provider>
    );
}
