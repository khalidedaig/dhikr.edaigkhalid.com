<script setup lang="ts">
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { CheckCircle, LoaderCircle, LogOut, Mail, Send } from 'lucide-vue-next';

defineProps<{
    status?: string;
}>();

const form = useForm({});

const submit = () => {
    form.post(route('verification.send'));
};
</script>

<template>
    <AuthLayout
        title="Check your email"
        description="We've sent a verification link to your email address. Please click the link to verify your account and start your spiritual journey."
    >
        <Head title="Email Verification" />

        <!-- Email icon and main content -->
        <div class="mb-6 text-center">
            <div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Mail :size="32" class="text-primary" />
            </div>
        </div>

        <!-- Success message when link is resent -->
        <div
            v-if="status === 'verification-link-sent'"
            class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950"
        >
            <div class="flex items-center justify-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                <CheckCircle :size="16" />
                A new verification link has been sent to your email address
            </div>
        </div>

        <!-- Help text -->
        <div class="mb-6 rounded-lg bg-muted/50 p-4 text-center">
            <p class="text-sm text-muted-foreground">Can't find the email? Check your spam folder or try resending the verification link.</p>
        </div>

        <div class="space-y-4">
            <!-- Resend verification email -->
            <form @submit.prevent="submit">
                <Button type="submit" class="h-11 w-full text-base font-medium" variant="outline" :disabled="form.processing">
                    <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                    <Send v-else :size="16" class="mr-2" />
                    <span v-if="form.processing">Sending verification email...</span>
                    <span v-else>Resend verification email</span>
                </Button>
            </form>

            <!-- Sign out link -->
            <div class="text-center">
                <TextLink
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <LogOut :size="16" />
                    Sign out
                </TextLink>
            </div>
        </div>
    </AuthLayout>
</template>
