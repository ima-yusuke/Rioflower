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
//        選択肢・属性中間テーブル
        Schema::create('choice_attributes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("choice_id")->unsigned()->comment("選択肢ID");
            $table->bigInteger("attribute_id")->unsigned()->comment("属性ID");
            $table->timestamps();

            $table->foreign('choice_id')->references('id')->on('choices')->onDelete('cascade');
            $table->foreign('attribute_id')->references('id')->on('attributes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('choice_attributes');
    }
};
