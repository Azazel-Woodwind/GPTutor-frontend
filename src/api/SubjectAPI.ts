import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

const SubjectsAPI = {
    getAll: async function () {
        const { data, error } = await supabase.from("subjects").select("*");

        if (error) throw error;

        return data;
    },
};

export default SubjectsAPI;
