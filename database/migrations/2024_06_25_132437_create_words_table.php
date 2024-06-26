<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('words', function (Blueprint $table) {
            $table->id();
            $table->text('top')->nullable()->comment('メール上部');
            $table->text('bottom')->nullable()->comment('メール下部');
            $table->timestamps();
        });

        // テーブル作成後に初期データを挿入
        DB::table('words')->insert([
            'id' => 1,
            'top' => null,
            'bottom' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('words');
    }
};
