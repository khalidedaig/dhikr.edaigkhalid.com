<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { KeyRound, LoaderCircle, Mail } from 'lucide-vue-next';

interface Props {
    token: string;
    email: string;
}

const props = defineProps<Props>();

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};
</script>

<template>
    <AuthLayout title="Set new password" description="Enter your new password to complete the reset process">
        <Head title="Reset Password" />

        <!-- Security notice -->
        <div class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
            <div class="flex items-center gap-3">
                <KeyRound :size="20" class="flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <div>
                    <p class="text-sm font-medium text-blue-800 dark:text-blue-200">Password Reset</p>
                    <p class="mt-1 text-xs text-blue-600 dark:text-blue-300">Choose a strong password that you haven't used before</p>
                </div>
            </div>
        </div>

        <form @submit.prevent="submit" class="space-y-6">
            <div class="space-y-4">
                <!-- Email Field (readonly) -->
                <div class="space-y-2">
                    <Label for="email" class="text-sm font-medium text-foreground"> Email address </Label>
                    <div class="relative">
                        <Mail :size="16" class="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autocomplete="email"
                            v-model="form.email"
                            readonly
                            class="cursor-not-allowed bg-muted pl-10 text-muted-foreground"
                        />
                    </div>
                    <InputError :message="form.errors.email" />
                </div>

                <!-- New Password Field -->
                <div class="space-y-2">
                    <Label for="password" class="text-sm font-medium text-foreground"> New password </Label>
                    <PasswordInput
                        id="password"
                        v-model="form.password"
                        name="password"
                        autocomplete="new-password"
                        autofocus
                        required
                        :tabindex="1"
                        placeholder="Enter your new password"
                        :hasError="!!form.errors.password"
                        :showStrengthIndicator="true"
                    />
                    <InputError :message="form.errors.password" />
                </div>

                <!-- Confirm Password Field -->
                <div class="space-y-2">
                    <Label for="password_confirmation" class="text-sm font-medium text-foreground"> Confirm new password </Label>
                    <PasswordInput
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        name="password_confirmation"
                        autocomplete="new-password"
                        required
                        :tabindex="2"
                        placeholder="Confirm your new password"
                        :hasError="!!form.errors.password_confirmation"
                    />
                    <InputError :message="form.errors.password_confirmation" />
                </div>
            </div>

            <!-- Submit Button -->
            <Button type="submit" class="h-11 w-full text-base font-medium" :tabindex="3" :disabled="form.processing">
                <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                <KeyRound v-else :size="16" class="mr-2" />
                <span v-if="form.processing">Updating password...</span>
                <span v-else>Update password</span>
            </Button>
        </form>
    </AuthLayout>
</template>
