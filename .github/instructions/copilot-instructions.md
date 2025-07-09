<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Digital Dhikr Application - Copilot Instructions

This is a Laravel application with Inertia.js and Vue 3 for creating a digital Dhikr (Islamic prayer counter) web application.

## Tech Stack

-   **Backend**: Laravel 12 with PHP
-   **Frontend**: Vue 3 with Composition API
-   **Full-stack**: Inertia.js for SPA behavior
-   **Styling**: Tailwind CSS 4
-   **Build Tool**: Vite
-   **Storage**: LocalStorage for persistence

## Project Structure

-   `app/Http/Controllers/DhikrController.php` - Main controller for Dhikr routes
-   `resources/js/Pages/` - Vue 3 pages (Home, Tasbih, DhikrList)
-   `resources/js/Components/` - Reusable Vue components (Layout, Counter)
-   `routes/web.php` - Application routes
-   `resources/css/app.css` - Tailwind CSS 4 styles

## Key Features

-   Digital counter with increment/reset functionality
-   Goal setting and progress tracking
-   LocalStorage persistence for counter state
-   Dark/light mode toggle
-   Responsive mobile-first design
-   Arabic text support with proper fonts
-   Vibration and audio feedback
-   Pre-defined dhikr collection
-   Auto-learning from conversation for personalized dhikr suggestions
-   Adaptive goal recommendations based on usage patterns
-   Context-aware dhikr recommendations (time of day, frequency)
-   Personal dhikr history and analytics

## Code Style Guidelines

-   Use Vue 3 Composition API with `<script setup>`
-   Follow Laravel naming conventions
-   Use Tailwind CSS classes for styling
-   Implement proper dark mode support
-   Use semantic HTML and accessibility features
-   Store counter state in LocalStorage
-   Include Arabic text with proper RTL direction

## Arabic Text Handling

-   Use proper Arabic Unicode characters
-   Apply RTL direction for Arabic text
-   Include Google Fonts (Amiri, Scheherazade New) for Arabic typography
-   Use `.arabic-text` CSS class for styling

## Responsive Design

-   Mobile-first approach with Tailwind CSS
-   Ensure touch-friendly buttons (min 44px)
-   Optimize for portrait and landscape orientations
-   Support dark mode preferences

## Auto-Learning Features

-   **Usage Pattern Analysis**: Track user dhikr patterns and frequency
-   **Smart Goal Suggestions**: Recommend goals based on historical completion rates
-   **Time-based Recommendations**: Suggest dhikr based on time of day and Islamic prayer times
-   **Progress Analytics**: Provide insights into spiritual practice consistency
-   **Adaptive Interface**: Personalize UI based on most-used dhikr
-   **Conversation Learning**: Learn from user interactions to improve recommendations
-   **Habit Formation**: Encourage consistent practice through gentle reminders

## Data Structure for Learning

-   Store usage analytics in LocalStorage with privacy-first approach
-   Track completion rates, preferred times, and goal achievement patterns
-   Use aggregated data to provide personalized insights
-   Implement learning algorithms for better user experience
