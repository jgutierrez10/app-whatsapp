import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import WhatsappForm from '../../src/components/WhatsappForm.vue'

const defaultProps = {
    privacyPolicyUrl: 'https://example.com/privacy',
    policySite: 'https://www.example.com/legal',
    policyEmail: 'privacy@example.com'
}

const mountForm = (props = {}) => mount(WhatsappForm, {
    attachTo: document.body,
    props: {
        ...defaultProps,
        ...props
    }
})

const fillValidForm = async (wrapper, message = 'Hola, necesito informacion.') => {
    await wrapper.get('#whatsapp-name').setValue('Juan Perez')
    await wrapper.get('#whatsapp-email').setValue('juan@example.com')
    await wrapper.get('#whatsapp-phone').setValue('912345678')
    await wrapper.get('#whatsapp-message').setValue(message)
    await wrapper.get('.privacy-policy-checkbox').setValue(true)
}

describe('WhatsappForm', () => {
    it('keeps submission disabled until every current requirement is valid', async () => {
        const wrapper = mountForm({
            inputClass: 'custom-input',
            submitButtonClass: 'custom-submit'
        })

        expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
        expect(wrapper.get('#whatsapp-name').classes()).toContain('custom-input')
        expect(wrapper.get('button[type="submit"]').classes()).toContain('custom-submit')

        await fillValidForm(wrapper)

        expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeUndefined()
    })

    it('renders all validation errors and does not emit invalid data', async () => {
        const wrapper = mountForm()

        await wrapper.get('form').trigger('submit')

        expect(wrapper.findAll('.error-message')).toHaveLength(5)
        expect(wrapper.emitted('submit')).toBeUndefined()
    })

    it('emits the established form data when the user submits valid values', async () => {
        const wrapper = mountForm()

        await fillValidForm(wrapper)
        await wrapper.get('form').trigger('submit')

        expect(wrapper.emitted('submit')).toEqual([[
            {
                name: 'Juan Perez',
                email: 'juan@example.com',
                phone: '912345678',
                message: 'Hola, necesito informacion.',
                privacyPolicyAccepted: true
            }
        ]])
    })

    it('shows the message counter states at 250 and 300 characters', async () => {
        const wrapper = mountForm()
        const message = wrapper.get('#whatsapp-message')

        await message.setValue('a'.repeat(249))
        expect(wrapper.get('.character-counter').classes()).not.toContain('near-limit')

        await message.setValue('a'.repeat(250))
        expect(wrapper.get('.character-counter').classes()).toContain('near-limit')

        await message.setValue('a'.repeat(300))
        expect(wrapper.get('.character-counter').classes()).toContain('at-limit')
        expect(wrapper.get('.character-counter').text()).toBe('300/300')
    })

    it('renders the optional privacy disclaimer with a normalized hostname', () => {
        const wrapper = mountForm({ showPrivacyPolicyDisclaimer: true })

        expect(wrapper.get('.privacy-policy-disclaimer').text()).toContain('example.com')
        expect(wrapper.get('.privacy-policy-disclaimer a').attributes('href')).toBe(defaultProps.policySite)
        expect(wrapper.get('a[href="mailto:privacy@example.com"]').exists()).toBe(true)
    })

    it('uses the configured site string when it is not a URL', () => {
        const wrapper = mountForm({
            showPrivacyPolicyDisclaimer: true,
            policySite: 'Mi sitio corporativo'
        })

        expect(wrapper.get('.privacy-policy-disclaimer').text()).toContain('Mi sitio corporativo')
    })

    it('keeps clicks on all privacy links inside the form', async () => {
        const wrapper = mountForm({ showPrivacyPolicyDisclaimer: true })
        const clickWithoutNavigation = (selector) => {
            const event = new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
            event.preventDefault()
            wrapper.get(selector).element.dispatchEvent(event)
        }

        clickWithoutNavigation('.privacy-policy-label a')
        clickWithoutNavigation('.privacy-policy-disclaimer a[href="https://www.example.com/legal"]')
        clickWithoutNavigation('.privacy-policy-disclaimer a[href="mailto:privacy@example.com"]')
        await nextTick()

        expect(wrapper.exists()).toBe(true)
    })

    it('renders the submitting state when the shared form state is active', async () => {
        const wrapper = mountForm()

        wrapper.vm.isSubmitting = true
        await nextTick()

        expect(wrapper.get('button[type="submit"]').text()).toContain('Enviando...')
        expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
    })
})
