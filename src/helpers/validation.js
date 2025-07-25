export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {
    // Validación más flexible: al menos 8 dígitos, permite espacios, guiones, paréntesis y +
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
    return validateRequired(message) && 
           message.trim().length >= 10 && 
           message.trim().length <= 300;
};
