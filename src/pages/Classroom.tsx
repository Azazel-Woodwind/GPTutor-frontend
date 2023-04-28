import styled from "styled-components";
import useConversationDisplay from "../hooks/useConversationDisplay";
import { useLoaderData } from "react-router-dom";
import useLesson from "../hooks/useX/useXLesson";
import useChat, { AnimatedAvatar } from "../hooks/useChat";
import Gallery from "../components/Gallery";
import Loading from "./Loading";
import {
    AnimatePresence,
    LayoutGroup,
    motion,
    useMotionValue,
} from "framer-motion";
import Header from "./classroom/Header";

import { fade_exit, fade_animation } from "../styles/FramerAnimations";
import EndOfLessonModal from "./classroom/EndOfLessonModal";
import StartLessonModal from "./classroom/StartLessonModal";
import ChatHistory from "../components/ChatHistory";
import Controls from "../components/Controls";
import React from "react";

function Classroom() {
    const currentLesson = useLoaderData();

    const hook = useLesson({
        currentLesson,
        delay: 1000,
    });

    // const { Controls, ChatHistory, Avatar, AvatarProps } = useChat({
    //     hook,
    // });

    const display = useConversationDisplay(false);

    const {
        lesson,
        finished,
        started,
        setStarted,
        learningObjectiveNumber,
        currentLearningObjective,
        nextImage,
        previousImage,
        currentImageLink,
        images,
        toggleMute,
        getSpeed,
        setSpeed,
        paused,
        pause,
        play,
        currentImageIndex,
    } = hook;

    const containerHeight = useMotionValue("100%");

    const callback = React.useCallback(ref => {
        if (ref) {
            containerHeight.set(ref.offsetHeight);
        }
    }, []);

    const renderComponent = () => {
        if (started === undefined) {
            return (
                <LoadingScreenWrapper key="loading" {...fade_animation()}>
                    <Loading />
                </LoadingScreenWrapper>
            );
        }

        if (started === false) {
            return (
                <StartLessonModal
                    key="startModal"
                    lesson={currentLesson}
                    setStarted={setStarted}
                />
            );
        }

        if (finished) {
            return <EndOfLessonModal key="endModal" lesson={currentLesson} />;
        }

        return (
            <Container
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                key="classroom">
                <Header
                    currentLearningObjective={currentLearningObjective}
                    currentLesson={currentLesson}
                    learningObjectiveNumber={learningObjectiveNumber}
                />
                <DualDisplay>
                    <LayoutGroup>
                        <AnimatedAvatar
                            {...hook}
                            hasControls
                            clickable
                            size={140}
                            layout
                            layoutId="avatar"
                            {...fade_animation()}
                        />
                        <AnimatePresence>
                            {images?.length > 0 && (
                                <GalleryContainer
                                    as={motion.div}
                                    layout
                                    layoutId="container"
                                    {...fade_animation({ delayed: true })}>
                                    <Gallery
                                        images={images}
                                        currentImageIndex={currentImageIndex}
                                    />
                                </GalleryContainer>
                            )}
                        </AnimatePresence>
                    </LayoutGroup>
                </DualDisplay>
                <ChatSection
                    {...fade_animation({ delayed: true })}
                    ref={callback}
                    style={{ height: containerHeight }}>
                    <ChatHistory
                        hook={hook}
                        // initialHeight={300}
                        containerHeight={containerHeight}
                        prompt={"This is the classroom environment."}
                    />
                    <Controls hook={hook} />
                </ChatSection>
            </Container>
        );
    };

    return <AnimatePresence mode="wait">{renderComponent()}</AnimatePresence>;
}

const ChatSection = styled(motion.div)`
    max-width: 1200px;
    width: 100%;
    /* height: 300px; */
    /* flex: 0 1 100%; */
    /* flex-basis: 100%; */
    display: flex;
    flex-direction: column;
    /* border: 5px solid red; */
`;
const LoadingScreenWrapper = styled(motion.div)`
    height: 100%;
    width: 100%;
`;

const GalleryContainer = styled.div`
    position: relative;
    width: 60vw;
    max-width: 920px;
    display: flex;
    height: 100%;
    flex-direction: column;
    font-weight: 600;
    text-align: center;
    background-color: ${props => props.theme.colours.tertiary};
`;

const DualDisplay = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 150px;
    flex-grow: 1;
`;

const Container = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    padding-top: 5em;
    /* border: 3px solid blue; */
`;

export default Classroom;
