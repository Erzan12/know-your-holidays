import axios from "axios";

export const api = axios.create({
    baseURL: 'https://know-your-holidays-api.onrender.com'
})