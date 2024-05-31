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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->string("img")->unique();
            $table->text("pickup_link")->nullable()->default(null);
            $table->text("delivery_link")->nullable()->default(null);
            $table->integer("priority")->unsigned()->unique()->default(0);
            $table->tinyInteger("is_enabled")->default(1);
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
