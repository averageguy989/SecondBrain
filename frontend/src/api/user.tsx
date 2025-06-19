import api from './axiosConfig';

export const getUser = async () => {
    console.log('Getting user');
    const response = await api.get('/users/profile');
    console.log(response);
    return response.data;
};

export const updateUser = async (user: any) => {
    const response = await api.put('/users/profile', user);
    return response.data;
};


