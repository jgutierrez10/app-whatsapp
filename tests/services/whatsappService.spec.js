import { describe, expect, it, vi } from 'vitest'

const { post } = vi.hoisted(() => ({
    post: vi.fn()
}))

vi.mock('../../src/api/index.js', () => ({
    default: { post }
}))

import { submitWhatsappForm } from '../../src/services/whatsappService.js'

const formData = {
    endpoint: 'https://api.example.com/contact',
    name: 'Juan Perez',
    email: 'juan@example.com',
    phone: '+56 9 1234 5678',
    message: 'Hola, necesito informacion.',
    privacyPolicyAccepted: true,
    project: 'Landing principal'
}

describe('submitWhatsappForm', () => {
    it('sends the established endpoint and legacy payload contract', async () => {
        post.mockResolvedValue({ data: { id: 123, status: 'ok' } })

        await expect(submitWhatsappForm(formData)).resolves.toEqual({ id: 123, status: 'ok' })
        expect(post).toHaveBeenCalledWith(formData.endpoint, {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            policy: true,
            proyect: formData.project
        })
    })

    it('surfaces the API error message', async () => {
        post.mockRejectedValue({ response: { data: { message: 'El endpoint rechazo el lead' } } })

        await expect(submitWhatsappForm(formData)).rejects.toThrow('El endpoint rechazo el lead')
    })

    it.each([
        [{ response: { data: {} } }],
        [{}]
    ])('uses the safe error message when the API response has no message', async (error) => {
        post.mockRejectedValue(error)

        await expect(submitWhatsappForm(formData)).rejects.toThrow('Failed to submit form')
    })
})
