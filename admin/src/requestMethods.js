import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const localStorageUser = JSON.parse(localStorage.getItem("persist:root"))?.user;
const ACCESS_TOKEN = localStorageUser
    ? JSON.parse(localStorageUser).currentUser?.accessToken
    : "";

export const publicRequest = axios.create({ baseURL: BASE_URL });
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});
