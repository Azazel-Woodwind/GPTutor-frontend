import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

const EducationLevelsAPI = {
    getAll: async function () {
        const { data, error } = await supabase
            .from("education_levels")
            .select("*");

        if (error) throw error;

        return data;
    },
};

export default EducationLevelsAPI;
