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
//        リンクテーブル
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->string('course')->comment('コース名');
            $table->integer('price')->comment('料金');
            $table->text('pickup_link')->nullable()->comment('受取リンク');
            $table->text('delivery_link')->nullable()->comment('配送リンク');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
