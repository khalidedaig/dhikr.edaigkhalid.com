<template>
    <div
        v-if="hasEnoughData"
        class="shimport { learningService, type PersonalizedInsights, type GoalSuggestion } from '@/Services/LearningService'; import { onMounted, ref } from 'vue';ow-lg mb-8 rounded-lg bg-white p-6 dark:bg-gray-800"
    >
        <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">🧠 Learning Insights</h2>

        <!-- Consistency Score -->
        <div v-if="insights.consistency !== undefined" class="mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900">
            <h4 class="mb-2 font-medium text-blue-800 dark:text-blue-200">📈 Consistency Score</h4>
            <div class="flex items-center">
                <div class="mr-3 text-2xl font-bold text-blue-600 dark:text-blue-400">{{ insights.consistency }}%</div>
                <div class="text-sm text-blue-700 dark:text-blue-300">of the last 7 days</div>
            </div>
        </div>

        <!-- Best Time -->
        <div v-if="insights.bestTime && insights.bestTime !== 'Not enough data'" class="mb-4 rounded-lg bg-green-50 p-4 dark:bg-green-900">
            <h4 class="mb-2 font-medium text-green-800 dark:text-green-200">⏰ Best Performance Time</h4>
            <p class="text-sm text-green-700 dark:text-green-300">
                You complete dhikr most successfully during
                <span class="font-medium text-green-600 dark:text-green-400">{{ insights.bestTime }}</span>
            </p>
        </div>

        <!-- Favorite Dhikr -->
        <div v-if="insights.favoritesDhikr && insights.favoritesDhikr.length > 0" class="mb-4 rounded-lg bg-purple-50 p-4 dark:bg-purple-900">
            <h4 class="mb-3 font-medium text-purple-800 dark:text-purple-200">💝 Most Practiced</h4>
            <div class="space-y-2">
                <div v-for="fav in insights.favoritesDhikr.slice(0, 3)" :key="fav.dhikrId" class="flex items-center justify-between">
                    <span class="text-sm text-purple-600 dark:text-purple-400">{{ getDhikrName(fav.dhikrId) }}</span>
                    <span class="text-xs font-medium text-purple-500 dark:text-purple-300">{{ fav.count }} sessions</span>
                </div>
            </div>
        </div>

        <!-- Streak Info -->
        <div v-if="insights.streakInfo" class="mb-4 rounded-lg bg-orange-50 p-4 dark:bg-orange-900">
            <h4 class="mb-2 font-medium text-orange-800 dark:text-orange-200">🔥 Streak Information</h4>
            <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                    <div class="text-lg font-bold text-orange-600 dark:text-orange-400">{{ insights.streakInfo.current }}</div>
                    <div class="text-xs text-orange-700 dark:text-orange-300">Current Streak</div>
                </div>
                <div class="text-center">
                    <div class="text-lg font-bold text-orange-600 dark:text-orange-400">{{ insights.streakInfo.longest }}</div>
                    <div class="text-xs text-orange-700 dark:text-orange-300">Longest Streak</div>
                </div>
            </div>
        </div>

        <!-- Improvements -->
        <div v-if="insights.improvement && insights.improvement.length > 0" class="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900">
            <h4 class="mb-3 font-medium text-yellow-800 dark:text-yellow-200">💡 Suggestions</h4>
            <ul class="space-y-1">
                <li v-for="suggestion in insights.improvement" :key="suggestion" class="text-sm text-yellow-700 dark:text-yellow-300">
                    • {{ suggestion }}
                </li>
            </ul>
        </div>

        <!-- Goal Optimization -->
        <div v-if="insights.goalOptimization && insights.goalOptimization.length > 0" class="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900">
            <h4 class="mb-3 font-medium text-indigo-800 dark:text-indigo-200">🎯 Goal Optimization</h4>
            <div class="space-y-2">
                <div v-for="tip in insights.goalOptimization.slice(0, 2)" :key="tip.dhikrId" class="text-sm text-indigo-700 dark:text-indigo-300">
                    <span class="font-medium">{{ getDhikrName(tip.dhikrId) }}:</span> {{ tip.tip }}
                </div>
            </div>
        </div>
    </div>

    <!-- No data message -->
    <div v-else class="mb-8 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
        <div class="text-gray-500 dark:text-gray-400">
            <p class="mb-2">🌱 Start practicing to see your learning insights!</p>
            <p class="text-sm">Complete a few dhikr sessions to unlock personalized recommendations.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { learningService } from '@/Services/LearningService';
import { onMounted, ref } from 'vue';

interface Props {
    dhikrList?: Array<{ id: number; transliteration: string }>;
    currentDhikrId?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
    dhikrList: () => [
        { id: 1, transliteration: 'Subhan Allah' },
        { id: 2, transliteration: 'Alhamdulillah' },
        { id: 3, transliteration: 'Allahu Akbar' },
        { id: 4, transliteration: 'La ilaha illa Allah' },
        { id: 5, transliteration: 'Astaghfirullah' },
        { id: 6, transliteration: 'Bismillah' },
        { id: 7, transliteration: 'La hawla wa la quwwata illa billah' },
        { id: 8, transliteration: "Hasbi Allahu wa ni'mal wakeel" },
    ],
});

const insights = ref<PersonalizedInsights>({
    consistency: 0,
    bestTime: '',
    improvement: [],
    streakInfo: { current: 0, longest: 0 },
    favoritesDhikr: [],
    goalOptimization: [],
});
const hasEnoughData = ref(false);
const goalSuggestion = ref<GoalSuggestion | null>(null);

const loadInsights = () => {
    try {
        insights.value = learningService.getPersonalizedInsights();

        const sessions = learningService.getSessions();
        hasEnoughData.value = sessions.length >= 3;

        // Get goal suggestion for current dhikr
        if (props.currentDhikrId) {
            goalSuggestion.value = learningService.getSuggestedGoal(props.currentDhikrId.toString());
        }
    } catch (error) {
        console.error('Error loading insights:', error);
        hasEnoughData.value = false;
    }
};

const getDhikrName = (dhikrId: string | number) => {
    const dhikr = props.dhikrList.find((d: any) => d.id == dhikrId);
    return dhikr ? dhikr.transliteration : `Dhikr ${dhikrId}`;
};

onMounted(() => {
    loadInsights();
});
</script>
