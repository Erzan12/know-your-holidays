import axios from "axios";

export const api = axios.create({
    // baseURL: 'http://10.10.1.159:3002'
    baseURL: 'https://know-your-holidays-api.onrender.com'
})