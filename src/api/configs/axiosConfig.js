import axios from "axios";
import supabase from "./supabase";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use(async function (config) {
    const { data, error } = await supabase.auth.getSession();
    console.log(data);

    if (!error && data) {
        const token = data.session?.access_token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response?.status === 401)
            return Promise.reject("Unauthorised. No user found.");
        if (error.response?.status === 403)
            return Promise.reject("Forbidden. Insufficient access level.");
        if (error.response?.status === 500)
            return Promise.reject("Internal Server Error.");

        console.log(error);
        return Promise.reject("Something went wrong. Please try again later.");
    }
);
