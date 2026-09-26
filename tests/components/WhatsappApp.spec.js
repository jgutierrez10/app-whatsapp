import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import WhatsappApp from '../../src/components/WhatsappApp.vue'
import WhatsappBS3 from '../../src/components/WhatsappBS3.vue'
import WhatsappBS4 from '../../src/components/WhatsappBS4.vue'
import WhatsappBS5 from '../../src/components/WhatsappBS5.vue'
import WhatsappPlain from '../../src/components/WhatsappPlain.vue'

const { submitWhatsappForm } = vi.hoisted(() => ({
    submitWhatsappForm: vi.fn()
}))

vi.mock('../../src/services/whatsappService.js', () => ({
    submitWhatsappForm
}))

const defaultProps = {
    type: 'bootstrap-5',
    endpoint: 'https://api.example.com/contact',
    project: 'Proyecto QA',
    phone: '+56 (9) 1234-5678',
    privacyPolicyUrl: 'https://example.com/privacy',
    policySite: 'https://example.com',
    policyEmail: 'privacy@example.com'
}

const formData = {
    name: 'Juan Perez',
    email: 'juan@example.com',
    phone: '912345678',
    message: 'Necesito información & precios',
    privacyPolicyAccepted: true
}

const mountApp = (props = {}) => mount(WhatsappApp, {
    attachTo: document.body,
    props: {
        ...defaultProps,
        ...props
    }
})

const getMountedModal = (wrapper) => [
    WhatsappBS3,
    WhatsappBS4,
    WhatsappBS5,
    WhatsappPlain
].map((component) => wrapper.findComponent(component)).find((modal) => modal.exists())

const dispatchSubmit = async (wrapper, payload = formData) => {
    const modal = getMountedModal(wrapper)
    modal.vm.$emit('submit', payload)
    await flushPromises()
}

afterEach(() => {
    const descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    if (descriptor && descriptor.configurable) {
        delete document.currentScript
    }
})

describe('WhatsappApp', () => {
    it.each([
        ['bootstrap-3', '.whatsapp-modal-bs3'],
        ['bootstrap-4', '.whatsapp-modal-bs4'],
        ['bootstrap-5', '.whatsapp-modal-bs5'],
        ['plain', '.whatsapp-modal-plain'],
        ['unsupported-type', '.whatsapp-modal-plain']
    ])('opens the %s modal variant and closes it from the child event', async (type, selector) => {
        const wrapper = mountApp({ type })

        await wrapper.get('.whatsapp-float-button').trigger('click')
        expect(document.body.querySelector(selector)).not.toBeNull()

        getMountedModal(wrapper).vm.$emit('close')
        await flushPromises()
        expect(document.body.querySelector(selector)).toBeNull()
    })

    it('sends data in the background and opens WhatsApp with a safe URL', async () => {
        const wrapper = mountApp()
        const open = vi.spyOn(window, 'open').mockImplementation(() => null)
        submitWhatsappForm.mockResolvedValue({ ok: true })

        await wrapper.get('.whatsapp-float-button').trigger('click')
        await dispatchSubmit(wrapper)

        expect(submitWhatsappForm).toHaveBeenCalledWith({
            ...formData,
            endpoint: defaultProps.endpoint,
            project: defaultProps.project
        })
        expect(open).toHaveBeenCalledWith(
            'https://wa.me/56912345678?text=Necesito%20informaci%C3%B3n%20%26%20precios',
            '_blank'
        )
        expect(document.body.querySelector('.whatsapp-modal-bs5')).toBeNull()
    })

    it('logs a failed background submission but still sends the user to WhatsApp', async () => {
        const wrapper = mountApp()
        const error = new Error('Endpoint no disponible')
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const open = vi.spyOn(window, 'open').mockImplementation(() => null)
        submitWhatsappForm.mockRejectedValue(error)

        await wrapper.get('.whatsapp-float-button').trigger('click')
        await dispatchSubmit(wrapper)

        expect(errorSpy).toHaveBeenCalledWith('Background submit error:', error)
        expect(open).toHaveBeenCalled()
    })

    it('logs an unexpected redirect error and restores the submitting state', async () => {
        const wrapper = mountApp()
        const error = new Error('Bloqueado por el navegador')
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        vi.spyOn(window, 'open').mockImplementation(() => {
            throw error
        })
        submitWhatsappForm.mockResolvedValue({ ok: true })

        await wrapper.get('.whatsapp-float-button').trigger('click')
        await dispatchSubmit(wrapper)

        expect(errorSpy).toHaveBeenCalledWith('handleSubmit error:', error)
        expect(wrapper.vm.isSubmitting).toBe(false)
    })

    it('prefers an explicit CDN base for the icon', () => {
        const wrapper = mountApp({ cdnBase: 'https://cdn.example.com/widget/' })

        expect(wrapper.get('img').attributes('src')).toBe('https://cdn.example.com/widget/assets/whatsapp.png')
    })

    it('uses the global CDN when the explicit base is blank', () => {
        window.WHATSAPP_WIDGET_CDN = 'https://global.example.com/widget'
        const wrapper = mountApp({ cdnBase: '   ' })

        expect(wrapper.get('img').attributes('src')).toBe('https://global.example.com/widget/assets/whatsapp.png')
    })

    it('infers the icon path from the current widget script', () => {
        Object.defineProperty(document, 'currentScript', {
            configurable: true,
            value: { src: 'https://scripts.example.com/releases/widget.js' }
        })
        const wrapper = mountApp()

        expect(wrapper.get('img').attributes('src')).toBe('https://scripts.example.com/releases/assets/whatsapp.png')
    })

    it('falls back to a matching script and then to the bundled asset', () => {
        const script = document.createElement('script')
        script.src = 'https://scripts.example.com/release/whatsapp-widget.js'
        document.head.appendChild(script)

        const inferred = mountApp()
        expect(inferred.get('img').attributes('src')).toBe('https://scripts.example.com/release/assets/whatsapp.png')

        script.remove()
        const bundled = mountApp()
        expect(bundled.get('img').attributes('src')).not.toContain('scripts.example.com')
    })
})
