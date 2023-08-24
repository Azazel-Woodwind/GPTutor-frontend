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
    onData: data => {},
};

function useX(config) {
    const { channel, onMessage, onFinished, onDelta, onData } = {
        ...defaultConfig,
        ...config,
    };

    const { Socket } = useContext(SocketContext);

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [speaking, setSpeaking] = useState(false);
    const [multiplier, setMultiplier] = useState(undefined);
    const [userPaused, setUserPaused] = useState(false);
    const [responseData, setResponseData] = useState("");
    // const [streamingInstruction, setStreamingInstruction] = useState(false);

    const audio = useRef(new Audio());
    const audioContext = useRef();
    const analyserNode = useRef(null);
    const dataArray = useRef(null);
    const animationId = useRef(null);
    const audioSource = useRef(null);
    const instructionQueue = useRef([]);
    const currentResponseId = useRef(undefined);
    const currentPlaybackRate = useRef(1);
    const streamingInstruction = useRef(false);

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
        instructionQueue.current = [];
        audio.current.src = "";
        audio.current.load();
        setSpeaking(false);
        animationId.current && cancelAnimationFrame(animationId.current);
        setMultiplier(1);

        if (responseData) {
            // console.log("here");
            setCurrentMessage("");
            setHistory(prev => [
                ...prev,
                { role: "assistant", content: responseData },
            ]);
        }

        setResponseData("");
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
        instructionQueue.current = [];
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
        setSpeaking(false);
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
            // console.log("received audio_data");

            if (!data.first && data.id !== currentResponseId.current) {
                console.log(
                    "ignoring audio_data because it's not the current response"
                );
                return;
            }
        },
        [userPaused]
    );

    const onResponseData = useCallback(
        data => {
            // console.log("response_data:", data);
            if (streaming || loading) {
                // console.log("NO HERE");
                setResponseData(data.response);
            } else {
                // console.log("HERE");
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
            if (order === 0) {
                orderMaintainer.reset();
            }

            orderMaintainer.addData(data, order);
        });
    }, [onReceiveAudioData]);

    const onReceiveResponseStream = useCallback(
        delta => {
            setLoading(false);

            if (delta === "[END]") {
                return;
            }

            setStreaming(true);
            onDelta(delta);

            setCurrentMessage(prevMessage => prevMessage + delta);
        },
        [responseData]
    );

    useEffect(() => {
        if (responseData && !streaming) {
            // console.log("herio");
            setCurrentMessage("");
            setHistory(prev => [
                ...prev,
                { role: "assistant", content: responseData },
            ]);
            setResponseData("");
        }
    }, [streaming]);

    useEffect(() => {
        if (!Socket) return;
        Socket.off(`${channel}_response_stream`);
        Socket.on(`${channel}_response_stream`, onReceiveResponseStream);
    }, [onReceiveResponseStream]);

    const streamText = async (text, duration) => {
        // add text to currentMessage character by character over duration
        duration *= 0.5;
        const charDuration = duration / text.length;
        // console.log("character duration:", charDuration);
        // console.log("length:", text.length);

        let i = 0;
        streamingInstruction.current = true;
        for (const char of text) {
            setCurrentMessage(prevMessage => prevMessage + char);
            if (i !== text.length - 1) {
                await new Promise(resolve =>
                    setTimeout(
                        resolve,
                        charDuration / audio.current.playbackRate
                    )
                );
            }
            i++;
        }
        streamingInstruction.current = false;
        // console.log(audio.current.paused, instructionQueue.current.length);

        if (audio.current.paused) {
            instructionQueue.current.shift();
            if (instructionQueue.current.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 250));
                handleNextInstruction();
            }
        }
    };

    const streamDelta = async delta => {
        for (const char of delta) {
            setCurrentMessage(prevMessage => prevMessage + char);
            await new Promise(resolve => setTimeout(resolve, 20));
        }

        return Promise.resolve();
    };

    const handleNextInstruction = async () => {
        const instruction = instructionQueue.current[0];
        if (!instruction) return;
        setStreaming(true);
        setLoading(false);

        if (instruction.type === "sentence") {
            audio.current.src = `data:audio/x-wav;base64,${instruction.audioContent}`;
            streamText(instruction.text, instruction.duration * 1000);
            play();
        } else if (instruction.type === "data") {
            onData(instruction);
            instructionQueue.current.shift();
            if (instructionQueue.current.length > 0) {
                handleNextInstruction();
            }
        } else if (instruction.type === "delta") {
            await streamDelta(instruction.delta);
            instructionQueue.current.shift();
            if (instructionQueue.current.length > 0) {
                handleNextInstruction();
            }
        } else if (instruction.type === "end") {
            console.log("response_stream end");
            setStreaming(false);
            if (responseData) {
                // console.log("here");
                setCurrentMessage("");
                setHistory(prev => [
                    ...prev,
                    { role: "assistant", content: responseData },
                ]);
                setResponseData("");
            }

            instructionQueue.current.shift();
        }
    };

    const onAudioEnd = useCallback(async () => {
        console.log("track ended");
        // end = performance.now();
        //     const duration = end - start;
        //     console.log("track ended");
        //     console.log("duration of speech", duration);

        // console.log(instructionQueue.current.length);
        audio.current.src = "";
        setSpeaking(false);
        cancelAnimationFrame(animationId.current);
        setMultiplier(1);

        // console.log(
        //     streamingInstruction.current,
        //     instructionQueue.current.length
        // );
        if (!streamingInstruction.current) {
            instructionQueue.current.shift();

            if (instructionQueue.current.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 250));
                handleNextInstruction();
            }
        }
    }, []);

    useEffect(() => {
        audio.current.onended = onAudioEnd;
    }, [onAudioEnd]);

    useEffect(() => {
        if (!Socket) return;

        let start, end;

        audio.current.onplay = () => {
            // start = performance.now();
            console.log("track playing");
            audio.current.playbackRate = currentPlaybackRate.current;
            // console.log(audio.current.src);
            setSpeaking(true);
        };

        audio.current.onpause = () => {
            console.log("track paused");
            // setSpeaking(false);
            // cancelAnimationFrame(animationId.current!);
            // setMultiplier(1);
        };

        Socket.on(`${channel}_instruction`, data => {
            // console.log("instruction", data);
            if (!data.first && data.id !== currentResponseId.current) {
                console.log(
                    "ignoring instruction because it's not the current response"
                );
                return;
            }

            instructionQueue.current.push(data);
            if (instructionQueue.current.length === 1) {
                handleNextInstruction();
            }
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
            instructionQueue.current = [];
            audio.current.src = "";
            audio.current.load();
            Socket.off(`${channel}_response_stream`);
            Socket.off(`${channel}_error`);

            Socket.off(`${channel}_response_data`);
            Socket.off(`${channel}_message_user`);
            Socket.off(`${channel}_instruction`);
        };
    }, []);

    // `console.log`("MULTIPLIER", multiplier);

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
