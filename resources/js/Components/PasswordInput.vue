<template>
    <div class="relative">
        <input
            :id="id"
            :value="modelValue"
            :name="name"
            :type="showPassword ? 'text' : 'password'"
            :autocomplete="autocomplete"
            :required="required"
            :placeholder="placeholder"
            :class="[
                baseClass ||
                    'mt-1 appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm',
                errorClass,
            ]"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <button
            type="button"
            class="password-toggle absolute inset-y-0 right-0 pr-3 flex items-center outline-none focus:outline-none"
            @click="togglePassword"
            @keydown.enter.prevent="togglePassword"
            @keydown.space.prevent="togglePassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            tabindex="0"
        >
            <EyeOff
                v-if="showPassword"
                :size="20"
                class="text-gray-400 hover:text-emerald-600 transition-colors duration-200 cursor-pointer"
            />
            <Eye
                v-else
                :size="20"
                class="text-gray-400 hover:text-emerald-600 transition-colors duration-200 cursor-pointer"
            />
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
    },
    autocomplete: {
        type: String,
        default: "current-password",
    },
    required: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: "Password",
    },
    errorClass: {
        type: String,
        default: "",
    },
    baseClass: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
</script>
