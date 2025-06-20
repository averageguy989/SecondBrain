import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});

export const signup = async (name: string, email: string, password: string): Promise<any> => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
};

export const signin = async (email: string, password: string): Promise<any> => {
    const response = await api.post('/auth/signin', { email, password });
    console.log(response.data);
    return response.data;
};

export const signout = async (): Promise<any> => {
    const response = await api.post('/auth/signout');
    return response.data;
};

export const refreshAccessToken = async (): Promise<any> => {
    const response = await api.post('/auth/refresh');
    return response.data;
};


export { api as authApi };
