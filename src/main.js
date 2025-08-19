import { createApp } from 'vue'
import './assets/scss/style.scss'
import App from './App.vue'
import WhatsappApp from './components/WhatsappApp.vue'

// Map para almacenar instancias montadas y poder desmontar si hace falta
const mountedApps = new WeakMap()

// Montar la app demo solo si existe el root #app y estamos en desarrollo
const tryMountDemoApp = () => {
    const demoRoot = document.getElementById('app')
    if (!demoRoot) {
        console.log('No #app element found — skipping demo mount')
        return
    }
    // montar demo solo en entorno dev
    if (import.meta.env && import.meta.env.DEV) {
        try {
            createApp(App).mount('#app')
            console.log('Demo app mounted on #app')
        } catch (err) {
            console.error('Failed to mount demo app:', err)
        }
    } else {
        console.log('Skipping demo mount in production')
    }
}

// Auto-mount WhatsApp widgets en todos los contenedores
export function mountWhatsappWidgets() {
    const containers = document.querySelectorAll('#whatsapp-app-container')
    if (!containers.length) {
        // no containers found
        return
    }

    containers.forEach(container => {
        // evitar montaje duplicado
        if (container.getAttribute('data-whatsapp-mounted') === 'true') return

        const type = container.dataset.type
        const endpoint = container.dataset.endpoint
        const project = container.dataset.project
        const phone = container.dataset.phone

        // Validaciones básicas
        if (!type || !endpoint || !project || !phone) {
            console.warn('Whatsapp container missing data-attributes:', { type, endpoint, project, phone })
            return
        }
        if (!['bootstrap-3', 'bootstrap-4', 'bootstrap-5', 'plain'].includes(type)) {
            console.warn('Invalid whatsapp type:', type)
            return
        }

        try {
            // crear wrapper interno para no reemplazar contenido del container host
            let mountRoot = container.querySelector('.whatsapp-mount-root')
            if (!mountRoot) {
                mountRoot = document.createElement('div')
                mountRoot.className = 'whatsapp-mount-root'
                // append mantiene el contenido existente del container
                container.appendChild(mountRoot)
            }

            const app = createApp(WhatsappApp, { type, endpoint, project, phone })
            app.mount(mountRoot)

            // almacenar referencia para posible unmount
            mountedApps.set(container, { app, mountRoot })

            container.setAttribute('data-whatsapp-mounted', 'true')
            console.log('Whatsapp widget mounted inside container', container)
        } catch (err) {
            console.error('Error mounting Whatsapp widget:', err)
        }
    })
}

// Función para desmontar widgets cuyo contenedor fue removido
function cleanupUnmountedContainers() {
    // recorremos las keys (no iterable directamente; mantenemos WeakMap de container->instance)
    // para simplicidad, comprobamos todos los contenedores actuales y removemos entradas no existentes
    // (WeakMap se limpia automáticamente cuando no hay referencias)
    // Aquí intentamos desmontar apps cuyo container ya no está en document
    document.querySelectorAll('[data-whatsapp-mounted="true"]').forEach(container => {
        if (!document.documentElement.contains(container)) {
            const entry = mountedApps.get(container)
            if (entry && entry.app) {
                try {
                    entry.app.unmount()
                    console.log('Unmounted whatsapp app for removed container')
                } catch (err) {
                    console.error('Error unmounting whatsapp app:', err)
                }
            }
            mountedApps.delete(container)
        }
    })
}

// Inicialización al cargar el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        tryMountDemoApp()
        mountWhatsappWidgets()
    })
} else {
    tryMountDemoApp()
    mountWhatsappWidgets()
}

// Observador para contenedores añadidos dinámicamente y limpieza de removidos
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(mutations => {
        let added = false
        let removed = false

        for (const m of mutations) {
            if (m.addedNodes && m.addedNodes.length) added = true
            if (m.removedNodes && m.removedNodes.length) removed = true
            if (added && removed) break
        }

        if (added) mountWhatsappWidgets()
        if (removed) cleanupUnmountedContainers()
    })
    observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true
    })
}

// Exponer para uso manual / debug
window.mountWhatsappWidgets = mountWhatsappWidgets