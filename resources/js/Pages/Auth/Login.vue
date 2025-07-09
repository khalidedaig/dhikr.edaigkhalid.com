<template>
    <GuestLayout>
        <Head title="Sign In" />

        <div
            class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        >
            <div class="max-w-md w-full space-y-8">
                <div>
                    <h2
                        class="mt-6 text-center text-3xl font-extrabold text-gray-900"
                    >
                        Sign in to your account
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Or
                        <Link
                            :href="route('register')"
                            class="font-medium text-emerald-600 hover:text-emerald-500"
                        >
                            create a new account
                        </Link>
                    </p>
                </div>

                <form class="mt-8 space-y-6" @submit.prevent="submit">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email" class="sr-only"
                                >Email address</label
                            >
                            <input
                                id="email"
                                v-model="form.email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                                :class="{ 'border-red-500': form.errors.email }"
                                placeholder="Email address"
                            />
                            <div
                                v-if="form.errors.email"
                                class="text-red-500 text-xs mt-1"
                            >
                                {{ form.errors.email }}
                            </div>
                        </div>
                        <div>
                            <label for="password" class="sr-only"
                                >Password</label
                            >
                            <PasswordInput
                                id="password"
                                v-model="form.password"
                                name="password"
                                autocomplete="current-password"
                                required
                                placeholder="Password"
                                :error-class="
                                    form.errors.password ? 'border-red-500' : ''
                                "
                                base-class="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                            />
                            <div
                                v-if="form.errors.password"
                                class="text-red-500 text-xs mt-1"
                            >
                                {{ form.errors.password }}
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="remember"
                                v-model="form.remember"
                                name="remember"
                                type="checkbox"
                                class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <label
                                for="remember"
                                class="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <Link
                                :href="route('password.request')"
                                class="font-medium text-emerald-600 hover:text-emerald-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            {{ form.processing ? "Signing in..." : "Sign in" }}
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

const form = useForm({
    email: "",
    password: "",
    remember: false,
});

const submit = () => {
    form.post(route("login"), {
        onFinish: () => form.reset("password"),
    });
};
</script>
