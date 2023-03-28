import React, { useEffect } from "react";
import { Link } from "react-router-dom";
type Image = {
    link: string;
    description: string;
};

type LearningObjective = {
    title: string;
    images: Image[];
};

type Lesson = {
    id: string;
    title: string;
    subject: string;
    educationLevel: string;
    description: string;
    learningObjectives: LearningObjective[];
};

function main() {
    const [lessons, setLessons] = React.useState<Lesson[]>([]);
    const [loading, setLoading] = React.useState(true);

    const fetchLessons = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/lessons");
            const data = await res.json();
            console.log(data);
            // const lessons = JSON.parse(data);
            const currentLessons = [];
            for (const lessonID in data) {
                console.log(lessonID);
                currentLessons.push(data[lessonID]);
            }
            console.log(currentLessons);
            setLessons(currentLessons);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteLesson = async (lessonID: string) => {
        await fetch(`http://localhost:3001/api/lessons/${lessonID}`, {
            method: "DELETE",
        });
        setLessons(lessons.filter(lesson => lesson.id !== lessonID));
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Lessons</h1>
            {lessons.length === 0 ? (
                <h2>No lessons found</h2>
            ) : (
                <div>
                    {lessons.map((lesson: any, i) => {
                        return (
                            <div
                                style={{
                                    border: "2px solid black",
                                    padding: "5px",
                                    paddingBottom: "10px",
                                    margin: "10px 0px",
                                }}
                                key={i}>
                                <h2>{lesson.title}</h2>
                                <h3>Subject: {lesson.subject}</h3>
                                <h3>
                                    Education level: {lesson.educationLevel}
                                </h3>
                                <p>Description: {lesson.description}</p>
                                <p>Lesson ID: {lesson.id}</p>
                                <Link to={`/lessons/${lesson.id}`}>
                                    <button>Start lesson</button>
                                </Link>
                                <button onClick={() => deleteLesson(lesson.id)}>
                                    Delete lesson
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
            <Link to="/create-lesson">
                <button>Create lesson</button>
            </Link>
        </div>
    );
}

export default main;
