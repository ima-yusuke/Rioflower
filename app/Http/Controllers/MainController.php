<?php

namespace App\Http\Controllers;

use App\Models\Choice_attribute;
use App\Models\Product_attributes;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Question;

class MainController extends Controller
{
    // トップページ
    public function Index() {
        return view('index');
    }

    // 質問ページ
    public function ShowQuestionPage() {
        $products = Product::with(['details', 'link'])->get();
        $questions = Question::where('is_enabled', 1)
            ->orderBy('order')
            ->with(['choices' => function ($query) {
                $query->orderBy('order'); // choicesをorder順に取得
            }])
            ->get();
        $productAttributes = Product_attributes::all();
        $choiceAttributes = Choice_attribute::all();

        return view("question", compact( "products","questions","productAttributes","choiceAttributes"));
    }

    // 顧客データ送信
    public function AddCustomer() {

    }
}


