# WhatsApp Widget CDN - GitHub Pages

🚀 **Widget de WhatsApp listo para usar desde cualquier página web**

## 📦 Instalación

Simplemente incluye el script en tu página HTML:

```html
<script src="https://jgutierrez10.github.io/whatsapp-widget-cdn/whatsapp-widget.js"></script>
```

## 🎯 Uso Básico

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
    <!-- Incluir el widget desde GitHub Pages -->
    <script src="https://jgutierrez10.github.io/whatsapp-widget-cdn/whatsapp-widget.js"></script>
</head>
<body>
    <!-- Contenedor del widget -->
    <div id="whatsapp-app-container" 
         data-type="bootstrap-5"
         data-endpoint="https://tu-api.com/contact"
         data-project="Mi Proyecto"
         data-phone="+1234567890">
    </div>
</body>
</html>
```

## 🔧 Configuración

### data-type
- `bootstrap-3` - Para Bootstrap 3
- `bootstrap-4` - Para Bootstrap 4  
- `bootstrap-5` - Para Bootstrap 5
- `plain` - CSS puro (sin Bootstrap)

### data-endpoint
URL donde se enviarán los datos del formulario

### data-project
Nombre del proyecto que se incluirá en el payload

### data-phone
Número de WhatsApp en formato internacional

## 🌟 Ejemplos

- [Bootstrap 5](https://jgutierrez10.github.io/whatsapp-widget-cdn/ejemplo-bootstrap5.html)
- [CSS Puro](https://jgutierrez10.github.io/whatsapp-widget-cdn/ejemplo-css-puro.html)

## 📱 Características

- ✅ Botón flotante automático
- ✅ Modal responsive
- ✅ Validación de formulario
- ✅ Redirección a WhatsApp
- ✅ Envío a endpoint personalizado
- ✅ Compatible con todos los frameworks

## 🔗 URLs del CDN

- **Script principal**: `https://jgutierrez10.github.io/whatsapp-widget-cdn/whatsapp-widget.js`
- **CSS compilado**: `https://jgutierrez10.github.io/whatsapp-widget-cdn/assets/index-DBxqkryE.css`
- **JS compilado**: `https://jgutierrez10.github.io/whatsapp-widget-cdn/assets/index-DDNDYwvq.js`

---

**Desarrollado por**: [@jgutierrez10](https://github.com/jgutierrez10)  
**Repositorio**: [app-whatsapp](https://github.com/jgutierrez10/app-whatsapp)
