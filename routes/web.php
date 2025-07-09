<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DhikrController;

Route::get('/', [DhikrController::class, 'index'])->name('home');
Route::get('/tasbih', [DhikrController::class, 'tasbih'])->name('tasbih');
Route::get('/dhikr-list', [DhikrController::class, 'dhikrList'])->name('dhikr.list');
Route::get('/analytics', [DhikrController::class, 'analytics'])->name('analytics');
