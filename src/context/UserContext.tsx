import * as React from "react";

type Store = {
    user: any;
    setUser: any;
};

export const UserContext = React.createContext({
    user: null,
    setUser: Function,
} as Store);

export function UserContextProvider({ children }: any) {
    const [user, setUser] = React.useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
