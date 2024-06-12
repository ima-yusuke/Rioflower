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
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger("category_id")->unsigned();
            $table->string("name");
            $table->tinyInteger("is_enabled")->default(1);

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
