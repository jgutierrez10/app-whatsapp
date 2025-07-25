import api from '../api/index.js';

export const submitWhatsappForm = async (data) => {
    try {
        const response = await api.post(data.endpoint, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            project: data.project
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to submit form');
    }
};
