<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Detail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    //[ページ遷移]商品
    public function ShowProduct()
    {
        $products =Product::where('is_enabled', 1)->get();;
        $hiddenProducts = Product::where('is_enabled', 0)->get();
        $data = Detail::all();
        return view("dash-product",compact("products","hiddenProducts","data"));
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
        $product->pickup_link = $request->pickup_link;
        $product->delivery_link = $request->delivery_link;
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

        return redirect()->route('ShowProduct');
    }

    //[削除]商品
    public function DeleteProduct(Request $request)
    {
        // 商品テーブルから指定のIDのレコード1件を取得
        $product = Product::find($request->id);
        // レコードを削除
        $product->delete();
        // 削除したら一覧画面にリダイレクト
        return redirect()->route('ShowProduct');
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
}
