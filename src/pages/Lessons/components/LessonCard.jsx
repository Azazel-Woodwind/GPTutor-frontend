import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import {
    capitaliseFirstLetter,
    formatEducationLevel,
} from "../../../lib/stringUtils";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/input/Button";
import { interpolateColor } from "../../../lib/misc";

function LessonCard({ lesson }) {
    const navigate = useNavigate();

    return (
        <Container
            as={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
                console.log("LESSON");
                navigate(
                    `/lessons/${lesson.title.replaceAll(" ", "-")}?id=${
                        lesson.id
                    }`
                );
            }}>
            <Title>{capitaliseFirstLetter(lesson.title)}</Title>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                }}>
                {lesson.exam_boards.map(board => (
                    <Subject key={board}>{board}</Subject>
                ))}
            </div>

            <Description>{lesson.caption}</Description>
            <Footer>
                <FooterRow>
                    <Level>
                        {formatEducationLevel(lesson.education_level)}
                    </Level>
                    <ExamBoard>
                        {capitaliseFirstLetter(lesson.subject)}
                    </ExamBoard>
                </FooterRow>
                <Button
                    style={{ width: "100%" }}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("QUIZ");
                        navigate(
                            `/quiz/${lesson.title.replaceAll(" ", "-")}?id=${
                                lesson.id
                            }`
                        );
                    }}>
                    Quiz
                </Button>
                <QuizSection>
                    <div>Last score:</div>
                    <QuizScore
                        percentage={
                            lesson.quiz_scores[0]?.score /
                            lesson.quiz_scores[0]?.max_score
                        }>
                        {lesson.quiz_scores[0]
                            ? Math.round(
                                  (lesson.quiz_scores[0].score /
                                      lesson.quiz_scores[0].max_score) *
                                      100
                              ) + "%"
                            : "?"}
                    </QuizScore>
                </QuizSection>
            </Footer>
        </Container>
    );
}

const QuizScore = styled.div`
    /* border: 3px solid red; */
    ${props =>
        !isNaN(props.percentage) &&
        css`
            color: ${interpolateColor(
                props.percentage,
                props.theme.colours.error,
                props.theme.colours.correct
            )};
            font-weight: 700;
            font-size: 1.3rem;
            white-space: nowrap;
        `}
`;

const QuizSection = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FooterRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 7px;
`;

const Footer = styled.div`
    width: 100%;
    /* border: 1px solid red; */

    position: absolute;
    left: 0;
    bottom: 1rem;

    padding: 0 1.25rem;

    h3 {
        font-size: 18px;
    }
`;

const ExamBoard = styled.h3`
    margin: 0;
    font-size: 1rem;
    z-index: 4;
`;

const Title = styled.h1`
    margin: 0;
    color: ${props => props.theme.colours.primary};
    font-size: 1.25rem;
    font-weight: 400;
    z-index: 4;
`;

const Description = styled.p`
    color: ${props => props.theme.colours.primaryFaded};
`;
const Subject = styled.h3`
    font-weight: 400;
    font-size: 1rem;
    color: ${props => props.theme.colours.primaryFaded};
    z-index: 4;
`;

const Level = styled.h3`
    margin: 0;
    font-size: 1rem;
    z-index: 4;
`;
const AvatarContainer = styled.div`
    position: absolute;
    right: 3rem;
    bottom: 3rem;
`;

const Container = styled.div`
    position: relative;
    padding: 2rem 1rem;
    width: 15rem;
    height: 20rem;
    z-index: 10;
    border-radius: 5px;
    box-sizing: border-box;
    background-color: ${props => props.theme.colours.tertiary}30;
    :hover {
        background-color: ${props => props.theme.colours.tertiary}40;
    }
    box-shadow: ${props => props.theme.colours.glow}20 0px 2px 8px 0px;
    opacity: 1;
    display: flex;
    flex-direction: column;
    border-bottom-right-radius: 0px;
    cursor: pointer;
    z-index: 2;
    gap: 0.625rem;
    /* border: 5px solid green; */
`;

export default LessonCard;
