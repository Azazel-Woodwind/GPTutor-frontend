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
    }: Omit<User, "id" | "access_level">) {
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
                },
            },
        });

        if (error) throw error;

        return user;
    },

    signIn: async function (email: string, password: string) {
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

    updateMe: async function ({
        email,
        password,
        first_name,
        education_level,
        subjects,
    }: Partial<User>) {
        const { data, error } = await supabase.auth.updateUser({
            ...(email && { email }),
            ...(password && { password }),
            data: {
                ...(first_name && { first_name }),
                ...(education_level && { education_level }),
                ...(subjects && { subjects }),
            },
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

    deleteById: async function (id: string) {
        const res = await apiClient.delete(`/users/${id}`);

        if (res.status === 401) throw new Error("Unauthorised. No user found.");
        if (res.status === 403)
            throw new Error("Forbidden. Insufficient access level.");
        if (res.status !== 204)
            throw new Error("Something went wrong. Please try again later.");

        return res.data;
    },

    updateById: async function (id: string, data: Partial<User>) {
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
