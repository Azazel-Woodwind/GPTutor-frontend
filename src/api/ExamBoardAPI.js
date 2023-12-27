import supabase from "./configs/supabase";

/**
 * A collection of API methods for managing exam boards.
 */
const ExamBoardAPI = {
    /**
     * Retrieves all exam boards from the database.
     *
     * @async
     * @returns {Promise<string[]>} An array of exam board names.
     * @throws Throws an error if the query fails.
     */
    getAll: async function () {
        const { data, error } = await supabase.from("exam_boards").select("*");

        if (error) throw error;

        return data.map(examBoard => examBoard.exam_board_name);
    },
};

export default ExamBoardAPI;
