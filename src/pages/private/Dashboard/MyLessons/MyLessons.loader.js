import LessonAPI from "@/api/LessonAPI";

const loader = async () => {
    try {
        const lessons = await LessonAPI.getMyLessons();
        // console.log("ALL LESSONS:", lessons);
        return lessons;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default loader;
