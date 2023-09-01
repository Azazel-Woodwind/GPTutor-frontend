import CenteredColumn from "../../styles/containers/CenteredColumn";
import React from "react";
import {
    AnimatePresence,
    easeOut,
    motion,
    useAnimationControls,
} from "framer-motion";
import Button from "../../components/input/Button";
import DropdownList from "../../components/input/DropdownList";
import { useAppData } from "../../context/AppDataContext";
import DropdownListNew from "../../components/input/DropdownListNew";
import XAvatar from "../../components/XAvatar";
import styled from "styled-components";
import CollapsableText from "../../components/CollapsableText";
import ImageCarousel from "../../components/ImageCarousel";
import Pulse from "../../hooks/useXAvatar/Pulse";
import CenteredRow from "../../styles/containers/CenteredRow";
import useWhisper from "../../hooks/use-whisper";
import useFillingButton from "../../hooks/useFillingButton";
import {
    SocketContext,
    SocketContextProvider,
} from "../../context/SocketContext";
import { MicSvgData } from "../../lib/svgIconData";

const options = ["OPTION 1", "OPTION 2", "OPTION 3"];

const images = [
    "https://cdn.discordapp.com/attachments/1084532696732139790/1132026121169424515/5.png",
    "https://cdn.discordapp.com/attachments/1084532696732139790/1132026121425268756/6.png",
];

const MAX_INITIAL_VOICE_WAIT = 5000;
const MAX_VOICE_WAIT = 2000;

function Main() {
    const [emotion, setEmotion] = React.useState(null);
    const [numRings, setNumRings] = React.useState(1);
    const [variant, setVariant] = React.useState("slow");
    const [glow, setGlow] = React.useState(false);
    const [state, setState] = React.useState(true);

    const [hasSpoken, setHasSpoken] = React.useState(false);

    const timer = React.useRef(null);

    const { Socket } = React.useContext(SocketContext);

    // console.log(Socket);

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

    const toggleRecord = () => {
        if (filling) {
            stopAnimation();
        } else {
            startAnimation();
        }
    };

    return (
        <CenteredColumn fillparent>
            <AnimatePresence>
                {state && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            width: 200,
                            height: 200,
                            backgroundColor: "red",
                        }}
                        onAnimationComplete={animation => {
                            console.log(animation);
                            if (animation.opacity === 1) {
                                console.log("ENTER ANIMATION COMPLETE");
                            }
                        }}
                    />
                )}
            </AnimatePresence>
            <Button onClick={() => setState(prev => !prev)}>Toggle</Button>
            {/* <FillingButton
                {...MicSvgData}
                {...ComponentProps}
                scale={1.2}
                duration={10}
                iconSize={23}
                recording={recording}
                onClick={toggleRecord}
                speaking={speaking}
            />
            <div>{transcript && <p>{transcript}</p>}</div> */}
            {/* <XAvatar size={150} newEmotion={emotion} numRings={0} glow={glow} /> */}
            {/* <img src="/glow.svg" width="50" alt="description" /> */}
            {/* <Button onClick={() => setGlow(prev => !prev)}>Toggle glow</Button> */}
            {/* <CenteredRow gap="1rem">
                <Button
                    onClick={async () => {
                        setEmotion("excited");
                        setTimeout(() => {
                            setEmotion("neutral");
                        }, 4000);
                        // controls.start({
                        //     rotate: 360,
                        //     transition: {
                        //         duration: 2,
                        //         repeat: Infinity,
                        //         ease: "linear",
                        //     },
                        // });
                    }}>
                    Excited
                </Button>
                <Button
                    onClick={async () => {
                        setEmotion("happy");
                        setTimeout(() => {
                            setEmotion("neutral");
                        }, 4000);
                    }}>
                    Happy
                </Button>
            </CenteredRow> */}
        </CenteredColumn>
    );
}

function Test1() {
    return (
        <SocketContextProvider>
            <Main />
        </SocketContextProvider>
    );
}

const TestContainer = styled(motion.div)`
    width: 600px;
    padding: 1rem;
    line-height: 1.25rem;
    background-color: rgba(255, 255, 255, 0.1);
    overflow: hidden;

    ${props =>
        props.closed &&
        !props.open &&
        `
        white-space: nowrap;
        text-overflow: ellipsis;
    `}
`;

const Container = styled.div`
    width: 600px;
`;

export default Test1;
