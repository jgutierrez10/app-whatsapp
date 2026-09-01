# WhatsApp Contact Widget

Un widget de contacto de WhatsApp moderno y responsivo construido con Vue 3 + Vite. Soporta múltiples implementaciones de modal: Bootstrap 3, Bootstrap 4, Bootstrap 5, y CSS puro.

## Características

- 🎨 **Múltiples estilos de modal**: Bootstrap 3, 4, 5, y CSS puro
- 📱 **Diseño responsivo** que se adapta a cualquier dispositivo
- ✅ **Validación de formulario** en tiempo real
- 🔧 **Auto-montaje** en contenedores con `id="whatsapp-app-container"`
- 🌐 **API configurable** mediante atributos de datos
- 🎯 **Composables Vue 3** para lógica reutilizable

## Instalación

```bash
npm install
npm run dev
```

## Uso

### Integración Básica

Agrega un contenedor div con los atributos de datos requeridos:

```html
<div 
    id="whatsapp-app-container"
    data-type="plain"
    data-endpoint="/api/contact"
    data-project="Mi Proyecto"
    data-phone="+56912345678"
    data-privacy-policy-url="https://tu-sitio.com/politica-de-privacidad"
    data-site-policy="https://tu-sitio.com"
    data-email-policy="contacto@tu-sitio.com"
></div>
```

### Atributos Requeridos

- `data-type`: Tipo de modal (`'bootstrap-3'`, `'bootstrap-4'`, `'bootstrap-5'`, `'plain'`)
- `data-endpoint`: URL del endpoint de la API
- `data-project`: Nombre del proyecto (se incluye en el payload)
- `data-phone`: Número de teléfono de WhatsApp para mostrar

- `data-privacy-policy-url`: Enlace a la Política de Privacidad. Es obligatorio y se muestra junto al checkbox de aceptación.
- `data-site-policy`: Sitio mostrado como enlace dentro del texto de autorización.
- `data-email-policy`: Correo mostrado en el texto de autorización y usado en su enlace de contacto.

### Tipos de Modal Disponibles

1. **Bootstrap 3**: `data-type="bootstrap-3"`
2. **Bootstrap 4**: `data-type="bootstrap-4"`
3. **Bootstrap 5**: `data-type="bootstrap-5"`
4. **CSS Puro**: `data-type="plain"`

## Estructura del Proyecto

```
src/
├── api/
│   ├── index.js               # Instancia de Axios
│   └── whatsappService.js     # Servicio para envío de formulario
├── helpers/
│   └── validation.js          # Funciones de validación
├── composables/
│   └── useWhatsappForm.js     # Estado y lógica del formulario
├── components/
│   ├── WhatsappApp.vue        # Componente principal
│   ├── WhatsappForm.vue       # Formulario compartido
│   ├── WhatsappBS3.vue        # Modal Bootstrap 3
│   ├── WhatsappBS4.vue        # Modal Bootstrap 4
│   ├── WhatsappBS5.vue        # Modal Bootstrap 5
│   └── WhatsappPlain.vue      # Modal CSS puro
├── assets/
│   └── style.scss             # Estilos globales
└── main.js                    # Lógica de auto-montaje
```

## API

### Payload del Formulario

```javascript
{
    "name": "Juan Pérez",
    "email": "juan@email.com", 
    "phone": "912345678",
    "message": "Hola, necesito información...",
    "policy": true,
    "project": "Mi Proyecto"
}
```

### Variables de Entorno

```env
VITE_API_BASE_URL=https://tu-api.com
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/mi-feature`)
3. Commit tus cambios (`git commit -am 'Agregar mi feature'`)
4. Push a la rama (`git push origin feature/mi-feature`)
5. Abre un Pull Request

## Licencia

MIT
