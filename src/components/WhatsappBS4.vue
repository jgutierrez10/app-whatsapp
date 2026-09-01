<template>
    <div v-if="isVisible" class="modal fade show whatsapp-modal-bs4" style="display: block;">
        <div class="modal-backdrop fade show" @click="$emit('close')"></div>
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" @click.stop>
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span class="whatsapp-icon-circle">
                            <img :src="whatsappIcon" alt="WhatsApp" class="whatsapp-icon">
                        </span>
                        WhatsApp
                    </h5>
                    <button type="button" class="close" @click="$emit('close')">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <WhatsappForm 
                        input-class="form-control"
                        submit-button-class="btn btn-success"
                        cancel-button-class="btn btn-secondary"
                        :privacy-policy-url="privacyPolicyUrl"
                        :policy-site="policySite"
                        :policy-email="policyEmail"
                        @submit="$emit('submit', $event)"
                        @cancel="$emit('close')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from "vue"
import WhatsappForm from './WhatsappForm.vue'
import bundledWhatsappIcon from '../assets/images/whatsapp.png'

export default {
    name: 'WhatsappBS4',
    components: {
        WhatsappForm
    },
    props: {
        isVisible: { type: Boolean, default: false },
        phone: { type: String, required: true },
        project: { type: String, required: true },
        endpoint: { type: String, required: true },
        privacyPolicyUrl: { type: String, required: true },
        policySite: { type: String, required: true },
        policyEmail: { type: String, required: true },
        whatsappIcon: { type: String, default: '' }
    },
    emits: ['close', 'submit'],
    setup(props, { emit }) {
        const onKeydown = (e) => {
            if (e.key === "Escape") {
                emit("close")
            }
        }

        onMounted(() => window.addEventListener("keydown", onKeydown))
        onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown))
        
        return {
            whatsappIcon: props.whatsappIcon || bundledWhatsappIcon
        }
    }
};
</script>
