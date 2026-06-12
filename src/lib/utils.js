import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL:"http://187.127.175.100/chat/",
    withCredentials: true,
});