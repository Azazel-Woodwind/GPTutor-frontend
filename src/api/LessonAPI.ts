import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

const LessonAPI = {
    getPublicLessons: async function (): Promise<Lesson[]> {
        const { data, error } = await supabase.from("lessons").select("*");

        if (error) {
            throw error;
        }

        return data as Lesson[];
    },

    getMyLessons: async function (): Promise<Lesson[]> {
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
            .select("*")
            .eq("author_id", session.user.id);

        if (error2) {
            throw error2;
        }

        return data as Lesson[];
    },

    create: async function (newLesson: Omit<Lesson, "id">) {
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

    publishById: async function (lesson_id: string) {
        const { data, error } = await supabase
            .from("editable_lesson")
            .update({ is_published: true })
            .eq("id", lesson_id)
            .select();

        if (error) {
            throw error;
        }

        return data;
    },

    deleteOwnedByid: async function (lesson_id: string) {
        const { data, error } = await supabase.rpc("delete_lesson_by_id", {
            lesson_id,
        });

        if (error) {
            throw error;
        }

        return data;
    },

    updateOwnedByid: async function (
        lesson_id: string,
        newLesson: Omit<Lesson, "id">
    ) {
        const { data, error } = await supabase.rpc("update_lesson_by_id", {
            lesson_id,
            ...newLesson,
        });

        if (error) {
            throw error;
        }

        return data;
    },
};

export default LessonAPI;
