import { SocketContext } from "../../context/SocketContext";
import { useEffect, useContext, useState, useRef } from "react";

export type Config = {
    channel?: string;
    onMessage?: ({ role, content }: { role: string; content: string }) => void;
    onFinished?: (message: string) => void;
    onDelta?: (message: string) => void;
};

type Message = {
    role: string;
    content: string;
};

const defaultConfig = {
    channel: "",
    onMessage: ({ role, content }: { role: string; content: string }) => {
        console.log(role, content);
    },
    onFinished: (message: string) => {},
    onDelta: (message: string) => {},
};

function useX(config: Config) {
    const { channel, onMessage, onFinished, onDelta } = {
        ...defaultConfig,
        ...config,
    };

    const { Socket } = useContext(SocketContext);

    const [history, setHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [streaming, setStreaming] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [speaking, setSpeaking] = useState(false);

    const currentSentence = useRef<string>("");
    const audio = useRef<HTMLMediaElement>(
        typeof window === "undefined" ? null : new Audio()
    );
    const audioQueue = useRef<string[]>([]);
    // console.log(audioQueue.current.length)

    const sendMessage = (message: string, context: object | undefined) => {
        if (message === "" || streaming || loading) return;
        if (!audio.current!.paused) {
            audioQueue.current = [];
            audio.current!.src = "";
            audio.current!.load();
        }
        setHistory(prev => [...prev, { role: "user", content: message }]);
        onMessage({ role: "user", content: message });
        Socket.emit(`${channel}_message_x`, { message, context } );
        setLoading(true);
    };

    useEffect(() => {
        audio.current!.autoplay = true;

        // audio.current!.muted = true;

        audio.current!.onplay = () => {
            // audio.current!.playbackRate = 2
            console.log(audioQueue.current.length);
        };

        audio.current!.onended = () => {
            console.log("track ended");
            console.log(audioQueue.current.length);
            if (audioQueue.current.length > 0) {
                audio.current!.src = `data:audio/x-wav;base64,${audioQueue.current.shift()}`;
                // audio.current!.muted = false;
                audio.current!.play();
            } else {
                setSpeaking(false);
            }
        };

        Socket.on(`${channel}_response_stream`, delta => {
            // console.log("response_stream")
            setStreaming(true);
            currentSentence.current += delta;
            onDelta(delta);
            setLoading(false);
            setCurrentMessage(prevMessage => prevMessage + delta);
            if (delta === "." || delta === "?" || delta === "!") {
                console.log("emitting text_data: ", currentSentence.current);

                Socket.emit(`text_data`, currentSentence.current);
                currentSentence.current = "";
            }
        });

        Socket.on(`audio_data`, data => {
            // console.log("received audio_data")
            if (audio.current!.paused) {
                audio.current!.src =
                    audioQueue.current.length === 0
                        ? `data:audio/x-wav;base64,${data}`
                        : `data:audio/x-wav;base64,${audioQueue.current.shift()}`;
                audio.current!.play();
                setSpeaking(true);
            } else {
                // console.log("queueing audio_data");
                audioQueue.current.push(data);
            }
        });

        Socket.on(`${channel}_response_data`, data => {
            // console.log("response_data")

            setHistory(prev => [
                ...prev,
                { role: "assistant", content: data.response },
            ]);
            setCurrentMessage("");
            onMessage({ role: "assistant", content: data.response });
            setStreaming(false);
        });

        Socket.on(`${channel}_message_user`, message => {
            // console.log("message_user");
            onFinished(message);
            setLoading(false);
        });
    }, []);

    return {
        sendMessage,
        history,
        setHistory,
        loading,
        setLoading,
        currentMessage,
        setCurrentMessage,
        streaming,
        speaking,
    };
}

export default useX;
