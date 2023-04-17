import { ChatContext } from "../context/ChatContext";
import React from "react";
import styled from "styled-components";
import Chat from "../components/Chat";
import useConversationDisplay from "../hooks/useConversationDisplay";
import Button from "../components/Button";
import useChat from "../hooks/useChat";
import { useNavigate } from "react-router-dom";
import useLesson from "../hooks/useX/useXLesson";
import { Textfield } from "../components/Textfield";
import { MdArrowRightAlt, MdArrowLeft } from "react-icons/md";

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
    const navigate = useNavigate();
    const hook = useLesson({
        lessonID: `28a739ac-9e3b-489d-a8be-5f0caa020daf`,
    });

    const { Controls, ChatHistory, X } = useChat({
        prompts: ["Ut nostrud pariatur in ipsum."],
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

    const [currentImage, setCurrentImage] = React.useState(0);
    return (
        <Container>
            <DualDisplay>
                <X size={175} />
                {currentLearningObjective && (
                    <ImageCarousel
                        learningObjective={currentLearningObjective}
                    />
                )}
            </DualDisplay>
            <ChatHistoryWrapper>
                <ChatHistory
                    height="15em"
                    prompt={"This is the classroom environment."}
                />
            </ChatHistoryWrapper>
            <ControlSection>
                <LessonOptions>
                    <Button outline onClick={e => navigate("/hub")}>
                        Exit Lesson
                    </Button>
                </LessonOptions>
                <Controls />
            </ControlSection>
        </Container>
    );
}

const ChatHistoryWrapper = styled.div`
    width: 100%;
    //background-color: rgb(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
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
`;
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Classroom;
