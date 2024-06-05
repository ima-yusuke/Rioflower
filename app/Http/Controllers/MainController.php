<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Question;

class MainController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public $data = [
        ["id" => 1, "question" => "どんな雰囲気？", "answer" => ["シック", "モダン", "暗め", "明るめ", "エレガント","シンプル","華やか","その他"], "order" => 1],
        ["id" => 2, "question" => "誰に渡す？", "answer" => ["自分", "友人", "家族", "恋人", "その他"], "order" => 2],
        ["id" => 3, "question" => "いつ渡す？", "answer" => ["誕生日", "クリスマス", "卒業式", "その他"], "order" => 3],
        ["id" => 4, "question" => "なぜ渡す？", "answer" => ["感謝", "お祝い", "謝罪", "励まし", "その他"], "order" => 4],
        ["id" => 5, "question" => "どこで渡す？", "answer" => ["家", "レストラン", "公園", "学校", "その他"], "order" => 5],
        ["id" => 6, "question" => "渡すときの時間帯は？", "answer" => ["朝", "昼", "夕方", "夜", "その他"], "order" => 6]
    ];

    public function ShowQuestionPage()
    {
        $data = $this->data;
        $products = Product::all();
        $questions = Question::all();
        return view("question", compact("data", "products"));
    }
}


