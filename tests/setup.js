import { afterEach, vi } from 'vitest'

afterEach(() => {
    document.body.innerHTML = ''
    delete window.WHATSAPP_WIDGET_CDN
    vi.unstubAllGlobals()
})
