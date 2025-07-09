<template>
    <Head title="Dhikr Collection" />
    <Layout>
        <div class="max-w-6xl mx-auto">
            <h1
                class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6"
            >
                Dhikr Collection
            </h1>

            <!-- Back to Simple Counter -->
            <div class="mb-8 text-center">
                <Link
                    href="/tasbih"
                    class="inline-block bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                    ← Back to Simple Counter
                </Link>
            </div>

            <p class="text-center text-gray-600 dark:text-gray-300 mb-8">
                Choose from our collection of authentic dhikr and remember Allah
                (SWT) throughout your day.
            </p>

            <!-- Learning Insights -->
            <LearningInsights
                :dhikr-list="dhikrList"
                @apply-goal="handleGoalSuggestion"
                @apply-recommendation="handleRecommendation"
                ref="learningInsightsRef"
            />

            <!-- Additional Info -->
            <div class="mb-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                <h3 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">
                    About these dhikr:
                </h3>
                <div class="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                    <p>
                        • These are authentic dhikr (remembrance of Allah) from
                        the Quran and Sunnah
                    </p>
                    <p>
                        • The traditional count is 33+33+34 = 100 total for the
                        first three
                    </p>
                    <p>
                        • Your progress is automatically saved for each dhikr
                        individually
                    </p>
                    <p>• It's recommended to recite these after each prayer</p>
                </div>
            </div>

            <!-- Dhikr Grid -->
            <div
                class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
                <div
                    v-for="dhikr in dhikrList"
                    :key="dhikr.id"
                    :data-dhikr-id="dhikr.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                    <div class="px-2 py-6">
                        <!-- Dhikr Header -->
                        <div class="text-center mb-6">
                            <h2
                                class="arabic-text text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
                            >
                                {{ dhikr.arabic }}
                            </h2>
                            <p
                                class="text-lg text-gray-700 dark:text-gray-300 mb-1"
                            >
                                {{ dhikr.transliteration }}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                {{ dhikr.meaning }}
                            </p>
                        </div>

                        <!-- Counter for this dhikr -->
                        <div class="max-w-md mx-auto">
                            <div
                                class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                            >
                                <!-- Counter Display -->
                                <div class="text-center mb-4">
                                    <div
                                        class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2"
                                    >
                                        {{ getDhikrCount(dhikr.id) }}
                                    </div>

                                    <!-- Progress -->
                                    <div
                                        v-if="getDhikrGoal(dhikr.id) > 0"
                                        class="mb-3"
                                    >
                                        <div
                                            class="text-sm text-gray-600 dark:text-gray-300 mb-1"
                                        >
                                            {{ getDhikrCount(dhikr.id) }} /
                                            {{ getDhikrGoal(dhikr.id) }}
                                        </div>
                                        <div
                                            class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2"
                                        >
                                            <div
                                                class="progress-bar bg-green-500 h-2 rounded-full"
                                                :style="{
                                                    width:
                                                        getDhikrProgress(
                                                            dhikr.id
                                                        ) + '%',
                                                }"
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Goal Setting -->
                                <div class="text-center mb-4">
                                    <label
                                        class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"
                                    >
                                        Goal
                                    </label>
                                    <input
                                        :value="getDhikrGoal(dhikr.id)"
                                        @input="
                                            updateDhikrGoal(
                                                dhikr.id,
                                                $event.target.value
                                            )
                                        "
                                        type="number"
                                        min="1"
                                        max="10000"
                                        class="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    />
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex space-x-2">
                                    <button
                                        @click="incrementDhikr(dhikr.id)"
                                        class="flex-1 counter-animation bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                                        :disabled="
                                            getDhikrGoal(dhikr.id) > 0 &&
                                            getDhikrCount(dhikr.id) >=
                                                getDhikrGoal(dhikr.id)
                                        "
                                    >
                                        + Count
                                    </button>

                                    <button
                                        @click="resetDhikr(dhikr.id)"
                                        class="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                                    >
                                        Reset
                                    </button>
                                </div>

                                <!-- Goal Reached Message -->
                                <div
                                    v-if="isDhikrGoalReached(dhikr.id)"
                                    class="mt-3 p-2 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded text-center"
                                >
                                    <p
                                        class="text-green-800 dark:text-green-200 text-sm font-medium"
                                    >
                                        🎉 Goal Reached! Well done!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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

const props = defineProps({
    dhikrList: {
        type: Array,
        required: true,
    },
});

const dhikrCounters = ref({});
const learningInsightsRef = ref(null);
const sessionStartTimes = ref({});

onMounted(() => {
    loadAllDhikrData();
});

function loadAllDhikrData() {
    props.dhikrList.forEach((dhikr) => {
        const storageKey = `dhikr-${dhikr.id}`;
        const stored = localStorage.getItem(storageKey);

        if (stored) {
            try {
                const data = JSON.parse(stored);
                dhikrCounters.value[dhikr.id] = {
                    count: data.count || 0,
                    goal: data.goal || dhikr.defaultGoal,
                };
            } catch (e) {
                dhikrCounters.value[dhikr.id] = {
                    count: 0,
                    goal: dhikr.defaultGoal,
                };
            }
        } else {
            dhikrCounters.value[dhikr.id] = {
                count: 0,
                goal: dhikr.defaultGoal,
            };
        }
    });
}

