import React from "react";
import supabase from "@/api/configs/supabase";
import Loading from "@/components/common/feedback/Loading";

/**
 * Context for user session and authentication state.
 */
export const SessionContext = React.createContext({
    session: null,
    setSession: () => {},
    loading: true,
    setLoading: () => {},
    event: null,
});

/**
 * Provider component for SessionContext.
 * Manages user session state, loading state, and authentication events.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The provider component with SessionContext.
 */
export function SessionContextProvider({ children }) {
    const [session, setSession] = React.useState(undefined);
    const [loading, setLoading] = React.useState(true);
    const [event, setEvent] = React.useState(null);

    /**
     * Fetch user data from the database.
     *
     * @param {string} id - User ID to fetch data for.
     * @returns {Promise<object|null>} User data object or null on error.
     */
    const getUserData = async id => {
        const { data, error: userError } = await supabase
            .from("users")
            .select("access_levels (*), new")
            .eq("id", id)
            .single();

        if (userError || !data) {
            if (userError) console.log(userError);
            return;
        }
        // console.log(data);

        return { ...data.access_levels, new: data.new };
    };

    /**
     * Initialize the user session and set up authentication state change handler.
     */
    const initialiseSession = async () => {
        supabase.auth.onAuthStateChange(async (_event, newSession) => {
            // console.log("EVENT:", _event);
            // console.log("SESSION:", newSession);
            setEvent(_event);
            if (!newSession || !newSession.user) {
                // console.log("HERE");
                setSession(null);
            } else {
                setSession(newSession);
                getUserData(newSession.user.id).then(data => {
                    setSession(prevSession => {
                        if (!prevSession) return prevSession;
                        // const { req_audio_data, ...rest } = data;
                        return {
                            ...prevSession,
                            user: {
                                ...prevSession.user,
                                ...data,
                                user_metadata: {
                                    ...prevSession.user.user_metadata,
                                    // req_audio_data,
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

/**
 * Custom hook to use SessionContext.
 *
 * @returns {object} The current session and related functions from context.
 */
export function useAuth() {
    return React.useContext(SessionContext);
}
