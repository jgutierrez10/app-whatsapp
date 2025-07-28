import api from '../api/index.js';

/**
 * Submits a WhatsApp form by sending the provided data to the specified API endpoint.
 *
 * @param {Object} data - The form data to be submitted.
 * @param {string} data.endpoint - The API endpoint to which the form will be submitted.
 * @param {string} data.name - The name of the user submitting the form.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.phone - The phone number of the user.
 * @param {string} data.message - The message content from the user.
 * @param {string} data.project - The project related to the form submission.
 * 
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} Throws an error if the form submission fails.
 */
export const submitWhatsappForm = async (data) => {
    try {
        const response = await api.post(data.endpoint, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
            proyect: data.project
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to submit form');
    }
};
