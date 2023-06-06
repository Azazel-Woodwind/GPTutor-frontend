import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

const LessonAPI = {
    getPublicLessons: async function () {
        const { data, error } = await supabase
            .from("lessons")
            .select("*, learning_objectives (*), exam_boards (*)")
            .eq("status", "Verified");

        if (error) {
            throw error;
        }

        data.forEach(lesson => {
            lesson.exam_boards = lesson.exam_boards.map(
                exam_board => exam_board.exam_board_name
            );
        });
        console.log(data);
        return data;
    },

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
            .select("*, learning_objectives (*), exam_boards (*)")
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

    getLessonById: async function (lesson_id) {
        const { data, error } = await supabase
            .from("lessons")
            .select("*, learning_objectives (*), exam_boards (*)")
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

    deleteOwnedByid: async function (lesson_id) {
        const { data, error } = await supabase.rpc("delete_lesson_by_id", {
            lesson_id,
        });

        if (error) {
            throw error;
        }

        return data;
    },

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

    create: async function (newLesson) {
        // console.log(newLesson);

        const { data, error } = await supabase.rpc("create_lesson", newLesson);

        if (error) {
            throw error;
        }

        return data;
    },

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
