<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle, Shield } from 'lucide-vue-next';

const form = useForm({
    password: '',
});

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => {
            form.reset();
        },
    });
};
</script>

<template>
    <AuthLayout
        title="Security verification"
        description="This is a protected area. Please confirm your password to continue accessing your account."
    >
        <Head title="Confirm Password" />

        <!-- Security icon and notice -->
        <div class="mb-6 text-center">
            <div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950">
                <Shield :size="32" class="text-orange-600 dark:text-orange-400" />
            </div>
        </div>

        <!-- Security notice -->
        <div class="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
            <div class="flex items-start gap-3">
                <Shield :size="16" class="mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
                <div>
                    <p class="text-sm font-medium text-amber-800 dark:text-amber-200">Password confirmation required</p>
                    <p class="mt-1 text-xs text-amber-600 dark:text-amber-300">
                        For your security, please enter your password to access this protected area
                    </p>
                </div>
            </div>
        </div>

        <form @submit.prevent="submit" class="space-y-6">
            <!-- Password Field -->
            <div class="space-y-2">
                <PasswordInput
                    id="password"
                    v-model="form.password"
                    name="password"
                    autocomplete="current-password"
                    required
                    autofocus
                    placeholder="Enter your password"
                    :hasError="!!form.errors.password"
                />
                <InputError :message="form.errors.password" />
            </div>

            <!-- Submit Button -->
            <Button type="submit" class="h-11 w-full text-base font-medium" :disabled="form.processing">
                <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                <Shield v-else :size="16" class="mr-2" />
                <span v-if="form.processing">Verifying...</span>
                <span v-else>Confirm password</span>
            </Button>
        </form>
    </AuthLayout>
</template>
