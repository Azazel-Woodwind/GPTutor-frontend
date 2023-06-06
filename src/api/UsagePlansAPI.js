import supabase from "./configs/supabase";

const UsagePlanAPI = {
    getAll: async function () {
        const { data, error } = await supabase.from("usage_plans").select("*");

        if (error) throw error;

        return data;
    },
};

export default UsagePlanAPI;
