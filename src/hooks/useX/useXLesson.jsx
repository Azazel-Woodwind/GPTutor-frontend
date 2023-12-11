import { SocketContext } from "@/context/SocketContext";

import { useState, useEffect } from "react";

import React from "react";
import useX from "./useX";
import useXQuiz from "./useXQuiz";
// import {Config} from "./useX"

function useXLesson({ currentLesson, delay, ...props }) {
    const [lesson, setLesson] = React.useState(currentLesson);
    const [learningObjectiveNumber, setLearningObjectiveNumber] =
        React.useState(-1);
    const [instruction, setInstruction] = React.useState(undefined);
    const [finished, setFinished] = React.useState(false);
    const [started, setStarted] = React.useState(undefined);
    const [images, setImages] = React.useState([]);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [finishedLearningObjective, setFinishedLearningObjective] =
        React.useState(false);

    const { Socket } = React.useContext(SocketContext);

    const X = useXQuiz({
        channel: "lesson",
        onData: data => {
            console.log("ONDATA");
            if (data.finished) {
                setFinished(true);
                return;
            }

            if (data.finishedLearningObjective) {
                console.log("FINISHED CURRENT LEARNING OBJECTIVE");
                setFinishedLearningObjective(true);
                // X.changeQuestion(X.currentQuestionNum === 0 ? 0 : undefined);
                return;
            }

            if (data.instruction) {
                let [learningObjectiveIndex, instructionIndex] =
                    data.instruction.toString().split(".");
                learningObjectiveIndex = parseInt(learningObjectiveIndex);
                instructionIndex = parseInt(instructionIndex);
                learningObjectiveIndex--;
                instructionIndex--;
                console.log(
                    `NEW INSTRUCTION: ${learningObjectiveIndex + 1}.${
                        instructionIndex + 1
                    }`
                );

                setLearningObjectiveNumber(learningObjectiveIndex + 1);
                setInstruction({
                    learningObjectiveIndex,
                    instructionIndex,
                });
            }
        },
        sendStart: false,
        ...props,
    });

    useEffect(() => {
        // check if audio can play

        const audio = new Audio();
        let startedTemp = undefined;
        audio.play().catch(e => {
            setStarted(false);
            startedTemp = false;
        });

        setTimeout(() => {
            if (startedTemp === undefined) {
                setStarted(true);
            }
        }, 1000);
    }, []);

    useEffect(() => {
        // Socket.emit("authenticate", true);
        if (!started || X.currentMessage || X.history.length > 0) return;

        console.log("starting lesson:", currentLesson);

        const timer = setTimeout(() => {
            Socket.emit("start_lesson", { current_lesson: currentLesson });
        }, delay);

        return () => {
            clearTimeout(timer);
            Socket.off("lesson_response_data");
            Socket.off("lesson_finished");
            Socket.off("instruction_change");
        };
    }, [started]);

    useEffect(
        () => {
            if (!lesson || !started || !instruction) return;

            setImages(prev => [
                ...prev,
                lesson.learning_objectives[instruction.learningObjectiveIndex]
                    .instructions[instruction.instructionIndex].media_link,
            ]);

            console.log(lesson);

            setCurrentImageIndex(images.length);
        },
        // [learningObjectiveNumber, started]
        [instruction, started]
    );

    const finishLearningObjectiveQuestions = () => {
        setFinishedLearningObjective(false);
        // X.changeQuestion();
        X.sendMessage({
            includeInHistory: false,
        });
    };

    const getQuestionTitleAudio = () => {
        console.log("FETCHING AUDIO FOR CURRENT QUESTION TITLE");
        Socket.emit(`lesson_get_audio_for_question`, X.currentQuestionNum);
    };

    return {
        ...X,
        lesson,
        finished,
        started,
        setStarted,
        learningObjectiveNumber,
        currentImageIndex,
        images,
        finishLearningObjectiveQuestions,
        finishedLearningObjective,
        getQuestionTitleAudio,
    };
}

export default useXLesson;
