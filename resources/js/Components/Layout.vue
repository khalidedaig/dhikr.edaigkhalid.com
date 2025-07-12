<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
        <!-- Navigation -->
        <nav class="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <Link :href="route('home')" class="flex items-center space-x-2">
                            <div class="text-2xl">📿</div>
                            <span class="text-xl font-bold text-gray-900 dark:text-white">Dhikr</span>
                        </Link>
                    </div>

                    <!-- Desktop Navigation -->
                    <div class="hidden items-center space-x-4 md:flex">
                        <!-- Navigation Links -->
                        <Link
                            :href="route('tasbih')"
                            class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Tasbih
                        </Link>

                        <Link
                            :href="route('dhikr.list')"
                            class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Dhikr List
                        </Link>

                        <Link
                            :href="route('analytics')"
                            class="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            📊 Analytics
                        </Link>

                        <!-- Dark Mode Toggle -->
                        <button
                            @click="toggleDarkMode"
                            class="rounded-md p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                            aria-label="Toggle dark mode"
                        >
                            <Moon v-if="!isDark" :size="20" />
                            <Sun v-else :size="20" />
                        </button>

                        <!-- Authentication Links -->
                        <div v-if="$page.props.auth.user">
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <button
                                        class="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <UserInfo :user="$page.props.auth.user" />
                                        <ChevronDown :size="16" class="transition-transform duration-200" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" class="w-56">
                                    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <UserInfo :user="$page.props.auth.user" :show-email="true" />
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem as-child>
                                        <Link class="block w-full" :href="route('profile.edit')">
                                            <User class="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem as-child>
                                        <Link class="block w-full" :href="route('appearance')">
                                            <Settings class="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem as-child>
                                        <Link class="block w-full" method="post" :href="route('logout')" as="button">
                                            <LogOut class="mr-2 h-4 w-4" />
                                            Log out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div v-else class="flex items-center space-x-3">
                            <Link
                                :href="route('login')"
                                class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Login
                            </Link>
                            <Link
                                :href="route('register')"
                                class="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Register
                            </Link>
                        </div>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button
                            @click="mobileMenuOpen = !mobileMenuOpen"
                            class="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <Menu :size="20" />
                        </button>
                    </div>
                </div>

                <!-- Mobile Navigation Menu -->
                <div v-if="mobileMenuOpen" class="border-t border-gray-200 md:hidden dark:border-gray-700">
                    <div class="space-y-1 px-2 pt-2 pb-3">
                        <Link
                            :href="route('tasbih')"
                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Tasbih
                        </Link>
                        <Link
                            :href="route('dhikr.list')"
                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Dhikr List
                        </Link>
                        <Link
                            :href="route('analytics')"
                            class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            📊 Analytics
                        </Link>

                        <!-- Mobile Authentication Section -->
                        <div class="border-t border-gray-200 pt-2 dark:border-gray-700">
                            <div v-if="$page.props.auth.user" class="space-y-1">
                                <div class="flex items-center px-3 py-2">
                                    <UserInfo :user="$page.props.auth.user" :show-email="true" />
                                </div>
                                <Link
                                    :href="route('profile.edit')"
                                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Profile
                                </Link>
                                <Link
                                    :href="route('appearance')"
                                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Settings
                                </Link>
                                <Link
                                    :href="route('logout')"
                                    method="post"
                                    as="button"
                                    class="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Logout
                                </Link>
                            </div>
                            <div v-else class="space-y-1">
                                <Link
                                    :href="route('login')"
                                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Login
                                </Link>
                                <Link
                                    :href="route('register')"
                                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main class="py-8">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <slot />
            </div>
        </main>

        <!-- Footer -->
        <footer class="mt-12 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <p class="text-center text-sm text-gray-500 dark:text-gray-400">&copy; 2025 Dhikr. Made with ❤️ for the Muslim community.</p>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import UserInfo from '@/components/UserInfo.vue';
import { Link } from '@inertiajs/vue3';
import { ChevronDown, LogOut, Menu, Moon, Settings, Sun, User } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const mobileMenuOpen = ref(false);
const isDark = ref(false);

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    }
};

onMounted(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        isDark.value = true;
        document.documentElement.classList.add('dark');
    } else if (savedDarkMode === 'false') {
        isDark.value = false;
        document.documentElement.classList.remove('dark');
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            isDark.value = true;
            document.documentElement.classList.add('dark');
        }
    }
});
</script>
