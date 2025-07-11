---
applyTo: '**'
---

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Dhikr Application - Copilot Instructions

This is a Laravel application with Inertia.js and Vue 3 for creating a Dhikr (Islamic prayer counter) web application.

## Tech Stack

- **Backend**: Laravel 12 with PHP
- **Frontend**: Vue 3 with Composition API and TypeScript
- **Full-stack**: Inertia.js for SPA behavior
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite with TypeScript support
- **Storage**: LocalStorage for persistence
- **Icons**: Lucide Vue Next (lucide-vue-next) for modern, lightweight SVG icons

## Project Structure

- `app/Http/Controllers/DhikrController.php` - Main controller for Dhikr routes
- `resources/js/Pages/` - Vue 3 pages (Home, Tasbih, DhikrList, Analytics, Auth pages)
- `resources/js/Components/` - Reusable Vue components (Layout, Counter, PasswordInput, LearningInsights)
- `resources/js/Services/LearningService.ts` - Analytics and learning service for data tracking
- `routes/web.php` - Application routes
- `resources/css/app.css` - Tailwind CSS 4 styles

## Key Features

- Digital counter with increment/reset functionality
- Goal setting and progress tracking
- LocalStorage persistence for counter state
- Dark/light mode toggle
- Responsive mobile-first design
- Arabic text support with proper fonts
- Vibration and audio feedback
- Pre-defined dhikr collection
- **Comprehensive Analytics Dashboard** with visual progress tracking
- **Daily, Weekly & Streak Analytics** with detailed statistics
- **Dhikr Type Breakdown** showing usage patterns per dhikr type
- **Visual Progress Charts** with 7-day history visualization
- **Learning Insights Integration** with personalized recommendations
- Auto-learning from conversation for personalized dhikr suggestions
- Adaptive goal recommendations based on usage patterns
- Context-aware dhikr recommendations (time of day, frequency)
- Personal dhikr history and analytics
- **Password toggle functionality** with show/hide password feature
- **Authentication system** with modern UI/UX
- **Reusable components** for consistent design patterns

## Code Style Guidelines

- Use Vue 3 Composition API with `<script setup>`
- **Use TypeScript** for all frontend code with proper type definitions
- Follow Laravel naming conventions
- Use Tailwind CSS classes for styling
- Implement proper dark mode support
- Use semantic HTML and accessibility features
- Store counter state in LocalStorage
- Include Arabic text with proper RTL direction
- **Use Lucide icons** for consistent, modern iconography
- **Create reusable components** for common UI patterns
- **Ensure accessibility** with proper ARIA labels and keyboard navigation

## TypeScript Guidelines

- **Strict Typing**: Use `<script setup lang="ts">` in all Vue components
- **Interface Definitions**: Define clear interfaces for data structures (DayStats, Analytics, DhikrSession)
- **Type Safety**: Leverage TypeScript's type checking for better code quality
- **Import Types**: Use `type` imports for type-only imports (e.g., `import type { AnalyticsSummary }`)
- **Computed Types**: Properly type computed properties and reactive references
- **Props & Emits**: Define prop types and emit events with TypeScript
- **Service Types**: Use TypeScript for service classes like LearningService
- **Error Handling**: Type-safe error handling with proper type guards

## Arabic Text Handling

- Use proper Arabic Unicode characters
- Apply RTL direction for Arabic text
- Include Google Fonts (Amiri, Scheherazade New) for Arabic typography
- Use `.arabic-text` CSS class for styling

## Icon System

- **Primary Library**: Lucide Vue Next (lucide-vue-next)
- **Tree-shakable imports**: Only import icons you actually use
- **Consistent sizing**: Use appropriate size props (e.g., :size="20")
- **Color theming**: Apply hover states with emerald color theme
- **Accessibility**: Include proper ARIA labels for icon buttons

## Authentication Features

- **PasswordInput Component**: Reusable password field with show/hide toggle
- **Modern UI**: Clean design without intrusive outlines
- **Accessibility**: Full keyboard navigation and screen reader support
- **Error handling**: Integrated with Laravel form validation
- **Responsive design**: Mobile-optimized authentication forms

## Responsive Design

- Mobile-first approach with Tailwind CSS
- Ensure touch-friendly buttons (min 44px)
- Optimize for portrait and landscape orientations
- Support dark mode preferences

## Auto-Learning Features

- **Usage Pattern Analysis**: Track user dhikr patterns and frequency
- **Smart Goal Suggestions**: Recommend goals based on historical completion rates
- **Time-based Recommendations**: Suggest dhikr based on time of day and Islamic prayer times
- **Progress Analytics**: Provide insights into spiritual practice consistency
- **Adaptive Interface**: Personalize UI based on most-used dhikr
- **Conversation Learning**: Learn from user interactions to improve recommendations
- **Habit Formation**: Encourage consistent practice through gentle reminders
- **Streak Tracking**: Monitor daily consistency and longest streaks
- **Performance Insights**: Identify best performance days and patterns
- **Dhikr Type Analytics**: Track usage distribution across different dhikr types

## Data Structure for Learning

- Store usage analytics in LocalStorage with privacy-first approach
- Track completion rates, preferred times, and goal achievement patterns
- Use aggregated data to provide personalized insights
- Implement learning algorithms for better user experience
- **Analytics Interface**: DayStats with sessions, totalCount, and dhikrTypes
- **Session Tracking**: DhikrSession objects with timestamps and metadata
- **Insights Generation**: PersonalizedInsights with consistency and optimization data
- **Summary Analytics**: AnalyticsSummary with streaks, averages, and performance metrics

## Component Library

- **PasswordInput**: Reusable password field with toggle functionality
- **Counter**: Dhikr counter with goal tracking
- **Layout**: Main application layout with navigation
- **LearningInsights**: AI-powered usage analytics and recommendations
- **Analytics Page**: Comprehensive dashboard with visual progress tracking
- **Weekly Chart**: 7-day progress visualization with bar charts
- **Stats Cards**: Summary cards for daily totals, streaks, and averages
- **Dhikr Breakdown**: Type-specific usage analytics and insights

## Analytics System

- **Dashboard Overview**: Analytics.vue provides comprehensive tracking visualization
- **Data Sources**: Dual analytics system (legacy + LearningService integration)
- **Key Metrics**: Today's total, streak days, weekly averages, dhikr type breakdown
- **Visual Elements**: Progress bars, stat cards, 7-day bar charts, gradient insight cards
- **Real-time Updates**: Computed properties for reactive analytics display
- **Streak Calculation**: Automatic streak detection with fallback to legacy calculation
- **Performance Tracking**: Best day identification and consistency messaging
- **Type Mapping**: Display name conversion for dhikr types (Subhan Allah, Alhamdulillah, etc.)
- **Error Handling**: Graceful fallbacks when analytics data is unavailable
- **Data Validation**: Safe access to analytics properties with default values

## Dependencies

- **Core**: Laravel 12, Vue 3, Inertia.js, Tailwind CSS 4
- **Icons**: lucide-vue-next for modern SVG icons
- **Build**: Vite for fast development and optimized builds
- **Fonts**: Google Fonts (Amiri, Scheherazade New) for Arabic typography
