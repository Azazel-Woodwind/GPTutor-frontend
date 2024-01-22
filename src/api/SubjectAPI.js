import supabase from "./configs/supabase";

/**
 * A collection of API methods for managing subjects.
 */
const SubjectsAPI = {
    /**
     * Retrieves all subjects from the database.
     *
     * @async
     * @returns {Promise<string[]>} An array of subject names.
     * @throws Throws an error if the query fails.
     */
    getAll: async function () {
        const { data, error } = await supabase.from("subjects").select("*");

        if (error) throw error;

        return data.map(subject => subject.subject);
    },
};

export default SubjectsAPI;
