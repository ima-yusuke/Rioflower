<?php

namespace App\Http\Controllers;

use App\Models\Choice_attribute;
use App\Models\Customer;
use App\Models\Forward;
use App\Models\Product;
use App\Models\Detail;
use App\Models\Word;
use App\Models\Link;
use App\Models\Question;
use App\Models\Product_attributes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
class MainController extends Controller
{
    // トップページ
    public function Index() {
        return view('index');
    }

    // 質問ページ
    public function ShowQuestionPage(Request $request) {
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

        $name = $request->session()->get('name');
        $address = $request->session()->get('address');
        $email = $request->session()->get('email');

        return view("question", compact( "products","questions","productAttributes","choiceAttributes"), ['name' => $name, 'address' => $address, 'email' => $email]);
    }

    //注文確認ページ
    public function ShowCheck(Request $request) {
        $name = $request->session()->get('name');
        $address = $request->session()->get('address');
        $email = $request->session()->get('email');
        $product_id = $request->session()->get('product_id');

        //追加データの取得
        $product = Product::find($product_id);
        $details = Detail::where('product_id', $product_id)->get();
        $word = Word::first();
        $link = Link::where('id', $product->price)->first();
        $showLinkArea = false;

        return view('check', compact('name', 'address', 'email', 'product_id', 'product', 'details', 'word', 'link', 'showLinkArea'));
    }

    // フォーム送信
    public function SubmitForm(Request $request) {
        $name = $request->input('customer-name');
        $address = $request->input('customer-address');
        $email = $request->input('customer-mail');
        $product_id = $request->input('product_id');

        // フォームデータをセッションに保存
        $request->session()->put('name', $name);
        $request->session()->put('address', $address);
        $request->session()->put('email', $email);
        $request->session()->put('product_id', $product_id);

        return redirect()->route('ShowCheck');
    }

    // 顧客データ・メール送信
    public function AddCustomer(Request $request) {
        // トランザクションを開始
        DB::beginTransaction();
        try {
            $customer = new Customer();
            $customer->name = $request->name;
            $customer->address = $request->address;
            $customer->email = $request->email;
            $customer->product_id = $request->product_id;
            $customer->save();

            // BCCメールアドレスを取得
            $bccEmails = Forward::whereNotNull('email')->pluck('email')->toArray();

            DB::commit();

            Mail::send('emails.customer_registered', ['html' => $request->html], function ($message) use ($request, $bccEmails) {
                $message->to($request->email);
                $message->subject('購入リンクのお知らせ');
                $message->from('nozaki@mie-projectm.com');
                $message->bcc($bccEmails); // BCCに追加
            });

            return ['message' => 'メールを送信しました。', 'result' => $request->all()];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('登録に失敗しました。' . $e->getMessage());

            return response()->json([
                'message' => '登録に失敗しました。',
            ], 500);
        }
    }
}


