<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasbihController;

Route::get('/', [TasbihController::class, 'index'])->name('home');
Route::get('/tasbih', [TasbihController::class, 'tasbih'])->name('tasbih');
Route::get('/dhikr', [TasbihController::class, 'dhikrList'])->name('dhikr.list');
