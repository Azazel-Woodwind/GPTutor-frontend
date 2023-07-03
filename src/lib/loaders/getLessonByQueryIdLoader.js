import LessonAPI from "../../api/LessonAPI";

async function getLessonByQueryIdLoader({ request }) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
        throw new Response("No lesson ID provided", {
            status: 400,
            statusText: "Bad Request",
        });
    }
    let lesson;
    try {
        lesson = await LessonAPI.getLessonById(id);
    } catch (error) {
        if (
            error.message ===
            "JSON object requested, multiple (or no) rows returned"
        ) {
            throw new Response("Lesson not found", {
                status: 404,
                statusText: "Not Found",
            });
        } else {
            throw error;
        }
    }

    // console.log("LESSON:", lesson);
    return lesson;
}

export default getLessonByQueryIdLoader;
