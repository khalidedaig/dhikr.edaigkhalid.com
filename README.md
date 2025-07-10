# Digital Dhikr Application

A modern Laravel application with Vue.js for digital dhikr (Islamic prayer counter) built using `laravel new` with Vue scaffolding.

## Features

- **Digital Counter**: Easy-to-use tap counter with goal setting and progress tracking
- **Arabic Text Support**: Beautiful Arabic typography with proper RTL direction
- **Dark Mode**: Automatic dark/light mode with user preference saving
- **Analytics**: Track your spiritual practice with detailed analytics and insights
- **Responsive Design**: Mobile-first design that works on all devices
- **Local Storage**: Automatic saving of counter state and analytics
- **Multiple Dhikr Types**: Pre-defined dhikr collection with meanings and transliterations

## Tech Stack

- **Backend**: Laravel 12 with PHP 8.2+
- **Frontend**: Vue 3 with Composition API
- **Full-stack**: Inertia.js for SPA behavior
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Icons**: Lucide Vue Next
- **Testing**: Pest PHP
- **Storage**: LocalStorage for persistence

## Quick Start

The application is set up with all dependencies and has been built successfully. The Digital Dhikr features include:

### Pages Created:
- **Home** (`/`) - Landing page with feature overview
- **Tasbih** (`/tasbih`) - Main counter interface (requires authentication)
- **Dhikr List** (`/dhikr-list`) - Collection of traditional dhikr with counters
- **Analytics** (`/analytics`) - Usage statistics and insights (requires authentication)

### Components Created:
- **Layout** - Main application layout with navigation and dark mode toggle
- **Counter** - Reusable counter component with goal tracking
- **PasswordInput** - Password field with show/hide toggle

### Controller:
- **DhikrController** - Handles all dhikr-related routes and data

## Development

The application is currently running with:
```bash
composer run dev
```

This starts:
- Laravel development server (port 8001)
- Vite dev server (port 5174)
- Queue worker
- Log monitoring

## Features Implemented

✅ Digital counter with increment/reset functionality
✅ Goal setting and progress tracking
✅ LocalStorage persistence for counter state
✅ Dark/light mode toggle with system preference detection
✅ Responsive mobile-first design
✅ Arabic text support with proper fonts (Amiri, Scheherazade New)
✅ Multiple dhikr types with translations and meanings
✅ Analytics and usage tracking
✅ Authentication system integration
✅ Modern UI with Lucide icons
✅ TypeScript support throughout
✅ Accessibility features

## Arabic Fonts

The application includes Google Fonts integration for Arabic typography:
- **Amiri** - Traditional Arabic calligraphy font
- **Scheherazade New** - Modern Arabic text font

## Data Structure

The application stores data in LocalStorage:
- `dhikr_[counterId]_count` - Individual counter values
- `dhikr_[counterId]_goal` - Goal settings for each counter
- `dhikr_analytics` - Daily usage analytics and statistics

## Customization

The application can be easily customized by:
- Adding new dhikr to the `DhikrController::dhikrList()` method
- Modifying the CSS variables in `resources/css/app.css`
- Adding new counter types by extending the Counter component
- Implementing additional analytics in the Analytics page

## Browser Compatibility

- Modern browsers with ES2020+ support
- LocalStorage required for data persistence
- Optional: Vibration API for haptic feedback
- Optional: Web Audio API for sound feedback
