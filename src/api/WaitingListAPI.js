import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

/**
 * A collection of API methods for managing the waiting list.
 */
const WaitingListAPI = {
    /**
     * Adds a user to the waiting list.
     *
     * @async
     * @param {Object} waitingListUser - The user's information to add to the waiting list.
     * @returns {Promise<Object>} The added waiting list user data.
     * @throws Throws an error if the addition fails.
     */
    addUser: async function (waitingListUser) {
        const { data, error } = await supabase.rpc(
            "add_to_waiting_list",
            waitingListUser
        );

        if (error) throw error;

        return data;
    },

    /**
     * Retrieves all users from the waiting list.
     *
     * @async
     * @returns {Promise<Object[]>} An array of users on the waiting list.
     * @throws Throws an error if the retrieval fails.
     */
    getUsers: async function () {
        return await apiClient.get("/waiting-list");
    },
};

export default WaitingListAPI;
