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

        if (exit) {
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
                        <HeaderContent
                            centerContent={
                                <Title
                                    progressBarShown={
                                        learningObjectiveNumber > 0
                                    }>
                                    {learningObjectiveNumber > 0 ? (
                                        <div style={{ paddingTop: "20px" }}>
                                            <ProgressBar
                                                width="35em"
                                                value={learningObjectiveNumber}
                                                max={
                                                    currentLesson
                                                        .learning_objectives
                                                        .length
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            {currentLesson?.title &&
                                                currentLesson.title}
                                        </>
                                    )}
                                </Title>
                            }
                            rightContent={
                                <ExitButton
                                    outline={
                                        !(
                                            finished &&
                                            !streaming &&
                                            (isMuted() || !speaking)
                                        )
                                    }
                                    onClick={() => setExit(true)}
                                />
                            }
                        />
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

const Title = styled.div`
    font-size: 1.8em;
    font-weight: 400;

    ${props =>
        props.progressBarShown &&
        `
    top: 40px;
    @media (max-width: 1600px) {
        font-size: 1.5em;
    }

    @media (max-width: 1400px) {
        font-size: 1em;
        top: 50px;
    }

    @media (max-width: 1100px) {
        font-size: 0.7em;
        top: 55px;
    }

    @media (max-width: 900px) {
        font-size: 0.5em;
    }
    `}
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
