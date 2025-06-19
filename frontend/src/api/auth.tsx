import axios from "axios";

const API_URL = 'http://localhost:3000/api/auth';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});

export const signup = async (name: string, email: string, password: string): Promise<any> => {
    const response = await api.post('/signup', { name, email, password });
    return response.data;
};

export const signin = async (email: string, password: string): Promise<any> => {
    const response = await api.post('/signin', { email, password });
    return response.data;
};

export const signout = async (): Promise<any> => {
    const response = await api.post('/signout');
    return response.data;
};

export const refreshAccessToken = async (): Promise<any> => {
    const response = await api.post('/refresh');
    return response.data;
};


export { api as authApi };
