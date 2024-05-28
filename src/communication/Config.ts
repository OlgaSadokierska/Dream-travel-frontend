import axios from "axios";

export const getToken = () => {
    const tokenString = localStorage.getItem("Token");
    console.log("Token string:", tokenString);
    return tokenString ? tokenString : null;
};

export const getAuthorizationHeader = () => {
    const token = getToken();
    return token ? `Bearer ${token}` : null;
};
export const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = getAuthorizationHeader();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);