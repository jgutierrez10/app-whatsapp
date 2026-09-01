<template>
    <div v-if="isVisible" class="whatsapp-modal-plain">
        <div class="modal-overlay" @click="$emit('close')"></div>
        <div class="modal-container">
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="whatsapp-icon-circle">
                        <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon">
                    </span>
                    WhatsApp
                </h2>
                <button type="button" class="close-button" @click="$emit('close')">
                    ×
                </button>
            </div>
            <div class="modal-body">
                <WhatsappForm 
                    input-class="form-input"
                    submit-button-class="btn-submit"
                    cancel-button-class="btn-cancel"
                    :privacy-policy-url="privacyPolicyUrl"
                    :policy-site="policySite"
                    :policy-email="policyEmail"
                    @submit="$emit('submit', $event)"
                    @cancel="$emit('close')"
                />
            </div>
        </div>
    </div>
</template>

<script>
import WhatsappForm from './WhatsappForm.vue'
import bundledWhatsappIcon from '../assets/images/whatsapp.png'

export default {
    name: 'WhatsappPlain',
    components: {
        WhatsappForm
    },
    props: {
        isVisible: { type: Boolean, default: false },
        phone: { type: String, required: true },
        privacyPolicyUrl: { type: String, required: true },
        policySite: { type: String, required: true },
        policyEmail: { type: String, required: true },
        whatsappIcon: { type: String, default: '' }
    },
    emits: ['close', 'submit'],
    setup(props) {
        return {
            whatsappIcon: props.whatsappIcon || bundledWhatsappIcon
        }
    }
};
</script>
