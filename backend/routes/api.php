<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\OrderController as AdminOrderController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\TempImagetController;
use App\Http\Controllers\user\AccountController;
use App\Http\Controllers\user\OrderController;
use App\Http\Controllers\user\ProductController as UserProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/admin/login',[AuthController::class,'authenticate']);
Route::get('get-latest-products',[UserProductController::class,'latestProducts']);
Route::get('get-featured-products',[UserProductController::class,'featuredProducts']);
Route::get('get-categories',[UserProductController::class,'getCategories']);
Route::get('get-products',[UserProductController::class,'getProducts']);
Route::get('get-product/{id}',[ProductController::class , "show"]);
Route::post('register', [AccountController::class,'register']);
Route::post('login', [AccountController::class,'authenticate']);

Route::group(['middleware' => ['auth:sanctum','checkUserRole']],function(){
    Route::post('save-order', [OrderController::class,'saveOrder']);
    Route::get('get-order-details/{id}', [AccountController::class,'getOrderDetail']);
    Route::put('/update-profile', [AccountController::class, 'updateProfile']);
    Route::get('get-orders', [AccountController::class,'orders']);
});

Route::group(['middleware' => ['auth:sanctum' , 'checkAdminRole']],function(){
    Route::apiResource('categories',CategoryController::class);
    Route::apiResource('products',ProductController::class);
    Route::apiResource('orders',AdminOrderController::class);
    Route::post('temp-image',[TempImagetController::class,'store']);
    Route::post('save-product-image',[ProductController::class,'saveProductImage']);
    Route::post('change-product-default-image',[ProductController::class,'updateDefaultImage']);
});
