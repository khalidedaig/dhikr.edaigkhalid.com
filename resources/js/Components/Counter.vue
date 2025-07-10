<template>
    <div class="rounded-lg bg-white p-6 text-center shadow-lg dark:bg-gray-800">
        <!-- Dhikr Text (if provided) -->
        <div v-if="dhikr" class="mb-6">
            <h2 class="arabic-text mb-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {{ dhikr.arabic }}
            </h2>
            <p class="mb-1 text-lg text-gray-600 dark:text-gray-300">
                {{ dhikr.transliteration }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ dhikr.meaning }}
            </p>
        </div>

        <!-- Counter Display -->
        <div class="mb-6">
            <div class="mb-2 text-6xl font-bold text-blue-600 dark:text-blue-400">
                {{ localCount }}
            </div>

            <!-- Progress Display -->
            <div v-if="goal > 0" class="mb-4">
                <div class="mb-2 text-lg text-gray-600 dark:text-gray-300">{{ localCount }} / {{ goal }}</div>
                <div class="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div class="progress-bar h-3 rounded-full bg-green-500" :style="{ width: progressPercentage + '%' }"></div>
                </div>
                <div class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ progressPercentage.toFixed(1) }}% Complete</div>
            </div>
        </div>

        <!-- Goal Setting -->
        <div class="mb-6">
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"> Set Goal </label>
            <input
                v-model.number="localGoal"
                type="number"
                min="1"
                max="10000"
                class="w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-center text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                @change="updateGoal"
            />
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col space-y-4">
            <!-- Increment Button -->
            <button
                @click="increment"
                class="counter-animation cursor-pointer rounded-lg bg-green-500 px-8 py-4 text-xl font-bold text-white transition-colors duration-200 hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                :disabled="goal > 0 && localCount >= goal"
            >
                <span class="text-2xl">+</span>
                <span class="mt-1 block text-sm">Tap to Count</span>
            </button>

            <!-- Reset Button -->
            <button
                @click="reset"
                class="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-red-600 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
                Reset
            </button>
        </div>

        <!-- Goal Reached Message -->
        <div v-if="goalReached" class="mt-4 rounded-lg border border-green-300 bg-green-100 p-3 dark:border-green-700 dark:bg-green-900">
            <p class="font-medium text-green-800 dark:text-green-200">🎉 Goal Reached! Well done!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { learningService } from '@/Services/LearningService';
import { computed, onMounted, ref, watch } from 'vue';

interface Dhikr {
    id: number;
    arabic: string;
    transliteration: string;
    meaning: string;
    defaultGoal?: number;
}

interface Props {
    dhikr?: Dhikr;
    initialCount?: number;
    initialGoal?: number;
    counterId?: string;
}

const props = withDefaults(defineProps<Props>(), {
    initialCount: 0,
    initialGoal: 100,
    counterId: 'default',
});

const localCount = ref(props.initialCount);
const localGoal = ref(props.initialGoal);
const sessionStartTime = ref(Date.now());
const goal = computed(() => localGoal.value);

const progressPercentage = computed(() => {
    if (goal.value <= 0) return 0;
    return Math.min((localCount.value / goal.value) * 100, 100);
});

const goalReached = computed(() => {
    return goal.value > 0 && localCount.value >= goal.value;
});

const getStorageKey = (suffix: string) => `dhikr_${props.counterId}_${suffix}`;

const saveToStorage = () => {
    localStorage.setItem(getStorageKey('count'), localCount.value.toString());
    localStorage.setItem(getStorageKey('goal'), localGoal.value.toString());

    // Save analytics data
    const analytics = JSON.parse(localStorage.getItem('dhikr_analytics') || '{}');
    const today = new Date().toISOString().split('T')[0];

    if (!analytics[today]) {
        analytics[today] = { sessions: 0, totalCount: 0, dhikrTypes: {} };
    }

    analytics[today].totalCount = localCount.value;
    analytics[today].dhikrTypes[props.counterId] = localCount.value;

    localStorage.setItem('dhikr_analytics', JSON.stringify(analytics));
};

const loadFromStorage = () => {
    const savedCount = localStorage.getItem(getStorageKey('count'));
    const savedGoal = localStorage.getItem(getStorageKey('goal'));

    if (savedCount) localCount.value = parseInt(savedCount);
    if (savedGoal) localGoal.value = parseInt(savedGoal);
};

const increment = () => {
    if (goal.value > 0 && localCount.value >= goal.value) return;

    localCount.value++;

    // Record increment interaction with learning service
    const dhikrId = props.dhikr?.id?.toString() || props.counterId;
    learningService.recordInteraction('increment', dhikrId);

    // Check if goal reached and record session
    if (goal.value > 0 && localCount.value >= goal.value) {
        recordDhikrSession();
    }

    saveToStorage();

    // Haptic feedback if supported
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }

    // Audio feedback (optional)
    playClickSound();
};

const reset = () => {
    if (confirm('Are you sure you want to reset the counter?')) {
        // Record session before reset if there was progress
        if (localCount.value > 0) {
            recordDhikrSession();
        }

        localCount.value = 0;
        sessionStartTime.value = Date.now(); // Reset session start time

        // Record reset interaction
        const dhikrId = props.dhikr?.id?.toString() || props.counterId;
        learningService.recordInteraction('reset', dhikrId);

        saveToStorage();
    }
};

const updateGoal = () => {
    const dhikrId = props.dhikr?.id?.toString() || props.counterId;
    const oldGoal = parseInt(localStorage.getItem(getStorageKey('goal')) || '0');

    // Record goal change interaction
    learningService.recordInteraction('goal_change', dhikrId, {
        newGoal: localGoal.value,
        oldGoal: oldGoal,
    });

    saveToStorage();
};

const recordDhikrSession = () => {
    const dhikrId = props.dhikr?.id?.toString() || props.counterId;
    const endTime = Date.now();

    learningService.recordSession(dhikrId, localCount.value, goal.value, sessionStartTime.value, endTime);

    // Reset session start time for next session
    sessionStartTime.value = Date.now();
};

const playClickSound = () => {
    // Create a simple click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch {
        // Audio context not supported, ignore
    }
};

// Watch for changes to save automatically
watch(localCount, saveToStorage);
watch(localGoal, saveToStorage);

onMounted(() => {
    loadFromStorage();

    // Set initial goal from dhikr if provided
    if (props.dhikr?.defaultGoal && localGoal.value === props.initialGoal) {
        localGoal.value = props.dhikr.defaultGoal;
    }
});
</script>
