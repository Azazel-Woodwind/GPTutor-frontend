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
const Image = styled.img`
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
`;
const ImageCarousel = ({ learningObjective }) => {
    if (!learningObjective?.images) return null;
    const images = learningObjective.images;
    return (
        <ImageContainer>
            <ArrowLeft>
                <MdArrowLeft />
            </ArrowLeft>

            <ArrowRight>
                <MdArrowRightAlt />
            </ArrowRight>
            {learningObjective.title}
            {images.map(image => {
                return <Image src={image.link} />;
            })}
        </ImageContainer>
    );
};

const ArrowLeft = styled.div`
    position: absolute;
    top: 45%;
    left: -1em;
    width: 2em;
    height: 2em;
    z-index: 10;
`;

const ArrowRight = styled(ArrowLeft)`
    right: -1em;
`;
const ImageContainer = styled.div`
    position: relative;
    width: 60vw;
    max-width: 920px;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    text-align: center;
`;

function Classroom() {
    useConversationDisplay(false);
    const [currentImage, setCurrentImage] = React.useState(0);

    const navigate = useNavigate();

    const currentLesson = useLoaderData();

    const hook = useLesson({
        lessonID: currentLesson.id,
    });

    const { Controls, ChatHistory, Avatar } = useChat({
        hook: hook,
    });

    const {
        lesson,
        finished,
        started,
        learningObjectiveNumber,
        currentLearningObjective,
        nextImage,
        previousImage,
        currentImageLink,
        images,
    } = hook;

    return (
        <Container>
            <DualDisplay>
                <Avatar size={150} />
                {currentLearningObjective && (
                    <ImageCarousel
                        learningObjective={currentLearningObjective}
                    />
                )}
            </DualDisplay>
            <>
                <ChatHistoryWrapper>
                    <ChatHistory
                        height="15em"
                        prompt={"This is the classroom environment."}
                    />
                </ChatHistoryWrapper>
                <ControlSection>
                    <Controls
                        height="15em"
                        prompts={["Ut nostrud pariatur in ipsum."]}
                        hook={hook}
                    />
                </ControlSection>
            </>
        </Container>
    );
}

const ChatHistoryWrapper = styled.div`
    width: 100%;
    //background-color: rgb(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
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
    gap: 18em;
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
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5em;
`;

export default Classroom;
