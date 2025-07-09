<template>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <!-- Dhikr Text (if provided) -->
        <div v-if="dhikr" class="mb-6">
            <h2
                class="arabic-text text-3xl font-bold text-green-600 dark:text-green-400 mb-2"
            >
                {{ dhikr.arabic }}
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-1">
                {{ dhikr.transliteration }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ dhikr.meaning }}
            </p>
        </div>

        <!-- Counter Display -->
        <div class="mb-6">
            <div
                class="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2"
            >
                {{ localCount }}
            </div>

            <!-- Progress Display -->
            <div v-if="goal > 0" class="mb-4">
                <div class="text-lg text-gray-600 dark:text-gray-300 mb-2">
                    {{ localCount }} / {{ goal }}
                </div>
                <div
                    class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3"
                >
                    <div
                        class="progress-bar bg-green-500 h-3 rounded-full"
                        :style="{ width: progressPercentage + '%' }"
                    ></div>
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {{ progressPercentage.toFixed(1) }}% Complete
                </div>
            </div>
        </div>

        <!-- Goal Setting -->
        <div class="mb-6">
            <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                Set Goal
            </label>
            <input
                v-model.number="localGoal"
                type="number"
                min="1"
                max="10000"
                class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                @change="updateGoal"
            />
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col space-y-4">
            <!-- Increment Button -->
            <button
                @click="increment"
                class="counter-animation bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 cursor-pointer"
                :disabled="goal > 0 && localCount >= goal"
            >
                <span class="text-2xl">+</span>
                <span class="block text-sm mt-1">Tap to Count</span>
            </button>

            <!-- Reset Button -->
            <button
                @click="reset"
                class="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 cursor-pointer"
            >
                Reset
            </button>
        </div>

        <!-- Goal Reached Message -->
        <div
            v-if="goalReached"
            class="mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg"
        >
            <p class="text-green-800 dark:text-green-200 font-medium">
                🎉 Goal Reached! Well done!
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
    dhikr: {
        type: Object,
        default: null,
    },
    storageKey: {
        type: String,
        required: true,
    },
    defaultGoal: {
        type: Number,
        default: 33,
    },
});

const localCount = ref(0);
const localGoal = ref(props.defaultGoal);
const goal = computed(() => localGoal.value);

const progressPercentage = computed(() => {
    if (goal.value <= 0) return 0;
    return Math.min((localCount.value / goal.value) * 100, 100);
});

const goalReached = computed(() => {
    return goal.value > 0 && localCount.value >= goal.value;
});

// Load from localStorage on mount
onMounted(() => {
    loadFromStorage();
});

// Watch for changes and save to localStorage
watch(
    [localCount, localGoal],
    () => {
        saveToStorage();
    },
    { deep: true }
);

function loadFromStorage() {
    const stored = localStorage.getItem(props.storageKey);
    if (stored) {
        try {
            const data = JSON.parse(stored);
            localCount.value = data.count || 0;
            localGoal.value = data.goal || props.defaultGoal;
        } catch (e) {
            console.error("Error loading from localStorage:", e);
        }
    }
}

function saveToStorage() {
    const data = {
        count: localCount.value,
        goal: localGoal.value,
    };
    localStorage.setItem(props.storageKey, JSON.stringify(data));
}

function increment() {
    if (goal.value <= 0 || localCount.value < goal.value) {
        localCount.value++;

        // Vibration feedback (if supported)
        if ("vibrate" in navigator) {
            navigator.vibrate(50);
        }

        // Audio feedback (optional)
        playSound();
    }
}

function reset() {
    localCount.value = 0;
}

function updateGoal() {
    if (localGoal.value < 1) {
        localGoal.value = 1;
    }
}

function playSound() {
    // Simple audio feedback using Web Audio API
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
        // Audio not supported or blocked
    }
}
</script>
