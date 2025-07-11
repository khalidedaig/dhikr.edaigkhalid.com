<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { Link } from '@inertiajs/vue3';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted/20 p-4 md:p-8">
        <!-- Background decorative elements -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
            <div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/5 blur-3xl"></div>
        </div>

        <div class="relative w-full max-w-md">
            <div class="space-y-8 rounded-2xl border border-border bg-card p-8 shadow-xl shadow-black/5">
                <!-- Logo and branding -->
                <div class="space-y-4 text-center">
                    <Link :href="route('home')" class="group inline-flex flex-col items-center gap-3 transition-all duration-200 hover:scale-105">
                        <div class="relative">
                            <!-- Glowing background effect -->
                            <div class="absolute inset-0 scale-110 rounded-2xl bg-primary/20 blur-lg"></div>
                            <AppLogoIcon class="h-8 w-8 text-primary" />
                        </div>
                        <span class="text-lg font-semibold text-foreground transition-colors group-hover:text-primary"> Dhikr </span>
                    </Link>

                    <div class="space-y-2">
                        <h1 class="text-2xl font-bold text-foreground">{{ title }}</h1>
                        <p class="text-sm leading-relaxed text-muted-foreground">{{ description }}</p>
                    </div>
                </div>

                <!-- Main content -->
                <div class="space-y-6">
                    <slot />
                </div>
            </div>

            <!-- Footer note -->
            <div class="mt-8 text-center">
                <p class="text-xs text-muted-foreground">Secure authentication powered by Laravel</p>
            </div>
        </div>
    </div>
</template>
