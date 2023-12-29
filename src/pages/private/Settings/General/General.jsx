import React from "react";
import styled from "styled-components";
import { useAuth } from "@/context/SessionContext";
import useModal from "@/hooks/useModal";
import XSpeakModal from "./components/XSpeakModal";
import { nanoid } from "nanoid";
import supabase from "@/api/configs/supabase";
import ProgressBar from "@/components/common/feedback/ProgressBar";
import Checkbox from "@/components/common/input/Checkbox";
import UserAPI from "@/api/UserAPI";
import { NotificationContext } from "@/context/NotificationContext";

const max = 200000;

/**
 * General Settings page.
 * User can change the general settings of XTutor and view their token usage.
 *
 * @page
 * @route /settings/general
 * @accessLevel 1 - Student
 * @returns {JSX.Element} - Renders the general settings.
 */
function General() {
    const { session } = useAuth();
    const [tokenUsage, setTokenUsage] = React.useState(0);

    // console.log(session);

    React.useEffect(() => {
        const getTokenUsage = async () => {
            const {
                data: { daily_token_usage },
                error,
            } = await supabase
                .from("users")
                .select("daily_token_usage")
                .single();
            if (error) console.log(error);
            setTokenUsage(daily_token_usage);
        };
        getTokenUsage();
        const channel = supabase
            .channel(`user-changes-${nanoid()}`)
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "users",
                    filter: `id=eq.${session?.user.id}`,
                },
                payload => {
                    setTokenUsage(payload.new.daily_token_usage);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const { Modal: Component, ...Modal } = useModal({
        initialOpen: false,
    });

    const { sendNotification } = React.useContext(NotificationContext);

    const toggleXSpeech = async () => {
        try {
            const enabled = !session.user.user_metadata.req_audio_data;
            await UserAPI.updateMe({
                req_audio_data: enabled,
            });
            sendNotification({
                type: "success",
                label: `X Speech has been ${enabled ? "enabled" : "disabled"}`,
            });
        } catch (error) {
            console.log(error);
            sendNotification({
                type: "error",
                label: `Error: ${error.message}`,
            });
        }
    };

    return (
        <Container>
            <Component {...Modal.ModalProps} type="dropIn">
                <XSpeakModal
                    reqAudioData={!session.user.user_metadata.req_audio_data}
                    handleClose={Modal.handleClose}
                    onConfirm={toggleXSpeech}
                />
            </Component>
            <h1>General Settings</h1>
            <p>Token Usage: {tokenUsage} tokens</p>
            <Usage>
                <ProgressBar
                    width="90%"
                    stops={[
                        {
                            label: "0",
                            location: 0,
                        },
                        {
                            label: "Standard Limit",
                            location: 100000,
                        },
                        {
                            label: "Premium Limit",
                            location: max,
                        },
                    ]}
                    value={tokenUsage}
                    max={max}
                />
            </Usage>
            <Checkbox
                checkboxSize={31}
                borderWidth={2}
                fontSize="1.1rem"
                label="You will hear X's voice"
                checked={session.user.user_metadata.req_audio_data}
                onChange={e => {
                    Modal.handleOpen();
                }}
            />
        </Container>
    );
}

const Usage = styled.div`
    margin-bottom: 2rem;
    width: 100%;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export default General;
