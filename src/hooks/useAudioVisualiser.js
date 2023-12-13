import React from "react";

function useAudioVisualiser() {
    const [speaking, setSpeaking] = React.useState(false);
    const [multiplier, setMultiplier] = React.useState(undefined);

    const audio = React.useRef(new Audio());
    const audioContext = React.useRef();
    const analyserNode = React.useRef(null);
    const dataArray = React.useRef(null);
    const animationId = React.useRef(null);
    const audioSource = React.useRef(null);
    const currentPlaybackRate = React.useRef(1);

    const play = async src => {
        if (src) {
            audio.current.src = src;
        }
        // audio.current.load();

        audio.autoplay = true;
        if (audio.current.src && audio.current.src.startsWith("data:")) {
            try {
                audio.current.play();
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

    const toggleMute = () => {
        audio.current.muted = !audio.current.muted;
    };

    const reset = () => {
        audio.current.src = "";
        // audio.current.load();
        setSpeaking(false);
        animationId.current && cancelAnimationFrame(animationId.current);
        setMultiplier(1);
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
        setSpeaking(false);
        audio.current.pause();
        animationId.current && cancelAnimationFrame(animationId.current);
    };

    const setAudioSrc = src => {
        audio.current.src = src;
    };

    const setAudioSrcGetDuration = async src => {
        return new Promise((resolve, reject) => {
            audio.current.onloadedmetadata = () => {
                resolve(audio.current.duration);
                audio.current.onloadedmetadata = null;
            };
            audio.current.onerror = reject;
            audio.current.src = src;
        });
    };

    const setMuted = muted => {
        audio.current.muted = muted;
    };

    const addListener = (event, callback) => {
        audio.current[event] = callback;
    };

    const removeListener = event => {
        audio.current[event] = null;
    };

    const getAudio = () => {
        return audio.current;
    };

    React.useEffect(() => {
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
    }, []);

    return {
        audio,
        speaking,
        setSpeaking,
        multiplier,
        setMultiplier,
        play,
        updateMultiplier,
        animate,
        paused,
        toggleMute,
        reset,
        isMuted,
        getSpeed,
        setSpeed,
        pause,
        setAudioSrc,
        setAudioSrcGetDuration,
        setMuted,
        addListener,
        removeListener,
        getAudio,
    };
}

export default useAudioVisualiser;
