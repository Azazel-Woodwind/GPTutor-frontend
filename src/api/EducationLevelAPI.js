import supabase from "./configs/supabase";

/**
 * A collection of API methods for managing education levels.
 */
const EducationLevelsAPI = {
    /**
     * Retrieves all education levels from the database.
     *
     * @async
     * @returns {Promise<string[]>} An array of education level strings.
     * @throws Throws an error if the query fails.
     */
    getAll: async function () {
        const { data, error } = await supabase
            .from("education_levels")
            .select("*");

        if (error) throw error;
        return data.map(educationLevel => educationLevel.education_level);
    },
};

export default EducationLevelsAPI;
