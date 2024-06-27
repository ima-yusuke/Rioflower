<?php

namespace App\Http\Controllers;

use App\Models\Choice_attribute;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Detail;
use App\Models\Word;
use App\Models\Link;
use App\Models\Question;
use App\Models\Product_attributes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Mail\CustomerRegistered;
use Illuminate\Support\Facades\Mail;

class MainController extends Controller
{
    // トップページ
    public function Index() {
        return view('index');
    }

    // 質問ページ
    public function ShowQuestionPage() {
        $products = Product::with(['details', 'link'])
            ->where('is_enabled', 1)
            ->get();
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

    //注文確認ページ
    public function ShowCheck(Request $request) {
        $name = $request->session()->get('name');
        $address = $request->session()->get('address');
        $email = $request->session()->get('email');
        $product_id = $request->session()->get('product_id');

        return view('check', compact('name', 'address', 'email', 'product_id'));
    }

    // フォーム送信
    public function SubmitForm(Request $request) {
        $name = $request->input('customer-name');
        $address = $request->input('customer-address');
        $email = $request->input('customer-mail');
        $product_id = $request->input('product_id');

        // フォームデータをセッションに保存
        $request->session()->flash('name', $name);
        $request->session()->flash('address', $address);
        $request->session()->flash('email', $email);
        $request->session()->flash('product_id', $product_id);

        return redirect()->route('ShowCheck');
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

            // 追加データの取得
            $product = Product::find($request->product_id);
            $details = Detail::where('product_id', $request->product_id)->get();
            $word = Word::first();
            $link = Link::where('id', $product->price)->first();

            DB::commit();

            // メール送信
            $mail = new CustomerRegistered($customer, $product, $details, $word, $link);
            Mail::to($customer->email)
                ->bcc('bcc@example.com') // BCCに追加のアドレス
                ->send($mail);

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


