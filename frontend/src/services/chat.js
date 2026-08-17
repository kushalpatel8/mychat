import api from './api';

export const getGroups = async () => {
    const response = await api.get('/chat/groups');
    return response.data.groups || response.data || [];
};

export const createGroup = async (name, members) => {
    const response = await api.post('/chat/group', { name, members });
    return response.data;
};

export const getMessages = async (chatId) => {
    const response = await api.get(`/chat/${chatId}/messages`);
    return response.data || [];
};

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data || [];
};
