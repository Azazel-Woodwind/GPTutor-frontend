import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

const UserAPI = {
    signUp: async function ({
        email,
        password,
        first_name,
        last_name,
        education_level,
        subjects,
        is_student,
    }) {
        const {
            data: { user },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name,
                    last_name,
                    education_level,
                    subjects,
                    is_student,
                },
            },
        });

        if (error) throw error;

        return user;
    },

    signUpToWaitingList: async function (userInput) {
        try {
            const res = await apiClient.post("/waiting-list", userInput);

            return true;
        } catch (error) {
            if (error.response.status === 409)
                throw new Error("This email is already in use.");
            if (error.response.status !== 201)
                throw new Error(
                    "Something went wrong. Please try again later."
                );
        }
    },

    signIn: async function (email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;

        return data;
    },

    signOut: async function () {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    activateMe: async function (password) {
        const { data: data1, error: error1 } = await supabase.auth.updateUser({
            password,
        });

        if (error1) throw error1;

        const is_student = (await supabase.auth.getSession()).data.session?.user
            .user_metadata.is_student;

        const { data, error } = await supabase.rpc("activate_user", {
            is_student,
        });

        if (error) throw error;

        return data;
    },

    setUsed: async function () {
        const { data, error } = await supabase.rpc("set_used_user");

        if (error) throw error;

        return data;
    },

    updateMe: async function ({ email, password, ...newMetadata }) {
        const { data, error } = await supabase.auth.updateUser({
            ...(email && { email }),
            ...(password && { password }),
            ...(newMetadata && {
                data: {
                    ...(await supabase.auth.getUser()).data.user.user_metadata,
                    ...newMetadata,
                },
            }),
        });

        if (error) throw error;

        return data;
    },

    getAll: async function () {
        const res = await apiClient.get("/users");

        if (res.status === 401) throw new Error("Unauthorised. No user found.");
        if (res.status === 403)
            throw new Error("Forbidden. Insufficient access level.");
        if (res.status !== 200)
            throw new Error("Something went wrong. Please try again later.");

        return res.data;
    },

    deleteById: async function (id) {
        const res = await apiClient.delete(`/users/${id}`);

        if (res.status === 401) throw new Error("Unauthorised. No user found.");
        if (res.status === 403)
            throw new Error("Forbidden. Insufficient access level.");
        if (res.status !== 204)
            throw new Error("Something went wrong. Please try again later.");

        return res.data;
    },

    updateById: async function (id, data) {
        const res = await apiClient.put(`/users/${id}`, data);

        if (res.status === 401) throw new Error("Unauthorised. No user found.");
        if (res.status === 403)
            throw new Error("Forbidden. Insufficient access level.");
        if (res.status !== 200)
            throw new Error("Something went wrong. Please try again later.");

        return res.data;
    },
};

export default UserAPI;
