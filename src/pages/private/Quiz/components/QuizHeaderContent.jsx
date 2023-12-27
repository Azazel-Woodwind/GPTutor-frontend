import styled from "styled-components";
import ExitButton from "@/components/application/Header/ExitButton";
import HeaderContent from "../../../components/Header/HeaderContent";

function QuizHeaderContent({
    lesson,
    answerIsCorrect,
    currentQuestion,
    setExit,
}) {
    return (
        <HeaderContent
            centerContent={<Title>{lesson.title}</Title>}
            rightContent={
                <ExitButton
                    outline={!(answerIsCorrect && currentQuestion?.final)}
                    onClick={() => {
                        setExit(true);
                    }}
                />
            }
        />
    );
}

const Title = styled.div`
    font-size: 1.8rem;
    font-weight: 400;
`;

export default QuizHeaderContent;
