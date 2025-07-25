import { createApp } from 'vue'

import './assets/scss/style.scss'
import App from './App.vue'
import WhatsappApp from './components/WhatsappApp.vue'

// Mount the main demo app
createApp(App).mount('#app')

// Auto-mount WhatsApp widgets on all containers
function mountWhatsappWidgets() {
    const containers = document.querySelectorAll('div[id="whatsapp-app-container"]');
    
    containers.forEach(container => {
        // Skip if already mounted
        if (container.hasAttribute('data-whatsapp-mounted')) {
            return;
        }

        // Get data attributes
        const type = container.getAttribute('data-type');
        const endpoint = container.getAttribute('data-endpoint');
        const project = container.getAttribute('data-project');
        const phone = container.getAttribute('data-phone');

        // Validate required attributes
        if (!type || !endpoint || !project || !phone) {
            console.error('WhatsApp widget container missing required data attributes:', {
                type, endpoint, project, phone
            });
            return;
        }

        // Validate type
        if (!['bootstrap-3', 'bootstrap-4', 'bootstrap-5', 'plain'].includes(type)) {
            console.error('Invalid WhatsApp widget type:', type);
            return;
        }

        // Create and mount the app
        const app = createApp(WhatsappApp, {
            type,
            endpoint,
            project,
            phone
        });

        app.mount(container);
        
        // Mark as mounted
        container.setAttribute('data-whatsapp-mounted', 'true');
    });
}

// Initial mount
document.addEventListener('DOMContentLoaded', mountWhatsappWidgets);

// Watch for dynamically added containers
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Check if the added node is a container
                    if (node.id === 'whatsapp-app-container') {
                        mountWhatsappWidgets();
                    }
                    // Check for containers within the added node
                    const containers = node.querySelectorAll && node.querySelectorAll('div[id="whatsapp-app-container"]');
                    if (containers && containers.length > 0) {
                        mountWhatsappWidgets();
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
