import { describe, expect, it } from 'vitest'
import { useWhatsappForm } from '../../src/composables/useWhatsappForm.js'

const validForm = {
    name: 'Juan Perez',
    email: 'juan@example.com',
    phone: '+56 9 1234 5678',
    message: 'Hola, necesito informacion.',
    privacyPolicyAccepted: true
}

const createValidForm = () => {
    const form = useWhatsappForm()
    Object.assign(form.formData, validForm)
    return form
}

describe('useWhatsappForm', () => {
    it('starts invalid and reports all mandatory errors', () => {
        const { errors, formData, isFormValid, isSubmitting, validateForm } = useWhatsappForm()

        expect(isSubmitting.value).toBe(false)
        expect(isFormValid.value).toBeFalsy()
        expect(validateForm()).toBe(false)
        expect(errors).toEqual({
            name: 'El nombre debe tener al menos 2 caracteres',
            email: 'Por favor ingresa un email válido',
            phone: 'Por favor ingresa un número de teléfono válido',
            message: 'El mensaje debe tener entre 10 y 300 caracteres',
            privacyPolicyAccepted: 'Debes aceptar la Política de Privacidad para continuar'
        })
        expect(formData.privacyPolicyAccepted).toBe(false)
    })

    it.each([
        ['name', 'J'],
        ['email', 'correo-invalido'],
        ['phone', '1234567'],
        ['message', 'Hola'],
        ['privacyPolicyAccepted', false]
    ])('is invalid when %s does not meet the contract', (field, value) => {
        const { formData, isFormValid, validateForm } = createValidForm()
        formData[field] = value

        expect(isFormValid.value).toBeFalsy()
        expect(validateForm()).toBe(false)
    })

    it('accepts valid data and resets data and errors', () => {
        const { errors, formData, isFormValid, resetForm, validateForm } = createValidForm()

        expect(isFormValid.value).toBe(true)
        expect(validateForm()).toBe(true)

        resetForm()

        expect(formData).toEqual({
            name: '',
            email: '',
            phone: '',
            message: '',
            privacyPolicyAccepted: false
        })
        expect(errors).toEqual({
            name: '',
            email: '',
            phone: '',
            message: '',
            privacyPolicyAccepted: ''
        })
        expect(isFormValid.value).toBeFalsy()
    })
})
