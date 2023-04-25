import { ChatContext } from "../context/ChatContext";
import React, { useContext } from "react";
import styled from "styled-components";
import useConversationDisplay from "../hooks/useConversationDisplay";
import Button from "../components/Button";
import Chatbox from "../hooks/useChat";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useLesson from "../hooks/useX/useXLesson";
import { Textfield } from "../components/Textfield";
import { MdArrowRightAlt, MdArrowLeft } from "react-icons/md";
import useAvatar from "../hooks/useAvatar";
import useChat from "../hooks/useChat";
import Gallery from "../components/Gallery";
import CenteredColumn from "../styles/containers/CenteredColumn";
import CustomButton from "../components/Button";
import useModal from "../hooks/useModal";
import Loading from "./Loading";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ProgressBar from "../components/ProgressBar";

import IconButton from "../components/IconButton";
import XControls from "../components/Classroom/XControls";
import EndOfLessonModal from "../components/Classroom/EndOfLessonModal";
import StartLessonModal from "../components/Classroom/StartLessonModal";

const images = [
    "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
    "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

function Classroom() {
    useConversationDisplay(false);
    const [currentImage, setCurrentImage] = React.useState(0);

    const navigate = useNavigate();

    const currentLesson = useLoaderData();
    const hook = useLesson({
        currentLesson,
        delay: 1000,
    });

    const { Controls, ChatHistory, Avatar, AvatarProps } = useChat({
        hook: hook,
    });

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
        speaking,
        pause,
        play,
    } = hook;

    const [isMuted, setIsMuted] = React.useState(false);
    const [showControls, setShowControls] = React.useState(false);

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Header>
                <ExitButton>
                    <CustomButton outline onClick={() => navigate("/lessons")}>
                        Exit Lesson
                    </CustomButton>
                </ExitButton>
                <Title>
                    {learningObjectiveNumber > 0 && (
                        <ProgressBar
                            width="35em"
                            value={learningObjectiveNumber}
                            max={currentLesson.learning_objectives.length}
                        />
                    )}
                    {currentLearningObjective?.title &&
                        currentLearningObjective.title + " 🗿"}
                </Title>
            </Header>
            {started === undefined ? (
                <LoadingScreenWrapper
                    key="loading"
                    initial={false}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}>
                    <Loading />
                </LoadingScreenWrapper>
            ) : started === false ? (
                <motion.div
                    key="modal"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.5 } },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}>
                    <StartLessonModal
                        onClick={() => {
                            setStarted(true);
                        }}
                    />
                </motion.div>
            ) : !finished ? (
                <Container
                    key="classroom"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}>
                    <DualDisplay>
                        <LayoutGroup>
                            <div
                                onMouseEnter={() => setShowControls(true)}
                                onMouseLeave={() => setShowControls(false)}
                                style={{
                                    // border: "3px solid black",
                                    position: "relative",
                                }}>
                                <Avatar
                                    {...AvatarProps}
                                    clickable
                                    size={140}
                                    layout
                                    layoutId="avatar"
                                    transition={{ duration: 0.5 }}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: { duration: 0.5 },
                                        },
                                    }}
                                    XProps={{
                                        onClick: speaking ? pause : play,
                                    }}
                                />
                                <AnimatePresence>
                                    {showControls && (
                                        <XControls
                                            isMuted={isMuted}
                                            setIsMuted={setIsMuted}
                                            toggleMute={toggleMute}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence>
                                {images?.length > 0 && (
                                    <GalleryContainer
                                        as={motion.div}
                                        layout
                                        layoutId="container"
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.5 },
                                        }}
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: {
                                                    duration: 0.5,
                                                    delay: 0.5,
                                                },
                                            },
                                        }}>
                                        <Gallery images={images} />
                                    </GalleryContainer>
                                )}
                            </AnimatePresence>
                        </LayoutGroup>
                    </DualDisplay>
                    <motion.div
                        style={{ width: "100%", maxWidth: "1200px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { duration: 0.5, delay: 0.5 },
                            },
                        }}>
                        <ChatHistoryWrapper>
                            <ChatHistory
                                height="12em"
                                prompt={"This is the classroom environment."}
                            />
                        </ChatHistoryWrapper>
                        <ControlSection>
                            <Controls />
                        </ControlSection>
                    </motion.div>
                </Container>
            ) : (
                <motion.div
                    key="modal"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.5 } },
                    }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}>
                    <EndOfLessonModal />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const Title = styled.h3`
    margin: auto;
    align-items: center;
    justify-content: center;
`;
const Header = styled.div`
    position: absolute;
    top: 0px;
    padding: 1.5em;
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
`;

const ExitButton = styled.div`
    position: absolute;
    top: 1em;
    right: 1em;
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

const ChatHistoryWrapper = styled.div`
    width: 100%;
    //background-color: rgb(0, 0, 0, 0.1);
    display: flex;
    flex-direction: reverse-column;
    max-width: 1200px;
`;
const LessonOptions = styled.div`
    position: absolute;
    left: 1em;
`;

const DualDisplay = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 150px;
    flex-grow: 1;
`;

const ControlSection = styled.div`
    background-color: rgb(0, 0, 0, 0.1);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
`;
const Container = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    margin-top: 5em;
`;

export default Classroom;
