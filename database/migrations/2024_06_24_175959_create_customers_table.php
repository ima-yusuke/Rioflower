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
//        顧客テーブル
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_id')->unsigned()->comment('商品ID');
            $table->string('name')->comment('名前');
            $table->text('address')->comment('住所');
            $table->text('email')->comment('メールアドレス');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
