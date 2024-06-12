<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Detail;
use App\Models\Link;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    //[ページ遷移]商品
    public function ShowProduct()
    {
        $products =Product::where('is_enabled', 1)->get();;
        $hiddenProducts = Product::where('is_enabled', 0)->get();
        $details = Detail::all();
        return view("dash-product",compact("products","hiddenProducts","details"));
    }

    //[追加]商品
    public function AddProduct(Request $request)
    {

        // アップロードされたファイル名を取得
        $fileName = $request->file('img')->getClientOriginalName();

        //storageに保存（Laravelのデフォルト設定では、publicディスクは storage/app/public になっている）
        $request->file('img')->storeAs('public/img', $fileName);

        //商品情報の保存
        $product = new Product();
        $product->name = $request->name;
        $product->img = 'storage/img/'.$fileName;
        if($request->priority==null){
            $product->priority = 0;
        }else{
            $product->priority = $request->priority;
        }
        $product->price = $request->price;
        $product->is_enabled =1;
        $product->save();


        //Quillの保存
        DB::beginTransaction();
        try {
            $id = $product->id;

            // レコードを削除
            Detail::where("product_id",$id)->delete();

            $quillData = json_decode($request->quill_data, true);
            foreach ($quillData["ops"]  as $value){
                $detail = new Detail();
                $detail->product_id = $id;
                $detail->insert = $value["insert"];
                if (isset($value["attributes"])) {
                    $detail->attributes = json_encode($value["attributes"]);
                } else {
                    $detail->attributes = null;
                }
                $detail->save();
            };

            DB::commit();
            return redirect()->route('ShowProduct');
        } catch (\Exception $e) {
            DB::rollback();
            return ['msg' => $e->getMessage(), 'request' => $request->all()];
        }
    }

    //[更新]商品
    public function UpdateProduct(Request $request, Product $product)
    {
        $fileName =null;

        if($request->img!=null){
            $fileName = $request->file('img')->getClientOriginalName();
            $request->file('img')->storeAs('public/img', $fileName);
            $fileName = 'storage/img/'.$fileName;

            //以前に保存された画像ファイルのパスを取得
            $str = $product->img;
            //パスの不要な部分（storage/img/）を取り除き、実際のファイル名だけを残す
            $str = str_replace('storage/img/', '', $str);
            //disk('public') でpublic ディスク（ディレクトリ）を対象に操作し削除
            Storage::disk('public')->delete('img/' . $str);

        }else{
            $fileName = $product->img;
        }

        $product->update([
            "name" => $request->name,
            "img" => $fileName,
            "priority"=>$request->priority
        ]);

        //Quillの保存
        DB::beginTransaction();
        try {
            $id = $product->id;

            // レコードを削除
            Detail::where("product_id",$id)->delete();

            $quillData = json_decode($request->quill_data, true);
            foreach ($quillData["ops"]  as $value){
                $detail = new Detail();
                $detail->product_id = $id;
                $detail->insert = $value["insert"];
                if (isset($value["attributes"])) {
                    $detail->attributes = json_encode($value["attributes"]);
                } else {
                    $detail->attributes = null;
                }
                $detail->save();
            };

            DB::commit();
            return redirect()->route('ShowProduct');
        } catch (\Exception $e) {
            DB::rollback();
            return ['msg' => $e->getMessage(), 'request' => $request->all()];
        }
    }

    //[削除]商品
    public function DeleteProduct(Request $request)
    {
        // 商品テーブルから指定のIDのレコード1件を取得
        $product = Product::find($request->id);
        // レコードを削除
        $product->delete();

        //Quill（detailテーブルのデータ）削除
        Detail ::where('product_id', $request->id)->delete();

        // 削除したら一覧画面にリダイレクト
        return response()->json(['message' => 'Product deleted successfully']);
    }

    //[表示設定]商品
    public function ToggleProduct(Request $request)
    {
        // 商品テーブルから指定のIDのレコード1件を取得
        $product = Product::find($request->id);

        $num = null;

        if($product->is_enabled==0){
            $num =1;
        }else{
            $num =0;
        }
        // レコードを更新
        $product->update([
            "is_enabled"=>$num
        ]);
        // 更新したら一覧画面にリダイレクト
        return redirect()->route('ShowProduct');
    }

    //[ページ遷移]質問
    public function ShowQuestion()
    {
        //表示の質問をorder順に取得
        $questions = Question::where('is_enabled', 1)->orderBy('order')->get();

        // 非表示の質問をorder順に取得
        $hiddenQuestions = Question::where('is_enabled', 0)->orderBy('order')->get();

        // 全ての選択肢をorder順に取得
        $choices = Choice::orderBy('order')->get();

        // 質問と選択肢を格納する配列
        $data = [];

        foreach ($questions as $question) {
            // 有効な質問の配列
            $enabledQuestion = [
                'id'=>$question["id"],
                'question' => $question["text"],
                'choices' => []
            ];

            foreach ($choices as $choice) {
                if ($choice->question_id == $question->id) {
                    // 質問に紐づく選択肢を追加
                    $enabledQuestion['choices'][] = $choice["text"];
                }
            }

            // 有効な質問とその選択肢を配列に追加
            $data[] = $enabledQuestion;
        }

        return view("dash-question",compact("data","hiddenQuestions"));
    }

    //[表示設定]商品
    public function ToggleQuestion(Request $request)
    {
        // 質問テーブルから指定のIDのレコード1件を取得
        $question = Question::find($request->id);

        $num = null;

        if($question->is_enabled==0){
            $num =1;
        }else{
            $num =0;
        }
        // レコードを更新
        $question->update([
            "is_enabled"=>$num
        ]);
        // 更新したら一覧画面にリダイレクト
        return redirect()->route('ShowQuestion');
    }


