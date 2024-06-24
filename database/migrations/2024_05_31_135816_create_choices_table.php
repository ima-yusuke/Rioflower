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
//        質問選択肢テーブル
        Schema::create('choices', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger("question_id")->unsigned()->comment("質問ID");
            $table->string("text")->comment("選択肢");
            $table->integer("order")->unsigned()->comment("表示順");

            $table->foreign('question_id')
                ->references('id')->on('questions')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('choices');
    }
};
