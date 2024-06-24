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
//        属性テーブル
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger("category_id")->unsigned()->comment("カテゴリID");
            $table->string("name")->comment("属性名");
            $table->tinyInteger("is_enabled")->default(1)->comment("表示フラグ");

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->onDelete('cascade'); // カスケード削除を設定
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
