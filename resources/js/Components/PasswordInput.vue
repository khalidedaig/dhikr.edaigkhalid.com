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
                    'relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none sm:text-sm',
                errorClass,
            ]"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <button
            type="button"
            class="password-toggle absolute inset-y-0 right-0 flex items-center pr-3 outline-none focus:outline-none"
            @click="togglePassword"
            @keydown.enter.prevent="togglePassword"
            @keydown.space.prevent="togglePassword"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            tabindex="0"
        >
            <EyeOff v-if="showPassword" :size="20" class="cursor-pointer text-gray-400 transition-colors duration-200 hover:text-emerald-600" />
            <Eye v-else :size="20" class="cursor-pointer text-gray-400 transition-colors duration-200 hover:text-emerald-600" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff } from 'lucide-vue-next';
import { ref } from 'vue';

interface Props {
    id: string;
    modelValue: string;
    name?: string;
    autocomplete?: string;
    required?: boolean;
    placeholder?: string;
    baseClass?: string;
    errorClass?: string;
}

interface Emits {
    (e: 'update:modelValue', value: string): void;
}

defineProps<Props>();
defineEmits<Emits>();

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
</script>
