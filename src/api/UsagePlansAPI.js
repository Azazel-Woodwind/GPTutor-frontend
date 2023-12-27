import supabase from "./configs/supabase";

/**
 * A collection of API methods for managing usage plans.
 */
const UsagePlanAPI = {
    /**
     * Retrieves all usage plans from the database.
     *
     * @async
     * @returns {Promise<Object[]>} An array of usage plan objects.
     * @throws Throws an error if the query fails.
     */
    getAll: async function () {
        const { data, error } = await supabase.from("usage_plans").select("*");

        if (error) throw error;

        return data;
    },
};

export default UsagePlanAPI;
