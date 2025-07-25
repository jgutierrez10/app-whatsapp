import { ref, reactive, computed } from 'vue';
import { validateEmail, validatePhone, validateName, validateMessage } from '../helpers/validation.js';

export function useWhatsappForm() {
    const formData = reactive({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const errors = reactive({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const isSubmitting = ref(false);

    const validateForm = () => {
        errors.name = !validateName(formData.name) 
            ? 'El nombre debe tener al menos 2 caracteres' 
            : '';
        
        errors.email = !validateEmail(formData.email) 
            ? 'Por favor ingresa un email válido' 
            : '';
        
        errors.phone = !validatePhone(formData.phone) 
            ? 'Por favor ingresa un número de teléfono válido' 
            : '';
        
        errors.message = !validateMessage(formData.message) 
            ? 'El mensaje debe tener entre 10 y 300 caracteres' 
            : '';

        return !errors.name && !errors.email && !errors.phone && !errors.message;
    };

    const resetForm = () => {
        formData.name = '';
        formData.email = '';
        formData.phone = '';
        formData.message = '';
        
        errors.name = '';
        errors.email = '';
        errors.phone = '';
        errors.message = '';
    };

    const isFormValid = computed(() => {
        return formData.name && 
               formData.email && 
               formData.phone && 
               formData.message &&
               validateName(formData.name) && 
               validateEmail(formData.email) && 
               validatePhone(formData.phone) && 
               validateMessage(formData.message);
    });

    return {
        formData,
        errors,
        isSubmitting,
        validateForm,
        resetForm,
        isFormValid
    };
}
