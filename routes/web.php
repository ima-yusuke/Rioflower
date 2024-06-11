<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\AdminController;

Route::get('/', [MainController::class, 'index'])->name('Index');
Route::get('/question', [MainController::class, 'ShowQuestionPage'])->name('ShowQuestionPage');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //商品
    Route::get("/dashboard/product",[AdminController::class,"ShowProduct"])->name("ShowProduct");
    Route::post("/dashboard/add-product",[AdminController::class,"AddProduct"])->name("AddProduct");
    Route::patch('/dashboard/update-product/{product}', [AdminController::class,"UpdateProduct"])->name('UpdateProduct');
    Route::post("/dashboard/delete-product/",[AdminController::class,"DeleteProduct"])->name("DeleteProduct");
    Route::post("/dashboard/toggle-product/",[AdminController::class,"ToggleProduct"])->name("ToggleProduct");

});

require __DIR__.'/auth.php';
