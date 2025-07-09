<template>
    <Head title="Home" />
    <Layout>
        <div class="text-center">
            <!-- Arabic Blessing -->
            <div
                class="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-6"
            >
                <p
                    class="arabic-text text-2xl font-bold text-green-700 dark:text-green-300 mb-2"
                >
                    بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </p>
                <p class="text-gray-600 dark:text-gray-300">
                    In the name of Allah, the Most Gracious, the Most Merciful
                </p>
            </div>

            <!-- Hero Section -->
            <div
                class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
            >
                <div class="text-6xl mb-4">📿</div>
                <h1
                    class="text-4xl font-bold text-gray-900 dark:text-white mb-4"
                >
                    Dhikr
                </h1>
                <p
                    class="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto"
                >
                    A modern digital counter for your daily dhikr and
                    remembrance of Allah (SWT). Keep track of your tasbih with
                    ease and stay connected to your spiritual practice.
                </p>

                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/tasbih"
                        class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        Start Counting
                    </Link>

                    <Link
                        href="/dhikr"
                        class="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
                    >
                        Browse Dhikr
                    </Link>
                </div>
            </div>

            <!-- Features Section -->
            <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div class="text-3xl mb-4">🔢</div>
                    <h3
                        class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                        Easy Counting
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                        Simple tap-to-count interface with progress tracking and
                        goal setting.
                    </p>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div class="text-3xl mb-4">💾</div>
                    <h3
                        class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                        Auto Save
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                        Your progress is automatically saved in your browser.
                        Never lose your count.
                    </p>
                </div>

                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <div class="text-3xl mb-4">🌙</div>
                    <h3
                        class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
                    >
                        Dark Mode
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300">
                        Comfortable viewing in any lighting condition with
                        automatic dark mode.
                    </p>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { Head, Link } from "@inertiajs/vue3";
import Layout from "../Components/Layout.vue";
</script>
