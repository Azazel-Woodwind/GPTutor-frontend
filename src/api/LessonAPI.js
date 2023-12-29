import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

/**
 * A collection of API methods for lesson management.
 */
const LessonAPI = {
    /**
     * Retrieves a list of public lessons with associated details.
     *
     * @async
     * @returns {Promise<Object[]>} An array of public lesson objects.
     * @throws Throws an error if the query fails.
     */
    getPublicLessons: async function () {
        const { data, error } = await supabase
            .from("lessons")
            .select(
                "*, learning_objectives (*, instructions:learning_objective_instructions (*)), exam_boards (*), quiz_scores (*)"
            )
            .eq("is_published", "true");

        if (error) {
            throw error;
        }

        data.forEach(lesson => {
            lesson.exam_boards = lesson.exam_boards.map(
                exam_board => exam_board.name
            );
        });
        // console.log(data);
        return data;
    },

    /**
     * Retrieves a lesson by its unique identifier.
     *
     * @async
     * @param {string} lesson_id - The unique identifier of the lesson.
     * @returns {Promise<Object>} The lesson object.
     * @throws Throws an error if the lesson is not found or the query fails.
     */
    getLessonById: async function (lesson_id) {
        try {
            const res = await apiClient.get(`/lessons/${lesson_id}`);
            return res.data;
        } catch (error) {
            if (error.response?.status === 401)
                throw new Error("Unauthorised. No user found.");
            if (error.response?.status === 403)
                throw new Error("Forbidden. Insufficient access level.");
            if (error.response?.status !== 200)
                throw new Error(
                    "Something went wrong. Please try again later."
                );

            throw error;
        }
    },

    /**
     * Toggles the publish status of a lesson by its ID.
     *
     * @async
     * @param {string} lesson_id - The unique identifier of the lesson to toggle.
     * @returns {Promise<Object>} The updated lesson object.
     * @throws Throws an error if the update operation fails.
     */
    togglePublishById: async function (lesson_id, is_published) {
        try {
            const res = await apiClient.patch(`/lessons/${lesson_id}`, {
                is_published,
            });
            return res.data;
        } catch (error) {
            if (error.response?.status === 401)
                throw new Error("Unauthorised. No user found.");
            if (error.response?.status === 403)
                throw new Error("Forbidden. Insufficient access level.");
            if (error.response?.status !== 200)
                throw new Error(
                    "Something went wrong. Please try again later."
                );

            throw error;
        }
    },

    /**
     * Deletes a lesson owned by the user, identified by its ID.
     *
     * @async
     * @param {string} lesson_id - The unique identifier of the lesson to delete.
     * @returns {Promise<Object>} Confirmation of the deletion.
     * @throws Throws an error if the deletion operation fails.
     */
    deleteOwnedByid: async function (lesson_id) {
        try {
            const res = await apiClient.delete(`/lessons/${lesson_id}`);
            return res.data;
        } catch (error) {
            if (error.response?.status === 401)
                throw new Error("Unauthorised. No user found.");
            if (error.response?.status === 403)
                throw new Error("Forbidden. Insufficient access level.");
            if (error.response?.status !== 200)
                throw new Error(
                    "Something went wrong. Please try again later."
                );

            throw error;
        }
    },

    /**
     * Updates a lesson owned by the user, identified by its ID.
     *
     * @async
     * @param {string} lesson_id - The unique identifier of the lesson to update.
     * @param {Object} newLesson - The updated lesson data.
     * @returns {Promise<Object>} The updated lesson object.
     * @throws Throws an error if the update operation fails.
     */
    updateById: async function (lesson_id, newLesson) {
        try {
            const res = await apiClient.put(`/lessons/${lesson_id}`, newLesson);
            return res.data;
        } catch (error) {
            if (error.response?.status === 401)
                throw new Error("Unauthorised. No user found.");
            if (error.response?.status === 403)
                throw new Error("Forbidden. Insufficient access level.");
            if (error.response?.status !== 200)
                throw new Error(
                    "Something went wrong. Please try again later."
                );

            throw error;
        }
    },

    /**
     * Creates a new lesson with the given details.
     *
     * @async
     * @param {Object} newLesson - The details of the new lesson to create.
     * @returns {Promise<Object>} The newly created lesson object.
     * @throws Throws an error if the creation operation fails.
     */
    create: async function (newLesson) {
        // console.log(newLesson);
        try {
            const res = await apiClient.post("/lessons", newLesson);
            return res.data;
        } catch (error) {
            if (error.response?.status === 401)
                throw new Error("Unauthorised. No user found.");
            if (error.response?.status === 403)
                throw new Error("Forbidden. Insufficient access level.");
            if (error.response?.status !== 200)
                throw new Error(
                    "Something went wrong. Please try again later."
                );

            throw error;
        }
    },

    /**
     * Retrieves all lessons available.
     *
     * @async
     * @returns {Promise<Object[]>} An array of all lesson objects.
     * @throws Throws an error if not authorized or if the request fails.
     */
    getAll: async function () {
        try {
            const res = await apiClient.get("/lessons");
            return res.data;
        } catch (error) {
            if (error.response?.status === 401)
                throw new Error("Unauthorised. No user found.");
            if (error.response?.status === 403)
                throw new Error("Forbidden. Insufficient access level.");
            if (error.response?.status !== 200)
                throw new Error(
                    "Something went wrong. Please try again later."
                );

            throw error;
        }
    },
};

export default LessonAPI;
