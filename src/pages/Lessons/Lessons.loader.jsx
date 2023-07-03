import LessonAPI from "../../api/LessonAPI";

const loader = async ({ request }) => {
    try {
        const lessons = await LessonAPI.getPublicLessons();
        // console.log("ALL LESSONS:", lessons);
        return lessons;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default loader;
