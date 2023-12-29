import supabase from "./configs/supabase";

/**
 * A collection of API methods for managing quiz interactions.
 */
const QuizAPI = {
    /**
     * Saves a user's quiz score for a specific lesson to the database.
     * It first deletes any existing score for the same lesson and user, then inserts the new score.
     *
     * @async
     * @param {Object} params - The parameters for saving the score.
     * @param {Object} params.lesson - The lesson object.
     * @param {Object} params.score - The score object.
     * @param {number} params.score.score - The user's score.
     * @param {number} params.score.maxScore - The maximum possible score.
     * @returns {Promise<Object>} The saved score data.
     * @throws Throws an error if the operation fails.
     */
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
