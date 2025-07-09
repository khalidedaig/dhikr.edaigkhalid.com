<template>
    <Head title="Tasbih Counter" />
    <Layout>
        <div class="max-w-6xl mx-auto">
            <h1
                class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
            >
                Tasbih Counter
            </h1>

            <!-- Grid Layout for Three Sections -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Quick Dhikr Suggestions -->
                <div class="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                    <h3
                        class="font-semibold text-green-800 dark:text-green-200 mb-3"
                    >
                        Common Dhikr:
                    </h3>
                    <div class="space-y-2 text-sm">
                        <div class="text-center">
                            <p
                                class="arabic-text text-lg text-green-700 dark:text-green-300"
                            >
                                سُبْحَانَ ٱللَّٰهِ
                            </p>
                            <p class="text-green-600 dark:text-green-400">
                                Subhan Allah (33 times)
                            </p>
                        </div>
                        <div class="text-center">
                            <p
                                class="arabic-text text-lg text-green-700 dark:text-green-300"
                            >
                                ٱلْـحَمْدُ لِلَّٰهِ
                            </p>
                            <p class="text-green-600 dark:text-green-400">
                                Alhamdulillah (33 times)
                            </p>
                        </div>
                        <div class="text-center">
                            <p
                                class="arabic-text text-lg text-green-700 dark:text-green-300"
                            >
                                ٱللَّٰهُ أَكْبَرُ
                            </p>
                            <p class="text-green-600 dark:text-green-400">
                                Allahu Akbar (34 times)
                            </p>
                        </div>
                    </div>

                    <div class="mt-4 text-center">
                        <Link
                            href="/dhikr"
                            class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 font-medium"
                        >
                            Browse more dhikr →
                        </Link>
                    </div>
                </div>

                <!-- Counter Section -->
                <div class="md:col-span-1">
                    <Counter
                        storage-key="main-tasbih-counter"
                        :default-goal="33"
                    />
                </div>

                <!-- Instructions Section -->
                <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h3
                        class="font-semibold text-blue-800 dark:text-blue-200 mb-2"
                    >
                        How to use:
                    </h3>
                    <ul
                        class="text-sm text-blue-700 dark:text-blue-300 space-y-1"
                    >
                        <li>• Tap the "+" button to increment your count</li>
                        <li>• Set your goal using the number input</li>
                        <li>• Your progress is automatically saved</li>
                        <li>• Use the reset button to start over</li>
                    </ul>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { Head, Link } from "@inertiajs/vue3";
import Layout from "@/Components/Layout.vue";
import Counter from "@/Components/Counter.vue";
import { ref, onMounted, watch } from "vue";
</script>
