import api from './axiosConfig';

export const getUser = async () => {
    const response = await api.get('/users/profile');
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await api.put('/users/profile', user);
    return response.data;
};


