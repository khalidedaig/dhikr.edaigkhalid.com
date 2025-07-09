<template>
    <GuestLayout>
        <Head title="Forgot Password" />

        <div
            class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        >
            <div class="max-w-md w-full space-y-8">
                <div>
                    <h2
                        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                    >
                        Forgot your password?
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        No problem. Just let us know your email address and we
                        will email you a password reset link that will allow you
                        to choose a new one.
                    </p>
                </div>

                <div
                    v-if="status"
                    class="mb-4 font-medium text-sm text-green-600"
                >
                    {{ status }}
                </div>

                <form class="mt-8 space-y-6" @submit.prevent="submit">
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Email Address</label
                        >
                        <input
                            id="email"
                            v-model="form.email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required
                            class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                            :class="{ 'border-red-500': form.errors.email }"
                            placeholder="Enter your email address"
                        />
                        <div
                            v-if="form.errors.email"
                            class="text-red-500 text-xs mt-1"
                        >
                            {{ form.errors.email }}
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <Link
                            :href="route('login')"
                            class="text-sm text-emerald-600 hover:text-emerald-500"
                        >
                            Back to login
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
                                    ? "Sending..."
                                    : "Email Password Reset Link"
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

defineProps({
    status: String,
});

const form = useForm({
    email: "",
});

const submit = () => {
    form.post(route("password.email"));
};
</script>
