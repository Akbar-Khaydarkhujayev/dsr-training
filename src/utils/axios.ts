import axios from "axios";
import { toast } from "sonner";

export const baseUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_API_URL
        : window.location.origin;

export const apiKey = import.meta.env.VITE_DEV_API_KEY;

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Apikey ${apiKey}`,
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        toast.error("Error occured", {
            description: `${error.response?.data?.message || error.message}`,
        });
        return Promise.reject(error);
    }
);
