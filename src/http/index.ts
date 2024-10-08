import axios from "axios";

export const API_URL = "https://task4back-78im.onrender.com"

const $api = axios.create({
    withCredentials: true,
    baseURL:API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    config.headers["Access-Control-Allow-Origin"] = true
    return config
})

export default $api;