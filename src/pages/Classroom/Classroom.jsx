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
import QuizQuestion from "../../components/Quiz/QuizQuestion";
import Question from "./components/Question";

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
    console.log(finishedLearningObjective, streaming, loading);

    const showQuizQuestions = finishedLearningObjective && !streaming;

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
                                        (showQuizQuestions ? (
                                            <QuizQuestionContainer
                                                key={`question${currentQuestionNum}`}
                                                {...fade_animation()}
                                                onAnimationComplete={animation => {
                                                    if (
                                                        animation.opacity === 1
                                                    ) {
                                                        console.log(
                                                            "STARTING QUIZ QUESTION:",
                                                            currentQuestionNum
                                                        );
                                                        changeQuestion(
                                                            currentQuestionNum
                                                        );
                                                    }
                                                }}>
                                                <Question
                                                    i={currentQuestionNum}
                                                    finishLearningObjectiveQuestions={
                                                        finishLearningObjectiveQuestions
                                                    }
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
                            {!showQuizQuestions && (
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
