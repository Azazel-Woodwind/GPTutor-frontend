import { nanoid } from "nanoid";
import { SocketContext } from "../../context/SocketContext";
import { useEffect, useContext, useState, useRef, useCallback } from "react";
import OrderMaintainer from "../../lib/OrderMaintainer";

const defaultConfig = {
    channel: "",
    onMessage: ({ role, content }) => {
        // console.log(role, content);
    },
    onFinished: message => {},
    onDelta: message => {},
};

function useX(config) {
    const { channel, onMessage, onFinished, onDelta } = {
        ...defaultConfig,
        ...config,
    };

    const { Socket } = useContext(SocketContext);

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [speaking, setSpeaking] = useState(false);
    const [multiplier, setMultiplier] = useState(1);
    const [userPaused, setUserPaused] = useState(false);

    const audio = useRef(new Audio());
    const audioContext = useRef();
    const analyserNode = useRef(null);
    const dataArray = useRef(null);
    const animationId = useRef(null);
    const audioSource = useRef(null);
    const audioQueue = useRef([]);
    const currentResponseId = useRef(undefined);
    const currentPlaybackRate = useRef(1);
    const response = useRef("");

    const { current: orderMaintainer } = useRef(
        new OrderMaintainer({
            callback: data => {},
        })
    );

    const sendSystemMessage = message => {
        console.log("Received system message request: ", message);
        setHistory(prev => [...prev, { role: "system", content: message }]);
    };

    const sendMessage = ({
        message,
        context,
        altChannel,
        messageParams = {},
    }) => {
        if (message.trim() === "" || streaming || loading) return false;
        audioQueue.current = [];
        audio.current.src = "";
        audio.current.load();
        setSpeaking(false);
        animationId.current && cancelAnimationFrame(animationId.current);
        setMultiplier(1);
        response.current = "";
        setHistory(prev => [...prev, { role: "user", content: message }]);
        currentResponseId.current = nanoid();
        orderMaintainer.reset();
        Socket.emit(altChannel || `${channel}_message_x`, {
            message,
            context,
            id: currentResponseId.current,
            ...messageParams,
        });
        setLoading(true);

        return true;
    };

    const resetAudio = () => {
        audioQueue.current = [];
        audio.current.src = "";
        audio.current.load();
        setSpeaking(false);
        animationId.current && cancelAnimationFrame(animationId.current);
        setMultiplier(1);
    };

    const toggleMute = () => {
        audio.current.muted = !audio.current.muted;
    };

    const isMuted = () => audio.current.muted;

    const getSpeed = () => {
        return audio.current.playbackRate;
    };

    const setSpeed = speed => {
        audio.current.playbackRate = speed;
        currentPlaybackRate.current = speed;
    };

    const pause = () => {
        setUserPaused(true);
        audio.current.pause();
        animationId.current && cancelAnimationFrame(animationId.current);
    };

    const play = async () => {
        setUserPaused(false);
        if (audio.current.src && audio.current.src.startsWith("data:")) {
            try {
                await audio.current.play();
                animate();
            } catch (error) {
                console.log(error);
                audio.current.pause();
                animationId.current &&
                    cancelAnimationFrame(animationId.current);
            }
        } else {
            console.log("NO AUDIO SOURCE:", audio.current.src);
        }
    };

    const updateMultiplier = () => {
        analyserNode.current.getByteFrequencyData(dataArray.current);

        const averageFrequency =
            dataArray.current.reduce((acc, val) => acc + val) /
            dataArray.current.length;
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

        const bufferLength = analyserNode.current.frequencyBinCount;
        dataArray.current = new Uint8Array(bufferLength);

        animationId.current = requestAnimationFrame(updateMultiplier);
    };

    const paused = () => {
        return audio.current.paused;
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

            if (audio.current.paused) {
                if (!userPaused) {
                    audio.current.src = `data:audio/x-wav;base64,${data.audio}`;
                    play();
                } else {
                    if (audio.current.src.startsWith("data:")) {
                        console.log(
                            "queueing audio_data because track is paused by user"
                        );
                        audioQueue.current.push(data.audio);
                    } else {
                        audio.current.src = `data:audio/x-wav;base64,${data.audio}`;
                    }
                }
            } else {
                console.log("queueing audio_data because track is playing");
                audioQueue.current.push(data.audio);
            }
        },
        [userPaused]
    );

    const onResponseData = useCallback(
        data => {
            console.log("response_data:", data);
            if (streaming || loading) {
                response.current = data.response;
            } else {
                setCurrentMessage("");
                setHistory(prev => [
                    ...prev,
                    { role: "assistant", content: data.response },
                ]);
            }

            onMessage(data);
        },
        [streaming, loading]
    );

    useEffect(() => {
        if (!Socket) return;
        Socket.off(`${channel}_response_data`);
        Socket.on(`${channel}_response_data`, onResponseData);
    }, [onResponseData]);

    useEffect(() => {
        if (!Socket) return;
        orderMaintainer.callback = onReceiveAudioData;
        Socket.off(`${channel}_audio_data`);
        Socket.on(`${channel}_audio_data`, ({ order, ...data }) => {
            // console.log(order, data);
            orderMaintainer.addData(data, order);
        });
    }, [onReceiveAudioData]);

    useEffect(() => {
        if (!Socket) return;

        audio.current.onplay = () => {
            console.log("track playing");
            audio.current.playbackRate = currentPlaybackRate.current;
            // console.log(audio.current.src);
            setSpeaking(true);
        };

        audio.current.onended = () => {
            console.log("track ended");
            console.log(audioQueue.current.length);
            if (audioQueue.current.length > 0) {
                audio.current.src = `data:audio/x-wav;base64,${audioQueue.current.shift()}`;
                play();
            } else {
                audio.current.src = "";
                setSpeaking(false);
                cancelAnimationFrame(animationId.current);
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
            if (delta === "[END]") {
                console.log("response_stream end");
                setStreaming(false);
                const content = response.current;
                if (response.current) {
                    setCurrentMessage("");
                    setHistory(prev => [
                        ...prev,
                        { role: "assistant", content },
                    ]);
                }
                return;
            }

            setStreaming(true);
            onDelta(delta);
            setLoading(false);
            setCurrentMessage(prevMessage => prevMessage + delta);
        });

        Socket.on(`${channel}_error`, err => {
            sendSystemMessage(err);
            setLoading(false);
        });

        Socket.on(`${channel}_message_user`, message => {
            // console.log("message_user");
            onFinished(message);
            setLoading(false);
        });
    }, [Socket]);

    useEffect(() => {
        return () => {
            audio.current.muted = true;

            Socket.off(`${channel}_audio_data`);
            Socket.emit(`${channel}_exit`);
            audioQueue.current = [];
            audio.current.src = "";
            audio.current.load();
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
        isMuted,
        resetAudio,
        setLoading,
    };
}

export default useX;
