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
//        商品・属性中間テーブル
        Schema::create('product_attributes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger("product_id")->unsigned()->comment("商品ID");
            $table->bigInteger("attribute_id")->unsigned()->comment("属性ID");

            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade');

            $table->foreign('attribute_id')
                ->references('id')->on('attributes')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_attributes');
    }
};
