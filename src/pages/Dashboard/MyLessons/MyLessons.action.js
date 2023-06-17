const action = async ({ request }) => {
    if (!["DELETE", "PUT"].includes(request.method)) {
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
            await LessonAPI.deleteOwnedByid(lessonID);

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

    if (request.method === "PUT") {
        const oldStatus = data.get("status");
        try {
            // console.log(lessonID);
            await LessonAPI.togglePublishById(lessonID);

            return {
                ok: true,
                message: `Lesson successfully ${
                    ["Draft", "Rejected"].includes(oldStatus)
                        ? "published"
                        : "unpublished"
                }!`,
            };
        } catch (error) {
            console.log(error);
            return {
                ok: false,
                message: `There was an error ${
                    ["Draft", "Rejected"].includes(oldStatus)
                        ? "publishing"
                        : "unpublishing"
                } the lesson.`,
            };
        }
    }
};

export default action;
