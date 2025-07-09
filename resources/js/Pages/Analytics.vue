<template>
    <Head title="Analytics" />
    <Layout>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1
                class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
            >
                📊 Your Dhikr Analytics
            </h1>

            <!-- Back Navigation -->
            <div class="mb-8 text-center">
                <Link
                    href="/"
                    class="inline-block bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                    ← Back to Home
                </Link>
            </div>

            <!-- Main Analytics Display -->
            <div v-if="!hasEnoughData" class="text-center py-12">
                <div class="text-6xl mb-4">📈</div>
                <h2
                    class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4"
                >
                    Start Your Journey
                </h2>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                    Begin practicing dhikr to see your personalized analytics
                    and insights.
                </p>
                <div class="space-y-3">
                    <Link
                        href="/dhikr"
                        class="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Start Simple Counter
                    </Link>
                    <br />
                    <Link
                        href="/dhikr-list"
                        class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Browse Dhikr Collection
                    </Link>
                </div>
            </div>

            <div v-else class="space-y-6">
                <!-- Overview Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Total Sessions -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
                    >
                        <div
                            class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                        >
                            {{ analytics.totalSessions }}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            Total Sessions
                        </div>
                    </div>

                    <!-- Total Counts -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
                    >
                        <div
                            class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
                        >
                            {{ analytics.totalCounts.toLocaleString() }}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            Total Dhikr Counts
                        </div>
                    </div>

                    <!-- Current Streak -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
                    >
                        <div
                            class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2"
                        >
                            {{ analytics.streakDays }}
                        </div>
                        <div class="text-sm text-gray-600 dark:text-gray-400">
                            Day Streak 🔥
                        </div>
                    </div>
                </div>

                <!-- Detailed Insights -->
                <LearningInsights
                    :dhikr-list="dhikrList"
                    ref="learningInsightsRef"
                    class="mb-6"
                />

                <!-- Session History -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3
                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"
                    >
                        📈 Recent Activity
                    </h3>

                    <div
                        v-if="recentSessions.length === 0"
                        class="text-center py-8"
                    >
                        <p class="text-gray-500 dark:text-gray-400">
                            No recent sessions found. Start practicing to see
                            your activity here.
                        </p>
                    </div>

                    <div v-else class="space-y-3">
                        <div
                            v-for="session in recentSessions.slice(0, 10)"
                            :key="session.timestamp"
                            class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded"
                        >
                            <div>
                                <div
                                    class="font-medium text-gray-800 dark:text-gray-200"
                                >
                                    {{ getDhikrName(session.dhikrId) }}
                                </div>
                                <div
                                    class="text-sm text-gray-600 dark:text-gray-400"
                                >
                                    {{ formatDate(session.timestamp) }}
                                </div>
                            </div>
                            <div class="text-right">
                                <div
                                    class="font-bold"
                                    :class="
                                        session.completed
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-yellow-600 dark:text-yellow-400'
                                    "
                                >
                                    {{ session.count }} / {{ session.goal }}
                                </div>
                                <div
                                    class="text-xs text-gray-500 dark:text-gray-400"
                                >
                                    {{
                                        session.completed
                                            ? "✅ Completed"
                                            : "⏸️ Partial"
                                    }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Time Analysis -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3
                        class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"
                    >
                        ⏰ Practice Patterns
                    </h3>

                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div
                            v-for="(count, timeSlot) in timeSlotAnalysis"
                            :key="timeSlot"
                            class="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded"
                        >
                            <div class="text-2xl mb-1">
                                {{ getTimeIcon(timeSlot) }}
                            </div>
                            <div
                                class="font-semibold text-gray-800 dark:text-gray-200 capitalize"
                            >
                                {{ timeSlot }}
                            </div>
                            <div
                                class="text-sm text-gray-600 dark:text-gray-400"
                            >
                                {{ count }} sessions
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Privacy Notice -->
                <div
                    class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center"
                >
                    <p class="text-sm text-blue-700 dark:text-blue-300">
                        🔒 All your data is stored locally on your device for
                        privacy. No information is shared with external servers.
                    </p>
                    <button
                        @click="exportData"
                        class="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                    >
                        Export My Data
                    </button>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import Layout from "@/Components/Layout.vue";
import LearningInsights from "@/Components/LearningInsights.vue";
import { learningService } from "@/Services/LearningService.js";

// Default dhikr list for name resolution
const dhikrList = ref([
    { id: 1, transliteration: "Subhan Allah" },
    { id: 2, transliteration: "Alhamdulillah" },
    { id: 3, transliteration: "Allahu Akbar" },
    { id: 4, transliteration: "La ilaha illa Allah" },
    { id: 5, transliteration: "Astaghfirullah" },
    { id: 6, transliteration: "Bismillah" },
    { id: 7, transliteration: "La hawla wa la quwwata illa billah" },
    { id: 8, transliteration: "Hasbi Allahu wa ni'mal wakeel" },
]);

const analytics = ref({
    totalSessions: 0,
    totalCounts: 0,
    streakDays: 0,
    averageSessionDuration: 0,
});

const recentSessions = ref([]);
const hasEnoughData = ref(false);
const learningInsightsRef = ref(null);

const timeSlotAnalysis = computed(() => {
    const slots = { morning: 0, afternoon: 0, evening: 0, night: 0 };

    recentSessions.value.forEach((session) => {
        const hour = new Date(session.timestamp).getHours();
        const timeSlot = getTimeSlot(hour);
        slots[timeSlot]++;
    });

    return slots;
});

onMounted(() => {
    loadAnalyticsData();
});

function loadAnalyticsData() {
    try {
        // Get learning data
        const learningData = learningService.getLearningData();
        if (learningData && learningData.analytics) {
            analytics.value = { ...learningData.analytics };
        }

        // Get recent sessions
        const sessions = learningService.getSessions();
        recentSessions.value = sessions.sort(
            (a, b) => b.timestamp - a.timestamp
        );

        // Check if we have enough data
        hasEnoughData.value = sessions.length >= 3;
    } catch (error) {
        console.error("Error loading analytics:", error);
        hasEnoughData.value = false;
    }
}

function getDhikrName(dhikrId) {
    const dhikr = dhikrList.value.find((d) => d.id == dhikrId);
    return dhikr ? dhikr.transliteration : `Dhikr ${dhikrId}`;
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
        return "Just now";
    } else if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
        return "Yesterday";
    } else {
        return date.toLocaleDateString();
    }
}

function getTimeSlot(hour) {
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
}

function getTimeIcon(timeSlot) {
    const icons = {
        morning: "🌅",
        afternoon: "☀️",
        evening: "🌆",
        night: "🌙",
    };
    return icons[timeSlot] || "⏰";
}

function exportData() {
    try {
        const learningData = learningService.getLearningData();
        const sessions = learningService.getSessions();

        const exportData = {
            analytics: learningData,
            sessions: sessions,
            exportDate: new Date().toISOString(),
            note: "Dhikr Analytics Export - Your personal spiritual practice data",
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `dhikr-analytics-${
            new Date().toISOString().split("T")[0]
        }.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        alert("Your data has been exported successfully!");
    } catch (error) {
        console.error("Error exporting data:", error);
        alert("There was an error exporting your data. Please try again.");
    }
}
</script>
