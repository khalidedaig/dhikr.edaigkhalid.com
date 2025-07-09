<template>
    <Layout>
        <div class="max-w-4xl mx-auto">
            <h1
                class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8"
            >
                Dhikr Collection
            </h1>

            <p class="text-center text-gray-600 dark:text-gray-300 mb-8">
                Choose from our collection of authentic dhikr and remember Allah
                (SWT) throughout your day.
            </p>

            <!-- Dhikr Grid -->
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                <div
                    v-for="dhikr in dhikrList"
                    :key="dhikr.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                    <div class="p-6">
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
                                        class="flex-1 counter-animation bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                        class="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
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

            <!-- Additional Info -->
            <div class="mt-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
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

            <!-- Back to Simple Counter -->
            <div class="mt-6 text-center">
                <Link
                    href="/tasbih"
                    class="inline-block bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
                >
                    ← Back to Simple Counter
                </Link>
            </div>
        </div>
    </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Layout from "@/Components/Layout.vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    dhikrList: {
        type: Array,
        required: true,
    },
});

const dhikrCounters = ref({});

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

        dhikrCounters.value[dhikrId].count++;
        saveDhikrData(dhikrId);

        // Vibration feedback
        if ("vibrate" in navigator) {
            navigator.vibrate(50);
        }

        // Audio feedback
        playSound();
    }
}

function resetDhikr(dhikrId) {
    if (!dhikrCounters.value[dhikrId]) {
        dhikrCounters.value[dhikrId] = { count: 0, goal: 33 };
    }

    dhikrCounters.value[dhikrId].count = 0;
    saveDhikrData(dhikrId);
}

function updateDhikrGoal(dhikrId, newGoal) {
    const goal = parseInt(newGoal) || 1;

    if (!dhikrCounters.value[dhikrId]) {
        dhikrCounters.value[dhikrId] = { count: 0, goal: goal };
    } else {
        dhikrCounters.value[dhikrId].goal = goal;
    }

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
</script>
