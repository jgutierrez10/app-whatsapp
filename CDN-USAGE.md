# WhatsApp Widget CDN - Guía de Uso

## 🚀 Instalación Rápida

### Opción 1: Auto-inicialización (Recomendada)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
    <!-- Incluir el widget desde CDN -->
    <script src="https://tu-cdn.com/whatsapp-widget.js"></script>
</head>
<body>
    <!-- Contenedor del widget -->
    <div id="whatsapp-app-container" 
         data-type="bootstrap-5"
         data-endpoint="https://tu-api.com/contact"
         data-project="Mi Proyecto"
         data-phone="+1234567890"
         data-privacy-policy-url="https://tu-sitio.com/politica-de-privacidad"
         data-site-policy="https://tu-sitio.com"
         data-email-policy="contacto@tu-sitio.com">
    </div>
</body>
</html>
```

### Opción 2: Inicialización Manual

```html
<script src="https://tu-cdn.com/whatsapp-widget.js"></script>
<script>
    // Inicializar manualmente con configuración personalizada
    window.initWhatsAppWidget({
        cdnUrl: 'https://mi-cdn-personalizado.com/dist/'
    });
</script>
```

## 📋 Parámetros de Configuración

### data-type (requerido)
Tipo de modal a usar:
- `bootstrap-3` - Para sitios con Bootstrap 3
- `bootstrap-4` - Para sitios con Bootstrap 4  
- `bootstrap-5` - Para sitios con Bootstrap 5
- `plain` - CSS puro (sin dependencias)

### data-endpoint (requerido)
URL del endpoint donde se enviarán los datos del formulario.

### data-project (requerido)
Nombre del proyecto que se incluirá en el payload enviado al endpoint.

### data-privacy-policy-url (requerido)
URL de la Política de Privacidad. El formulario solo se puede enviar cuando el usuario la acepta.

### data-email-policy (requerido)
Correo mostrado en el texto de autorización, con un enlace para contactar.

### data-site-policy (requerido)
Sitio mostrado como enlace dentro del texto de autorización.

### data-phone (requerido)
Número de WhatsApp en formato internacional (ej: +1234567890).

## 🌟 Ejemplos de Uso

### Bootstrap 5
```html
<div id="whatsapp-app-container" 
     data-type="bootstrap-5"
     data-endpoint="https://api.miempresa.com/contacto"
     data-project="Sitio Web Corporativo"
     data-phone="+5491234567890"
     data-privacy-policy-url="https://miempresa.com/politica-de-privacidad"
     data-site-policy="https://miempresa.com"
     data-email-policy="contacto@miempresa.com">
</div>
```

### CSS Puro (Sin Bootstrap)
```html
<div id="whatsapp-app-container" 
     data-type="plain"
     data-endpoint="https://hooks.zapier.com/hooks/catch/123456/abcdef"
     data-project="Landing Page"
     data-phone="+34612345678"
     data-privacy-policy-url="https://miempresa.com/politica-de-privacidad"
     data-site-policy="https://miempresa.com"
     data-email-policy="contacto@miempresa.com">
</div>
```

### Bootstrap 4
```html
<div id="whatsapp-app-container" 
     data-type="bootstrap-4"
     data-endpoint="https://formspree.io/f/xeqwerty"
     data-project="Blog Personal"
     data-phone="+5255987654321"
     data-privacy-policy-url="https://miempresa.com/politica-de-privacidad"
     data-site-policy="https://miempresa.com"
     data-email-policy="contacto@miempresa.com">
</div>
```

## 🔧 Estructura del Payload

El widget enviará los siguientes datos al endpoint configurado:

```json
{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com", 
    "phone": "123456789",
    "message": "Hola, me interesa su producto...",
    "policy": true,
    "project": "Mi Proyecto"
}
```

## 📁 Archivos CDN Necesarios

Para hospedar en tu propio CDN, necesitas estos archivos:

```
/dist/
├── whatsapp-widget.js          # Script principal
├── assets/
│   ├── index-DBxqkryE.css     # Estilos compilados
│   ├── index-DDNDYwvq.js      # JavaScript compilado
│   └── whatsapp-BYxq1p8Q.png  # Imagen del ícono
```

## 🎨 Personalización

El widget se adapta automáticamente al framework de CSS que uses:
- **Bootstrap 3**: Modales con estilos clásicos
- **Bootstrap 4**: Modales modernos 
- **Bootstrap 5**: Última versión con mejoras
- **CSS Puro**: Estilos propios sin dependencias

## 🔒 Seguridad

- El widget solo envía datos al endpoint que configures
- No recopila información adicional del usuario
- Todas las comunicaciones son via HTTPS (recomendado)

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (últimas versiones)
- ✅ Dispositivos móviles y desktop
- ✅ Compatible con SPA (React, Vue, Angular)
- ✅ Funciona con cualquier backend (PHP, Node.js, Python, etc.)
