<?php

use App\Http\Controllers\api\v1\VerificationController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('email_verify', [VerificationController::class, 'index'])->name('email-verify');
// require __DIR__.'/auth.php';
