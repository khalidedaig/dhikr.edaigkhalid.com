<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DhikrController;

Route::get('/', [DhikrController::class, 'index'])->name('home');
Route::get('/dhikr', [DhikrController::class, 'tasbih'])->name('dhikr');
Route::get('/dhikr-list', [DhikrController::class, 'dhikrList'])->name('dhikr.list');
