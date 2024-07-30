<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
//        商品詳細テーブル
        Schema::create('details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("product_id")->unsigned()->comment("商品ID");
            $table->longText("insert")->default(null)->nullable()->comment("挿入文");
            $table->text("attributes")->default(null)->nullable()->comment("css属性");
            $table->timestamps();

            $table->foreign('product_id')
                ->references('id')
                ->on('products')
                ->onDelete('cascade'); // カスケード削除を設定
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('details');
    }
};
