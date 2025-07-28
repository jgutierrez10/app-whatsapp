export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {    
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone) && phone.replace(/[^\d]/g, '').length >= 8;
};

export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

export const validateName = (name) => {
    return validateRequired(name) && name.trim().length >= 2;
};

export const validateMessage = (message) => {
    return validateRequired(message) && message.trim().length >= 5 && message.trim().length <= 300;
};
