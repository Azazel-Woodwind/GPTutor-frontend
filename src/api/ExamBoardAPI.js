import supabase from "./configs/supabase";

const ExamBoardAPI = {
    getAll: async function () {
        const { data, error } = await supabase.from("exam_boards").select("*");

        if (error) throw error;

        return data.map(examBoard => examBoard.exam_board_name);
    },
};

export default ExamBoardAPI;
