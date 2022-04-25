import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const ACCESS_TOKEN = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
).currentUser?.accessToken;
export const publicRequest = axios.create({ baseURL: BASE_URL });
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
});
