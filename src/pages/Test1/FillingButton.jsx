import { SocketContext } from "@/context/SocketContext";
import useFillingButton from "@/hooks/useFillingButton/useFillingButton";
import useWhisper from "@/hooks/useWhisper";
import { MicSvgData } from "@/lib/svgIconData";
import React from "react";

const MAX_INITIAL_VOICE_WAIT = 5_000;
const MAX_VOICE_WAIT = 3000;

function FillingButton() {
    const [hasSpoken, setHasSpoken] = React.useState(false);
    const { Socket } = React.useContext(SocketContext);

    const timer = React.useRef(null);

    const toggleRecord = () => {
        if (filling) {
            stopAnimation();
        } else {
            startAnimation();
        }
    };

    const {
        startRecording,
        stopRecording,
        transcript,
        recording,
        finalTranscript,
        speaking,
    } = useWhisper({ Socket });

    const {
        Component: FillingButton,
        ComponentProps,
        startAnimation,
        stopAnimation,
        filling,
    } = useFillingButton({
        onAnimationStart: async () => {
            // console.log(10);
            setHasSpoken(false);
            await startRecording();
            timer.current = setTimeout(() => {
                console.log("MAX INITIAL WAIT TIME REACHED");
                stopAnimation();
            }, MAX_INITIAL_VOICE_WAIT);
        },
        onAnimationEnd: () => {
            console.log("ANIMATION STOPPED");
            stopRecording();
        },
    });

    React.useEffect(() => {
        if (speaking) {
            if (!hasSpoken) {
                console.log("SPOKEN FOR THE FIRST TIME");
                setHasSpoken(true);
            }
            clearTimeout(timer.current);
            return;
        }

        if (hasSpoken) {
            timer.current = setTimeout(() => {
                console.log("MAX WAIT TIME REACHED");
                stopAnimation();
            }, MAX_VOICE_WAIT);
        }
    }, [speaking]);

    return (
        <div>
            <FillingButton
                {...MicSvgData}
                {...ComponentProps}
                scale={1.2}
                duration={10}
                iconSize={23}
                recording={recording}
                onClick={toggleRecord}
                speaking={speaking}
            />
            <p>transcript: {transcript}</p>
            <p>final: {finalTranscript}</p>
        </div>
    );
}

export default FillingButton;
