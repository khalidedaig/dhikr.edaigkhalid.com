<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Navigation -->
        <nav
            class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        >
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <Link href="/" class="flex items-center space-x-2">
                            <div class="text-2xl">📿</div>
                            <span
                                class="text-xl font-bold text-gray-900 dark:text-white"
                                >Dhikr</span
                            >
                        </Link>
                    </div>

                    <div class="flex items-center space-x-4">
                        <!-- Navigation Links -->
                        <Link
                            href="/tasbih"
                            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            :class="
                                isCurrentRoute('tasbih')
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                            "
                        >
                            Tasbih
                        </Link>

                        <Link
                            href="/dhikr-list"
                            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            :class="
                                isCurrentRoute('dhikr-list')
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                            "
                        >
                            Dhikr List
                        </Link>

                        <Link
                            href="/analytics"
                            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            :class="
                                isCurrentRoute('analytics')
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                            "
                        >
                            📊 Analytics
                        </Link>

                        <!-- Dark Mode Toggle -->
                        <button
                            @click="toggleDarkMode"
                            class="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            <svg
                                v-if="!isDark"
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                ></path>
                            </svg>
                            <svg
                                v-else
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <slot />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Link, usePage } from "@inertiajs/vue3";

const isDark = ref(false);
const page = usePage();

onMounted(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    isDark.value = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    updateDarkMode();
});

function toggleDarkMode() {
    isDark.value = !isDark.value;
    updateDarkMode();
    localStorage.setItem("theme", isDark.value ? "dark" : "light");
}

function updateDarkMode() {
    if (isDark.value) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

function isCurrentRoute(routeName) {
    return page.url.includes(`/${routeName}`);
}
</script>
