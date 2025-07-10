<template>
    <Head title="Analytics" />
    <Layout>
        <div class="mx-auto max-w-6xl">
            <h1 class="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">📊 Your Dhikr Analytics</h1>

            <!-- Today's Summary -->
            <div class="mb-8 grid gap-6 md:grid-cols-3">
                <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="text-center">
                        <div class="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {{ todayStats.totalCount }}
                        </div>
                        <p class="text-gray-600 dark:text-gray-300">Today's Total</p>
                    </div>
                </div>

                <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="text-center">
                        <div class="mb-2 text-3xl font-bold text-green-600 dark:text-green-400">
                            {{ streak }}
                        </div>
                        <p class="text-gray-600 dark:text-gray-300">Day Streak</p>
                    </div>
                </div>

                <div class="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div class="text-center">
                        <div class="mb-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {{ weeklyAverage }}
                        </div>
                        <p class="text-gray-600 dark:text-gray-300">Weekly Average</p>
                    </div>
                </div>
            </div>

            <!-- Weekly Progress Chart -->
            <div class="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Past 7 Days</h2>
                <div class="grid grid-cols-7 gap-2">
                    <div v-for="(day, index) in weeklyData" :key="index" class="text-center">
                        <div class="mb-2 text-xs text-gray-500 dark:text-gray-400">
                            {{ day.label }}
                        </div>
                        <div class="flex h-24 items-end justify-center rounded-lg bg-gray-200 p-1 dark:bg-gray-700">
                            <div class="w-full rounded bg-blue-500" :style="{ height: `${day.percentage}%` }"></div>
                        </div>
                        <div class="mt-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {{ day.count }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dhikr Breakdown -->
            <div class="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Dhikr Types Today</h2>
                <div class="space-y-3">
                    <div
                        v-for="(count, dhikrType) in todayStats.dhikrTypes"
                        :key="dhikrType"
                        class="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                    >
                        <span class="font-medium text-gray-700 dark:text-gray-300">
                            {{ getDhikrDisplayName(dhikrType) }}
                        </span>
                        <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {{ count }}
                        </span>
                    </div>
                </div>
                <div v-if="Object.keys(todayStats.dhikrTypes).length === 0" class="py-8 text-center text-gray-500 dark:text-gray-400">
                    No dhikr recorded today. Start your spiritual practice!
                </div>
            </div>

            <!-- Learning Insights -->
            <LearningInsights />

            <!-- Insights -->
            <div class="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:from-blue-900 dark:to-purple-900">
                <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">🎯 Insights & Suggestions</h2>
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="rounded-lg bg-white p-4 dark:bg-gray-800">
                        <h3 class="mb-2 font-medium text-gray-900 dark:text-white">Best Performance</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300">
                            Your highest count was <strong>{{ maxDayCount }}</strong> on {{ bestDay }}.
                        </p>
                    </div>
                    <div class="rounded-lg bg-white p-4 dark:bg-gray-800">
                        <h3 class="mb-2 font-medium text-gray-900 dark:text-white">Consistency</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300">
                            {{ getConsistencyMessage() }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import LearningInsights from '@/Components/LearningInsights.vue';
import { learningService, type AnalyticsSummary, type DhikrSession, type PersonalizedInsights } from '@/Services/LearningService';
import { Head } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';
import Layout from '../Components/Layout.vue';

interface DayStats {
    sessions: number;
    totalCount: number;
    dhikrTypes: Record<string, number>;
}

interface Analytics {
    [date: string]: DayStats;
}

const analytics = ref<Analytics>({});
const analyticsData = ref<AnalyticsSummary>({
    totalSessions: 0,
    totalCounts: 0,
    averageSessionDuration: 0,
    streakDays: 0,
    consistency: 0,
    favoriteTime: '',
    recentSessions: [],
});
const personalizedInsights = ref<PersonalizedInsights>({
    consistency: 0,
    bestTime: '',
    improvement: [],
    streakInfo: { current: 0, longest: 0 },
    favoritesDhikr: [],
    goalOptimization: [],
});
const hasEnoughData = ref(false);
const recentSessions = ref<DhikrSession[]>([]);

const todayStats = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayAnalytics = analytics.value[today] || { sessions: 0, totalCount: 0, dhikrTypes: {} };

    return {
        sessions: todayAnalytics.sessions || 0,
        totalCount: todayAnalytics.totalCount || 0,
        dhikrTypes: todayAnalytics.dhikrTypes || {},
    };
});

const weeklyData = computed(() => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayData = analytics.value[dateStr] || { totalCount: 0 };

        days.push({
            label: date.toLocaleDateString('en-US', { weekday: 'short' }),
            count: dayData.totalCount,
            percentage: Math.min((dayData.totalCount / 500) * 100, 100), // Max height at 500 dhikr
        });
    }

    return days;
});

const weeklyAverage = computed(() => {
    const total = weeklyData.value.reduce((sum: number, day: any) => sum + day.count, 0);
    return Math.round(total / 7);
});

const streak = computed(() => {
    if (analyticsData.value && typeof analyticsData.value === 'object' && 'streakDays' in analyticsData.value) {
        return (analyticsData.value as any).streakDays;
    }

    // Fallback to old calculation
    let currentStreak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        if (analytics.value[dateStr]?.totalCount > 0) {
            currentStreak++;
        } else {
            break;
        }
    }

    return currentStreak;
});

const maxDayCount = computed(() => {
    return Math.max(...Object.values(analytics.value).map((day: any) => day.totalCount), 0);
});

const bestDay = computed(() => {
    let maxCount = 0;
    let bestDate = '';

    Object.entries(analytics.value).forEach(([date, stats]: [string, any]) => {
        if (stats.totalCount > maxCount) {
            maxCount = stats.totalCount;
            bestDate = date;
        }
    });

    return bestDate ? new Date(bestDate).toLocaleDateString() : 'N/A';
});

const loadAnalytics = () => {
    // Load legacy analytics
    const saved = localStorage.getItem('dhikr_analytics');
    if (saved) {
        analytics.value = JSON.parse(saved);
    } // Load learning service analytics
    try {
        analyticsData.value = learningService.getAnalyticsSummary();
        personalizedInsights.value = learningService.getPersonalizedInsights();

        // Safe access to recentSessions
        recentSessions.value = analyticsData.value.recentSessions || [];

        const sessions = learningService.getSessions();
        hasEnoughData.value = sessions.length >= 3;
    } catch (error) {
        console.error('Error loading analytics:', error);
        hasEnoughData.value = false;
    }
};

const getDhikrDisplayName = (dhikrType: string): string => {
    const displayNames: Record<string, string> = {
        default: 'General Tasbih',
        dhikr_1: 'Subhan Allah',
        dhikr_2: 'Alhamdulillah',
        dhikr_3: 'Allahu Akbar',
        dhikr_4: 'La ilaha illa Allah',
        dhikr_5: 'Astaghfirullah',
    };

    return displayNames[dhikrType] || dhikrType;
};

const getConsistencyMessage = (): string => {
    if (streak.value >= 7) {
        return `Excellent! You've maintained a ${streak.value}-day streak. Keep up the amazing work!`;
    } else if (streak.value >= 3) {
        return `Good consistency with a ${streak.value}-day streak. Try to reach a week!`;
    } else if (streak.value >= 1) {
        return `You're building a habit! Current streak: ${streak.value} day(s).`;
    } else {
        return 'Start building your dhikr habit today!';
    }
};

onMounted(() => {
    loadAnalytics();
});
</script>
