<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/test-email', [TestController::class, 'sendTestEmail']);

// require __DIR__.'/auth.php';
