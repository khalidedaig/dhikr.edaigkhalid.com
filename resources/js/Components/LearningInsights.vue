<template>
    <div
        class="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900 rounded-lg p-6 mb-6"
    >
        <div class="flex items-center justify-between mb-4">
            <h3
                class="text-lg font-semibold text-purple-800 dark:text-purple-200"
            >
                🤖 Personal Insights
            </h3>
            <button
                @click="refreshInsights"
                class="text-sm text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
            >
                🔄 Refresh
            </button>
        </div>

        <div v-if="!hasEnoughData" class="text-center py-4">
            <p class="text-purple-600 dark:text-purple-300 text-sm">
                Keep practicing to unlock personalized insights! Complete a few
                more dhikr sessions to see recommendations.
            </p>
        </div>

        <div v-else class="space-y-4">
            <!-- Consistency Score -->
            <div
                v-if="insights.consistency !== undefined"
                class="bg-white dark:bg-gray-800 rounded-lg p-4"
            >
                <div class="flex items-center justify-between mb-2">
                    <span
                        class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Consistency Score
                    </span>
                    <span class="text-lg font-bold" :class="consistencyColor">
                        {{ insights.consistency }}%
                    </span>
                </div>
                <div
                    class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2"
                >
                    <div
                        class="h-2 rounded-full transition-all duration-500"
                        :class="consistencyBarColor"
                        :style="{ width: insights.consistency + '%' }"
                    ></div>
                </div>
            </div>

            <!-- Current Recommendation -->
            <div
                v-if="currentRecommendation"
                class="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-green-500"
            >
                <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    💡 Smart Suggestion
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {{ currentRecommendation.reason }}
                </p>
                <button
                    @click="applyRecommendation(currentRecommendation)"
                    class="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors"
                >
                    Apply Suggestion
                </button>
            </div>

            <!-- Goal Optimization -->
            <div
                v-if="goalSuggestion"
                class="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500"
            >
                <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    🎯 Goal Optimization
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {{ goalSuggestion.reason }}
                </p>
                <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                        Suggested goal:
                    </span>
                    <span class="font-bold text-blue-600 dark:text-blue-400">
                        {{ goalSuggestion.goal }}
                    </span>
                    <button
                        @click="$emit('apply-goal', goalSuggestion.goal)"
                        class="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                    >
                        Apply
                    </button>
                </div>
            </div>

            <!-- Streak Information -->
            <div
                v-if="insights.streakInfo"
                class="bg-white dark:bg-gray-800 rounded-lg p-4"
            >
                <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    🔥 Practice Streak
                </h4>
                <div class="grid grid-cols-2 gap-4">
                    <div class="text-center">
                        <div
                            class="text-2xl font-bold text-orange-500 dark:text-orange-400"
                        >
                            {{ insights.streakInfo.current }}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            Current Streak
                        </div>
                    </div>
                    <div class="text-center">
                        <div
                            class="text-2xl font-bold text-red-500 dark:text-red-400"
                        >
                            {{ insights.streakInfo.longest }}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            Best Streak
                        </div>
                    </div>
                </div>
            </div>

            <!-- Best Performance Time -->
            <div
                v-if="insights.bestTime"
                class="bg-white dark:bg-gray-800 rounded-lg p-4"
            >
                <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                    ⏰ Best Performance Time
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    You complete dhikr most successfully during
                    <span
                        class="font-medium text-indigo-600 dark:text-indigo-400"
                    >
                        {{ insights.bestTime }}
                    </span>
                </p>
            </div>

            <!-- Favorite Dhikr -->
            <div
                v-if="
                    insights.favoritesDhikr &&
                    insights.favoritesDhikr.length > 0
                "
                class="bg-white dark:bg-gray-800 rounded-lg p-4"
            >
                <h4 class="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    💝 Most Practiced
                </h4>
                <div class="space-y-2">
                    <div
                        v-for="(fav, index) in insights.favoritesDhikr.slice(
                            0,
                            3
                        )"
                        :key="fav.dhikrId"
                        class="flex items-center justify-between"
                    >
                        <span class="text-sm text-gray-600 dark:text-gray-400">
                            {{ getDhikrName(fav.dhikrId) }}
                        </span>
                        <div class="flex items-center space-x-1">
                            <span
                                class="text-xs text-gray-500 dark:text-gray-400"
                            >
                                {{ fav.count }} times
                            </span>
                            <span v-if="index === 0" class="text-yellow-500">
                                👑
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Privacy Controls -->
            <div class="text-center pt-2">
                <button
                    @click="showPrivacyOptions = !showPrivacyOptions"
                    class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                    🔒 Privacy & Data Controls
                </button>
                <div v-if="showPrivacyOptions" class="mt-2 space-y-2 text-xs">
                    <p class="text-gray-500 dark:text-gray-400">
                        All data is stored locally on your device. No
                        information is sent to external servers.
                    </p>
                    <button
                        @click="resetLearningData"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                    >
                        Reset Learning Data
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, defineEmits } from "vue";
import { learningService } from "@/Services/LearningService.js";

const emit = defineEmits(["apply-goal", "apply-recommendation"]);

const props = defineProps({
    currentDhikrId: {
        type: [String, Number],
        default: null,
    },
    dhikrList: {
        type: Array,
        default: () => [],
    },
});

const insights = ref({});
const currentRecommendation = ref(null);
const goalSuggestion = ref(null);
const hasEnoughData = ref(false);
const showPrivacyOptions = ref(false);

const consistencyColor = computed(() => {
    const score = insights.value.consistency || 0;
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
});

const consistencyBarColor = computed(() => {
    const score = insights.value.consistency || 0;
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    return "bg-red-500";
});

onMounted(() => {
    loadInsights();
});

function loadInsights() {
    try {
        insights.value = learningService.getPersonalizedInsights();

        // Check if we have enough data for meaningful insights
        const sessions = learningService.getSessions();
        hasEnoughData.value = sessions.length >= 5;

        // Get current recommendation
        currentRecommendation.value =
            learningService.getCurrentRecommendation();

        // Get goal suggestion for current dhikr
        if (props.currentDhikrId) {
            goalSuggestion.value = learningService.getSuggestedGoal(
                props.currentDhikrId
            );
        }
    } catch (error) {
        console.error("Error loading insights:", error);
        hasEnoughData.value = false;
    }
}

function refreshInsights() {
    // Regenerate recommendations
    learningService.generateRecommendations();
    loadInsights();
}

function applyRecommendation(recommendation) {
    emit("apply-recommendation", recommendation);
}

function getDhikrName(dhikrId) {
    const dhikr = props.dhikrList.find((d) => d.id == dhikrId);
    return dhikr ? dhikr.transliteration : `Dhikr ${dhikrId}`;
}

function resetLearningData() {
    if (
        confirm(
            "Are you sure you want to reset all learning data? This action cannot be undone."
        )
    ) {
        learningService.resetLearningData();
        insights.value = {};
        currentRecommendation.value = null;
        goalSuggestion.value = null;
        hasEnoughData.value = false;
        showPrivacyOptions.value = false;
    }
}

// Expose refresh method for parent components
defineExpose({
    refreshInsights,
    loadInsights,
});
</script>
