import axios from 'axios';
import md5 from "crypto-js/md5";
import { manipulateLocalStorage } from "./encrypt-storage";

manipulateLocalStorage();

const ACCESS_TOKEN_KEY = md5("ACCESS_TOKEN" + navigator.userAgent).toString();
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Accept = 'application/json';
    const token = localStorage.getDecryptedItem(ACCESS_TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {return response},
    (error) => {
        console.error(error);
        const { response } = error;
        response?.status == 401 && localStorage.removeItem(ACCESS_TOKEN_KEY);
        throw error;
    });

export default axiosClient;