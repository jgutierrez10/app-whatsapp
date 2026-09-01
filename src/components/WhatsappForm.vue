<template>
    <form @submit.prevent="handleSubmit" class="whatsapp-form">
        <p class="form-intro">Completa tus datos para continuar:</p>
        <div class="form-group">
            <label for="whatsapp-name">Nombre</label>
            <input
                id="whatsapp-name"
                v-model="formData.name"
                type="text"
                :class="inputClass"
                placeholder="Ingresa tu nombre completo"
                required
            />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>
        <div class="form-group">
            <label for="whatsapp-email">Correo Electrónico</label>
            <input
                id="whatsapp-email"
                v-model="formData.email"
                type="email"
                :class="inputClass"
                placeholder="ejemplo@correo.com"
                required
            />
            <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>
        <div class="form-group">
            <label for="whatsapp-phone">Teléfono</label>
            <div class="phone-input-group">
                <div class="country-code">+56</div>
                <input
                    id="whatsapp-phone"
                    v-model="formData.phone"
                    type="tel"
                    :class="['phone-number', inputClass]"
                    placeholder="912345678"
                    required
                />
            </div>
            <div v-if="errors.phone" class="error-message">{{ errors.phone }}</div>
        </div>
        <div class="form-group mb-1">
            <label for="whatsapp-message">Mensaje</label>
            <textarea
                id="whatsapp-message"
                v-model="formData.message"
                :class="inputClass"
                placeholder="Escribe tu mensaje aquí..."
                rows="4"
                maxlength="300"
                required
            ></textarea>
            <div class="character-counter" :class="counterClass">
                {{ (formData.message || '').length }}/300
            </div>
            <div v-if="errors.message" class="error-message">{{ errors.message }}</div>
        </div>
        <div class="privacy-policy-group">
            <label class="privacy-policy-label">
                <input
                    v-model="formData.privacyPolicyAccepted"
                    type="checkbox"
                    class="privacy-policy-checkbox"
                    required
                />
                <span>
                    He leído y acepto la
                    <a :href="privacyPolicyUrl" target="_blank" rel="noopener noreferrer" @click.stop>Política de Privacidad</a>.
                </span>
            </label>
            <p class="privacy-policy-disclaimer mt-1">
                Autorizo expresamente a <a :href="policySite" target="_blank" rel="noopener noreferrer" @click.stop>{{ policySiteLabel }}</a> a recolectar y tratar mis datos personales (nombre, apellido, correo electrónico y teléfono) con la finalidad de contactarme, responder a mis consultas y gestionar los servicios solicitados. Puedo ejercer mis derechos de acceso, rectificación, cancelación, oposición o portabilidad enviando un correo a <a :href="`mailto:${policyEmail}`" @click.stop>{{ policyEmail }}</a>.
            </p>
            <div v-if="errors.privacyPolicyAccepted" class="error-message">{{ errors.privacyPolicyAccepted }}</div>
        </div>
        <div class="form-actions">
            <button 
                type="submit" 
                :class="submitButtonClass"
                :disabled="isSubmitting || !isFormValid"
            >
                <i class="fab fa-whatsapp"></i>
                {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
        </div>
    </form>
</template>

<script>
import { computed } from 'vue';
import { useWhatsappForm } from '../composables/useWhatsappForm.js';

export default {
    name: 'WhatsappForm',
    props: {
        inputClass: {
            type: String,
            default: 'form-control'
        },
        submitButtonClass: {
            type: String,
            default: 'btn btn-primary'
        },
        cancelButtonClass: {
            type: String,
            default: 'btn btn-secondary'
        },
        privacyPolicyUrl: {
            type: String,
            required: true
        },
        policySite: {
            type: String,
            required: true
        },
        policyEmail: {
            type: String,
            required: true
        }
    },
    emits: ['submit', 'cancel'],
    setup(props, { emit }) {
        const { formData, errors, isSubmitting, validateForm, isFormValid } = useWhatsappForm();

        const handleSubmit = () => {            
            if (validateForm()) {
                emit('submit', { ...formData });
            }
        };

        const counterClass = computed(() => {
            const length = (formData.message || '').length;
            if (length >= 300) return 'at-limit';
            if (length >= 250) return 'near-limit';
            return '';
        });

        const policySiteLabel = computed(() => {
            try {
                return new URL(props.policySite).hostname.replace(/^www\./, '');
            } catch {
                return props.policySite;
            }
        });

        return {
            formData,
            errors,
            isSubmitting,
            isFormValid,
            handleSubmit,
            counterClass,
            privacyPolicyUrl: props.privacyPolicyUrl,
            policySite: props.policySite,
            policySiteLabel,
            policyEmail: props.policyEmail
        };
    }
};
</script>