//[ページ遷移]リンク
    public function ShowLink()
    {
        $data = Link::all();
        return view("dash-link", compact("data"));
    }

    //[追加]リンク
    public function AddLink(Request $request) {
        // バリデーションルールを定義
        $request->validate([
            'course' => ['required'],
            'price' => ['required'],
            'pickup_link' => ['url', 'nullable'],
            'delivery_link' => ['url', 'nullable'],
        ]);

        // トランザクションを開始
        DB::beginTransaction();
        try {
            // リンクモデルを使ってデータを作成し、保存
            $link = new Link();
            $link->course = $request->course;
            $link->price = $request->price;
            $link->pickup_link = $request->pickup_link;
            $link->delivery_link = $request->delivery_link;
            $link->save();

            // トランザクションをコミット
            DB::commit();

            // 成功した場合はリダイレクト
            return response()->json([
                'message' => 'リンクが正常に追加されました',
                'redirect' => route('ShowLink')
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('リンクの追加に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => 'リンクの追加に失敗しました'
            ], 500);
        }
    }

    //[更新]リンク
    public function UpdateLink(Request $request, $id) {
        $request->validate([
            'pickup_link' => ['required'],
            'delivery_link' => ['required'],
        ]);

        DB::beginTransaction();
        try {
            $link = Link::find($id);
            $link->pickup_link = $request->pickup_link;
            $link->delivery_link = $request->delivery_link;
            $link->save();

            DB::commit();

            return response()->json(['redirect' => route('ShowLink')]);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('リンク情報の更新に失敗しました' . $e->getMessage());
            return response()->json(['message' => 'リンクの更新に失敗しました'], 500);
        }
    }

    //[削除]リンク
    public function DeleteLink($id) {
        DB::beginTransaction();
        try {
            $link = Link::find($id);
            if ($link) {
                $link->delete();
                DB::commit();
                return response()->json(['message' => 'リンクが削除されました', 'redirect' => route('ShowLink')]);
            } else {
                DB::rollBack();
                return response()->json(['message' => 'リンクが見つかりませんでした'], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'リンクの削除中にエラーが発生しました'], 500);
        }
    }
}
