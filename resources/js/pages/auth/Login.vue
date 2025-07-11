<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/Components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthBase from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle, Mail } from 'lucide-vue-next';

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <AuthBase title="Welcome back" description="Sign in to your Dhikr account to continue your spiritual journey">
        <Head title="Sign In" />

        <div
            v-if="status"
            class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
        >
            {{ status }}
        </div>

        <form @submit.prevent="submit" class="space-y-6">
            <div class="space-y-4">
                <!-- Email Field -->
                <div class="space-y-2">
                    <Label for="email" class="text-sm font-medium text-foreground"> Email address </Label>
                    <div class="relative">
                        <Mail :size="16" class="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="email"
                            required
                            autofocus
                            :tabindex="1"
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
                    <div class="flex items-center justify-between">
                        <Label for="password" class="text-sm font-medium text-foreground"> Password </Label>
                        <TextLink
                            v-if="canResetPassword"
                            :href="route('password.request')"
                            class="text-sm text-primary transition-colors hover:text-primary/80"
                            :tabindex="5"
                        >
                            Forgot password?
                        </TextLink>
                    </div>
                    <div class="space-y-2">
                        <PasswordInput
                            id="password"
                            v-model="form.password"
                            name="password"
                            autocomplete="current-password"
                            required
                            :tabindex="2"
                            placeholder="Enter your password"
                            :hasError="!!form.errors.password"
                        />
                    </div>
                    <InputError :message="form.errors.password" />
                </div>

                <!-- Remember Me -->
                <div class="flex items-center space-x-3">
                    <Checkbox
                        id="remember"
                        v-model:checked="form.remember"
                        :tabindex="3"
                        class="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                    />
                    <Label for="remember" class="cursor-pointer text-sm text-muted-foreground select-none"> Keep me signed in </Label>
                </div>
            </div>

            <!-- Submit Button -->
            <Button type="submit" class="h-11 w-full text-base font-medium" :tabindex="4" :disabled="form.processing">
                <LoaderCircle v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
                <span v-if="form.processing">Signing in...</span>
                <span v-else>Sign in</span>
            </Button>

            <!-- Sign up link -->
            <div class="text-center">
                <p class="text-sm text-muted-foreground">
                    Don't have an account?
                    <TextLink :href="route('register')" class="ml-1 font-medium text-primary transition-colors hover:text-primary/80" :tabindex="6">
                        Create account
                    </TextLink>
                </p>
            </div>
        </form>
    </AuthBase>
</template>
