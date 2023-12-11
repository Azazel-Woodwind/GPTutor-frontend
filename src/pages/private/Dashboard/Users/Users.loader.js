import UserAPI from "@/api/UserAPI";

const loader = async () => {
    const users = await UserAPI.getAll();
    // console.log("ALL USERS:", users);
    return users;
};

export default loader;
