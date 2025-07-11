<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

defineProps<Props>();
</script>

<template>
    <div class="py- relative rounded-2xl border border-primary/20 bg-primary/10 px-10 py-3">
        <div :class="className" v-bind="$attrs" class="flex items-center justify-center">
            <Link :href="route('home')" class="flex items-center space-x-2">
                <div class="text-2xl">📿</div>
                <span class="text-xl font-bold text-gray-900 dark:text-white">Dhikr</span>
            </Link>
        </div>
    </div>
</template>
