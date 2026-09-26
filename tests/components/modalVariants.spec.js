import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import WhatsappBS3 from '../../src/components/WhatsappBS3.vue'
import WhatsappBS4 from '../../src/components/WhatsappBS4.vue'
import WhatsappBS5 from '../../src/components/WhatsappBS5.vue'
import WhatsappForm from '../../src/components/WhatsappForm.vue'
import WhatsappPlain from '../../src/components/WhatsappPlain.vue'

const sharedProps = {
    isVisible: true,
    phone: '+56912345678',
    project: 'Proyecto QA',
    endpoint: 'https://api.example.com/contact',
    privacyPolicyUrl: 'https://example.com/privacy',
    policySite: 'https://example.com',
    policyEmail: 'privacy@example.com'
}

const variants = [
    ['Bootstrap 3', WhatsappBS3, '.whatsapp-modal-bs3', '.modal-backdrop', '.close'],
    ['Bootstrap 4', WhatsappBS4, '.whatsapp-modal-bs4', '.modal-backdrop', '.close'],
    ['Bootstrap 5', WhatsappBS5, '.whatsapp-modal-bs5', '.modal-backdrop', '.btn-close'],
    ['plain CSS', WhatsappPlain, '.whatsapp-modal-plain', '.modal-overlay', '.close-button']
]

describe('modal variants', () => {
    it.each(variants)('%s renders, delegates a submit, closes from its controls and hides', async (
        name,
        component,
        rootSelector,
        backdropSelector,
        closeSelector
    ) => {
        const wrapper = mount(component, {
            attachTo: document.body,
            props: {
                ...sharedProps,
                whatsappIcon: 'https://cdn.example.com/whatsapp.png'
            }
        })

        expect(wrapper.get(rootSelector).exists()).toBe(true)
        expect(wrapper.get('img').attributes('src')).toBe('https://cdn.example.com/whatsapp.png')

        wrapper.getComponent(WhatsappForm).vm.$emit('submit', { name: 'Juan Perez' })
        expect(wrapper.emitted('submit')).toEqual([[{ name: 'Juan Perez' }]])

        wrapper.getComponent(WhatsappForm).vm.$emit('cancel')
        await wrapper.get(backdropSelector).trigger('click')
        await wrapper.get(closeSelector).trigger('click')
        expect(wrapper.emitted('close')).toHaveLength(3)

        await wrapper.setProps({ isVisible: false })
        expect(wrapper.find(rootSelector).exists()).toBe(false)
    })

    it.each(variants)('%s falls back to the bundled icon when no icon prop is supplied', (
        name,
        component
    ) => {
        const wrapper = mount(component, {
            props: sharedProps
        })

        expect(wrapper.get('img').attributes('src')).not.toBe('')
    })

    it.each([
        ['Bootstrap 3', WhatsappBS3],
        ['Bootstrap 4', WhatsappBS4],
        ['Bootstrap 5', WhatsappBS5]
    ])('%s closes on Escape and unregisters its listener on unmount', (name, component) => {
        const close = vi.fn()
        const wrapper = mount(component, {
            attachTo: document.body,
            props: sharedProps,
            attrs: {
                onClose: close
            }
        })

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
        expect(close).not.toHaveBeenCalled()

        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
        expect(close).toHaveBeenCalledTimes(1)

        wrapper.unmount()
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
        expect(close).toHaveBeenCalledTimes(1)
    })
})
