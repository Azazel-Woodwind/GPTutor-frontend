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
// import LessonFinished from "./LessonFinished";

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
    } = hook;

    const imagesA = [
        "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
        "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
        "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
    ];

    const { open, handleClose, handleOpen, ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    return (
        <AnimatePresence mode="wait" initial={false}>
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
                    <Modal {...ModalProps}>
                        <CenteredColumn fillparent>
                            <CustomButton
                                onClick={() => {
                                    setStarted(true);
                                }}>
                                Click here to start the lesson!
                            </CustomButton>
                        </CenteredColumn>
                    </Modal>
                </motion.div>
            ) : !finished ? (
                <Container
                    key="classroom"
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}>
                    <DualDisplay>
                        <LayoutGroup>
                            <Avatar
                                {...AvatarProps}
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
                            />
                            <AnimatePresence>
                                {imagesA && (
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
                                        <Gallery images={imagesA} />
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
                    <Modal {...ModalProps}>
                        <CenteredColumn fillparent>
                            <h1> Lesson has been completed </h1>
                            <CustomButton
                                onClick={() => {
                                    navigate("/hub");
                                }}>
                                Return to main menu
                            </CustomButton>
                        </CenteredColumn>
                    </Modal>
                </motion.div>
            )}
        </AnimatePresence>
    );
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
