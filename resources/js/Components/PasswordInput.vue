<template>
    <div class="relative">
        <div class="password-input-container">
            <!-- Lock icon positioned inside input on the left -->
            <Lock :size="16" class="password-lock-icon text-muted-foreground" />

            <input
                :id="id"
                :value="modelValue"
                :name="name"
                :type="showPassword ? 'text' : 'password'"
                :autocomplete="autocomplete"
                :required="required"
                :placeholder="placeholder"
                :tabindex="tabindex"
                :class="[
                    'password-input-field flex w-full rounded-md border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    hasError && 'border-destructive focus-visible:ring-destructive',
                    'transition-colors duration-200 dark:text-white/80',
                ]"
                @input="handleInput"
                @focus="$emit('focus')"
                @blur="$emit('blur')"
            />

            <!-- Eye icon positioned inside input on the right -->
            <button
                type="button"
                class="password-toggle-button text-muted-foreground transition-colors duration-200 hover:text-foreground focus:outline-none focus-visible:text-foreground"
                @click="togglePassword"
                @keydown.enter.prevent="togglePassword"
                @keydown.space.prevent="togglePassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :tabindex="tabindex ? tabindex + 0.1 : undefined"
            >
                <EyeOff v-if="showPassword" :size="16" class="cursor-pointer" aria-hidden="true" />
                <Eye v-else :size="16" class="cursor-pointer" aria-hidden="true" />
            </button>
        </div>

        <!-- Password strength indicator for new passwords -->
        <div v-if="showStrengthIndicator && modelValue.length > 0" class="mt-2 space-y-1">
            <div class="flex space-x-1">
                <div v-for="level in 4" :key="level" class="h-1 flex-1 rounded-full" :class="getStrengthBarClass(level)" />
            </div>
            <p class="text-xs" :class="getStrengthTextClass()">
                {{ getStrengthText() }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff, Lock } from 'lucide-vue-next';
import { computed, ref } from 'vue';

interface Props {
    id: string;
    modelValue: string;
    name?: string;
    autocomplete?: string;
    required?: boolean;
    placeholder?: string;
    tabindex?: number;
    hasError?: boolean;
    showStrengthIndicator?: boolean;
}

interface Emits {
    (e: 'update:modelValue', value: string): void;
    (e: 'focus'): void;
    (e: 'blur'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const showPassword = ref(false);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

// Password strength calculation
const passwordStrength = computed(() => {
    const password = props.modelValue;
    if (!password) return 0;

    let score = 0;

    // Length check
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Character variety checks
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Return strength level (0-4)
    return Math.min(Math.floor(score / 1.5), 4);
});

const getStrengthBarClass = (level: number) => {
    const strength = passwordStrength.value;
    if (level <= strength) {
        switch (strength) {
            case 1:
                return 'strength-weak';
            case 2:
                return 'strength-fair';
            case 3:
                return 'strength-good';
            case 4:
                return 'strength-strong';
            default:
                return 'bg-muted';
        }
    }
    return 'bg-muted';
};

const getStrengthTextClass = () => {
    const strength = passwordStrength.value;
    switch (strength) {
        case 1:
            return 'text-destructive';
        case 2:
            return 'text-chart-5';
        case 3:
            return 'text-chart-4';
        case 4:
            return 'text-chart-2';
        default:
            return 'text-muted-foreground';
    }
};

const getStrengthText = () => {
    const strength = passwordStrength.value;
    switch (strength) {
        case 1:
            return 'Weak password';
        case 2:
            return 'Fair password';
        case 3:
            return 'Good password';
        case 4:
            return 'Strong password';
        default:
            return 'Enter a password';
    }
};
</script>
