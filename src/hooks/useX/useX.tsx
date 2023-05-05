import { nanoid } from "nanoid";
import { SocketContext } from "../../context/SocketContext";
import { useEffect, useContext, useState, useRef, useCallback } from "react";

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
    const [userPaused, setUserPaused] = useState(false);

    const audio = useRef<HTMLMediaElement>(new Audio());
    const audioContext = useRef<AudioContext | null>();
    const analyserNode = useRef<AnalyserNode | null>(null);
    const dataArray = useRef<Uint8Array | null>(null);
    const animationId = useRef<number | null>(null);
    const audioSource = useRef<MediaElementAudioSourceNode | null>(null);
    const audioQueue = useRef<string[]>([]);
    const currentResponseId = useRef(undefined);

    const sendSystemMessage = message => {
        console.log("Received system message request: ", message);
        setHistory(prev => [...prev, { role: "system", content: message }]);
    };

    const sendMessage = (message: string, context: object | undefined) => {
        if (message === "" || streaming || loading) return false;
        audioQueue.current = [];
        audio.current.src = "";
        audio.current.load();
        setSpeaking(false);
        animationId.current && cancelAnimationFrame(animationId.current);
        setMultiplier(1);

        setHistory(prev => [...prev, { role: "user", content: message }]);
        onMessage({ role: "user", content: message });
        currentResponseId.current = nanoid();
        Socket.emit(`${channel}_message_x`, {
            message,
            context,
            id: currentResponseId.current,
        });
        setLoading(true);

        return true;
    };

    const toggleMute = () => {
        audio.current!.muted = !audio.current!.muted;
    };

    const getSpeed = () => {
        return audio.current!.playbackRate;
    };

    const setSpeed = (speed: number) => {
        audio.current!.playbackRate = speed;
    };

    const pause = () => {
        setUserPaused(true);
        audio.current!.pause();
        animationId.current && cancelAnimationFrame(animationId.current);
    };

    const play = () => {
        setUserPaused(false);
        if (audio.current.src && audio.current.src.startsWith("data:")) {
            audio.current!.play();
            animate();
        } else {
            console.log("NO AUDIO SOURCE:", audio.current.src);
        }
    };

    const updateMultiplier = () => {
        analyserNode.current!.getByteFrequencyData(dataArray.current!);

        const averageFrequency =
            dataArray.current!.reduce((acc, val) => acc + val) /
            dataArray.current!.length;
        const frequencyRatio = averageFrequency / 255;
        const multiplier = 1 + frequencyRatio * 1.3;

        setMultiplier(multiplier);
        // console.log(pulseSpeed);
        animationId.current = requestAnimationFrame(updateMultiplier);
    };

    const animate = () => {
        audioContext.current = new AudioContext();
        if (!audioSource.current) {
            analyserNode.current = audioContext.current.createAnalyser();
            audioSource.current = audioContext.current.createMediaElementSource(
                audio.current
            );
            audioSource.current.connect(analyserNode.current);
            analyserNode.current.connect(audioContext.current.destination);
        }

        const bufferLength = analyserNode.current!.frequencyBinCount;
        dataArray.current = new Uint8Array(bufferLength);

        animationId.current = requestAnimationFrame(updateMultiplier);
    };

    const paused = () => {
        return audio.current!.paused;
    };

    const onReceiveAudioData = useCallback(
        data => {
            console.log("received audio_data");

            if (!data.first && data.id !== currentResponseId.current) {
                console.log(
                    "ignoring audio_data because it's not the current response"
                );
                return;
            }

            if (audio.current!.paused) {
                if (!userPaused) {
                    audio.current!.src = `data:audio/x-wav;base64,${data.audio}`;
                    play();
                } else {
                    if (audio.current.src.startsWith("data:")) {
                        console.log(
                            "queueing audio_data because track is paused by user"
                        );
                        audioQueue.current.push(data.audio);
                    } else {
                        audio.current!.src = `data:audio/x-wav;base64,${data.audio}`;
                    }
                }
            } else {
                console.log("queueing audio_data because track is playing");
                audioQueue.current.push(data.audio);
            }
        },
        [userPaused]
    );

    useEffect(() => {
        if (!Socket) return;
        Socket.off(`${channel}_audio_data`);
        Socket.on(`${channel}_audio_data`, onReceiveAudioData);
    }, [onReceiveAudioData]);

    useEffect(() => {
        if (!Socket) return;

        audio.current!.onplay = () => {
            console.log("track playing");
            setSpeaking(true);
        };

        audio.current!.onended = () => {
            console.log("track ended");
            console.log(audioQueue.current.length);
            if (audioQueue.current.length > 0) {
                audio.current!.src = `data:audio/x-wav;base64,${audioQueue.current.shift()}`;
                play();
            } else {
                audio.current!.src = "";
                setSpeaking(false);
                cancelAnimationFrame(animationId.current!);
                setMultiplier(1);
            }
        };

        audio.current.onpause = () => {
            console.log("track paused");
            setSpeaking(false);
            // cancelAnimationFrame(animationId.current!);
            // setMultiplier(1);
        };

        Socket.on(`${channel}_response_stream`, delta => {
            setStreaming(true);
            onDelta(delta);
            setLoading(false);
            setCurrentMessage(prevMessage => prevMessage + delta);
        });

        Socket.on(`${channel}_error`, err => {
            sendSystemMessage(err);
            setLoading(false);
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

    useEffect(() => {
        return () => {
            audio.current!.muted = true;

            Socket.off(`${channel}_audio_data`);
            Socket.emit(`${channel}_exit`);
            audioQueue.current = [];
            audio.current!.src = "";
            audio.current!.load();
            Socket.off(`${channel}_response_stream`);
            Socket.off(`${channel}_error`);

            Socket.off(`${channel}_response_data`);
            Socket.off(`${channel}_message_user`);
        };
    }, []);

    // console.log("MULTIPLIER", multiplier);

    return {
        sendMessage,
        history,
        setHistory,
        loading,
        currentMessage,
        sendSystemMessage,
        streaming,
        paused,
        toggleMute,
        getSpeed,
        setSpeed,
        multiplier,
        pause,
        play,
        speaking,
    };
}

export default useX;
