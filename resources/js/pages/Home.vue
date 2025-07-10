<template>
    <Head title="Home" />
    <Layout>
        <div class="text-center">
            <!-- Arabic Blessing -->
            <div class="mb-8 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-6 dark:from-green-900 dark:to-blue-900">
                <p class="arabic-text mb-2 text-2xl font-bold text-green-700 dark:text-green-300">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
                <p class="text-gray-600 dark:text-gray-300">In the name of Allah, the Most Gracious, the Most Merciful</p>
            </div>

            <!-- Hero Section -->
            <div class="mb-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                <div class="mb-4 text-6xl">📿</div>
                <h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Dhikr</h1>
                <p class="mx-auto mb-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                    A modern digital counter for your daily dhikr and remembrance of Allah (SWT). Keep track of your tasbih with ease and stay
                    connected to your spiritual practice.
                </p>

                <div class="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        href="/tasbih"
                        class="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Start Counting
                    </Link>

                    <Link
                        href="/dhikr-list"
                        class="rounded-lg bg-green-500 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Browse Dhikr
                    </Link>

                    <Link
                        href="/analytics"
                        class="rounded-lg bg-purple-500 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 focus:outline-none dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                    >
                        📊 Analytics
                    </Link>
                </div>
            </div>

            <!-- Features Section -->
            <div class="grid gap-6 md:grid-cols-3">
                <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="mb-4 text-3xl">🔢</div>
                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Easy Counting</h3>
                    <p class="text-gray-600 dark:text-gray-300">Simple tap-to-count interface with progress tracking and goal setting.</p>
                </div>

                <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="mb-4 text-3xl">🤖</div>
                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Smart Learning</h3>
                    <p class="text-gray-600 dark:text-gray-300">Learns from your habits to provide personalized insights and goal recommendations.</p>
                </div>

                <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="mb-4 text-3xl">💾</div>
                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Auto Save</h3>
                    <p class="text-gray-600 dark:text-gray-300">Your progress is automatically saved in your browser. Never lose your count.</p>
                </div>

                <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="mb-4 text-3xl">📊</div>
                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Analytics</h3>
                    <p class="text-gray-600 dark:text-gray-300">Track your spiritual practice with detailed analytics and progress insights.</p>
                </div>

                <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="mb-4 text-3xl">🌙</div>
                    <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Dark Mode</h3>
                    <p class="text-gray-600 dark:text-gray-300">Comfortable viewing in any lighting condition with automatic dark mode.</p>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3';
import Layout from '../Components/Layout.vue';
</script>
