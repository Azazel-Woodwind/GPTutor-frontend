import { apiClient } from "./configs/axiosConfig";
import supabase from "./configs/supabase";

/**
 * A collection of API methods for user account management.
 */
const UserAPI = {
    /**
     * Registers a new user with the provided details.
     *
     * @async
     * @param {Object} userDetails - User details for registration.
     * @param {string} userDetails.email - The user's email.
     * @param {string} userDetails.password - The user's password.
     * @param {string} userDetails.first_name - The user's first name.
     * @param {string} userDetails.last_name - The user's last name.
     * @param {string} userDetails.education_level - The user's education level.
     * @param {string[]} userDetails.subjects - The user's subjects of interest.
     * @param {boolean} userDetails.is_student - Indicates if the user is a student.
     * @returns {Promise<Object>} The newly created user object.
     * @throws Throws an error if the registration fails.
     */
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

    /**
     * Adds a user to the waiting list with the provided details.
     *
     * @async
     * @param {Object} userInput - The user's information.
     * @returns {Promise<boolean>} Returns true on successful addition to the waiting list.
     * @throws Throws an error if the operation fails.
     */
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

    /**
     * Signs in a user with email and password.
     *
     * @async
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @returns {Promise<Object>} The signed-in user's data.
     * @throws Throws an error if the sign-in fails.
     */
    signIn: async function (email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;

        return data;
    },

    /**
     * Signs out the currently logged-in user.
     *
     * @async
     * @throws Throws an error if the sign-out fails.
     */
    signOut: async function () {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    /**
     * Activates the currently logged-in user's account.
     *
     * @async
     * @param {string} password - The user's new password.
     * @returns {Promise<Object>} The updated user data.
     * @throws Throws an error if the activation fails.
     */
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

    /**
     * Sets the currently logged-in user's account to used.
     *
     * @async
     * @returns {Promise<Object>} The updated user data.
     * @throws Throws an error if the operation fails.
     */
    setUsed: async function () {
        const { data, error } = await supabase.rpc("set_used_user");

        if (error) throw error;

        return data;
    },

    /**
     * Updates the currently logged-in user's account information.
     *
     * @async
     * @param {Object} updateData - The data for updating the user's account.
     * @returns {Promise<Object>} The updated user data.
     * @throws Throws an error if the update fails.
     */
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

    /**
     * Retrieves all users' data.
     *
     * @async
     * @returns {Promise<Object[]>} An array of user objects.
     * @throws Throws an error if the retrieval fails.
     */
    getAll: async function () {
        const res = await apiClient.get("/users");

        if (res.status === 401) throw new Error("Unauthorised. No user found.");
        if (res.status === 403)
            throw new Error("Forbidden. Insufficient access level.");
        if (res.status !== 200)
            throw new Error("Something went wrong. Please try again later.");

        return res.data;
    },

    /**
     * Deletes a user by their ID.
     *
     * @async
     * @param {string} id - The user's unique identifier.
     * @returns {Promise<Object>} Confirmation of the deletion.
     * @throws Throws an error if the deletion fails.
     */
    deleteById: async function (id) {
        const res = await apiClient.delete(`/users/${id}`);

        if (res.status === 401) throw new Error("Unauthorised. No user found.");
        if (res.status === 403)
            throw new Error("Forbidden. Insufficient access level.");
        if (res.status !== 204)
            throw new Error("Something went wrong. Please try again later.");

        return res.data;
    },

    /**
     * Updates a user's information by their ID.
     *
     * @async
     * @param {string} id - The user's unique identifier.
     * @param {Object} data - The new data for the user.
     * @returns {Promise<Object>} The updated user data.
     * @throws Throws an error if the update fails.
     */
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
