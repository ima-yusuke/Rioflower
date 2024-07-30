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
//        商品テーブル
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("name")->comment("商品名");
            $table->string("img")->unique()->comment("商品画像パス");
            $table->bigInteger("price")->nullable()->unsigned()->comment("価格");
            $table->integer("priority")->unsigned()->default(0)->comment("優先度");
            $table->tinyInteger("is_enabled")->default(1)->comment("表示フラグ");
            $table->timestamps();
            $table->foreign('price')->references('id')->on('links')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
