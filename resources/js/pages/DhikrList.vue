<template>
    <Head title="Dhikr List" />
    <Layout>
        <div class="mx-auto max-w-4xl">
            <h1 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Collection of Dhikr</h1>

            <p class="mb-8 text-center text-gray-600 dark:text-gray-300">
                Choose from our collection of beautiful dhikr with their meanings and recommended counts.
            </p>

            <!-- Dhikr Cards -->
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                <div v-for="dhikr in dhikrList" :key="dhikr.id" class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="mb-4 text-center">
                        <h2 class="arabic-text mb-2 text-3xl font-bold text-green-600 dark:text-green-400">
                            {{ dhikr.arabic }}
                        </h2>
                        <p class="mb-2 text-xl text-gray-700 dark:text-gray-300">
                            {{ dhikr.transliteration }}
                        </p>
                        <p class="mb-4 text-gray-600 dark:text-gray-400">
                            {{ dhikr.meaning }}
                        </p>
                        <p class="text-sm text-blue-600 dark:text-blue-400">Recommended: {{ dhikr.defaultGoal }} times</p>
                    </div>

                    <div class="border-t border-gray-200 pt-4 dark:border-gray-700">
                        <Counter :dhikr="dhikr" :initial-goal="dhikr.defaultGoal" :counter-id="`dhikr_${dhikr.id}`" />
                    </div>
                </div>
            </div>

            <!-- Navigation -->
            <div class="mt-8 text-center">
                <Link
                    href="/tasbih"
                    class="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <span class="mr-2">📿</span>
                    Go to General Tasbih
                </Link>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import Counter from '@/Components/Counter.vue';
import Layout from '@/Components/Layout.vue';

interface DhikrItem {
    id: number;
    arabic: string;
    transliteration: string;
    meaning: string;
    defaultGoal: number;
}

interface Props {
    dhikrList: DhikrItem[];
}

defineProps<Props>();
</script>
