import { QUESTIONS_PER_LEARNING_OBJECTIVE } from "../lib/constants";
import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

const QuizAPI = {
    saveScore: async function ({ lesson, score }) {
        const user_id = (await supabase.auth.getSession()).data.session?.user
            .id;

        const { data, error } = await supabase.from("quiz_scores").insert({
            user_id,
            lesson_id: lesson.id,
            score,
            max_score:
                lesson.learning_objectives.length *
                QUESTIONS_PER_LEARNING_OBJECTIVE,
        });

        if (error) throw error;

        return data;
    },
};

export default QuizAPI;