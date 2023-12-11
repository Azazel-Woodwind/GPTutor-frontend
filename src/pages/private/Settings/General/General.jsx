import React from "react";
import styled from "styled-components";
import { useAuth } from "@/context/SessionContext";
import useModal from "@/hooks/useModal/useModal";
import XSpeakModal from "./components/XSpeakModal";
import { nanoid } from "nanoid";
import supabase from "@/api/configs/supabase";
import ProgressBar from "@/components/common/feedback/ProgressBar";
import Checkbox from "@/components/common/input/Checkbox";

const max = 200000;

const General = () => {
    const { session } = useAuth();
    const [tokenUsage, setTokenUsage] = React.useState(0);

    console.log(session);

    React.useEffect(() => {
        const getTokenUsage = async () => {
            // console.log(await supabase.auth.getUser());
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
        // setTokenUsage(daily_token_usage);
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
                    // console.log("Change received in public.users", payload);
                    setTokenUsage(payload.new.daily_token_usage);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // console.log(session.user.user_metadata.req_audio_data);
    // const form = useForm({
    //     defaultValues: {
    //         requestAudioData: session.user.user_metadata.req_audio_data,
    //     },
    // });

    const { Modal: Component, ...Modal } = useModal({
        initialOpen: false,
    });

    return (
        <Container>
            <Component {...Modal.ModalProps} type="dropIn">
                <XSpeakModal
                    reqAudioData={!session.user.user_metadata.req_audio_data}
                    handleClose={Modal.handleClose}
                    onConfirm={() => {
                        UserAPI.updateMe({
                            req_audio_data:
                                !session.user.user_metadata.req_audio_data,
                        });
                        // setReqAudioData(!reqAudioData);
                        // Modal.handleClose();
                    }}
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
                        // {
                        //     label: "1/2",
                        //     location: (max / 4) * 2,
                        // },
                        // {
                        //     label: "3/4",
                        //     location: (max / 4) * 3,
                        // },
                        {
                            label: "Premium Limit",
                            location: max,
                        },
                    ]}
                    value={tokenUsage}
                    max={max}
                />
            </Usage>
            {/* <Controller
                name="requestAudioData"
                control={form.control}
                render={({ field }) => ( */}
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
            {/* )}
            // /> */}
        </Container>
    );
};

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
