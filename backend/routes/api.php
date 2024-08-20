<?php

use App\Http\Controllers\Api\v1\AuthUserController;
use App\Http\Controllers\api\v1\BrandController;
use App\Http\Controllers\api\v1\ColorController;
use App\Http\Controllers\api\v1\FavoriteController;
use App\Http\Controllers\api\v1\FilterProductController;
use App\Http\Controllers\api\v1\ProductCategoryController;
use App\Http\Controllers\api\v1\ProductController;
use App\Http\Controllers\api\v1\SearchController;
use App\Http\Controllers\api\v1\VerificationController;
use App\Http\Controllers\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {
    Route::controller(AuthUserController::class)->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login')->name('login');
    });

    // Verify Email
    Route::get('email/verify/{id}', [VerificationController::class, 'verify'])->name('verification.verify');
    // Product Routes
    Route::apiResource('/products', ProductController::class);
    // Category Routes
    Route::apiResource('/categories', ProductCategoryController::class);
    // Brand Routes
    Route::apiResource('/brands', BrandController::class);
    // Filter Route
    Route::get('/products_filter', [FilterProductController::class, 'index']);
    // Color Route
    Route::get('/colors', [ColorController::class, 'index']);
    // Search Route
    Route::get('/search', [SearchController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('favorites/toggle', [FavoriteController::class, 'toggle']);
        Route::get('favorite', [FavoriteController::class, 'index']);
        Route::post('logout', [AuthUserController::class, 'logout']);
    });
});

Route::middleware(['auth:sanctum'])->get('v1/user', [AuthUserController::class, 'authUser']);

Route::get('/linkstorage', function () {
    Artisan::call('storage:link');
});