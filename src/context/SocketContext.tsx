import * as React from "react";
import io from "socket.io-client";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Socket = io(":3001");
export const SocketContext = React.createContext({
    Socket,
    authenticated: false,
});

export function SocketContextProvider({ children }: any) {
    const [authenticated, setAuthenticated] = React.useState(
        !localStorage.getItem("token") === null
    );
    const [Socket, setSocket] = React.useState<any>(null);
    const { user, setUser } = useContext(UserContext);

    React.useEffect(() => {
        if (user) {
            const Socket = io(":3001");
            setSocket(Socket);

            Socket.emit("authenticate", {
                token: localStorage.getItem("token"),
            });

            Socket.on("authenticated", setAuthenticated);
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ Socket, authenticated }}>
            {children}
        </SocketContext.Provider>
    );
}
