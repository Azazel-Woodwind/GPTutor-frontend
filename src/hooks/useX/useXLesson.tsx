import { SocketContext } from "../../context/SocketContext";

import { useState, useEffect } from "react";

import React from "react";
import useX from "./useX";
// import {Config} from "./useX"

type XLessonProps = {
    lessonId: string;
};

const learningObjectiveIndicies = new Map<number, number>();
let currentLearningObjectiveIndex = 0;
function useXLesson({ currentLesson, delay, ...props }: any) {
    const [lesson, setLesson] = React.useState<any>(currentLesson);
    const [learningObjectiveNumber, setLearningObjectiveNumber] =
        React.useState(-1);
    const [finished, setFinished] = React.useState(false);
    const [started, setStarted] = React.useState(undefined);
    const [currentLearningObjective, setCurrentLearningObjective] =
        React.useState({});
    const [images, setImages] = React.useState<any[]>([]);
    const [currentImageLink, setCurrentImageLink] = React.useState("");

    const { Socket } = React.useContext(SocketContext);

    const X = useX({
        channel: "lesson",
        ...props,
    });

    const nextImage = () => {
        if (currentLearningObjectiveIndex + 1 >= images.length) return;
        setCurrentImageLink(images[currentLearningObjectiveIndex + 1]);
        currentLearningObjectiveIndex++;
    };

    const previousImage = () => {
        if (currentLearningObjectiveIndex - 1 < 0) return;
        setCurrentImageLink(images[currentLearningObjectiveIndex - 1]);
        currentLearningObjectiveIndex--;
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

        console.log("starting lesson");

        const timer = setTimeout(() => {
            Socket.emit("start_lesson", { current_lesson: currentLesson });
            Socket.on("lesson_finished", () => setFinished(true));
            Socket.on("lesson_response_data", data => {
                const { learningObjectiveNumber } = data;
                setLearningObjectiveNumber(learningObjectiveNumber);
            });
        }, delay);

        return () => clearTimeout(timer);

        //I think grabbing the lesson info makes more sense from the db here?
        // :moyai: no.
        // Socket.on("lesson_info", data => setLesson(data));
    }, [started]);

    useEffect(() => {
        if (!lesson || !started) return;

        setCurrentLearningObjective(
            lesson.learning_objectives[learningObjectiveNumber - 1]
        );
        if (learningObjectiveNumber === -1) {
            setCurrentImageLink("");
            return;
        }
        if (learningObjectiveIndicies.has(learningObjectiveNumber)) {
            setCurrentImageLink(
                images[
                    learningObjectiveIndicies.get(
                        learningObjectiveNumber
                    ) as number
                ]
            );
            return;
        }
        learningObjectiveIndicies.set(learningObjectiveNumber, images.length);

        setImages(prev => [
            ...prev,
            ...lesson.learning_objectives[
                learningObjectiveNumber - 1
            ].images.map((image: any) => image.link),
        ]);
        currentLearningObjectiveIndex = images.length;
        setCurrentImageLink(
            lesson.learning_objectives[learningObjectiveNumber - 1].images[0]
                .link
        );
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
        images,
    };
}

export default useXLesson;
