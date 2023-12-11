import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import useXLesson from "../../../hooks/useX/useXLesson";
import useConversationDisplay from "../../../hooks/useConversationDisplay";
import { fade_animation } from "@/lib/animation";
import StartLessonModal from "./components/StartLessonModal";
import ChatSection from "../../../components/application/Chat/ChatSection";
import EndOfLessonModal from "./components/EndOfLessonModal";
import ClassroomHeader from "./components/ClassroomHeader";
import { useHeader } from "../../../context/HeaderContext";
import Question from "./components/Question";
import { useLoaderData } from "react-router-dom";
import Loading from "@/pages/public/Loading/Loading";
import XAvatar from "@/components/application/XAvatar";
import ImageCarousel from "@/components/common/dataDisplay/ImageCarousel";

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
        finished,
        started,
        setStarted,
        learningObjectiveNumber,
        images,
        currentImageIndex,
        streaming,
        speaking,
        isMuted,
        finishedLearningObjective,
        currentQuestionNum,
        finishLearningObjectiveQuestions,
        loading,
        changeQuestion,
        getQuestionTitleAudio,
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

    // console.log(images?.filter(image => image.length > 0).length);
    // console.log(finishedLearningObjective, streaming, loading);

    // const showQuizQuestions = finishedLearningObjective && !streaming;

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
                                <AnimatePresence mode="wait">
                                    {images?.filter(image => image.length > 0)
                                        .length > 0 &&
                                        (finishedLearningObjective ? (
                                            <QuizQuestionContainer
                                                key={`question${currentQuestionNum}`}
                                                {...fade_animation()}
                                                onAnimationComplete={animation => {
                                                    console.log(
                                                        "ANIMATION:",
                                                        animation
                                                    );
                                                    if (
                                                        animation === "visible"
                                                    ) {
                                                        console.log(
                                                            "STARTING QUIZ QUESTION:",
                                                            currentQuestionNum
                                                        );
                                                        getQuestionTitleAudio();
                                                    }
                                                }}>
                                                <Question
                                                    i={currentQuestionNum}
                                                    finishLearningObjectiveQuestions={
                                                        finishLearningObjectiveQuestions
                                                    }
                                                    setExit={setExit}
                                                    {...hook}
                                                />
                                            </QuizQuestionContainer>
                                        ) : (
                                            <GalleryContainer
                                                key="gallery"
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
                                                    animationType="fade"
                                                />
                                            </GalleryContainer>
                                        ))}
                                </AnimatePresence>
                            </LayoutGroup>
                        </DualDisplay>
                        <AnimatePresence>
                            {!finishedLearningObjective && (
                                <ChatSection
                                    {...fade_animation()}
                                    hook={hook}
                                    prompt={
                                        "This is the classroom environment."
                                    }
                                />
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Container>
        );
    };

    return <AnimatePresence mode="wait">{renderComponent()}</AnimatePresence>;
}

const LoadingScreenWrapper = styled(motion.div)``;

const QuizQuestionContainer = styled(motion.div)`
    width: fit-content;
    height: fit-content;
`;

const GalleryContainer = styled.div`
    position: relative;
    width: 60vw;
    max-width: 920px;
    display: flex;
    height: 100%;
    max-height: 520px;
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
