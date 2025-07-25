<template>
    <div v-if="isVisible" class="modal fade show whatsapp-modal-bs5" style="display: block;">
        <div class="modal-backdrop fade show"></div>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">
                        <span class="whatsapp-icon-circle">
                            <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon">
                        </span>
                        WhatsApp
                    </h1>
                    <button type="button" class="btn-close" @click="$emit('close')"></button>
                </div>
                <div class="modal-body">
                    <WhatsappForm 
                        input-class="form-control"
                        submit-button-class="btn btn-success"
                        cancel-button-class="btn btn-secondary"
                        @submit="$emit('submit', $event)"
                        @cancel="$emit('close')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import WhatsappForm from './WhatsappForm.vue';
import whatsappIcon from '../assets/images/whatsapp.png';

export default {
    name: 'WhatsappBS5',
    components: {
        WhatsappForm
    },
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        phone: {
            type: String,
            required: true
        },
        project: {
            type: String,
            required: true
        },
        endpoint: {
            type: String,
            required: true
        }
    },
    emits: ['close', 'submit'],
    setup() {
        return {
            whatsappIcon
        };
    }
};
</script>
