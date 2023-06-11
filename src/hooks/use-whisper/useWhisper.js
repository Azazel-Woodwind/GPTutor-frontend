import { useEffectAsync, useMemoAsync } from "@chengsokdara/react-hooks-async";
import { useEffect, useRef, useState } from "react";

import {
    defaultStopTimeout,
    ffmpegCoreUrl,
    silenceRemoveCommand,
} from "./configs";
import { nanoid } from "nanoid";

/**
 * default useWhisper configuration
 */
const defaultConfig = {
    apiKey: "",
    autoStart: false,
    autoTranscribe: true,
    mode: "transcriptions",
    nonStop: false,
    removeSilence: false,
    stopTimeout: defaultStopTimeout,
    streaming: true,
    timeSlice: 1_100,
    onDataAvailable: undefined,
    onTranscribe: undefined,
    Socket: undefined,
};

/**
 * default timeout for recorder
 */
const defaultTimeout = {
    stop: undefined,
};

/**
 * React Hook for OpenAI Whisper
 */
export const useWhisper = config => {
    const {
        autoStart,
        autoTranscribe,
        mode,
        nonStop,
        removeSilence,
        stopTimeout,
        streaming,
        timeSlice,
        whisperConfig,
        Socket,
        onDataAvailable: onDataAvailableCallback,
        onTranscribe: onTranscribeCallback,
        onFinalTranscript,
    } = {
        ...defaultConfig,
        ...config,
    };

    useEffect(() => {
        if (Socket) {
            Socket.off("transcribed_audio");
            Socket.on("transcribed_audio", data => {
                console.log(data.id, currentTranscriptId.current);

                if (data.id !== currentTranscriptId.current) {
                    return;
                }
                // console.log("onInterim", { message });
                if (data.transcription) {
                    if (data.final) {
                        console.log("FINAL TRANSCRIPT:", data.transcription);
                        setFinalTranscript(data.transcription);
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
    const timeout = useRef(defaultTimeout);
    const currentTranscriptId = useRef(undefined);

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
            onStopTimeout("stop");
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
     * if config.autoStart is true
     * start speech recording immediately upon component mounted
     */
    useEffectAsync(async () => {
        if (autoStart) {
            await onStartRecording();
        }
    }, [autoStart]);

    /**
     * start speech recording and start listen for speaking event
     */
    const startRecording = async () => {
        setFinalTranscript("");
        setTranscript("");
        currentTranscriptId.current = nanoid();
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
                        mimeType: "audio/webm",
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
                if (nonStop) {
                    onStartTimeout("stop");
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
                    interval: 100,
                    play: false,
                });
                listener.current.on("speaking", onStartSpeaking);
                listener.current.on("stopped_speaking", onStopSpeaking);
            }
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * start stop timeout event
     */
    const onStartTimeout = type => {
        if (!timeout.current[type]) {
            timeout.current[type] = setTimeout(onStopRecording, stopTimeout);
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
        onStopTimeout("stop");
    };

    /**
     * user stop speaking event
     * - set speaking state to false
     * - start stop timeout back
     */
    const onStopSpeaking = () => {
        console.log("stop speaking");
        setSpeaking(false);
        if (nonStop) {
            onStartTimeout("stop");
        }
    };

    /**
     * pause speech recording event
     * - if recorder state is recording, pause the recorder
     * - clear stop timeout
     * - set recoriding state to false
     */
    const onPauseRecording = async () => {
        try {
            if (recorder.current) {
                const recordState = await recorder.current.getState();
                if (recordState === "recording") {
                    await recorder.current.pauseRecording();
                }
                onStopTimeout("stop");
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
                onStopTimeout("stop");
                setRecording(false);
                console.log("HERE HERE HERE");

                if (autoTranscribe) {
                    await onTranscribing();
                } else {
                    const blob = await recorder.current.getBlob();
                    setBlob(blob);
                }
                await recorder.current.destroy();
                chunks.current = [];
                recorder.current = undefined;
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

    /**
     * stop timeout event
     * - clear stop timeout and remove it from ref
     */
    const onStopTimeout = type => {
        if (timeout.current[type]) {
            clearTimeout(timeout.current[type]);
            timeout.current[type] = undefined;
        }
    };

    /**
     * start Whisper transcrition event
     * - make sure recorder state is stopped
     * - set transcribing state to true
     * - get audio blob from recordrtc
     * - if config.removeSilence is true, load ffmpeg-wasp and try to remove silence from speec
     * - if config.customServer is true, send audio data to custom server in base64 string
     * - if config.customServer is false, send audio data to Whisper api in multipart/form-data
     * - set transcript object with audio blob and transcription result from Whisper
     * - set transcribing state to false
     */

    const onTranscribing = async () => {
        // console.log("transcribing speech");
        try {
            if (recorder.current) {
                const recordState = await recorder.current.getState();
                if (recordState === "stopped") {
                    setTranscribing(true);
                    let blob = await recorder.current.getBlob();
                    if (removeSilence) {
                        const { createFFmpeg } = await import("@ffmpeg/ffmpeg");
                        const ffmpeg = createFFmpeg({
                            mainName: "main",
                            corePath: ffmpegCoreUrl,
                            log: true,
                        });
                        if (!ffmpeg.isLoaded()) {
                            await ffmpeg.load();
                        }
                        const buffer = await blob.arrayBuffer();
                        console.log({ in: buffer.byteLength });
                        ffmpeg.FS(
                            "writeFile",
                            "speech.webm",
                            new Uint8Array(buffer)
                        );
                        await ffmpeg.run(
                            "-i", // Input
                            "speech.webm",
                            "-acodec", // Audio codec
                            "libmp3lame",
                            "-aq", // Audio quality
                            "6",
                            "-ar", // Audio sample rate
                            "44100",
                            "-af", // Audio filter = remove silence from start to end with 2 seconds in between
                            silenceRemoveCommand,
                            "speech.mp3" // Output
                        );
                        const out = ffmpeg.FS("readFile", "speech.mp3");
                        console.log({ out: out.buffer.byteLength });
                        // 225 seems to be empty mp3 file
                        if (out.length <= 225) {
                            ffmpeg.exit();
                            setBlob(blob);
                            setTranscribing(false);
                            return;
                        }
                        blob = new Blob([out.buffer], { type: "audio/mpeg" });
                        ffmpeg.exit();
                    }
                    if (typeof onTranscribeCallback === "function") {
                        const transcribed = await onTranscribeCallback(blob);
                        console.log("onTranscribe", transcribed);
                        setTranscript(transcribed.text);
                    } else {
                        let file = new File([blob], "speech.webm", {
                            type: "audio/webm;codecs=opus",
                        });
                        if (removeSilence) {
                            file = new File([blob], "speech.mp3", {
                                type: "audio/mpeg",
                            });
                        }
                        Socket.emit("transcribe_audio", {
                            file,
                            final: true,
                            id: currentTranscriptId.current,
                        });
                        // const text = await onWhispered(file);
                        // console.log("onTranscribing", { text });
                        setBlob(blob);
                    }
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
        // console.log("onDataAvailable", data);
        try {
            if (streaming && recorder.current) {
                onDataAvailableCallback?.(data);
                chunks.current.push(data);
                const recorderState = await recorder.current.getState();
                console.log(speaking);

                if (recorderState === "recording") {
                    const blob = new Blob(chunks.current, {
                        type: "audio/webm;codecs=opus",
                    });
                    const file = new File([blob], "speech.webm", {
                        type: "audio/webm;codecs=opus",
                    });

                    // const body = new FormData();
                    // const base64 = await new Promise<string | ArrayBuffer | null>(
                    //   (resolve) => {
                    //     const reader = new FileReader()
                    //     reader.onloadend = () => resolve(reader.result)
                    //     reader.readAsDataURL(blob)
                    //   }
                    // )

                    console.log("sending audio to server");

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

    /**
     * Send audio file to Whisper to be transcribed
     * - create formdata and append file, model, and language
     * - append more Whisper config if whisperConfig is provided
     * - add OpenAPI Token to header Authorization Bearer
     * - post with axios to OpenAI Whisper transcript endpoint
     * - return transcribed text result
     */
    const onWhispered = useMemoAsync(async file => {
        const body = new FormData();
        body.append("file", file);
        Socket.emit("lesson_transcribe_audio", { body });

        const response = await new Promise(resolve =>
            Socket.on("transcribed_audio", resolve)
        );
        return response.data.text;
    });

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