import { SocketContext } from "@/context/SocketContext";
import React from "react";
import useAudioVisualiser from "./useAudioVisualiser";

/**
 * Custom hook to handle interactions with a specific channel, including message sending,
 * streaming text, handling audio, and managing user interactions.
 *
 * @hook
 * @param {Object} params - Parameters for the hook.
 * @param {string} params.channel - The channel name for communication.
 * @param {Function} params.onData - Callback function to handle incoming data.
 * @returns {Object} An object containing various functionalities and state variables.
 */
function useX({ channel, onData }) {
    const { Socket } = React.useContext(SocketContext);

    const [history, setHistory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [streaming, setStreaming] = React.useState(false);
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [currentInstruction, setCurrentInstruction] =
        React.useState(undefined);
    const [newEmotion, setNewEmotion] = React.useState("neutral");

    const onCurrentMessageChange = React.useRef(() => {});
    const onFullResponse = React.useRef(() => {});
    const instructionQueue = React.useRef([]);
    const streamingInstruction = React.useRef(false);
    const timer = React.useRef(null);

    const audioVisualiser = useAudioVisualiser();

    const setOnCurrentMessageChange = callback => {
        onCurrentMessageChange.current = callback;
    };

    const setOnFullResponse = callback => {
        onFullResponse.current = callback;
    };

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
        // audioVisualiser.reset();

        if (includeInHistory) {
            setHistory(prev => [...prev, { role: "user", content: message }]);
        }

        Socket.emit(altChannel || `${channel}_message_x`, {
            message,
            context,
            ...messageParams,
        });
        setLoading(true);

        return true;
    };

    const streamText = async (text, duration) => {
        // add text to currentMessage character by character over duration
        duration *= 0.5;
        const charDuration = duration / text.length;

        let i = 0;
        streamingInstruction.current = true;
        for (const char of text) {
            setCurrentMessage(prevMessage => prevMessage + char);
            if (i !== text.length - 1) {
                await new Promise(resolve =>
                    setTimeout(
                        resolve,
                        charDuration / audioVisualiser.getSpeed()
                    )
                );
            }
            i++;
        }
        streamingInstruction.current = false;
        // console.log(audio.current.paused, instructionQueue.current.length);

        if (audioVisualiser.paused()) {
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

    const handleData = instruction => {
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
        onData?.(instruction);
    };

    const handleNextInstruction = async () => {
        const instruction = instructionQueue.current[0];
        if (!instruction) return;
        // console.log("handling next instruction:", instruction);

        setCurrentInstruction(instruction);

        setLoading(false);

        if (instruction.type === "sentence") {
            setStreaming(true);
            // console.log("text:", instruction.text);
            // console.log("audioContent", instruction.audioContent);
            const duration = await audioVisualiser.setAudioSrcGetDuration(
                `data:audio/mpeg;base64,${instruction.audioContent}`
            );
            // console.log("duration", duration);

            streamText(instruction.text, duration * 1000);
            audioVisualiser.play();
        } else if (instruction.type === "audio") {
            // console.log("handling audio");
            audioVisualiser.play(
                `data:audio/mpeg;base64,${instruction.audioContent}`
            );
        } else if (instruction.type === "data") {
            // console.log("handling data");
            handleData(instruction);
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

    const onAudioEnd = React.useCallback(async () => {
        console.log("track ended");
        // audioVisualiser.reset();

        if (!streamingInstruction.current) {
            instructionQueue.current.shift();

            if (instructionQueue.current.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 250));
                handleNextInstruction();
            }
        }
    }, []);

    React.useEffect(() => {
        audioVisualiser.addListener("onended", onAudioEnd);

        return () => {
            audioVisualiser.removeListener("onended");
        };
    }, [onAudioEnd]);

    React.useEffect(() => {
        if (!Socket) return;

        Socket.on(`${channel}_instruction`, data => {
            instructionQueue.current.push(data);
            if (instructionQueue.current.length === 1) {
                handleNextInstruction();
            }
        });
    }, [Socket]);

    React.useEffect(() => {
        return () => {
            audioVisualiser.setMuted();
            audioVisualiser.reset();
            audioVisualiser.removeListener("onended");
            instructionQueue.current = [];

            Socket.off(`${channel}_audio_data`);
            Socket.emit(`${channel}_exit`);
            Socket.off(`${channel}_response_stream`);
            Socket.off(`${channel}_response_data`);
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
        paused: audioVisualiser.paused,
        toggleMute: audioVisualiser.toggleMute,
        getSpeed: audioVisualiser.getSpeed,
        setSpeed: audioVisualiser.setSpeed,
        multiplier: audioVisualiser.multiplier,
        pause: audioVisualiser.pause,
        play: audioVisualiser.play,
        speaking: audioVisualiser.speaking,
        isMuted: audioVisualiser.isMuted,
        resetAudio: audioVisualiser.reset,
        setLoading,
        currentInstruction,
        setOnCurrentMessageChange,
        setOnFullResponse,
        newEmotion,
    };
}

export default useX;
