import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

const ExamBoardAPI = {
    getAll: async function () {
        const { data, error } = await supabase.from("exam_boards").select("*");

        if (error) throw error;

        return data;
    },
};

export default ExamBoardAPI;
