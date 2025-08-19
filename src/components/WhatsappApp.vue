<template>
    <!-- Botón flotante: solo esto quedará dentro del contenedor host -->
    <button
        class="whatsapp-float-button"
        @click="showModal"
        title="Contactar por WhatsApp"
    >
        <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon">
    </button>

    <!-- Modal: teletransportado a body para no alterar el DOM de la página host -->
    <teleport to="body">
        <component
            v-if="isVisible"
            :is="modalComponent"
            :is-visible="isVisible"
            :phone="phone"
            :project="project"
            :endpoint="endpoint"
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
import whatsappIcon from '../assets/images/whatsapp.png'

export default {
    name: 'WhatsappApp',
    props: {
        type: { type: String, required: true },
        endpoint: { type: String, required: true },
        project: { type: String, required: true },
        phone: { type: String, required: true }
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