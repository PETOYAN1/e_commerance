<?php

use App\Http\Controllers\Api\v1\AuthUserController;
use App\Http\Controllers\api\v1\BrandController;
use App\Http\Controllers\api\v1\ProductCategoryController;
use App\Http\Controllers\api\v1\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('v1')->as('v1')->group(function () {
    Route::controller(AuthUserController::class)->group(function() {
        Route::post('/register', 'register');
        Route::post('/login', 'login')->name('login');
    });
    ##Product Routes
    Route::resource('/products', ProductController::class);
    ##Category Routes
    Route::resource('/categories', ProductCategoryController::class);
    ##Brand Routes
    Route::get('/brands', [BrandController::class, 'index']);
});

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::post('/v1/logout', [AuthUserController::class, 'logout']);
});