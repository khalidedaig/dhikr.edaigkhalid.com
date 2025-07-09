<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div class="relative">
            <!-- Logo -->
            <div class="text-center mb-8">
                <Link href="/" class="inline-flex items-center">
                    <div class="flex items-center space-x-3">
                        <div
                            class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center"
                        >
                            <svg
                                class="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-xl font-bold text-gray-900">
                                Digital Dhikr
                            </h1>
                            <p class="text-sm text-gray-600">
                                Islamic Remembrance
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            <!-- Content -->
            <slot />
        </div>
    </div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
</script>
