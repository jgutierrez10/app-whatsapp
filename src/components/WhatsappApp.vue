<template>
    <!-- Botón flotante dentro del contenedor host -->
    <button
        class="whatsapp-float-button"
        @click="showModal"
        title="Contactar por WhatsApp"
    >
        <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon">
    </button>

    <!-- Modal teletransportado a body -->
    <teleport to="body">
        <component
            v-if="isVisible"
            :is="modalComponent"
            :is-visible="isVisible"
            :phone="phone"
            :project="project"
            :endpoint="endpoint"
            :privacy-policy-url="privacyPolicyUrl"
            :policy-site="policySite"
            :policy-email="policyEmail"
            :whatsapp-icon="whatsappIcon"
            @close="closeModal"
            @submit="handleSubmit"
        />
    </teleport>
</template>

<script>
import { ref, computed } from 'vue'
import { submitWhatsappForm } from '../services/whatsappService.js'
import WhatsappBS3 from './WhatsappBS3.vue'
import WhatsappBS4 from './WhatsappBS4.vue'
import WhatsappBS5 from './WhatsappBS5.vue'
import WhatsappPlain from './WhatsappPlain.vue'
import bundledWhatsappIcon from '../assets/images/whatsapp.png'

export default {
    name: 'WhatsappApp',
    props: {
        type: { type: String, required: true },
        endpoint: { type: String, required: true },
        project: { type: String, required: true },
        phone: { type: String, required: true },
        privacyPolicyUrl: { type: String, required: true },
        policySite: { type: String, required: true },
        policyEmail: { type: String, required: true },
        cdnBase: { type: String, default: '' }
    },
    setup(props) {
        const isVisible = ref(false)
        const isSubmitting = ref(false)

        const modalComponent = computed(() => {
            const map = {
                'bootstrap-3': WhatsappBS3,
                'bootstrap-4': WhatsappBS4,
                'bootstrap-5': WhatsappBS5,
                'plain': WhatsappPlain
            }
            return map[props.type] || WhatsappPlain
        })

        const showModal = () => {
            isVisible.value = true
        }

        const closeModal = () => {
            isVisible.value = false
        }

        const handleSubmit = async (formData) => {
            isSubmitting.value = true
            try {
                // Envío en segundo plano (no await)
                submitWhatsappForm({
                    ...formData,
                    endpoint: props.endpoint,
                    project: props.project
                }).catch(err => console.error('Background submit error:', err))

                // Redirección inmediata a wa.me
                const phone = props.phone.replace(/\D/g, '')
                const text = encodeURIComponent(formData.message || '')
                window.open(`https://wa.me/${phone}?text=${text}`, '_blank')

                closeModal()
            } catch (err) {
                console.error('handleSubmit error:', err)
            } finally {
                isSubmitting.value = false
            }
        }

        // Detección dinámica del icono
        const inferScriptBase = () => {
            try {
                const current = document.currentScript
                if (current && current.src) {
                    return current.src.replace(/\/[^\/]*$/, '')
                }
                // Buscar <script> cuya src contenga "whatsapp" como heurística
                const candidate = Array.from(document.querySelectorAll('script[src]')).find(s => /whatsapp/i.test(s.src))
                if (candidate) {
                    return candidate.src.replace(/\/[^\/]*$/, '')
                }
            } catch (e) {
                // noop
            }
            return ''
        }

        const resolveWhatsappIcon = () => {
            // 1. Prop cdnBase explícita
            const baseFromProp = props.cdnBase && props.cdnBase.trim()
            // 2. Variable global
            const globalBase = typeof window !== 'undefined' && window.WHATSAPP_WIDGET_CDN ? String(window.WHATSAPP_WIDGET_CDN) : ''
            // 3. Inferencia del script
            const inferred = inferScriptBase()
            const chosenBase = baseFromProp || globalBase || inferred
            if (chosenBase) {
                return `${chosenBase.replace(/\/$/, '')}/assets/whatsapp.png`
            }
            // 4. Fallback al asset empaquetado por Vite
            return bundledWhatsappIcon
        }

        const whatsappIcon = resolveWhatsappIcon()

        return {
            isVisible,
            isSubmitting,
            modalComponent,
            showModal,
            closeModal,
            handleSubmit,
            whatsappIcon
        }
    }
}
</script>
<!-- no styles en el componente -->
