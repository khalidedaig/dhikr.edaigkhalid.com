<template>
    <GuestLayout>
        <Head title="Email Verification" />

        <div
            class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        >
            <div class="max-w-md w-full space-y-8">
                <div>
                    <div
                        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100"
                    >
                        <svg
                            class="h-6 w-6 text-emerald-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h2
                        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                    >
                        Verify your email address
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                    </p>
                </div>

                <div
                    v-if="status === 'verification-link-sent'"
                    class="mb-4 font-medium text-sm text-green-600 text-center"
                >
                    A new verification link has been sent to your email address.
                </div>

                <div class="flex items-center justify-between">
                    <form @submit.prevent="submit">
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
                                    : "Resend Verification Email"
                            }}
                        </button>
                    </form>

                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        Log Out
                    </Link>
                </div>
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

const form = useForm({});

const submit = () => {
    form.post(route("verification.send"));
};
</script>
