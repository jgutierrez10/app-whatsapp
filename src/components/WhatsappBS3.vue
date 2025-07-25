<template>
    <div v-if="isVisible" class="modal fade in whatsapp-modal-bs3" style="display: block;">
        <div class="modal-backdrop fade in"></div>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click="$emit('close')">
                        <span>&times;</span>
                    </button>
                    <h4 class="modal-title">
                        <span class="whatsapp-icon-circle">
                            <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon">
                        </span>
                        WhatsApp
                    </h4>
                </div>
                <div class="modal-body">
                    <WhatsappForm 
                        input-class="form-control"
                        submit-button-class="btn btn-success"
                        cancel-button-class="btn btn-default"
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
    name: 'WhatsappBS3',
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
