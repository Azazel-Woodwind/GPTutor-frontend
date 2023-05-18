import { SocketContext } from "../../context/SocketContext";

import { useState, useEffect } from "react";

import React from "react";
import useX from "./useX";
// import {Config} from "./useX"

function useXLesson({ currentLesson, delay, ...props }) {
    const [lesson, setLesson] = React.useState(currentLesson);
    const [learningObjectiveNumber, setLearningObjectiveNumber] =
        React.useState(-1);
    const [finished, setFinished] = React.useState(false);
    const [started, setStarted] = React.useState(undefined);
    const [currentLearningObjective, setCurrentLearningObjective] =
        React.useState({});
    const [images, setImages] = React.useState([]);
    const [currentImageLink, setCurrentImageLink] = React.useState("");
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const currentLearningObjectiveIndex = React.useRef(0);

    const { Socket } = React.useContext(SocketContext);

    const X = useX({
        channel: "lesson",
        ...props,
    });

    const nextImage = () => {
        if (currentLearningObjectiveIndex.current + 1 >= images.length) return;
        setCurrentImageLink(images[currentLearningObjectiveIndex.current + 1]);
        currentLearningObjectiveIndex.current++;
    };

    const previousImage = () => {
        if (currentLearningObjectiveIndex.current - 1 < 0) return;
        setCurrentImageLink(images[currentLearningObjectiveIndex.current - 1]);
        currentLearningObjectiveIndex.current--;
    };

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
            Socket.on("lesson_finished", () => setFinished(true));
            Socket.on("lesson_response_data", data => {
                const { learningObjectiveNumber } = data;
                console.log(
                    "LEARNING OBJECTIVE NUMBER CHANGED TO:",
                    learningObjectiveNumber
                );

                setLearningObjectiveNumber(learningObjectiveNumber);
            });
        }, delay);

        return () => {
            clearTimeout(timer);
            Socket.off("lesson_response_data");
            Socket.off("lesson_finished");
        };
    }, [started]);

    useEffect(() => {
        if (!lesson || !started) return;

        if (learningObjectiveNumber === -1) {
            setCurrentImageLink("");
            return;
        }

        setCurrentLearningObjective(
            lesson.learning_objectives[learningObjectiveNumber - 1]
        );

        setImages(prev => [
            ...prev,
            lesson.learning_objectives[learningObjectiveNumber - 1].image_link,
        ]);
        currentLearningObjectiveIndex.current = images.length;
        console.log(lesson);
        // console.log(JSON.stringify(lesson));
        setCurrentImageLink(
            lesson.learning_objectives[learningObjectiveNumber - 1].images_link
        );
        setCurrentImageIndex(images.length);
    }, [learningObjectiveNumber, started]);

    return {
        ...X,
        lesson,
        finished,
        started,
        setStarted,
        learningObjectiveNumber,
        currentLearningObjective,
        nextImage,
        previousImage,
        currentImageLink,
        currentImageIndex,
        images,
    };
}

export default useXLesson;
