<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBase from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle, Mail, User } from 'lucide-vue-next';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <AuthBase title="Join Dhikr" description="Create your account to begin your spiritual journey and track your dhikr practice">
        <Head title="Create Account" />

        <form @submit.prevent="submit" class="space-y-6">
            <div class="space-y-4">
                <!-- Name Field -->
                <div class="space-y-2">
                    <Label for="name" class="text-sm font-medium text-foreground"> Full name </Label>
                    <div class="relative">
                        <User :size="16" class="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="name"
                            type="text"
                            required
                            autofocus
                            :tabindex="1"
                            autocomplete="name"
                            v-model="form.name"
                            placeholder="Enter your full name"
                            class="pl-10"
                            :class="form.errors.name ? 'border-destructive focus-visible:ring-destructive' : ''"
                        />
                    </div>
                    <InputError :message="form.errors.name" />
                </div>

                <!-- Email Field -->
                <div class="space-y-2">
                    <Label for="email" class="text-sm font-medium text-foreground"> Email address </Label>
                    <div class="relative">
                        <Mail :size="16" class="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            required
                            :tabindex="2"
                            autocomplete="email"
                            v-model="form.email"
                            placeholder="Enter your email"
                            class="pl-10"
                            :class="form.errors.email ? 'border-destructive focus-visible:ring-destructive' : ''"
                        />
                    </div>
                    <InputError :message="form.errors.email" />
                </div>

                <!-- Password Field -->
                <div class="space-y-2">
                    <Label for="password" class="text-sm font-medium text-foreground"> Password </Label>
                    <PasswordInput
                        id="password"
                        v-model="form.password"
                        name="password"
                        autocomplete="new-password"
                        required
                        :tabindex="3"
                        placeholder="Create a strong password"
                        :hasError="!!form.errors.password"
                        :showStrengthIndicator="true"
                    />
                    <InputError :message="form.errors.password" />
                </div>

                <!-- Confirm Password Field -->
                <div class="space-y-2">
                    <Label for="password_confirmation" class="text-sm font-medium text-foreground"> Confirm password </Label>
                    <PasswordInput
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        name="password_confirmation"
                        autocomplete="new-password"
                        required
                        :tabindex="4"
                        placeholder="Confirm your password"
                        :hasError="!!form.errors.password_confirmation"
                    />
                    <InputError :message="form.errors.password_confirmation" />
                </div>
            </div>

            <!-- Terms Notice -->
            <div class="rounded-lg bg-muted/50 p-4 text-center">
                <p class="text-xs text-muted-foreground">
                    By creating an account, you agree to our terms of service and privacy policy. Your spiritual journey data will be stored securely
                    and privately.
                </p>
            </div>

            <!-- Submit Button -->
            <Button type="submit" class="h-11 w-full text-base font-medium" :tabindex="5" :disabled="form.processing">
                <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                <span v-if="form.processing">Creating account...</span>
                <span v-else>Create account</span>
            </Button>

            <!-- Sign in link -->
            <div class="text-center">
                <p class="text-sm text-muted-foreground">
                    Already have an account?
                    <TextLink :href="route('login')" class="ml-1 font-medium text-primary transition-colors hover:text-primary/80" :tabindex="6">
                        Sign in
                    </TextLink>
                </p>
            </div>
        </form>
    </AuthBase>
</template>
