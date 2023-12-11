import { nanoid } from "nanoid";
import { SocketContext } from "@/context/SocketContext";
import React, {
    useEffect,
    useContext,
    useState,
    useRef,
    useCallback,
} from "react";
import OrderMaintainer from "../../lib/OrderMaintainer";

function useX({ channel, ...props }) {
    const { Socket } = useContext(SocketContext);

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [speaking, setSpeaking] = useState(false);
    const [multiplier, setMultiplier] = useState(undefined);
    const [userPaused, setUserPaused] = useState(false);
    const [currentInstruction, setCurrentInstruction] = useState(undefined);
    const [newEmotion, setNewEmotion] = useState("neutral");

    const onCurrentMessageChange = useRef(() => {});
    const onFullResponse = useRef(() => {});
    const audio = useRef(new Audio());
    const audioContext = useRef();
    const analyserNode = useRef(null);
    const dataArray = useRef(null);
    const animationId = useRef(null);
    const audioSource = useRef(null);
    const instructionQueue = useRef([]);
    const currentPlaybackRate = useRef(1);
    const streamingInstruction = useRef(false);
    const timer = useRef(null);

    const setOnCurrentMessageChange = callback => {
        onCurrentMessageChange.current = callback;
    };

    const setOnFullResponse = callback => {
        onFullResponse.current = callback;
    };

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
        includeInHistory = true,
        messageParams = {},
    } = {}) => {
        if (streaming || loading) return false;
        instructionQueue.current = [];
        audio.current.src = "";
        audio.current.load();
        setSpeaking(false);
        animationId.current && cancelAnimationFrame(animationId.current);
        setMultiplier(1);

        if (includeInHistory) {
            setHistory(prev => [...prev, { role: "user", content: message }]);
        }

        orderMaintainer.reset();
        Socket.emit(altChannel || `${channel}_message_x`, {
            message,
            context,
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
        audio.autoplay = true;
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
    };

    React.useEffect(() => {
        if (!currentInstruction || !onCurrentMessageChange.current) {
            console.log("no current instruction");
            return;
        }
        onCurrentMessageChange.current({
            currentMessage,
            ...currentInstruction,
        });
    }, [currentMessage]);

    // console.log(onFullResponse);

    const onData = instruction => {
        if (instruction.emotion) {
            const emotion = instruction.emotion.toLowerCase();
            console.log("CURRENT EMOTION:", emotion);
            const EMOTION_DURATION = 2500;

            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }

            if (emotion === newEmotion) {
                timer.current = setTimeout(() => {
                    setNewEmotion("neutral");
                }, EMOTION_DURATION);
            } else {
                setNewEmotion(emotion);

                timer.current = setTimeout(() => {
                    setNewEmotion("neutral");
                }, EMOTION_DURATION);
            }
        }
        props.onData?.(instruction);
    };

    const handleNextInstruction = async () => {
        const instruction = instructionQueue.current[0];
        if (!instruction) return;
        // console.log("handling next instruction:", instruction);

        setCurrentInstruction(instruction);

        setLoading(false);

        if (instruction.type === "sentence") {
            setStreaming(true);
            // console.log("handling sentence:", instruction.text);
            audio.current.src = `data:audio/x-wav;base64,${instruction.audioContent}`;
            streamText(instruction.text, instruction.duration * 1000);
            play();
        } else if (instruction.type === "audio") {
            console.log("handling audio");
            audio.current.src = `data:audio/x-wav;base64,${instruction.audioContent}`;
            play();
        } else if (instruction.type === "data") {
            // console.log("handling data");
            onData(instruction);
            instructionQueue.current.shift();
            if (instructionQueue.current.length > 0) {
                handleNextInstruction();
            }
        } else if (instruction.type === "delta") {
            setStreaming(true);
            await streamDelta(instruction.delta);
            instructionQueue.current.shift();
            if (instructionQueue.current.length > 0) {
                handleNextInstruction();
            }
        } else if (instruction.type === "end") {
            // console.log("response_stream end");
            setStreaming(false);
            setCurrentMessage("");
            if (instruction.response) {
                setHistory(prev => [
                    ...prev,
                    { role: "assistant", content: instruction.response },
                ]);
            }
            onFullResponse.current?.(instruction);

            instructionQueue.current.shift();
            if (instructionQueue.current.length > 0) {
                handleNextInstruction();
            }
        }
    };

    const onAudioEnd = useCallback(async () => {
        console.log("track ended");
        audio.current.src = "";
        setSpeaking(false);
        cancelAnimationFrame(animationId.current);
        setMultiplier(1);

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
        currentInstruction,
        setOnCurrentMessageChange,
        setOnFullResponse,
        newEmotion,
    };
}

export default useX;