function saveDhikrData(dhikrId) {
    const storageKey = `dhikr-${dhikrId}`;
    const data = dhikrCounters.value[dhikrId];
    localStorage.setItem(storageKey, JSON.stringify(data));
}

function getDhikrCount(dhikrId) {
    return dhikrCounters.value[dhikrId]?.count || 0;
}

function getDhikrGoal(dhikrId) {
    return dhikrCounters.value[dhikrId]?.goal || 33;
}

function getDhikrProgress(dhikrId) {
    const count = getDhikrCount(dhikrId);
    const goal = getDhikrGoal(dhikrId);
    if (goal <= 0) return 0;
    return Math.min((count / goal) * 100, 100);
}

function isDhikrGoalReached(dhikrId) {
    const count = getDhikrCount(dhikrId);
    const goal = getDhikrGoal(dhikrId);
    return goal > 0 && count >= goal;
}

function incrementDhikr(dhikrId) {
    const count = getDhikrCount(dhikrId);
    const goal = getDhikrGoal(dhikrId);

    if (goal <= 0 || count < goal) {
        if (!dhikrCounters.value[dhikrId]) {
            dhikrCounters.value[dhikrId] = { count: 0, goal: 33 };
        }

        // Start session tracking if first count
        if (dhikrCounters.value[dhikrId].count === 0) {
            sessionStartTimes.value[dhikrId] = Date.now();
        }

        dhikrCounters.value[dhikrId].count++;
        saveDhikrData(dhikrId);

        // Record learning interaction
        learningService.recordInteraction("increment", dhikrId);

        // Check if goal reached
        if (dhikrCounters.value[dhikrId].count >= goal && goal > 0) {
            recordDhikrSession(dhikrId, true);
        }

        // Vibration feedback
        if ("vibrate" in navigator) {
            navigator.vibrate(50);
        }

        // Audio feedback
        playSound();

        // Refresh learning insights
        if (learningInsightsRef.value) {
            learningInsightsRef.value.refreshInsights();
        }
    }
}

function resetDhikr(dhikrId) {
    if (!dhikrCounters.value[dhikrId]) {
        dhikrCounters.value[dhikrId] = { count: 0, goal: 33 };
    }

    // Record session before reset if there was progress
    if (dhikrCounters.value[dhikrId].count > 0) {
        recordDhikrSession(dhikrId, false);
    }

    dhikrCounters.value[dhikrId].count = 0;

    // Reset session start time
    sessionStartTimes.value[dhikrId] = Date.now();

    // Record learning interaction
    learningService.recordInteraction("reset", dhikrId);

    saveDhikrData(dhikrId);
}

function updateDhikrGoal(dhikrId, newGoal) {
    const goal = parseInt(newGoal) || 1;
    const oldGoal = getDhikrGoal(dhikrId);

    if (!dhikrCounters.value[dhikrId]) {
        dhikrCounters.value[dhikrId] = { count: 0, goal: goal };
    } else {
        dhikrCounters.value[dhikrId].goal = goal;
    }

    // Record learning interaction for goal change
    learningService.recordInteraction("goal_change", dhikrId, {
        newGoal: goal,
        oldGoal: oldGoal,
    });

    saveDhikrData(dhikrId);
}

function playSound() {
    try {
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.1
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not supported
    }
}

// Learning service integration methods
function recordDhikrSession(dhikrId, completed) {
    const startTime = sessionStartTimes.value[dhikrId] || Date.now();
    const count = getDhikrCount(dhikrId);
    const goal = getDhikrGoal(dhikrId);

    learningService.recordSession(dhikrId, count, goal, startTime, Date.now());

    // Reset session start time for next session
    sessionStartTimes.value[dhikrId] = Date.now();
}

function handleGoalSuggestion(suggestedGoal) {
    // This would be called when user wants to apply a goal suggestion
    // Implementation depends on which dhikr the suggestion is for
    console.log("Goal suggestion:", suggestedGoal);
}

function handleRecommendation(recommendation) {
    // Handle dhikr recommendation from learning insights
    if (recommendation.dhikrId) {
        // Record that user selected this recommendation
        learningService.recordInteraction(
            "dhikr_select",
            recommendation.dhikrId,
            {
                source: "recommendation",
                confidence: recommendation.confidence,
            }
        );

        // Optionally scroll to or highlight the recommended dhikr
        const dhikrElement = document.querySelector(
            `[data-dhikr-id="${recommendation.dhikrId}"]`
        );
        if (dhikrElement) {
            dhikrElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            dhikrElement.style.animation = "pulse 1s ease-in-out 3 alternate";
        }
    }
}
</script>
