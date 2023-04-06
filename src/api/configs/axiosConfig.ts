import axios from "axios";
import supabase from "./supabase";

export const apiClient = axios.create({
    baseURL: import.meta.env.PROD ? "/api" : "http://localhost:3001/api",
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