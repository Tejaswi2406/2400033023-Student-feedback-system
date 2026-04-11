import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/feedback"; 

export const submitFeedback = (feedbackData) => {
    return axios.post(`${API_BASE_URL}/submit`, feedbackData);
};

export const getAllFeedback = () => {
    return axios.get(`${API_BASE_URL}/all`);
};

export const getStudentFeedback = (email) => {
    return axios.get(`${API_BASE_URL}/student/${email}`);
};