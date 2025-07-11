<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { ArrowLeft, LoaderCircle, Mail, Send } from 'lucide-vue-next';

defineProps<{
    status?: string;
}>();

const form = useForm({
    email: '',
});

const submit = () => {
    form.post(route('password.email'));
};
</script>

<template>
    <AuthLayout title="Reset your password" description="Enter your email address and we'll send you a link to reset your password">
        <Head title="Forgot Password" />

        <div
            v-if="status"
            class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
        >
            <div class="flex items-center justify-center gap-2">
                <Send :size="16" />
                {{ status }}
            </div>
        </div>

        <div class="space-y-6">
            <form @submit.prevent="submit" class="space-y-4">
                <!-- Email Field -->
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
                            autofocus
                            required
                            placeholder="Enter your email address"
                            class="pl-10"
                            :class="form.errors.email ? 'border-destructive focus-visible:ring-destructive' : ''"
                        />
                    </div>
                    <InputError :message="form.errors.email" />
                </div>

                <!-- Submit Button -->
                <Button class="h-11 w-full text-base font-medium" :disabled="form.processing">
                    <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                    <Send v-else :size="16" class="mr-2" />
                    <span v-if="form.processing">Sending reset link...</span>
                    <span v-else>Send reset link</span>
                </Button>
            </form>

            <!-- Help text -->
            <div class="rounded-lg bg-muted/50 p-4 text-center">
                <p class="text-xs text-muted-foreground">
                    We'll send you an email with instructions to reset your password. Check your spam folder if you don't see it in your inbox.
                </p>
            </div>

            <!-- Back to login -->
            <div class="text-center">
                <TextLink
                    :href="route('login')"
                    class="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                    <ArrowLeft :size="16" />
                    Back to sign in
                </TextLink>
            </div>
        </div>
    </AuthLayout>
</template>
