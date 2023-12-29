import LessonAPI from "@/api/LessonAPI";

const action = async ({ request }) => {
    if (!["DELETE", "PATCH"].includes(request.method)) {
        throw new Response("Incorrect request method", {
            status: 400,
            statusText: "Bad Request",
        });
    }

    const data = await request.formData();
    const lessonID = data.get("id");

    if (!lessonID) {
        throw new Response("Missing lesson ID", {
            status: 400,
            statusText: "Bad Request",
        });
    }

    if (request.method === "DELETE") {
        try {
            await LessonAPI.deleteById(lessonID);

            return {
                ok: true,
                message: "Lesson successfully deleted!",
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                message: "There was an error deleting the lesson.",
            };
        }
    }

    if (request.method === "PATCH") {
        const oldIsPublished = data.get("is_published");
        try {
            // console.log(lessonID);
            await LessonAPI.togglePublishById(lessonID, !oldIsPublished);

            return {
                ok: true,
                message: `Lesson successfully ${
                    !oldIsPublished ? "published" : "unpublished"
                }!`,
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                message: `There was an error ${
                    !oldIsPublished ? "publishing" : "unpublishing"
                } the lesson.`,
            };
        }
    }
};

export default action;
