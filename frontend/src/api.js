import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

export const signup = async (username, email, password) => {
    const response = await api.post('/signup', { username, email, password });
    return response.data;
};

export const getDishes = async () => {
    const response = await api.get('/dishes');
    return response.data;
};

export const createDish = async (dishData) => {
    const response = await api.post('/dishes', dishData);
    return response.data;
};

export const updateDish = async (id, dishData) => {
    const response = await api.put(`/dishes/${id}`, dishData);
    return response.data;
};

export const deleteDish = async (id) => {
    const response = await api.delete(`/dishes/${id}`);
    return response.data;
};

export const rateDish = async (id, rating) => {
    const response = await api.patch(`/dishes/${id}/rate`, { rating });
    return response.data;
};

export const getOffers = async () => {
    const response = await api.get('/offers');
    return response.data;
};

export const createOffer = async (content) => {
    const response = await api.post('/offers', { content });
    return response.data;
};

export const deleteOffer = async (id) => {
    const response = await api.delete(`/offers/${id}`);
    return response.data;
};

export const getMessages = async () => {
    const response = await api.get('/messages');
    return response.data;
};

export const sendMessage = async (text) => {
    const response = await api.post('/messages', { text });
    return response.data;
};

export default api;
