<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\AdminController;

Route::get('/', [MainController::class, 'Index'])->name('Index');
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
    Route::post("/dashboard/product",[AdminController::class,"AddProduct"])->name("AddProduct");
    Route::post('/dashboard/product/{product}', [AdminController::class,"UpdateProduct"])->name('UpdateProduct');
    Route::delete("/dashboard/product",[AdminController::class,"DeleteProduct"])->name("DeleteProduct");
    Route::post("/dashboard/toggle-product",[AdminController::class,"ToggleProduct"])->name("ToggleProduct");

    //リンク
    Route::get("/dashboard/link",[AdminController::class,"ShowLink"])->name("ShowLink");
    Route::post("/dashboard/link",[AdminController::class,"AddLink"])->name("AddLink");
    Route::patch('/dashboard/link/{id}', [AdminController::class,"UpdateLink"])->name('UpdateLink');
    Route::delete('/dashboard/link/{id}', [AdminController::class,"DeleteLink"])->name('DeleteLink');

    //質問
    Route::get("/dashboard/question",[AdminController::class,"ShowQuestion"])->name("ShowQuestion");
    Route::post("/dashboard/question",[AdminController::class,"AddQuestion"])->name("AddQuestion");
    Route::post("/dashboard/choice",[AdminController::class,"AddChoice"])->name("AddChoice");
    Route::delete("/dashboard/question",[AdminController::class,"DeleteQuestion"])->name("DeleteQuestion");
    Route::delete("/dashboard/choice",[AdminController::class,"DeleteChoice"])->name("DeleteChoice");
    Route::post("/dashboard/toggle-question/",[AdminController::class,"ToggleQuestion"])->name("ToggleQuestion");
    Route::post('/dashboard/update-question-order', [AdminController::class, 'UpdateQuestionOrder']);
    Route::post('/dashboard/update-answer-order', [AdminController::class, 'UpdateAnswerOrder']);


    //属性追加
    Route::get("/dashboard/attribute",[AdminController::class,"ShowAddAttribute"])->name("ShowAddAttribute");
    Route::post("/dashboard/category",[AdminController::class,"AddCategory"])->name("AddCategory");
    Route::post("/dashboard/attribute",[AdminController::class,"AddAttribute"])->name("AddAttribute");
    Route::delete("/dashboard/category/{id}",[AdminController::class,"DeleteCategory"])->name("DeleteCategory");
    Route::delete("/dashboard/attribute/{id}",[AdminController::class,"DeleteAttribute"])->name("DeleteAttribute");

    //商品属性付与
    Route::get("/dashboard/attribute/product",[AdminController::class,"ShowProductAttribute"])->name("ShowProductAttribute");

    //質問属性付与
    Route::get("/dashboard/attribute/question",[AdminController::class,"ShowQuestionAttribute"])->name("ShowQuestionAttribute");
});

require __DIR__.'/auth.php';
