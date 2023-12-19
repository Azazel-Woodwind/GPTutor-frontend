import supabase from "./configs/supabase";

const QuizAPI = {
    saveScore: async function ({ lesson, score: { score, maxScore } }) {
        const user_id = (await supabase.auth.getSession()).data.session?.user
            .id;

        console.log("score", score);
        const { error } = await supabase
            .from("quiz_scores")
            .delete()
            .eq("lesson_id", lesson.id);

        if (error) throw error;

        const { data, error: error2 } = await supabase
            .from("quiz_scores")
            .insert({
                user_id,
                lesson_id: lesson.id,
                score,
                max_score: maxScore,
            });

        if (error2) throw error2;

        return data;
    },
};

export default QuizAPI;
