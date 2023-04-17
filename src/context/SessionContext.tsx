import { Session } from "@supabase/supabase-js";
import * as React from "react";
import supabase from "../api/configs/supabase";
import Loading from "../pages/Loading";

type Store = {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useAuth = () => React.useContext(SessionContext);

export const SessionContext = React.createContext({
    session: null,
    setSession: () => {},
    loading: true,
    setLoading: () => {},
} as Store);

export function SessionContextProvider({ children }: any) {
    const [session, setSession] = React.useState<Session | null>(null);
    const [fetchedData, setFetchedData] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const getAccessLevelById = async (id: string) => {
        const { data, error: userError } = await supabase
            .from("users")
            .select("access_level")
            .eq("id", id)
            .single();

        if (userError || !data) {
            if (userError) console.log(userError);
            return;
        }

        return data.access_level;
    };

    const initialiseSession = async () => {
        supabase.auth.onAuthStateChange(async (_event, newSession) => {
            if (!newSession || !newSession.user) {
                setSession(null);
            } else {
                newSession.user.accessLevel = await getAccessLevelById(
                    newSession.user.id
                );
                setSession(newSession);
            }

            setFetchedData(true);
            setLoading(false);
        });
    };

    React.useEffect(() => {
        initialiseSession();
    }, []);

    return (
        <SessionContext.Provider
            value={{ session, setSession, loading, setLoading }}>
            {loading && <Loading />}
            {fetchedData && children}
        </SessionContext.Provider>
    );
}
