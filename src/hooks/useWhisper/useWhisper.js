import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

/**
 * default useWhisper configuration
 */
const defaultConfig = {
    streaming: true,
    timeSlice: 700,
    Socket: undefined,
};

/**
 * React Hook for OpenAI Whisper
 */
export const useWhisper = config => {
    const { streaming, timeSlice, Socket } = {
        ...defaultConfig,
        ...config,
    };

    useEffect(() => {
        if (Socket) {
            Socket.off("transcribed_audio");
            Socket.on("transcribed_audio", data => {
                // console.log("received audio");
                // console.log(data.id, currentTranscriptId.current);

                if (data.id !== currentTranscriptId.current) {
                    return;
                }
                // console.log("onInterim", { message });
                if (data.transcription) {
                    if (data.final) {
                        console.log("FINAL TRANSCRIPT:", data.transcription);
                        setFinalTranscript(data.transcription);
                        setTranscript(data.transcription);
                        currentTranscriptId.current = undefined;
                    } else if (!finalTranscript) {
                        setTranscript(data.transcription);
                    }
                }
            });
        }

        return () => {
            if (Socket) {
                Socket.off("transcribed_audio");
            }
        };
    }, [Socket]);

    const chunks = useRef([]);
    const listener = useRef();
    const recorder = useRef();
    const stream = useRef();
    const currentTranscriptId = useRef(undefined);
    const speakingRef = useRef(undefined);
    const spokenSinceLastChunk = useRef(undefined);
    const hasSpoken = useRef(false);

    const [recording, setRecording] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [transcribing, setTranscribing] = useState(false);
    const [blob, setBlob] = useState();
    const [transcript, setTranscript] = useState("");
    const [finalTranscript, setFinalTranscript] = useState("");

    /**
     * cleanup on component unmounted
     * - destroy recordrtc instance and clear it from ref
     * - clear setTimout for onStopRecording
     * - clean up hark speaking detection listeners and clear it from ref
     * - stop all user's media steaming track and remove it from ref
     */
    useEffect(() => {
        return () => {
            if (chunks.current) {
                chunks.current = [];
            }
            if (recorder.current) {
                recorder.current.destroy();
                recorder.current = undefined;
            }
            if (listener.current) {
                // @ts-ignore
                listener.current.off("speaking", onStartSpeaking);
                // @ts-ignore
                listener.current.off("stopped_speaking", onStopSpeaking);
            }
            if (stream.current) {
                stream.current.getTracks().forEach(track => track.stop());
                stream.current = undefined;
            }
        };
    }, []);

    /**
     * start speech recording and start listen for speaking event
     */
    const startRecording = async () => {
        setFinalTranscript("");
        setTranscript("");
        currentTranscriptId.current = nanoid();
        spokenSinceLastChunk.current = false;
        hasSpoken.current = false;
        await onStartRecording();
    };

    /**
     * pause speech recording also stop media stream
     */
    const pauseRecording = async () => {
        await onPauseRecording();
    };

    /**
     * stop speech recording and start the transcription
     */
    const stopRecording = async () => {
        await onStopRecording();
    };

    /**
     * start speech recording event
     * - first ask user for media stream
     * - create recordrtc instance and pass media stream to it
     * - check recorder state and start or resume recorder accordingly
     * - start timeout for stop timeout config
     * - update recording state to true
     */
    const onStartRecording = async () => {
        try {
            if (!stream.current) {
                await onStartStreaming();
            }
            if (stream.current) {
                if (!recorder.current) {
                    const {
                        default: { RecordRTCPromisesHandler },
                    } = await import("recordrtc");
                    const recorderConfig = {
                        mimeType: "audio/webm;codecs=pcm",
                        timeSlice: streaming ? timeSlice : undefined,
                        type: "audio",
                        ondataavailable: streaming
                            ? onDataAvailable
                            : undefined,
                    };
                    recorder.current = new RecordRTCPromisesHandler(
                        stream.current,
                        recorderConfig
                    );
                }
                const recordState = await recorder.current.getState();
                if (recordState === "inactive" || recordState === "stopped") {
                    await recorder.current.startRecording();
                }
                if (recordState === "paused") {
                    await recorder.current.resumeRecording();
                }
                setRecording(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * get user media stream event
     * - try to stop all previous media streams
     * - ask user for media stream with a system popup
     * - register hark speaking detection listeners
     */
    const onStartStreaming = async () => {
        try {
            if (stream.current) {
                stream.current.getTracks().forEach(track => track.stop());
            }
            stream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            if (!listener.current) {
                const { default: hark } = await import("hark");
                listener.current = hark(stream.current, {
                    interval: 50,
                    play: false,
                    threshold: -80,
                });
                listener.current.on("speaking", onStartSpeaking);
                listener.current.on("stopped_speaking", onStopSpeaking);
            }
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * user start speaking event
     * - set speaking state to true
     * - clear stop timeout
     */
    const onStartSpeaking = () => {
        console.log("start speaking");
        setSpeaking(true);
        speakingRef.current = true;
        spokenSinceLastChunk.current = true;
        hasSpoken.current = true;
    };

    /**
     * user stop speaking event
     * - set speaking state to false
     * - start stop timeout back
     */
    const onStopSpeaking = () => {
        console.log("stop speaking");
        setSpeaking(false);
        speakingRef.current = false;
    };

    /**
     * pause speech recording event
     * - if recorder state is recording, pause the recorder
     * - clear stop timeout
     * - set recording state to false
     */
    const onPauseRecording = async () => {
        try {
            if (recorder.current) {
                const recordState = await recorder.current.getState();
                if (recordState === "recording") {
                    await recorder.current.pauseRecording();
                }
                setRecording(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * stop speech recording event
     * - if recorder state is recording or paused, stop the recorder
     * - stop user media stream
     * - clear stop timeout
     * - set recording state to false
     * - start Whisper transcription event
     * - destroy recordrtc instance and clear it from ref
     */
    const onStopRecording = async () => {
        try {
            if (recorder.current) {
                const recordState = await recorder.current.getState();
                if (recordState === "recording" || recordState === "paused") {
                    await recorder.current.stopRecording();
                }
                onStopStreaming();
                setRecording(false);

                await onTranscribing();

                await recorder.current.destroy();
                chunks.current = [];
                recorder.current = undefined;
                setSpeaking(false);
                speakingRef.current = false;
                spokenSinceLastChunk.current = false;
            }
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * stop media stream event
     * - remove hark speaking detection listeners
     * - stop all media stream tracks
     * - clear media stream from ref
     */
    const onStopStreaming = () => {
        if (listener.current) {
            // @ts-ignore
            listener.current.off("speaking", onStartSpeaking);
            // @ts-ignore
            listener.current.off("stopped_speaking", onStopSpeaking);
            listener.current = undefined;
        }
        if (stream.current) {
            stream.current.getTracks().forEach(track => track.stop());
            stream.current = undefined;
        }
    };

    const onTranscribing = async () => {
        console.log("transcribing speech");
        try {
            if (recorder.current && hasSpoken.current) {
                const recordState = await recorder.current.getState();
                if (recordState === "stopped") {
                    setTranscribing(true);
                    const blob = await recorder.current.getBlob();
                    const file = new File([blob], "speech.webm", {
                        type: "audio/webm;codecs=pcm",
                    });
                    Socket.emit("transcribe_audio", {
                        file,
                        final: true,
                        id: currentTranscriptId.current,
                    });
                    setBlob(blob);
                    setTranscribing(false);
                }
            }
        } catch (err) {
            console.info(err);
            setTranscribing(false);
        }
    };

    /**
     * Get audio data in chunk based on timeSlice
     * - while recording send audio chunk to Whisper
     * - chunks are concatenated in succession
     * - set transcript text with interim result
     */
    const onDataAvailable = async data => {
        try {
            if (streaming && recorder.current) {
                chunks.current.push(data);
                if (!speakingRef.current && !spokenSinceLastChunk.current) {
                    console.log("IGNORING CHUNK BECAUSE SILENT");
                    return;
                }

                if (!speakingRef.current) {
                    spokenSinceLastChunk.current = false;
                }
                const recorderState = await recorder.current.getState();
                // console.log(speaking);

                if (recorderState === "recording") {
                    const blob = new Blob(chunks.current, {
                        type: "audio/webm;codecs=pcm",
                    });
                    const file = new File([blob], "speech.webm", {
                        type: "audio/webm;codecs=pcm",
                    });

                    console.log("SENDING AUDIO TO SERVER");

                    Socket.emit("transcribe_audio", {
                        file,
                        id: currentTranscriptId.current,
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    return {
        // dickhead??
        recording,
        speaking,
        transcribing,
        transcript,
        finalTranscript,
        blob,
        pauseRecording,
        startRecording,
        stopRecording,
    };
};
