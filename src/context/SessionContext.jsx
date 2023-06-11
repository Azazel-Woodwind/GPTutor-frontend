import * as React from "react";
import supabase from "../api/configs/supabase";
import Loading from "../pages/Loading";
import { useNavigate } from "react-router-dom";

export const useAuth = () => React.useContext(SessionContext);

export const SessionContext = React.createContext();

export function SessionContextProvider({ children }) {
    const [session, setSession] = React.useState(undefined);
    const [fetchedData, setFetchedData] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [event, setEvent] = React.useState(null);

    const getUserData = async id => {
        const { data, error: userError } = await supabase
            .from("users")
            .select("access_levels (*), req_audio_data")
            .eq("id", id)
            .single();

        if (userError || !data) {
            if (userError) console.log(userError);
            return;
        }
        // console.log(data);

        return { req_audio_data: data.req_audio_data, ...data.access_levels };
    };

    const initialiseSession = async () => {
        supabase.auth.onAuthStateChange(async (_event, newSession) => {
            // console.log("EVENT:", _event);
            // console.log("SESSION:", newSession);
            setEvent(_event);
            if (!newSession || !newSession.user) {
                console.log("HERE");
                setSession(null);
            } else {
                setSession(newSession);
                getUserData(newSession.user.id).then(data => {
                    setSession(prevSession => {
                        if (!prevSession) return prevSession;
                        const { req_audio_data, ...rest } = data;
                        return {
                            ...prevSession,
                            user: {
                                ...prevSession.user,
                                ...rest,
                                user_metadata: {
                                    ...prevSession.user.user_metadata,
                                    req_audio_data,
                                },
                            },
                        };
                    });
                });
            }

            setLoading(false);
        });
    };

    React.useEffect(() => {
        initialiseSession();
    }, []);

    // console.log("SESSION", session);

    return (
        <SessionContext.Provider
            value={{ session, setSession, loading, setLoading, event }}>
            {loading && <Loading />}
            {session !== undefined && children}
        </SessionContext.Provider>
    );
}