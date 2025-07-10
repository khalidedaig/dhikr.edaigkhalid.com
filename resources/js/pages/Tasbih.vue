<template>
    <Head title="Tasbih Counter" />
    <Layout>
        <div class="mx-auto max-w-6xl">
            <h1 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Tasbih Counter</h1>

            <!-- Grid Layout for Three Sections -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <!-- Quick Dhikr Suggestions -->
                <div class="rounded-lg bg-green-50 p-4 dark:bg-green-900">
                    <h3 class="mb-3 font-semibold text-green-800 dark:text-green-200">Common Dhikr:</h3>
                    <div class="space-y-2 text-sm">
                        <div class="text-center">
                            <p class="arabic-text text-lg text-green-700 dark:text-green-300">سُبْحَانَ ٱللَّٰهِ</p>
                            <p class="text-green-600 dark:text-green-400">Subhan Allah (33 times)</p>
                        </div>
                        <div class="text-center">
                            <p class="arabic-text text-lg text-green-700 dark:text-green-300">ٱلْـحَمْدُ لِلَّٰهِ</p>
                            <p class="text-green-600 dark:text-green-400">Alhamdulillah (33 times)</p>
                        </div>
                        <div class="text-center">
                            <p class="arabic-text text-lg text-green-700 dark:text-green-300">ٱللَّٰهُ أَكْبَرُ</p>
                            <p class="text-green-600 dark:text-green-400">Allahu Akbar (34 times)</p>
                        </div>
                    </div>
                </div>

                <!-- Main Counter -->
                <div class="rounded-lg bg-white shadow-lg dark:bg-gray-800">
                    <Counter />
                </div>

                <!-- Prayer Times & Recommendations -->
                <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900">
                    <h3 class="mb-3 font-semibold text-blue-800 dark:text-blue-200">Today's Goals:</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex items-center justify-between rounded bg-blue-100 p-2 dark:bg-blue-800">
                            <span class="text-blue-700 dark:text-blue-300">Morning Dhikr</span>
                            <span class="text-blue-600 dark:text-blue-400">100</span>
                        </div>
                        <div class="flex items-center justify-between rounded bg-blue-100 p-2 dark:bg-blue-800">
                            <span class="text-blue-700 dark:text-blue-300">Evening Dhikr</span>
                            <span class="text-blue-600 dark:text-blue-400">100</span>
                        </div>
                        <div class="flex items-center justify-between rounded bg-blue-100 p-2 dark:bg-blue-800">
                            <span class="text-blue-700 dark:text-blue-300">Personal Goal</span>
                            <span class="text-blue-600 dark:text-blue-400">200</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Reset and Settings -->
            <div class="mt-6 text-center">
                <div class="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
                    <div class="flex justify-center space-x-4">
                        <button
                            @click="resetAllCounters"
                            class="rounded-lg bg-red-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-red-600 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                            Reset All
                        </button>
                        <button
                            @click="exportData"
                            class="rounded-lg bg-green-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Export Data
                        </button>
                        <button
                            @click="importData"
                            class="rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Import Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Counter from '@/Components/Counter.vue';
import Layout from '@/Components/Layout.vue';
import { Head } from '@inertiajs/vue3';

const resetAllCounters = () => {
    if (confirm('Are you sure you want to reset all counters? This action cannot be undone.')) {
        localStorage.removeItem('dhikr_counters');
        localStorage.removeItem('dhikr_analytics');
        window.location.reload();
    }
};

const exportData = () => {
    const data = {
        counters: localStorage.getItem('dhikr_counters'),
        analytics: localStorage.getItem('dhikr_analytics'),
        timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dhikr_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string);
                    if (data.counters) localStorage.setItem('dhikr_counters', data.counters);
                    if (data.analytics) localStorage.setItem('dhikr_analytics', data.analytics);
                    alert('Data imported successfully!');
                    window.location.reload();
                } catch (error) {
                    alert('Error importing data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
};
</script>
