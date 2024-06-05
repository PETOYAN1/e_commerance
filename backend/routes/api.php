<?php

use App\Http\Controllers\Api\v1\AuthUserController;
use App\Http\Controllers\api\v1\BrandController;
use App\Http\Controllers\api\v1\ColorController;
use App\Http\Controllers\api\v1\FilterProductController;
use App\Http\Controllers\api\v1\ProductCategoryController;
use App\Http\Controllers\api\v1\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')->group(function () {
    Route::controller(AuthUserController::class)->group(function() {
        Route::post('/register', 'register');
        Route::post('/login', 'login')->name('login');
    });
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
});

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::post('/v1/logout', [AuthUserController::class, 'logout']);
});