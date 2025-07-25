<template>
    <!-- Botón flotante de WhatsApp -->
    <button 
        class="whatsapp-float-button"
        @click="showModal"
        title="Contactar por WhatsApp"
    >
        <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon">
    </button>

    <!-- Modal componente -->
    <component 
        :is="modalComponent" 
        :is-visible="isVisible"
        :phone="phone"
        :project="project"
        :endpoint="endpoint"
        @close="closeModal"
        @submit="handleSubmit"
    />
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { submitWhatsappForm } from '../services/whatsappService.js';
import { useWhatsappForm } from '../composables/useWhatsappForm.js';
import WhatsappBS3 from './WhatsappBS3.vue';
import WhatsappBS4 from './WhatsappBS4.vue';
import WhatsappBS5 from './WhatsappBS5.vue';
import WhatsappPlain from './WhatsappPlain.vue';
import whatsappIcon from '../assets/images/whatsapp.png';

export default {
    name: 'WhatsappApp',
    components: {
        WhatsappBS3,
        WhatsappBS4,
        WhatsappBS5,
        WhatsappPlain
    },
    props: {
        type: {
            type: String,
            required: true,
            validator: (value) => ['bootstrap-3', 'bootstrap-4', 'bootstrap-5', 'plain'].includes(value)
        },
        endpoint: {
            type: String,
            required: true
        },
        project: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const isVisible = ref(false);
        const { formData, errors, isSubmitting, validateForm, resetForm } = useWhatsappForm();

        const modalComponent = computed(() => {
            const componentMap = {
                'bootstrap-3': 'WhatsappBS3',
                'bootstrap-4': 'WhatsappBS4',
                'bootstrap-5': 'WhatsappBS5',
                'plain': 'WhatsappPlain'
            };
            return componentMap[props.type];
        });

        const showModal = () => {
            isVisible.value = true;
        };

        const closeModal = () => {
            isVisible.value = false;
            resetForm();
        };

        const handleSubmit = async (formDataToSubmit) => {
            if (!validateForm()) {
                return;
            }

            isSubmitting.value = true;

            try {
                await submitWhatsappForm({
                    ...formDataToSubmit,
                    endpoint: props.endpoint,
                    project: props.project
                });
                
                closeModal();
                alert('¡Mensaje enviado exitosamente!');
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                isSubmitting.value = false;
            }
        };

        onMounted(() => {
            // Expose showModal to global scope for external triggering
            window.showWhatsappModal = showModal;
        });

        return {
            isVisible,
            modalComponent,
            showModal,
            closeModal,
            handleSubmit,
            whatsappIcon
        };
    }
};
</script>
