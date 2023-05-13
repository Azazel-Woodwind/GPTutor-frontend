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
import Header from "../components/Classroom/ClassroomHeader";

import { fade_exit, fade_animation } from "../styles/FramerAnimations";
import EndOfLessonModal from "../components/Classroom/EndOfLessonModal";
import StartLessonModal from "../components/Classroom/StartLessonModal";
import ChatHistory from "../components/ChatHistory";
import Controls from "../components/Controls";
import React from "react";
import { ChatSection } from "../components/Chat";
import { SessionContext } from "../context/SessionContext";

function Classroom() {
    const currentLesson = useLoaderData();

    const [classroomHeight, setClassroomHeight] = React.useState(undefined);

    const hook = useLesson({
        currentLesson,
        delay: 1000,
    });

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
        streaming,
        speaking,
    } = hook;

    const getClassroomHeight = React.useCallback(ref => {
        if (ref) {
            setClassroomHeight(ref.offsetHeight);
        }
    }, []);

    // console.log("IMAGES:", images);

    const renderComponent = () => {
        if (started === undefined) {
            return (
                <LoadingScreenWrapper key="loading" {...fade_animation()}>
                    <Loading centered={false} />
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

        if (finished && !streaming && !speaking) {
            return <EndOfLessonModal key="endModal" lesson={currentLesson} />;
        }

        return (
            <Container
                ref={getClassroomHeight}
                classroomHeight={classroomHeight}
                {...fade_animation()}
                key="classroom">
                {classroomHeight && (
                    <>
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
                                    {images?.filter(image => image.length > 0)
                                        .length > 0 && (
                                        <GalleryContainer
                                            as={motion.div}
                                            layout
                                            layoutId="container"
                                            {...fade_animation({
                                                delayed: true,
                                            })}>
                                            <Gallery
                                                images={images}
                                                currentImageIndex={
                                                    currentImageIndex
                                                }
                                            />
                                        </GalleryContainer>
                                    )}
                                </AnimatePresence>
                            </LayoutGroup>
                        </DualDisplay>
                        <ChatSection
                            {...fade_animation({ delayed: true })}
                            hook={hook}
                            prompt={"This is the classroom environment."}
                        />
                    </>
                )}
            </Container>
        );
    };

    return <AnimatePresence mode="wait">{renderComponent()}</AnimatePresence>;
}

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
    flex: 1;
`;

const Container = styled(motion.div)`
    /* position: relative; */

    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    /* border: 3px solid red; */
    flex-grow: 1;
    ${props =>
        props.classroomHeight &&
        `height: ${props.classroomHeight}px;`}/* border: 3px solid green; */
`;

export default Classroom;
