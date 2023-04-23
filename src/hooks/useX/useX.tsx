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
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [speaking, setSpeaking] = useState(false);
    const [multiplier, setMultiplier] = useState(1);

    const currentSentence = useRef<string>("");
    const audio = useRef<HTMLMediaElement>(new Audio());
    const audioContext = useRef<AudioContext | null>(new AudioContext());
    const analyserNode = useRef<AnalyserNode | null>(null);
    const dataArray = useRef<Uint8Array | null>(null);
    const animationId = useRef<number | null>(null);
    const audioSource = useRef<MediaElementAudioSourceNode | null>(null);
    const audioQueue = useRef<string[]>([]);

    const sendSystemMessage = message => {
        console.log("Received system message request: ", message);
        setHistory(prev => [...prev, { role: "system", content: message }]);
    };

    const sendMessage = (message: string, context: object | undefined) => {
        if (message === "" || streaming || loading) return;
        if (!audio.current!.paused) {
            audioQueue.current = [];
            audio.current!.src = "";
            audio.current!.load();
        }

        setHistory(prev => [...prev, { role: "user", content: message }]);
        onMessage({ role: "user", content: message });
        Socket.emit(`${channel}_message_x`, { message, context });
        setLoading(true);
    };

    const toggleMute = () => {
        audio.current!.muted = !audio.current!.muted;
    };

    const setSpeed = (speed: number) => {
        audio.current!.playbackRate = speed;
    };

    const updateMultiplier = () => {
        analyserNode.current!.getByteFrequencyData(dataArray.current!);

        const averageFrequency =
            dataArray.current!.reduce((acc, val) => acc + val) /
            dataArray.current!.length;
        const frequencyRatio = averageFrequency / 255;
        const multiplier = 1 + frequencyRatio * 1.4;

        setMultiplier(multiplier);
        // console.log(pulseSpeed);
        animationId.current = requestAnimationFrame(updateMultiplier);
    };

    useEffect(() => {
        return () => {
            audioQueue.current = [];
            audio.current!.src = "";
            audio.current!.load();
            Socket.off(`${channel}_audio_data`);
        };
    }, []);

    useEffect(() => {
        if (!Socket) return;

        // audio.current!.autoplay = true;

        // audio.current!.muted = true;

        audio.current!.onplay = () => {
            console.log("track playing");
            setSpeaking(true);

            audioContext.current = new AudioContext();
            if (!audioSource.current) {
                analyserNode.current = audioContext.current.createAnalyser();
                audioSource.current =
                    audioContext.current.createMediaElementSource(
                        audio.current
                    );
                audioSource.current.connect(analyserNode.current);
                analyserNode.current.connect(audioContext.current.destination);
            }

            const bufferLength = analyserNode.current!.frequencyBinCount;
            dataArray.current = new Uint8Array(bufferLength);

            animationId.current = requestAnimationFrame(updateMultiplier);
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
                cancelAnimationFrame(animationId.current!);
                setMultiplier(1);
            }
        };

        Socket.on(`${channel}_response_stream`, delta => {
            // console.log("DELTA:", delta, delta.length);
            setStreaming(true);
            // currentSentence.current += delta;
            onDelta(delta);
            setLoading(false);
            setCurrentMessage(prevMessage => prevMessage + delta);
            // if (delta.audio) {
            //     console.log("received audio_data");
            //     if (audio.current!.paused) {
            //         audio.current!.src =
            //             audioQueue.current.length === 0
            //                 ? `data:audio/x-wav;base64,${delta.audio}`
            //                 : `data:audio/x-wav;base64,${audioQueue.current.shift()}`;
            //         audio.current!.play();
            //     } else {
            //         // console.log("queueing audio_data");
            //         audioQueue.current.push(delta.audio);
            //     }
            // }
            // if (delta === "." || delta === "?" || delta === "!") {
            //     console.log("emitting text_data: ", currentSentence.current);

            //     Socket.emit(`text_data`, {
            //         text: currentSentence.current,
            //         channel,
            //     });
            //     currentSentence.current = "";
            // }
        });

        Socket.on(`${channel}_error`, err => {
            sendSystemMessage(err);
            setLoading(false);
        });

        Socket.on(`${channel}_audio_data`, data => {
            console.log("received audio_data");
            if (audio.current!.paused) {
                audio.current!.src =
                    audioQueue.current.length === 0
                        ? `data:audio/x-wav;base64,${data}`
                        : `data:audio/x-wav;base64,${audioQueue.current.shift()}`;
                audio.current!.play();
            } else {
                // console.log("queueing audio_data");
                audioQueue.current.push(data);
            }
        });

        Socket.on(`${channel}_response_data`, data => {
            console.log("response_data:", data);

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
    }, [Socket]);

    // console.log("MULTIPLIER", multiplier);

    return {
        sendMessage,
        history,
        setHistory,
        loading,
        currentMessage,
        sendSystemMessage,
        streaming,
        speaking,
        toggleMute,
        setSpeed,
        multiplier,
    };
}

export default useX;
