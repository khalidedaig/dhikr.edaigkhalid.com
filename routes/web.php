<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DhikrController;

Route::get('/', [DhikrController::class, 'index'])->name('home');

// Public routes
Route::get('/dhikr-list', [DhikrController::class, 'dhikrList'])->name('dhikr.list');

// Protected routes that require authentication and email verification
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/tasbih', [DhikrController::class, 'tasbih'])->name('tasbih');
    Route::get('/analytics', [DhikrController::class, 'analytics'])->name('analytics');
});

// Include authentication routes
require __DIR__ . '/auth.php';
