/**
 * WhatsApp Widget CDN
 * Para usar este widget, incluye este script en tu página y agrega los contenedores con los data-attributes correspondientes.
 * 
 * Uso:
 * <script src="https://tu-cdn.com/whatsapp-widget.js"></script>
 * <div id="whatsapp-app-container" 
 *      data-type="bootstrap-5"
 *      data-endpoint="https://tu-api.com/contact"
 *      data-project="Mi Proyecto"
 *      data-phone="+1234567890">
 * </div>
 */

(function() {
    'use strict';
    
    // Configuración base del CDN
    const CDN_BASE_URL = 'https://jgutierrez10.github.io/app-whatsapp/dist/'; // Cambiar por tu URL de CDN
    
    // Cargar CSS del widget
    function loadCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = CDN_BASE_URL + 'assets/index-DBxqkryE.css';
        document.head.appendChild(link);
    }
    
    // Cargar JavaScript del widget
    function loadJS() {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = CDN_BASE_URL + 'assets/index-DDNDYwvq.js';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }
    
    // Auto-inicializar cuando el DOM esté listo
    function initializeWidget() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                loadCSS();
                loadJS();
            });
        } else {
            loadCSS();
            loadJS();
        }
    }
    
    // Función global para inicializar manualmente
    window.initWhatsAppWidget = function(config) {
        // Permitir configuración personalizada
        if (config && config.cdnUrl) {
            CDN_BASE_URL = config.cdnUrl;
        }
        
        loadCSS();
        loadJS();
    };
    
    // Auto-inicializar por defecto
    initializeWidget();
    
})();
