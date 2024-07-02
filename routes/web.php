<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
use App\Http\Controllers\AdminController;

//TOPページ
Route::get('/', [MainController::class, 'Index'])->name('Index');
//質問ページ
Route::get('/question', [MainController::class, 'ShowQuestionPage'])->name('ShowQuestionPage');
//購入確認ページ
Route::get('/check', [MainController::class, 'ShowCheck'])->name('ShowCheck');
Route::post('/check', [MainController::class, 'AddCustomer'])->name('AddCustomer');
//確認ページフォーム送信
Route::post('/submit-form', [MainController::class, 'SubmitForm'])->name('SubmitForm');
//顧客情報のセッション削除
Route::post('/clear-session', function () {
    session()->flush(); // セッションをクリアする
    return response()->json(['message' => 'セッションをクリアしました']);
});


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
    Route::get("/dashboard/attribute/product",[AdminController::class,"ShowAttributeProduct"])->name("ShowAttributeProduct");
    Route::post("/dashboard/attribute/product",[AdminController::class,"AddAttributeProduct"])->name("AddAttributeProduct");
    Route::delete("/dashboard/attribute/product/{id}",[AdminController::class,"DeleteAttributeProduct"])->name("DeleteAttributeProduct");
    Route::delete("/dashboard/attribute/product/{id}",[AdminController::class,"AllDeleteAttributeProduct"])->name("AllDeleteAttributeProduct");

    //質問属性付与
    Route::get("/dashboard/attribute/question",[AdminController::class,"ShowAttributeQuestion"])->name("ShowAttributeQuestion");
    Route::post("/dashboard/attribute/question",[AdminController::class,"AddAttributeQuestion"])->name("AddAttributeQuestion");
    Route::delete("/dashboard/attribute/question/{id}",[AdminController::class,"DeleteAttributeQuestion"])->name("DeleteAttributeQuestion");

    //メール
    Route::get("/dashboard/word",[AdminController::class,"ShowWord"])->name("ShowWord");
    Route::PATCH("/dashboard/word/{id}",[AdminController::class,"UpdateWord"])->name("UpdateWord");
});

require __DIR__.'/auth.php';
