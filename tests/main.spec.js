import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let observers = []

class TestMutationObserver {
    constructor(callback) {
        this.callback = callback
        observers.push(this)
    }

    observe() {}

    disconnect() {}
}

const setReadyState = (value) => {
    Object.defineProperty(document, 'readyState', {
        configurable: true,
        value
    })
}

const validContainer = (overrides = {}) => {
    const attributes = {
        type: 'bootstrap-5',
        endpoint: 'https://api.example.com/contact',
        project: 'Proyecto QA',
        phone: '+56912345678',
        privacyPolicyUrl: 'https://example.com/privacy',
        sitePolicy: 'https://example.com',
        emailPolicy: 'privacy@example.com',
        ...overrides
    }
    const container = document.createElement('div')
    container.id = 'whatsapp-app-container'

    Object.entries(attributes).forEach(([key, value]) => {
        if (value !== undefined) {
            container.dataset[key] = value
        }
    })

    return container
}

const importMain = async () => import('../src/main.js')

describe('widget entrypoint', () => {
    beforeEach(() => {
        document.body.innerHTML = ''
        observers = []
        vi.resetModules()
        vi.stubGlobal('MutationObserver', TestMutationObserver)
        vi.spyOn(console, 'log').mockImplementation(() => {})
        setReadyState('complete')
    })

    afterEach(() => {
        delete document.readyState
    })

    it('does nothing when no widget container exists and exposes manual mounting', async () => {
        const { mountWhatsappWidgets } = await importMain()

        expect(typeof window.mountWhatsappWidgets).toBe('function')
        expect(mountWhatsappWidgets()).toBeUndefined()
        expect(observers).toHaveLength(1)
    })

    it('warns and does not mount when required integration data is absent', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const container = validContainer({ privacyPolicyUrl: undefined })
        document.body.appendChild(container)

        await importMain()

        expect(warn).toHaveBeenCalledWith(
            'Whatsapp container missing data-attributes:',
            expect.objectContaining({ privacyPolicyUrl: undefined })
        )
        expect(container.getAttribute('data-whatsapp-mounted')).toBeNull()
    })

    it('warns and does not mount an unsupported modal type', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const container = validContainer({ type: 'bootstrap-6' })
        document.body.appendChild(container)

        await importMain()

        expect(warn).toHaveBeenCalledWith('Invalid whatsapp type:', 'bootstrap-6')
        expect(container.getAttribute('data-whatsapp-mounted')).toBeNull()
    })

    it('mounts once, preserves host content and reads explicit widget configuration', async () => {
        const container = validContainer({
            cdnBase: 'https://cdn.example.com/widget/',
            showPrivacyPolicyDisclaimer: 'true'
        })
        container.innerHTML = '<span class="host-content">Contenido del sitio</span>'
        document.body.appendChild(container)

        const { mountWhatsappWidgets } = await importMain()

        expect(container.querySelector('.host-content')).not.toBeNull()
        expect(container.querySelectorAll('.whatsapp-mount-root')).toHaveLength(1)
        expect(container.querySelector('.whatsapp-float-button img').getAttribute('src')).toBe(
            'https://cdn.example.com/widget/assets/whatsapp.png'
        )
        expect(container.getAttribute('data-whatsapp-mounted')).toBe('true')

        mountWhatsappWidgets()
        expect(container.querySelectorAll('.whatsapp-mount-root')).toHaveLength(1)
    })

    it('uses the global CDN base when the container does not define one', async () => {
        window.WHATSAPP_WIDGET_CDN = 'https://global.example.com/widget'
        const container = validContainer()
        document.body.appendChild(container)

        await importMain()

        expect(container.querySelector('.whatsapp-float-button img').getAttribute('src')).toBe(
            'https://global.example.com/widget/assets/whatsapp.png'
        )
    })

    it('mounts widgets added after startup through the mutation observer', async () => {
        await importMain()
        const container = validContainer({ type: 'plain' })
        document.body.appendChild(container)

        observers[0].callback([{ addedNodes: [container], removedNodes: [] }])

        expect(container.getAttribute('data-whatsapp-mounted')).toBe('true')
        expect(container.querySelector('.whatsapp-modal-plain')).toBeNull()
    })

    it('unmounts a tracked widget when the observer reports its container removed', async () => {
        const container = validContainer()
        document.body.appendChild(container)
        await importMain()
        container.remove()

        const originalQuerySelectorAll = document.querySelectorAll.bind(document)
        vi.spyOn(document, 'querySelectorAll').mockImplementation((selector) => {
            if (selector === '[data-whatsapp-mounted="true"]') {
                return [container]
            }
            return originalQuerySelectorAll(selector)
        })

        observers[0].callback([{ addedNodes: [], removedNodes: [container] }])

        expect(container.isConnected).toBe(false)
    })

    it('waits for DOMContentLoaded when the document is still loading', async () => {
        setReadyState('loading')
        const container = validContainer()
        document.body.appendChild(container)

        await importMain()
        expect(container.getAttribute('data-whatsapp-mounted')).toBeNull()

        document.dispatchEvent(new Event('DOMContentLoaded'))
        expect(container.getAttribute('data-whatsapp-mounted')).toBe('true')
    })

    it('mounts the development demo when its root is present', async () => {
        document.body.innerHTML = '<div id="app"></div>'

        await importMain()

        expect(document.querySelectorAll('#app .demo-card')).toHaveLength(4)
    })
})
