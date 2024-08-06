<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Choice;
use App\Models\Forward;
use App\Models\Image;
use App\Models\Word;
use App\Models\Product_attributes;
use App\Models\Question;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Detail;
use App\Models\Link;
use App\Models\Attribute;
use App\Models\Choice_attribute;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    //[ページ遷移]商品
    public function ShowProduct()
    {
        $products = Product::where('is_enabled', 1)->get();;
        $hiddenProducts = Product::where('is_enabled', 0)->get();
        $details = Detail::all();
        $links = Link::all();
        return view("dash-product", compact("products", "hiddenProducts", "details","links"));
    }

    //[追加]商品
    public function AddProduct(Request $request)
    {
        // トランザクションの開始
        DB::beginTransaction();

        try {
            // アップロードされたファイル名を取得
            $fileName = $request->file('img')->getClientOriginalName();

            // 商品情報の保存
            $product = new Product();
            $product->name = $request->name;
            $product->img = 'storage/img/' . $fileName;
            $product->priority = $request->priority;
            $product->price = $request->price;
            $product->is_enabled = 1;
            $product->save();

            // 画像を保存するディレクトリのパスを生成
            $directoryPath = storage_path('app/public/img/' . $product->id);

            // ディレクトリが存在しない場合は作成し、パーミッションを設定
            if (!file_exists($directoryPath)) {
                mkdir($directoryPath, 0755, true);
                chmod($directoryPath, 0755);
            }

            // storageに画像ファイル保存
            $request->file('img')->storeAs('public/img/' . $product->id, $fileName);

            // 画像パスを更新
            $product->img = 'storage/img/' . $product->id . '/' . $fileName;
            $product->save();

            // Quillの保存
            Detail::where("product_id", $product->id)->delete(); // 既存のデータを削除

            $quillData = json_decode($request->quill_data, true);
            foreach ($quillData["ops"] as $value) {
                $detail = new Detail();
                $detail->product_id = $product->id;
                $detail->insert = $value["insert"];
                $detail->attributes = isset($value["attributes"]) ? json_encode($value["attributes"]) : null;
                $detail->save();
            }

            // トランザクションのコミット
            DB::commit();

            // 成功レスポンスを返す
            return response()->json([
                'message' => '商品が正常に追加されました',
                'redirect' => route('ShowProduct')
            ], 200);
        } catch (\Exception $e) {
            // トランザクションのロールバック
            DB::rollback();

            // エラーレスポンスを返す
            return response()->json([
                'message' => '商品追加に失敗しました',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //[更新]商品
    public function UpdateProduct(Request $request, $id)
    {
        // 商品を取得
        $product = Product::find($id);

        // 画像の更新処理
        if ($request->hasFile('img')) {
            $fileName = $request->file('img')->getClientOriginalName();
            $newImgPath = 'public/img/' . $product->id;

            // 以前の画像を削除
            Storage::disk('public')->deleteDirectory('img/' . $product->id);

            // 新しいディレクトリを作成し、パーミッションを設定
            $directoryPath = storage_path('app/public/img/' . $product->id);
            if (!file_exists($directoryPath)) {
                mkdir($directoryPath, 0755, true);
                chmod($directoryPath, 0755);
            }

            // 新しい画像を保存
            $request->file('img')->storeAs($newImgPath, $fileName);
            $product->img = 'storage/img/' . $product->id . '/' . $fileName;
        }

        // 商品情報の更新
        $product->name = $request->name;
        $product->price = $request->price;
        $product->priority = $request->priority;
        $product->save();

        // Quillデータの保存
        DB::beginTransaction();
        try {
            // Detailレコードを削除
            Detail::where("product_id", $id)->delete();

            // 新しいQuillデータを保存
            $quillData = json_decode($request->quill_data, true);
            foreach ($quillData["ops"] as $value) {
                $detail = new Detail();
                $detail->product_id = $id;
                $detail->insert = $value["insert"];
                $detail->attributes = isset($value["attributes"]) ? json_encode($value["attributes"]) : null;
                $detail->save();
            }

            DB::commit();
            return response()->json([
                'message' => '商品が正常に更新されました',
                'redirect' => route('ShowProduct')
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => '商品更新に失敗しました',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //[削除]商品
    public function DeleteProduct(Request $request)
    {
        try {
            // 商品テーブルから指定のIDのレコード1件を取得
            $product = Product::find($request->id);

            if (!$product) {
                return response()->json([
                    'message' => '削除対象の商品が見つかりませんでした',
                ], 404);
            }

            // ディレクトリを削除
            $directoryPath = 'img/' . $product->id;
            if (Storage::disk('public')->exists($directoryPath)) {
                Storage::disk('public')->deleteDirectory($directoryPath);
            }

            // レコードを削除
            $product->delete();

            // JSONレスポンスを返す
            return response()->json([
                'message' => '商品が正常に削除されました',
                'redirect' => route('ShowProduct')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => '商品の削除に失敗しました',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //[表示設定]商品
    public function ToggleProduct(Request $request)
    {
        try {
            // 商品テーブルから指定のIDのレコード1件を取得
            $product = Product::find($request->id);

            if (!$product) {
                return response()->json(['message' => '対象商品が見つかりませんでした'], 404);
            }

            // レコードを更新
            $product->is_enabled = $request->is_enabled;
            $product->save();

            // JSONレスポンスを返す
            return response()->json([
                'message' => '表示設定の変更が完了しました',
                'redirect' => route('ShowProduct')
            ]);
        } catch (\Exception $e) {
            // エラーが発生した場合の処理
            return response()->json([
                'message' => '表示設定の変更に失敗しました',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    //[ページ遷移]質問
    public function ShowQuestion()
    {
        // 表示の質問をorder順に取得し、関連する選択肢も取得
        $questions = Question::where('is_enabled', 1)
            ->orderBy('order')
            ->with(['choices' => function ($query) {
                $query->orderBy('order'); // choicesをorder順に取得
            }])
            ->get();

        // 非表示の質問をorder順に取得
        $hiddenQuestions = Question::where('is_enabled', 0)
            ->orderBy('order')
            ->get();

        return view("dash-question", compact("questions", "hiddenQuestions"));
    }

    //【追加】質問
    public function AddQuestion(Request $request)
    {
        // Start a database transaction
        DB::beginTransaction();
        try {

            //orderを計算
            $maxOrder = Question::max('order');
            $newOrder = $maxOrder !== null ? $maxOrder + 1 : 1;

            // Save the question
            $question = new Question();
            $question->text = $request->question;
            $question->order = $newOrder;
            $question->is_enabled = 1;
            $question->save();

            // Save the answers
            foreach ($request->answers as $idx=>$answerText) {
                $answer = new Choice();
                $answer->question_id = $question->id;
                $answer->text = $answerText;
                $answer->order =$idx+1;
                $answer->save();
            }

            // Commit the transaction
            DB::commit();

            // Return a successful response with a redirect URL
            return response()->json([
                'message' => '質問が正常に追加されました',
                'redirect' => route('ShowQuestion')
            ], 200);
        } catch (\Exception $e) {
            // Rollback the transaction on error
            DB::rollback();
            Log::error('質問の追加に失敗しました: ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'message' => '質問の追加に失敗しました'
            ], 500);
        }
    }

    //【追加】回答
    public function AddChoice(Request $request) {
        DB::beginTransaction();
        try {
            //order計算
            $maxOrder = Choice::where('question_id', $request->id)->max('order');
            $newOrder = $maxOrder !== null ? $maxOrder + 1 : 1;

            $choice = new Choice();
            $choice->text = $request->choice;
            $choice->question_id = $request->id;
            $choice->order = $newOrder;
            $choice->save();

            DB::commit();
            return response()->json([
                'message' => '回答が正常に追加されました',
                'redirect' => route('ShowQuestion'),
                'accordionId'=>$request->accordionId
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => '回答の追加に失敗しました'], 500);
        }
    }

    //【削除】質問
    public function DeleteQuestion(Request $request)
    {
        try {
            // 質問を取得し削除
            $question = Question::findOrFail($request->id);
            $question->delete();

            return response()->json([
                    'message' => '質問とそれに対応する回答が正常に削除されました',
                    'redirect' => route('ShowQuestion')
                ], 200);
        } catch (\Exception $e) {
            Log::error('質問の削除に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => '質問の削除に失敗しました'
            ], 500);
        }
    }

    //【削除】回答
    public function DeleteChoice(Request $request)
    {
        try {
            // 回答を取得し削除
            $choice = Choice::findOrFail($request->id);
            $choice->delete();

            return response()->json([
                'message' => ' 回答が正常に削除されました',
                'redirect' => route('ShowQuestion'),
                'accordionId'=>$request->accordionId
            ], 200);
        } catch (\Exception $e) {
            Log::error('回答の削除に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => '回答の削除に失敗しました'
            ], 500);
        }
    }

    //質問order
    public function UpdateQuestionOrder(Request $request)
    {
        $orderData = $request->orderData;

        DB::beginTransaction();
        try {
            foreach ($orderData as $data) {
                $question = Question::find($data['id']);
                $question->order = $data['order'];
                $question->save();
            }
            DB::commit();
            return response()->json([
                'message' => ' 質問の順番が正常に更新されました',
                'redirect' => route('ShowQuestion')
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    //回答order
    public function UpdateAnswerOrder(Request $request)
    {
        $orderData = $request->orderData;

        DB::beginTransaction();
        try {
            foreach ($orderData as $data) {
                $choice = Choice::find($data['id']);
                $choice->order = $data['order'];
                $choice->save();
            }
            DB::commit();
            return response()->json([
                'message' => ' 回答の順番が正常に更新されました',
                'accordionId'=>$request->accordionId,
                'redirect' => route('ShowQuestion')
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }

    //[表示設定]質問
    public function ToggleQuestion(Request $request)
    {
        try {
            // 商品テーブルから指定のIDのレコード1件を取得
            $question = Question::find($request->id);

            if (!$question) {
                return response()->json(['message' => '対象質問が見つかりませんでした'], 404);
            }

            // レコードを更新
            $question->is_enabled = $request->is_enabled;
            $question->save();

            // JSONレスポンスを返す
            return response()->json([
                'message' => '表示設定の変更が完了しました',
                'redirect' => route('ShowQuestion')
            ]);
        } catch (\Exception $e) {
            // エラーが発生した場合の処理
            return response()->json([
                'message' => '表示設定の変更に失敗しました',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //[ページ遷移]リンク
    public function ShowLink() {
        $data = Link::all();
        return view("dash-link", compact("data"));
    }

    //[追加]リンク
    public function AddLink(Request $request) {
        // バリデーションルールを定義
        $validator = Validator::make($request->all(), [
            'course' => ['required'],
            'price' => ['required', 'integer', 'min:0', 'numeric'],
            'pickup_link' => ['url', 'nullable'],
            'delivery_link' => ['url', 'nullable'],
        ], [
            'course.required' => 'コースは必須です。',
            'price.required' => '価格は必須です。',
            'price.numeric' => '価格は数値で入力してください。',
            'price.integer' => '価格は整数で入力してください。',
            'price.min' => '価格は0以上で入力してください。',
            'pickup_link.url' => '店舗受取リンクは正しいURL形式で入力してください。',
            'delivery_link.url' => '郵送受取リンクは正しいURL形式で入力してください。',
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
        // バリデーションルールを定義
        $validator = Validator::make($request->all(), [
            'pickup_link' => ['url', 'required'],
//            'delivery_link' => ['url', 'required'],
        ], [
            'pickup_link.url' => '店舗受取リンクは正しいURL形式で入力してください。',
            'pickup_link.required' => '店舗受取リンクは必須です。',
//            'delivery_link.url' => '郵送受取リンクは正しいURL形式で入力してください。',
//            'delivery_link.required' => '郵送受取リンクは必須です。',
        ]);

        // バリデーションエラーが発生した場合の処理
        if ($validator->fails()) {
            return response()->json([
                'message' => '入力エラーがあります。',
                'errors' => $validator->errors()
            ], 422);
        }

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

    //[ページ遷移]属性追加
    public function ShowAddAttribute() {
        $attributes = Attribute::all();
        $categories = Category::all();
        return view("dash-add-attribute", compact("attributes", "categories"));
    }

    //[追加]属性カテゴリー
    public function AddCategory(Request $request) {
        // バリデーションルールを定義
        $request->validate([
            'name' => ['required'],
        ]);

        // トランザクションを開始
        DB::beginTransaction();
        try {
            // リンクモデルを使ってデータを作成し、保存
            $category = new Category();
            $category->name = $request->name;
            $category->save();

            // トランザクションをコミット
            DB::commit();

            // 成功した場合はリダイレクト
            return response()->json([
                'message' => 'カテゴリーが正常に追加されました',
                'redirect' => route('ShowAddAttribute')
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('カテゴリーの追加に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => 'カテゴリーの追加に失敗しました'
            ], 500);
        }
    }

    //[追加]属性
    public function AddAttribute(Request $request) {
        // バリデーションルールを定義
        $request->validate([
            'name' => ['required'],
        ]);

        DB::beginTransaction();
        try {
            $attribute = new Attribute();
            $attribute->name = $request->name;
            $attribute->category_id = $request->category_id;
            $attribute->save();

            DB::commit();
            return response()->json(['message' => '属性が追加されました', 'category_id'=>$request->category_id], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => '属性の追加に失敗しました'], 500);
        }
    }

    //[削除]属性カテゴリー
    public function DeleteCategory($id) {
        DB::beginTransaction();
        try {
            $category = Category::find($id);
            if ($category) {
                $category->delete();
                DB::commit();
                return response()->json(['message' => 'カテゴリーが削除されました', 'redirect' => route('ShowAddAttribute')]);
            } else {
                DB::rollBack();
                return response()->json(['message' => 'カテゴリーが見つかりませんでした'], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'カテゴリーの削除中にエラーが発生しました'], 500);
        }
    }

    //[削除]属性
    public function DeleteAttribute($id) {
        DB::beginTransaction();
        try {
            $attribute = Attribute::find($id);
            if ($attribute) {
                $attribute->delete();
                DB::commit();
                return response()->json(['message' => '属性が削除されました', 'category_id'=>$attribute->category_id, 'redirect' => route('ShowAddAttribute')]);
            } else {
                DB::rollBack();
                return response()->json(['message' => '属性が見つかりませんでした'], 404);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => '属性の削除中にエラーが発生しました'], 500);
        }
    }

    //[ページ遷移]商品属性付与
    public function ShowAttributeProduct() {
        $products = Product::with('attributes.category')->get();
        $categories = Category::all();
        $attributes = Attribute::all();
        $product_attributes = Product_attributes::all();
        return view("dash-product-attribute", compact("products", "categories","attributes", "product_attributes"));
    }

    //[追加]商品属性付与
    public function AddAttributeProduct(Request $request) {

        // トランザクションを開始
        DB::beginTransaction();
        try {
            // リンクモデルを使ってデータを作成し、保存
            $product_attribute = new Product_attributes();
            $product_attribute->product_id = $request->productId;
            $product_attribute->attribute_id = $request->attributeId;
            $product_attribute->save();

            // トランザクションをコミット
            DB::commit();

            // 成功した場合はリダイレクト
            return response()->json([
                'redirect' => route('ShowAttributeProduct'),
                'productId'=>$request->productId
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('属性付与に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => '属性付与に失敗しました'
            ], 500);
        }
    }

    //[削除]商品属性付与
    public function DeleteAttributeProduct(Request $request, $id)
    {
        try {
            $productId = $request->query('productId'); // クエリパラメータからproductIdを取得
            $attributeId = $id; // ルートパラメータからattributeIdを取得

            // product_attributes テーブルから対象のデータを削除
            Product_attributes::where('product_id', $productId)
                ->where('attribute_id', $attributeId)
                ->delete();

            return response()->json([
                'message' => '属性が正常に削除されました',
                'redirect' => route('ShowAttributeProduct'),
                'productId'=>$request->productId
            ], 200);
        } catch (\Exception $e) {
            Log::error('属性の削除に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => '属性の削除に失敗しました'
            ], 500);
        }
    }

    //[一括削除]商品属性付与
    public function AllDeleteAttributeProduct(Request $request, $id)
    {
        try {
            $productId = $request->query('productId'); // クエリパラメータからproductIdを取得
            $attributeId = $id; // ルートパラメータからattributeIdを取得

            // product_attributes テーブルから対象のデータを削除
            Product_attributes::where('product_id', $id)
                ->delete();

            return response()->json([
                'message' => '属性が正常に削除されました',
                'redirect' => route('ShowAttributeProduct'),
                'productId'=>$request->productId
            ], 200);
        } catch (\Exception $e) {
            Log::error('属性の削除に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => '属性の削除に失敗しました'
            ], 500);
        }
    }

    //[ページ遷移]質問属性付与
    public function ShowAttributeQuestion() {
        $questions = Question::orderBy('order')
        ->with(['choices' => function ($query) {
            $query->orderBy('order');
        }])
            ->get();
        $choice_attributes = Choice_attribute::all();
        $attributes = Attribute::all();
        $categories = Category::all();
        return view("dash-question-attribute", compact("questions","categories","choice_attributes","attributes","categories"));
    }

    //[追加]質問属性付与
    public function AddAttributeQuestion(Request $request) {

        // トランザクションを開始
        DB::beginTransaction();
        try {
            // リンクモデルを使ってデータを作成し、保存
            $choice_attribute = new Choice_attribute();
            $choice_attribute->choice_id = $request->choiceId;
            $choice_attribute->attribute_id = $request->attributeId;
            $choice_attribute->save();

            // トランザクションをコミット
            DB::commit();

            // 成功した場合はリダイレクト
            return response()->json([
                'redirect' => route('ShowAttributeQuestion'),
                'choiceId'=>$request->choiceId,
                'accordionId'=>$request->accordionId
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('属性付与に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => '属性付与に失敗しました'
            ], 500);
        }
    }

    //[削除]質問属性付与
    public function DeleteAttributeQuestion(Request $request, $id)
    {
        try {
            $choiceId = $request->query('choiceId'); // クエリパラメータからchoiceIdを取得
            $attributeId = $id; // ルートパラメータからattributeIdを取得

            // choice_attributes テーブルから対象のデータを削除
            Choice_attribute::where('choice_id', $choiceId)
                ->where('attribute_id', $attributeId)
                ->delete();

            return response()->json([
                'message' => '属性が正常に削除されました',
                'redirect' => route('ShowAttributeQuestion'),
                'choiceId'=>$request->choiceId,
                'accordionId'=>$request->accordionId
            ], 200);
        } catch (\Exception $e) {
            Log::error('属性の削除に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => '属性の削除に失敗しました'
            ], 500);
        }
    }

    //[クリア]質問属性付与
    public function DeleteAllAttributeQuestion(Request $request, $id)
    {
        try {
            // choice_attributes テーブルから対象のデータを削除
            Choice_attribute::where('choice_id', $id)
                ->delete();

            return response()->json([
                'message' => '属性が全て正常に削除されました',
                'redirect' => route('ShowAttributeQuestion'),
                'choiceId'=>$request->choiceId,
                'accordionId'=>$request->accordionId
            ], 200);
        } catch (\Exception $e) {
            Log::error('属性の削除に失敗しました: ' . $e->getMessage());

            return response()->json([
                'message' => '属性の削除に失敗しました'
            ], 500);
        }
    }

    public function ShowWord() {
        $word = Word::first();
        return view("dash-word", compact("word"));
    }

    public function UpdateWord(Request $request, $id) {

        DB::beginTransaction();
        try {
            $word = Word::find($id);
            $word->top = $request->top;
            $word->bottom = $request->bottom;
            $word->save();

            DB::commit();

            return response()->json(['redirect' => route('ShowWord')]);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error('メール設定の更新に失敗しました' . $e->getMessage());
            return response()->json(['message' => 'メール設定の更新に失敗しました'], 500);
        }
    }

    public function ShowMailForward() {
        $forwards = Forward::all();
        return view("dash-mail-forward", compact("forwards"));
    }

    public function UpdateForward(Request $request)
    {
        // バリデーション
        $validator = Validator::make($request->all(), [
            'email1' => ['email', 'nullable'],
            'email2' => ['email', 'nullable'],
            'email3' => ['email', 'nullable'],
        ], [
            'email1.email' => '1つ目のメールアドレスを正しい形式で入力してください。',
            'email2.email' => '2つ目のメールアドレスを正しい形式で入力してください。',
            'email3.email' => '3つ目のメールアドレスを正しい形式で入力してください。',
        ]);

        // バリデーションエラーが発生した場合の処理
        if ($validator->fails()) {
            return response()->json([
                'message' => '入力エラーがあります。',
                'errors' => $validator->errors()
            ], 422);
        }

        // トランザクションの開始
        DB::beginTransaction();
        try {
            // データベースの更新
            $updates = [
                ['id' => $request->id1, 'email' => $request->email1],
                ['id' => $request->id2, 'email' => $request->email2],
                ['id' => $request->id3, 'email' => $request->email3],
            ];

            foreach ($updates as $update) {
                $forward = Forward::find($update['id']);
                if ($forward) {
                    $forward->email = $update['email'];
                    $forward->save();
                }
            }

            // トランザクションのコミット
            DB::commit();

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            // エラーが発生した場合はロールバック
            DB::rollBack();
            Log::error('メール転送設定の更新に失敗しました: ' . $e->getMessage());
            return response()->json(['success' => false, 'error' => '更新に失敗しました。'], 500);
        }
    }

    public function ShowTopImage() {
        $leftImage = Image::find(1);
        $rightImage = Image::find(2);
        $images = Image::all();
        return view("dash-image", compact("leftImage", "rightImage", "images"));
    }

    public function UpdateTopImage(Request $request) {
        // バリデーション
        $validator = Validator::make($request->all(), [
            'left_img' => ['nullable', 'image', 'mimes:jpeg,png,jpg'],
            'right_img' => ['nullable', 'image', 'mimes:jpeg,png,jpg'],
        ], [
            'left_img.image' => '左側の画像ファイルを選択してください。',
            'right_img.image' => '右側の画像ファイルを選択してください。',
            'left_img.mimes' => '左側の画像ファイルはjpeg,png,jpg形式のみアップロード可能です。',
            'right_img.mimes' => '右側の画像ファイルはjpeg,png,jpg形式のみアップロード可能です。',
        ]);

        // バリデーションエラーが発生した場合の処理
        if ($validator->fails()) {
            return response()->json([
                'message' => '入力エラーがあります。',
                'errors' => $validator->errors()
            ], 422);
        }

        // トランザクションの開始
        DB::beginTransaction();
        try {
            // 左側の画像の更新
            if ($request->hasFile('left_img')) {
                $leftImgFile = $request->file('left_img');
                $leftFileName = $leftImgFile->getClientOriginalName();
                $leftImgPath = 'public/img';

                // 以前の画像を削除
                $previousLeftImg = Image::find(1);
                $deleteLeftImg = str_replace('storage/', '', $previousLeftImg->img);
                if ($previousLeftImg && Storage::disk('public')->exists($deleteLeftImg)) {
                    Storage::disk('public')->delete($deleteLeftImg);
                }

                // 新しい画像を保存
                $leftImgFile->storeAs($leftImgPath, $leftFileName);
                Image::updateOrCreate(
                    ['id' => 1],
                    ['img' => 'storage/img/' . $leftFileName]
                );
            }

            // 右側の画像の更新
            if ($request->hasFile('right_img')) {
                $rightImgFile = $request->file('right_img');
                $rightFileName = $rightImgFile->getClientOriginalName();
                $rightImgPath = 'public/img';

                // 以前の画像を削除
                $previousRightImg = Image::find(2);
                $deleteRightImg = str_replace('storage/', '', $previousRightImg->img);
                if ($previousRightImg && Storage::disk('public')->exists($deleteRightImg)) {
                    Storage::disk('public')->delete($deleteRightImg);
                }

                // 新しい画像を保存
                $rightImgFile->storeAs($rightImgPath, $rightFileName);
                Image::updateOrCreate(
                    ['id' => 2],
                    ['img' => 'storage/img/' . $rightFileName]
                );
            }

            // トランザクションのコミット
            DB::commit();
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            // エラーが発生した場合はロールバック
            DB::rollBack();
            Log::error('トップ画像の更新に失敗しました: ' . $e->getMessage());
            return response()->json(['success' => false, 'error' => '更新に失敗しました。'], 500);
        }
    }
}
