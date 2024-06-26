<?php

namespace App\Http\Controllers;

use App\Models\Choice_attribute;
use App\Models\Customer;
use App\Models\Product_attributes;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Question;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
    public function AddCustomer(Request $request) {
        // バリデーションルールを定義
        $validator = \Validator::make($request->all(), [
            'name' => ['required'],
            'address' => ['required'],
            'email' => ['required', 'email'],
        ], [
            'name.required' => '名前を入力してください',
            'address.required' => '住所を入力してください',
            'email.required' => 'メールアドレスを入力してください',
            'email.email' => 'メールアドレスの形式で入力してください',
        ]);

        // バリデーションエラーが発生した場合の処理
        if ($validator->fails()) {
            return response()->json([
                'message' => '入力エラーがあります。',
                'errors' => $validator->errors()
            ], 422);
        }

        // トランザクションを開始
        DB::beginTransaction();
        try {
            $customer = new Customer();
            $customer->name = $request->name;
            $customer->address = $request->address;
            $customer->email = $request->email;
            $customer->product_id = $request->product_id;
            $customer->save();

            DB::commit();

            return response()->json([
                'message' => '登録が完了しました。',
                'customer' => $customer
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('登録に失敗しました。' . $e->getMessage());

            return response()->json([
                'message' => '登録に失敗しました。',
            ], 500);
        }
    }
}


