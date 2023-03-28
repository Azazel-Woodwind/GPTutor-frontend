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
function useXLesson(props: any) {
    const [lesson, setLesson] = React.useState<any>(undefined);
    const [learningObjectiveNumber, setLearningObjectiveNumber] =
        React.useState(-1);
    const [finished, setFinished] = React.useState(false);
    const [started, setStarted] = React.useState(false);
    const [currentLearningObjective, setCurrentLearningObjective] =
        React.useState({});
    const [images, setImages] = React.useState<any[]>([]);
    const [currentImageLink, setCurrentImageLink] = React.useState("");

    const { Socket, authenticated } = React.useContext(SocketContext);

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
        if (!lesson) return;
        setStarted(true);
        setCurrentLearningObjective(
            lesson.learningObjectives[learningObjectiveNumber - 1]
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
            ...lesson.learningObjectives[
                learningObjectiveNumber - 1
            ].images.map((image: any) => image.link),
        ]);
        currentLearningObjectiveIndex = images.length;
        setCurrentImageLink(
            lesson.learningObjectives[learningObjectiveNumber - 1].images[0]
                .link
        );
    }, [learningObjectiveNumber]);

    useEffect(() => {
        // Socket.emit("authenticate", true);
        if (authenticated) {
            console.log("starting lesson");

            Socket.emit("start_lesson", { lessonID: props.lessonID });
            Socket.on("lesson_finished", () => setFinished(true));
            Socket.on("lesson_response_data", data => {
                const { learningObjectiveNumber } = data;
                setLearningObjectiveNumber(learningObjectiveNumber);
            });
            Socket.on("lesson_info", data => setLesson(data));
        }
    }, [authenticated]);

    return {
        ...X,
        lesson,
        finished,
        started,
        learningObjectiveNumber,
        currentLearningObjective,
        nextImage,
        previousImage,
        currentImageLink,
        images,
    };
}

export default useXLesson;
