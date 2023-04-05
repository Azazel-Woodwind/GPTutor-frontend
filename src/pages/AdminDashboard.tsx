import React from "react";
import { useLoaderData } from "react-router-dom";

function AdminDashboard() {
    const [displayedLessons, setDisplayedLessons] = React.useState<Lesson[]>(
        []
    );

    const lessons = useLoaderData() as Lesson[];

    React.useEffect(() => {
        setDisplayedLessons(lessons);
    }, [lessons]);

    return (
        <div className="h-[100vh] md:px-12 p-4 overflow-hidden text-white">
            <h1>Admin Dashboard</h1>
            {displayedLessons.length === 0 ? (
                <p>No current lessons</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {displayedLessons.map((lesson: Lesson) => (
                        <div className="bg-[#040A1E] w-[300px] h-[300px] rounded-md p-4">
                            <h1>{lesson.title}</h1>
                            <p>{lesson.subject}</p>
                            <p>{lesson.education_level}</p>
                            <p>{lesson.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
