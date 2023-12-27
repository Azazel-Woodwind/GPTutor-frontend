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
            .eq("status", "Verified");

        if (error) {
            throw error;
        }

        data.forEach(lesson => {
            lesson.exam_boards = lesson.exam_boards.map(
                exam_board => exam_board.exam_board_name
            );
        });
        // console.log(data);
        return data;
    },

    /**
     * Fetches lessons created by the currently logged-in user.
     *
     * @async
     * @returns {Promise<Object[]>} An array of lesson objects created by the user.
     * @throws Throws an error if not logged in or if the query fails.
     */
    getMyLessons: async function () {
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        if (!session) {
            throw "Must be logged in to get your lessons";
        }

        const { data, error: error2 } = await supabase
            .from("lessons")
            .select(
                "*, learning_objectives (*, instructions:learning_objective_instructions (*)), exam_boards (*), quiz_scores (*)"
            )
            .eq("author_id", session.user.id);

        if (error2) {
            throw error2;
        }

        data.map(lesson => {
            lesson.exam_boards = lesson.exam_boards.map(
                exam_board => exam_board.exam_board_name
            );
            return lesson;
        });

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
        const { data, error } = await supabase
            .from("lessons")
            .select(
                "*, learning_objectives (*, instructions:learning_objective_instructions (*)), exam_boards (*), quiz_scores (*)"
            )
            .eq("id", lesson_id)
            .single();

        if (error) {
            throw error;
        }
        data.learning_objectives = data.learning_objectives.sort(
            (a, b) => a.number - b.number
        );

        data.exam_boards = data.exam_boards.map(
            exam_board => exam_board.exam_board_name
        );

        return data;
    },

    /**
     * Toggles the publish status of a lesson by its ID.
     *
     * @async
     * @param {string} lesson_id - The unique identifier of the lesson to toggle.
     * @returns {Promise<Object>} The updated lesson object.
     * @throws Throws an error if the update operation fails.
     */
    togglePublishById: async function (lesson_id) {
        // console.log(lesson_id);
        const { data, error } = await supabase.rpc("toggle_is_published", {
            lesson_id,
        });

        // console.log(JSON.stringify(data, null, 2));
        // console.log(JSON.stringify(error, null, 2));

        if (error) {
            throw error;
        }

        return data;
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
        const { data, error } = await supabase.rpc("delete_lesson_by_id", {
            lesson_id,
        });

        if (error) {
            throw error;
        }

        return data;
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
    updateOwnedByid: async function (lesson_id, newLesson) {
        const { data, error } = await supabase.rpc("update_lesson_by_id", {
            lesson_id,
            ...newLesson,
        });

        if (error) {
            throw error;
        }

        return data;
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

        const { data, error } = await supabase.rpc("create_lesson", newLesson);

        if (error) {
            throw error;
        }

        return data;
    },

    /**
     * Retrieves all lessons available.
     *
     * @async
     * @returns {Promise<Object[]>} An array of all lesson objects.
     * @throws Throws an error if not authorized or if the request fails.
     */
    getAll: async function () {
        const res = await apiClient.get("/lessons");

        if (res.status === 401) throw new Error("Unauthorised. No user found.");
        if (res.status === 403)
            throw new Error("Forbidden. Insufficient access level.");
        if (res.status !== 200)
            throw new Error("Something went wrong. Please try again later.");

        return res.data;
    },
};

export default LessonAPI;
