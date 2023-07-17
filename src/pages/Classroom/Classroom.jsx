import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React from "react";
import { useLoaderData } from "react-router-dom/dist/umd/react-router-dom.development";
import styled from "styled-components";
import useXLesson from "../../hooks/useX/useXLesson";
import useConversationDisplay from "../../hooks/useConversationDisplay";
import Loading from "../Loading/Loading";
import XAvatar from "../../components/XAvatar";
import { fade_animation } from "../../styles/FramerAnimations";
import StartLessonModal from "./components/StartLessonModal";
import HeaderContent from "../../components/Header/HeaderContent";
import ExitButton from "../../components/input/ExitButton";
import ChatSection from "../../components/Chat/ChatSection";
import ProgressBar from "../../components/ProgressBar";
import ImageCarousel from "../../components/ImageCarousel";
import EndOfLessonModal from "./components/EndOfLessonModal";
import ClassroomHeader from "./components/ClassroomHeader";
import { useHeader } from "../../context/HeaderContext";

function Classroom() {
    const currentLesson = useLoaderData();

    const [classroomHeight, setClassroomHeight] = React.useState(undefined);
    const [exit, setExit] = React.useState(false);

    const hook = useXLesson({
        currentLesson,
        delay: 1000,
    });

    useConversationDisplay(false);

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
        isMuted,
    } = hook;

    const getClassroomHeight = React.useCallback(ref => {
        if (ref) {
            setClassroomHeight(ref.offsetHeight);
        }
    }, []);

    const { setShowMainHeader } = useHeader();

    React.useEffect(() => {
        setShowMainHeader(false);
        return () => {
            setShowMainHeader(true);
        };
    }, []);

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

        if (exit) {
            return <EndOfLessonModal key="endModal" lesson={currentLesson} />;
        }

        return (
            <Container
                ref={getClassroomHeight}
                classroomHeight={classroomHeight}
                {...fade_animation()}
                key="classroom">
                <ClassroomHeader
                    learningObjectiveNumber={learningObjectiveNumber}
                    currentLesson={currentLesson}
                    finished={finished}
                    streaming={streaming}
                    speaking={speaking}
                    isMuted={isMuted}
                    setExit={setExit}
                />
                {classroomHeight && (
                    <>
                        <DualDisplay>
                            <LayoutGroup>
                                <XAvatar
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
                                            <ImageCarousel
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

const LoadingScreenWrapper = styled(motion.div)``;

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
    gap: 9.38rem;
    flex: 1;
`;

const Container = styled(motion.div)`
    /* position: relative; */

    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    /* border: 3px solid red; */
    flex-grow: 1;
    ${props =>
        props.classroomHeight &&
        `height: ${props.classroomHeight}px;`}/* border: 3px solid green; */
`;

export default Classroom;
