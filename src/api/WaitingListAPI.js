import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

const WaitingListAPI = {
    addUser: async function (waitingListUser) {
        const { data, error } = await supabase.rpc(
            "add_to_waiting_list",
            waitingListUser
        );

        if (error) throw error;

        return data;
    },

    getUsers: async function () {
        return await apiClient.get("/waiting-list");
    },
};

export default WaitingListAPI;
