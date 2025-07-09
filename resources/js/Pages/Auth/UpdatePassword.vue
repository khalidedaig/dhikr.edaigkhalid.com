<template>
    <GuestLayout>
        <Head title="Update Password" />

        <div
            class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        >
            <div class="max-w-md w-full space-y-8">
                <div>
                    <h2
                        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                    >
                        Update your password
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Ensure your account is using a long, random password to
                        stay secure.
                    </p>
                </div>

                <div
                    v-if="status === 'password-updated'"
                    class="mb-4 font-medium text-sm text-green-600 text-center"
                >
                    Your password has been updated successfully.
                </div>

                <form class="mt-8 space-y-6" @submit.prevent="submit">
                    <div class="space-y-4">
                        <div>
                            <label
                                for="current_password"
                                class="block text-sm font-medium text-gray-700"
                                >Current Password</label
                            >
                            <PasswordInput
                                id="current_password"
                                v-model="form.current_password"
                                name="current_password"
                                autocomplete="current-password"
                                required
                                placeholder="Enter your current password"
                                :error-class="
                                    form.errors.current_password
                                        ? 'border-red-500'
                                        : ''
                                "
                            />
                            <div
                                v-if="form.errors.current_password"
                                class="text-red-500 text-xs mt-1"
                            >
                                {{ form.errors.current_password }}
                            </div>
                        </div>

                        <div>
                            <label
                                for="password"
                                class="block text-sm font-medium text-gray-700"
                                >New Password</label
                            >
                            <PasswordInput
                                id="password"
                                v-model="form.password"
                                name="password"
                                autocomplete="new-password"
                                required
                                placeholder="Enter your new password"
                                :error-class="
                                    form.errors.password ? 'border-red-500' : ''
                                "
                            />
                            <div
                                v-if="form.errors.password"
                                class="text-red-500 text-xs mt-1"
                            >
                                {{ form.errors.password }}
                            </div>
                        </div>

                        <div>
                            <label
                                for="password_confirmation"
                                class="block text-sm font-medium text-gray-700"
                                >Confirm New Password</label
                            >
                            <PasswordInput
                                id="password_confirmation"
                                v-model="form.password_confirmation"
                                name="password_confirmation"
                                autocomplete="new-password"
                                required
                                placeholder="Confirm your new password"
                                :error-class="
                                    form.errors.password_confirmation
                                        ? 'border-red-500'
                                        : ''
                                "
                            />
                            <div
                                v-if="form.errors.password_confirmation"
                                class="text-red-500 text-xs mt-1"
                            >
                                {{ form.errors.password_confirmation }}
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <Link
                            :href="route('home')"
                            class="text-sm text-emerald-600 hover:text-emerald-500"
                        >
                            Back to Home
                        </Link>

                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span
                                v-if="form.processing"
                                class="absolute left-0 inset-y-0 flex items-center pl-3"
                            >
                                <svg
                                    class="animate-spin h-5 w-5 text-emerald-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </span>
                            {{
                                form.processing
                                    ? "Updating..."
                                    : "Update Password"
                            }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>

<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import PasswordInput from "@/Components/PasswordInput.vue";

defineProps({
    status: String,
});

const form = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
});

const submit = () => {
    form.put(route("password.update"), {
        onFinish: () => form.reset(),
    });
};
</script>
