import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import CenteredColumn from "../../../styles/containers/CenteredColumn";
import styled from "styled-components";
import { fade_animation } from "../../../styles/FramerAnimations";
import Textfield from "../../../components/input/Textfield";
import Button from "../../../components/input/Button";
import { percentageToColour } from "../../../lib/misc";
import QuizAPI from "../../../api/QuizAPI";

function EndOfQuizModal({ score, onExit }) {
    const { ModalProps, Modal } = useModal({
        initialOpen: true,
    });

    const navigate = useNavigate();

    console.log(score);

    return (
        <motion.div {...fade_animation()}>
            <Modal {...ModalProps} height="370px">
                <CenteredColumn fillparent gap="1rem">
                    <Title> Quiz has been completed </Title>
                    <ScoreSection>
                        <QuizScore
                            percentage={score.correctAnswers / score.total}>
                            {score.correctAnswers} / {score.total}
                        </QuizScore>
                    </ScoreSection>
                    <p>
                        Thanks for participating in XTutor's alpha. We would
                        appreciate feedback on the quiz you just completed.
                    </p>
                    <Textfield
                        width="30rem"
                        label="Feedback"
                        type="text"
                        multiline
                    />
                    <Button onClick={onExit}>
                        Submit and return to main menu
                    </Button>
                </CenteredColumn>
            </Modal>
        </motion.div>
    );
}

const ScoreSection = styled.div`
    display: flex;
    align-items: center;

    gap: 1rem;
    font-size: 2rem;
`;

const QuizScore = styled.div`
    /* border: 3px solid red; */
    color: ${props => percentageToColour(props.percentage * 100)};
    font-weight: 700;
    border: 5px solid ${props => percentageToColour(props.percentage * 100)};
    border-radius: 2rem;
    padding: 1rem;
`;

const Title = styled.h1``;

// const ExitButton = styled(Button)`
//     position: absolute;
//     bottom: 2rem;
// `;
export default EndOfQuizModal;
