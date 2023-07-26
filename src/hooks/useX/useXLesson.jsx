import { SocketContext } from "../../context/SocketContext";

import { useState, useEffect } from "react";

import React from "react";
import useX from "./useX";
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

    const { Socket } = React.useContext(SocketContext);

    const X = useX({
        channel: "lesson",
        onMessage: data => {
            // const { learningObjectiveNumber } = data;
            // console.log(
            //     "LEARNING OBJECTIVE NUMBER CHANGED TO:",
            //     learningObjectiveNumber
            // );
            // setLearningObjectiveNumber(learningObjectiveNumber);
        },
        onData: data => {
            console.log("ONDATA");
            if (data.finished) {
                setFinished(true);
                return;
            }

            let [learningObjectiveIndex, instructionIndex] = data.instruction
                .toString()
                .split(".");
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
        },
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
        if (!started) return;

        console.log("starting lesson:", currentLesson);

        const timer = setTimeout(() => {
            Socket.emit("start_lesson", { current_lesson: currentLesson });
            // Socket.on("lesson_finished", () => setFinished(true));
            // Socket.on(
            //     "instruction_change",
            //     ({ learningObjectiveIndex, instructionIndex }) => {

            //     }
            // );
            // Socket.on("lesson_response_data", data => {
            //     const { learningObjectiveNumber } = data;
            // console.log(
            //     "LEARNING OBJECTIVE NUMBER CHANGED TO:",
            //     learningObjectiveNumber
            // );

            // setLearningObjectiveNumber(learningObjectiveNumber);
            // });
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

    return {
        ...X,
        lesson,
        finished,
        started,
        setStarted,
        learningObjectiveNumber,
        currentImageIndex,
        images,
    };
}

export default useXLesson;
