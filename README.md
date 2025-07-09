# Digital Dhikr (ذِكر) Web Application

A modern digital Dhikr application built with Laravel, Inertia.js, Vue 3, and Tailwind CSS 4. This application provides an elegant way to count dhikr (Islamic remembrance) with persistent storage and customizable goals.

## 🎯 Features

### Core Functionality

-   **Digital Counter**: Large, touch-friendly counter with increment and reset buttons
-   **Goal Setting**: Set custom goals (e.g., 33, 100) with visual progress tracking
-   **Progress Tracking**: Real-time progress display (e.g., 25 / 33)
-   **LocalStorage Persistence**: Counter state persists across browser sessions
-   **Responsive Design**: Mobile-first design optimized for touch devices

### Dhikr Collection

-   **Predefined Dhikr**: Common Islamic remembrances with Arabic text
    -   سُبْحَانَ ٱللَّٰهِ (Subhan Allah) - 33 times
    -   ٱلْـحَمْدُ لِلَّٰهِ (Alhamdulillah) - 33 times
    -   ٱللَّٰهُ أَكْبَرُ (Allahu Akbar) - 34 times
    -   لَا إِلَٰهَ إِلَّا ٱللَّٰهُ (La ilaha illa Allah) - 100 times
    -   أَسْتَغْفِرُ ٱللَّٰهَ (Astaghfirullah) - 100 times
-   **Individual Counters**: Each dhikr has its own counter and reset functionality
-   **Arabic Typography**: Proper Arabic font rendering with RTL support

### User Interface

-   **Dark/Light Mode**: Automatic theme switching based on system preferences
-   **Arabic Text Support**: Google Fonts integration for beautiful Arabic typography
-   **Touch Feedback**: Visual feedback and animations for button interactions
-   **Navigation**: Clean navigation between pages

## 🏗️ Tech Stack

-   **Backend**: Laravel 12 with PHP
-   **Frontend**: Vue 3 with Composition API (`<script setup>`)
-   **Full-stack**: Inertia.js for SPA behavior without API
-   **Styling**: Tailwind CSS 4 with dark mode support
-   **Build Tool**: Vite for fast development and optimized builds
-   **Fonts**: Google Fonts (Amiri, Scheherazade New) for Arabic text
-   **Storage**: Browser LocalStorage for client-side persistence

## 📂 Project Structure

```
/
├── app/Http/Controllers/DhikrController.php   # Main controller
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   ├── Home.vue                       # Landing page
│   │   │   ├── Tasbih.vue                     # Main counter page
│   │   │   └── DhikrList.vue                  # Dhikr collection
│   │   ├── Components/
│   │   │   ├── Layout.vue                     # Navigation layout
│   │   │   └── Counter.vue                    # Reusable counter component
│   │   └── app.js                             # Vue app entry point
│   ├── css/app.css                            # Tailwind CSS 4 styles
│   └── views/app.blade.php                    # Main layout template
└── routes/web.php                             # Application routes
```

## 🚀 Getting Started

### Prerequisites

-   PHP 8.2+
-   Composer
-   Node.js 18+
-   npm

### Development

1. **Start the development server:**

    ```bash
    npm run dev
    ```

2. **In another terminal, serve the Laravel application:**

    ```bash
    php artisan serve
    ```

3. **Visit the application:**
   Open [http://localhost:8000](http://localhost:8000) in your browser

### Production Build

```bash
npm run build
```

## 📱 Pages and Routes

| Route          | Page      | Description                    |
| -------------- | --------- | ------------------------------ |
| `/`            | Home      | Welcome page with navigation   |
| `/dhikr`       | Tasbih    | Main counter with goal setting |
| `/dhikr-list`  | DhikrList | Collection of predefined dhikr |

## 🎨 Styling and Themes

The application uses Tailwind CSS 4 with:

-   **Dark Mode**: Automatic detection of system preferences
-   **Custom Theme**: Extended with Arabic fonts and custom animations
-   **Responsive Design**: Mobile-first approach with touch-friendly interfaces
-   **Arabic Typography**: Proper RTL text direction and font rendering

## 💾 Data Persistence

Counter states are stored in browser LocalStorage with the following structure:

```javascript
{
  "dhikr_count": 25,
  "dhikr_goal": 33,
  "dhikr_counters": {
    "1": { "count": 15, "goal": 33 },
    "2": { "count": 33, "goal": 33 }
  }
}
```

## 🔧 Configuration

### Tailwind CSS 4

The project uses Tailwind CSS 4 with custom configuration in `resources/css/app.css`:

-   Custom Arabic font variables
-   Animation utilities
-   Dark mode support

### Vue 3 Configuration

-   Composition API with `<script setup>`
-   Inertia.js integration for SPA behavior
-   Component-based architecture

## 🕌 Islamic Context

This application is designed to assist Muslims in performing dhikr (ذِكر), which is the remembrance of Allah. The dhikr included are based on authentic Islamic teachings and are commonly recited by Muslims worldwide.

May Allah accept our dhikr and grant us His mercy and blessings.

_آمين (Ameen)_
